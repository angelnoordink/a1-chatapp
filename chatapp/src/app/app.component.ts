import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'a1-chatapp';
  username = localStorage.getItem('username');
  userlogin = "";
  loggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ){ 
    if (localStorage.getItem('user') != null){
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    setTimeout(() => {
      this.userlogin = localStorage.getItem('userlogin')!;
    }, 3000);
  }

  ngOnInit() {
    // this.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    alert("You have been logged out");
    this.router.navigate(['/login']);
    return false;
  }
}
