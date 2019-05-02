import { Component, OnInit } from '@angular/core';
import { OffersService } from '../offers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainProvider } from '../../../shared/headers';
// Sweet Alert
declare let swal: any;
// Sweet Alert

@Component({
  selector: 'app-all-offers',
  templateUrl: './all-offers.component.html',
  styleUrls: ['./all-offers.component.css']
})
export class AllOffersComponent implements OnInit {
  // offers Array
  offers = [];
  // offers Array
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
  // Description
  description = false;
  // Description
  // Base Link
  baseLink;
  // Base Link
  // tslint:disable-next-line:max-line-length
  constructor(
    private offersService: OffersService, //
    private route: ActivatedRoute,
    private router: Router,
    private mainProvider: MainProvider
  ) {}

  ngOnInit() {
    // Get id from the active link
    this.getIdActive();
    // Get id from the active link
    // Get All offers
    this.getOffers(this.pageId);
    // Get All offers
    // Check For Data Existance
    this.checkForDataExistance();
    // Check For Data Existance
    // Get The Base Link
    this.baseLink = this.mainProvider.baseUrlSource;
    // Get The Base Link
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
    if (this.offers.length == 0) {
      this.emptyArray = true;
      // tslint:disable-next-line:triple-equals
      if (this.pageId == 1) {
        this.anyClientExist = false;
      } else {
        this.anyClientExist = true;
        // Fetch Data Again
        this.getOffers(this.pageId);
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
      .then(() => this.router.navigate(['all-offers/page/' + this.pageId]));
    // Refresh Component And Navigate
    this.getOffers(this.pageId);
    // Send Active PAge Id
    // Send Active PAge Id
  }
  // Go To Page For PAgination
  // Get All offers
  getOffers(id) {
    this.offersService.getOffers(id).subscribe((offers: any) => {
      this.offers = offers.data.data;

      // Check For PAge Numbers
      this.pagesNumber = [];
      const pagesCount = Math.ceil(offers.data.total / offers.data.per_page);
      for (let i = 1; i <= pagesCount; i++) {
        this.pagesNumber.push(i);
      }
      // Check For PAge Numbers
      // Check Action
      // tslint:disable-next-line:triple-equals
      if (this.offers.length == 0) {
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
            .then(() => this.router.navigate(['all-offers/page/' + (this.pageId - 1)]));
          // Refresh Component And Navigate
          this.pagesNumber.splice(-1, 1);
          // Fetch Data Again
          this.getOffers(this.pageId - 1);
          // Fetch Data Again
        }
      }
      // Check Action
    });
  }
  // Get All offers
  // Delete Function
  deleteFunction(id) {
    this.offersService.deleteOffer(id).subscribe((deleteAction: any) => {
      swal('Deleted ' + deleteAction.status, '', 'success');
      // Get id from the active link
      this.getIdActive();
      // Get id from the active link
      // Fetch Data
      this.getOffers(this.pageId);
      // Fetch Data
    });
  }
  // Delete Function

  // Delete Client
  deleteOffer(idDelete) {
    // Delete Action
    this.deleteFunction(idDelete);
    // Delete Action
  }
  // Delete Client
  // Update Function
  updateFunction(id) {
    const index = this.offers.findIndex(x => x.id === id);
    this.updatedData = this.offers[index];
    this.editMode = true;
  }
  updateOffer(id) {
    this.updateFunction(id);
  }
  editModeChange(state: any) {
    this.editMode = state;
  }
  editSuccess(editSuccess) {
    if (editSuccess === true) {
      // Fetch Data Again
      this.getOffers(this.pageId);
      // Fetch Data Again
      this.editMode = false;
    }
  }
  // Update Function
  // OpenDescription
  openDescription() {
    this.description = true;
  }
  // OpenDescription
  // Close Description
  closeDescription() {
    this.description = false;
  }
  // Close Description
}
