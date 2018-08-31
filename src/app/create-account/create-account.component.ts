import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  submitted = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      'confirmpassword': new FormControl(null, [Validators.required])
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.error = '';
    this.matchingPasswords = true;
    this.email = this.form.value.email;
    this.password = this.form.value.password;
    this.confirmpassword = this.form.value.confirmpassword;
    if (this.checkPasswords(this.password, this.confirmpassword)) {
      const user: User = new User(this.email, this.password);
      this.loginService.create(user).subscribe(res => {
        this.accountCreation = true;
        this.form.reset();
      }, (err) => {
        if (err = 'EmailInUse') {
          this.accountCreation = false;
          this.error = 'E-mail is already in use.';
        }
      });
    }
  }

  get f() {
    return this.form.controls;
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
