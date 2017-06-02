import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth.service';
import * as auth from '../actions/auth';

@Injectable()
export class AuthEffects {

  @Effect() login$: Observable<Action> = this.actions$
    .ofType(auth.LOGIN)
    .map(toPayload)
    .switchMap(payload =>
      this.authService.login(payload)
        .map(res => {
          const user = res.json();
          // new auth.AuthenticateAction({ token: user.token });
          // this.wsService.authenticateUser(user.token);
          return { type: auth.LOGIN_SUCCESS, payload: user };
        })
        .catch(res => {
          return Observable
            .of({
              type: auth.LOGIN_FAILED,
              payload: res.status
                ? res.json()
                : { error: 'unknown error' }
            });
        })
    );

  constructor(
    private authService: AuthService,
    private actions$: Actions
  ) { }
}
