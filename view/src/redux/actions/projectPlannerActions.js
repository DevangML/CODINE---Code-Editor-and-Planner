import shortid from 'shortid';
import { ADD_LIST, ADD_CARD } from './projectPlannerTypes';

const firstListId = shortid.generate();
const secondListId = shortid.generate();

export const addFirstList = (firstListId) => ({
  type: ADD_LIST,
  payload: {
    listId: firstListId,
    cardId: shortid.generate(),
    cardText: 'First card',
  },
});

export const addFirstCard = (firstListId) => ({
  type: ADD_CARD,
  payload: {
    listId: firstListId,
    cardId: shortid.generate(),
    cardText: 'First card',
  },
});

export const addSecondCard = (firstListId) => ({
  type: ADD_CARD,
  payload: {
    listId: firstListId,
    cardId: shortid.generate(),
    cardText: 'Second card',
  },
});

export const addSecondList = (secondListId) => ({
  type: ADD_LIST,
  payload: { listId: secondListId, listTitle: 'Second list' },
});

export const addSubCardOne = (firstListId) => ({
  type: ADD_CARD,
  payload: {
    listId: firstListId,
    cardId: shortid.generate(),
    cardText: 'Card 1',
  },
});

export const addSubCardTwo = (firstListId) => ({
  type: ADD_CARD,
  payload: {
    listId: firstListId,
    cardId: shortid.generate(),
    cardText: 'Card 2',
  },
});
