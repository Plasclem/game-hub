import React from 'react';
import './Board.css';
import { Assignment } from '../../../types';
import BuildColumn from './BuildColumn';
import RunSection from './RunSection';
import FreeSection from './FreeSection';

interface BoardProps {
  data: Assignment;
}

const Board: React.FC<BoardProps> = ({ data }) => {
  return (
    <>
      <FreeSection developers={data.free} />
      <div className="board">
        <BuildColumn developers={data.build} />
        <RunSection run={data.run} />
      </div>
    </>
  );
};

export default Board;

