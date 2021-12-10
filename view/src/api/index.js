import axios from 'axios';

/*eslint-disable*/

export const API = axios.create({ baseURL: 'https://codex-development.herokuapp.com' });

export const setHeaders = () => {
  const headers = {
    headers: {
      'x-auth-token': localStorage.getItem('token'),
    },
  };

  return headers;
};
