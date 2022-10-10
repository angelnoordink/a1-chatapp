import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';
import { Userobj } from '../userobj';
import { group } from '@angular/animations';
import { UserdataService } from '../services/userdata.service';
import { User } from '../models/user';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

const BACKEND_URL = 'http://localhost:3000';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  groupList: any;
  groupString: any;
  createGroup: Boolean = false;

  newGroupName: string = '';
  newRoom: string = '';
  newRoomList: any = [];
  inputUsername: string = '';
  inputEmail: string = '';
  groupId: number = 0;
  newUserList: any = [];
  newUserListOutput: any = [];
  newGroupList: any =[];
  dataList: any =[];
  nrl: string = '';
  newGroup: any = [];


  constructor(
    private browserAnimationsModule: BrowserAnimationsModule,
    private router: Router,
    private matCardModule: MatCardModule,
    private matToolbarModule: MatToolbarModule,
    private matButtonModule: MatButtonModule,
    private flexLayoutModuleformBuilder: FlexLayoutModule,
    private httpClient: HttpClient,
    private chatService: ChatService,
    private userdata: UserdataService,
    ) { 
      this.groupString = localStorage.getItem('groups');
      this.groupList = JSON.parse(this.groupString);

      this.dataList = localStorage.getItem("data")!;
    }

  ngOnInit(): void {
  }

  onSelect(group_id:any){
    this.router.navigate(['/chat', group_id]);
  }

  showCreateGroupRegion() {
    this.createGroup = true;
  }

  assignUser() {
    
    this.newUserListOutput.push(JSON.stringify({username: this.inputUsername, email: this.inputEmail}));
    this.newUserList.push({username: this.inputUsername, email: this.inputEmail});


    let userobj = {
      'username': this.inputUsername, 
      'email': this.inputEmail
    }

    

    localStorage.getItem("data");

    this.inputUsername = "";
    this.inputEmail = "";
  }


  
  assignRooms() {

    for (let i = 0; i < this.newUserList.length; i++) {
      // {username: this.inputUsername, email: this.inputEmail}
    }
    
    this.newRoomList.push(this.newRoom);
    console.log(this.newRoomList);
    this.newRoom = "";
  }

  createNewGroup() {
    

    
  }
}
