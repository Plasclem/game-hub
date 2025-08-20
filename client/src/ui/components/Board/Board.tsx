import React from 'react';
import './Board.css';
import { Assignment } from '../../../types';
import BuildColumn from './BuildColumn';
import RunSection from './RunSection';
import FreeSection from './FreeSection';

interface BoardProps {
  data: Assignment;
  onNoteChange: (id: string, note?: string) => void;
}

const Board: React.FC<BoardProps> = ({ data, onNoteChange }) => {
  return (
    <>
      <FreeSection developers={data.free} onNoteChange={onNoteChange} />
      <div className="board">
        <BuildColumn developers={data.build} onNoteChange={onNoteChange} />
        <RunSection run={data.run} onNoteChange={onNoteChange} />
      </div>
    </>
  );
};

export default Board;

