import { TestBed, inject } from '@angular/core/testing';
import {Http} from '@angular/http';

import {AuthService} from './auth.service';

class HttpStub {}

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: Http, useClass: HttpStub}
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
