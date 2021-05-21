import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginPageComponent } from './pages/login/login.page.component';
import { HomePageComponent } from './pages/home/home.page.component';
import { CenterLayoutComponent } from './layouts/center/center.layout.component';
import { NavBarElementComponent } from './components/nav-bar/nav-bar-element/nav-bar-element.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TechsuiteWikiComponent } from './pages/techsuite-wiki/techsuite-wiki.component';
import { MedicamentoComponent } from './pages/techsuite-wiki/medicamento/medicamento.component';
import { ComparacionComponent } from './pages/techsuite-wiki/comparacion/comparacion.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { AnclajeLoginComponent } from './pages/anclaje-login/anclaje-login.component';
import { FilterPipe } from './pipes/filter.pipe';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DetalleComponent } from './pages/pacientes/detalle/detalle.component';
import { TitleParrafoComponent } from './components/title-parrafo/title-parrafo.component';
import { PruebasDetalleComponent } from './pages/pacientes/detalle/pruebas-detalle/pruebas-detalle.component';
import { ConsultasDetalleComponent } from './pages/pacientes/detalle/consultas-detalle/consultas-detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginPageComponent,
    HomePageComponent,
    CenterLayoutComponent,
    NavBarElementComponent,
    BienvenidaComponent,
    TechsuiteWikiComponent,
    MedicamentoComponent,
    ComparacionComponent,
    PacientesComponent,
    AnclajeLoginComponent,
    FilterPipe,
    PageNotFoundComponent,
    DetalleComponent,
    TitleParrafoComponent,
    PruebasDetalleComponent,
    ConsultasDetalleComponent,
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
