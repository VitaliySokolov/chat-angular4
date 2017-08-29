import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {RegisterComponent} from './register.component';

class FormBuilderStub {
  group() {
    return {
      pristine: true,
      valueChanges: Observable.of(true),
      get() {}
    };
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

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
