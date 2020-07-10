import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.css']
})
export class LoginMenuComponent implements OnInit {
  userDetails;
  currentUserName: string;

  userName = new BehaviorSubject<string>(localStorage.getItem('UserName'));
  
  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
    //this.currentUserName = this.service.currentUserObservable.value.FullName;
    console.log(this.userName.value);
        this.service.getUserProfile().subscribe(
          res => {
            this.userDetails = res;
            console.log(this.userDetails);
          },
          err => {
            console.log(err);
          },
        );
  }
    
  


  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
    this.userDetails = '';
  }
}
