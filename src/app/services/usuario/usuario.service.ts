import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  usuario: Usuario;
  token: string;
  menu: any[] = [];

  //se inyectan los servicios:
  constructor(public http: HttpClient, public router: Router, public subirArchivoService: SubirArchivoService) {

    this.cargarStorage();
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;

  }
  cargarStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    }
    else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }

  }
  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu= [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    window.location.href = '/authentication/login';
    //this.router.navigate(['/landingpage/landingpage']);

  }

  loginGoogle(idtoken: string) {
    let url = URL_SERVICIOS + '/google';
    return this.http.post(url, { idtoken })
      .pipe(map((resp: any) => {

        console.log('loginGoogle resp : ', resp);
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      }));

  }
  login(usuario: Usuario, recuerdame: boolean = false) {


    if (recuerdame) {
      localStorage.setItem('email', usuario.email);
    }
    else {
      localStorage.removeItem('email');
    }
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
      .pipe(map((resp: any) => {
        //console.log(resp);
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;

      }));

  }


  crearUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario)
      .pipe(map((resp: any) => {
        swal("Usuario Creado", usuario.email, "success");
        console.log(resp);
        return resp.usuario;

      }));

  }

  actualizarUsuario(usuario: Usuario) {

    const headers = new HttpHeaders().set("token", this.token);

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;

    console.log(url);
    return this.http.put(url, usuario, {headers: headers})
      .pipe(map((resp: any) => {

        if (usuario._id === this.usuario._id) {

          let usuarioDB: Usuario = resp.usuario;

          this.guardarStorage(resp.id, this.token, usuarioDB, this.menu);
        }

        swal("Usuario Actualizado", usuario.nombre, "success");

        console.log('actualizarUsuario', resp);

        return true;

      }));

  }

  cambiarImagen(archivo: File, id: string) {

    //llamar el metodo de subir archivo que regresa una promesa:

    this.subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        this.guardarStorage(resp.id, this.token, this.usuario, this.menu);
        swal("Imagen actualizada", this.usuario.nombre, "success");

      })
      .catch(resp => {
        console.log(resp);
      });
  }

  cargarUsuarios(desde: number = 0) {

    const headers = new HttpHeaders().set("token", this.token);


    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url, {headers});
  }

  buscarUsuario(termino: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.usuarios
    ));

  }
  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
      .pipe(
        map(
          (resp: any) =>
{
            swal("Usuario borrado", "El usuario ha sido eliminado correctamente", "success");
    return true;
  }
   ) );




  }



}
