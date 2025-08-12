import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Developer } from '../../types';
import DeveloperCard from './DeveloperCard';

interface ColumnProps {
  id: string;
  title: string;
  developers: Developer[];
  className?: string;
}

function Column({ id, title, developers, className }: ColumnProps) {
  return (
    <Droppable droppableId={id} key={id}>
      {(provided) => (
        <div
          className={`column ${className ?? ''}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="column-header">
            <h3>{title}</h3>
            <span className="badge">{developers.length}</span>
          </div>
          <div className="developer-list">
            {developers.map((dev, index) => (
              <DeveloperCard developer={dev} index={index} key={dev.id} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default Column;
