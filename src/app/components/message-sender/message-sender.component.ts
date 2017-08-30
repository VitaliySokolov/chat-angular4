import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';

import * as appStore from '../../reducers';
import * as chat from '../../actions/chat';
import {Message} from '../../models/message.model';

@Component({
  selector: 'ct-message-sender',
  templateUrl: './message-sender.component.html',
  styleUrls: ['./message-sender.component.scss']
})
export class MessageSenderComponent implements OnInit {
  sendForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<appStore.State>
  ) { }

  ngOnInit() {
    this.sendForm = this.fb.group({
      newMessage: ['', Validators.required]
    });
  }

  onSubmit() {
    const data = this.sendForm.value;
    const message: Message = {
      text: data.newMessage
    };
    this.store.dispatch(new chat.SendMessageAction(message));
  }

}
