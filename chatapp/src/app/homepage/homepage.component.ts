import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserdataService } from '../services/userdata.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {
  groupList: any = [];
  userGroups: any = [];
  
  createGroup: Boolean = false;
  isSuper: Boolean = false;

  newGroupName: string = '';

  userRole: string = '';

  constructor(
    private router: Router,
    private userdataService: UserdataService,
    ) { 
    }

  ngOnInit(): void {
    // Get logged in user details from local storage.
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

  // Route to selected group.
  onSelect(group_id:any){
    this.router.navigate(['/chat', group_id]);
  }

  // Show create group region
  showCreateGroupRegion() {
    this.createGroup = true;
  }

  // Create new group
  onFormSubmit(){
    const newGroup = {
      group_name: this.newGroupName
    }

    // Add new group to database
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
