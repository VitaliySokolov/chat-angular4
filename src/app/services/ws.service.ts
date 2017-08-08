import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { SERVER } from '../config';
import { Observable } from 'rxjs/Observable';

import * as appRoot from '../reducers';
import { Store } from '@ngrx/store';
import * as wsAuth from '../actions/ws-auth';

@Injectable()
export class WsService {
  private socket: SocketIOClient.Socket;
  private token: string;
  private authed: boolean;
  private connected = false;

  constructor(
    private store: Store<appRoot.State>
  ) {
    console.log('ws start');
    this.initSocket();
    this.store
      .select(appRoot.getToken)
      .subscribe(token => this.token = token);
    this.store
      .select(appRoot.getConnected)
      .subscribe(connected => this.connected = connected);
  }

  // authenticateUser(tokenObj) {
  //   return Observable.create(observer => {
  //     this.socket = io(SERVER);
  //     this.socket.on('connect', () => {
  //       this.socket.on('authenticated', () => {
  //         observer.next('OK');
  //       });
  //       this.socket.on('unauthorized', err => {
  //         observer.error({ error: err.message });
  //       });
  //       this.socket.emit('authenticate', tokenObj);
  //     });
  //   });
  // }
  authenticateUser(tokenObj) {
    console.log('before auth');
    console.log(this.socket);
    if (!this.connected) {
      this.reconnect();
    } else {
      this.socket.emit('authenticate', tokenObj);
    }
  }

  getSocket() {
    return this.socket;
  }

  initSocket() {
    if (!this.socket) {
      this.socket = io(SERVER);
      console.log('after create socket');
      this.socket.on('connect', () => {
        console.log('before connect action');
        this.store.dispatch(new wsAuth.ConnectAction());

        this.socket.on('authenticated', (data) => {
          this.store.dispatch(new wsAuth.AuthenticateSuccessAction(data));
        });

        this.socket.on('unauthorized', err => {
          this.store.dispatch(new wsAuth.AuthenticateFailedAction({
            error: err.message
          }));
        });

        this.socket.on('disconnect', reason => {
          // if server is disconnected
          if (reason === 'transport close') {
            this.disconnect();
          }
        });

        if (this.token) {
          this.store
            .dispatch(new wsAuth.AuthenticateAction({ token: this.token }));
        }
      });
    }
  }

  reconnect() {
    this.socket.disconnect();
    this.socket = null;
    this.initSocket();
  }

  disconnect() {
    this.store.dispatch(new wsAuth.DisconnectAction());
    this.socket.disconnect();
  }

  // onAuthenticate() {
  //   return Observable
  //     .fromEventPattern(cb =>
  //       this.socket.on('authenticate', cb)
  // }

}
