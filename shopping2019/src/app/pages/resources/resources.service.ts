import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainProvider } from '../../shared/headers';

@Injectable()
export class ResourceService {
  // Employee State
  employeeAddState = false;
  // Employee State
  constructor(private httpClient: HttpClient) {}
  // Get Countries
  getCountries() {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'countries', { headers: MainProvider.getHttpHeader() });
  }
  // Get Countries
  // Get Cities
  getCities(countryId) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'countries/' + countryId + '/cities', { headers: MainProvider.getHttpHeader() });
  }
  // Get Cities
  // Get Cities
  getTypes() {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'lookup/source-types', { headers: MainProvider.getHttpHeader() });
  }
  // Get Cities
  // Store Resource
  storeResource(resource: any) {
    return this.httpClient.post(MainProvider.baseUrl + 'resources', resource, { headers: MainProvider.getHttpHeader() });
  }
  // Store Resource
  // Get Cities
  getResources() {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'resources', { headers: MainProvider.getHttpHeader() });
  }
  // Get Cities
  // Delete Resource
  deleteResource(resourceId) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.delete(MainProvider.baseUrl + 'resources/' + resourceId, { headers: MainProvider.getHttpHeader() });
  }
  // Delete Resource
  // Update Resource
  updateResource(resource, id) {
    return this.httpClient.put(MainProvider.baseUrl + 'resources/' + id, resource, { headers: MainProvider.getHttpHeader() });
  }
  // Update Resource
  // Get Resource For Resource Profile
  getResource(resourceId) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'resources/' + resourceId, { headers: MainProvider.getHttpHeader() });
  }
  // Get Resource For Resource Profile
  // Store Employee
  storeEmployee(resourceId: any, employee: any) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post(MainProvider.baseUrl + 'resources/' + resourceId + '/employees', employee, { headers: MainProvider.getHttpHeader() });
  }
  // Store Employee
  // Get Employees For Resource
  getEmployees(resourceId: any) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'resources/' + resourceId + '/employees', { headers: MainProvider.getHttpHeader() });
  }
  // Get Employees For Resource
  // Add Employee From All Resources
  addEmployee(state) {
    this.employeeAddState = state;
  }
  returnEmployee() {
    return this.employeeAddState;
  }
  // Add Employee From All Resources
  // Delete Employee
  deleteEmployee(employeeId, resourceId) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.delete(MainProvider.baseUrl + 'resources/' + resourceId + '/employees/' + employeeId, { headers: MainProvider.getHttpHeader() });
  }
  // Delete Employee
  // Update Employee
  updateEmployee(employeeId, resourceId, employeeData) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.put(MainProvider.baseUrl + 'resources/' + resourceId + '/employees/' + employeeId, employeeData, { headers: MainProvider.getHttpHeader() });
  }
  // Update Employee
}
