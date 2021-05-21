import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Medicamento } from '../model/Medicamento/Medicamento';
import { Enfermedad } from '../model/Enfermedad/Enfermedad';
import { ProductoNatural } from '../model/Producto Natural/ProductoNatural';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {


  nombre: string; //caso medicamento unico
  nombres: Array<string> = new Array(); //caso comparacion

  constructor(private api: ApiService) { }

  medicamento: Medicamento
  medicamentoDetalle: Medicamento

  enfermedad: Enfermedad
  prodNatural: ProductoNatural

  infoMed1: Medicamento
  infoProd1: ProductoNatural
  infoMed2: Medicamento
  infoProd2: ProductoNatural

  tamanoMedicamentos: number = 2;
  numPag: number = 1;

  //caso comparacion

  getinfoProd2(): ProductoNatural {
    return this.infoProd2;
  }
  getinfoMed2(): Medicamento {
    return this.infoMed2;
  }
  getinfoProd1(): ProductoNatural {
    return this.infoProd1;
  }
  getinfoMed1(): Medicamento {
    return this.infoMed1;
  }

  setinfoProd2(p: ProductoNatural ){
    this.infoProd2=p;
  }
  setinfoMed2(m: Medicamento ){
    this.infoMed2=m;
  }
  setinfoProd1(p: ProductoNatural) {
    this.infoProd1=p;
  }
  setinfoMed1(m: Medicamento) {
    this.infoMed1=m;
  }

  //caso medicamento 
  getMed() {
    return this.medicamento;
  }

  setMed(med: Medicamento) {
    this.medicamento = med;
  }

  getMedDetalle() {
    return this.medicamentoDetalle;
  }

  setMedDetalle(med: Medicamento) {
    this.medicamentoDetalle = med;
  }

  getEnf(): Enfermedad {
    return this.enfermedad;
  }

  setEnf(enf: Enfermedad) {
    this.enfermedad = enf;
  }

  getprodNatural(): ProductoNatural {
    return this.prodNatural;
  }

  setProd(prod: ProductoNatural) {
    this.prodNatural = prod;
  }

  getTamanoPagMed(): number {
    return this.tamanoMedicamentos;
  }
  getNumPagMed(): number {
    return this.numPag;
  }

  setNumPagMed(num: number) {
    this.numPag = num;
    sessionStorage.setItem('paginaActualMedicamento', this.numPag.toString()); //guardo en memoria la pagina en la que me encuentro para poder recargar y seguir avanzando bien
  }

  getMedicamentos(dniPaciente: string, tokenUsuario: number, tamanoPag: number, pagina: number): Observable<Medicamento> {
    return this.api.get('getMedicamentos/' + dniPaciente + '/' + tokenUsuario + '/' + tamanoPag + '/' + pagina); //0's para filtrar por dni y fecha (sin hacer)
  }


  //recoger la info del elemento
  getInfoMedicamento(nombre: string, tamanoPag: number, pagina: number): Observable<Medicamento> { //Array[string]
    return this.api.get('/getInfoMedicamento?nombre=' + nombre + '&pageSize=' + tamanoPag + '&pageNumber=' + pagina);
  }
  getInfoEnfermedad(nombre: string, tamanoPag: number, pagina: number): Observable<Enfermedad> { //Array[string]
    return this.api.get('/getInfoEnfermedad?nombre=' + nombre + '&pageSize=' + tamanoPag + '&pageNumber=' + pagina);
  }
  getInfoProductoNatural(nombre: string, tamanoPag: number, pagina: number): Observable<ProductoNatural> { //Array[string]
    return this.api.get('/getInfoProductoNatural?nombre=' + nombre + '&pageSize=' + tamanoPag + '&pageNumber=' + pagina);
  }



  //con esta para saber si es medicamento, enfermedad o homeopatia
  getTipoElemento(nombre: string): Observable<string> {
    return this.api.get('llamada/' + nombre);
  }


  //caso pagina medicamento
  getNombre(): string {
    return this.nombre; //si hago un pop lo saco por lo que al ir atras y delante no tendria nada
  }
  setNombre(nombre: string) {
    this.nombre = nombre; //lo pone el primero del array, asi se sacan luego en orden
    sessionStorage.setItem('nombreWiki', this.nombre);
  }

  //caso pagina comparacion
  getNombres(): Array<string> {
    return this.nombres;
  }
  setNombres(nombres: Array<string>) {
    this.nombres = nombres;
  }


  guardarNombresMemoria() {
    sessionStorage.setItem('nombresWiki', JSON.stringify(this.nombres));
  }
}