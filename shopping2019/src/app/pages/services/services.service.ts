import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable()
export class ServicesService {
  httpOptions: { headers: HttpHeaders; };
  private url = 'https://bitymall.com/api/';
  constructor(private http: HttpClient) {
  }
  getProducts() {
    return this.http.get(this.url + "product", this.httpOptions).map((data) => {
      return data;
    });
  }
  getcompany() {
    return this.http.get(this.url + "company", this.httpOptions).map((data) => {
      return data;
    });
  }
  getunit() {
    return this.http.get(this.url + "unit", this.httpOptions).map((data) => {
      return data;
    });
  }
  getMaingroups() {
    return this.http.get(this.url + "maingroup", this.httpOptions).map((data) => {
      return data;
    });
  }
  getsubgroups() {
    return this.http.get(this.url + "subgroup", this.httpOptions).map((data) => {
      return data;
    });
  }
}
