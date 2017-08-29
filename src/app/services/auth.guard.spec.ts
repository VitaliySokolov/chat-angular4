import { TestBed, async, inject } from '@angular/core/testing';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {AuthGuard} from './auth.guard';
import {Observable} from 'rxjs/Observable';

class DummyStore {
  select() {
    return Observable.of(true);
  }
}
class DummyRouter {}

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard,
        {provide: Store, useClass: DummyStore},
        {provide: Router, useClass: DummyRouter}
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
