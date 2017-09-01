import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, Effect, toPayload} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import {WsService} from '../services/ws.service';
import WS_EVENTS from '../shared/socket.io/events';
import * as chatActions from '../actions/chat';

@Injectable()
export class ChatEffects {

  @Effect({dispatch: false})
  sendMessage$: Observable<Action> = this.actions$
    .ofType(chatActions.WS_SEND_MESSAGE)
    .map(toPayload)
    .do(payload =>
      this.wsService.emitEvent(WS_EVENTS.MESSAGE, payload.text)
    );

  constructor(
    private wsService: WsService,
    private actions$: Actions
  ) {}
}
