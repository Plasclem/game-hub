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
  build: 'Build',
  anomalies: 'Anomalies',
  service: 'Service',
  fastTrack: 'Fast Track',
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

  const renderList = (id: string, developers: Developer[]) => (
    <Droppable droppableId={id} key={id}>
      {(provided) => (
        <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
          <h3>{titles[id]}</h3>
          {developers.map((dev, index) => (
            <Draggable draggableId={dev.id} index={index} key={dev.id}>
              {(prov) => (
                <div
                  className="developer-card"
                  ref={prov.innerRef}
                  {...prov.draggableProps}
                  {...prov.dragHandleProps}
                >
                  <div>{dev.name}</div>
                  <div>
                    Lead: <span className="lead-badge">{dev.lead}</span>
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
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="board">
          {renderList('build', data.build)}
          <div className="run">
            <h2>Run</h2>
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
