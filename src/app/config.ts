import { environment } from '../environments/environment';

export const SERVER = environment.production
  ? 'https://vs-chat-server.herokuapp.com'
  : 'http://localhost:3001';

export const API_LOGIN = SERVER + '/login';
export const API_SIGNUP = SERVER + '/signup';
