import React from 'react';
import Column from '../Column';
import { Developer, Assignment } from '../../../types';
import { titles, columnClasses } from '../../../behavior/constants';

interface RunColumnProps {
  id: keyof Assignment['run'];
  developers: Developer[];
}

const RunColumn: React.FC<RunColumnProps> = ({ id, developers }) => {
  return (
    <Column
      id={id}
      title={titles[id]}
      developers={developers}
      className={`column ${columnClasses[id]}`}
    />
  );
};

export default RunColumn;

