import React from 'react';
import { Assignment } from '../../../types';
import { runCols } from '../../../behavior/constants';
import RunColumn from './RunColumn';

interface RunSectionProps {
  run: Assignment['run'];
}

function RunSection({ run }: RunSectionProps) {
  return (
    <div className="run">
      <h2>⚙️ Run</h2>
      <div className="run-columns">
        {runCols.map((col) => (
          <RunColumn key={col} id={col} developers={run[col]} />
        ))}
      </div>
    </div>
  );
}

export default RunSection;
