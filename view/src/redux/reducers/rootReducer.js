import { combineReducers } from 'redux';
import boardReducer from './projectPlannerReducers/boardReducer';
import cardsByIdReducer from './projectPlannerReducers/cardsByIdReducer';
import listsByIdReducer from './projectPlannerReducers/listByIdReducer';

const rootReducer = combineReducers({
  board: boardReducer,
  listsById: listsByIdReducer,
  cardsById: cardsByIdReducer,
});

export default rootReducer;
