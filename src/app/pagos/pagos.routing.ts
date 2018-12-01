import { Routes } from '@angular/router';
import { PagosComponent } from './pagos.component';

export const PagosRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'payu',
        component: PagosComponent,
        data: {
          title: 'payu',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'payu' }
          ]
        }
      }
    ]
  }
];
