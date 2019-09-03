import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// Action Types & Creators

const { Types, Creators } = createActions({
  example: ['data'],
});

export const MusicsTypes = Types;
export const MusicsActions = Creators;

// Initial State

export const INITIAL_STATE = Immutable({
  data: [],
});

// Reducer Functions

const exampleImplementation = (state, { data }) => ({ ...state, data });

// Reducer

export const MusicsReducer = createReducer(INITIAL_STATE, {
  [Types.EXAMPLE]: exampleImplementation,
});
