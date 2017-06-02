import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { WsService } from '../services/ws.service';
import * as wsAuth from '../actions/ws-auth';

@Injectable()
export class WsAuthEffects {

  @Effect() authenticate$: Observable<Action> = this.actions$
    .ofType(wsAuth.AUTHENTICATE)
    .map(toPayload)
    .switchMap(payload =>
      this.wsService.authenticateUser(payload)
        .map(res => ({
          type: wsAuth.AUTHENTICATE_SUCCESS,
          payload: res
        }))
        .catch(err => Observable.of({
          type: wsAuth.AUTHENTICATE_FAILED,
          payload: err
        }))
    );

  constructor(
    private wsService: WsService,
    private actions$: Actions
  ) { }
}
