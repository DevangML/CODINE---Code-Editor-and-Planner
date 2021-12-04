import axios from 'axios';

/*eslint-disable*/

export const API = axios.create({ baseURL: 'https://codex7.herokuapp.com' });

export const signin = (formData) => API.post('/user/signin', formData);
export const signup = (formData) => API.post('/user/signin', formData);
