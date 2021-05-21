import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AnclajeLoginComponent } from './pages/anclaje-login/anclaje-login.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { HomePageComponent } from './pages/home/home.page.component';
import { LoginPageComponent } from './pages/login/login.page.component';
import { ConsultasDetalleComponent } from './pages/pacientes/detalle/consultas-detalle/consultas-detalle.component';
import { DetalleComponent } from './pages/pacientes/detalle/detalle.component';
import { PruebasDetalleComponent } from './pages/pacientes/detalle/pruebas-detalle/pruebas-detalle.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ComparacionComponent } from './pages/techsuite-wiki/comparacion/comparacion.component';
import { MedicamentoComponent } from './pages/techsuite-wiki/medicamento/medicamento.component';
import { TechsuiteWikiComponent } from './pages/techsuite-wiki/techsuite-wiki.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'home', component: AnclajeLoginComponent, //puesto asi para que en pagina quede mejor
    canActivate: [AuthGuard],
    children: [
      { path: 'bienvenida', component: BienvenidaComponent },
      { path: 'techsuite-wiki', component: TechsuiteWikiComponent },
      { path: 'techsuite-wiki/medicamento', component: MedicamentoComponent },
      { path: 'techsuite-wiki/comparacion', component: ComparacionComponent },
      { path: 'pacientes', component: PacientesComponent },
      { path: 'pacientes/detalle', component: DetalleComponent },
      {path: 'pacientes/detalle/analisis', component:PruebasDetalleComponent},
      {path: 'pacientes/detalle/consultas', component:ConsultasDetalleComponent},
    ],
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
