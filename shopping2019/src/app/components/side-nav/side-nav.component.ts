import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../../shared/data-storage.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  pageId = 1;
  pagActive;
  clientsActive;

  subMenu = false;
  clientsPageId;
  @Input() clientsActiveId = 1;
  @Input() ordersActiveId = 1;
  @Input() offersActiveId = 1;
  // ##########   Permissions ##########
  modules = [];
  // ##########   Permissions ##########
  // In All Orders
  inAllOrders;
  inAddOrder;
  // In All Orders
  constructor(
    private router: Router, //
    private route: ActivatedRoute,
    public dataStorageService: DataStorageService,
  ) {
    this.pagActive = this.router.url.includes('all-technicians');
    this.clientsActive = this.router.url.includes('all-clients');
  }
  ngOnInit() {
    this.inAllOrders = this.router.url.includes('orders');
    this.inAddOrder = this.router.url.includes('order');
    console.log(this.inAllOrders);


    // Get Permission Module
  }

  toggleSubMenu(id) {
    $(document).ready(function () {
      this.subMenu = !this.subMenu;
      // Slide Sub Menu
      $('#' + id)
        .children('.m-menu__submenu')
        .slideToggle('300')
        .end()
        .children('a.m-menu__toggle')
        .children('.SubMenuAngle')
        .toggleClass('rotateAngle');
      // Slide Sub Menu
    });
  }
}
