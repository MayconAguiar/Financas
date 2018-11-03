import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { FormsModule } from '@angular/forms';
import { EqualValidator } from './equal-validator.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    FormDebugComponent,
    EqualValidator
  ],
  exports: [
    FormDebugComponent,
    EqualValidator
  ]
})
export class FomularioModule { }
