import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CalendarModule, CalendarDateFormatter } from 'angular-calendar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import { AppsRoutes } from './apps.routing';
import { EmailComponent } from './email/email.component';
import { TaskboardComponent } from './taskboard/taskboard.component';
import { FullcalendarComponent } from './fullcalendar/fullcalendar.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { PipesModule } from '../pipes/pipes.module';
import { DepartamentoComponent } from './departamento/departamento.component';
import { TipoEsalComponent } from './tipo-esal/tipo-esal.component';
import { MunicipioComponent } from './municipio/municipio.component';
import { DonacionComponent } from './donacion/donacion.component';
//form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EsalComponent } from './esal/esal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule.forRoot(),
    CalendarModule.forRoot(),
    QuillModule,
    DragulaModule,
    RouterModule.forChild(AppsRoutes), PipesModule
  ],
  declarations: [EmailComponent, TaskboardComponent, FullcalendarComponent, UsuarioComponent, DepartamentoComponent, TipoEsalComponent, MunicipioComponent, DonacionComponent, EsalComponent]
})
export class AppsModule {}
