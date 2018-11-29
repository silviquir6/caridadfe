import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(public http: HttpClient) { }

  reestablecerContraseña( password: String, token: String){

    let url = URL_SERVICIOS + '/resetpass';
    url += '?token=' + token;

    return this.http.put(url, { password })
      .pipe(
        map(
          (resp: any) => {
            swal("Contraseña Modificada", "Su contraseña fue modificada exitosamente", "success");
            console.log(resp);
            return resp.ok;

          }
        ));

  }

}
