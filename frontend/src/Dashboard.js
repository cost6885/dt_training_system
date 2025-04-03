import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { getTrainingData, getTaskData } from './api';

function Dashboard() {
  const [trainings, setTrainings] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTrainingData().then(data => {
      console.log('Trainings Data:', data);  // 데이터 확인
      setTrainings(data);  // 상태에 데이터 설정
    });
    getTaskData().then(data => {
      console.log('Tasks Data:', data);  // 데이터 확인
      setTasks(data);  // 상태에 데이터 설정
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
