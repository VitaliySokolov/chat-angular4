import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { SERVER } from '../config';
import { Observable } from 'rxjs/Observable';

import * as appRoot from '../reducers';
import { Store } from '@ngrx/store';
import * as wsAuth from '../actions/ws-auth';
import * as chatActions from '../actions/chat';

import WS_EVENTS from '../shared/socket.io/events';

@Injectable()
export class WsService {
  private socket: SocketIOClient.Socket;
  private token: string;
  private authed: boolean;
  private connected = false;

  constructor(
    private store: Store<appRoot.State>
  ) {
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
      this.socket.on('connect', () => {
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

        // when web sockets events are happened actions are dispatched
        Object.keys(WS_EVENTS).forEach(key => {
          this.onEvent(WS_EVENTS[key]);
        });

        if (this.token) {
          this.store
            .dispatch(new wsAuth.AuthenticateAction({ token: this.token }));
        }
      });
    }
  }

  reconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.initSocket();
  }

  disconnect() {
    this.socket.disconnect();
    this.socket = null;
  }

  onEvent(eventName: string): void {
    this.socket.on(eventName, data => {
      this.store.dispatch(new chatActions[chatActions.actionNameFromEvent(eventName)](data));
    });
  }

  emitEvent(eventName: string, data?: any): void {
    this.socket.emit(eventName, ...data);
  }
}
