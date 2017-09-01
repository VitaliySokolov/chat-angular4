import { createSelector } from 'reselect';

import { createReducer } from './helpers';

import * as fromUsers from './users';
import * as fromRooms from './rooms';
import * as fromMessages from './messages';

export interface State {
  users: fromUsers.State;
  rooms: fromRooms.State;
  messages: fromMessages.State;
}

const reducers = {
  users: fromUsers.reducer,
  rooms: fromRooms.reducer,
  messages: fromMessages.reducer
};

export function reducer(state: any, action: any) {
  return createReducer(reducers)(state, action);
}

export const getUsers = (state: State) => state.users;
export const getRooms = (state: State) => state.rooms;
export const getMessages = (state: State) => state.messages;

export const getUsersLoading = createSelector(getUsers, fromUsers.getUsersLoading);
export const getRoomsLoading = createSelector(getRooms, fromRooms.getRoomsLoading);
export const getMessagesLoading = createSelector(getMessages, fromMessages.getMessagesLoading);
