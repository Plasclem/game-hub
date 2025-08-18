const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, '../data/affectations.json');
const SNAPSHOT_FILE = path.join(__dirname, '../data/snapshots.json');
const CLIENT_BUILD_PATH = path.join(__dirname, '../client/dist');

const MONGO_URI = process.env.MONGO_URI;
let affectationsCollection;
let snapshotsCollection;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  const dragHeader = req.get('x-drag');
  if (dragHeader !== undefined) {
    res.cookie('x-drag', dragHeader);
  }
  next();
});

app.use(express.static(CLIENT_BUILD_PATH));

let clients = [];
const sendEvents = (excludeId) => {
  clients.forEach(({ id, res }) => {
    if (id !== excludeId) {
      res.write('data: notify\n\n');
    }
  });
};

app.get('/events', (req, res) => {
  const clientId = req.query.id;
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.flushHeaders();
  res.write('retry: 10000\n\n');
  clients.push({ id: clientId, res });
  req.on('close', () => {
    clients = clients.filter((c) => c.res !== res);
  });
});

app.post('/notify', (req, res) => {
  sendEvents(req.query.id);
  res.status(200).end();
});

const readSnapshots = async () => {
  if (snapshotsCollection) {
    const snaps = await snapshotsCollection.find().toArray();
    return snaps.reduce((acc, { _id, data }) => {
      acc[_id] = data;
      return acc;
    }, {});
  }
  try {
    const data = await fs.readFile(SNAPSHOT_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
};

app.get('/snapshots', async (req, res) => {
  const snaps = await readSnapshots();
  res.json(Object.keys(snaps));
});

app.get('/snapshots/:label', async (req, res) => {
  if (snapshotsCollection) {
    const snap = await snapshotsCollection.findOne({ _id: req.params.label });
    if (!snap) {
      return res.status(404).json({ error: 'Snapshot not found' });
    }
    return res.json(snap.data);
  }
  const snaps = await readSnapshots();
  const snap = snaps[req.params.label];
  if (!snap) {
    return res.status(404).json({ error: 'Snapshot not found' });
  }
  res.json(snap);
});

app.post('/snapshots', async (req, res) => {
  const { label, data } = req.body;
  if (!label || !data) {
    return res.status(400).json({ error: 'Label and data required' });
  }
  if (snapshotsCollection) {
    const existing = await snapshotsCollection.findOne({ _id: label });
    if (existing) {
      return res.status(400).json({ error: 'Label already exists' });
    }
    await snapshotsCollection.insertOne({ _id: label, data });
    return res.json({ status: 'ok' });
  }
  const snaps = await readSnapshots();
  if (snaps[label]) {
    return res.status(400).json({ error: 'Label already exists' });
  }
  snaps[label] = data;
  await fs.writeFile(SNAPSHOT_FILE, JSON.stringify(snaps, null, 2));
  res.json({ status: 'ok' });
});

app.delete('/snapshots/:label', async (req, res) => {
  if (snapshotsCollection) {
    const result = await snapshotsCollection.deleteOne({ _id: req.params.label });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Snapshot not found' });
    }
    return res.json({ status: 'ok' });
  }
  const snaps = await readSnapshots();
  if (!snaps[req.params.label]) {
    return res.status(404).json({ error: 'Snapshot not found' });
  }
  delete snaps[req.params.label];
  await fs.writeFile(SNAPSHOT_FILE, JSON.stringify(snaps, null, 2));
  res.json({ status: 'ok' });
});

app.get('/affectations', async (req, res) => {
  try {
    if (affectationsCollection) {
      const doc = await affectationsCollection.findOne({ _id: 'affectations' });
      return res.json(doc ? doc.data : []);
    }
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Could not read data' });
  }
});

app.post('/affectations', async (req, res) => {
  try {
    if (affectationsCollection) {
      await affectationsCollection.updateOne(
        { _id: 'affectations' },
        { $set: { data: req.body } },
        { upsert: true }
      );
    } else {
      await fs.writeFile(DATA_FILE, JSON.stringify(req.body, null, 2));
    }
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ error: 'Could not save data' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

if (MONGO_URI) {
  const client = new MongoClient(MONGO_URI);
  client
    .connect()
    .then(() => {
      const db = client.db(process.env.MONGO_DB_NAME || 'gamehub');
      affectationsCollection = db.collection('affectations');
      snapshotsCollection = db.collection('snapshots');
      console.log('Connected to MongoDB');
      startServer();
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB', err);
      process.exit(1);
    });
} else {
  startServer();
}
