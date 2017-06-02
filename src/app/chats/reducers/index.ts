import { createReducer, State as AppState } from '../../reducers';

import * as fromWsAuth from './ws-auth';
import { createSelector } from 'reselect';

export interface ExtendedState extends AppState {
  wsAuth: fromWsAuth.State;
}

const reducers = {
  wsAuth: fromWsAuth.reducer
};

export const extendedReducer = createReducer(reducers);

export const getWsAuthState = (state: ExtendedState) => state.wsAuth;
export const getAuthenticating = createSelector(
  getWsAuthState, fromWsAuth.getAuthenticating
);
export const getAuthenticated = createSelector(
  getWsAuthState, fromWsAuth.getAuthenticated
);
export const getError = createSelector(
  getWsAuthState, fromWsAuth.getError
);
