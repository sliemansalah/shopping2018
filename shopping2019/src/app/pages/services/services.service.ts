import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MainProvider } from "../../shared/headers";

@Injectable()
export class ServicesService {
  constructor(private httpClient: HttpClient) {}
  // Store Main Service
  storeMainService(service) {
    return this.httpClient.post(MainProvider.baseUrl + "services.json", service, { headers: MainProvider.getHttpHeader() });
  }
  // Store Main Service
  // Get Main Service
  getMainService() {
    return this.httpClient.get(MainProvider.baseUrl + "services.json", { headers: MainProvider.getHttpHeader() });
  }
  // Get Main Service
  // Delete Service
  deleteService(id) {
    return this.httpClient.delete(MainProvider.baseUrl + "services/" + id, { headers: MainProvider.getHttpHeader() });
  }
  // Delete Service
  // Update Main Service
  updateMainService(id, data) {
    return this.httpClient.put(MainProvider.baseUrl + "services/" + id, data, { headers: MainProvider.getHttpHeader() });
  }
  // Update Main Service
}
