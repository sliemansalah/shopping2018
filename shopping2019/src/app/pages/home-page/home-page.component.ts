import { Component, OnInit } from '@angular/core';
declare var c3: any;
declare var d3: any;
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    const chart: any = c3.generate({
      bindto: d3.select('.chart'),
      data: {
        columns: [['data1', 30, 200, 100, 400, 150, 250], ['data2', 50, 20, 10, 40, 15, 25]]
      }
    });
  }
}
