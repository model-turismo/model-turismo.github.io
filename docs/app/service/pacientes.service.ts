import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consultas } from '../model/Consultas/Consultas';
import { EnfermMedicam } from '../model/EnfermMedicam';
import { Pacientes } from '../model/Pacientes/Pacientes';
import { Pruebas } from '../model/Pruebas/Pruebas';
import { ApiService } from './api.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
 

  constructor(private api: ApiService, public loginService: LoginService) { }

  numPag: number = 1;//pagina actual
  numPacientes: number = 11;//num pacientes por pagina

  mostrandoTodos: boolean = false;
  pacientes: Pacientes;

  filtro: boolean = false; 
  field = 'all'; //campo de busqueda
  filterEntry: string = ''; //busqueda

  
  //pruebas:Pruebas;
  tamanoPruebas: number = 2;
  pagPruebas: number = 1;

  /*getPru() {
    return this.pruebas;
  }
  setPru(pr: Pruebas) {
    this.pruebas = pr;
  }*/

  borrarDatos() {
    this.setField('all');
    this.setFilterEntry('');
    this.setFiltro(false);
    this.setmostrandoTodos(false);
    this.setPacs(undefined);
  }


  getFilterEntry(): string{
    return this.filterEntry;
  }
  setFilterEntry(filterentry: string){
    this.filterEntry= filterentry;
    sessionStorage.setItem('filterEntry', this.filterEntry); //guardo en memoria
  }

  getField(): string{
    return this.field;
  }
  setField(field: string){
    this.field=field;
    sessionStorage.setItem('field', this.field); //guardo en memoria
  }

  getFiltro(): boolean {
    return this.filtro;
  }
  setFiltro(bool: boolean) {
    this.filtro = bool;
    sessionStorage.setItem('filtro', this.filtro.toString() ); //guardo en memoria
  }


  getNumPacientes(): number {
    return this.numPacientes;
  }


  getnumPag() {
    return this.numPag;
  }
  
  setnumPag(num: number) {
    this.numPag = num;
    sessionStorage.setItem('paginaActual', this.numPag.toString()); //guardo en memoria la pagina en la que me encuentro para poder recargar y seguir avanzando bien
  }

  getmostrandoTodos() {
    return this.mostrandoTodos;
  }
 

  setmostrandoTodos(bool: boolean) {
    this.mostrandoTodos = bool;
    sessionStorage.setItem('todosPacientes', this.mostrandoTodos.toString());
  }

  getPacs() {
    return this.pacientes;
  }
  setPacs(pacs: Pacientes) {
    this.pacientes = pacs;
  }


  //aqui guardo el nombre del paciente para poder recuperarlo en pagina siguiente
  nombrePaciente: string;
  dniPaciente: string;
  edadPaciente:number;

  setDniPaciente(dni: string) {
    this.dniPaciente = dni;
  }
  getDniPaciente(): string {
    return this.dniPaciente;
  }

  setEdadPaciente(edad:number){
    this.edadPaciente=edad;
  }

  getEdadPaciente(): number {
    return this.edadPaciente;
  }


  setNombrePaciente(nombre: string) {
    this.nombrePaciente = nombre;
  }
  getNombrePaciente(): string {
    return this.nombrePaciente;
  }


  getPacientes(dniDT: string, tokenUsuario: number, nombreFiltro: string, dniFiltro: string): Observable<Pacientes> {
    return this.api.get('getPacientes/' + dniDT + '/' + tokenUsuario + '/' + nombreFiltro + '/' + dniFiltro + '/' + this.numPacientes + '/' + this.numPag);
  }

  getAllPacientes(tokenUsuario: number, nombreFiltro: string, dniFiltro: string): Observable<Pacientes> {
    return this.api.get('getAllPacientes/' + tokenUsuario + '/' + nombreFiltro + '/' + dniFiltro + '/' + this.numPacientes + '/' + this.numPag);
  }

  getEnfermedades(dniPaciente: string, tokenUsuario: number, tamanoPag: number, pagina: number): Observable<EnfermMedicam> {
    return this.api.get('getEnfermedades/' + dniPaciente + '/' + tokenUsuario + '/' + tamanoPag + '/' + pagina);
  }

  getMedicamentos(dniPaciente: string, tokenUsuario: number, tamanoPag: number, pagina: number): Observable<EnfermMedicam> {
    return this.api.get('getMedicamentos/' + dniPaciente + '/' + tokenUsuario + '/' + tamanoPag + '/' + pagina);
  }

  

  /*getPruebas(dniDT: string, tokenUsuario: number, tamanoPag: number, pagina: number): Observable<Consultas> {
    return this.api.get('getPruebas/' + dniDT + '/' + tokenUsuario + '/' + tamanoPag + '/' + pagina);
  }*/


}
