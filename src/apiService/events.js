import axios from 'axios';

axios.defaults.baseURL =
  'https://66eb24df55ad32cda47bd258.mockapi.io/api/events';

export const getEvents = async (page = 1, limit = 12) => {
  const response = await axios.get(`/event`, {
    params: { page, limit },
  });

  return response.data;
};
