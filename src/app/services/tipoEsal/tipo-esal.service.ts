import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class TipoEsalService {

  constructor(public http: HttpClient, public usuarioService: UsuarioService) { }

  obtenerTipoEsal() {
    
    const headers = new HttpHeaders().set("token", this.usuarioService.token);


    let url = URL_SERVICIOS + '/tipoEsal';
    return this.http.get(url, {headers: headers});
  }
  
}
