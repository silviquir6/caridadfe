import { Injectable } from '@angular/core';
import { HttpClient  , HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class EsalService {

  constructor(public http: HttpClient, public usuarioService: UsuarioService) { }

  
  obtenerEsals(desde: number = 0) {

    
    const headers = new HttpHeaders().set("token", this.usuarioService.token);


    let url = URL_SERVICIOS + '/esal?desde=' + desde;
    return this.http.get(url, {headers: headers});
  }

  obtenerEsalPorId( id: string) {

    let url = URL_SERVICIOS + '/esal/' + id ;
    return this.http.get(url);
  }
  esalBuscarPorCiudadDptoTipoEsal(municipio: string, departamento: string, tipoEsal: string){


    const headers = new HttpHeaders().set("token", this.usuarioService.token);


    let url = URL_SERVICIOS + '/esalBuscarPorMunDptoTipoEsal?municipio=' + municipio+ '&departamento=' + departamento+'&tipoEsal='+tipoEsal;
    return this.http.get(url,  {headers: headers});

  }
  buscar(termino: string){

    const headers = new HttpHeaders().set("token", this.usuarioService.token);


    let url = URL_SERVICIOS + '/esal/buscar/' + termino;
    return this.http.get(url,  {headers: headers});

  }




}
