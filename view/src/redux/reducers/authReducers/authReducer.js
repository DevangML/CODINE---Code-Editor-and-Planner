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
} from '../../constants/authTypes';

const initialState = {
  isAuthenticated: false,
  _id: null,
  loading: true,
  auth: null,
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
        auth: payload,
        authType: 'jwtAuth',
        token: payload.token,
        _id: user !== null && user?._id,
      };
    case REGISTER_SUCCESS:
      user = jwtDecode(payload?.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        auth: payload,
        authType: 'jwtAuth',
        token: payload.token,
        _id: user !== null && user?._id,
      };
    case LOGIN_SUCCESS:
      user = jwtDecode(payload?.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        auth: payload,
        authType: 'jwtAuth',
        token: payload.token,
        _id: user !== null && user?._id,
      };
    case GOOGLE_LOGIN_SUCCESS:
      const guser = jwtDecode(payload?.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        authType: 'Google',
        token: payload && payload.token,
        _id: guser !== null && guser?.sub,
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
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        auth: null,
        authType: '',
        token: null,
        _id: null,
      };
    default:
      return state;
  }
}
