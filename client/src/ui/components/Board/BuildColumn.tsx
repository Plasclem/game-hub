import React from 'react';
import './BuildColumn.css';
import Column from '../Column';
import { Developer } from '../../../types';
import { titles, columnClasses } from '../../../behavior/constants';

interface BuildColumnProps {
  developers: Developer[];
}

const BuildColumn: React.FC<BuildColumnProps> = ({ developers }) => {
  return (
    <Column
      id="build"
      title={titles.build}
      developers={developers}
      className={`column ${columnClasses.build}`}
    />
  );
};

export default BuildColumn;

