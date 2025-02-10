const API_BASE_URL = 'https://api.jsonserve.com';

export const fetchQuizData = async (quizId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${quizId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.questions;
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    return [];
  }
};
