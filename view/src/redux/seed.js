<<<<<<< HEAD
import {
  addFirstCard,
  addFirstList,
  addSecondCard,
  addSecondList,
  addSubCardOne,
  addSubCardTwo,
} from './actions/projectPlannerActions';

export default function seed(store) {
  store.dispatch(addFirstList);

  store.dispatch(addFirstCard);

  store.dispatch(addSecondCard);

  store.dispatch(addSecondList);

  store.dispatch(addSubCardOne);

  store.dispatch(addSubCardTwo);
=======
import shortid from 'shortid';
import { ADD_CARD, ADD_LIST } from './constants/projectPlannerTypes';

export default function seed(store) {
  const firstListId = shortid.generate();

  store.dispatch({
    type: ADD_LIST,
    payload: { listId: firstListId, listTitle: 'First list' },
  });

  store.dispatch({
    type: ADD_CARD,
    payload: {
      listId: firstListId,
      cardId: shortid.generate(),
      cardText: 'First card',
    },
  });

  store.dispatch({
    type: ADD_CARD,
    payload: {
      listId: firstListId,
      cardId: shortid.generate(),
      cardText: 'Second card',
    },
  });

  const secondListId = shortid.generate();

  store.dispatch({
    type: ADD_LIST,
    payload: { listId: secondListId, listTitle: 'Second list' },
  });

  store.dispatch({
    type: ADD_CARD,
    payload: {
      listId: secondListId,
      cardId: shortid.generate(),
      cardText: 'Card 1',
    },
  });

  store.dispatch({
    type: ADD_CARD,
    payload: {
      listId: secondListId,
      cardId: shortid.generate(),
      cardText: 'Card 2',
    },
  });
>>>>>>> origin/development
}
