import shortid from 'shortid';
import { ADD_LIST, ADD_CARD } from './projectPlannerTypes';

export const addFirstList = (firstListId = shortid.generate()) => ({
  type: ADD_LIST,
  payload: {
    listId: firstListId,
    cardId: shortid.generate(),
    cardText: 'First card',
  },
});

export const addFirstCard = (firstListId = shortid.generate()) => ({
  type: ADD_CARD,
  payload: {
    listId: firstListId,
    cardId: shortid.generate(),
    cardText: 'First card',
  },
});

export const addSecondCard = (firstListId = shortid.generate()) => ({
  type: ADD_CARD,
  payload: {
    listId: firstListId,
    cardId: shortid.generate(),
    cardText: 'Second card',
  },
});

export const addSecondList = (secondListId = shortid.generate()) => ({
  type: ADD_LIST,
  payload: { listId: secondListId, listTitle: 'Second list' },
});

export const addSubCardOne = (firstListId = shortid.generate()) => ({
  type: ADD_CARD,
  payload: {
    listId: firstListId,
    cardId: shortid.generate(),
    cardText: 'Card 1',
  },
});

export const addSubCardTwo = (firstListId = shortid.generate()) => ({
  type: ADD_CARD,
  payload: {
    listId: firstListId,
    cardId: shortid.generate(),
    cardText: 'Card 2',
  },
});
