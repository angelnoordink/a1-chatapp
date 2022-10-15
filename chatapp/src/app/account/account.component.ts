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

  roleList: any =["super_admin","group_admin","group_assis","member"];

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { 
  }

  ngOnInit() {
    // Get logged in user details.
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.username;
      this.email = profile.email;
      this.role = profile.role;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
