import { Component, OnInit } from '@angular/core';
import { EsalService } from '../../../services/esal/esal.service';
import { Esal } from '../../../models/esal.model';

@Component({
  selector: 'app-esal-list',
  templateUrl: './esal-list.component.html',
  styles: []
})
export class EsalListComponent implements OnInit {

  desde: number = 0;
  esals: Esal [] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public esalService: EsalService) { }

  ngOnInit() {
    this.obtenerEsals();

  }

  obtenerEsals(){
    this.cargando = true;

    this.esalService.obtenerEsals(this.desde).subscribe((resp: any) => {

      this.esals = resp.esals;
      this.totalRegistros = resp.cuantos;
      this.cargando = false;
    });
  }
  buscarEsalsPorTermino(termino: string){


    if(!termino){
      this.obtenerEsals();

    }

    this.esalService.buscar(termino).subscribe((resp: any) => {
      
      console.log("buscarEsalsPorTermino", resp);
      this.esals = resp.esals;
      this.totalRegistros = resp.cuantos;
            
   });

  }

  cambiarDesde(valor: number){

let desdeTemp = this.desde + valor;
console.log('desdeTemp:', desdeTemp);
if (desdeTemp >= this.totalRegistros){
  return;
}
if (desdeTemp < 0){
  return;
}
console.log('desde:', this.desde);
this.desde += valor;
console.log('desde +valor:', this.desde);

this.obtenerEsals();

  }

}
