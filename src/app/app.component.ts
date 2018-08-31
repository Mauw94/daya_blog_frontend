import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { CheckLoginUserService } from './services/check-login-user';
import { RouteHelperService } from './services/route-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'frontend';
  user_is_logged_in = false;
  checking_user_log_in;

  constructor(private loginService: LoginService, private router: Router,
    private checkLoginStatus: CheckLoginUserService,
    private routeSnapShot: RouteHelperService) { }

  ngOnInit() {
    this.changeActiveClass();
    setInterval(() => {
      this.checking_user_log_in = this.checkLoginStatus.checkIfUserIsLoggedIn();
      this.user_is_logged_in = this.checkLoginStatus.returnCheckLoginStatus();
    }, 100);
  }

  ngOnDestroy() {
    if (this.checking_user_log_in) {
      clearInterval(this.checking_user_log_in);
    }
  }

  saveRouteSnapshot(): void {
    this.routeSnapShot.saveRoute(this.routeSnapShot.getCurrentRoute());
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
}
