import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  formUsuario: FormGroup;
  cargando: boolean = true;

  constructor(public usuarioService: UsuarioService) {

    this.formUsuario = new FormGroup({
      email: new FormControl(null),
      img: new FormControl(null),
      estado: new FormControl(null),
      google: new FormControl(null),
      role: new FormControl(null)
    });
  }

  ngOnInit() {

    this.obtenerUsuarios();
  }
  obtenerUsuarios() {

    this.usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.cuantos;
      this.usuarios = resp.usuarios;


    });

  }
  cambiarDesde(valor: number) {

    let desdeTemp = this.desde + valor;
    console.log('desdeTemp:', desdeTemp);
    if (desdeTemp >= this.totalRegistros) {
      return;
    }
    if (desdeTemp < 0) {
      return;
    }
    console.log('desde:', this.desde);
    this.desde += valor;
    console.log('desde +valor:', this.desde);

    this.obtenerUsuarios();

  }

  guardarUsuario(usuario: Usuario) {

    this.usuarioService.actualizarUsuario(usuario).subscribe();
  }

}
