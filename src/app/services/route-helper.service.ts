import { Injectable } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteHelperService {

  route: String = '';

  constructor(private router: Router) { }

  getCurrentRoute() {
    return this.router.url;
  }

  saveLastRoute(route: String) {
    this.route = route;
  }

  getSavedRoute(): String {
    return this.route;
  }
}
