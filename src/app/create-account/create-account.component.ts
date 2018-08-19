import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { User } from '../models/user';

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

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'confirmpassword': new FormControl(null, [Validators.required])
    });
  }

  create(form): void {
    this.email = form.value.email;
    this.password = form.value.password;
    this.confirmpassword = form.value.confirmpassword;

    console.log(this.email + '' + this.password + '' + this.confirmpassword);
  }

}
