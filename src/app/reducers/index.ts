import { isDevMode } from '@angular/core';
import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import * as fromAuth from './auth';
import * as fromWsAuth from './ws-auth';
import * as fromChat from './chat';

export interface State {
  auth: fromAuth.State;
  wsAuth: fromWsAuth.State;
  chat: fromChat.State;
}

const reducers = {
  auth: fromAuth.reducer,
  wsAuth: fromWsAuth.reducer,
  chat: fromChat.reducer
};

export function createReducer(asyncReducers = {}): ActionReducer<any> {
  if (isDevMode()) {
    return compose(storeFreeze, combineReducers)(Object.assign(reducers, asyncReducers));
  }

  return combineReducers(Object.assign(reducers, asyncReducers));
}

export function reducer(state: any, action: any) {
  return createReducer()(state, action);
}
// export const extendedReducer = createReducer(reducers);

export const getAuthState = (state: State) => state.auth;
export const getWsAuthState = (state: State) => state.wsAuth;
export const getChatState = (state: State) => state.chat;

export const getLogged = createSelector(getAuthState, fromAuth.getLogged);
export const getLogging = createSelector(getAuthState, fromAuth.getLogging);
export const getLoginError = createSelector(getAuthState, fromAuth.getLoginError);
export const getRegistered = createSelector(getAuthState, fromAuth.getRegistered);
export const getRegistering = createSelector(getAuthState, fromAuth.getRegistering);
export const getRegisterError = createSelector(getAuthState, fromAuth.getRegisterError);
export const getToken = createSelector(getAuthState, fromAuth.getToken);
export const getUser = createSelector(getAuthState, fromAuth.getUser);

export const getAuthenticating = createSelector(
  getWsAuthState, fromWsAuth.getAuthenticating
);
export const getAuthenticated = createSelector(
  getWsAuthState, fromWsAuth.getAuthenticated
);
export const getError = createSelector(
  getWsAuthState, fromWsAuth.getError
);
export const getConnected = createSelector(
  getWsAuthState, fromWsAuth.getConnected
);

export const getUsers = createSelector(getChatState, fromChat.getUsers);
