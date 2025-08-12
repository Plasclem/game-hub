import React from 'react';
import { Assignment, Developer } from '../../../types';
import { titles, columnClasses } from '../../../behavior/constants';
import Column from '../Column';

interface RunColumnProps {
  id: keyof Assignment['run'];
  developers: Developer[];
}

function RunColumn({ id, developers }: RunColumnProps) {
  return (
    <Column
      id={id}
      title={titles[id]}
      className={columnClasses[id]}
      developers={developers}
    />
  );
}

export default RunColumn;
