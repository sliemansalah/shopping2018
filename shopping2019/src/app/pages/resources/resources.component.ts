import { Component, OnInit } from '@angular/core';
import { ResourceService } from './resources.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  // Resources Array
  resources = [];
  // Resources Array
  // Edit Resourcs
  editMode = false;
  updatedResourceData: any;
  // Edit Resourcs
  // Add Employee
  addEmpolyeeOut = false;
  // Add Employee
  constructor(private resourcesService: ResourceService) {}

  ngOnInit() {
    // Init Add Employee
    this.resourcesService.addEmployee(this.addEmpolyeeOut);
    // Init Add Employee
    // Get Resources
    this.fetchResources();
    // Get Resources
  }
  // Fetch Resources
  fetchResources() {
    this.resourcesService.getResources().subscribe((resources: any) => {
      this.resources = resources.data;
    });
  }
  // Fetch Resources
  // Delete Resource
  deleteResource(resourceId) {
    this.resourcesService.deleteResource(resourceId).subscribe(deleteResourceResponse => {
      // Fetch Data After Delete
      this.fetchResources();
      // Fetch Data After Delete
    });
  }
  // Delete Resource
  // Update Resource
  updateResource(id) {
    this.editMode = true;
    const index = this.resources.findIndex(x => x.id === id);
    this.updatedResourceData = this.resources[index];
  }
  editModeChange(state) {
    this.editMode = state;
  }
  editSuccess(editSuccess) {
    if (editSuccess === true) {
      // Fetch Data After Update
      this.fetchResources();
      this.editMode = false;
      // Fetch Data After Update
    }
  }
  // Update Resource
  // Add Employee
  addEmployee() {
    this.addEmpolyeeOut = true;
    this.resourcesService.addEmployee(this.addEmpolyeeOut);
  }
  // Add Employee
}
