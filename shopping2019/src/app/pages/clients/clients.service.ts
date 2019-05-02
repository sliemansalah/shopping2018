import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainProvider } from '../../shared/headers';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClientsService {
  // Active PAge Id
  activePageId = 1;
  // Active PAge Id
  constructor(private httpClient: HttpClient) {}
  // Get Gender Type
  getGender() {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'lookup/gender-types', { headers: MainProvider.getHttpHeader() });
  }
  // Get Gender Type
  // Get Client Type
  getClientType() {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'lookup/client-types', { headers: MainProvider.getHttpHeader() });
  }
  // Get Client Type
  // Get Home Type
  getHomeType() {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'lookup/home-types', { headers: MainProvider.getHttpHeader() });
  }
  // Get Home Type
  // Get Air Conditional Type
  getAirConditionalType() {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'lookup/airconditioner-types', { headers: MainProvider.getHttpHeader() });
  }
  // Get Air Conditional Type
  // Get Air Contract Type
  getContractType() {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'lookup/home-contract-types', { headers: MainProvider.getHttpHeader() });
  }
  // Get Air Contract Type
  // Sotre Client
  storeClient(client) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post(MainProvider.baseUrl + 'clients', client, { headers: MainProvider.getHttpHeader() });
  }
  // Sotre Client
  // Get All Clients
  getClients(id) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'clients?page= ' + id, { headers: MainProvider.getHttpHeader() });
  }
  // Get All Clients
  // Delete Client
  deleteClient(id) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.delete(MainProvider.baseUrl + 'clients/' + id, { headers: MainProvider.getHttpHeader() });
  }
  // Delete Client
  // Get Active PAge Id
  getActivePageId(id) {
    this.activePageId = id;
  }
  returnActivePageId() {
    return this.activePageId;
  }
  // Get Active PAge Id
  // Get Client To Update
  getClient(id) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'clients/' + id, { headers: MainProvider.getHttpHeader() });
  }
  // Get Client To Update
  // Update Client
  updateClient(client, id) {
    return this.httpClient.put(MainProvider.baseUrl + 'clients/' + id, client, { headers: MainProvider.getHttpHeader() });
  }
  // Update Client
}
