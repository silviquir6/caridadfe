import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { UsuarioService } from '../services/usuario/usuario.service';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  constructor(public usuarioService : UsuarioService){

  }

  transform( img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/imagen';
    

    if ( !img ) {
     url = url + '/usuarios/xxx';
     url += '?token=' + this.usuarioService.token;
      return url;
      
    }

    if ( img.indexOf('https') >= 0 ) {
      
      return img;
    }

    switch ( tipo ) {

      case 'usuario':
        url += '/usuarios/' + img;
      break;

      case 'esal':
        url += '/esals/' + img;
      break;

      case 'hospital':
         url += '/medicos/' + img;
      break;

      default:
        console.log('tipo de imagen no existe, usuario, esals, hospitales');
        url += '/usuarios/xxx';
    }
    url += '?token=' + this.usuarioService.token;
    return url;
  }

}
