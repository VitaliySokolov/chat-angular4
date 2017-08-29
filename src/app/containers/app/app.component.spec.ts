import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppComponent} from './app.component';
import {ComponentsModule} from '../../components/components.module';
import {WsService} from '../../services/ws.service';

@Component({
  template: '<div></div>'
})
class DummyComponent {
}

class StoreStub {}
class WsServiceStub {}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ComponentsModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: DummyComponent },
          { path: 'chats', component: DummyComponent },
          { path: 'login', component: DummyComponent },
          { path: 'register', component: DummyComponent },
        ])
      ],
      declarations: [
        AppComponent,
        DummyComponent,
      ],
      providers: [
        {provide: Store, useValue: StoreStub},
        {provide: WsService, useValue: WsServiceStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have navbar`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('nav')).toBeTruthy();
  }));

});
