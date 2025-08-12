import React from 'react';
import { Developer } from '../../../types';
import { titles, columnClasses } from '../../../behavior/constants';
import Column from '../Column';

interface BuildColumnProps {
  developers: Developer[];
}

function BuildColumn({ developers }: BuildColumnProps) {
  return (
    <Column
      id="build"
      title={titles.build}
      className={columnClasses.build}
      developers={developers}
    />
  );
}

export default BuildColumn;
