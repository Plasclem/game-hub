import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Developer } from '../../types';

interface DeveloperCardProps {
  developer: Developer;
  index: number;
}

function DeveloperCard({ developer, index }: DeveloperCardProps) {
  return (
    <Draggable draggableId={developer.id} index={index}>
      {(prov) => (
        <div
          className="developer-card"
          ref={prov.innerRef}
          {...prov.draggableProps}
          {...prov.dragHandleProps}
        >
          <div className="developer-name">👤 {developer.name}</div>
          <div className="developer-lead">
            👑 Lead: <span className="lead-badge">{developer.lead}</span>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default DeveloperCard;
