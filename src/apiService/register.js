import axios from 'axios';

axios.defaults.baseURL =
  'https://66edc695380821644cddf724.mockapi.io/api/v1/';

export const getParticipants = async () => {
    const response = await axios.get(`/register`);

    return response.data;
}