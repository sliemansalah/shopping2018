import { Component, OnInit, Input, EventEmitter, Output, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResourceService } from '../../pages/resources/resources.service';

@Component({
  selector: 'app-resource-employee-form',
  templateUrl: './resource-employee-form.component.html',
  styleUrls: ['./resource-employee-form.component.css']
})
export class ResourceEmployeeFormComponent implements OnInit, OnDestroy {
  // Register Mode
  @Input() registerMode: any = false;
  @Output() registerModeFinish = new EventEmitter();
  // Register Mode
  // Resource Id
  @Input() resourceId: any;
  // Resource Id
  // Catch Form Data
  @ViewChild('f') employeeForm: NgForm;
  // Catch Form Data
  // Edit Success
  @Output() registerSuccess = new EventEmitter();
  // Edit Success
  // Edit Mode
  @Input() editMode: any;
  @Input() updatedEmployeeData: any;
  @Output() editModeFinish = new EventEmitter();
  @Output() editSuccess = new EventEmitter();
  // Edit Mode
  constructor(private resourcesService: ResourceService) {}
  // Check For Numbers For Mobile
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  // Check For Numbers For Mobile
  ngOnInit() {}
  ngOnDestroy() {
    this.registerMode = false;
  }
  // Register Finish
  onRegisterFinish() {
    this.registerMode = false;
    this.registerModeFinish.emit(this.registerMode);
  }
  // Register Finish
  // On Register Submit
  onSubmit() {
    this.resourcesService.storeEmployee(this.resourceId, this.employeeForm.value).subscribe((register: any) => {
      this.registerSuccess.emit(true);
    });
  }
  // On Register Submit
  // On Start Update
  onUpdate() {
    // tslint:disable-next-line:max-line-length
    this.resourcesService.updateEmployee(this.updatedEmployeeData.id, this.resourceId, this.employeeForm.value).subscribe((updateEmployee: any) => {
      this.editSuccess.emit(updateEmployee.status);
    });
  }
  // On Start Update
  // On Edit Finish
  onFinishEdit() {
    this.editMode = false;
    this.editModeFinish.emit(this.editMode);
  }
  // On Edit Finish
}
