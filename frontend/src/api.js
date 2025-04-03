// api.js
export const getTrainingData = async () => {
  const response = await fetch('http://15.164.228.135:5000/api/trainings');
  const data = await response.json();

  // 로그로 데이터 확인
  console.log(data);  // 데이터 형식 확인

  return Array.isArray(data) ? data : [];  // 배열로 변환해서 반환
};

export const getTaskData = async () => {
  const response = await fetch('http://15.164.228.135:5000/api/tasks');
  const data = await response.json();

  // 로그로 데이터 확인
  console.log(data);  // 데이터 형식 확인

  return Array.isArray(data) ? data : [];  // 배열로 변환해서 반환
};
