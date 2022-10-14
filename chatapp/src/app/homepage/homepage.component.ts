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
  groupList: any = [];
  userGroups: any = [];
  
  createGroup: Boolean = false;
  isSuper: Boolean = false;

  newGroupName: string = '';

  userRole: string = '';

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

    }

  ngOnInit(): void {
    const currUser =  JSON.parse(localStorage.getItem('user')!);
    this.userRole = currUser.role;
      
      // If user is super user, allow to view all groups, otherwise only show assigned groups.
      if (currUser.role == 'super_user') {
        this.userdataService.getgrouplist().subscribe(groups => {
          this.isSuper = true;
          this.groupList = groups;
        },
        err => {
          console.log(err);
          return false;
        });
      } else {
        this.userdataService.getuser(currUser.id).subscribe(current_user => {
          this.isSuper = false;
          this.userGroups = current_user;
        },
        err => {
          console.log(err);
          return false;
        });
      }
  }

  onSelect(group_id:any){
    this.router.navigate(['/chat', group_id]);
  }

  showCreateGroupRegion() {
    this.createGroup = true;
  }

  onFormSubmit(){
    const newGroup = {
      group_name: this.newGroupName
    }

    // Register user
    this.userdataService.createGroup(newGroup).subscribe(data => {
      if(data.success){
        alert('This group has been created');
        window.location.reload()

      } else {
        alert('Something went wrong');
      }
    });

  }
}
