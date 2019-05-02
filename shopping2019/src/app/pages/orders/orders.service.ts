import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainProvider } from '../../shared/headers';

@Injectable()
export class OrdersService {
  constructor(private httpClient: HttpClient) {}
  // Get Client List
  getClient(name) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'clients/active', { headers: MainProvider.getHttpHeader(), params: { name: name } });
  }
  // Get Client List
  // Get Resources
  getResources() {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'resources/active', { headers: MainProvider.getHttpHeader() });
  }
  // Get Resources
  // Get Services
  getServices(id) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'services/source/' + id + '/active', { headers: MainProvider.getHttpHeader() });
  }
  // Get Services
  // Get offers
  getOffers(source_id, service_id) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'offers/active', { headers: MainProvider.getHttpHeader(), params: { source_id: source_id, service_id: service_id } });
  }
  // Get offers
  // Get Technicians
  getTechnicians(service_id, order_date) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'orders/technicians', { headers: MainProvider.getHttpHeader(), params: { service_id: service_id, order_date: order_date } });
  }
  // Get Technicians
  // Store Orders
  storeOrder(data) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post(MainProvider.baseUrl + 'orders', data, { headers: MainProvider.getHttpHeader() });
  }
  // Store Orders
  // Get All Orders
  getOrders(id, status, dateSearch) {
    console.log('s ', dateSearch);
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'orders?page= ' + id, { headers: MainProvider.getHttpHeader(), params: { status: status, order_date: dateSearch } });
  }
  // Get All Orders
  // Get Technicians
  getStatus() {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'lookup/order-status-types', { headers: MainProvider.getHttpHeader() });
  }
  // Get Technicians
  // Delete Order
  deleteOrder(id) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.delete(MainProvider.baseUrl + 'orders/' + id, { headers: MainProvider.getHttpHeader() });
  }
  // Delete Order
  // Store Orders
  updateOrder(id, data) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.put(MainProvider.baseUrl + 'orders/' + id, data, { headers: MainProvider.getHttpHeader() });
  }
  // Store Orders
}
