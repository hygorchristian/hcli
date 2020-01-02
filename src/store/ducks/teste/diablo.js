import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

//Types

const Types = {
  DIABLO_LIST_REQUEST: 'DIABLO_LIST_REQUEST_58261DF588254681',
  DIABLO_LIST_SUCCESS: 'DIABLO_LIST_SUCCESS_58261DF588254681',
  DIABLO_LIST_FAILURE: 'DIABLO_LIST_FAILURE_58261DF588254681',
  DIABLO_ITEM_REQUEST: 'DIABLO_ITEM_REQUEST_58261DF588254681',
  DIABLO_ITEM_SUCCESS: 'DIABLO_ITEM_SUCCESS_58261DF588254681',
  DIABLO_ITEM_FAILURE: 'DIABLO_ITEM_FAILURE_58261DF588254681',
  DIABLO_CREATE_REQUEST: 'DIABLO_CREATE_REQUEST_58261DF588254681',
  DIABLO_CREATE_SUCCESS: 'DIABLO_CREATE_SUCCESS_58261DF588254681',
  DIABLO_CREATE_FAILURE: 'DIABLO_CREATE_FAILURE_58261DF588254681',
  
};

// Action & Creators

const { Creators } = createActions({
  diabloListRequest: null,
  diabloListSuccess: ['data'],
  diabloListFailure: ['error'],
  diabloItemRequest: ['id'],
  diabloItemSuccess: ['data'],
  diabloItemFailure: ['error'],
  diabloCreateRequest: ['data'],
  diabloCreateSuccess: ['data', 'message'],
  diabloCreateFailure: ['error'],
  
});

export const DiabloTypes = Types;
export const DiabloActions = Creators;

// Initial State

export const INITIAL_STATE = Immutable({
  create:{
    data: null,
    message: null,
    loading: false,
    error: null,
  },
  item:{
    data: null,
    loading: false,
    error: null,
  },
  list:{
    data: [],
    loading: false,
    error: null,
  },
  
});

// Reducer Functions

const diabloCreateRequest = state => ({ ...state, create: { loading: true, error: null } });
const diabloCreateSuccess = (state, { data, message }) => ({ ...state, create: {data, message, loading: false, error: null}});
const diabloCreateFailure = (state, { error }) => ({ ...state, create: { error, loading: false } });
const diabloItemRequest = state => ({ ...state, item: { loading: true, error: null }});
const diabloItemSuccess = (state, { data }) => ({ ...state, item: { data, loading: false, error: null}});
const diabloItemFailure = (state, { error }) => ({ ...state, item: { error, loading: false }});
const diabloListRequest = state => ({ ...state, list: { loading: true, error: null }});
const diabloListSuccess = (state, { data }) => ({ ...state, list: { data, loading: false, error: null }});
const diabloListFailure = (state, { error }) => ({ ...state, list: { error, loading: false }});

// Reducer

export const DiabloReducer = createReducer(INITIAL_STATE, {
  [Types.DIABLO_LIST_REQUEST]: diabloListRequest,
  [Types.DIABLO_LIST_SUCCESS]: diabloListSuccess,
  [Types.DIABLO_LIST_FAILURE]: diabloListFailure,
  [Types.DIABLO_ITEM_REQUEST]: diabloItemRequest,
  [Types.DIABLO_ITEM_SUCCESS]: diabloItemSuccess,
  [Types.DIABLO_ITEM_FAILURE]: diabloItemFailure,
  [Types.DIABLO_CREATE_REQUEST]: diabloCreateRequest,
  [Types.DIABLO_CREATE_SUCCESS]: diabloCreateSuccess,
  [Types.DIABLO_CREATE_FAILURE]: diabloCreateFailure,
});
