import {User} from './user.model';
import {Room} from './room.model';

export class Message {
  text: string;
  id?: string;
  author?: User;
  room?: Room;
  sentAt?: Date;
  editedAt?: Date;
}

export interface Messages {
  [key: string]: Message;
}
