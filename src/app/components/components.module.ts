import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { NgLogoComponent } from './ng-logo/ng-logo.component';
import { AuthbarComponent } from './authbar/authbar.component';
import { LogoutComponent } from './logout/logout.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {MessageSenderComponent} from './message-sender/message-sender.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    NgLogoComponent,
    AuthbarComponent,
    LogoutComponent,
    SidebarComponent,
    SpinnerComponent,
    MessageSenderComponent
  ],
  exports: [
    NgLogoComponent,
    AuthbarComponent,
    LogoutComponent,
    SidebarComponent,
    SpinnerComponent,
    MessageSenderComponent
  ]
})
export class ComponentsModule { }
