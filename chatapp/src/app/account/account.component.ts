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
  super_admin_ind: Boolean = false;
  groupList = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      console.log(profile.user);
      this.username = profile.user.username;
      this.email = profile.user.email;
      this.super_admin_ind = profile.user.super_admin_ind;
      this.groupList = profile.user.groupList;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
