import React from 'react';
import Column from '../Column';
import { Developer } from '../../../types';
import { titles, columnClasses } from '../../../behavior/constants';

interface FreeSectionProps {
  developers: Developer[];
}

const FreeSection: React.FC<FreeSectionProps> = ({ developers }) => {
  return (
    <div className="free-section">
      <Column
        id="free"
        title={titles.free}
        developers={developers}
        className={columnClasses.free}
      />
    </div>
  );
};

export default FreeSection;

