import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { UserdataService } from '../services/userdata.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  userid = 0;
  username = "";
  email = "";

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private authService: AuthService,
    private userdataService: UserdataService,
  ) { 
  }

  ngOnInit(): void {
    // Get logged in user details.
    this.authService.getProfile().subscribe(profile => {
      console.log(profile.user);
      this.username = profile.username;
      this.email = profile.email;
      this.userid = profile._id;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  // Update own user details.
  editFunc(){
    let userobj = {
      'username': this.username, 
      'email': this.email
    }

    // Update User details in database.
    this.authService.updateUser(userobj, this.userid).subscribe(data => {
      if(data.success){
        alert('This user has been update');
      } else {
        alert('Something went wrong');
      }
    },
    err => {
      console.log(err);
      return false;
    });

    this.router.navigateByUrl("/account");
  }
  

}
