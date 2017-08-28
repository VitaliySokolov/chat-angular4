import WS_EVENTS from '../../shared/socket.io/events';

import {UserItems} from '../models/user.model';
import {Room, commonRoom, RoomItems} from '../models/room.model';
import {array2object} from '../../shared/util';
import {MessageItems} from '../models/message.model';

export interface State {
  users: UserItems;
  rooms: RoomItems;
  messages: MessageItems;
}

export const initialState: State = {
  users: null,
  rooms: {
    items: {[commonRoom.id]: commonRoom}
  },
  messages: null
};

export function reducer(state = initialState, action): State {
  switch (action.type) {
    case WS_EVENTS.USERS: {
      const {users} = action.payload,
        items = array2object(users, 'id');
      return {
        ...state,
        users: {
          ...state.users,
          items
        },
      };
    }

    case WS_EVENTS.ROOMS: {
      const {rooms} = action.payload,
        items = array2object(rooms, 'id');
      return {
        ...state,
        rooms: {
          ...state.rooms,
          items: {
            ...state.rooms.items,
            ...items
          }
        }
      };
    }

    case WS_EVENTS.MESSAGES: {
      const {messages, roomId} = action.payload,
        items = array2object(messages, 'id');
      return {
        ...state,
        messages: {
          ...state.messages,
          items
        },
      };
    }

    default: {
      return state;
    }
  }
}

export const getUsers = (state: State) => state.users;
export const getRooms = (state: State) => state.rooms;
export const getMessages = (state: State) => state.messages;