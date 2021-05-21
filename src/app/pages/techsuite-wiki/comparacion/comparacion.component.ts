import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medicamento } from 'src/app/model/Medicamento/Medicamento';
import { ProductoNatural } from 'src/app/model/Producto Natural/ProductoNatural';
import { MedicamentoService } from 'src/app/service/medicamento.service';

@Component({
  selector: 'app-comparacion',
  templateUrl: './comparacion.component.html',
  styleUrls: ['./comparacion.component.scss'],
})
export class ComparacionComponent implements OnInit {
  nombres: Array<string> = this.medicamentoService.getNombres();
  datosCargados: Array<boolean> = new Array();

  infoMed1: Medicamento = this.medicamentoService.getinfoMed1();
  infoProd1: ProductoNatural = this.medicamentoService.getinfoProd1();

  infoMed2: Medicamento = this.medicamentoService.getinfoMed2();
  infoProd2: ProductoNatural = this.medicamentoService.getinfoProd2();

  datosCargados1: boolean = false;
  datosCargados2: boolean = false;

  infoContraindicaciones: Array<string>=new Array();
  nombresReales: Array<string>=new Array();

  infoContraindicacionesAux: string =
    "Prueba Contraindicaciones -> here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";
 
  


  constructor(
    private medicamentoService: MedicamentoService,
    private router: Router
  ) { }

  accederPagMedicamento(item: string) {
    this.medicamentoService.setNombre(item);
    this.medicamentoService.setEnf(null);
    this.medicamentoService.setMed(null);
    this.medicamentoService.setProd(null);

    this.medicamentoService.guardarNombresMemoria(); //lo guardo tambien en memoria
    this.router.navigate(['home/techsuite-wiki/medicamento']);
  }

  ngOnInit(): void {

    //med1
    this.medicamentoService.getInfoMedicamento(this.nombres[0], 20, 1)
      .subscribe((infoMedicamento) => {
        this.medicamentoService.setinfoMed1(infoMedicamento);
        sessionStorage.setItem('infoMed1', JSON.stringify(infoMedicamento)); //guardo en memoria

        if (this.medicamentoService.getinfoMed1() == null || this.medicamentoService.getinfoMed1() == undefined) {
          this.medicamentoService.getInfoProductoNatural(this.nombres[0], 20, 1)
            .subscribe((infoProdNat) => {
              this.medicamentoService.setinfoProd1(infoProdNat);
              sessionStorage.setItem('infoProd1', JSON.stringify(infoProdNat)); //guardo en memoria
            });
        }
        this.datosCargados1 = true;
      });


    //med2
    this.medicamentoService.getInfoMedicamento(this.nombres[1], 20, 1)
      .subscribe((infoMedicamento) => {
        this.medicamentoService.setinfoMed2(infoMedicamento);
        sessionStorage.setItem('infoMed2', JSON.stringify(infoMedicamento)); //guardo en memoria
        

        if (this.medicamentoService.getinfoMed2() == null || this.medicamentoService.getinfoMed2() == undefined) {
          this.medicamentoService.getInfoProductoNatural(this.nombres[1], 20, 1)
            .subscribe((infoProdNat) => {
              this.medicamentoService.setinfoProd2(infoProdNat);
              sessionStorage.setItem('infoProd2', JSON.stringify(infoProdNat)); //guardo en memoria
            });
        }
        this.datosCargados2 = true;
      });

  }

  medEncontrado1(){
    return (this.medicamentoService.getinfoMed1() != null && this.medicamentoService.getinfoMed1() != undefined) 
    ||(this.medicamentoService.getinfoProd1() != null && this.medicamentoService.getinfoProd1() != undefined)
  }
  medEncontrado2(){
    return (this.medicamentoService.getinfoMed2() != null && this.medicamentoService.getinfoMed2() != undefined) 
    ||(this.medicamentoService.getinfoProd2() != null && this.medicamentoService.getinfoProd2() !=undefined)
  }

  medicamentoDisponible1() {
    if (this.medicamentoService.getinfoMed1() !== null) {
      this.infoContraindicaciones[0] = this.medicamentoService.getinfoMed1().data[0].contraindicaciones;
      this.nombresReales[0] = this.medicamentoService.getinfoMed1().data[0].nombre;
    }else if(this.medicamentoService.getinfoProd1() !== null){
      this.infoContraindicaciones[0] = this.medicamentoService.getinfoProd1().data[0].contraindicaciones;
      this.nombresReales[0] = this.medicamentoService.getinfoProd1().data[0].nombre;
    }
    return this.infoContraindicaciones[0] !== null && this.infoContraindicaciones[0] !== undefined;
  }

  medicamentoDisponible2() {
    if (this.medicamentoService.getinfoMed2() !== null) {
      this.infoContraindicaciones[1] = this.medicamentoService.getinfoMed2().data[0].contraindicaciones;
      this.nombresReales[1] = this.medicamentoService.getinfoMed2().data[0].nombre;
    }else if(this.medicamentoService.getinfoProd2() !== null){
      this.infoContraindicaciones[1] = this.medicamentoService.getinfoProd2().data[0].contraindicaciones;
      this.nombresReales[1] = this.medicamentoService.getinfoProd2().data[0].nombre;
    }
    return this.infoContraindicaciones[1] !== null && this.infoContraindicaciones[1] !== undefined;
  }

  volver() {
    this.router.navigate(['/home/techsuite-wiki']);
  }



}
