import React from 'react';
import Dashboard from './Dashboard';
import AddEmployee from './AddEmployee';  // 추가된 컴포넌트

function App() {
  return (
    <div>
      <h1>DT 교육 시스템</h1>
      <AddEmployee />  {/* 직원 추가 폼 */}
    </div>
  );
}

export default App;
