import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RouteHelperService } from '../services/route-helper.service';
import { LoginService } from '../services/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CheckLoginUserService } from '../services/check-login-user';
import { EmailSaverService } from '../services/email-saver.service';

@Component({
  selector: 'app-subscribe-to-blog',
  templateUrl: './subscribe-to-blog.component.html',
  styleUrls: ['./subscribe-to-blog.component.css']
})
export class SubscribeToBlogComponent implements OnInit, OnDestroy {

  form: FormGroup;
  user_is_logged_in = false;
  checking;
  success: String = '';

  constructor(private router: Router, private routeHelper: RouteHelperService,
    private loginService: LoginService, private checkLoginStatus: CheckLoginUserService,
    private emailSaver: EmailSaverService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required])
    });
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

  saveEmail(form) {
    const email = form.value.email;
    this.emailSaver.addEmail(email);
    const notEmptyList = this.emailSaver.checkIfTheEmailListHasItems();
    if (notEmptyList) {
      this.success = 'Subscribed successfully.';
      form.reset();
    }
  }

  rememberRoute() {
    const route = this.router.url;
    this.routeHelper.saveLastRoute(route);
  }

  logout() {
    this.loginService.logout();
    localStorage.removeItem('currentUser');
  }
}
