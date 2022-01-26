import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL,
} from '../constants/authTypes';

const initialState = {
  isAuthenticated: false,
  _id: null,
  loading: true,
  name: '',
  email: '',
  authType: '',
  token: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  let user;
  switch (type) {
    case USER_LOADED:
      toast('Welcome...', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      user = jwtDecode(payload?.token);

      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        authType: 'jwtAuth',
        token: payload?.token,
        name: user?.name,
        email: user?.email,
        _id: user?.id,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case GOOGLE_LOGIN_SUCCESS:
      const guser = jwtDecode(payload?.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        authType: 'Google',
        token: payload?.token,
        _id: guser?.sub,
        name: guser?.name,
        email: guser?.email,
      };
    case GOOGLE_LOGIN_FAIL:
      return state;
    case REGISTER_FAIL:
      return state;
    case AUTH_ERROR:
      return state;
    case LOGIN_FAIL:
      return state;
    case LOGOUT:
      toast('Goodbye...', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    default:
      return state;
  }
}
