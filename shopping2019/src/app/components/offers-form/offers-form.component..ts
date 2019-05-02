import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OffersService } from '../../pages/offers/offers.service';
// Sweet Alert
declare let swal: any;
// Sweet Alert

// @Component({
//   // selector: 'app-offers-form',
//   // templateUrl: './offers-form.component.html',
//   // styleUrls: ['./offers-form.component.css']
// })
export class OffersForm2Component implements OnInit {
  // Resources Array
  resourcesArray = [];
  resourcesTempArray = [];
  resourcesallArray = [];
  // Resources Array
  // Service Array
  servicesArray = [];
  // Service Array
  // SubService Array
  SubServicesArray = [];
  // SubService Array
  resourceConfig = {
    displayKey: 'name',
    search: true,
    placeholder: 'المصدر'
  };
  serviceConfig = {
    displayKey: 'name',
    search: true,
    placeholder: 'الخدمة الرئيسية'
  };
  subServiceConfig = {
    displayKey: 'name',
    search: true,
    placeholder: 'الخدمة الفرعية'
  };
  // Ofer For Main Service
  offerMainService;
  // Ofer For Main Service
  // Catch The Form
  @ViewChild('f') offersForm: NgForm;
  // Catch The Form
  // Active Init State
  binding = false;
  // Active Init State
  // Edit Resource State
  editResource = false;
  // Edit Resource State
  // Edit Service State
  editService = false;
  // Edit Service State
  // Offer Image
  offerImage = '';
  // Offer Image
  // source & service Id
  sourceId;
  serviceId;
  subServiceId;
  // source & service Id
  // Edit Mode
  @Input() editMode;
  // Edit Mode
  // Updated Data
  @Input() updatedData;
  updatedId;
  // Updated Data
  // Close Edit Mode
  @Output() editModeChange = new EventEmitter();
  // Close Edit Mode
  // Edit Success
  @Output() editSuccess = new EventEmitter();
  // Edit Success
  // emptySubService
  emptySubService = true;
  // emptySubService
  // updated data source name
  updatedName;
  // updated data source name
  // updated Main Service
  updatedMain;
  // updated Main Service
  // updated sub service
  updatedSub;
  // updated sub service
  viewInit = false;
  // Select Resource Reset And Binding
  resource_value = [];
  resource_values;
  // Select Resource Reset And Binding
  // Select Main Service Reset And Binding
  service_value = [];
  service_values;
  // Select Main Service Reset And Binding
  // Select Sub Service Reset And Binding
  subService_value = [];
  subService_values;
  // Select Sub Service Reset And Binding
  constructor(private offersService: OffersService) {}

  ngOnInit() {
    // Get Resources
    this.offersService.getResources().subscribe((resources: any) => {
      this.resourcesTempArray = resources.data;
      this.resourcesallArray = resources.data;
      this.resourcesTempArray.forEach(value => {
        this.resourcesArray.push({ name: value.name });
      });
      this.resourcesTempArray = this.resourcesArray;
      console.log(this.resourcesTempArray);
    });
    // Get Resources
    if (this.editMode) {
      // Updated Resource Name
      this.updatedName = this.updatedData.source.name;
      // Updated Resource Name
      // Updated Resource Name
      this.updatedMain = this.updatedData.service.name;
      // Updated Resource Name
      // Store Service Children
      this.SubServicesArray = this.updatedData.service.children;
      // Store Service Children
      this.getServices(this.updatedData.source.id);
    }
  }
  // Get Services
  getServices(id) {
    this.offersService.getServices(id).subscribe((services: any) => {
      this.service_values = [];
      this.servicesArray = services.data;
      console.log(this.servicesArray);
      if (this.viewInit === false && this.editMode) {
        this.viewInit = true;
        this.defaultFormData();
      }
    });
  }
  // Get Services
  // View Init Form Default Data
  defaultFormData() {
    // Default Form Source And Service Id
    this.offersForm.value.source_id = this.updatedData.source_id;
    this.offersForm.value.service_id = this.updatedData.service_id;
    console.log(this.offersForm.value);
    // Default Form Source And Service Id
  }
  // View Init Form Default Data
  onSubmit() {
    this.offersForm.value.source_id = this.sourceId;
    if (this.emptySubService === true) {
      this.offersForm.value.service_id = this.offerMainService;
    }
    if (this.emptySubService === false) {
      this.offersForm.value.service_id = this.subServiceId;
    }
    // Check for Date Empty
    if (this.offersForm.value.end_date === '') {
      delete this.offersForm.value.end_date;
    }
    if (this.offersForm.value.start_date === '') {
      delete this.offersForm.value.start_date;
    }
    // Check for Date Empty

    this.offersService.storeOffers(this.offersForm.value).subscribe(
      (storeOffer: any) => {
        swal(storeOffer.status, '', 'success');
      },
      error => {
        if (error.error.errors.description) {
          swal(error.error.errors.description[0], '', 'error');
        }
        if (error.error.errors.start_date) {
          swal(error.error.errors.start_date[0], '', 'error');
        }
        if (error.error.errors.end_date) {
          swal(error.error.errors.end_date[0], '', 'error');
        }
        if (error.error.errors.name) {
          swal(error.error.errors.name[0], '', 'error');
        }
        if (error.error.errors.service_id) {
          swal(error.error.errors.service_id[0], '', 'error');
        }
        if (error.error.errors.source_id) {
          swal(error.error.errors.source_id[0], '', 'error');
        }
      }
    );
  }
  // Handle Image Base64
  onFileChanges(e) {
    this.offerImage = e[0].base64;
  }
  // Handle Image Base64
  // Resource Select Change
  resourceChanged(event) {
    // ٍReset Main Service & Sub Service
    this.service_value = [];
    this.subService_value = [];
    // ٍReset Main Service & Sub Service
    // empty select for source
    if (event.value.length === 0) {
      // Defalut Names Selected From Updated Data
      this.updatedName = this.updatedData.source.name;
      this.updatedMain = this.updatedData.service.name;
      // Defalut Names Selected From Updated Data
      // Default Form Source And Service Id
      this.offersForm.value.source_id = this.updatedData.source_id;
      this.offersForm.value.service_id = this.updatedData.service_id;
      // Default Form Source And Service Id
      this.editResource = false;
    }
    // empty select for source
    // Not Empty Select
    if (event.isTrusted !== true && event.value.length !== 0) {
      this.editResource = true;
      // empty placeholder
      this.updatedName = '';
      this.updatedMain = '';
      // empty placeholder
      // Get Index
      const index = this.resourcesallArray.findIndex(x => x.name === event.value[0].name);
      // Get Index
      this.offersForm.value.source_id = this.resourcesallArray[index].id;
      this.offersForm.value.service_id = null;
      this.sourceId = this.resourcesallArray[index].id;
      this.getServices(this.sourceId);
      console.log('changed ', this.sourceId);

      // this.resource_values = this.resource_value[0].id;
    }
  }
  // Resource Select Change
  // Service Select Change
  serviceChanged(event) {
    // Reset Sub Service
    this.subService_value = [];
    // Reset Sub Service
    if (event.value.length === 0) {
      this.updatedMain = this.updatedData.service.name;
      this.editService = false;
    }
    if (event.isTrusted !== true && event.value.length !== 0) {
      this.editService = true;
      // empty placeholder
      this.updatedMain = '';
      // empty placeholder
      this.serviceId = event.value[0].id;
      this.SubServicesArray = event.value[0].children;
      this.offerMainService = event.value[0].id;
      this.offersForm.value.service_id = this.offerMainService;
    }
  }
  // Service Select Change
  // Service Select Change
  subServiceChanged(event) {
    if (event.value.length === 0) {
      this.emptySubService = true;
      this.offersForm.value.service_id = this.offerMainService;
    }
    if (event.isTrusted !== true && event.value.length !== 0) {
      this.emptySubService = false;

      this.subServiceId = event.value[0].id;
      this.offersForm.value.service_id = this.subServiceId;
    }
  }
  // Service Select Change
  // On Update
  onUpdate() {
    this.updatedId = this.updatedData.id;
    if (this.offersForm.value.active === 0) {
      this.offersForm.value.active = false;
    }
    if (this.offersForm.value.active === 1) {
      this.offersForm.value.active = true;
    }
    // delete On Update
    this.deleteOnUpdate();
    // delete On Update
    // this.offersService.updateOffer(this.offersForm.value, this.updatedId).subscribe((updateOffer: any) => {
    //   this.editSuccess.emit(true);
    //   swal('Updated ' + updateOffer.status, '', 'success');
    // });
  }
  onCloseEdit() {
    this.editMode = false;
    this.editModeChange.emit(this.editMode);
  }
  // on Update Delete Un necessary
  deleteOnUpdate() {
    if (this.offersForm.value.image === '') {
      delete this.offersForm.value.image;
    }
    if (this.offersForm.value.start_date === '') {
      delete this.offersForm.value.start_date;
    }
    if (this.offersForm.value.start_date === null) {
      delete this.offersForm.value.start_date;
    }
    if (this.offersForm.value.end_date === '') {
      delete this.offersForm.value.end_date;
    }
    if (this.offersForm.value.end_date === null) {
      delete this.offersForm.value.end_date;
    }
    delete this.offersForm.value.editResource;
    delete this.offersForm.value.editService;
  }
  // on Update Delete Un necessary
  // On Update
  check() {
    this.onUpdate();
    console.log(this.offersForm.value);
  }
}
