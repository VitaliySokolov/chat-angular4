import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {LoginComponent} from './login.component';

class FormBuilderStub {
  group() {
    return {pristine: true};
  }
}
class StoreStub {
  dispatch() {}
  select() {
    return Observable.of(true);
  }
}
class RouterStub {
  navigate() {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        {provide: FormBuilder, useClass: FormBuilderStub},
        {provide: Store, useClass: StoreStub},
        {provide: Router, useClass: RouterStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
