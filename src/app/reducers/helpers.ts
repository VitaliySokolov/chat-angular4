import { isDevMode } from '@angular/core';
import { ActionReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

export function createReducer(reducerList, asyncReducers = {}): ActionReducer<any> {
  if (isDevMode()) {
    return compose(storeFreeze, combineReducers)(Object.assign(reducerList, asyncReducers));
  }

  return combineReducers(Object.assign(reducerList, asyncReducers));
}
