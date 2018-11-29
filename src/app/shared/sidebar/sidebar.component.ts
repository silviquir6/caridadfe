import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteInfo } from './sidebar.metadata';
import { SidebarService } from '../../services/sidebar.service';


declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  ROUTES: RouteInfo[];
  
  public sidebarnavItems: any[];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
	public sidebarService: SidebarService
  ) {}
  // End open close
  ngOnInit() { 
    this.sidebarService.cargarMenu();
    this.ROUTES= this.sidebarService.menu;
    this.sidebarnavItems = this.ROUTES.filter(sidebarnavItem => sidebarnavItem);
  }
}
