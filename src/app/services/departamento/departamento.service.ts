import { Injectable } from '@angular/core';
import { HttpClient  , HttpHeaders } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(public http: HttpClient, public usuarioService: UsuarioService) { }


  obtenerDepartamentos() {

    
    const headers = new HttpHeaders().set("token", this.usuarioService.token);


    let url = URL_SERVICIOS + '/departamento';
    return this.http.get(url, {headers: headers});
  }
}
