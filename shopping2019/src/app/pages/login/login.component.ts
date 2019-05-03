import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) { }
  alert_show = false; email; password;
  ngOnInit() { }
  login() {
    if (this.email.toString() == 'admin@admin.com' && this.password == '123456') {
      localStorage.setItem("login", "true");
      this.router.navigate(['home'])
    } else {
      this.alert_show = true;
    }

  }
  closeAlert() {
    this.alert_show = false;
  }
}
