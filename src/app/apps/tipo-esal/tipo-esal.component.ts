import { Component, OnInit } from '@angular/core';
import { TipoEsal } from '../../models/tipoEsal.model';
import { TipoEsalService } from '../../services/tipoEsal/tipo-esal.service';

@Component({
  selector: 'app-tipo-esal',
  templateUrl: './tipo-esal.component.html',
  styleUrls: ['./tipo-esal.component.css']
})
export class TipoEsalComponent implements OnInit {

  tipoEsals: TipoEsal[] = [];
  desde: number= 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public tipoEsalService :TipoEsalService) { }

  ngOnInit() {
    this.obtenerTipoEsals();
  }
  obtenerTipoEsals(){

    this.tipoEsalService.obtenerTipoEsal().subscribe((resp: any) => {
      this.tipoEsals = resp.tipoEsals;
  
  
    });
  }


}
