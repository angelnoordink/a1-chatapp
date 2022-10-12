import { Component, createPlatform, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';


const BACKEND_URL = 'http://localhost:3000';

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
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }
    
    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
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

