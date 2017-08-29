import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as auth from '../../actions/auth';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'ct-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss'
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  logged: boolean;
  loginError$: Observable<string>;
  logging$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.State>,
    private router: Router
  ) {
    this.createForm();
   }

  ngOnInit() {
    this.store.dispatch(new auth.ClearErrorMessageAction());
    this.store
      .select(fromRoot.getLogged)
      .subscribe(logged => this.logged = logged);
    if (this.logged) {
      this.router.navigate(['/home']);
    }
    this.loginError$ = this.store.select(fromRoot.getLoginError);
    this.logging$ = this.store.select(fromRoot.getLogging);
  }

  createForm() {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const data = this.loginForm.value;
    const user = {
      username: data.login,
      password: data.password
    };

    this.store.dispatch(new auth.LoginAction(user));
  }
}
