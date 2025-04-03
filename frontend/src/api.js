// api.js
export const getTrainingData = async () => {
  const response = await fetch('http://15.164.228.135:5000/api/trainings');  // API URL
  const data = await response.json();

  console.log(data); // 데이터 형식을 확인

  return data;  // 이 데이터를 배열로 반환해야 합니다.
};

export const getTaskData = async () => {
  const response = await fetch('http://15.164.228.135:5000/api/tasks');  // API URL
  const data = await response.json();

  console.log(data); // 데이터 형식을 확인

  return data;  // 이 데이터를 배열로 반환해야 합니다.
};
