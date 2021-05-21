import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Enfermedad } from 'src/app/model/Enfermedad/Enfermedad';
import { Medicamento } from 'src/app/model/Medicamento/Medicamento';
import { ProductoNatural } from 'src/app/model/Producto Natural/ProductoNatural';
import { MedicamentoService } from 'src/app/service/medicamento.service';

@Component({
  selector: 'app-medicamento',
  templateUrl: './medicamento.component.html',
  styleUrls: ['./medicamento.component.scss'],
})
export class MedicamentoComponent implements OnInit {
  [x: string]: any;
  nombre: string = this.medicamentoService.getNombre();
  tipo: string = 'Medicamento'; //Enfermedad //Homeopatia
  datosCargados: boolean = false;

  infoMedicamento: Medicamento = this.medicamentoService.getMed();
  infoEnfermedad: Enfermedad = this.medicamentoService.getEnf();
  infoProdNatural: ProductoNatural = this.medicamentoService.getprodNatural();

  //me lo puedo cargar??
  infoContraindicaciones: string =
    "Prueba Contraindicaciones -> here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";
  infoPosologia: string =
    "Prueba Posologia -> here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";
  infoProspecto: string =
    "Prueba Prospecto -> here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";
  infoComposicion: string =
    "Prueba Composicion -> here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";
  infoSintomas: string =
    "Prueba Sintomas -> here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";
  infoRecomendaciones: string =
    "Prueba Recomendaciones -> here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";
  //hasta aqui


  constructor(private medicamentoService: MedicamentoService, private router: Router) { }

  ngOnInit(): void {

    this.medicamentoService.getInfoMedicamento(this.nombre, 20, 1)
      .subscribe((infoMedicamento) => {
        this.medicamentoService.setMed(infoMedicamento);
        sessionStorage.setItem('busquedainfoMed', JSON.stringify(infoMedicamento)); //guardo en memoria
        this.medicamentoService.getInfoEnfermedad(this.nombre, 20, 1)
          .subscribe((infoEnfermedad) => {
            this.medicamentoService.setEnf(infoEnfermedad);
            sessionStorage.setItem('busquedainfoEnf', JSON.stringify(infoEnfermedad)); //guardo en memoria
            this.medicamentoService.getInfoProductoNatural(this.nombre, 20, 1)
              .subscribe((infoProdNat) => {
                this.medicamentoService.setProd(infoProdNat);
                sessionStorage.setItem('busquedainfoProd', JSON.stringify(infoProdNat)); //guardo en memoria
                this.datosCargados = true;
              });

          });

      });




  }

  medicamentoDisponible() {
    if (this.medicamentoService.getMed() !== null) {
      this.infoMedicamento = this.medicamentoService.getMed();
    }
    return this.infoMedicamento !== null && this.infoMedicamento !== undefined;
  }
  enfermedadDisponible() {
    if (this.medicamentoService.getEnf() !== null) {
      this.infoEnfermedad = this.medicamentoService.getEnf();
    }
    return this.infoEnfermedad !== null && this.infoEnfermedad !== undefined;
  }
  productoNaturalDisponible() {
    if (this.medicamentoService.getprodNatural() !== null) {
      this.infoProdNatural = this.medicamentoService.getprodNatural();
    }
    return this.infoProdNatural !== null && this.infoProdNatural !== undefined;
  }
  volver() {
    this.router.navigate(['/home/techsuite-wiki']);
  }

  registrar(){
    this.router.navigate(['/home/techsuite-wiki']);
  }
}
