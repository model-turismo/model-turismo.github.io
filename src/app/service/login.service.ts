import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthId } from '../model/AuthId';
import { User } from '../model/User';
import { UserResponse } from '../model/UserResponse';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private authId: number = null; //sera el id del usuario que realizo el login
  private userResp: UserResponse = null;
  private roles: Array<string> = null;
  private marcaImpostor: string = null;//variable usada para mostrar el boton de desconexion antes de iniciar como usuario a suplantar

  constructor(private api: ApiService) { }

  //loginStatus, mando dni password, recibo token
  getUserId(user: User): Observable<AuthId> {
    return this.api.get('loginStatus/' + user.dni + '/' + user.password);
  }

  //user, mando token, recibo userResp
  getAtributos(id: number): Observable<UserResponse> {
    return this.api.get('user/' + id);
  }

  //getRoles, mando token, recibo lista de string
  getRoles(id: number): Observable<Array<string>> {
    return this.api.get('getRoles/' + id);
  }

  isImpostor(): boolean{
    return this.marcaImpostor !== null;
  }

  setImpostor(imp:string){
    this.marcaImpostor=imp;
  }

  getImpostor(): string{
    return this.marcaImpostor;
  }



  //impostor, mando dni impostor y token de doctor a simular (es una clave que se supone que sabe el impostor)
  //devuelve el token del doctor a simular
  impostor(dniImpostor: string, tokenSuplantar: number): Observable<AuthId> {
    console.log(dniImpostor);
    console.log(tokenSuplantar)
    return this.api.get('loginStatus/impostor/' + dniImpostor + '/' + tokenSuplantar);
    //habra qu cambiar nombre, ver que nos devuelven (donde UserResp), la pagina
    //y que les tenemos que enviar
  }

  //////////////////

  setUserResp(userResp: UserResponse) {
    this.userResp = userResp;
  }
  getAtribs(): UserResponse {
    return this.userResp;
  }

  setRoles(roles: Array<string>) {
    this.roles = roles;
  }

  getRolesUser(): Array<string> {
    return this.roles;
  }

  isLoggedIn(): boolean {
    return this.authId !== null;
  }

  setAuthId(authId: number) {
    this.authId = authId;
  }

  getAuthId(): number {
    return this.authId;
  }

}
