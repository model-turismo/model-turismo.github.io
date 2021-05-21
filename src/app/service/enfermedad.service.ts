import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enfermedad } from '../model/Enfermedad/Enfermedad';
import { ApiService } from './api.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadService {

  constructor(private api: ApiService, public loginService: LoginService) { }

  enfermedad: Enfermedad
  tamanoEnfermedad: number = 2;
  numPag: number = 1;

  getEnf() {
    return this.enfermedad;
  }

  setEnf(enf: Enfermedad) {
    this.enfermedad = enf;
  }

  getTamanoPagEnf(): number {
    return this.tamanoEnfermedad;
  }
  getNumPagEnf(): number {
    return this.numPag;
  }

  setNumPagEnf(num: number) {
    this.numPag = num;
    sessionStorage.setItem('paginaActualEnfermedad', this.numPag.toString()); //guardo en memoria la pagina en la que me encuentro para poder recargar y seguir avanzando bien
  }
  
  getEnfermedades(dniPaciente: string, tokenUsuario: number, tamanoPag: number, pagina: number): Observable<Enfermedad> {
    return this.api.get('getEnfermedades/' + dniPaciente + '/' + tokenUsuario + '/' +tamanoPag + '/' + pagina); //0's para filtrar por dni y fecha (sin hacer)
  }

}