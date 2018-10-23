import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { ImportaComponent } from './importa/importa.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ImportaComponent],
  providers: [ AngularFireDatabase ]
})
export class ImportaArquivoModule { }
