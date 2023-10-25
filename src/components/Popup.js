import React from 'react';
import './Popup.css';

export default function Popup() {
  return (
    <div className="popup">
      <h3>詳細</h3>
      <div className="popup-content">
        <label htmlFor="deadline">締め切り日：</label>
        <input type="date" id="deadline" />

        <label htmlFor="assignee">実行する人の名前：</label>
        <input type="text" id="assignee" />

        <label htmlFor="priority">優先度の高さ：</label>
        <select id="priority">
          <option value="low">低</option>
          <option value="medium">中</option>
          <option value="high">高</option>
        </select>
      </div>
    </div>
  );
}
