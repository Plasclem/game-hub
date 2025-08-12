import React from 'react';
import { Developer } from '../../../types';
import { titles, columnClasses } from '../../../behavior/constants';
import Column from '../Column';

interface FreeSectionProps {
  developers: Developer[];
}

function FreeSection({ developers }: FreeSectionProps) {
  return (
    <div className="free-section">
      <Column
        id="free"
        title={titles.free}
        className={columnClasses.free}
        developers={developers}
      />
    </div>
  );
}

export default FreeSection;
