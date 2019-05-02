import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../../../shared/data-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-all-technicians',
  templateUrl: './all-technicians.component.html',
  styleUrls: ['./all-technicians.component.css']
})
export class AllTechniciansComponent implements OnInit, OnDestroy {
  technicians = [];
  pagesNumber = [];
  pageId = 1;
  pageActiveNumberClass = 'm-datatable__pager-link--active m-datatable__pager-link m-datatable__pager-link-number';
  pageNumberClass = 'm-datatable__pager-link m-datatable__pager-link-number';
  editMode = false;
  public updatedTechnicalData: any;
  anyTechnicalExist = true;
  emptyArray: any;

  constructor(
    private dataStorageService: DataStorageService, //
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get id from the active link
    this.route.params.subscribe((response: any) => {
      this.pageId = response.id;
    });
    // Get id from the active link
    this.dataStorageService.getTechnicians(this.pageId).subscribe((response: any) => {
      this.technicians = response.data.data;

      const pagesCount = Math.ceil(response.data.total / response.data.per_page);
      for (let i = 1; i <= pagesCount; i++) {
        this.pagesNumber.push(i);
      }

      // Check for is there any data
      // tslint:disable-next-line:triple-equals
      if (this.technicians.length == 0) {
        this.emptyArray = true;
        // tslint:disable-next-line:triple-equals
        if (this.pageId == 1) {
          this.anyTechnicalExist = false;
        } else {
          this.anyTechnicalExist = true;
          // Fetch Data Again
          this.dataStorageService.getTechnicians(this.pageId).subscribe((responseTwo: any) => {
            this.technicians = responseTwo.data.data;
          });
          // Fetch Data Again
        }
      } else {
        this.emptyArray = false;
      }
      // Check for is there any data
    });
    this.dataStorageService.currentPageId(this.pageId);
  }
  ngOnDestroy() {
    this.dataStorageService.currentPageId(this.pageId);
  }
  goPage(id) {
    this.pageId = id;
    this.router.navigate(['all-technicians/page/' + this.pageId]);
    this.dataStorageService.getTechnicians(this.pageId).subscribe((response: any) => {
      this.technicians = response.data.data;
    });
    this.dataStorageService.currentPageId(this.pageId);
  }

  deleteTechnical(idDelete) {
    // Get id from the active link
    this.route.params.subscribe((response: any) => {
      this.pageId = response.id;
    });
    // Get id from the active link
    const index = this.technicians.findIndex(x => x.idDelete === idDelete);
    this.dataStorageService.deleteTechnical(idDelete).subscribe((response: any) => {
      // Get id from the active link
      // tslint:disable-next-line:no-shadowed-variable
      this.route.params.subscribe((response: any) => {
        this.pageId = response.id;
      });
      // Get id from the active link
      // Fetch Data Again
      this.dataStorageService.getTechnicians(this.pageId).subscribe((responseOne: any) => {
        // Get id from the active link
        // tslint:disable-next-line:no-shadowed-variable
        this.route.params.subscribe((response: any) => {
          this.pageId = response.id;
        });
        // Get id from the active link
        this.technicians = responseOne.data.data;

        // tslint:disable-next-line:triple-equals
        if (this.technicians.length == 0) {
          // Get id from the active link
          // tslint:disable-next-line:no-shadowed-variable
          this.route.params.subscribe((response: any) => {
            this.pageId = response.id;
          });
          // Get id from the active link
          // tslint:disable-next-line:triple-equals
          if (this.pageId == 1) {
            this.anyTechnicalExist = false;
          } else {
            this.router.navigate(['all-technicians/page/' + (this.pageId - 1)]);
            this.pagesNumber.splice(-1, 1);
            // Fetch Data Again
            this.dataStorageService.getTechnicians(this.pageId - 1).subscribe((responseTwo: any) => {
              this.technicians = responseTwo.data.data;
            });
            // Fetch Data Again
          }
        }
      });
      // Fetch Data Again
    });
  }
  updateTechnical(id) {
    this.editMode = true;
    const index = this.technicians.findIndex(x => x.id === id);
    this.updatedTechnicalData = this.technicians[index];
  }
  editModeChange(state) {
    this.editMode = state;
  }
  editSuccess(editSuccess) {
    if (editSuccess === true) {
      // Fetch Data Again
      this.dataStorageService.getTechnicians(this.pageId).subscribe((response: any) => {
        this.technicians = response.data.data;
      });
      // Fetch Data Again
      this.editMode = false;
    }
  }
}
