import React, { useState } from 'react';
import './List.css'; // Listコンポーネント用のスタイルをインポート
import Popup from './Popup'; // Popupコンポーネントをインポート

export default function List() {
  const [lists, setLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState('');
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false); // 削除ボタンの表示状態
  const [isEditingTitle, setIsEditingTitle] = useState(false); // タイトルの編集状態
  const [editedTitle, setEditedTitle] = useState(''); // 編集中のタイトル

  const addList = () => {
    if (newListTitle) {
      const newList = { id: Date.now(), title: newListTitle };
      setLists([...lists, newList]);
      setNewListTitle('');
    }
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
    setIsDeleteVisible(false); // 詳細を閉じる際に削除ボタンを非表示
  };

  const startEditingTitle = () => {
    setIsEditingTitle(true);
    setEditedTitle(newListTitle);
  };

  const finishEditingTitle = () => {
    if (editedTitle) {
      setNewListTitle(editedTitle);
      setIsEditingTitle(false);
    }
  };

  return (
    <div className="list">
      <div className="list-header">
        {isEditingTitle ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={finishEditingTitle}
            autoFocus
          />
        ) : (
          <div className="list-title">
            <span className={isDetailVisible ? 'gray' : ''}>{newListTitle}</span>
            {!isDetailVisible && (
              <button className="edit-title-button" onClick={startEditingTitle}>
                編集
              </button>
            )}
          </div>
        )}
        <button onClick={openDetail}>詳細</button>
      </div>
      <ul className="list-items">
        {lists.map((list) => (
          <li key={list.id}>
            {list.title} {isDeleteVisible && <button onClick={() => removeList(list.id)}>削除</button>}
          </li>
        ))}
      </ul>
      {isDetailVisible && (
        <div className="detail-overlay">
          <div className="detail-modal">
            {/* 詳細画面のコンポーネントを追加 */}
            <Popup />
            <button onClick={closeDetail}>閉じる</button>
          </div>
        </div>
      )}
    </div>
  );
}
