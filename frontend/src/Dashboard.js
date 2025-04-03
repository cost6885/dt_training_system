import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

function Dashboard() {
  const [trainings, setTrainings] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // 교육 데이터 API 호출
    fetch('http://15.164.228.135:5000/api/trainings')
      .then(response => response.json())
      .then(data => {
        console.log('Training Data:', data);  // 콘솔에 데이터 확인
        setTrainings(data);  // 상태에 데이터 저장
      })
      .catch(error => {
        console.error('Training data fetch error:', error);  // 오류 확인
      });

    // 과제 데이터 API 호출
    fetch('http://15.164.228.135:5000/api/tasks')
      .then(response => response.json())
      .then(data => {
        console.log('Task Data:', data);  // 콘솔에 데이터 확인
        setTasks(data);  // 상태에 데이터 저장
      })
      .catch(error => {
        console.error('Task data fetch error:', error);  // 오류 확인
      });
  }, []);  // 빈 배열을 넣으면 컴포넌트 마운트 시 한 번만 실행됨

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
      <h2>교육 이수 현황</h2>
      <Bar data={trainingChartData} />

      <h2>과제 우선순위</h2>
      <Pie data={taskPriorityData} />
    </div>
  );
}

export default Dashboard;
