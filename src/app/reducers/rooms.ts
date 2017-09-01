import WS_EVENTS from '../shared/socket.io/events';

import { Room, commonRoom, Rooms } from '../models/room.model';

import { array2object } from '../shared/util';

export interface State {
  items: Rooms;
  loading: boolean;
}

export const initialState: State = {
  items: {
    [commonRoom.id]: commonRoom
  },
  loading: false
};

export function reducer(state = initialState, action): State {
  switch (action.type) {
    case WS_EVENTS.ROOMS: {
      const { rooms } = action.payload,
        items = array2object(rooms, 'id');
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

export const getRoomsLoading = (state: State) => state.loading;
