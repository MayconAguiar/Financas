import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemDashboard } from './ItemDashboard';
import { EntradaOuSaida } from './EntradaOuSaida';
import { ItemArquivo } from '../../importa-arquivo/arquivos/itemArquivo';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ ItemDashboard, EntradaOuSaida, ItemArquivo ]
})
export class DashboardModule { }
