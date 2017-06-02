import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { SERVER } from '../../config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WsService {
  private socket;

  constructor() { }

  authenticateUser(tokenObj) {
    return Observable.create(observer => {
      this.socket = io(SERVER);
      this.socket.on('connect', () => {
        this.socket.on('authenticated', () => {
          observer.next('OK');
        });
        this.socket.on('unauthorized', err => {
          observer.error({error: err.message});
        });
        console.log(tokenObj);
        this.socket.emit('authenticate', tokenObj);
      });
    });
  }

  getSocket() {
    return this.socket;
  }

  // onAuthenticate() {
  //   return Observable
  //     .fromEventPattern(cb =>
  //       this.socket.on('authenticate', cb)
  // }

}
