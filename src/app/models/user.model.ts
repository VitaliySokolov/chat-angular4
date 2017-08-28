export class User {
  username: string;
  id?: string;
  password?: string;
  email?: string;
  createdAt?: Date;
  online?: boolean;
}

export interface UserItems {
  items: { [key: string]: User; };
}
