import { combineReducers } from 'redux';
import authReducer from './authReducer';
import boardReducer from './projectPlannerReducers/boardReducer';
import cardsByIdReducer from './projectPlannerReducers/cardsByIdReducer';
import listsByIdReducer from './projectPlannerReducers/listByIdReducer';
import todoReducer from './todoReducer';

const appReducer = combineReducers({
  board: boardReducer,
  listsById: listsByIdReducer,
  cardsById: cardsByIdReducer,
  auth: authReducer,
  todos: todoReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
