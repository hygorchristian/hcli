import { all, takeLatest } from 'redux-saga/effects';

import { LuanaTypes } from '~/store/ducks/vibradores/luana
import { LuanaTypes } from '~/store/ducks/vibradores/luana
//import-types

import { loadLuana } from './luana'
import { loadLuana } from './luana'
//import-saga

export default function*() {
  return yield all([
    takeLatest(LuanaTypes.LUANA_REQUEST, loadLuana)
    takeLatest(LuanaTypes.LUANA_REQUEST, loadLuana)
//saga
  ]);
}
