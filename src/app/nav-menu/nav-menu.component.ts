import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  
  //isExpanded = false;


  
  constructor(private userService: UserService, private router: Router) {

  }

  LoginStatus$: Observable<boolean>;
  UserName$: Observable<string>;

  ngOnInit() {
    this.LoginStatus$ = this.userService.isLoggesIn;
    this.UserName$ = this.userService.currentUserName;

  }


  //collapse() {
  //  this.isExpanded = false;
  //}

  //toggle() {
  //  this.isExpanded = !this.isExpanded;
  //}

 
  onLogout() {
    this.userService.onLogout();
    
  }
}
