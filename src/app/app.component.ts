import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { CheckLoginUserService } from './services/check-login-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'frontend';
  user_is_logged_in = false;
  checking;

  constructor(private loginService: LoginService, private router: Router,
    private checkLoginStatus: CheckLoginUserService) { }

  ngOnInit() {
    this.changeActiveClass();
    setInterval(() => {
      this.checking = this.checkLoginStatus.checkIfUserIsLoggedIn();
      this.user_is_logged_in = this.checkLoginStatus.returnCheckLoginStatus();
    }, 100);
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
}
