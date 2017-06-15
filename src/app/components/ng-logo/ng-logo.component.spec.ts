import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgLogoComponent } from './ng-logo.component';

describe('NgLogoComponent', () => {
  let component: NgLogoComponent;
  let fixture: ComponentFixture<NgLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
