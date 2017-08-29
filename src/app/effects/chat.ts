import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, Effect, toPayload} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';

import {WsService} from '../services/ws.service';
import WS_EVENTS from '../shared/socket.io/events';
import * as chatActions from '../actions/chat';

@Injectable()
export class WsAuthEffects {

  // @Effect()
  // users$: Observable<Action> = this.actions$
  //   .ofType(WS_EVENTS.CHAT_JOIN)
  //   .map(toPayload)
  //   .do(payload =>
  //     this.wsService.)
  //   );

  constructor(
    private wsService: WsService,
    private actions$: Actions
  ) {}
}
