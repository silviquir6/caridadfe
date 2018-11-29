import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup2.component.html'
})
export class Signup2Component {
  
  forma: FormGroup;

  constructor(public usuarioService: UsuarioService,
    public router: Router) { }


  sonIguales(campo1: string, campo2: string) {

    return (group: FormGroup) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return { sonIguales: true }



    };

  }

  ngOnInit() {


    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)

    }, { validators: this.sonIguales('password', 'password2') });

    this.forma.setValue({
      nombre: '',
      correo: '',
      password: '',
      password2: '',
      condiciones: false
    })
  }

  registrarUsuario() {

    console.log('condiciones', this.forma.value.condiciones);


    if (this.forma.invalid) {
      return;
    }

    /*  swal("Importante!", "Debe aceptar las condiciones!", "warning");
     return; */


    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this.usuarioService.crearUsuario(usuario)
      .subscribe(resp => {

        console.log(resp);
        this.router.navigate(['/authentication/login']);

      });

  }
}
