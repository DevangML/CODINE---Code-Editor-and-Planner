import axios from 'axios';
import store from '../redux/store';

/*eslint-disable*/

export const API = axios.create({ baseURL: 'http://localhost:5000' });

export const setHeaders = () => {
  const headers = {
    headers: {
      token: store.getState().auth.token,
      authType: store.getState().auth.authType,
    },
  };

  return headers;
};
