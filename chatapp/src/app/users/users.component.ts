import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { UserdataService } from '../services/userdata.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  createUser: Boolean = false;
  
  newUsername: string = '';
  newRole: string = '';
  newEmail: string = '';
  newPassword: string = '';
  myrole: string = "";

  dataList: any =[];
  userList: any = [];

  roleList: any =["super_admin","group_admin","group_assis","member"];
  

  constructor (
    private validateService: ValidateService,
    private authService: AuthService,
    private userdataService: UserdataService,
    private router: Router
  ) { 
    this.myrole = localStorage.getItem('role')!;
  }

  ngOnInit(): void {
    this.userdataService.getuserlist().subscribe(users => {
      console.log(JSON.stringify(users));
      this.userList = users;
    },
    err => {
      console.log(err);
      return false;
    });
  }
  
  updateRole(target:HTMLSelectElement):void {
    // this.user.role == this.role;
  }

  showCreateUserRegion() {
    this.createUser = true;
  }

  onRegisterSubmit() {
    const newUser = {
      username: this.newUsername,
      email: this.newEmail,
      role: this.newRole,
      password: this.newPassword
    }

    // Required Fields
    if(!this.validateService.validateRegister(newUser)){
      alert('Please fill in all fields');
      return false;
    } 
    
    if(!this.validateService.validateEmail(newUser.email)){
      alert('Please use a valid email');
      return false;
    }

    // Register user
    this.authService.registerUser(newUser).subscribe(data => {
      if(data.success){
        alert('This user is now registered and can log in');
      } else {
        alert('Something went wrong');
      }
    });
  }

}
