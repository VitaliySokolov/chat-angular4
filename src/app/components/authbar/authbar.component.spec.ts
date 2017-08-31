import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';

import {AuthbarComponent} from './authbar.component';
import { AvatarComponent } from './../avatar/avatar.component';

describe('AuthbarComponent', () => {
  let component: AuthbarComponent;
  let fixture: ComponentFixture<AuthbarComponent>;
  const
    user1 = {name: 'John Doe'},
    user2 = {name: 'Micky Mouse'};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthbarComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthbarComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display user name', () => {
    const expectedName = user1.name;
    component.user = user1;
    fixture.detectChanges();
    const userName = fixture.debugElement.query(By.css('.user-name')).nativeElement;
    expect(userName.textContent.trim()).toBe(expectedName);
    expect(userName.textContent.trim()).not.toBe('');
  });

});
