import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  //mail: Mail;

  constructor(public http: HttpClient) { }

  sendMailForgetPassword( to: String ){

    let url = URL_SERVICIOS + '/mail/cambiarPassword';
    return this.http.post(url, { to })
      .pipe(
        map(
          (resp: any) => {
            swal("Correo Enviado", "Por favor revise su correo", "success");
            console.log(resp);
            return resp.ok;

          }
        ));

  }




}
