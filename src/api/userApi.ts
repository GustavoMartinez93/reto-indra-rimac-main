import axios from 'axios';

export const getUserData = async () => {
  try {
    const response = await axios.get('https://rimac-front-end-challenge.netlify.app/api/user.json');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching plans data');
  }
};