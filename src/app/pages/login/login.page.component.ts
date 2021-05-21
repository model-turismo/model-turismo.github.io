import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserResponse } from 'src/app/model/UserResponse';
import { LoginService } from 'src/app/service/login.service';

@Component({
  templateUrl: './login.page.component.html',
  styleUrls: ['./login.page.component.scss'],
  //encapsulation: ViewEncapsulation.None,
})
export class LoginPageComponent implements OnInit {
  user: User = new User(); //usuario recibido por login pagina -> dni y password
  tokenUsuario: number; //aqui guardo el token del usuario o el del doctor a simular
  tokenUsuarioASuplantar: string; //asi se puede meter cualquier cosa y no da fallo si meten letras no se muestre el mensaje

  userResp: UserResponse = new UserResponse(); //respuesta de backend con params del doctor
  roles: Array<string>;

  //mostrar mensaje en pantalla en caso de que algo haya ido mal
  mensaje_a_mostrar: boolean = false;
  mensajeImpostor: boolean = false;


  constructor(public loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    //si ya me encuentro logineado no tiene sentido volver al inicio, para eso que salga de sesion
    if (this.loginService.isLoggedIn() && !this.loginService.isImpostor()) {
      this.router.navigate(['home/bienvenida']);
    }
  }

  /* Funcion boton login, mandar usuario y redirigir a siguiente pagina */
  loging_with_backend() {
    this.loginService.getUserId(this.user).subscribe((AuthId) => {

      //si el usuario esta mal muestro mensaje
      if (AuthId === null) {
        this.mensaje_a_mostrar = true;
      } else {
        this.tokenUsuario = AuthId.token;

        //pido los roles para ver si es impostor / doctor / laboratorio
        this.loginService.getRoles(this.tokenUsuario).subscribe((roles) => {
          this.roles = roles;
          //si es impostor
          if (this.roles.includes('Impostor')) {
            //guardo para asi en caso de recarga siga en la misma pantalla -> necesito su dni para mandar clave
            sessionStorage.setItem('impostor', this.user.dni); 
            this.loginService.setImpostor(this.user.dni); //pongo para que asi salga boton de salir y cambiar a pantalla de impostor
          } else if (this.roles.includes('Doctor') || this.roles.includes('TrabajadorLaboratorio')) {
            this.avanzarPag();
          } else {
            this.mensaje_a_mostrar = true; //el usuario se encuentra registrado pero es un paciente
          }
        });
      }
    });
  }

  /* Funcion boton impostor, mandar token a backend para simular doctor */
  mandarImpostor() {
    //si lo que ha metido no es una clave valida (numeros) muestro mensaje
    if (isNaN(parseInt(this.tokenUsuarioASuplantar))) {
      this.mensajeImpostor = true;
    } else {
      //mando el dni del impostor y el token del doctor a simular
      this.loginService.impostor(this.loginService.getImpostor(), parseInt(this.tokenUsuarioASuplantar)).subscribe((AuthId) => {
        //si la llamada ha fallado muestro mensaje de incorrecto
        if (AuthId === null) {
          this.mensajeImpostor = true;
        } else {
          this.tokenUsuario = AuthId.token; //actualizo el token del usuario para asi poder continuar como si fuera ese doctor / lab

          //recojo su rol para comprobar que no es un paciente
          this.loginService.getRoles(this.tokenUsuario).subscribe((roles) => {
            this.roles = roles;
            if (this.roles.includes('Doctor') || this.roles.includes('TrabajadorLaboratorio')) {
              sessionStorage.removeItem('impostor');//lo borro ya que ya no es necesario
              this.loginService.setImpostor(null);
              this.avanzarPag();
            } else {
              this.mensaje_a_mostrar = true; //el usuario se encuentra registrado pero es un paciente
            }
          });

        }
      });
    }

  }

  //funcion para guardar el token, recoger los atribs del usuario y avanzar la pagina, de esta manera puedo usarlo tanto en
  //caso normal como caso impostor (habiendo cambiado el token al del doctor)
  avanzarPag() {
    //guardo el authId y roles y sus params en el login.service para asi no tener que estar llamando luego y mirar ahi
    this.loginService.setAuthId(this.tokenUsuario);
    this.loginService.setRoles(this.roles);

    //guardo el authId y roles en sessionStorage para asi al navegar mediante la url pueda continuar (como se recarga si no se pierde)
    sessionStorage.setItem('authId', this.tokenUsuario.toString());
    sessionStorage.setItem('roles', JSON.stringify(this.roles));



    //recojo sus atribs y los guardo
    this.loginService
      .getAtributos(this.tokenUsuario)
      .subscribe((userResp) => {
        this.userResp = userResp;
        this.loginService.setUserResp(this.userResp);
        //navego a la siguiente pagina
        this.router.navigate(['home/bienvenida']);
      });
  }
}
