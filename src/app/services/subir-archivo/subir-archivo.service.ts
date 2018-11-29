import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo: File, tipo: string, id: string) {

    return new Promise((resolve, reject) => {

    //se sube y se envia a la peticion formData
    let formData = new FormData();
    let xhr = new XMLHttpRequest();

    //configuracion del formData
    //value:archivo blob file
    //nombre archivo: archivo.name
    formData.append('archivo', archivo, archivo.name);

    console.log("archivo.name: " + archivo.name);
//config peticion data
    xhr.onreadystatechange = function () {
//Cuando termine el proceso
      if (xhr.readyState === 4) {
//correctamente
        if (xhr.status === 200) {
          //console.log('imagen subida');
          //si se sube llama al resolve
          //JSON en vez de string
          resolve(JSON.parse( xhr.response));
        } else {
         // console.log('fallo la subida');
          reject(xhr.response);
        }
      }
    };

      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
      xhr.open('PUT', url, true);
      xhr.send(formData);


    });




  }


}
