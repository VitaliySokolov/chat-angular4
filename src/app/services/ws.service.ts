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

  authenticateUser(tokenObj) {
    if (!this.connected) {
      this.reconnect();
    } else {
      this.socket.open();
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

        this.socket.on('authenticated', () => {
          this.store.dispatch(new wsAuth.AuthenticateSuccessAction());
        });

        this.socket.on('unauthorized', err => {
          this.store.dispatch(new wsAuth.AuthenticateFailureAction({
            error: err.message
          }));
        });

        this.socket.on('disconnect', reason => {
          // if server is disconnected
          if (reason === 'transport close') {
            this.store.dispatch(new wsAuth.DisconnectAction());
            setTimeout(() => {
              this.reconnect();
            }, 1000);
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
    this.socket.disconnect();
  }
}
