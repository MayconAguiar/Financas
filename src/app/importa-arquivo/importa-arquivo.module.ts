import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { ImportaComponent } from './importa/importa.component';
import { UploadButtonComponent } from '../upload-button/upload-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ImportaComponent, UploadButtonComponent],
  providers: [ AngularFireDatabase ]
})
export class ImportaArquivoModule { }
