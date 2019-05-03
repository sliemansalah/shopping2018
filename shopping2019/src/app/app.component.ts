import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { MainProvider } from './shared/headers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hit';

  ngOnInit() {

  }
}
