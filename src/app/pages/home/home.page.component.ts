import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) { }

  iniciarSesion($myParam: string = ''): void {
    const navigationDetails: string[] = ['/login'];
    if ($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }

  ngOnInit(): void {
    //si ya me encuentro logineado no tiene sentido volver al inicio, para eso que salga de sesion
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['home/bienvenida']);
    }
  }
}






