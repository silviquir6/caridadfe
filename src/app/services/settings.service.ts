import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';



@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
  temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
};
constructor(@Inject(DOCUMENT) private _document) {
  this.cargarAjustes();
 }

guardarAjustes(){
 // console.log('Guardado en el localStorage');
  localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
}

//obtener, puede ser que yo no tenga los ajustes en el localstorage
cargarAjustes(){
  //console.log('cargar Ajustes metodo');
  if (localStorage.getItem('ajustes')) {
    this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
    //console.log('cargando de ajustes');

    this.aplicarTema(this.ajustes.tema);
  } else {
    //console.log('usando valores por defecto');
    this.aplicarTema(this.ajustes.tema);

  }

}

aplicarTema(theme:string){

  let url =`assets/css/colors/${theme}.css`;
  this._document.getElementById('tema').setAttribute('href', url);

  this.ajustes.tema = theme;
  this.ajustes.temaUrl = url;

  this.guardarAjustes();

}
}
interface Ajustes {
  temaUrl: string,
  tema: string
}
