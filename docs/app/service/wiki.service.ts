import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enfermedad } from '../model/Enfermedad/Enfermedad';
import { Medicamento } from '../model/Medicamento/Medicamento';
import { ProductoNatural } from '../model/ProductoNatural/ProductoNatural';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class WikiService {

  constructor(private api: ApiService) { }


  getInfoMedicamento(nombre: string, pageSize: number, pageNumber: number): Observable<Medicamento> {
    return this.api.get('getInfoMedicamento?nombre=' + nombre + '&pageSize=' + pageSize + '&pageNumber=' + pageNumber);
  }

  getInfoEnfermedad(nombre: string, pageSize: number, pageNumber: number): Observable<Enfermedad> {
    return this.api.get('getInfoEnfermedad?nombre=' + nombre + '&pageSize=' + pageSize + '&pageNumber=' + pageNumber);
  } 
  
  getInfoProductoNatural(nombre: string, pageSize: number, pageNumber: number): Observable<ProductoNatural> {
    return this.api.get('getInfoProductoNatural?nombre=' + nombre + '&pageSize=' + pageSize + '&pageNumber=' + pageNumber);
  }



}
