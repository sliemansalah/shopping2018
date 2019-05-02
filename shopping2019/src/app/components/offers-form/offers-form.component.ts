import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OffersService } from '../../pages/offers/offers.service';
// Sweet Alert
declare let swal: any;
// Sweet Alert

@Component({
  selector: 'app-offers-form',
  templateUrl: './offers-form.component.html',
  styleUrls: ['./offers-form.component.css']
})
export class OffersFormComponent implements OnInit {
  // Catch The Form
  @ViewChild('f') offersForm: NgForm;
  // Catch The Form
  // Edit Mode
  @Input() editMode;
  @Input() updatedData;
  @Output() editModeChange = new EventEmitter();
  @Output() editSuccess = new EventEmitter();
  updatedResourceName;
  updatedMainServiceName;
  updatedSubServiceName;
  serviceFromMain = true;
  // Edit Mode
  // Resource Select Data
  resourceConfig = { displayKey: 'name', search: true, placeholder: 'المصدر' };
  resourceArray = [];
  resource_value = [];
  resource_values;
  // Resource Select Data
  // Resource Select Data
  serviceConfig = { displayKey: 'name', search: true, placeholder: 'الخدمة الرئيسية', limitTo: 5 };
  serviceArray = [];
  service_value = [];
  service_values;
  service_id;
  // Resource Select Data
  // Resource Select Data
  subServiceConfig = { displayKey: 'name', search: true, placeholder: 'الخدمة الفرعية' };
  subServiceArray = [];
  subService_value = [];
  subService_values;
  // Resource Select Data
  // Offer Image
  offerImage = '';
  // Offer Image
  // Active Init State
  ActiveState = false;
  // Active Init State
  // Resource Chabged
  resourceChange = false;
  // Resource Chabged
  constructor(private offersService: OffersService) {}
  ngOnInit() {
    // Get Resources
    this.getResources();
    // Get Resources
    // Set Updated Data
    if (this.editMode) {
      this.setUpdatedData();
    }
    // Set Updated Data
  }
  // Submit Form
  onSubmit() {
    this.deleteEmpty();

    this.offersService.storeOffers(this.offersForm.value).subscribe(
      (storeResponse: any) => {
        swal(storeResponse.status, '', 'success');
        this.offersForm.reset();
      },
      error => {
        this.handlingError(error);
      }
    );
  }
  // Submit Form
  // Resource Changed
  resourceChanged(e) {
    this.resourceChange = true;
    console.log(this.resource_value[0].id);
    this.getServices(e.value[0].id);
    this.resource_values = this.resource_value[0].id;
    this.service_value = [];
    this.subService_value = [];
    // Edit Mode
    if (this.editMode) {
      this.updatedResourceName = '';
      this.updatedMainServiceName = '';
      this.updatedSubServiceName = '';
      this.subServiceArray = [];
      this.subService_values = null;
      this.service_values = null;
      this.serviceConfig.placeholder = 'الخدمة الرئيسية';
      this.subServiceConfig.placeholder = 'الخدمة الفرعية';
    }
    // Edit Mode
  }
  // Resource Changed
  // Service Changed
  serviceChanged(e) {
    this.subServiceArray = e.value[0].children;
    this.service_values = this.service_value[0].id;
    this.subService_value = [];
    this.updatedSubServiceName = '';
    this.subServiceConfig.placeholder = 'الخدمة الفرعية';
  }
  // Service Changed
  // SubService Changed
  subServiceChanged(e) {
    this.subService_values = this.subService_value[0].id;
  }
  // SubService Changed
  // Handle Image Base64
  onFileChanges(e) {
    this.offerImage = e[0].base64;
  }
  // Handle Image Base64
  // &&&&&&&&&&&&&&&& Get Resources , Main Service , SubService  &&&&&&&&&&&&&&&&
  // Get Resource
  getResources() {
    this.offersService.getResources().subscribe((resources: any) => {
      this.resourceArray = [];
      resources.data.forEach((value, index) => {
        this.resourceArray.push({ id: value.id, name: value.name });
      });
    });
  }
  // Get Resource
  // Get Services
  getServices(id) {
    this.offersService.getServices(id).subscribe((services: any) => {
      this.serviceArray = services.data;
      // In Edit Mode
      if (this.editMode && this.updatedData.service.parent === null) {
        const subServiceData = services.data.find(subService => subService.id === this.updatedData.service_id);
        this.subServiceArray = subServiceData.children;
      }
      if (this.editMode && this.updatedData.service.parent !== null) {
        const serviceData = this.serviceArray.find(service => service.id === this.updatedData.service.parent);
        if (serviceData !== undefined) {
          this.updatedMainServiceName = serviceData.name;
          if (!this.resourceChange) {
            this.subServiceArray = serviceData.children;
            this.serviceConfig.placeholder = this.updatedMainServiceName;
          }
        }
      }
      // In Edit Mode
    });
  }
  // Get Services
  // &&&&&&&&&&&&&&&& Get Resources , Main Service , SubService  &&&&&&&&&&&&&&&&
  // ################################## Edit Mode ##################################
  // On Update
  onUpdate() {
    this.deleteEmpty();
    // &&&&&&&&&&&&&&&& Set Active To True Or False &&&&&&&&&&&&&&&&
    if (this.offersForm.value.active === 1) {
      this.offersForm.value.active = true;
    }
    if (this.offersForm.value.active === 0) {
      this.offersForm.value.active = false;
    }
    // &&&&&&&&&&&&&&&& Set Active To True Or False &&&&&&&&&&&&&&&&
    console.log(this.updatedData.id, this.offersForm.value);
    this.offersService.updateOffer(this.offersForm.value, this.updatedData.id).subscribe(
      (updateOffer: any) => {
        swal(updateOffer.status, '', 'success');
        this.editSuccess.emit(true);
      },
      error => {
        this.handlingError(error);
      }
    );
  }
  // On Update
  // Set Updated Data To Inputs
  setUpdatedData() {
    console.log(this.updatedData);
    // For Resource
    this.updatedResourceName = this.updatedData.source.name;
    this.resourceConfig.placeholder = this.updatedResourceName;

    this.resource_values = this.updatedData.source.id;
    this.getServices(this.updatedData.source.id);
    // For Resource
    // For Main & SubService
    if (this.updatedData.service.parent !== null) {
      this.serviceFromMain = false;
      console.log(this.serviceFromMain);
      this.updatedSubServiceName = this.updatedData.service.name;
      this.subServiceConfig.placeholder = this.updatedSubServiceName;

      this.subService_values = this.updatedData.service.id;
    } else {
      this.serviceFromMain = true;
      console.log(this.serviceFromMain);
      this.updatedMainServiceName = this.updatedData.service.name;
      this.serviceConfig.placeholder = this.updatedMainServiceName;

      this.service_values = this.updatedData.service.id;
    }
    // For Main & SubService
  }
  // Set Updated Data To Inputs
  // Close Edit Mode
  onFinishEdit() {
    this.editMode = false;
    this.editModeChange.emit(this.editMode);
  }
  // Close Edit Mode
  // ################################## Edit Mode ##################################
  //  ############################# Error Handling #############################
  handlingError(error) {
    Object.keys(error.error.errors).forEach(function(key) {
      if (key) {
        swal(error.error.errors[key][0], '', 'error');
      }
    });
  }
  //  ############################# Error Handling #############################
  //  ############################# Delete Empty Handling #############################
  deleteEmpty() {
    if (this.offersForm.value.start_date === '' || this.offersForm.value.start_date === null) {
      delete this.offersForm.value.start_date;
    }
    if (this.offersForm.value.end_date === '' || this.offersForm.value.end_date === null) {
      delete this.offersForm.value.end_date;
    }
    if (this.offersForm.value.image === '') {
      delete this.offersForm.value.image;
    }
  }
  //  ############################# Delete Empty Handling #############################
}
