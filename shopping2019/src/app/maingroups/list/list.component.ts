import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../../../src/app/pages/services/services.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private service: ServicesService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.loadMaingroups();
  }
  predicateBy(prop) {
    return function (a, b) {
      if (a[prop] < b[prop]) {
        return 1;
      } else if (a[prop] > b[prop]) {
        return -1;
      }
      return 0;
    }
  }
  source; maingroups = []; results; data_length; count; spinner = false;
  loadMaingroups() {
    this.spinner = true;
    this.service.getMaingroups().subscribe(result => {
      this.source = result['maingroups'];
      // console.log(this.source);
      this.maingroups.push(result['maingroups']);
      this.results = result['maingroups'];
      this.results.sort(this.predicateBy("id"));
      this.data_length = this.results.length;
      console.log(this.results);
      this.count = this.results.length;
      this.spinner = false;
    })
  }

}
