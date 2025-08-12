import React from 'react';
import { Assignment } from '../../../types';
import BuildColumn from './BuildColumn';
import RunSection from './RunSection';

interface BoardProps {
  build: Assignment['build'];
  run: Assignment['run'];
}

function Board({ build, run }: BoardProps) {
  return (
    <div className="board">
      <BuildColumn developers={build} />
      <RunSection run={run} />
    </div>
  );
}

export default Board;
