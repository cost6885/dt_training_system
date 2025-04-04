import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, ArcElement, Tooltip, Legend } from 'chart.js';

// 필요한 요소와 축을 등록
ChartJS.register(
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const [trainings, setTrainings] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // 교육 데이터 API 호출
    fetch('http://3.34.97.222:5000/api/trainings')
      .then(response => response.json())
      .then(data => {
        console.log('Training Data:', data);  // 콘솔에 데이터 확인
        setTrainings(data);  // 상태에 데이터 저장
      })
      .catch(error => {
        console.error('Training data fetch error:', error);  // 오류 확인
      });

    // 과제 데이터 API 호출
    fetch('http://3.34.97.222:5000/api/tasks')
      .then(response => response.json())
      .then(data => {
        console.log('Task Data:', data);  // 콘솔에 데이터 확인
        setTasks(data);  // 상태에 데이터 저장
      })
      .catch(error => {
        console.error('Task data fetch error:', error);  // 오류 확인
      });

    // 직원 데이터 API 호출
    fetch('http://3.34.97.222:5000/api/employees')  // 추가된 직원 데이터 API 호출
      .then(response => response.json())
      .then(data => {
        console.log('Employee Data:', data);  // 콘솔에 데이터 확인
        setEmployees(data);  // 상태에 직원 데이터 저장
      })
      .catch(error => {
        console.error('Employee data fetch error:', error);  // 오류 확인
      });
  }, []);

  // 교육 이수 현황 차트 데이터 생성
  const trainingChartData = {
    labels: trainings.map(training => training.name),
    datasets: [
      {
        label: '교육 이수 현황',
        data: trainings.map(training => (training.status === '완료' ? 1 : 0)),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };

  // 과제 우선순위 차트 데이터 생성
  const taskPriorityData = {
    labels: tasks.map(task => task.task_name),
    datasets: [
      {
        label: '과제 우선순위',
        data: tasks.map(task => task.priority === 'High' ? 1 : 0.5),
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      }
    ]
  };

  return (
    <div>
      {/* 교육 이수 현황 차트 */}
      <h2>교육 이수 현황</h2>
      <Bar data={trainingChartData} />

      {/* 과제 우선순위 차트 */}
      <h2>과제 우선순위</h2>
      <Pie data={taskPriorityData} />

      {/* 직원 목록 출력 */}
      <h2>직원 목록</h2>
      <ul>
        {employees.length > 0 ? (
          employees.map((employee, index) => (
            <li key={index}>
              {employee.name} - {employee.position} - {employee.salary}원
            </li>
          ))
        ) : (
          <p>직원 데이터가 없습니다.</p>
        )}
      </ul>
    </div>
  );
}

export default Dashboard;
