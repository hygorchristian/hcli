import { call, put } from 'redux-saga/effects';
import Api from '~/services/api';

import { LuanaActions } from '~/store/ducks/vibradores/luana';

export function* loadLuana() {
  try {
    // const response = yield call(Api.route, param );
    // yield put(LuanaActions.luanaSuccess(response.data));
  } catch (e) {
    yield put();
    // LuanaActions.luanaFailure('Mensagem de erro')
  }
}
