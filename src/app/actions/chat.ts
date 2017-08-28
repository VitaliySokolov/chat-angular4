import {Action} from '@ngrx/store';
import WS_EVENTS from '../../shared/socket.io/events';
import {User} from '../models/user.model';
import {pascalize} from 'shared/util';

export class UsersAction implements Action {
  readonly type = WS_EVENTS.USERS;

  constructor(public payload?: User[]) {}
}

export class RoomsAction implements Action {
  readonly type = WS_EVENTS.ROOMS;

  constructor(public payload?: User[]) {}
}

export class MessagesAction implements Action {
  readonly type = WS_EVENTS.MESSAGES;

  constructor(public payload?: User[]) {}
}

export class JoinAction implements Action {
  readonly type = WS_EVENTS.CHAT_JOIN;

  constructor(public payload?: any) {}
}

export class LeaveAction implements Action {
  readonly type = WS_EVENTS.CHAT_LEAVE;

  constructor(public payload?: any) {}
}

export const actionNameFromEvent = (eventName: string): string =>
  pascalize(eventName) + 'Action';
