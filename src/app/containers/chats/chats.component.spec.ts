import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ChatsComponent} from './chats.component';
import {Async2arrayPipe} from '../../pipes/async2array.pipe';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

class StoreStub {
  select() {
    return Observable.of({items: []});
  }
}

describe('ChatsComponent', () => {
  let component: ChatsComponent;
  let fixture: ComponentFixture<ChatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatsComponent, Async2arrayPipe ],
      providers: [
        {provide: Store, useClass: StoreStub},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
