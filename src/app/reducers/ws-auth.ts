import * as wsAuth from '../actions/ws-auth';

export interface State {
  authenticating: boolean;
  authenticated: boolean;
  connected: boolean;
  error: string;
};

export const initialState: State = {
  authenticating: false,
  authenticated: false,
  connected: false,
  error: '',
};

export function reducer(state = initialState, action): State {
  switch (action.type) {
    case wsAuth.AUTHENTICATE: {
      return {
        ...state,
        authenticated: false,
        authenticating: true
      };
    }

    case wsAuth.AUTHENTICATE_SUCCESS: {
      return {
        ...state,
        authenticated: true,
        authenticating: false
      };
    }

    case wsAuth.AUTHENTICATE_FAILURE: {
      const { error } = action.payload;
      return {
        ...state,
        authenticated: false,
        authenticating: false,
        error,
      };
    }

    case wsAuth.CONNECT: {
      return {
        ...state,
        connected: true
      };
    }

    case wsAuth.DISCONNECT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getAuthenticated = (state: State) => state.authenticated;
export const getAuthenticating = (state: State) => state.authenticating;
export const getError = (state: State) => state.error;
export const getConnected = (state: State) => state.connected;
