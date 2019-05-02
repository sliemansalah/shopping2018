import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../clients.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  // Clients Array
  clients = [];
  // Clients Array
  // Pagination Style
  pageActiveNumberClass = 'm-datatable__pager-link--active m-datatable__pager-link m-datatable__pager-link-number';
  pageNumberClass = 'm-datatable__pager-link m-datatable__pager-link-number';
  // Pagination Style
  // Page Numbers For PAgination
  pagesNumber = [];
  // Page Numbers For PAgination
  // Array State Empty Or Not
  emptyArray: any;
  anyClientExist = true;
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
  constructor(
    private clientsService: ClientsService, //
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get id from the active link
    this.getIdActive();
    // Get id from the active link
    // Get All Clients
    this.getClients(this.pageId);
    // Get All Clients
    // Check For Data Existance
    this.checkForDataExistance();
    // Check For Data Existance
    // Send Active PAge Id
    this.clientsService.getActivePageId(this.pageId);
    // Send Active PAge Id
  }
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
    if (this.clients.length == 0) {
      this.emptyArray = true;
      // tslint:disable-next-line:triple-equals
      if (this.pageId == 1) {
        this.anyClientExist = false;
      } else {
        this.anyClientExist = true;
        // Fetch Data Again
        this.getClients(this.pageId);
        // Fetch Data Again
      }
    } else {
      this.emptyArray = false;
    }
  }
  // Check For Any Data Exist
  // Go To Page For PAgination
  goPage(id) {
    this.pageId = id;
    // Refresh Component And Navigate
    this.router
      .navigateByUrl(
        '/', //
        { skipLocationChange: true }
      )
      .then(() => this.router.navigate(['all-clients/page/' + this.pageId]));
    // Refresh Component And Navigate
    this.getClients(this.pageId);
    // Send Active PAge Id
    this.clientsService.getActivePageId(this.pageId);
    // Send Active PAge Id
  }
  // Go To Page For PAgination
  // Get All Clients
  getClients(id) {
    this.clientsService.getClients(id).subscribe((clients: any) => {
      console.log(clients.data.data);

      this.clients = clients.data.data;
      // Check For PAge Numbers
      this.pagesNumber = [];
      const pagesCount = Math.ceil(clients.data.total / clients.data.per_page);
      for (let i = 1; i <= pagesCount; i++) {
        this.pagesNumber.push(i);
      }
      // Check For PAge Numbers
      // Check Action
      // tslint:disable-next-line:triple-equals
      if (this.clients.length == 0) {
        // tslint:disable-next-line:triple-equals
        if (this.pageId == 1) {
          this.anyClientExist = false;
        } else {
          // Refresh Component And Navigate
          this.router
            .navigateByUrl(
              '/', //
              { skipLocationChange: true }
            )
            .then(() => this.router.navigate(['all-clients/page/' + (this.pageId - 1)]));
          // Refresh Component And Navigate
          this.pagesNumber.splice(-1, 1);
          // Fetch Data Again
          this.getClients(this.pageId - 1);
          // Fetch Data Again
        }
      }
      // Check Action
    });
  }
  // Get All Clients
  // Delete Function
  deleteFunction(id) {
    this.clientsService.deleteClient(id).subscribe((deleteAction: any) => {
      // Get id from the active link
      this.getIdActive(); // ??????
      // Get id from the active link
      // Fetch Data
      this.getClients(this.pageId);
      // Fetch Data
    });
  }
  // Delete Function

  // Delete Client
  deleteClient(idDelete) {
    // Delete Action
    this.deleteFunction(idDelete);
    // Delete Action
  }
  // Delete Client
  // Update Function
  updateFunction(id) {
    this.clientsService.getClient(id).subscribe((client: any) => {
      this.updatedData = client;
      this.editMode = true;
    });
  }
  updateClient(id) {
    this.updateFunction(id);
  }
  editModeChange(state) {
    this.editMode = state;
  }
  editSuccess(editSuccess) {
    if (editSuccess === true) {
      // Fetch Data Again
      this.getClients(this.pageId);
      // Fetch Data Again
      this.editMode = false;
    }
  }
  // Update Function
}
