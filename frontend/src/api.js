const getTrainingData = async () => {
  try {
    const response = await fetch('http://15.164.228.135:5000/api/trainings');
    const data = await response.json();
    console.log('Training Data:', data);  // API 응답 데이터 출력
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('API 요청 오류:', error);  // 오류가 발생하면 출력
    return [];
  }
};

const getTaskData = async () => {
  try {
    const response = await fetch('http://15.164.228.135:5000/api/tasks');
    const data = await response.json();
    console.log('Task Data:', data);  // API 응답 데이터 출력
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('API 요청 오류:', error);  // 오류가 발생하면 출력
    return [];
  }
};
