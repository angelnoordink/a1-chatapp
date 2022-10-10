import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChatService } from '../services/chat.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Userobj } from '../userobj';
import { group } from '@angular/animations';
import { UserdataService } from '../services/userdata.service';

interface User {
  userid: Number;
  name: String;
  email: String;
  role: String;
}


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  // userList: any;
  userString: any;
  createUser: Boolean = false;
  
  newRoomList: any = [];
  newUsername: string = '';
  newSuperUserInd: boolean = false;
  newEmail: string = '';
  userId: number = 0;
  newGroupList: any = [];
  newGroupListOutput: any = [];

  newUser: string = "";
  dataList: any =[];
  inputGroup: string = '';
  userGroupList: string = "";
  user: any;
  role: string = "";
  roleList: any =["Super_Admin","Group_Admin","Group_Assis","Member"];
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
  

constructor(
  private browserAnimationsModule: BrowserAnimationsModule,
  private router: Router,
  private matCardModule: MatCardModule,
  private matToolbarModule: MatToolbarModule,
  private matButtonModule: MatButtonModule,
  private flexLayoutModuleformBuilder: FlexLayoutModule,
  private httpClient: HttpClient,
  private chatService: ChatService,
  // private userdata: UserdataService,
  ) { 
    this.dataList = localStorage.getItem("data")!;
  }

  ngOnInit(): void {
    this.user.role == this.role;
  }
  
  updateRole(target:HTMLSelectElement):void {
    this.user.role == this.role;
  }

  showCreateUserRegion() {
    this.createUser = true;
  }
  

  assignGroup() {
    
    // this.newGroupListOutput.push(JSON.stringify({group_name: this.inputGroup}));
    this.newGroupList.push(this.inputGroup);


    let groypobj = {
      'group_name': this.inputGroup, 
    }

    

    localStorage.getItem("data");

    this.inputGroup = "";
  }


  createNewUser() {
    
    console.log("New user created.");
    
  }

}
