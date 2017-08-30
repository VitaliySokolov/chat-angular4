import {User} from './user.model';
import {Room} from './room.model';
import {Message} from './message.model';

export class OldMessage {
  msg: string;
  id?: string;
  user?: User;
  time?: Date;
}

export function oldMessagesToNew(messages: OldMessage[]): Message[] {
  return messages.map(oldMessageToNew);
}

export function oldMessageToNew(message: OldMessage): Message {
  return {
    id: message.id,
    text: message.msg,
    sentAt: message.time,
    author: message.user
  };
}
