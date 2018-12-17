import { Routes } from '@angular/router';

import { EmailComponent } from './email/email.component';
import { TaskboardComponent } from './taskboard/taskboard.component';
import { FullcalendarComponent } from './fullcalendar/fullcalendar.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { DepartamentoComponent } from './departamento/departamento.component';
import { TipoEsalComponent } from './tipo-esal/tipo-esal.component';
import { MunicipioComponent } from './municipio/municipio.component';
import { DonacionComponent } from './donacion/donacion.component';
import { EsalComponent } from './esal/esal.component';

export const AppsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'email',
        component: EmailComponent,
        data: {
          title: 'Email Page',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Email Page' }
          ]
        }
      },
      {
        path: 'taskboard',
        component: TaskboardComponent,
        data: {
          title: 'Taskboard',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Taskboard' }
          ]
        }
      },
      {
        path: 'fullcalendar',
        component: FullcalendarComponent,
        data: {
          title: 'Full-Calendar',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Full-Calendar' }
          ]
        }
      },
      {
        path: 'usuario',
        component: UsuarioComponent,
        data: {
          title: 'Usuario',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Usuario' }
          ]
        }
      },
      {
        path: 'departamento',
        component: DepartamentoComponent,
        data: {
          title: 'Departamento',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Departamento' }
          ]
        }
      },
      {
        path: 'tipoEsal',
        component: TipoEsalComponent,
        data: {
          title: 'tipoEsal',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'tipoEsal' }
          ]
        }
      },
      {
        path: 'municipio',
        component: MunicipioComponent,
        data: {
          title: 'municipio',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'municipio' }
          ]
        }
      },
      {
        path: 'donacion',
        component: DonacionComponent,
        data: {
          title: 'donacion',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'donacion' }
          ]
        }
      },
      {
        path: 'esal',
        component: EsalComponent,
        data: {
          title: 'esal',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'esal' }
          ]
        }
      }
    ]
  }
];
