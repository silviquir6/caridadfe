import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PagosRoutes } from './pagos.routing';
import { PagosComponent } from './pagos.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PagosRoutes),
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    NgbModule
  ],
  declarations: [
    PagosComponent
  ]
})
export class PagosModule {}
