import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(): boolean | UrlTree {
    return this.loginService.isLoggedIn() ? true : this.router.parseUrl('/login');
  }
}
