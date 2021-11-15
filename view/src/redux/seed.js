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
}
