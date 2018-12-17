import { Component, OnInit } from '@angular/core';
import { Esal } from '../../models/esal.model';
import { EsalService } from '../../services/esal/esal.service';
import { ActivatedRoute } from '@angular/router';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-esal-details-dashboard',
  templateUrl: './esal-details-dashboard.component.html',
  styleUrls: ['./esal-details-dashboard.component.css']
})
export class EsalDetailsDashboardComponent implements OnInit {


  id: string;
  esal: Esal;
  //
  currentJustify = 'start';

  currentOrientation = 'horizontal';
  public beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'tab-preventchange2') {
      $event.preventDefault();
    }
  }
//
  constructor(public activatedRoute: ActivatedRoute, public esalService: EsalService) {

    
    this.activatedRoute.params.subscribe(params =>{

      this.id = params['id'];
     
   });

   this.esalService.obtenerEsalPorId(this.id).subscribe( (resp: any) => {

     console.log("Esal: ", resp);
     this.esal = resp.esal;

   });

   }

  ngOnInit() {
  }
}