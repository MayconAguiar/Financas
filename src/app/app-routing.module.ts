import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ImportaComponent } from './importa-arquivo/importa/importa.component';
import { CotacaoAtualComponent } from './cotacao-atual/cotacao-atual.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { AuthGuard } from './authGuard';
import { AlocacaoDeRecursosComponent } from './alocacao-de-recursos/alocacao-de-recursos.component';

const routes: Routes = [
  { path: '', redirectTo: '/alocacao', pathMatch: 'full' },
  { path: 'login',  component: LoginFormComponent },
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
