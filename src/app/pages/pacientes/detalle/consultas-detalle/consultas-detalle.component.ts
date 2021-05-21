import { Component, OnInit } from '@angular/core';
import {InfoConsultas} from 'src/app/model/InfoConsultas';
import {LoginService} from 'src/app/service/login.service';
import {Router} from '@angular/router';
import{ConsultasService} from 'src/app/service/consultas.service';
import { PacientesService } from 'src/app/service/pacientes.service';

@Component({
  selector: 'app-consultas-detalle',
  templateUrl: './consultas-detalle.component.html',
  styleUrls: ['./consultas-detalle.component.scss']
})
export class ConsultasDetalleComponent implements OnInit {
  nombrePaciente: string = this.pacienteService.getNombrePaciente();
  nombre: string;
  dniPaciente: string;
  fecha: string;
  doctorNombre: string;
  observaciones: string;
  consulta: InfoConsultas;

  constructor(public loginService: LoginService, public pacienteService:PacientesService, private consultasService: ConsultasService, private router: Router) { }

  ngOnInit(){
    this.consulta = this.consultasService.getInfoConsultas();
    this.dniPaciente = this.consulta.pacienteDNI;
    this.fecha = this.convertirFecha(this.consulta.fechaRealizacion);
    this.doctorNombre= this.consulta.doctorNombre;
    this.observaciones=this.consulta.observaciones;
  }

  convertirFecha(milsec : number) : string {
    return new Date(milsec).toLocaleDateString();
  }

  nombreDisponible() {
    if (this.loginService.getAtribs() !== null)
      this.nombre = this.loginService.getAtribs().nombre + " " + this.loginService.getAtribs().apellidos;
    return this.nombre !== null;
  }

  volver(){
    this.router.navigate(['/home/pacientes/detalle']);
  }


  }


