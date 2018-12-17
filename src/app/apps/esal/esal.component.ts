import { Component, OnInit } from '@angular/core';
import { EsalService } from '../../services/esal/esal.service';
import { Esal } from '../../models/esal.model';

@Component({
  selector: 'app-esal',
  templateUrl: './esal.component.html',
  styleUrls: ['./esal.component.css']
})
export class EsalComponent implements OnInit {

  esals: Esal []= [];
  desde: number= 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public esalService: EsalService) { }

  ngOnInit() {
    this.obtenerEsals();
  }

  obtenerEsals(){

    this.esalService.obtenerEsals(this.desde).subscribe((resp : any) => {
      this.esals= resp.donaciones;
  
  
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
