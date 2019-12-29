import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

//Types

const Types = {
  LUANA_REQUEST: 'LUANA_REQUEST_F4B45959C114EC14',
  LUANA_SUCCESS: 'LUANA_SUCCESS_F4B45959C114EC14',
  LUANA_FAILURE: 'LUANA_FAILURE_F4B45959C114EC14',
}

// Action & Creators

const { Creators } = createActions({
  luanaRequest: null,
  luanaSuccess: ['data'],
  luanaFailure: ['error'],
});

export const LuanaTypes = Types;
export const LuanaActions = Creators;

// Initial State

export const INITIAL_STATE = Immutable({
  data: [],
  loading: false,
  error: null,
});

// Reducer Functions

const luanaRequest = state => ({ ...state, loading: true, error: null });
const luanaSuccess = (state, { data }) => ({ ...state, data, loading: false, error: null});
const luanaFailure = (state, { error }) => ({ ...state, error, loading: false });

// Reducer

export const LuanaReducer = createReducer(INITIAL_STATE, {
  [Types.LUANA_REQUEST]: luanaRequest,
  [Types.LUANA_SUCCESS]: luanaSuccess,
  [Types.LUANA_FAILURE]: luanaFailure,
});
