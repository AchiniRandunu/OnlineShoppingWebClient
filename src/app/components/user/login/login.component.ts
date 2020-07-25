import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: ''
  }
  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (sessionStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');
  }

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        if (res.message) {
          
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
          form.reset();
          
        }

        else if ((res.token != null && res.token != "undefined") && (res.userName != null && res.userName != "undefined"))
        {         
          sessionStorage.setItem('token', res.token);
          sessionStorage.setItem('UserName', res.userName);
          sessionStorage.setItem('loginStatus', '1');
          this.service.getUserName();
          this.toastr.success('Logged in Successfully.');   
          location.reload();
          this.router.navigateByUrl('/home');
        }
        
      },
      err => {
        if (err.status == 400)
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        else
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        console.log(err);
        form.reset();
      }
    );
  }
}
