import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdersService } from '../orders.service';
import * as $ from 'jquery';
// Sweet Alert
declare let swal: any;
// Sweet Alert

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  // Orders Array
  orders = [];
  // Orders Array
  // Pagination Style
  pageActiveNumberClass = 'm-datatable__pager-link--active m-datatable__pager-link m-datatable__pager-link-number';
  pageNumberClass = 'm-datatable__pager-link m-datatable__pager-link-number';
  // Pagination Style
  // Page Numbers For PAgination
  pagesNumber = [];
  // Page Numbers For PAgination
  // Array State Empty Or Not
  emptyArray: any;
  anyOrderExist = true;
  // Array State Empty Or Not
  // First Page Id
  pageId = 1;
  // First Page Id
  // Edit Mode
  editMode = false;
  // Edit Mode
  // Updated Data
  updatedData;
  // Updated Data
  // Status
  status = 0;
  statusArray;
  dateSearch = 0;
  // Status
  constructor(
    private ordersService: OrdersService, //
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('init', this.status, this.dateSearch);

    // Get id from the active link
    this.getIdActive();
    // Get id from the active link
    // Get All Orders
    this.getOrders(this.pageId, this.status, this.dateSearch);
    // Get All Orders
    // Check For Data Existance
    this.checkForDataExistance();
    // Check For Data Existance
    // Get Status
    this.ordersService.getStatus().subscribe((status: any) => {
      this.statusArray = status.data;
    });
    // Get Status
  }
  // Rotete Plus
  rotatePlus(id) {
    $('#plus' + id).addClass('rotatePlus');
  }
  // Table Sub Service Open
  toggleSubMenuIn(id) {
    $(document).ready(function() {
      $('#' + id).fadeIn();
    });
  }
  toggleSubMenuOut(id) {
    $(document).ready(function() {
      $('#' + id).fadeOut();
      $('#plus' + id).removeClass('rotatePlus');
    });
  }
  // Table Sub Service Open
  // Get id from the active link
  getIdActive() {
    this.route.params.subscribe((response: any) => {
      this.pageId = response.id;
    });
  }
  // Get id from the active link
  // Check For Any Data Exist
  checkForDataExistance() {
    // tslint:disable-next-line:triple-equals
    if (this.orders.length == 0) {
      this.emptyArray = true;
      // tslint:disable-next-line:triple-equals
      if (this.pageId == 1) {
        this.anyOrderExist = false;
      } else {
        this.anyOrderExist = true;
        // Fetch Data Again
        this.getOrders(this.pageId, this.status, this.dateSearch);
        // Fetch Data Again
      }
    } else {
      this.emptyArray = false;
    }
  }
  // Check For Any Data Exist
  // Get All Orders
  getOrders(id, status, dateSearch) {
    console.log('get orders ', id, status, dateSearch);
    this.ordersService.getOrders(id, status, dateSearch).subscribe((orders: any) => {
      console.log('orders', orders.data);
      this.orders = orders.data;
      // Check For PAge Numbers
      this.pagesNumber = [];
      const pagesCount = Math.ceil(orders.total / orders.per_page);
      for (let i = 1; i <= pagesCount; i++) {
        this.pagesNumber.push(i);
      }
      // Check For PAge Numbers
      // Check Action
      // tslint:disable-next-line:triple-equals
      if (this.orders.length == 0) {
        // tslint:disable-next-line:triple-equals
        if (this.pageId == 1) {
          this.anyOrderExist = false;
        } else {
          // Refresh Component And Navigate
          this.router.navigate(['all-orders/page/' + (this.pageId - 1)]);
          // Refresh Component And Navigate
          this.pagesNumber.splice(-1, 1);
          // Fetch Data Again
          this.getOrders(this.pageId - 1, this.status, this.dateSearch);
          // Fetch Data Again
        }
      }
      // Check Action
    });
  }
  // Get All Orders
  // Go To Page For PAgination
  goPage(id) {
    this.pageId = id;
    // Refresh Component And Navigate
    this.router.navigate(['all-orders/page/' + this.pageId]);
    // Refresh Component And Navigate
    this.getOrders(this.pageId, this.status, this.dateSearch);
    // Send Active PAge Id
    // this.clientsService.getActivePageId(this.pageId);
    // Send Active PAge Id
  }
  // Go To Page For PAgination
  // Delete Function
  deleteFunction(id) {
    this.ordersService.deleteOrder(id).subscribe((deleteAction: any) => {
      swal('Deleted ' + deleteAction.status, '', 'success');
      // Get id from the active link
      this.getIdActive(); // ??????
      // Get id from the active link
      // Fetch Data
      this.getOrders(this.pageId, this.status, this.dateSearch);
      //  Fetch Data
    });
  }
  // Delete Function

  // Delete Order
  deleteOrder(idDelete) {
    // Delete Action
    this.deleteFunction(idDelete);
    // Delete Action
  }
  // Delete Order
  // Update Function

  updateOrder(order) {
    this.editMode = true;
    this.updatedData = order;
    console.log('order is ', order);
  }
  editModeChange(state) {
    this.editMode = state;
  }
  editSuccess(editSuccess) {
    if (editSuccess === true) {
      // Fetch Data Again
      this.getOrders(this.pageId, this.status, this.dateSearch);
      // Fetch Data Again
      this.editMode = false;
    }
  }
  // Update Function
  // Date Changed
  dateChanged(e) {
    console.log(e.target.value);

    this.dateSearch = e.target.value;
    this.getOrders(this.pageId, this.status, this.dateSearch);
  }
  // Date Changed
  // Status Changed
  statusChanged(e) {
    this.status = e.target.value;
    this.getOrders(this.pageId, this.status, this.dateSearch);
  }
  // Status Changed
}
