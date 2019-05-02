import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from '../../shared/data-storage.service';
import { ResourceService } from '../../pages/resources/resources.service';
import { Router } from '@angular/router';
// Sweet Alert
declare let swal: any;
// Sweet Alert
@Component({
  selector: 'app-resources-form',
  templateUrl: './resources-form.component.html',
  styleUrls: ['./resources-form.component.css']
})
export class ResourcesFormComponent implements OnInit {
  // Resource Image , Website (not required)
  resourceImage = '';
  resourceWebsite = '';
  websiteEmpty = true;
  // Resource Image , Website (not required)
  // ServicesArray
  servicesArray = [];
  serviceArray = [];
  tempArray = [];
  // ServicesArray
  // Countries Array
  countries = [];
  countryId;
  // Countries Array
  // Cities Array
  cities = [];
  // Cities Array
  // Types Array
  types: any = [];
  // Types Array
  // Active ByDefault False
  typeFalse = false;
  // Active ByDefault False
  // Add Resource Mode
  resourceMode: any;
  // Add Resource Mode
  // Test

  // Test
  // Resource Data To Update Come From Resource Component
  @Input() updatedResourceData: any;
  @Input() editMode: any;
  @Output() editModeChange = new EventEmitter();
  @Output() editSuccess = new EventEmitter();
  // Resource Data To Update Come From Resource Component
  @ViewChild('f') addNewResource: NgForm;
  constructor(private dataStorageService: DataStorageService, private resourcesService: ResourceService, private router: Router) {}
  checkServiceArray() {}
  // Start On Init Form
  ngOnInit() {
    // Check For Add Resource
    this.resourceMode = this.router.url.includes('add-resource');

    // Check For Add Resource
    // Get Services
    this.dataStorageService.getServices().subscribe((services: any) => {
      this.servicesArray = services;
      if (!this.resourceMode) {
        // Push False In Service Array To Override With Active Services Only
        this.servicesArray.forEach((value, index) => {
          this.serviceArray.push(false);
        });
        // Push False In Service Array To Override With Active Services Only
        // Override False Values With True For Active Services
        this.updatedResourceData.services_ids.forEach((value, index) => {
          // tslint:disable-next-line:triple-equals
          index = value;
          value = true;
          this.serviceArray.splice(index, 0, value);
        });
        // Override False Values With True For Active Services
      }
    });
    // Get Services
    // Get Countries
    this.resourcesService.getCountries().subscribe((countries: any) => {
      this.countries = countries.data;

      // Get Cities On Update Load
      if (this.editMode) {
        this.resourcesService.getCities(this.updatedResourceData.country).subscribe((updateCities: any) => {
          this.cities = updateCities.data;
        });
      }
      // Get Cities On Update Load
    });
    // Get Countries
    // Get Types
    this.resourcesService.getTypes().subscribe((types: any) => {
      this.types = types.data;
    });
    // Get Types
    // Display Resource Data To Update
    // Display Resource Data To Update
  }
  // End On Init Form
  // check for website input is empty
  onWebsiteChange() {
    if (this.addNewResource.value.website === '') {
      this.websiteEmpty = true;
    } else {
      this.websiteEmpty = false;
    }
  }
  // check for website input is empty
  // Start On Submit Form
  onSubmit() {
    this.tempArray = [];
    this.serviceArray.forEach((value, index) => {
      // tslint:disable-next-line:triple-equals
      if (value == true) {
        this.tempArray.push(index);
      } else {
        this.tempArray.splice(index, 1);
      }
    });
    this.addNewResource.value.services = this.tempArray;
    // this.addNewResource.value.resourceServices = 'done';
    this.deleteEmpty();
    // Store Resource
    this.resourcesService.storeResource(this.addNewResource.value).subscribe(
      storeResourceResponse => {
        swal('Added Success', '', 'success');
        this.addNewResource.reset();
      },
      error => {
        this.handlingError(error);
      }
    );
    // Store Resource
  }
  // End On Submit Form
  // Handle Image Base64
  onFileChanges(e) {
    this.resourceImage = e[0].base64;
  }
  // Handle Image Base64
  // Get Country Id
  countryChanged(id) {
    this.countryId = this.addNewResource.value.country;

    this.getCities(this.countryId);
  }
  // Get Country Id
  // Get Cities
  getCities(countryId) {
    this.resourcesService.getCities(countryId).subscribe((cities: any) => {
      this.cities = cities.data;
    });
  }
  // Get Cities
  // Close Edit Mode
  onFinishEdit() {
    this.editMode = false;
    this.editModeChange.emit(this.editMode);
  }
  // Close Edit Mode
  // Update Resource
  onUpdate() {
    // &&&&&&&&&&&&&&&& Set Active To True Or False &&&&&&&&&&&&&&&&
    if (this.addNewResource.value.active === 1) {
      this.addNewResource.value.active = true;
    }
    if (this.addNewResource.value.active === 0) {
      this.addNewResource.value.active = false;
    }
    // &&&&&&&&&&&&&&&& Set Active To True Or False &&&&&&&&&&&&&&&&

    this.deleteEmpty();

    this.tempArray = [];
    this.serviceArray.forEach((value, index) => {
      // tslint:disable-next-line:triple-equals
      if (value == true) {
        this.tempArray.push(index);
      } else {
        this.tempArray.splice(index, 1);
      }
    });
    this.addNewResource.value.services = this.tempArray;

    this.resourcesService.updateResource(this.addNewResource.value, this.updatedResourceData.id).subscribe(
      (data: any) => {
        this.editSuccess.emit(true);
        swal('Updated ' + data.status, '', 'success');
      },
      error => {
        this.handlingError(error);
      }
    );
  }
  // Update Resource
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
    if (this.addNewResource.value.logo === '') {
      delete this.addNewResource.value.logo;
    }
    if (this.addNewResource.value.website === '') {
      delete this.addNewResource.value.website;
    }
  }
  //  ############################# Delete Empty Handling #############################
}
