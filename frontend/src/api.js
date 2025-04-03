const API_URL = 'http://localhost:5000';

export const getTrainingData = async () => {
  const response = await fetch(`${API_URL}/employee/1/trainings`);
  return await response.json();
};

export const getTaskData = async () => {
  const response = await fetch(`${API_URL}/employee/1/tasks`);
  return await response.json();
};
