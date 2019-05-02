import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { DataStorageService } from '../../shared/data-storage.service';
// Sweet Alert
declare let swal: any;
// Sweet Alert
@Component({
  selector: 'app-technical-form',
  templateUrl: './technical-form.component.html',
  styleUrls: ['./technical-form.component.css']
})
export class TechnicalFormComponent implements OnInit {
  @ViewChild('f') addNewTechnical: NgForm;
  @Output() editModeChange = new EventEmitter();
  @Output() editSuccess = new EventEmitter();
  @Input() updatedId: any;
  submitted = false;
  services = [];
  binding = false;
  change_password = false;
  inAddTechnical: boolean;
  inAllTechnical: boolean;
  editModeForm = true;
  technicalImage = '';

  constructor(private dataStorageService: DataStorageService, private router: Router) {}
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
    this.dataStorageService.getServices().subscribe((response: any) => {
      this.services = response;
    });
    this.inAddTechnical = this.router.url.includes('add-technical');

    this.inAllTechnical = this.router.url.includes('all-technicians');
  }
  onSubmit() {
    this.deleteEmpty();
    this.dataStorageService.storeTechnical(this.addNewTechnical.value).subscribe(
      (response: any) => {
        swal('Updated ' + response.status, '', 'success');
        this.addNewTechnical.reset();
      },
      error => {
        this.handlingError(error);
      }
    );

    this.addNewTechnical.reset();
  }
  onUpdate() {
    // &&&&&&&&&&&&&&&& Set Active To True Or False &&&&&&&&&&&&&&&&
    if (this.addNewTechnical.value.active === 1) {
      this.addNewTechnical.value.active = true;
    }
    if (this.addNewTechnical.value.active === 0) {
      this.addNewTechnical.value.active = false;
    }
    // &&&&&&&&&&&&&&&& Set Active To True Or False &&&&&&&&&&&&&&&&
    this.deleteEmpty();
    this.dataStorageService.updateTechnical(this.addNewTechnical.value, this.updatedId.id).subscribe(
      (data: any) => {
        this.editSuccess.emit(true);
        swal('Updated ' + data.status, '', 'success');
      },
      error => {
        this.handlingError(error);
      }
    );
  }
  onFinishEdit() {
    this.editModeForm = false;
    this.editModeChange.emit(this.editModeForm);
  }
  // Handle Image Base64
  onFileChanges(e) {
    this.technicalImage = e[0].base64;
  }
  // Handle Image Base64
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
    if (this.addNewTechnical.value.image === '') {
      delete this.addNewTechnical.value.image;
    }
  }
  //  ############################# Delete Empty Handling #############################
}
