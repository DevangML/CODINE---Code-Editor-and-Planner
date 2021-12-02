import { auth } from '../constants/authTypes';

export const signin = (formData, history) => async (dispatch) => {
  try {
    // signin the user

    history.push('/');
  } catch (err) {
    console.log(err);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    // signup the user

    history.push('/');
  } catch (err) {
    console.log(err);
  }
};
