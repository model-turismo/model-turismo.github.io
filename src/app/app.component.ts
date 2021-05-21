import { Component, OnInit } from '@angular/core';
import { LoginService } from './service/login.service';
import { TranslateService } from '@ngx-translate/core';
import { MedicamentoService } from './service/medicamento.service';
import { PacientesService } from './service/pacientes.service';
import { ConsultasService } from './service/consultas.service';
import { PruebasService } from './service/pruebas.service';
import {EnfermedadService} from './service/enfermedad.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private medicamentoService: MedicamentoService,
    private consultasService: ConsultasService,
    private translateService: TranslateService,
    private pacientesService: PacientesService,
    private pruebasService: PruebasService,
    private enfermedadService: EnfermedadService
  ) {
    
  }
  toggleSpanish() {
    this.translateService.use('es');
  }

  toggleEnglish() {
    this.translateService.use('en');
  }

  ngOnInit(): void {
    //si hay un id guardado significa que ya abrio sesion antes de recargarse la pagina => lo recojo para poder moverme por la url
    if(sessionStorage.getItem('idiomaActual')!=null){
      this.translateService.use(sessionStorage.getItem('idiomaActual'));
    }
    else{
      this.translateService.use('es');
    }
    
    
    if (sessionStorage.getItem('authId') !== null) {
      //guardo el id en loginService
      this.loginService.setAuthId(parseInt(sessionStorage.getItem('authId')));
      //digo que a continuacion voy a actualizar mis datos
      //guardo el nombre buscandolo a traves de una llamada a be, le paso el id, cuando lo recibo lo guardo en login service el nombre
      this.loginService
        .getAtributos(this.loginService.getAuthId())
        .subscribe((userResp) => {
          this.loginService.setUserResp(userResp);
        });
    }

    //caso de en pantalla de impostor necesito tener guardado el dni al recargar
    if (sessionStorage.getItem('impostor') !== null) {
      this.loginService.setImpostor(sessionStorage.getItem('impostor'));
    }

    //caso roles
    if (sessionStorage.getItem('roles') !== null) {
      this.loginService.setRoles(JSON.parse(sessionStorage.getItem('roles')));
    }

    //caso wiki-> medicamento
    if (sessionStorage.getItem('nombreWiki') !== null) {
      this.medicamentoService.setNombre(sessionStorage.getItem('nombreWiki'));
    }
    if (sessionStorage.getItem('busquedainfoMed') !== null) {
      this.medicamentoService.setMed(JSON.parse(sessionStorage.getItem('busquedainfoMed')));
    }    
    if (sessionStorage.getItem('busquedainfoEnf') !== null) {
      this.medicamentoService.setEnf(JSON.parse(sessionStorage.getItem('busquedainfoEnf')));
    }
    if (sessionStorage.getItem('busquedainfoProd') !== null) {
      this.medicamentoService.setProd(JSON.parse(sessionStorage.getItem('busquedainfoProd')));
    }
    //caso wiki-> comparacion
    if (sessionStorage.getItem('nombresWiki') !== null) {
      this.medicamentoService.setNombres(JSON.parse(sessionStorage.getItem('nombresWiki')));
    }
    if (sessionStorage.getItem('infoMed1') !== null) {
      this.medicamentoService.setinfoMed1(JSON.parse(sessionStorage.getItem('infoMed1')));
    }
    if (sessionStorage.getItem('infoMed2') !== null) {
      this.medicamentoService.setinfoMed2(JSON.parse(sessionStorage.getItem('infoMed2')));
    }
    if (sessionStorage.getItem('infoProd1') !== null) {
      this.medicamentoService.setinfoProd1(JSON.parse(sessionStorage.getItem('infoProd1')));
    }
    if (sessionStorage.getItem('infoProd2') !== null) {
      this.medicamentoService.setinfoProd2(JSON.parse(sessionStorage.getItem('infoProd2')));
    }

    //caso pacientes
    if (sessionStorage.getItem('pacientesinfo') !== null) {
      this.pacientesService.setPacs(JSON.parse(sessionStorage.getItem('pacientesinfo')));
    }
    if (sessionStorage.getItem('todosPacientes') !== null) {
      this.pacientesService.setmostrandoTodos(JSON.parse(sessionStorage.getItem('todosPacientes')));
    }
    if (sessionStorage.getItem('paginaActual') !== null) {
      this.pacientesService.setnumPag(parseInt(sessionStorage.getItem('paginaActual')));
    }
    if (sessionStorage.getItem('filtro') !== null) {
      this.pacientesService.setFiltro(JSON.parse(sessionStorage.getItem('filtro')));
    }
    if (sessionStorage.getItem('field') !== null) {
      this.pacientesService.setField(sessionStorage.getItem('field'));
    }
    if (sessionStorage.getItem('filterEntry') !== null) {
      this.pacientesService.setFilterEntry(sessionStorage.getItem('filterEntry'));
    }

    //caso detalle paciente
    if (sessionStorage.getItem('consultas') !== null) {
      this.consultasService.setCons(JSON.parse(sessionStorage.getItem('consultas')));
    }
    if (sessionStorage.getItem('nombrePaciente') !== null) {
      this.pacientesService.setNombrePaciente(sessionStorage.getItem('nombrePaciente'));
    }
    if (sessionStorage.getItem('dniPaciente') !== null) {
      this.pacientesService.setDniPaciente(sessionStorage.getItem('dniPaciente'));
    }
    if (sessionStorage.getItem('paginaActualConsulta') !== null) {
      this.consultasService.setNumPagConsultas(parseInt(sessionStorage.getItem('paginaActualConsulta')));
    }
    if (sessionStorage.getItem('edadPaciente') !== null) {
      this.pacientesService.setEdadPaciente(parseInt(sessionStorage.getItem('edadPaciente')));
    }

    if(sessionStorage.getItem('pruebas')!==null){
      this.pruebasService.setPru(JSON.parse(sessionStorage.getItem('pruebas')));
    }

    if(sessionStorage.getItem('medicamento')!==null){
      this.medicamentoService.setMedDetalle(JSON.parse(sessionStorage.getItem('medicamento')));
    }

    if(sessionStorage.getItem('enfermedad')!==null){
      this.enfermedadService.setEnf(JSON.parse(sessionStorage.getItem('enfermedad')));
    }

    if(sessionStorage.getItem('analisisinfoAdic')!==null){
      this.pruebasService.setInfoPruebas(JSON.parse(sessionStorage.getItem('analisisinfoAdic')));
    }

    if(sessionStorage.getItem('consultasinfoAdic')!==null){
      this.consultasService.setInfoConsultas(JSON.parse(sessionStorage.getItem('consultasinfoAdic')));
    }
  }
}
