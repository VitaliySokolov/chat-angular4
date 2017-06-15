import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgLogoComponent } from './ng-logo/ng-logo.component';
import { AuthbarComponent } from './authbar/authbar.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgLogoComponent, AuthbarComponent, LogoutComponent],
  exports: [
    NgLogoComponent,
    AuthbarComponent,
    LogoutComponent
  ]
})
export class ComponentsModule { }
