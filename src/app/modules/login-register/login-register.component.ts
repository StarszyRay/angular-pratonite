import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ProfileService} from '../../services/profile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {

  isValidRegisterFormSubmitted: boolean = null;

  loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private profileService: ProfileService,
              private router: Router
  ) {
  }

  registerSubmit() {
    this.isValidRegisterFormSubmitted = false;
    if (this.registerFormGroup.invalid) {
      return;
    }
    this.isValidRegisterFormSubmitted = true;
    this.authService.doEmailRegister(this.registerFormGroup.value)
      .then(result => {
        console.log(result);
        console.log(result.user.uid);
        this.profileService.addNewProfile(result.uid, this.registerFormGroup.value);
        this.router.navigate(['/moj_profil']);
      }, err => {
        console.log(err);
      });
  }

  loginSubmit() {
    this.authService.doEmailLogin(this.loginEmail.value, this.loginPassword.value)
      .then(result => {
            // console.log(result);
            this.router.navigate(['/moj_profil']);
      }, err => {
        console.log(err);
      });
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin()
      .then(result => {
        console.log(result);
        if (result.additionalUserInfo.isNewUser) {
          this.profileService.addNewGoogleProfile(result.user);
        }
        this.router.navigate(['/moj_profil']);
      }, err => {
        console.log(err);
      });
  }

  ngOnInit() {
    const passwordPattern = '(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}';
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(passwordPattern)
      ]],
      remember: false
    });

    this.registerFormGroup = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      surname: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(passwordPattern)
      ]],
      regulations: [false, [
        Validators.requiredTrue
      ]],
      personalData: [false, [
        Validators.requiredTrue
      ]],
      information: [false, [
        Validators.requiredTrue
      ]]
    });
  }

  getLoginEmailErrorMessage() {
    return this.loginEmail.hasError('required') ? 'Uzupełnij email' :
      this.loginEmail.hasError('email') ? 'Nieprawidłowy email' :
        '';
  }
  getRegisterEmailErrorMessage() {
    return this.registerEmail.hasError('required') ? 'Uzupełnij email' :
      this.registerEmail.hasError('email') ? 'Nieprawidłowy email' :
        '';
  }

  get loginEmail() {
    return this.loginFormGroup.get('email');
  }

  get loginPassword() {
    return this.loginFormGroup.get('password');
  }

  get registerEmail() {
    return this.registerFormGroup.get('email');
  }

  get registerPassword() {
    return this.registerFormGroup.get('password');
  }

  get name() {
    return this.registerFormGroup.get('name');
  }

  get surname() {
    return this.registerFormGroup.get('surname');
  }

  isCheckboxError() {
    const checkbox1 = this.registerFormGroup.get('regulations');
    const checkbox2 = this.registerFormGroup.get('personalData');
    const checkbox3 = this.registerFormGroup.get('information');
    if (this.isValidRegisterFormSubmitted != null && !this.isValidRegisterFormSubmitted) {
      if (checkbox1.invalid || checkbox2.invalid || checkbox3.invalid) {
        return true;
      }
    }
    return false;
  }

}
