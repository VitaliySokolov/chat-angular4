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
      };
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

    case auth.REGISTER: {
      return {
        ...state,
        registering: true,
        registered: false
      };
    }

    case auth.REGISTER_SUCCESS: {
      return {
        ...state,
        registering: false,
        registered: true
      };
    }

    case auth.REGISTER_FAILED: {
      const { error } = action.payload;
      return {
        ...state,
        registering: false,
        registered: false,
        error,
      };
    }

    case auth.CLEAR_ERROR_MESSAGE: {
      return state.error ? {...state, error: ''} : state;
    }

    case auth.LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLogged = (state: State) => state.logged;
export const getLogging = (state: State) => state.logging;
export const getLoginError = (state: State) => state.error;
export const getRegistered = (state: State) => state.registered;
export const getRegistering = (state: State) => state.registering;
export const getRegisterError = (state: State) => state.error;
export const getToken = (state: State) => state.token;
export const getUser = (state: State) => ({
  id: state.id,
  name: state.name
});
