import React, { useState } from 'react';
import Dashboard from './Dashboard';
import AddEmployee from './AddEmployee';

function App() {
  const [isAddEmployee, setIsAddEmployee] = useState(false); // 상태를 관리

  // "조회" 버튼 클릭 시 Dashboard 컴포넌트 보이기
  const handleViewClick = () => {
    setIsAddEmployee(false);
  };

  // "추가" 버튼 클릭 시 AddEmployee 컴포넌트 보이기
  const handleAddClick = () => {
    setIsAddEmployee(true);
  };

  return (
    <div>
      <h1>DT 교육 시스템</h1>

      {/* 버튼을 클릭하여 화면 전환 */}
      <div>
        <button onClick={handleAddClick}>직원 추가</button>
        <button onClick={handleViewClick}>교육 현황 조회</button>
      </div>

      {/* 상태에 따라 컴포넌트 렌더링 */}
      {isAddEmployee ? <AddEmployee /> : <Dashboard />}
    </div>
  );
}

export default App;
