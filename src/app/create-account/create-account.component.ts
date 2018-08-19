import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  form: FormGroup;
  email: String = '';
  password: String = '';
  confirmpassword: String = '';
  matchingPasswords = false;
  accountCreation = false;
  error: String = '';

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'confirmpassword': new FormControl(null, [Validators.required])
    });
  }

  create(form): void {
    this.error = '';
    this.matchingPasswords = true;
    this.email = form.value.email;
    this.password = form.value.password;
    this.confirmpassword = form.value.confirmpassword;
    if (this.checkPasswords(this.password, this.confirmpassword)) {
      const user: User = new User(this.email, this.password);
      this.loginService.create(user).subscribe(res => {
        this.accountCreation = true;
        form.reset();
      }, (err) => {
        if (err = 'EmailInUse') {
          this.accountCreation = false;
          this.error = 'E-mail is already in use.';
        }
      });
    }
    console.log(this.email + '' + this.password + '' + this.confirmpassword);
  }

  private checkPasswords(pass, confirmpassword) {
    if (pass !== confirmpassword) {
      this.matchingPasswords = false;
      return false;
    } else {
      this.matchingPasswords = true;
      return true;
    }
  }

}
