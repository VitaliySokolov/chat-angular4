import {User} from './user.model';

export class Room {
  title: string;
  id?: string;
  creator?: User;
  createAt?: Date;
  users?: User[];

  constructor(title: string, id?: string, creator?: User, createAt?: Date, users?: User[] ) {
    this.title = title;
    if (id) {
      this.id = id;
    }
    if (creator) {
      this.creator = creator;
    }
    if (createAt) {
      this.createAt = createAt;
    }
    if (Array.isArray(this.users)) {
      this.users = [...users];
    }
  }
}

export const commonRoom = new Room('Common Room', '0');

export interface RoomItems {
  items: { [key: string]: Room; };
}
