import {User} from './user.model';
import {Room} from './room.model';

export class Message {
  msg: string;
  id?: string;
  author?: User;
  room?: Room;
  sentAt?: Date;
  editedAt?: Date;
  time?: number;
}

export interface MessageItems {
  items: { [key: string]: Message; };
}
