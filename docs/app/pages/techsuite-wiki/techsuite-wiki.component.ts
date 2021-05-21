import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { MedicamentoService } from 'src/app/service/medicamento.service';

@Component({
  selector: 'app-techsuite-wiki',
  templateUrl: './techsuite-wiki.component.html',
  styleUrls: ['./techsuite-wiki.component.scss'],
})
export class TechsuiteWikiComponent implements OnInit {
  formulario: FormGroup;
  numEltos: number = 0;
  mensaje_a_mostrar: number = 0; //lo pongo asi para mostrar el mensaje indicado

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private medicamentoService: MedicamentoService,
    public loginService: LoginService
  ) {}

  //funcion para prevenir fallo en caso de recarga 
  generoDisponible() {
    return (this.loginService.getAtribs() !== null);
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      medicamentos: this.fb.array([]),
    });
  }

  get medicamentos(): FormArray {
    return this.formulario.get('medicamentos') as FormArray;
  }

  anadirMedicamento() {
    if (this.numEltos < 2) { //numero maximo de elementos a comparar
      const nuevaFila = this.fb.group({
        text: new FormControl(''),
        botonBorrar: new FormControl(''),
      });
      this.medicamentos.push(nuevaFila);

      this.numEltos++;
      this.mensaje_a_mostrar = 0; //elimino mensaje
    } else {
      this.mensaje_a_mostrar = 1;
    }
  }

  borrarMedicamento(indice: number) {
    this.medicamentos.removeAt(indice);
    this.numEltos--;
    this.mensaje_a_mostrar = 0;
  }

  avanzarPagMedicamento(nombre : string) {
    if (nombre === '' || nombre === null) { //CASO ESTA VACIO EL CAMPO
      this.mensaje_a_mostrar = 2;
    } else {
      this.medicamentoService.setNombre(nombre); //guardo el nombre
      this.medicamentoService.setEnf(null);
      this.medicamentoService.setMed(null);
      this.medicamentoService.setProd(null);
      this.medicamentoService.guardarNombresMemoria(); //lo guardo tambien en memoria
      this.router.navigate(['home/techsuite-wiki/medicamento']);
    }
  }

  avanzarPagComparacion() {
    let sinRellenar = false;
    let valores = new Array<string>();
    for (
      let index = 0;
      index < this.medicamentos.length && !sinRellenar;
      index++
    ) {
      let valor = this.medicamentos.value[index].text;
      if (valor === '') {
        sinRellenar = true;
        this.mensaje_a_mostrar = 3
      } else {
        valores.push(valor);
      }
    }
    if (!sinRellenar) {
      this.medicamentoService.setNombres(valores); //guardo los nuevos
      this.medicamentoService.setinfoMed1(null);
      this.medicamentoService.setinfoMed2(null);
      this.medicamentoService.setinfoProd1(null);
      this.medicamentoService.setinfoProd2(null);
      this.medicamentoService.guardarNombresMemoria(); //los guardo en memoria
      this.router.navigate(['home/techsuite-wiki/comparacion']);
    }
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.anadirMedicamento();
  }
}
