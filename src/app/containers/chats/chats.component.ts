import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import * as AppStore from '../../reducers';
import * as wsAuth from '../../actions/ws-auth';
import {WsService} from '../../services/ws.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'ct-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit, OnDestroy {
  private authenticated$: Observable<boolean>;
  private authenticating$: Observable<boolean>;
  private logged$: Observable<boolean>;
  private token$: Observable<string>;
  private users$: Observable<User[]>;
  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppStore.State>,
    // private wsService: WsService
  ) {
    // this.authenticated$ = this.store.select(chatRoot.getAuthenticated);
    // this.authenticating$ = this.store.select(chatRoot.getAuthenticating);
    // this.logged$ = this.store.select(appRoot.getLogged);
    // this.token$ = this.store.select(appRoot.getToken);
    // this.wsService.initSocket();
  }

  ngOnInit() {
    // this.subscriptions.push(
    //   Observable.combineLatest(this.authenticated$, this.logged$, this.token$).subscribe(values => {
    //     const [authenticated, logged, token] = values;
    //     if (logged && !authenticated && token) {
    //       this.store
    //         .dispatch(new wsAuth.AuthenticateAction({ token }));
    //     }
    //   })
    // );
    this.users$ = this.store.select(AppStore.getUsers);
  }

  ngOnDestroy() {
    this.subscriptions
      .forEach(subscription => subscription.unsubscribe());
  }

}
