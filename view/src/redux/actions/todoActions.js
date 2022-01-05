import axios from 'axios';
import { toast } from 'react-toastify';
import { API, setHeaders } from '../../api';

export const getTodos = () => (dispatch) => {
  API.get('/todo/read', setHeaders())
    .then((todos) => {
      dispatch({
        type: 'GET_TODOS',
        todos,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addTodo = (newTodo) => (dispatch, getState) => {
  const author = getState().auth.name;
  const uid = getState().auth._id;
  API.post('/todo/create', { ...newTodo, author, uid }, setHeaders())
    .then((todo) => {
      dispatch({
        type: 'ADD_TODO',
        todo,
      });
    })
    .catch((error) => {
      console.log(error.response);

      toast.error(error.response?.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
};

export const updateTodo = (updatedTodo, id) => (dispatch) => {
  API.put(`/todo/update/${id}`, updatedTodo, setHeaders())
    .then((todo) => {
      dispatch({
        type: 'UPDATE_TODO',
        todo,
      });
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response?.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
};

export const deleteTodo = (id) => (dispatch) => {
  API.delete(`/todo/delete/${id}`, setHeaders())
    .then(() => {
      dispatch({
        type: 'DELETE_TODO',
        id,
      });
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response?.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
};

export const checkTodo = (id) => (dispatch) => {
  axios
    .patch(`/todo/update/partial/${id}`, {}, setHeaders())
    .then((todo) => {
      dispatch({
        type: 'CHECK_TODO',
        todo,
      });
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response?.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
};
