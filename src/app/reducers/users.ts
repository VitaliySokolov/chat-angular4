import WS_EVENTS from '../shared/socket.io/events';

import {Users} from '../models/user.model';

import {array2object} from '../shared/util';

export interface State {
  items: Users;
  loading: boolean;
}

export const initialState: State = {
  items: {},
  loading: false
};

export function reducer(state = initialState, action): State {
  switch (action.type) {
    case WS_EVENTS.USERS: {
      const {users} = action.payload,
        items = array2object(users, 'id');
      return {
        ...state,
          items: {
            ...state.items,
            ...items
          }
      };
    }

    case WS_EVENTS.CHAT_JOIN: {
      const {user, time} = action.payload,
      items = {[user.id]: {...(state.items[user.id] || user), online: true}};
      return {...state,
        items: {
            ...state.items,
            ...items
          }
      };
    }

    case WS_EVENTS.CHAT_LEAVE: {
      const {user, time} = action.payload,
        items = {[user.id]: {...(state.items[user.id] || user), online: false}};
      return {
        ...state,
          items: {
            ...state.items,
            ...items
        }
      };
    }

    default: {
      return state;
    }
  }
}

export const getUsersLoading = (state: State) => state.loading;
