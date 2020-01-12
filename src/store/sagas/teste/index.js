
import { all, takeLatest } from 'redux-saga/effects';

import { DiabloTypes } from '~/store/ducks/teste/diablo';
// import-types

import { itemDiablo, listDiablo, createDiablo,  } from './diablo';
// import-saga

export default function*() {
  return yield all([
    takeLatest(DiabloTypes.DIABLO_ITEM_REQUEST, itemDiablo),
    takeLatest(DiabloTypes.DIABLO_LIST_REQUEST, listDiablo),
    takeLatest(DiabloTypes.DIABLO_CREATE_REQUEST, createDiablo),

// saga
  ]);
}
