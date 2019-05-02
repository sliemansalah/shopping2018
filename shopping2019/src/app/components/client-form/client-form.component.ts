import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResourceService } from '../../pages/resources/resources.service';
import { ClientsService } from '../../pages/clients/clients.service';
import { ActivatedRoute, Router } from '@angular/router';
// Sweet Alert
declare let swal: any;
// Sweet Alert
@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  // Catch Form
  @ViewChild('f') addClient: NgForm;
  // Catch Form
  // Close Edit Mode
  @Output() editModeChange = new EventEmitter();
  // Close Edit Mode
  // Edit Success
  @Output() editSuccess = new EventEmitter();
  // Edit Success
  // Countries Array
  countries = [];
  countryId;
  // Countries Array
  // Cities Array
  cities = [];
  // Cities Array
  // Genders Array
  genders = [];
  // Genders Array
  // Client Types Array
  client_types = [];
  // Client Types Array
  // Home types Array
  home_types = [];
  // Home types Array
  // home_contract_types
  home_contract_types = [];
  // home_contract_types
  // air_conditioner_types
  air_conditioner_types = [];
  // air_conditioner_types
  // air_conditioner Array
  air_conditioner = [];
  // air_conditioner Array
  // Air Condition Front Array
  airConditionFront = [];
  // Air Condition Front Array
  // Active Value
  activeValue = false;
  // Active Value
  // Edit Mode
  @Input() editMode;
  // Edit Mode
  // Updated Data
  @Input() updatedData;
  updatedId;
  // Updated Data
  constructor(
    private resourcesService: ResourceService, //
    private clientsService: ClientsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  // Check For Numbers For Mobile
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  // Check For Numbers For Mobile
  ngOnInit() {
    // &&&&&&&&&&&&&&&      Initial Select      &&&&&&&&&&&&&&&
    // Get Countries
    this.resourcesService.getCountries().subscribe((countries: any) => {
      this.countries = countries.data;
    });
    // Get Countries
    // Get Gender
    this.clientsService.getGender().subscribe((gender: any) => {
      this.genders = gender.data;
    });
    // Get Gender
    // Get Client Type
    this.clientsService.getClientType().subscribe((clientType: any) => {
      this.client_types = clientType.data;
    });
    // Get Client Type
    // Get Home Type
    this.clientsService.getHomeType().subscribe((clientType: any) => {
      this.home_types = clientType.data;
    });
    // Get Home Type
    // Get Air Conditional Type
    this.clientsService.getAirConditionalType().subscribe((airConditional: any) => {
      this.air_conditioner_types = airConditional.data;
    });
    // Get Air Conditional Type
    // Get Contract Type
    this.clientsService.getContractType().subscribe((contract: any) => {
      this.home_contract_types = contract.data;
    });
    // Get Contract Type
    // &&&&&&&&&&&&&&&      Initial Select      &&&&&&&&&&&&&&&
    if (this.editMode === true) {
      console.log('updata ', this.updatedData);

      // Get cities
      this.getCities(this.updatedData.city.country_id);
      // Get cities
      // Store air_conditioner
      // this.airConditionFront = this.updatedData.air_conditioner;
      // For Each
      this.updatedData.air_conditioner.forEach(value => {
        this.air_conditioner.push({ id: value.id, count: value.count });
        this.airConditionFront.push({ name: value.name, count: value.count });
      });

      // For Each
      // Store Updated Id
      this.updatedId = this.updatedData.id;
      // Store Updated Id
    }
    // Store air_conditioner
  }
  onSubmit() {
    this.addClient.value.air_conditioner = this.air_conditioner;
    delete this.addClient.value.air_conditioner_type;
    delete this.addClient.value.air_conditioner_count;
    this.deleteEmpty();
    console.log(this.addClient.value);
    this.clientsService.storeClient(this.addClient.value).subscribe(
      (storeResponse: any) => {
        console.log(storeResponse);
        // &&&&&&&&&&&&&&&&&    ORDERS    &&&&&&&&&&&&&&&&&
        // listen to activated route
        this.route.queryParams.subscribe(params => {
          swal('success', '', 'success');
          this.addClient.reset();
          if (params.orderClient === 'add') {
            setTimeout(() => {
              this.router.navigate(['/add-order']);
            }, 3000);
          }
        });
        // listen to activated route
        // &&&&&&&&&&&&&&&&&    ORDERS    &&&&&&&&&&&&&&&&&
      },
      error => {
        this.handlingError(error);
      }
    );
  }
  // Get Country Id
  countryChanged(id) {
    this.countryId = this.addClient.value.country_id;
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
  // Add Air Condition
  addAirCondition(id, count) {
    // tslint:disable-next-line:triple-equals
    const index = this.air_conditioner_types.findIndex(x => x.id == id);
    this.air_conditioner.push({ id: id, count: count });
    this.airConditionFront.push({ name: this.air_conditioner_types[index].name, count: count });
  }
  // Add Air Condition
  // Delete Air Item From Front
  deleteAirItemFront(name, count) {
    const index = this.airConditionFront.findIndex(x => x.name === name);
    this.airConditionFront.splice(index, 1);

    // Delete From Send Array
    const indexSend = this.air_conditioner.findIndex(x => x.count === count);
    this.air_conditioner.splice(indexSend, 1);
    // Delete From Send Array
  }
  // Delete Air Item From Front
  // On Update
  onUpdate() {
    // &&&&&&&&&&&&&&&& Set Active To True Or False &&&&&&&&&&&&&&&&
    if (this.addClient.value.active === 1) {
      this.addClient.value.active = true;
    }
    if (this.addClient.value.active === 0) {
      this.addClient.value.active = false;
    }
    // &&&&&&&&&&&&&&&& Set Active To True Or False &&&&&&&&&&&&&&&&
    this.addClient.value.air_conditioner = this.air_conditioner;
    delete this.addClient.value.air_conditioner_type;
    delete this.addClient.value.air_conditioner_count;
    this.deleteEmpty();
    this.clientsService.updateClient(this.addClient.value, this.updatedId).subscribe(
      (updateClient: any) => {
        this.editSuccess.emit(true);
        swal('Updated ' + updateClient.status, '', 'success');
      },
      error => {
        this.handlingError(error);
      }
    );
  }
  onCloseEdit() {
    this.editModeChange.emit(false);
  }
  // ########################## Delety Empty Fields ##########################
  deleteEmpty() {
    if (this.addClient.value.zone === '') {
      delete this.addClient.value.zone;
    }
    if (this.addClient.value.location === '') {
      delete this.addClient.value.location;
    }
    if (this.addClient.value.kitchen_number === '') {
      delete this.addClient.value.kitchen_number;
    }
    if (this.addClient.value.home_type === '') {
      delete this.addClient.value.home_type;
    }
    if (this.addClient.value.home_contract_type === '') {
      delete this.addClient.value.home_contract_type;
    }
    if (this.addClient.value.gender === '') {
      delete this.addClient.value.gender;
    }
    if (this.addClient.value.floor_number === '') {
      delete this.addClient.value.floor_number;
    }
    if (this.addClient.value.email === '') {
      delete this.addClient.value.email;
    }
    if (this.addClient.value.camera_number === '') {
      delete this.addClient.value.camera_number;
    }
    if (this.addClient.value.bathroom_number === '') {
      delete this.addClient.value.bathroom_number;
    }
    if (this.addClient.value.area === '') {
      delete this.addClient.value.area;
    }
    if (this.addClient.value.address === '') {
      delete this.addClient.value.address;
    }
    if (this.addClient.value.room_number === '') {
      delete this.addClient.value.room_number;
    }
  }
  //  ########################## Delety Empty Fields ##########################
  //  ############################# Error Handling #############################
  handlingError(error) {
    Object.keys(error.error.errors).forEach(function(key) {
      if (key) {
        swal(error.error.errors[key][0], '', 'error');
      }
    });
  }
  //  ############################# Error Handling #############################
  // On Update
  check() {
    console.log(this.addClient.value);
  }
}
