import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../guards/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}
  login(email, password) {
    this.authService.login(email, password);
  }
}
