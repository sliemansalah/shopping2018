import { Injectable, OnInit } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
@Injectable()
export class MainProvider {
  public static readonly baseUrl: string = "";
  public static token = "";
  public readonly baseUrlSource: string = "http://192.168.1.110:8000/";
  public static getHttpHeader(): HttpHeaders {
    const header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      "Content-Type": "application/json"
    });
    return header;
  }
}
