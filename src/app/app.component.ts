import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './services/login.service';
import { RouteHelperService } from './services/route-helper.service';
import { Router } from '../../node_modules/@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'frontend';
  loggedInUser = false;
  checking;

  constructor(private loginService: LoginService, private router: Router, private routeHelper: RouteHelperService) { }

  ngOnInit() {
    this.changeActiveClass();
    this.checking = setInterval(() => {
      this.checkForLoggedInUser();
    }, 500);
  }

  ngOnDestroy() {
    if (this.checking) {
      clearInterval(this.checking);
    }
  }

  changeActiveClass(): void {
    const navbar = document.getElementById('nav-bar');
    const items = navbar.getElementsByClassName('nav-item');

    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener('click', function () {
        const current = document.getElementsByClassName(' active');
        current[0].className = current[0].className.replace(' active', '');
        this.className += ' active';
      });
    }
  }

  checkForLoggedInUser(): void {
    if (localStorage.getItem('currentUser') != null) {
      this.loggedInUser = true;
    } else {
      this.loggedInUser = false;
    }
  }

  rememberRoute() {
    const route = this.router.url;
    this.routeHelper.saveLastRoute(route);
  }

  logout(): void {
    this.loginService.logout();
    localStorage.removeItem('currentUser');
  }
}
