import WS_EVENTS from '../shared/socket.io/events';

import { Messages } from '../models/message.model';
import { oldMessagesToNew, oldMessageToNew } from '../models/old-message.model';

import { array2object } from '../shared/util';

export interface State {
  items: Messages;
  loading: boolean;
}

export const initialState: State = {
  items: null,
  loading: false
};

export function reducer(state = initialState, action): State {
  switch (action.type) {

    case WS_EVENTS.MESSAGES: {
      const { messages, roomId } = action.payload,
        items = array2object(oldMessagesToNew(messages), 'id');
      return {
        ...state,
        items: {
          ...state.items,
          ...items
        }
      };
    }

    case WS_EVENTS.MESSAGE: {
      const message = action.payload,
        items = array2object([oldMessageToNew(message)], 'id');
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

export const getMessagesLoading = (state: State) => state.loading;
