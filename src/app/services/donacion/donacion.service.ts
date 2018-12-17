import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DonacionService {

  constructor(public http: HttpClient, public usuarioService: UsuarioService) { }

  obtenerDonacion(desde: number = 0) {

    
    const headers = new HttpHeaders().set("token", this.usuarioService.token);


    let url = URL_SERVICIOS + '/donacion?desde=' + desde;
    return this.http.get(url, {headers: headers});
  }

  

}
