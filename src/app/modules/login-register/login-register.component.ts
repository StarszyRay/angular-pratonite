import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {

  loginEmail = new FormControl('', [Validators.required, Validators.email]);
  registerEmail = new FormControl('', [Validators.required, Validators.email]);
  constructor() {
  }

  getLoginErrorMessage() {
    return this.loginEmail.hasError('required') ? 'You must enter a value' :
      this.loginEmail.hasError('email') ? 'Not a valid email' :
        '';
  }
  getRegisterErrorMessage() {
    return this.registerEmail.hasError('required') ? 'You must enter a value' :
      this.registerEmail.hasError('email') ? 'Not a valid email' :
        '';
  }

  ngOnInit() {
  }
}
