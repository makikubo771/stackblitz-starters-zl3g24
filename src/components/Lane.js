import React, { useState } from 'react';
import './Lane.css'; // Laneコンポーネント用のスタイルをインポート
import List from './List'; // Listコンポーネントをインポート

export default function Lane({ title, onUpdateTitle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [lists, setLists] = useState([]);
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  const handleTitleChange = () => {
    onUpdateTitle(newTitle);
    setIsEditing(false);
  };

  const addList = (newList) => {
    setLists([...lists, newList]);
  };

  const removeList = (id) => {
    const updatedLists = lists.filter((list) => list.id !== id);
    setLists(updatedLists);
  };

  const openDetail = () => {
    setIsDetailVisible(true);
  };

  const closeDetail = () => {
    setIsDetailVisible(false);
  };

  return (
    <div className="lane">
      <div className="lane-header">
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleTitleChange}
            autoFocus
          />
        ) : (
          <h2 onClick={() => setIsEditing(true)}>{title}</h2>
        )}
      </div>
      <div className="lists-container">
        {lists.map((list) => (
          <List
            key={list.id}
            list={list}
            onRemoveList={removeList}
            onOpenDetail={openDetail}
          />
        ))}
        <button className="add-list" onClick={() => addList({ id: Date.now(), title: '新しいList' })}>
          + 新しいListを追加
        </button>
      </div>
      {isDetailVisible && (
        <div className="detail-overlay">
          <div className="detail-modal">
            {/* 詳細画面のコンポーネントを追加 */}
            <button onClick={closeDetail}>閉じる</button>
          </div>
        </div>
      )}
    </div>
  );
}
