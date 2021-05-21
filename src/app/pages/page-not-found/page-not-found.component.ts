import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

  constructor(private loginService: LoginService, private router: Router) { }

  redirigirInicio() {
    this.conectado() ? this.router.navigate(['home/bienvenida']) : this.router.navigate(['']);
  }
  conectado() {
    return this.loginService.isLoggedIn();
  }

}
