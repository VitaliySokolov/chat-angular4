import { Action } from '@ngrx/store';

export const LOGIN  = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export class LoginAction implements Action {
  readonly type = LOGIN;

  constructor(public payload: any) { }
}
