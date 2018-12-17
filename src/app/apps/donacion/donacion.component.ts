import { Component, OnInit } from '@angular/core';
import { DonacionService } from '../../services/donacion/donacion.service';
import { Donacion } from '../../models/donacion.model';

@Component({
  selector: 'app-donacion',
  templateUrl: './donacion.component.html',
  styleUrls: ['./donacion.component.css']
})
export class DonacionComponent implements OnInit {

  donaciones: Donacion []= [];
  desde: number= 0;
  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor(public donacionService: DonacionService) { }

  ngOnInit() {
    this.obtenerDonaciones();
  }

  obtenerDonaciones(){

    this.donacionService.obtenerDonacion(this.desde).subscribe((resp:any) => {
      this.donaciones= resp.donaciones;
  
  
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
    
    this.obtenerDonaciones();
    
      }

}
