import {TestBed, inject} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {WsService} from './ws.service';

class StoreStub {
  select() {
    return Observable.of(true);
  }
}

describe('WsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WsService,
        {provide: Store, useClass: StoreStub},
      ]
    });
  });

  it('should be created', inject([WsService], (service: WsService) => {
    expect(service).toBeTruthy();
  }));
});
