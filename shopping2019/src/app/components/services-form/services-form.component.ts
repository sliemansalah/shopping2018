import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ServicesService } from "../../pages/services/services.service";
import * as $ from "jquery";
import { trigger, style, animate, transition } from "@angular/animations";

// Sweet Alert
declare let swal: any;
// Sweet Alert

@Component({
  selector: "app-services-form",
  templateUrl: "./services-form.component.html",
  styleUrls: ["./services-form.component.css"],
  animations: [
    trigger("enterAnimation", [
      // tslint:disable-next-line:max-line-length
      transition(":enter", [style({ transform: "translateX(50%)", opacity: 0 }), animate("300ms", style({ transform: "translateX(0)", opacity: 1 }))]),
      // tslint:disable-next-line:max-line-length
      transition(":leave", [style({ transform: "translateX(0)", opacity: 1 }), animate("300ms", style({ transform: "translateX(50%)", opacity: 0 }))])
    ])
  ]
})
export class ServicesFormComponent implements OnInit {
  // Edit Mode Init
  editMainService = false;
  editSubService = false;
  // Edit Mode Init
  // Edit Main Service Temp Data
  mainTempId;
  mainTempName;
  mainTempActive;
  // Edit Main Service Temp Data
  // Active Init Value
  binding = false;
  bindings = false;
  // Active Init Value
  // Catch Main Service Form
  @ViewChild("mainService") mainServiceForm: NgForm;
  // Catch Main Service Form
  // Catch Sub Service Form
  @ViewChild("subService") subServiceForm: NgForm;
  // Catch Sub Service Form
  // Service Config
  serviceConfig = {
    displayKey: "name",
    search: true,
    placeholder: "الخدمة الرئيسية"
  };
  // Service Config
  // Service Array
  serviceArray = [];
  // Service Array
  // Select Validation
  selectValidation;
  // Select Validation
  // Service  Id
  serviceId;
  // Service  Id
  // Edit Main Service For Sub Service Edit
  editMainSub = false;
  subServiceData;
  mainServiceData;
  // Edit Main Service For Sub Service Edit

  constructor(private servicesService: ServicesService) {}

  ngOnInit() {
    // Get Services
    this.getService();
    // Get Services
  }
  rotatePlus(id) {
    $("#plus" + id).toggleClass("rotatePlus");
  }
  // Table Sub Service Open
  toggleSubMenu(id) {
    $(document).ready(function() {
      $("#" + id)
        .slideToggle()
        .parents(".m-datatable__body")
        .siblings()
        .children(".SubServiceContainer")
        .slideUp();
    });
  }
  // Table Sub Service Open
  // Get Services
  getService() {
    this.servicesService.getMainService().subscribe((services: any) => {
      console.log(services);
      // this.serviceArray = services;
      Object.keys(services).forEach(id => {
        console.log(id, services[id]);
        this.serviceArray.push({ id: id, ...services[id] });
      });
      console.log(this.serviceArray);
    });
  }
  // Get Services
  // Submit Main Service
  onSubmitMainService() {
    this.servicesService.storeMainService(this.mainServiceForm.value).subscribe(
      (storeMainService: any) => {
        swal("Adding Main Service " + storeMainService.status, "", "success");
        this.mainServiceForm.reset();
        // Get Services
        this.getService();
        // Get Services
      },
      error => {
        this.handlingError(error);
      }
    );
  }
  // Submit Main Service
  // Submit Sub Service
  onSubmitSubService() {
    this.subServiceForm.value.parent = this.serviceId;
    delete this.subServiceForm.value.select;
    console.log(this.subServiceForm.value, this.serviceId);
    this.servicesService.storeMainService(this.subServiceForm.value).subscribe(
      (storeSubService: any) => {
        swal("Adding Main Service " + storeSubService.status, "", "success");
        this.subServiceForm.reset();

        // Get Services
        this.getService();
        // Get Services
      },
      error => {
        this.handlingError(error);
      }
    );
  }
  // Submit Sub Service
  // Service Select Change
  serviceChanged(event) {
    if (event.isTrusted !== true && event.value.length !== 0) {
      this.selectValidation = event.value[0].name;
      this.serviceId = event.value[0].id;
    }
  }
  // Service Select Change
  // Delete Service
  deleteService(id) {
    this.servicesService.deleteService(id).subscribe((deleteService: any) => {
      swal("Delete Service " + deleteService.status, "", "success");
      // Get Services
      this.getService();
      // Get Services
    });
  }
  // Delete Service
  // Update Service
  updateService(serviceId, serviceName, serviceActive) {
    this.editMainService = true;
    this.mainTempId = serviceId;
    this.mainTempName = serviceName;
    this.mainTempActive = serviceActive;
  }
  // Update Service
  // Submit Main Service Update
  submitMainUpdate(form) {
    if (form.value.active === 0) {
      form.value.active = false;
    }
    if (form.value.active === 1) {
      form.value.active = true;
    }
    console.log(form.value, this.mainTempId);
    this.servicesService.updateMainService(this.mainTempId, form.value).subscribe(
      (updateData: any) => {
        swal("Update Service " + updateData.status, "", "success");
        // Get Services
        this.getService();
        // Get Services
        this.editMainService = false;
        this.editMainSub = false;
      },
      error => {
        this.handlingError(error);
      }
    );
  }
  // Submit Main Service Update
  // Update Sub Service
  updateSubService(mainServiceData, subServiceData) {
    this.editSubService = true;
    this.subServiceData = subServiceData;
    this.mainServiceData = mainServiceData;
    console.log(mainServiceData, subServiceData);
  }
  // Update Sub Service
  // Submit Sub Service Update
  submitSubUpdate(form) {
    if (form.value.active === 0) {
      form.value.active = false;
    }
    if (form.value.active === 1) {
      form.value.active = true;
    }
    if (form.value.editMainSub === false) {
      form.value.parent = this.mainServiceData.id;
    } else {
      form.value.parent = this.serviceId;
    }
    delete form.value.editMainSub;
    console.log(this.subServiceData.id, form.value);
    this.servicesService.updateMainService(this.subServiceData.id, form.value).subscribe(
      (updateData: any) => {
        swal("Update Service " + updateData.status, "", "success");
        // Get Services
        this.getService();
        // Get Services
        this.editSubService = false;
        this.editMainSub = false;
      },
      error => {
        this.handlingError(error);
      }
    );
  }
  // Submit Sub Service Update
  //  ############################# Error Handling #############################
  handlingError(error) {
    Object.keys(error.error.errors).forEach(function(key) {
      if (key) {
        swal(error.error.errors[key][0], "", "error");
      }
    });
  }
  //  ############################# Error Handling #############################
}
