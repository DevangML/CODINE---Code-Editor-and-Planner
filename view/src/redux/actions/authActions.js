/* eslint-disable no-constant-condition */

import { AUTH } from '../constants/authTypes';
import { API } from '../../api/index';

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await API.post('/user/signin', formData);

    dispatch({ type: AUTH, data });

    history.push('/');
  } catch (err) {
    console.log(err);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await API.post('/user/signup', formData);
    dispatch({ type: AUTH, data });

    history.push('/');
  } catch (err) {
    console.log(err);
  }
};
