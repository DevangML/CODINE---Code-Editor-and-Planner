import { combineReducers } from 'redux';
import authReducer from './authReducers/authReducer';
import boardReducer from './projectPlannerReducers/boardReducer';
import cardsByIdReducer from './projectPlannerReducers/cardsByIdReducer';
import listsByIdReducer from './projectPlannerReducers/listByIdReducer';
import todoReducer from './todoReducer';

const rootReducer = combineReducers({
  board: boardReducer,
  listsById: listsByIdReducer,
  cardsById: cardsByIdReducer,
  auth: authReducer,
  todos: todoReducer,
});

export default rootReducer;
