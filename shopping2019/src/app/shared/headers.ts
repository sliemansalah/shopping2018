import { Injectable, OnInit } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { AuthService } from "../guards/auth.service";
@Injectable()
export class MainProvider {
  // public static readonly baseUrl: string = "https://fuel-situation.firebaseio.com/";
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
