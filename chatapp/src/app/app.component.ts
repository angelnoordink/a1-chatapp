import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'a1-chatapp';
  username = localStorage.getItem('username');
  loggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    if (localStorage.getItem('userlogin')=="true"){
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    window.location.reload()
  }
}
