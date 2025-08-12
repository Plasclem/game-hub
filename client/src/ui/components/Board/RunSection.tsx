import React from 'react';
import './RunSection.css';
import RunColumn from './RunColumn';
import { Assignment } from '../../../types';
import { runCols } from '../../../behavior/constants';

interface RunSectionProps {
  run: Assignment['run'];
}

const RunSection: React.FC<RunSectionProps> = ({ run }) => {
  return (
    <div className="run-section" style={{ flex: runCols.length }}>
      <h3>⚙️ Run</h3>
      <div className="run-columns">
        {runCols.map((col) => (
          <RunColumn key={col} id={col} developers={run[col]} />
        ))}
      </div>
    </div>
  );
};

export default RunSection;

