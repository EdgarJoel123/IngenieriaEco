import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { VistaAdminComponent } from './components/vista-admin/vista-admin.component';
import { VistaAsesorComponent } from './components/vista-asesor/vista-asesor.component';

const routes: Routes = [
  {
    path: '', component: InicioComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'vista-admin', component: VistaAdminComponent
  },
  {
    path: 'vista-asesor', component: VistaAsesorComponent
  },
  {
    path: '**', redirectTo:'', pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
