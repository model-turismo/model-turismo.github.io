import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConsultasService } from 'src/app/service/consultas.service';
import { LoginService } from 'src/app/service/login.service';
import { PacientesService } from 'src/app/service/pacientes.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  nombre_apellidos: string;
  idioma: string;

  constructor(private loginService: LoginService, private translateService: TranslateService, private router: Router, private pacientesService: PacientesService, private consultasService: ConsultasService) {

  }

  toggleSpanish() {
    sessionStorage.setItem("idiomaActual",'es');
    this.translateService.use('es');
  }

  toggleEnglish() {
    sessionStorage.setItem("idiomaActual",'en');
    this.translateService.use('en');
  }

  conectado() {
    //   this.nombre_apellidos = this.loginService.getName() + " " + this.loginService.getApellidos();
    return this.loginService.isLoggedIn();
  }

  //funcion para antes de registrarse como usuario disponer del boton de salir y asi cerrar sesion
  isImpostor() {
    return this.loginService.isImpostor();
  }

  

  /*
  FUNCION PROBLEMA ACTUALIZAR -> se carga antes la pagina que pekin nos devuelva los atribs del doctor
  Entonces eso nos conlleva problemas ya que no saldria el nombre. Para ello hacemos que sea con un ngIf y asi cuando se haga
  la llamada de Pekin se actualice automaticamente 
  Para ello tengo que ponerlo como ngIf en html y tener cuidado con el caso del null
  */
  // nombreDisponible() {
  //   if (this.loginService.getAtribs() !== null)
  //     this.nombre_apellidos = this.loginService.getAtribs().nombre + " " + this.loginService.getAtribs().apellidos;
  //   return this.nombre_apellidos !== null;
  // }

  //al desconectar debo de cerrar todas las funciones basicas que tengo tanto en memoria como en el programa
  disconnect() {
    //elimino los datos del login
    this.loginService.setAuthId(null);
    this.loginService.setUserResp(null);
    this.loginService.setImpostor(null);
    this.pacientesService.borrarDatos();
    this.consultasService.setNumPagConsultas(1);

    sessionStorage.clear();
    //navego hasta la pagina de inicio
    this.router.navigate(['']);
  }


}
