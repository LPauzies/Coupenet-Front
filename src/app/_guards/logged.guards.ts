import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services';

@Injectable({ providedIn: 'root' })
export class LoggedGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const currentUser = this.authenticationService.currentUserValue;
      // authorized so return true
      if (currentUser == null) {
        return true;
      } else if (currentUser.status == 'root') {
        this.router.navigate(['/root']);
        return false;
      } else if (currentUser.status != 'root') {
        this.router.navigate(['/home']);
        return false;
      }
      this.router.navigate(['/login']);
      return false;
    }
}
