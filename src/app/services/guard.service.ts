import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { RouteHelperService } from './route-helper.service';

@Injectable()
export class AuthGuard implements CanActivate {

    route: String = null;

    constructor(private authService: AuthService, private routeSnapShot: RouteHelperService,
        private router: Router) { }

    canActivate() {
        return this.checkLogin();
    }

    checkLogin() {
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            this.route = this.routeSnapShot.getSavedRoute();
            this.router.navigate([this.route]);
            return false;
        }
    }
}
