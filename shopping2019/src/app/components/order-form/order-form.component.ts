import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrdersService } from '../../pages/orders/orders.service';
import { trigger, style, animate, transition } from '@angular/animations';

// Sweet Alert
declare let swal: any;
// Sweet Alert

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
  animations: [
    trigger('enterAnimation', [
      // tslint:disable-next-line:max-line-length
      transition(':enter', [style({ transform: 'translateY(-50%)', opacity: 0 }), animate('300ms', style({ transform: 'translateY(0)', opacity: 1 }))]),
      // tslint:disable-next-line:max-line-length
      transition(':leave', [style({ transform: 'translateY(0)', opacity: 1 }), animate('300ms', style({ transform: 'translateY(-50%)', opacity: 0 }))])
    ])
  ]
})
export class OrderFormComponent implements OnInit {
  // Time Table
  minutes = [];
  hours = [];
  technical = [];
  // Time Table
  // client select config
  clientConfig = { displayKey: 'name', search: true, placeholder: 'إسم العميل' };
  clientArray = [];
  // client select config
  // Resource select config
  resourceConfig = { displayKey: 'name', search: true, placeholder: 'إسم المصدر' };
  resourceArray = [];
  // Resource select config
  // Resource select config
  serviceConfig = { displayKey: 'name', search: true, placeholder: 'الخدمة الرئيسية', limitTo: 5 };
  serviceArray = [];
  // Resource select config
  // Resource select config
  subServiceConfig = { displayKey: 'name', search: true, placeholder: 'الخدمة الفرعية' };
  subServiceArray = [];
  // Resource select config
  // Resource select config
  offerConfig = { displayKey: 'name', search: true, placeholder: 'إسم العرض' };
  offerArray = [];
  // Resource select config
  // Catch Form
  @ViewChild('f') orderForm: NgForm;
  // Catch Form
  // Search For Client
  clientName;
  timeout = null;
  // Search For Client
  // Select Client Reset And Binding
  client_value = [];
  client_values;
  client_update_name;
  // Select Client Reset And Binding
  // Select Resource Reset And Binding
  resource_value = [];
  resource_values;
  resource_update_name;
  // Select Resource Reset And Binding
  // Select Main Service Reset And Binding
  service_value = [];
  service_values;
  service_update_name;
  service_id;
  show_technicians = false;
  // Select Main Service Reset And Binding
  // Select Sub Service Reset And Binding
  subService_value = [];
  subService_values;
  subService_update_name;
  // Select Sub Service Reset And Binding
  // Select Main Offers Reset And Binding
  offers_value = [];
  offers_values;
  offers_update_name;
  // Select Main Offers Reset And Binding
  // Order Date
  order_date;
  date_changed = '';
  // Order Date
  // Desc Popup
  desc_selected = false;
  desc_data;
  // Desc Popup
  // Start Update
  @Input() editMode;
  @Input() updatedData;
  @Output() editModeChange = new EventEmitter();
  @Output() editSuccess = new EventEmitter();
  // End Update
  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    // Time Table
    for (let index = 1; index <= 60; index++) {
      this.minutes.push(index);
    }
    for (let index = 9; index <= 22; index++) {
      this.hours.push(index);
    }
    // Time Table
    // Get Clients
    this.getClients('م');
    // Get Clients
    // Get Resources
    this.ordersService.getResources().subscribe((orders: any) => {
      this.resourceArray = [];
      orders.data.forEach((value, index) => {
        this.resourceArray.push({ id: value.id, name: value.name });
      });
    });
    // Get Resources
    // Set Updated Data
    if (this.editMode) {
      this.setUpdatedData();
    }
    // Set Updated Data
  }
  // Search For Client
  SearchForClient(event) {
    const that = this;
    that.clientName = event.target.value;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      that.getClients(that.clientName);
    }, 1000);
  }
  // Search For Client
  // Get Clients Function
  getClients(name: any) {
    if (name !== '') {
      this.ordersService.getClient(name).subscribe((clients: any) => {
        this.clientArray = clients;
      });
    }
  }
  // Get Clients Function
  // On Submit
  onSubmit() {
    this.orderForm.value.technician_id = +this.orderForm.value.technician_id;
    this.deleteEmpty();
    this.storeOrder(this.orderForm.value);
  }
  // On Submit
  // On Client Changed
  clientChanged(e) {
    this.client_values = this.client_value[0].id;
  }
  // On Client Changed
  // On Resource Changed
  resourceChanged(e) {
    this.getServices(e.value[0].id);
    this.resource_values = this.resource_value[0].id;
    this.service_value = [];
    this.subService_value = [];
    this.offers_value = [];
    // In Edit Mode
    if (this.editMode) {
      this.serviceConfig.placeholder = 'الخدمة الرئيسية';
      this.service_values = '';
      this.subServiceConfig.placeholder = 'الخدمة الفرعة';
      this.subService_values = '';
      this.offerConfig.placeholder = 'إسم العرض';
      this.offers_values = '';
    }
    // In Edit Mode
  }
  // On Resource Changed
  // On Main Service Changed
  serviceChanged(e) {
    this.service_id = e.value[0].id;
    this.subServiceArray = e.value[0].children;
    this.service_values = this.service_value[0].id;
    this.subService_value = [];
    this.offers_value = [];
    if (this.orderForm.value.order_date === '') {
    } else {
      this.getTechnicians(this.service_values, this.date_changed);
    }
    // In Edit Mode
    if (this.editMode) {
      this.subServiceConfig.placeholder = 'الخدمة الفرعة';
      this.subService_values = '';
      this.offerConfig.placeholder = 'إسم العرض';
      this.offers_values = '';
    }
    // In Edit Mode
  }
  // On Main Service Changed
  // On SubService Changed
  subServiceChanged(e) {
    this.subService_values = this.subService_value[0].id;
    this.offers_value = [];
    this.getOffers(this.resource_values, this.subService_values);
    // In Edit Mode
    if (this.editMode) {
      this.offerConfig.placeholder = 'إسم العرض';
      this.offers_values = '';
    }
    // In Edit Mode
  }
  // On SubService Changed
  // On Offer Changed
  offerChanged(e) {
    console.log(e.value[0].description);
    this.offers_values = this.offers_value[0].id;
    this.desc_selected = true;
    this.desc_data = e.value[0].description;
  }
  closePopup() {
    this.desc_selected = false;
  }
  // On Offer Changed
  // Get Services
  getServices(id) {
    this.ordersService.getServices(id).subscribe((services: any) => {
      this.serviceArray = services.data;
    });
  }
  // Get Services
  // Get offers
  getOffers(source_id, service_id) {
    this.ordersService.getOffers(source_id, service_id).subscribe((offers: any) => {
      console.log(offers);

      this.offerArray = offers.data;
    });
  }
  // Get offers
  // Get offers
  getTechnicians(service_id, order_date) {
    this.ordersService.getTechnicians(service_id, order_date).subscribe((technicians: any) => {
      this.technical = technicians.data;
      console.log('tech ', this.technical);
      this.show_technicians = true;
    });
  }
  // Get offers
  // Store offers
  storeOrder(data) {
    this.ordersService.storeOrder(data).subscribe(
      (orderStatus: any) => {
        swal(orderStatus.status, '', 'success');
        // this.orderForm.reset();
        this.getTechnicians(this.service_id, this.order_date);
      },
      error => {
        this.handlingError(error);
      }
    );
  }
  // Store offers
  dateChanged(e) {
    this.date_changed = e.target.value;
    if (this.service_values === undefined) {
    } else {
      console.log(this.service_values);

      console.log('from date ', this.service_values, this.date_changed);
      this.getTechnicians(this.service_values, this.date_changed);
    }
  }
  //  ############################# Start Update #############################
  // On Update
  onUpdate() {
    this.deleteEmpty();
    // &&&&&&&&&&&&&&&& Set Active To True Or False &&&&&&&&&&&&&&&&
    if (this.orderForm.value.active === 1) {
      this.orderForm.value.active = true;
    }
    if (this.orderForm.value.active === 0) {
      this.orderForm.value.active = false;
    }
    // &&&&&&&&&&&&&&&& Set Active To True Or False &&&&&&&&&&&&&&&&
    // Check For Date Start < End
    if (this.orderForm.value.start >= this.orderForm.value.end) {
      swal('Wrong Start & End Dates', '', 'error');
    } else {
      this.ordersService.updateOrder(this.updatedData.id, this.orderForm.value).subscribe(
        (updateOrder: any) => {
          swal(updateOrder.status, '', 'success');
          this.editSuccess.emit(true);
        },
        error => {
          this.handlingError(error);
        }
      );
    }
    // Check For Date Start < End
  }
  // On Update
  // Set Updated Data To Inputs
  setUpdatedData() {
    console.log('updated data ', this.updatedData);
    // Set Data For Client
    this.client_values = this.updatedData.client.id;
    this.client_update_name = this.updatedData.client.name;
    this.clientConfig.placeholder = this.client_update_name;
    // Set Data For Client
    // Set Data For Resource
    this.resource_values = this.updatedData.source.id;
    this.resource_update_name = this.updatedData.source.name;
    this.resourceConfig.placeholder = this.resource_update_name;
    // Set Data For Resource
    // Set Data For Services
    // Start Get Services
    this.ordersService.getServices(this.resource_values).subscribe((services: any) => {
      this.serviceArray = services.data;
      this.service_values = this.updatedData.service.parent;
      const index = this.serviceArray.findIndex(x => x.id === this.service_values);
      this.service_update_name = this.serviceArray[index].name;
      this.serviceConfig.placeholder = this.service_update_name;
      this.getTechnicians(this.service_values, this.updatedData.order_date);
    });
    // End Get Services
    // Set Data For Services
    // Set Data For SubService
    this.subService_values = this.updatedData.service.id;
    this.subService_update_name = this.updatedData.service.name;
    this.subServiceConfig.placeholder = this.subService_update_name;
    // Set Data For SubService
    // Set Data For offers
    this.offers_values = this.updatedData.offer.id;
    this.offers_update_name = this.updatedData.offer.name;
    this.offerConfig.placeholder = this.offers_update_name;
    // Set Data For offers
  }
  // Set Updated Data To Inputs
  // Close Edit Mode
  onFinishEdit() {
    this.editMode = false;
    this.editModeChange.emit(this.editMode);
  }
  // Close Edit Mode
  //  ############################# End Update #############################
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
    if (this.orderForm.value.offer_id === '') {
      delete this.orderForm.value.offer_id;
    }
    if (this.orderForm.value.details === '') {
      delete this.orderForm.value.details;
    }
  }
  //  ############################# Delete Empty Handling #############################
}
