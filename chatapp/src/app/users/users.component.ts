import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { ValidateService } from '../services/validate.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  createUser: Boolean = false;
  
  newUsername: string = '';
  newSuperUserInd: boolean = false;
  newEmail: string = '';
  newPassword: string = '';

  dataList: any =[];
  userList: any = [
      {
          "userid":1,"username":"kaile.su","email":"k.su@griffith.edu.au","role":"Super_Admin","groups":[
              {"group_id":1,"group_name":"3702ICT","rooms":["Home","Off topic"]},
              {"group_id":2,"group_name":"1007ICT","rooms":["Home","Assignments","Resources"]},
              {"group_id":3,"group_name":"3502ICT","rooms":["Workshops","Discussion"]},
              {"group_id":4,"group_name":"3212ICT","rooms":["Help","Exam","Notes"]}
          ]
      },
      {
          "userid":2,"username":"allan.br","email":"a.br@griffith.edu.au","role":"Group_Admin","groups":[
              {"group_id":2,"group_name":"1007ICT","rooms":["Home","Assignments","Resources"]},
              {"group_id":3,"group_name":"3502ICT","rooms":["Workshops","Discussion"]},
              {"group_id":4,"group_name":"3212ICT","rooms":["Help","Exam","Notes"]},
              {"group_id":5,"group_name":"2345ICT","rooms":["Home","Off topic"]}
          ]
      },
      {
          "userid":3,"username":"angel.no","email":"angel@noord.com","role":"Group_Assis","groups":[
              {"group_id":2,"group_name":"1007ICT","rooms":["Home","Assignments"]},
              {"group_id":4,"group_name":"3212ICT","rooms":["Help","Exam","Notes"]}
          ]
      },
      {
          "userid":4,"username":"mish.no","email":"mich@noord,com","role":"Member","groups":[
              {"group_id":2,"group_name":"1007ICT","rooms":["Home","Assignments"]},
              {"group_id":4,"group_name":"3212ICT","rooms":["Help","Exam","Notes"]}
          ]
      }
  ]
  

  constructor (
    private validateService: ValidateService,
  ) { 
  }

  ngOnInit(): void {
  }
  
  updateRole(target:HTMLSelectElement):void {
  }

  showCreateUserRegion() {
    this.createUser = true;
  }

  onRegisterSubmit() {
    const newUser = {
      username: this.newUsername,
      email: this.newEmail,
      super_admin_ind: this.newSuperUserInd,
      password: this.newPassword
    }

    // Required Fields
    if(!this.validateService.validateRegister(newUser)){
      alert('Please fill in all fields' + " username:" + newUser.username + " email:" + newUser.email + " password:" + newUser.password);
      return false;
    } 
    
    if(!this.validateService.validateEmail(newUser.email)){
      alert('Please use a valid email');
      return false;
    } else {
      return true;
    }

  }

}
