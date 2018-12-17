import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  ipAddress: any;
  constructor(private http: HttpClient) {


   }

   obtenerIp(){

    return this.http.get<{ip: string}>('https://jsonip.com')
      .pipe(map((resp: any) => {
        
        return resp;

      }));
   }
}
