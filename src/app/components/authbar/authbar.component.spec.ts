import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AuthbarComponent} from './authbar.component';
import {By} from '@angular/platform-browser';

describe('AuthbarComponent', () => {
  let component: AuthbarComponent;
  let fixture: ComponentFixture<AuthbarComponent>;
  const
    user1 = {name: 'John Doe'},
    user2 = {name: 'Micky Mouse'};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthbarComponent ]
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

  it('should indicate online', () => {
    const expectedClass = 'green';
    component.user = user1;
    component.online = true;
    fixture.detectChanges();
    const avatar = fixture.debugElement.query(By.css('.avatar')).nativeElement;
    expect(avatar.classList).toContain(expectedClass);
  });

  it('should indicate offline', () => {
    const expectedClass = 'green';
    component.user = user1;
    component.online = false;
    fixture.detectChanges();
    const avatar = fixture.debugElement.query(By.css('.avatar')).nativeElement;
    expect(avatar.classList).not.toContain(expectedClass);

  });
});
