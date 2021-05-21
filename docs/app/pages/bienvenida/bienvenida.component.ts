import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { PacientesService } from 'src/app/service/pacientes.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss'],
})
export class BienvenidaComponent {
  nombre: string;
  genero: string;
  rol: string;

  constructor(public loginService: LoginService, private router: Router, private pacientesService: PacientesService) {
    //OTRA SOLUCION PARA EL PROBLEMA DE ACTUALIZAR -> PUEDE FALLAR
    //espero a que cargue el userResp para recoger el nombre
    // setTimeout(()=>{​​​​​
    //   this.nombre = this.loginService.getAtribs().nombre;
    // }​​​​​, 700);
  }

  /*
  FUNCION PROBLEMA ACTUALIZAR -> se carga antes la pagina bienvenida que pekin nos devuelva los atribs del doctor
  Entonces eso nos conlleva problemas ya que no saldria el nombre. Para ello hacemos que sea con un ngIf y asi cuando se haga
  la llamada de Pekin se actualice automaticamente 
  Para ello tengo que ponerlo como ngIf en html y tener cuidado con el caso del null
  */
  atribsDisponibles() {
    if (this.loginService.getAtribs() !== null) {
      this.nombre = this.loginService.getAtribs().nombre;
      this.genero = this.loginService.getAtribs().genero;
      if (this.loginService.getRolesUser().includes('Doctor'))//(this.loginService.getRolesUser().includes('doctor'))
        this.rol = 'Doctor';
      else if (this.loginService.getRolesUser().includes('TrabajadorLaboratorio'))
        this.rol = 'TrabajadorLaboratorio';
    }
    return this.nombre !== null && this.genero !== null;
  }


}
