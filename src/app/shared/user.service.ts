import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { User } from '../user/model/user';
import { Constants } from '../shared/constants';
import { BehaviorSubject } from 'rxjs';
//import { LoggerService } from '../logger/logger.service';
//import { LogLevel } from '../../../shared/utilities/enum';
import { LocalStorageService } from './cache/local-storage.service';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";



@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private _currentUser: User; 
  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject(new User());

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,
  ) {
    
  
  }
  readonly BaseURI = 'http://localhost:31258/api';
  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private UserName = new BehaviorSubject<string>(localStorage.getItem('UserName'));


  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }

  login(formData) {
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);

  }

  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile');
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('UserName');
    localStorage.setItem('loginStatus', '0');
    location.reload();
    this.router.navigate(['/user/login']);
   

  }

  checkLoginStatus(): boolean {

    var loginCookie = localStorage.getItem("loginStatus");

    if (loginCookie == "1") {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined) {
        return false;
      }

      // Get and Decode the Token
      const token = localStorage.getItem('token');
      const decoded = jwt_decode(token);
      // Check if the cookie is valid

      if (decoded.exp === undefined) {
        return false;
      }

      // Get Current Date Time
      const date = new Date(0);

      // Convert EXp Time to UTC
      let tokenExpDate = date.setUTCSeconds(decoded.exp);

      // If Value of Token time greter than 

      if (tokenExpDate.valueOf() > new Date().valueOf()) {
        return true;
      }

      console.log("NEW DATE " + new Date().valueOf());
      console.log("Token DATE " + tokenExpDate.valueOf());

      return false;

    }
    return false;
  }

  get isLoggesIn() {
    return this.loginStatus.asObservable();
  }

  get currentUserName() {
    return this.UserName.asObservable();
  }

  getUserName() {
    this.UserName.next(localStorage.getItem('UserName'));
  
  }
}


