import {Action} from '@ngrx/store';
import WS_EVENTS from '../shared/socket.io/events';
import {User} from '../models/user.model';
import {pascalize} from '../shared/util';
import {Message} from '../models/message.model';

export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';

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

export class SendMessageAction implements Action {
  readonly type = WS_SEND_MESSAGE;

  constructor(public payload: Message) {}
}

export class MessageAction implements Action {
  readonly type = WS_EVENTS.MESSAGE;

  constructor(public payload?: any) {}
}

export class ErrorMessageAction implements Action {
  readonly type = WS_EVENTS.ERROR_MESSAGE;

  constructor(public payload?: any) {}
}
