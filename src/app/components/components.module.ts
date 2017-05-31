import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgLogoComponent } from './ng-logo/ng-logo.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgLogoComponent],
  exports: [
    NgLogoComponent
  ]
})
export class ComponentsModule { }
