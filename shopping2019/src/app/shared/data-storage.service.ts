import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Technical } from './technical.model';
import { MainProvider } from './headers';

@Injectable()
// @Injectable({ providedIn: 'root' })
export class DataStorageService {
  public PageId = 1;
  public editState: any;
  constructor(private httpClient: HttpClient) {}
  // storeTechnical(technical: Technical) {
  //   return this.httpClient.post(MainProvider.baseUrl + 'technicians', technical, { headers: MainProvider.getHttpHeader() });
  // }
  // updateTechnical(technical: Technical, id) {
  //   return this.httpClient.put(MainProvider.baseUrl + 'technicians/' + id, technical, { headers: MainProvider.getHttpHeader() });
  // }
  // getServices() {
  //   // tslint:disable-next-line:max-line-length
  //   return this.httpClient.get(MainProvider.baseUrl + 'services/active', { headers: MainProvider.getHttpHeader() });
  // }
  // getTechnicians(id) {
  //   // tslint:disable-next-line:max-line-length
  //   return this.httpClient.get(MainProvider.baseUrl + 'technicians?page=' + id, { headers: MainProvider.getHttpHeader() });
  // }
  // currentPageId(i) {
  //   this.PageId = i;
  // }
  // deleteTechnical(id) {
  //   return this.httpClient.delete(MainProvider.baseUrl + 'technicians/' + id, { headers: MainProvider.getHttpHeader() });
  // }
  // closeEditMode(editState) {
  //   this.editState = editState;
  // }
}
