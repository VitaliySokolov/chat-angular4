import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as AppStore from '../../reducers';
import { State as UsersState } from '../../reducers/users';
import { State as RoomsState } from '../../reducers/rooms';
import { State as MessagesState } from '../../reducers/messages';

@Component({
  selector: 'ct-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  users$: Observable<UsersState>;
  rooms$: Observable<RoomsState>;
  messages$: Observable<MessagesState>;

  constructor(
    private store: Store<AppStore.State>,
  ) { }

  ngOnInit() {
    this.users$ = this.store.select(AppStore.getUsers);
    this.rooms$ = this.store.select(AppStore.getRooms);
    this.messages$ = this.store.select(AppStore.getMessages);
  }

}
