import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Consultas } from 'src/app/model/Consultas/Consultas';
import { ConsultasService } from 'src/app/service/consultas.service';
import { PruebasService } from 'src/app/service/pruebas.service';
import { LoginService } from 'src/app/service/login.service';
import { PacientesService } from 'src/app/service/pacientes.service';
import { Pruebas } from 'src/app/model/Pruebas/Pruebas';
import { MedicamentoService } from 'src/app/service/medicamento.service';
import { EnfermedadService } from 'src/app/service/enfermedad.service';
import { Enfermedad } from 'src/app/model/Enfermedad/Enfermedad';
import { Medicamento } from 'src/app/model/Medicamento/Medicamento';
import { InfoPruebas } from 'src/app/model/InfoPruebas';
import { InfoConsultas } from 'src/app/model/InfoConsultas';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  nombre: string;
  nombrePaciente: string = this.pacienteService.getNombrePaciente(); //recojo el nombre
  roles: Array<string>;
  nombrepac: string = this.pacienteService.getNombrePaciente();
  dni: string = this.pacienteService.getDniPaciente();
  edad: number = this.pacienteService.getEdadPaciente();
  consultas: Consultas = this.consultasService.getCons();
  pruebas: Pruebas = this.pruebasService.getPru();
  enfermedad: Enfermedad = this.enfermedadService.getEnf();
  medicamento: Medicamento = this.medicamentoService.getMedDetalle();
  infoPruebas: InfoPruebas;
  infoConsultas: InfoConsultas;




  constructor(private router: Router, public loginService: LoginService, private enfermedadService: EnfermedadService, private pacienteService: PacientesService,
    public medicamentoService: MedicamentoService, public consultasService: ConsultasService, private pruebasService: PruebasService) { }

  consultasDisponibles() {
    if (this.consultasService.getCons() !== null && this.consultasService.getCons().data.length !== 0) {
      this.consultas = this.consultasService.getCons();
    }
    return this.consultas !== null && this.consultas !== undefined && this.consultas.data.length !== 0;
  }

  pruebasDisponibles() {
    if (this.pruebasService.getPru() !== null && this.pruebasService.getPru().data.length !== 0) {
      this.pruebas = this.pruebasService.getPru();
    }
    return this.pruebas !== null && this.pruebas !== undefined && this.pruebas.data.length !== 0;
  }

  medicamentoDisponibles() {
    if (this.medicamentoService.getMedDetalle() !== null && this.medicamentoService.getMedDetalle().data.length !== 0) {
      this.medicamento = this.medicamentoService.getMedDetalle();
    }
    return this.medicamento !== null && this.medicamento !== undefined && this.medicamento.data.length !== 0;
  }

  enfermedadDisponibles() {
    if (this.enfermedadService.getEnf() !== null && this.enfermedadService.getEnf().data.length != 0) {
      this.enfermedad = this.enfermedadService.getEnf();
    }
    return this.enfermedad !== null && this.enfermedad !== undefined && this.enfermedad.data.length !== 0;
  }


  isDoctor() {
    return this.loginService.getRolesUser().includes('Doctor');
  }

  nombreDisponible() {
    if (this.loginService.getAtribs() !== null)
      this.nombre = this.loginService.getAtribs().nombre + " " + this.loginService.getAtribs().apellidos;
    return this.nombre !== null;
  }

  rolesDisponibles() {
    if (this.loginService.getRolesUser() !== null)
      this.roles = this.loginService.getRolesUser();
    return this.roles !== null;
  }
  ngOnInit(): void { }

  conseguirInfo(idPrueba: number) {

    this.pruebasService.getPruebaDetalles(idPrueba, this.loginService.getAuthId())
      .subscribe(
        (infoPruebas) => { // Cuando me contestan
          this.infoPruebas = infoPruebas;
          sessionStorage.setItem('analisisinfoAdic', JSON.stringify(infoPruebas));
          this.pruebasService.setInfoPruebas(infoPruebas);
          this.router.navigate(["/home/pacientes/detalle/analisis"]);
        });
  }

  conseguirInfoCons(idConsulta: number) {
    this.consultasService.getConsultaDetalles(idConsulta, this.loginService.getAuthId())
      .subscribe(
        (infoConsultas) => { // Cuando me contestan
          this.infoConsultas = infoConsultas; // guardo mi objeto consultas
          sessionStorage.setItem('consultasinfoAdic', JSON.stringify(infoConsultas)); //guardo en memoria
          this.consultasService.setInfoConsultas(infoConsultas);
          this.router.navigate(["/home/pacientes/detalle/consultas"]);
        });
  }



  masPaginasDchaCons(): boolean {
    return this.consultas.metadata.pageNumber != this.consultas.metadata.totalPages;
  }
  masPaginasDchaPru(): boolean {
    return this.pruebas.metadata.pageNumber != this.pruebas.metadata.totalPages;
  }
  masPaginasDchaEnf(): boolean {
    return this.enfermedad.metadata.pageNumber != this.enfermedad.metadata.totalPages;
  }
  masPaginasDchaMed(): boolean {
    return this.medicamento.metadata.pageNumber != this.medicamento.metadata.totalPages;
  }



  masPaginasIzqCons(): boolean {
    return this.consultas.metadata.pageNumber != 1;
  }
  masPaginasIzqPru(): boolean {
    return this.pruebas.metadata.pageNumber != 1;
  }
  masPaginasIzqEnf(): boolean {
    return this.enfermedad.metadata.pageNumber != 1;
  }
  masPaginasIzqMed(): boolean {
    return this.medicamento.metadata.pageNumber != 1;
  }



  sigPagCons(): void {
    if (this.masPaginasDchaCons()) {
      this.consultasService.setNumPagConsultas(this.consultasService.getNumPagConsultas() + 1);
      this.recargarPagCons();
    }
  }
  sigPagPru(): void {
    if (this.masPaginasDchaPru()) {
      this.pruebasService.setNumPagPruebas(this.pruebasService.getNumPagPru() + 1);
      this.recargarPagPru();
    }
  }
  sigPagEnf(): void {
    if (this.masPaginasDchaEnf()) {
      this.enfermedadService.setNumPagEnf(this.enfermedadService.getNumPagEnf() + 1);
      this.recargarPagEnf();
    }
  }
  sigPagMed(): void {
    if (this.masPaginasDchaMed()) {
      this.medicamentoService.setNumPagMed(this.medicamentoService.getNumPagMed() + 1);
      this.recargarPagMed();
    }
  }



  antPagCons(): void {
    if (this.masPaginasIzqCons()) {
      this.consultasService.setNumPagConsultas(this.consultasService.getNumPagConsultas() - 1);
      this.recargarPagCons();
    }
  }
  antPagPru(): void {
    if (this.masPaginasIzqPru()) {
      this.pruebasService.setNumPagPruebas(this.pruebasService.getNumPagPru() - 1);
      this.recargarPagPru();
    }
  }
  antPagEnf(): void {
    if (this.masPaginasIzqEnf()) {
      this.enfermedadService.setNumPagEnf(this.enfermedadService.getNumPagEnf() - 1);
      this.recargarPagEnf();
    }
  }
  antPagMed(): void {
    if (this.masPaginasIzqMed()) {
      this.medicamentoService.setNumPagMed(this.medicamentoService.getNumPagMed() - 1);
      this.recargarPagMed();
    }
  }



  recargarPagCons() {
    this.consultasService.getConsultas(this.pacienteService.dniPaciente, this.loginService.getAuthId(), this.consultasService.getTamanoPagCons(), this.consultasService.getNumPagConsultas())
      .subscribe((consultas) => {
        this.consultasService.setCons(consultas);
        sessionStorage.setItem("consultas", JSON.stringify(consultas)); //lo guardo en la memoria del explorador para rescatarlo si recargo
      });

  }
  recargarPagPru() {
    this.pruebasService.getPruebas(this.pacienteService.dniPaciente, this.loginService.getAuthId(), this.pruebasService.getTamanoPagPru(), this.pruebasService.getNumPagPru())
      .subscribe((pruebas) => {
        this.pruebasService.setPru(pruebas);
        sessionStorage.setItem("pruebas", JSON.stringify(pruebas)); //lo guardo en la memoria del explorador para rescatarlo si recargo
      });

  }
  recargarPagEnf() {
    this.enfermedadService.getEnfermedades(this.pacienteService.dniPaciente, this.loginService.getAuthId(), this.enfermedadService.getTamanoPagEnf(), this.enfermedadService.getNumPagEnf())
      .subscribe((enfermedad) => {
        this.enfermedadService.setEnf(enfermedad);
        sessionStorage.setItem("enfermedad", JSON.stringify(enfermedad)); //lo guardo en la memoria del explorador para rescatarlo si recargo
      });

  }
  recargarPagMed() {
    this.medicamentoService.getMedicamentos(this.pacienteService.dniPaciente, this.loginService.getAuthId(), this.medicamentoService.getTamanoPagMed(), this.medicamentoService.getNumPagMed())
      .subscribe((medicamento) => {
        this.medicamentoService.setMed(medicamento);
        sessionStorage.setItem("medicamento", JSON.stringify(medicamento)); //lo guardo en la memoria del explorador para rescatarlo si recargo
      });
  }

  avanzarPagMedicamento(nombre: string) {
    if (nombre === '' || nombre === null) { //CASO ESTA VACIO EL CAMPO
      console.log("FALLO EN BASE DE DATOS, NO SE HA ENCONTRADO INFORMACION RELACIONADA")
    } else {
      this.medicamentoService.setNombre(nombre); //guardo el nombre
      this.medicamentoService.setEnf(null);
      this.medicamentoService.setMed(null);
      this.medicamentoService.setProd(null);
      this.medicamentoService.guardarNombresMemoria(); //lo guardo tambien en memoria
      this.router.navigate(['home/techsuite-wiki/medicamento']);
    }
  }

  // Para pasar los milisegundos a una fecha del tipo DD/MM/YYYY
  convertirFecha(milsec: number): string {
    return new Date(milsec).toLocaleDateString();
  }

}



