import { Routes } from '@angular/router';

import { HomeComponent } from './containers/home/home.component';
import { LoginComponent } from './containers/login/login.component';
import { ChatsComponent } from './containers/chats/chats.component';
import { RegisterComponent } from './containers/register/register.component';
import {NotFoundComponent} from './containers/not-found/not-found.component';
import {AuthGuard} from 'app/services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'chats',
    component: ChatsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
