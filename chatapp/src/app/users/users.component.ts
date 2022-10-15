import { Component, OnInit } from '@angular/core';
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
    private userdataService: UserdataService
  ) { 
  }

  ngOnInit(): void {
    // Get logged in user details from local storage.
    const currUser =  JSON.parse(localStorage.getItem('user')!);
    this.myrole = currUser.role;

    // Get list of all users from database.
    this.userdataService.getuserlist().subscribe(users => {
      console.log(JSON.stringify(users));
      this.userList = users;
    },
    err => {
      console.log(err);
      return false;
    });
  }
  
  // Update user role (Only accessible for super_users)
  updateRole(user):void {
    let userobj = {
      'role': user.role
    }

    // Updates user record in database.
    this.authService.updateUser(userobj, user._id).subscribe(data => {
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
  }

  // Deletes user.
  deleteUser(user_id):void {
    // UPDATE (test)
    // Deletes user record in database.
    alert(user_id);
    this.userdataService.deleteUser(user_id).subscribe(data => {
      if(data.success){
        alert('This user has been deleted');
      } else {
        alert('Something went wrong');
      }
    },
    err => {
      console.log(err);
      return false;
    });

    window.location.reload()
  }

  // Show create user form.
  showCreateUserRegion() {
    this.createUser = true;
  }

  // Creates new user on submission of form.
  onRegisterSubmit() {
    const newUser = {
      username: this.newUsername,
      email: this.newEmail,
      role: this.newRole,
      password: this.newPassword
    }

    // Validates that no fields are left blank.
    if(!this.validateService.validateRegister(newUser)){
      alert('Please fill in all fields');
      return false;
    } 
    
    // Validates email is of correct format.
    if(!this.validateService.validateEmail(newUser.email)){
      alert('Please use a valid email');
      return false;
    }

    // Creates user in database.
    this.authService.registerUser(newUser).subscribe(data => {
      if(data.success){
        alert('This user is now created');
      } else {
        alert('Something went wrong');
      }
    });

    window.location.reload()
  }

}
