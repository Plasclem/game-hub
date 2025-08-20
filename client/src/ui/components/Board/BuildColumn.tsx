import React from 'react';
import './BuildColumn.css';
import Column from '../Column';
import { Developer } from '../../../types';
import { titles, columnClasses } from '../../../behavior/constants';

interface BuildColumnProps {
  developers: Developer[];
  onNoteChange: (id: string, note?: string) => void;
}

const BuildColumn: React.FC<BuildColumnProps> = ({ developers, onNoteChange }) => {
  return (
    <Column
      id="build"
      title={titles.build}
      developers={developers}
      className={`column ${columnClasses.build}`}
      onNoteChange={onNoteChange}
    />
  );
};

export default BuildColumn;

