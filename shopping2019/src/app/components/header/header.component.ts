import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../guards/auth.service';
import { trigger, style, animate, transition } from '@angular/animations';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('enterAnimation', [
      // tslint:disable-next-line:max-line-length
      transition(':enter', [style({ transform: 'translateY(10%)', opacity: 0 }), animate('200ms', style({ transform: 'translateY(0)', opacity: 1 }))]),
      // tslint:disable-next-line:max-line-length
      transition(':leave', [style({ transform: 'translateY(0)', opacity: 1 }), animate('200ms', style({ transform: 'translateY(10%)', opacity: 0 }))])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  imageMenu = false;
  noteMenu = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    $(document).ready(function () {
      // Header In Mobile
      $('#m_aside_header_topbar_mobile_toggle').click(function () {
        $('#m_header_topbar').toggleClass('margin-top-zero');
      });
      // Header In Mobile
    });
  }

  logOut() {
    this.authService.logout();
  }
  closeSlides() {
    console.log('out');
    if (this.imageMenu === true) {
      console.log('here');
    }
  }
}
