import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../../components/user/model/user';
import { environment } from '../../../environments/environment.prod';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";



@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject(new User());

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,
  ) {
    
  
  }
  readonly baseURI = `${environment.apiHost}`;
  readonly loginUrl = `${environment.loginUrl}`;
  readonly registerUrl = `${environment.registerUrl}`;
  readonly userProfileUrl = `${environment.userProfileUrl}`;

  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private userName = new BehaviorSubject<string>(sessionStorage.getItem('UserName'));


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
    return this.http.post(this.baseURI + this.registerUrl, body);
  }

  login(formData) {
    return this.http.post(this.baseURI + this.loginUrl, formData);

  }

  getUserProfile() {
    return this.http.get(this.baseURI + this.userProfileUrl);
  }

  onLogout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('UserName');
    sessionStorage.setItem('loginStatus', '0');
    sessionStorage.removeItem('cart');
    sessionStorage.removeItem('UserNameForID');
    sessionStorage.removeItem('Email');
    sessionStorage.removeItem('id');
    location.reload();
    this.router.navigate(['/user/login']);   

  }

  checkLoginStatus(): boolean {

    var loginCookie = sessionStorage.getItem("loginStatus");

    if (loginCookie == "1") {
      if (sessionStorage.getItem('token') === null || sessionStorage.getItem('token') === undefined) {
        return false;
      }

      // Get and Decode the Token
      const token = sessionStorage.getItem('token');
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

      //console.log("NEW DATE " + new Date().valueOf());
      //console.log("Token DATE " + tokenExpDate.valueOf());

      return false;

    }
    return false;
  }

  get isLoggesIn() {
    return this.loginStatus.asObservable();
  }

  get currentUserName() {
    return this.userName.asObservable();
  }

  getUserName() {
    this.userName.next(sessionStorage.getItem('UserName'));
  
  }
}


