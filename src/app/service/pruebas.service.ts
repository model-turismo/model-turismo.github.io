import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoPruebas } from '../model/InfoPruebas';
import { Pruebas } from '../model/Pruebas/Pruebas';
import { ApiService } from './api.service';
//import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PruebasService {

  constructor(private api: ApiService) { }
  infoPruebas:InfoPruebas;
  pruebas:Pruebas;
  tamanoPruebas: number = 2;
  numPag: number = 1;

  getPru() {
    return this.pruebas;
  }
  setPru(pru: Pruebas) {
    this.pruebas = pru;
  }

  setInfoPruebas(infoPruebas: InfoPruebas): void {
    this.infoPruebas = infoPruebas;
  }
  getInfoPruebas(): InfoPruebas {
    return this.infoPruebas;
  }


  getTamanoPagPru(): number {
    return this.tamanoPruebas;
  }
  getNumPagPru(): number {
    return this.numPag;
  }

  setNumPagPruebas(num: number) {
    this.numPag = num;
    sessionStorage.setItem('paginaActualPrueba', this.numPag.toString()); //guardo en memoria la pagina en la que me encuentro para poder recargar y seguir avanzando bien
  }
  
  getPruebas(dniPaciente: string, tokenUsuario: number, tamanoPag: number, pagina: number): Observable<Pruebas> {
    return this.api.get('getPruebas/' + dniPaciente + '/' + tokenUsuario + '/0/0/0/' + tamanoPag + '/' + pagina); //0's para filtrar por dni y fecha (sin hacer)
  }

  getPruebaDetalles(id: number, token: number): Observable<InfoPruebas>{
    return this.api.get('getPruebaDetalles/'+id+'/'+token);
  }
}


