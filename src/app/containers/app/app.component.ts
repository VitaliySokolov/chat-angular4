import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as Auth from '../../actions/auth';
import * as AppStore from '../../reducers';

@Component({
  selector: 'ct-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  logged$: Observable<boolean>;
  user$: Observable<any>;
  connected$: Observable<boolean>;

  constructor(
    private store: Store<AppStore.State>
  ) { }

  ngOnInit() {
    this.autoLogin();
    this.logged$ = this.store.select(AppStore.getLogged);
    this.user$ = this.store.select(AppStore.getUser);
    this.connected$ = this.store.select(AppStore.getAuthenticated);
  }

  autoLogin() {
    const userId = localStorage.getItem('user');
    if (userId) {
      const userInfo = localStorage.getItem(userId);
      if (userInfo) {
        const payload = JSON.parse(userInfo);
        this.store.dispatch(new Auth.LoginSuccessAction(payload));
      }
    }
  }

  handleLogoutClick() {
    this.store.dispatch(new Auth.LogoutAction());
  }
}
