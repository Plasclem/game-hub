import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useAssignments } from '../behavior/useAssignments';
import { runCols, titles, columnClasses } from '../behavior/constants';
import { Developer } from '../types';

function App() {
  const { data, saved, handleDragEnd, totalDevelopers } = useAssignments();

  if (!data) {
    return <div>Loading...</div>;
  }

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
        <div className="free-section">{renderList('free', data.free)}</div>
      </DragDropContext>
      {saved && <div className="success">Sauvegarde réussie</div>}
    </>
  );
}

export default App;
