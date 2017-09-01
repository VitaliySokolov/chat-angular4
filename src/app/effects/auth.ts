import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
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

import {AuthService} from '../services/auth.service';
import * as auth from '../actions/auth';
import * as wsAuth from '../actions/ws-auth';

@Injectable()
export class AuthEffects {

  @Effect()
  login$: Observable<Action> = this.actions$
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

          return new auth.LoginSuccessAction(res);
        })
        .catch(res => {
          console.error(res);
          return Observable
            .of({
              type: auth.LOGIN_FAILURE,
              payload: res.status
                ? res.json()
                : {error: 'unknown error'}
            });
        })
    );

  @Effect()
  loginSuccess$: Observable<Action> = this.actions$
    .ofType(auth.LOGIN_SUCCESS)
    .map(toPayload)
    .switchMap(data => {
      return Observable.of(new wsAuth.AuthenticateAction({token: data.token}));
    });


  @Effect()
  register$: Observable<Action> = this.actions$
    .ofType(auth.REGISTER)
    .map(toPayload)
    .switchMap(payload =>
      this.authService.register(payload)
        .map(res => {
          return {type: auth.REGISTER_SUCCESS};
        })
        .catch(res => {
          return Observable
            .of({
              type: auth.REGISTER_FAILURE,
              payload: res.status
                ? res.json()
                : {error: 'unknown error'}
            });
        })
    );

  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType(auth.LOGOUT)
    .do(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/home']);
    })
    .switchMap(() =>
      Observable.of(new wsAuth.DisconnectAction()));

  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router
  ) {}
}
