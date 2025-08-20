import React from 'react';
import './RunColumn.css';
import Column from '../Column';
import { Developer, Assignment } from '../../../types';
import { titles, columnClasses } from '../../../behavior/constants';

interface RunColumnProps {
  id: keyof Assignment['run'];
  developers: Developer[];
  onNoteChange: (id: string, note?: string) => void;
}

const RunColumn: React.FC<RunColumnProps> = ({ id, developers, onNoteChange }) => {
  return (
    <Column
      id={id}
      title={titles[id]}
      developers={developers}
      className={`column ${columnClasses[id]}`}
      onNoteChange={onNoteChange}
    />
  );
};

export default RunColumn;

