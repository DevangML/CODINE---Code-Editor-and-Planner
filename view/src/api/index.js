import axios from 'axios';

/*eslint-disable*/

export const API = axios.create({ baseURL: 'http://localhost:5000' });

export const setHeaders = () => {
  const headers = {
    headers: {
      'x-auth-token': getState().auth.token,
    },
  };

  return headers;
};
