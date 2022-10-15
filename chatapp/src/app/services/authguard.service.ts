import { Injectable } from '@angular/core';
import { CanActivate }    from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public authService: AuthService) { }
  
  // Allows authguard to activate on routes.
  // Protects site data and access.
  canActivate():any {
    if (this.authService.loggedIn()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
