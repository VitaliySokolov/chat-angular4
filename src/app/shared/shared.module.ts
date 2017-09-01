import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

const modules = [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [],
  exports: [ ...modules ]
})
export class SharedModule { }
