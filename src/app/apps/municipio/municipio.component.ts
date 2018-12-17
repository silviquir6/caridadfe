import { Component, OnInit } from '@angular/core';
import { Municipio } from '../../models/municipio.model';
import { MunicipioService } from '../../services/municipio/municipio.service';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.css']
})
export class MunicipioComponent implements OnInit {

  municipios: Municipio []= [];
  desde: number= 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public municipioService: MunicipioService) { }

  ngOnInit() {
    this.obtenerMunicipios();
  }

  obtenerMunicipios(){

    this.municipioService.obtenerMunicipios().subscribe((resp:any) => {
      this.municipios= resp.municipios;
  
  
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
    
    this.obtenerMunicipios();
    
      }


}
