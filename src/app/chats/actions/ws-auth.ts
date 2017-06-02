import { Action } from '@ngrx/store';

export const AUTHENTICATE = 'AUTHENTICATE';
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAILED = 'AUTHENTICATE_FAILED';

export class AuthenticateAction implements Action {
  readonly type = AUTHENTICATE;

  constructor(public payload?: any) { }
}
