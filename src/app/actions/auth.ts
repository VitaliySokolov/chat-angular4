import { Action } from '@ngrx/store';

export const LOGIN  = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const REGISTER  = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const LOGOUT = 'LOGOUT';

export class LoginAction implements Action {
  readonly type = LOGIN;

  constructor(public payload: any) { }
}

export class RegisterAction implements Action {
  readonly type = REGISTER;

  constructor(public payload: any) { }
}
export class AutoLoginAction implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: any) { }
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;
}
