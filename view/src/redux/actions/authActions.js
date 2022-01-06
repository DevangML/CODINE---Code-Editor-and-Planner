import axios from 'axios';
import { toast } from 'react-toastify';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL,
  LOGOUT,
} from '../constants/authTypes';
import setAuthToken from '../utils/setAuthToken';
import store from '../store';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('http://localhost:5000/auth/read');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const body = JSON.stringify({ name, email, password });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('http://localhost:5000/auth/create/1', body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      // const { errors } = err.response.data;

      // if (errors) {
      //   errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      // }

      toast.error(error.response?.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

      dispatch({
        type: REGISTER_FAIL,
      });
      dispatch(loadUser());
    }
  };

export const glogin = (response) => async (dispatch) => {
  try {
    const token = response.tokenId;

    dispatch({
      type: GOOGLE_LOGIN_SUCCESS,
      payload: { token },
    });
  } catch (err) {
    toast.error(err.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });

    console.log(`${err}`);

    dispatch({
      type: GOOGLE_LOGIN_FAIL,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, password });
    const res = await axios.post('http://localhost:5000/auth/create/2', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    toast.error(err.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout / Clear Profile

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
