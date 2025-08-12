import React from 'react';
import './DeveloperCard.css';
import { Draggable } from '@hello-pangea/dnd';
import { Developer } from '../../types';

interface DeveloperCardProps {
  developer: Developer;
  index: number;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({ developer, index }) => {
  return (
    <Draggable draggableId={developer.id} index={index}>
      {(provided) => (
        <div
          className="developer-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="developer-name">👤 {developer.name}</div>
          <div className="developer-lead">
            👑 Lead: <span className="lead-badge">{developer.lead}</span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DeveloperCard;

