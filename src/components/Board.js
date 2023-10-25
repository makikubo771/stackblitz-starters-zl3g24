import React, { useState, useRef } from 'react';
import './Board.css'; // CSSファイルをインポート
import Lane from './Lane'; // Laneコンポーネントをインポート

export default function Board() {
  const [lanes, setLanes] = useState([
    { id: 1, title: 'Todo' },
    { id: 2, title: 'Doing' },
    { id: 3, title: 'Done' },
  ]);
  const boardRef = useRef(null);

  const addLane = () => {
    const newLane = { id: Date.now(), title: '新しいLane' };
    setLanes([...lanes, newLane]);
  };

  const updateLaneTitle = (id, newTitle) => {
    const updatedLanes = lanes.map((lane) =>
      lane.id === id ? { ...lane, title: newTitle } : lane
    );
    setLanes(updatedLanes);
  };

  const scrollBoardRight = () => {
    if (boardRef.current) {
      boardRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="board" ref={boardRef}>
      <div className="project-list">
        <div className="project">プロジェクト1</div>
        <div className="project">プロジェクト2</div>
        <div className="project">プロジェクト3</div>
        {/* 他のプロジェクトも追加できます */}
      </div>

      <div className="lane-container">
        {lanes.map((lane) => (
          <Lane key={lane.id} title={lane.title} onUpdateTitle={(newTitle) => updateLaneTitle(lane.id, newTitle)} />
        ))}
        <div className="add-lane" onClick={addLane}>
          + 新しいLaneを追加
        </div>
      </div>
    </div>
  );
}
