import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

function Dashboard() {
  const [trainings, setTrainings] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // 교육 데이터 API 호출
    fetch('http://3.34.97.222:5000/api/trainings')  // IP를 최신 Public IP로 업데이트
      .then(response => response.json())  // 응답을 JSON으로 파싱
      .then(data => {
        console.log('Training Data:', data);  // 데이터 확인용 콘솔
        setTrainings(data);  // 상태에 데이터 저장
      })
      .catch(error => {
        console.error('Training data fetch error:', error);  // 오류 출력
      });

    // 과제 데이터 API 호출
    fetch('http://3.34.97.222:5000/api/tasks')  // IP를 최신 Public IP로 업데이트
      .then(response => response.json())  // 응답을 JSON으로 파싱
      .then(data => {
        console.log('Task Data:', data);  // 데이터 확인용 콘솔
        setTasks(data);  // 상태에 데이터 저장
      })
      .catch(error => {
        console.error('Task data fetch error:', error);  // 오류 출력
      });
  }, []);  // 빈 배열을 넣으면 컴포넌트가 마운트될 때 한 번만 실행

  // 교육 차트 데이터
  const trainingChartData = {
    labels: trainings.map(training => training.name),  // 교육 이름을 라벨로 사용
    datasets: [
      {
        label: '교육 이수 현황',
        data: trainings.map(training => (training.status === '완료' ? 1 : 0)),  // 상태가 '완료'인 경우 1, 아니면 0
        backgroundColor: 'rgba(75, 192, 192, 0.2)',  // 차트 배경색
        borderColor: 'rgba(75, 192, 192, 1)',  // 차트 테두리 색
        borderWidth: 1,  // 테두리 두께
      }
    ]
  };

  // 과제 차트 데이터
  const taskPriorityData = {
    labels: tasks.map(task => task.task_name),  // 과제 이름을 라벨로 사용
    datasets: [
      {
        label: '과제 우선순위',
        data: tasks.map(task => task.priority === 'High' ? 1 : 0.5),  // 우선순위가 'High'이면 1, 아니면 0.5
        backgroundColor: 'rgba(255, 159, 64, 0.2)',  // 차트 배경색
        borderColor: 'rgba(255, 159, 64, 1)',  // 차트 테두리 색
        borderWidth: 1,  // 테두리 두께
      }
    ]
  };

  return (
    <div>
      <h2>교육 이수 현황</h2>
      <Bar data={trainingChartData} />  {/* Bar 차트에 데이터 전달 */}

      <h2>과제 우선순위</h2>
      <Pie data={taskPriorityData} />  {/* Pie 차트에 데이터 전달 */}
    </div>
  );
}

export default Dashboard;
