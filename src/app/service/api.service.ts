import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly ENDPOINT = 'https://pekin.techsuite.live'; //conexion con pekin --> 'localhost:8010'

  constructor(private http: HttpClient) {}

  //hacemos una getRequest cogiendo el endpoint que le definimos
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.ENDPOINT}/${endpoint}`);
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.ENDPOINT}/${endpoint}`, body);
  }
}
