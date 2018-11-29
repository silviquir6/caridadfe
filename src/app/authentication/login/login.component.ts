import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';


declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  
  

  email: string;
  recuerdameVar: boolean= false;
  auth2:any;

  forma: FormGroup;

  
constructor(public usuarioService: UsuarioService, public router: Router  ) { }

ngOnInit() {
  console.log('ngOnInit');
this.googleInit();
  this.email = localStorage.getItem('email') || '';
if (this.email.length > 1)
{
  this.recuerdameVar = true;
}

  this.forma = new FormGroup({
    correo: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    recuerdame: new FormControl(false)

        } );

         this.forma.setValue({
          correo: this.email,
          password: '',
          recuerdame: this.recuerdameVar
        });

}




googleInit(){
console.log('googleInit');
  gapi.load('auth2', ()=>{
this.auth2= gapi.auth2.init({
  client_id : '1088054650025-rj7d9ee44gme47c22b2nk4tqoggqn535.apps.googleusercontent.com',
  cookiepolicy: 'single host origin',
  scope: 'profile email'
});

this.attachSignIn(document.getElementById('btnGoogle'));

  });
}

attachSignIn(element){
  console.log('attachSignIn');
this.auth2.attachClickHandler(element, {}, (googleUser) =>{
  console.log('attachClickHandler');

let token = googleUser.getAuthResponse().id_token;
console.log('token',token);

this.usuarioService.loginGoogle(token)
            .subscribe(correcto =>{
              console.log('login google correcto');
             window.location.href = '/dashboard/dashboard1';
             /* this.router.navigate(['/dashboard']);
 */
          });
} );

}


ingresar(){

  if (this.forma.invalid) {
    return;
  }

  console.log(this.forma.value);


  let usuario = new Usuario(
    null,
    this.forma.value.correo,
    this.forma.value.password

  );

  this.usuarioService.login(usuario, this.forma.value.recuerdame)
  .subscribe(correcto => {

    window.location.href = '/dashboard/dashboard1';
   


  });
}





}
