import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ImportaComponent } from './importa-arquivo/importa/importa.component';
import { CotacaoAtualComponent } from './cotacao-atual/cotacao-atual.component';
import { AuthGuard } from './authGuard';
import { AlocacaoDeRecursosComponent } from './alocacao-de-recursos/alocacao-de-recursos.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { OperacoesFechadasComponent } from './dashboard/operacoes-fechadas/operacoes-fechadas.component';
import { OperacoesAbertasComponent } from './dashboard/operacoes-abertas/operacoes-abertas.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent,
    children: [
      { path: '', component: LoginFormComponent }
    ] },
  { path: 'fechadas', component: OperacoesFechadasComponent,  canActivate: [AuthGuard]   },
  { path: 'abertas', component: OperacoesAbertasComponent,  canActivate: [AuthGuard]   },
  { path: 'dashboard', component: DashboardComponent,  canActivate: [AuthGuard]   },
  { path: 'cotacaoatual', component: CotacaoAtualComponent,  canActivate: [AuthGuard]   },
  { path: 'importa', component: ImportaComponent,  canActivate: [AuthGuard]   },
  { path: 'alocacao', component: AlocacaoDeRecursosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
