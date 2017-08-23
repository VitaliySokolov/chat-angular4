import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, Effect, toPayload} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';

import {WsService} from '../services/ws.service';
import * as auth from '../actions/auth';
import * as wsAuth from '../actions/ws-auth';

@Injectable()
export class WsAuthEffects {

  @Effect({dispatch: false})
  authenticate$: Observable<Action> = this.actions$
    .ofType(wsAuth.AUTHENTICATE)
    .map(toPayload)
    .do(payload =>
      this.wsService.authenticateUser(payload)
    );

  @Effect({dispatch: false})
  authSuccess$ = this.actions$
    .ofType(wsAuth.AUTHENTICATE_SUCCESS)
    .map(toPayload)
    .do(() => {
      // TODO: send notification to snackbar
    });

  @Effect()
  authFailure$ = this.actions$
    .ofType(wsAuth.AUTHENTICATE_FAILURE)
    .switchMap(() => Observable.of(new auth.LogoutAction()));

  @Effect({dispatch: false})
  disconnect$: Observable<Action> = this.actions$
    .ofType(wsAuth.DISCONNECT)
    .do(() => {
      this.wsService.disconnect();
    });

  constructor(
    private wsService: WsService,
    private actions$: Actions
  ) {}
}
