import { isDevMode } from '@angular/core';
import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import * as fromAuth from './auth';

export interface State {
  auth: fromAuth.State;
}

const reducers = {
  auth: fromAuth.reducer
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

export const getAuthState = (state: State) => state.auth;
export const getLogged = createSelector(getAuthState, fromAuth.getLogged);
export const getLogging = createSelector(getAuthState, fromAuth.getLogging);
export const getRegistered = createSelector(getAuthState, fromAuth.getRegistered);
export const getRegistering = createSelector(getAuthState, fromAuth.getRegistering);
export const getToken = createSelector(getAuthState, fromAuth.getToken);
export const getUser = createSelector(getAuthState, fromAuth.getUser);
