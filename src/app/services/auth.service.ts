import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_LOGIN, API_SIGNUP } from '../config';

const headers = new Headers({ 'Content-Type': 'application/json' });
const options = new RequestOptions({ headers });

@Injectable()
export class AuthService {
  constructor(private http: Http) { }

  login(user: any): Observable<any> {
    return this.http
      .post(API_LOGIN, user, options);
  }

  register(user: any): Observable<any> {
    return this.http
    .post(API_SIGNUP, user, options);

  saveLoginInfo(data: any) {
    const userId = data.user.id;
    localStorage.setItem('user', userId);
    localStorage.setItem(userId, JSON.stringify(data));
  }
}
