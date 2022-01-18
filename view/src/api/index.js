import axios from 'axios';
import store from '../redux/store';

/*eslint-disable*/

export let API;

if (process.env.NODE_ENV === 'production') {
  API = axios.create({ baseURL: 'https://codine007.herokuapp.com' });
} else {
  API = axios.create({ baseURL: 'http://localhost:5000' });
}

export const setHeaders = () => {
  const headers = {
    headers: {
      Accept: 'application/json',
      token: store.getState().auth.token,
      authType: store.getState().auth.authType,
    },
  };

  return headers;
};
