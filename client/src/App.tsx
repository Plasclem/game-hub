import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

type Developer = {
  id: string;
  name: string;
  lead: string;
};

type Assignment = {
  build: Developer[];
  run: {
    anomalies: Developer[];
    service: Developer[];
    fastTrack: Developer[];
  };
};

const runCols = ['anomalies', 'service', 'fastTrack'] as const;
const titles: Record<string, string> = {
  build: '✅🛠️ Build',
  anomalies: 'Anomalies',
  service: 'Service',
  fastTrack: 'Fast Track',
};

const columnClasses: Record<string, string> = {
  build: 'build-column',
  anomalies: 'anomalies-column',
  service: 'service-column',
  fastTrack: 'fastTrack-column',
};

function App() {
  const [data, setData] = useState<Assignment | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    axios.get<Assignment>('/affectations').then((res) => setData(res.data));
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !data) return;
    const sourceId = result.source.droppableId as keyof Assignment['run'] | 'build';
    const destId = result.destination.droppableId as keyof Assignment['run'] | 'build';

    const sourceList = sourceId === 'build' ? [...data.build] : [...data.run[sourceId]];
    const destList = destId === 'build' ? [...data.build] : [...data.run[destId]];

    const [moved] = sourceList.splice(result.source.index, 1);
    destList.splice(result.destination.index, 0, moved);

    const newData: Assignment = {
      build: sourceId === 'build' ? sourceList : destId === 'build' ? destList : data.build,
      run: {
        anomalies:
          sourceId === 'anomalies'
            ? sourceList
            : destId === 'anomalies'
            ? destList
            : data.run.anomalies,
        service:
          sourceId === 'service'
            ? sourceList
            : destId === 'service'
            ? destList
            : data.run.service,
        fastTrack:
          sourceId === 'fastTrack'
            ? sourceList
            : destId === 'fastTrack'
            ? destList
            : data.run.fastTrack,
      },
    };
    setData(newData);
    axios.post('/affectations', newData).then(() => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  if (!data) {
    return <div>Loading...</div>;
  }
  const totalDevelopers =
    data.build.length +
    data.run.anomalies.length +
    data.run.service.length +
    data.run.fastTrack.length;

  const renderList = (id: string, developers: Developer[]) => (
    <Droppable droppableId={id} key={id}>
      {(provided) => (
        <div
          className={`column ${columnClasses[id]}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="column-header">
            <h3>{titles[id]}</h3>
            <span className="badge">{developers.length}</span>
          </div>
          {developers.map((dev, index) => (
            <Draggable draggableId={dev.id} index={index} key={dev.id}>
              {(prov) => (
                <div
                  className="developer-card"
                  ref={prov.innerRef}
                  {...prov.draggableProps}
                  {...prov.dragHandleProps}
                >
                  <div className="developer-name">👤 {dev.name}</div>
                  <div className="developer-lead">
                    👑 Lead: <span className="lead-badge">{dev.lead}</span>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  return (
    <>
      <header className="header">
        <div>
          <h1>Affectation des Développeurs</h1>
          <p>Gérez les affectations entre les équipes Build et Run</p>
        </div>
        <div className="total">Total développeurs : {totalDevelopers}</div>
      </header>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="board">
          {renderList('build', data.build)}
          <div className="run">
            <h2>⚙️ Run</h2>
            <div className="run-columns">
              {runCols.map((col) => renderList(col, data.run[col]))}
            </div>
          </div>
        </div>
      </DragDropContext>
      {saved && <div className="success">Sauvegarde réussie</div>}
    </>
  );
}

export default App;
