import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consultas } from '../model/Consultas/Consultas';
import { InfoConsultas } from '../model/InfoConsultas';
import { ApiService } from './api.service';
//import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(private api: ApiService) { }

  infoConsultas:InfoConsultas
  consultas: Consultas
  tamanoConsultas: number = 2;
  numPag: number = 1;

  getCons() {
    return this.consultas;
  }
  setCons(cons: Consultas) {
    this.consultas = cons;
  }

  setInfoConsultas(infoConsultas: InfoConsultas): void {
    this.infoConsultas = infoConsultas;
  }
  getInfoConsultas(): InfoConsultas {
    return this.infoConsultas;
  }

  getTamanoPagCons(): number {
    return this.tamanoConsultas;
  }
  getNumPagConsultas(): number {
    return this.numPag;
  }

  setNumPagConsultas(num: number) {
    this.numPag = num;
    sessionStorage.setItem('paginaActualConsulta', this.numPag.toString()); //guardo en memoria la pagina en la que me encuentro para poder recargar y seguir avanzando bien
  }
  
  getConsultas(dniPaciente: string, tokenUsuario: number, tamanoPag: number, pagina: number): Observable<Consultas> {
    return this.api.get('getConsultas/' + dniPaciente + '/' + tokenUsuario + '/0/0/' + tamanoPag + '/' + pagina); //0's para filtrar por dni y fecha (sin hacer)
  }

  getConsultaDetalles(id: number, token: number): Observable<InfoConsultas>{
    return this.api.get('getConsultaDetalles/'+id+'/'+token);
  }

 

}
