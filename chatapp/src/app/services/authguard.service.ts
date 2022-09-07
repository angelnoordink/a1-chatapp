import { Injectable } from '@angular/core';
import { CanActivate }    from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  canActivate() {
    //Your redirect logic/condition. I use this.

    if (!(sessionStorage.getItem('userlogin')=="true")){
      // alert("Please Login");
      this.router.navigate(['/login']);
    }
    console.log('AuthGuard#canActivate called');
    return true;

  }

  constructor(private router: Router) { }
}
