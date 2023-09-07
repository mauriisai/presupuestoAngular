import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.css']
})
export class IngresarGastoComponent implements OnInit {
  nombreGasto: string;
  cantidad: number;
  formularioIncorrecto: boolean;
  textIncorrecto: string;

  constructor(private _presupuestoService: PresupuestoService) {
    this.nombreGasto='';
    this.cantidad=0;
    this.formularioIncorrecto=false;
    this.textIncorrecto='';
  }

  ngOnInit(): void {
  
  }
  agregarGasto(){
    if(this.cantidad> this._presupuestoService.restante ){
      this.formularioIncorrecto=true;
      this.textIncorrecto='Cantidad ingresada es mayor al restante';
      return;
    }

    // validacion de los valores ingresados por el usuario
    if(this.nombreGasto==='' || this.cantidad<=0){
      this.formularioIncorrecto=true;
      this.textIncorrecto='Nombre del Gasto vacio o cantidad incorrecta';
    } else {
      
      // creamos el objeto
      const GASTO ={
        nombre: this.nombreGasto,
        cantidad:this.cantidad
      }

      // creamos el objeto a los suscriptores via subject
      this._presupuestoService.agregarGasto(GASTO);


      // reseteamos el formulario
      this.formularioIncorrecto=false;
      this.nombreGasto='';
      this.cantidad=0;
    }
  }
}
