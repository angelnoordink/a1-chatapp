import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserdataService } from '../services/userdata.service';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';


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
  username: String = '';
  email: String = '';
  role: String = '';
  groupList: any = [];
  userGroupList: any = [];
  userGroups: any = [];
  
  createGroup: Boolean = false;

  newGroupName: string = '';
  newRoom: string = '';
  newRoomList: any = [];
  groupId: number = 0;

  constructor(
    private browserAnimationsModule: BrowserAnimationsModule,
    private router: Router,
    private matCardModule: MatCardModule,
    private matToolbarModule: MatToolbarModule,
    private matButtonModule: MatButtonModule,
    private flexLayoutModuleformBuilder: FlexLayoutModule,
    private httpClient: HttpClient,
    private userdataService: UserdataService,
    private authService: AuthService
    ) { 
      const currUser =  JSON.parse(localStorage.getItem('user')!);
      console.log(currUser.id);

      this.userdataService.getuser(currUser.id).subscribe(current_user => {
        this.userGroups = current_user;
        console.log("Usergroups"+JSON.stringify(this.userGroups));
      },
      err => {
        console.log(err);
        return false;
      });

      // For the super users
      this.userdataService.getgrouplist().subscribe(user => {
        console.log("Allgroups"+JSON.stringify(user));
        this.groupList = user;
      },
      err => {
        console.log(err);
        return false;
      });
      

    }

  ngOnInit(): void {
  }

  onSelect(group_id:any){
    this.router.navigate(['/chat', group_id]);
  }

  showCreateGroupRegion() {
    this.createGroup = true;
  }

  // assignUser() {
    
  //   this.newUserListOutput.push(JSON.stringify({username: this.inputUsername, email: this.inputEmail}));
  //   this.newUserList.push({username: this.inputUsername, email: this.inputEmail});


  //   let userobj = {
  //     'username': this.inputUsername, 
  //     'email': this.inputEmail
  //   }

    

  //   localStorage.getItem("data");

  //   this.inputUsername = "";
  //   this.inputEmail = "";
  // }


  
  assignRooms() {

    // for (let i = 0; i < this.newUserList.length; i++) {
    //   // {username: this.inputUsername, email: this.inputEmail}
    // }
    
    this.newRoomList.push(this.newRoom);
    console.log(this.newRoomList);
    this.newRoom = "";
  }

  createNewGroup() {
    

    
  }
}
