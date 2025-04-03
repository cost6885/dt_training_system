// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // App 컴포넌트
import './index.css';     // 스타일 파일

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
