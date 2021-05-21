import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pacientes } from 'src/app/model/Pacientes/Pacientes';
import { ConsultasService } from 'src/app/service/consultas.service';
import { LoginService } from 'src/app/service/login.service';
import { PacientesService } from 'src/app/service/pacientes.service';
import { PruebasService } from 'src/app/service/pruebas.service';
import { MedicamentoService } from 'src/app/service/medicamento.service';
import { EnfermedadService } from 'src/app/service/enfermedad.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {

  nombre: string;
  roles: Array<string>;

  //campo y busqueda
  field = this.pacientesService.getField();
  filterEntry: string = this.pacientesService.getFilterEntry();

  //booleano para saber si el filtro esta aplicado
  filtro: boolean = this.pacientesService.getFiltro();
  pacientes: Pacientes = this.pacientesService.getPacs();

  constructor(private router: Router, public loginService: LoginService, public enfermedadService: EnfermedadService, public pacientesService: PacientesService, public medicamentoService: MedicamentoService, public consultasService: ConsultasService, public pruebasService: PruebasService) { }

  ngOnInit(): void {

    //pagina inicial si no se han cargado los pacientes antes
    if (this.pacientesService.getPacs() === undefined) {
      this.pacientesService.setmostrandoTodos(false);
      this.pacientesService.setnumPag(1);
      this.pacientesService.getPacientes(this.loginService.getAtribs().dni, this.loginService.getAuthId(), "0", "0")
        .subscribe((pacientes) => {
          this.pacientesService.setPacs(pacientes);
          sessionStorage.setItem('pacientesinfo', JSON.stringify(pacientes)); //guardo en memoria
        });
    }
  }

  mirarPaciente(nombre: string, dni: string, edad: number) {

    this.pacientesService.setNombrePaciente(nombre); //guardo el nombre en la clase para luego recogerlo
    sessionStorage.setItem("nombrePaciente", nombre); //lo guardo en la memoria del explorador para rescatarlo si recargo
    this.pacientesService.setDniPaciente(dni); //guardo el nombre en la clase para luego recogerlo
    sessionStorage.setItem("dniPaciente", dni); //lo guardo en la memoria del explorador para rescatarlo si recargo
    this.pacientesService.setEdadPaciente(edad);
    sessionStorage.setItem("edadPaciente", edad.toString());


    //para evitar que se muestren los datos del anterior paciente ponemos a null para machacar
    this.consultasService.setCons(null);
    this.pruebasService.setPru(null);
    this.enfermedadService.setEnf(null);
    this.medicamentoService.setMedDetalle(null);


    // consultas y pruebas
    this.consultasService.getConsultas(dni, this.loginService.getAuthId(), this.consultasService.getTamanoPagCons(), 1)
      .subscribe((consultas) => {
        this.consultasService.setCons(consultas);
        sessionStorage.setItem("consultas", JSON.stringify(consultas)); //lo guardo en la memoria del explorador para rescatarlo si recargo
      });

    this.pruebasService.getPruebas(dni, this.loginService.getAuthId(), this.pruebasService.getTamanoPagPru(), 1)
      .subscribe((pruebas) => {
        this.pruebasService.setPru(pruebas);
        sessionStorage.setItem("pruebas", JSON.stringify(pruebas));
      });

      this.enfermedadService.getEnfermedades(dni, this.loginService.getAuthId(), this.enfermedadService.getTamanoPagEnf(), 1)
      .subscribe((enfermedad) => {
        this.enfermedadService.setEnf(enfermedad);
        sessionStorage.setItem("enfermedad", JSON.stringify(enfermedad));
      });

      this.medicamentoService.getMedicamentos(dni, this.loginService.getAuthId(), this.medicamentoService.getTamanoPagMed(), 1)
      .subscribe((medicamento) => {
        this.medicamentoService.setMedDetalle(medicamento);
        sessionStorage.setItem("medicamento", JSON.stringify(medicamento));
      });

   
    this.router.navigate(['home/pacientes/detalle']); //avanzo a sig pagina

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

  pacientesDisponibles() {
    if (this.pacientesService.getPacs() !== null) {
      this.pacientes = this.pacientesService.getPacs();
    }
    return this.pacientes !== null && this.pacientes !== undefined;
  }


  masPacientes(): void {

    this.pacientesService.setnumPag(1);
    this.pacientesService.setmostrandoTodos(true);

    this.eliminarFiltro();

  }

  menosPacientes(): void {
    this.pacientesService.setnumPag(1);
    this.pacientesService.setmostrandoTodos(false);

    this.eliminarFiltro();

  }

  sigPag(): void {
    if (this.masPaginasDcha()) {
      this.pacientesService.setnumPag(this.pacientesService.getnumPag() + 1);
      this.recargarPag();
    }
  }

  antPag(): void {
    if (this.masPaginasIzq()) {
      this.pacientesService.setnumPag(this.pacientesService.getnumPag() - 1);
      this.recargarPag();
    }
  }

  masPaginasDcha(): boolean {
    return this.pacientes.metadata.pageNumber != this.pacientes.metadata.totalPages;
  }

  masPaginasIzq(): boolean {
    return this.pacientes.metadata.pageNumber != 1;
  }

  recargarPag() {

    let valorDNI = "0";
    let valorNombre = "0";

    if (this.filterEntry != '') {

      if (this.field == 'dni') {
        valorDNI = this.filterEntry;
      } else if (this.field == 'nombre') {
        valorNombre = this.filterEntry;
      }
    }

    this.pacientesService.setFiltro(this.filtro);
    this.pacientesService.setField(this.field);
    this.pacientesService.setFilterEntry(this.filterEntry)


    if (this.pacientesService.getmostrandoTodos()) {
      this.pacientesService
        .getAllPacientes(this.loginService.getAuthId(), valorNombre, valorDNI)
        .subscribe((pacientes) => {
          (this.pacientes = pacientes);
          this.pacientesService.setPacs(pacientes);
          sessionStorage.setItem('pacientesinfo', JSON.stringify(pacientes)); //guardo en memoria

        });
    } else {
      this.pacientesService
        .getPacientes(this.loginService.getAtribs().dni, this.loginService.getAuthId(), valorNombre, valorDNI)
        .subscribe((pacientes) => {
          (this.pacientes = pacientes);
          this.pacientesService.setPacs(pacientes);
          sessionStorage.setItem('pacientesinfo', JSON.stringify(pacientes)); //guardo en memoria

        });
    }
  }


  buscar(): void {
    this.pacientesService.setnumPag(1);
    this.filtro = true; //pongo que hay filtro para que aparezca la x
    this.recargarPag();
  }

  eliminarFiltro() {
    this.filtro = false; //elimino la x
    this.field = 'all'; //quito el filtro que tenia
    this.filterEntry = '';
    this.recargarPag();

  }
}




