import React from 'react';
import './DeveloperCard.css';
import { Draggable } from '@hello-pangea/dnd';
import { Developer } from '../../types';
import features from '../../config';

interface DeveloperCardProps {
  developer: Developer;
  index: number;
  onNoteChange: (id: string, note?: string) => void;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({
  developer,
  index,
  onNoteChange,
}) => {
  const handleNoteClick = () => {
    const input = prompt('Note ?', developer.note || '');
    if (input === null) return;
    const text = input.slice(0, 100);
    onNoteChange(developer.id, text || undefined);
  };

  return (
    <Draggable draggableId={developer.id} index={index} isDragDisabled={!features.dragAndDrop}>
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
          {developer.note && (
            <div className="developer-note">{developer.note}</div>
          )}
          {!features.readOnly && (
            <button
              className={`note-btn ${developer.note ? 'edit' : 'add'}`}
              onClick={handleNoteClick}
            >
              {developer.note ? '✏️' : '+'}
            </button>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default DeveloperCard;

