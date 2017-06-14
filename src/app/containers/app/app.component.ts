import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AppStore from '../../reducers';
import * as Auth from '../../actions/auth';
import * as ChatStore from '../../chats/reducers';
import { Observable } from 'rxjs/Observable';
// import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'ct-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  logged$: Observable<boolean>;
  user$: Observable<any>;
  connected$: Observable<boolean>;
  // subscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppStore.State>
  ) { }

  ngOnInit() {
    this.autoLogin();
    this.logged$ = this.store.select(AppStore.getLogged);
    this.user$ = this.store.select(AppStore.getUser);
    this.connected$ = this.store.select(ChatStore.getAuthenticated);
    // this.subscriptions.push(
    //   this.logged$.subscribe(logged => this.logged = logged),
    //   this.user$.subscribe()
    // );
    // this.store.select(AppStore.getUser).subscribe(user => this.user = user);
  }

  autoLogin() {
    const userId = localStorage.getItem('user');
    if (userId) {
      const payload = JSON.parse(localStorage.getItem(userId));
      this.store.dispatch(new Auth.AutoLoginAction(payload));
    }
  }

  handleLogoutClick() {
    this.store.dispatch(new Auth.LogoutAction());
  }
}
