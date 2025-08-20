import React from 'react';
import './FreeSection.css';
import Column from '../Column';
import { Developer } from '../../../types';
import { titles, columnClasses } from '../../../behavior/constants';

interface FreeSectionProps {
  developers: Developer[];
  onNoteChange: (id: string, note?: string) => void;
}

const FreeSection: React.FC<FreeSectionProps> = ({ developers, onNoteChange }) => {
  return (
    <div className="free-section">
      <Column
        id="free"
        title={titles.free}
        developers={developers}
        className={columnClasses.free}
        onNoteChange={onNoteChange}
      />
    </div>
  );
};

export default FreeSection;

