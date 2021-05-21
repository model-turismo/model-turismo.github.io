import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { PruebasService } from 'src/app/service/pruebas.service';
import { InfoPruebas } from 'src/app/model/InfoPruebas';
import { PacientesService } from 'src/app/service/pacientes.service';

@Component({
  selector: 'app-pruebas-detalle',
  templateUrl: './pruebas-detalle.component.html',
  styleUrls: ['./pruebas-detalle.component.scss']
})
export class PruebasDetalleComponent implements OnInit {
  nombrePaciente: string = this.pacienteService.getNombrePaciente();
  nombre: string
  prueba: InfoPruebas;
  pacienteDNI : string;
  fechaRealizacion : string;
  trabLabDNI : string;
  trabLabNombre : string;
  tipoPrueba : string;
  electrolitos : number;
  glucosa : number;
  colesterol : number;
  trigliceridos : number;
  bilirrubina : number;
  fluorescencia : number;

  constructor(private router: Router, public loginService: LoginService, public pruebasService: PruebasService, public pacienteService:PacientesService) { }

  ngOnInit(): void {
    this.prueba = this.pruebasService.getInfoPruebas();
    this.pacienteDNI = this.prueba.pacienteDNI;
    this.fechaRealizacion = this.convertirFecha(this.prueba.fechaRealizacion);
    this.trabLabDNI= this.prueba.trabLabDNI;
    this.trabLabNombre=this.prueba.trabLabNombre;
    this.tipoPrueba=this.prueba.tipoPrueba;
    this.electrolitos=this.prueba.electrolitos;
    this.glucosa=this.prueba.glucosa;
    this.colesterol=this.prueba.colesterol;
    this.trigliceridos=this.prueba.trigliceridos;
    this.bilirrubina=this.prueba.bilirrubina;
    this.fluorescencia=this.prueba.fluorescencia;
  }

  nombreDisponible() {
    if (this.loginService.getAtribs() !== null)
      this.nombre = this.loginService.getAtribs().nombre + " " + this.loginService.getAtribs().apellidos;
    return this.nombre !== null;
  }

  convertirFecha(milsec : number) : string {
    return new Date(milsec).toLocaleDateString();
  }

  analisisSangre(){
    if(this.tipoPrueba == "AnalisisSangre")
      return true;
    else{
      return false;
    }
  }

  pruebaPCR(){
    if(this.tipoPrueba == "PCR")
      return true;
    else{
      return false;
    }
  }

  volver(){
    this.router.navigate(['/home/pacientes/detalle']);
  }
}
