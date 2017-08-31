import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { NgLogoComponent } from './ng-logo/ng-logo.component';
import { AuthbarComponent } from './authbar/authbar.component';
import { AvatarComponent } from './avatar/avatar.component';
import { LogoutComponent } from './logout/logout.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {MessageSenderComponent} from './message-sender/message-sender.component';

const componentList = [
    NgLogoComponent,
    AuthbarComponent,
    LogoutComponent,
    SidebarComponent,
    SpinnerComponent,
    MessageSenderComponent,
    AvatarComponent
];
@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ...componentList
  ],
  exports: [
    ...componentList
  ]
})
export class ComponentsModule { }
