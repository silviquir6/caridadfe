import { Component, OnInit } from '@angular/core';
import { Departamento } from '../../models/departamento.model';
import { DepartamentoService } from '../../services/departamento/departamento.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {


  departamentos: Departamento;
  desde: number= 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public departamentoService: DepartamentoService) { }

  ngOnInit() {
    this.obtenerDepartamentos();
  }
  obtenerDepartamentos(){

    this.departamentoService.obtenerDepartamentos( ).subscribe((resp:any) => {
      this.departamentos= resp.departamentos;
  
  
    });
  }

    buscarDepartamentoPorTermino(termino: string){

   

        if(!termino){
          this.obtenerDepartamentos();
    
        }
    
        this.departamentoService.buscar(termino).subscribe((resp: any) => {
          
          console.log("buscarDepartamentoPorTermino", resp);
          this.departamentos = resp.departamentos;
          this.totalRegistros = resp.cuantos;
                
       });
    
     

    }


}
