import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from '../../config/config';


@Injectable({
  providedIn: 'root'
})
export class PayuService {

  constructor(public http: HttpClient) { }


  authorizacionYcaptura(body) {


    let url = URL_SERVICIOS + '/payu';
    return this.http.post(url, body)
      .pipe(map((resp: any) => {
        console.log(resp);

        let respuestaObt: string = JSON.stringify( resp);

        if (resp.ok === true ) {
        swal('Respuesta obtenida', '' + respuestaObt + '' , 'success');
      }
      else {

        swal('Respuesta obtenida', 'dfasd', 'error');
      }

      }));

  }
}
