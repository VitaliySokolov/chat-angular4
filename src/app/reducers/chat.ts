import WS_EVENTS from '../../shared/socket.io/events';

import {User} from 'app/models/user.model';

export interface State {
  users: User[];
};

export const initialState: State = {
  users: []
};

export function reducer(state = initialState, action): State {
  switch (action.type) {
    case WS_EVENTS.USERS: {
      return {
        ...state,
        users: action.payload.users,
      };
    }
    default: {
      return state;
    }
  }
}

export const getUsers = (state: State) => state.users;
