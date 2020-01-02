import { call, put } from 'redux-saga/effects';
import Api from '~/services/api';

import { DiabloActions } from '~/store/ducks/teste/diablo';

export function* listDiablo() {
  try {
    // const response = yield call(Api.route, param );
    // yield put(DiabloActions.diabloListSuccess(response.data));
  } catch (e) {
    yield put();
    // DiabloActions.diabloListFailure('Mensagem de erro')
  }
}

export function* itemDiablo() {
  try {
    // const response = yield call(Api.route, param );
    // yield put(DiabloActions.diabloItemSuccess(response.data));
  } catch (e) {
    yield put();
    // DiabloActions.diabloItemFailure('Mensagem de erro')
  }
}

export function* createDiablo() {
  try {
    // const response = yield call(Api.route, param );
    // yield put(DiabloActions.diabloCreateSuccess(response.data, 'Diablo criado com sucesso!'));
  } catch (e) {
    yield put();
    // DiabloActions.diabloCreateFailure('Mensagem de erro')
  }
}



