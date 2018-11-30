import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService, public router: Router) {

  }

  canActivate(): boolean {

    if (this.usuarioService.estaLogueado()) {

      console.log('pasó el guard');
      return true;

    } else {

      console.log('bloqueado por el guard');
     
      window.location.href = '/authentication/login';
      return false;

    }

  }
}
