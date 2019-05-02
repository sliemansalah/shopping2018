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
    if (localStorage.getItem('currentUser')) {
      const data = JSON.parse(localStorage.getItem('currentUser')).access_token;
      MainProvider.token = data;
    }
    $(document).ready(function() {
      $('#m_aside_left_offcanvas_toggle').click(function() {
        $('#m_aside_right').toggleClass('right-zero');
      });
    });
  }
}
