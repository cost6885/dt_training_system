// api.js
export const getTrainingData = async () => {
  const response = await fetch('http://15.164.228.135:5000/api/trainings');
  const data = await response.json();
  console.log("Training Data:", data); // API 응답 데이터 로그
  console.log("Is training data an array?", Array.isArray(data));  // 배열 여부 확인
  return Array.isArray(data) ? data : [];  // 배열이면 그대로 반환, 아니면 빈 배열 반환
};

export const getTaskData = async () => {
  const response = await fetch('http://15.164.228.135:5000/api/tasks');
  const data = await response.json();
  console.log("Task Data:", data); // API 응답 데이터 로그
  console.log("Is task data an array?", Array.isArray(data));  // 배열 여부 확인
  return Array.isArray(data) ? data : [];  // 배열이면 그대로 반환, 아니면 빈 배열 반환
};
