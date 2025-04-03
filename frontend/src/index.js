import React from 'react';  // React를 불러옵니다.
import ReactDOM from 'react-dom';  // ReactDOM을 불러옵니다.
import App from './App';  // App 컴포넌트를 불러옵니다.
import './index.css';  // 전역 스타일을 불러옵니다.

// React 앱을 'root' div에 렌더링합니다.
ReactDOM.render(
  <React.StrictMode>
    <App />  {/* App 컴포넌트를 렌더링 */}
  </React.StrictMode>,
  document.getElementById('root')  // 'index.html'에 있는 'root' div에 렌더링
);
