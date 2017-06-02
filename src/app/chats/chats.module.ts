import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ChatsComponent } from './containers/chats/chats.component';
import { SidebarComponent } from './containers/sidebar/sidebar.component';

import { WsAuthEffects } from './effects/ws-auth';

import { WsService } from './services/ws.service';

import { ChatsRoutingModule } from './chats-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ChatsRoutingModule,
    StoreModule,
    EffectsModule.run(WsAuthEffects),
  ],
  declarations: [
    ChatsComponent,
    SidebarComponent,
  ],
  providers: [
    WsService
  ]
})
export class ChatsModule { }
