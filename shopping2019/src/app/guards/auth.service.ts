import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MainProvider } from '../shared/headers';
import { Router } from '@angular/router';
// Sweet Alert
declare let swal: any;
// Sweet Alert

@Injectable()
export class AuthService implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit() {
    console.log('here');
  }
  login(email: string, password: string) {
    return this.http
      .post<any>(
        MainProvider.baseUrl + 'tkn', //
        { email: email, password: password },
        { headers: MainProvider.getHttpHeader() }
      )
      .subscribe(
        user => {
          MainProvider.token = user.access_token;
          // login successful if there's a jwt token in the response
          if (user && user.access_token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigate(['/']);
            // Pass Token To Header

            // Pass Token To Header
          }

          return user;
        },
        error => {
          swal(error.error.message, '', 'error');
        }
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
