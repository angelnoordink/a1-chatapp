import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  username: String = '';
  email: String = '';
  role: String = '';
  myrole: string = "";
  groupList = [];

  roleList: any =["Super_Admin","Group_Admin","Group_Assis","Member"];

  constructor(
    private router: Router,
    private authService: AuthService,
    
  ) { 
    this.myrole = localStorage.getItem('role')!;
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      console.log(profile.user);
      this.username = profile.user.username;
      this.email = profile.user.email;
      this.role = profile.user.role;
      this.groupList = profile.user.groupList;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
