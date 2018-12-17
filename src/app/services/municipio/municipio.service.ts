import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  constructor(public http: HttpClient, public usuarioService: UsuarioService) { }

  obtenerMunicipiosPorDepartamento(idDepartamento: string) {

    
    const headers = new HttpHeaders().set("token", this.usuarioService.token);


    let url = URL_SERVICIOS + '/municipio/' + idDepartamento ;
    return this.http.get(url, {headers: headers});
  }
  obtenerMunicipios() {

    
    const headers = new HttpHeaders().set("token", this.usuarioService.token);


    let url = URL_SERVICIOS + '/municipio' ;
    return this.http.get(url, {headers: headers});
  }


}
