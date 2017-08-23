import { Action } from '@ngrx/store';

export const AUTHENTICATE = 'AUTHENTICATE';
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAILURE = 'AUTHENTICATE_FAILURE';
export const CONNECT = 'CONNECT';
export const DISCONNECT = 'DISCONNECT';

export class AuthenticateAction implements Action {
  readonly type = AUTHENTICATE;

  constructor(public payload?: any) { }
}

export class AuthenticateSuccessAction implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(public payload?: any) { }
}

export class AuthenticateFailureAction implements Action {
  readonly type = AUTHENTICATE_FAILURE;

  constructor(public payload?: any) { }
}

export class ConnectAction implements Action {
  readonly type = CONNECT;
}

export class DisconnectAction implements Action {
  readonly type = DISCONNECT;
}
