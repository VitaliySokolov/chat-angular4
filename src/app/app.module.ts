import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { SharedModule } from './shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './containers/app/app.component';
import { HomeComponent } from './containers/home/home.component';
import { ChatsComponent } from './containers/chats/chats.component';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { ComponentsModule } from './components/components.module';

import { AuthService } from './services/auth.service';
import { WsService } from './services/ws.service';
import { AuthEffects } from './effects/auth';
import { WsAuthEffects } from './effects/ws-auth';
import { ChatEffects } from './effects/chat';

import { AuthGuard } from 'app/services/auth.guard';

import { Async2arrayPipe } from './pipes/async2array.pipe';

import { routes } from './routes';
import { reducer } from './reducers';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatsComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    Async2arrayPipe,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    ComponentsModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(AuthEffects),
    EffectsModule.run(WsAuthEffects),
    EffectsModule.run(ChatEffects)
  ],
  providers: [AuthService, WsService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
