import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
declare var c3: any;
declare var d3: any;
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  maingroup_count = 0; subgroup_count = 0; company_count = 0;
  unit_count = 0; product_count = 0; load = false;
  constructor(private serv: ServicesService) { }

  ngAfterViewInit() {
    this.load_data();
  }
  load_data() {
    this.serv.getMaingroups().subscribe(res => {
      this.maingroup_count = res['maingroups'].length;
    })
    this.serv.getsubgroups().subscribe(res => {
      this.subgroup_count = res['Subgroups'].length;
    })
    this.serv.getcompany().subscribe(res => {
      this.company_count = res['company'].length;
    })
    this.serv.getunit().subscribe(res => {
      this.unit_count = res['Unit'].length;
    })
    this.serv.getProducts().subscribe(res => {
      this.product_count = res['Products'].length;
      this.load = true;
    })
  }
  ngOnInit() {

  }
}
