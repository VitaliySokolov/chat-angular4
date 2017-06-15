import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
        .map(res => res.json())
        .map(res => {
          const userId = res.user.id;
          localStorage.setItem('user', userId);
          localStorage.setItem(userId, JSON.stringify(res));
          this.router.navigate(['/chats']);
          return { type: auth.LOGIN_SUCCESS, payload: res };
        })
        .catch(res => {
          console.error(res);
          return Observable
            .of({
              type: auth.LOGIN_FAILED,
              payload: res.status
                ? res.json()
                : { error: 'unknown error' }
            });
        })
    );

  @Effect() register$: Observable<Action> = this.actions$
    .ofType(auth.REGISTER)
    .map(toPayload)
    .switchMap(payload =>
      this.authService.register(payload)
        .map(res => {
          return { type: auth.REGISTER_SUCCESS};
        })
        .catch(res => {
          return Observable
            .of({
              type: auth.REGISTER_FAILED,
              payload: res.status
                ? res.json()
                : { error: 'unknown error' }
            });
        })
    );

  @Effect({dispatch: false}) logout$: Observable<Action> = this.actions$
    .ofType(auth.LOGOUT)
    .do(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/home']);
    });

  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router
  ) { }
}
