// Dashboard.js
import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { getTrainingData, getTaskData } from './api';

function Dashboard() {
  const [trainings, setTrainings] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTrainingData().then(setTrainings);
    getTaskData().then(setTasks);
  }, []);

  // 빈 데이터일 경우의 처리
  if (trainings.length === 0 && tasks.length === 0) {
    return <div>No data available</div>;  // 데이터가 없을 때 메시지 출력
  }

  const trainingChartData = {
    labels: Array.isArray(trainings) ? trainings.map(training => training.name) : [],
    datasets: [
      {
        label: '교육 이수 현황',
        data: Array.isArray(trainings) ? trainings.map(training => (training.status === '완료' ? 1 : 0)) : [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };

  const taskPriorityData = {
    labels: Array.isArray(tasks) ? tasks.map(task => task.task_name) : [],
    datasets: [
      {
        label: '과제 우선순위',
        data: Array.isArray(tasks) ? tasks.map(task => task.priority === 'High' ? 1 : 0.5) : [],
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
