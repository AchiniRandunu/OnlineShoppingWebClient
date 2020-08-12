import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { UserService } from '../../shared/services/user.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  
  constructor(private userService: UserService, private router: Router) {

  }

  loginStatus$: Observable<boolean>;
  userName$: Observable<string>;

  ngOnInit() {
    this.loginStatus$ = this.userService.isLoggesIn;
    this.userName$ = this.userService.currentUserName;

  }

 
  onLogout() {
    this.userService.onLogout();
    
  }


}
