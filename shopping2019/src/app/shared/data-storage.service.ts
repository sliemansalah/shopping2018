import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class DataStorageService {
  public PageId = 1;
  public editState: any;
  constructor(private httpClient: HttpClient) { }
}
