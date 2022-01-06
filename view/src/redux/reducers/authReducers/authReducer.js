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
  isAuthenticated: null,
  _id: null,
  loading: true,
  auth: null,
  authType: '',
  token: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  // let user;
  // if (payload) {
  //   user = jwtDecode(payload?.token);
  // }

  switch (type) {
    case USER_LOADED:
      toast('Welcome...', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        auth: payload,
        authType: 'jwtAuth',
        token: payload.token,
        // _id: user?.id,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        auth: payload,
        authType: 'jwtAuth',
        token: payload.token,
        // _id: user?.id,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        auth: payload,
        authType: 'jwtAuth',
        token: payload.token,
        // _id: user?.id,
      };
    case GOOGLE_LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        authType: 'Google',
        token: payload,
        // _id: user?.id,
      };
    case GOOGLE_LOGIN_FAIL:
      break;
    case REGISTER_FAIL:
      break;
    case AUTH_ERROR:
      break;
    case LOGIN_FAIL:
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
        // _id: null,
      };
    default:
      return state;
  }
}
