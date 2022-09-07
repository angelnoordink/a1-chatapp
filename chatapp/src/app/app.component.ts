import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'a1-chatapp';
  username = sessionStorage.getItem('username');
  loggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    if (!(sessionStorage.getItem('userlogin')=="true")){
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
    window.location.reload()
  }
}
