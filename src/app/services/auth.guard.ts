import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import * as appRoot from '../reducers';

@Injectable()
export class AuthGuard implements CanActivate {
  private login: boolean;
  private login$: Observable<boolean>;

  constructor(private store: Store<appRoot.State>, private router: Router) {
    this.login$ = store.select(appRoot.getLogged);
    this.login$.subscribe((login) => {
      this.login = login;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.login) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return this.login;
    }
  }
}
