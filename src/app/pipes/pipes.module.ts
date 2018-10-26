import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyFormatPipe } from '../currency-format.pipe';
import { KeysPipe } from './keys.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CurrencyFormatPipe,
    KeysPipe
  ],
  exports: [
    CurrencyFormatPipe,
    KeysPipe
  ]
})
export class PipesModule { }
