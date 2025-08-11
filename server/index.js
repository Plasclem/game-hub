const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, '../data/affectations.json');
const clients = [];

app.use(cors());
app.use(bodyParser.json());

// Server-Sent Events endpoint
app.get('/events', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  clients.push(res);

  req.on('close', () => {
    const index = clients.indexOf(res);
    if (index !== -1) clients.splice(index, 1);
  });

  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    res.write(`data: ${data}\n\n`);
  } catch (err) {
    // ignore read errors for initial send
  }
});

app.get('/affectations', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Could not read data' });
  }
});

app.post('/affectations', async (req, res) => {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(req.body, null, 2));
    res.json({ status: 'ok' });
    const payload = JSON.stringify(req.body);
    clients.forEach((client) => client.write(`data: ${payload}\n\n`));
  } catch (err) {
    res.status(500).json({ error: 'Could not save data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
