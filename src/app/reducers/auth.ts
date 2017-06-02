import * as auth from '../actions/auth';

export interface State {
  id: string;
  name: string;
  logging: boolean;
  logged: boolean;
  registering: boolean;
  registered: boolean;
  error: string;
  token: string;
};

export const initialState: State = {
  id: '',
  name: '',
  logging: false,
  logged: false,
  registering: false,
  registered: false,
  error: '',
  token: '',
};

export function reducer(state = initialState, action): State {
  switch (action.type) {
    case auth.LOGIN: {
      return {
        ...state,
        logging: true ,
        logged: false,
        id: '',
        token: '',
      }
    }

    case auth.LOGIN_SUCCESS: {
      const { user, token } = action.payload;
      return {
        ...state,
        logging: false,
        logged: true,
        error: '',
        name: user.username,
        id: user.id,
        token
      };
    }

    case auth.LOGIN_FAILED: {
      const { error } = action.payload;
      return {
        ...state,
        logging: false,
        logged: false,
        error,
      };
    }

    default: {
      return state;
    }
  }
}

export const getLogged = (state: State) => state.logged;
export const getLogging = (state: State) => state.logging;
export const getRegistered = (state: State) => state.registered;
export const getRegistering = (state: State) => state.registering;
export const getToken = (state: State) => state.token;
