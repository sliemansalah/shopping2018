import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class RoleGuard implements CanActivate {
  role = 'super-admin';
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.data.accessRoles === this.role) {
      return true;
    } else {
      this.router.navigate(['404']);
      return false;
    }
    // Check For Roles
  }
}
