import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String = '';
  password: String = '';
  form: FormGroup;
  error: String = '';

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  login(form): void {
    this.email = form.value.email;
    this.password = form.value.password;
    const user: User = new User(this.email, this.password);
    this.loginService.login(user).subscribe(result => {
      if (result === true) {
        this.error = '';
      }
    }, (err) => {
      if (err = 'Unauthorized') {
        this.error = 'E-mail or password is incorrect.';
        console.log('E-mail or password is incorrect.');
      }
    });
  }


}
