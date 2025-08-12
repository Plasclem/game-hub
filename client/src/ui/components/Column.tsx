import React from 'react';
import './Column.css';
import { Droppable } from '@hello-pangea/dnd';
import DeveloperCard from './DeveloperCard';
import { Developer } from '../../types';
import features from '../../config';

interface ColumnProps {
  id: string;
  title: string;
  developers: Developer[];
  className: string;
}

const Column: React.FC<ColumnProps> = ({ id, title, developers, className }) => {
  return (
    <Droppable droppableId={id} key={id} isDropDisabled={!features.dragAndDrop}>
      {(provided) => (
        <div className={className} ref={provided.innerRef} {...provided.droppableProps}>
          <div className="column-header">
            <h3>{title}</h3>
            <span className="badge">{developers.length}</span>
          </div>
          <div className="developer-list">
            {developers.map((dev, index) => (
              <DeveloperCard key={dev.id} developer={dev} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;

