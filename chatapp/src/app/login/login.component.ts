import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {}

  // Submit login details
  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }
    
    // Authenticate user login by checking validity of details in database
    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        // Store user data and token in local storage for reference
        this.authService.storeUserData(data.token, data.user);
        alert("You are now logged in");
        this.router.navigate(['homepage']);
      } else {
        alert(data.msg);
        this.router.navigate(['login']);
      }
    });
  }
}

