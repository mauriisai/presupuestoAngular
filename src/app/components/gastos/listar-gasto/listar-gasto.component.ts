import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-listar-gasto',
  templateUrl: './listar-gasto.component.html',
  styleUrls: ['./listar-gasto.component.css']
})

export class ListarGastoComponent implements OnInit, OnDestroy{

  subscription: Subscription;
  presupuesto:number;
  restante:number;
  listGastos: any[]=[];

  constructor(private _presupuestoService: PresupuestoService) {
    // inicializando las variables
    this.presupuesto=0;
    this.restante=0;
    this.subscription = this._presupuestoService.getGastos().subscribe( data => {
      this.restante = this.restante - data.cantidad;
      this.listGastos.push(data);
    })
  }

  aplicarColorPorcentaje() {
    if(this.presupuesto/4>this.restante) {
      return 'alert alert-danger';

    } else if(this.presupuesto/2>this.restante) {
      return 'alert alert-warning';
    } 
    else {
      return 'alert alert-success';
    }
  }

  ngOnInit(): void {
    // Cuando se inicialice el componente queremos que ejecute las siguientes acciones!.
    this.presupuesto=this._presupuestoService.presupuesto;
    this.restante=this._presupuestoService.restante;

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
