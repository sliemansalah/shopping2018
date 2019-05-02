import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '../resources.service';
import { MainProvider } from '../../../shared/headers';
declare let swal: any;
@Component({
  selector: 'app-resource-inner',
  templateUrl: './resource-inner.component.html',
  styleUrls: ['./resource-inner.component.css']
})
export class ResourceInnerComponent implements OnInit, OnDestroy {
  // Resource Array
  resource: any = [];
  // Resource Array
  // Base Link
  baseLink: any;
  // Base Link
  // Resource Img
  resourceImg: any;
  // Resource Img
  // Register Mode
  registerMode = false;
  // Register Mode
  // Resource Id
  resourceId: any;
  // Resource Id
  // Employees Array
  employees = [];
  // Employees Array
  // Edit Mode
  editMode = false;
  updatedEmployeeData;
  // Edit Mode
  // Out Register
  outRegister = false;
  // Out Register
  constructor(private router: ActivatedRoute, private resourcesServices: ResourceService, private mainProvider: MainProvider) {}
  ngOnDestroy() {
    this.registerMode = false;
    this.outRegister = false;
    this.registerMode = this.outRegister;
  }
  ngOnInit() {
    this.outRegister = this.resourcesServices.returnEmployee();
    this.registerMode = this.outRegister;
    // Add Employee From All Resources
    if (this.registerMode === true) {
      this.startRegister();
    }
    // Add Employee From All Resources
    // Get The Base Link
    this.baseLink = this.mainProvider.baseUrlSource;
    // Get The Base Link
    // Get Resource Id From Link
    this.router.params.subscribe((routerId: any) => {
      this.resourceId = routerId.id;
      this.resourcesServices.getResource(routerId.id).subscribe((resource: any) => {
        this.resource = resource.data;
        this.resourceImg = this.baseLink + 'img/' + this.resource.logo;
      });
    });
    // Get Resource Id From Link

    // Fetch Employees
    this.fetchEmployees();
    // Fetch Employees
  }
  // Start Register
  startRegister() {
    this.registerMode = true;
  }
  // Start Register
  // End Register
  registerModeFinish(registerMode) {
    this.registerMode = false;
  }
  // End Register
  // Fetch Employees List
  fetchEmployees() {
    this.resourcesServices.getEmployees(this.resourceId).subscribe((employees: any) => {
      this.employees = employees.data;
    });
  }
  // Fetch Employees List
  // Register Success
  registerSuccess(registerSuccess) {
    if (registerSuccess === true) {
      // Fetch Data After Update
      this.fetchEmployees();
      this.registerMode = false;
      this.editMode = false;
      // Fetch Data After Update
    }
  }
  // Register Success
  // Delete Employee
  deleteEmployee(id) {
    this.resourcesServices.deleteEmployee(id, this.resourceId).subscribe((deleteEmployee: any) => {
      // Fetch Data Again
      this.fetchEmployees();
      // Fetch Data Again
      swal('Deleted Success', '', 'success');
    });
  }
  // Delete Employee
  // Update Employee
  updateEmployee(id) {
    this.editMode = true;
    const index = this.employees.findIndex(x => x.id === id);
    this.updatedEmployeeData = this.employees[index];
  }
  // Update Employee
  // Finish Update
  editModeFinish(editMode) {
    this.editMode = editMode;
  }
  // Finish Update
  // Update Success
  editSuccess(editSuccess) {
    if (editSuccess === 'success') {
      swal('Updated Success', '', 'success');
      // Fetch Data After Update
      this.fetchEmployees();
      this.editMode = false;
      this.registerMode = false;
      // Fetch Data After Update
    }
  }
  // Update Success
}
