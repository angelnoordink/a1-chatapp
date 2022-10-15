import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { UserdataService } from '../services/userdata.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  messagecontent: string = '';
  group: any;
  groupID: any;
  groupName: string = "";
  roomsList: string = "";
  currentRoom: string = "";
  messages: string[] = [];
  rooms: any = [];
  newRoom: string = "";
  newUser: string = "";
  isinRoom: boolean = false;
  userRegion: boolean = false;
  roomNotice: string = "";
  numUsers: number= 0;
  role: string = "";
  groupUsers: any = [];
  allUsers: any = [];
  

  constructor(
    private router: Router,
    private chatService: ChatService,
    private route: ActivatedRoute,
    public userdataService: UserdataService
  ) { 
  }

  
  ngOnInit(): void {
    // Get logged in user details from local storage.
    const currUser =  JSON.parse(localStorage.getItem('user')!);
    this.role = currUser.role;

    // Get current groupID from route parameter.
    this.groupID = this.route.snapshot.paramMap.get('group_id');

    // Get details fpr curremt group.
    this.userdataService.getgroup(this.groupID).subscribe(group => {
      console.log("Group"+JSON.stringify(group[0]));
      this.group = group[0];
      this.groupName = this.group.group_name;
    }, err => {
      console.log(err);
      return false;
    });

    // Get users within current group.
    this.userdataService.getgroupusers(this.groupID).subscribe(currentGroup => {
      this.groupUsers = currentGroup;
      console.log("Users"+JSON.stringify(currentGroup));
    }, err => {
      console.log(err);
      return false;
    });

    // Get all users from db.
    this.userdataService.getuserlist().subscribe(users => {
      this.allUsers = users;
      console.log("AllUSers"+JSON.stringify(this.allUsers));
    },
    err => {
      console.log(err);
      return false;
    });

    // Get rooms within current group.
    this.userdataService.getrooms(this.groupID).subscribe(roomList => {
      roomList.forEach( (element) => {
        this.rooms.push(element.room_name);
      });
      console.log("rooms"+JSON.stringify(roomList));
    }, err => {
      console.log(err);
      return false;
    });

    this.chatService.getMessage().subscribe((message) => {
      this.messages.push(message);
    });
    this.chatService.reqRoomList(this.rooms);
    this.chatService.getRoomList((msg:any)=>{this.rooms = JSON.parse(msg)});
    console.log(this.rooms)
    this.chatService.notice((msg:any)=>{this.roomNotice = msg});
    this.chatService.joined((msg:any)=>{this.currentRoom = msg
      if (this.currentRoom != "") {
        this.isinRoom = true;
      } else {
        this.isinRoom = false;
      }
    });
  }

  // Join selected room.
  joinRoom(){
    this.chatService.joinRoom(this.roomsList);
    this.chatService.reqNumUsers(this.roomsList);
    this.chatService.getNumUsers((res:any)=>{this.numUsers = res});
    this.currentRoom = this.roomsList;
    this.isinRoom = true;
    this.roomNotice = "A new user has joined";
  }

  // Clear room notices.
  clearNotice() {
    this.roomNotice = "";
  }

  // Leave current room.
  leaveRoom() {
    this.chatService.leaveRoom(this.currentRoom);
    this.chatService.reqNumUsers(this.currentRoom);
    this.chatService.getNumUsers((res:any)=>{this.numUsers = res});
    this.roomsList = "";
    this.currentRoom = "";
    this.isinRoom = false;
    this.roomNotice = "A user has left the room.";
    this.messages = [];
  }

  // Add room to group.
  addRoom() {
    this.chatService.createRoom(this.newRoom);
    this.currentRoom = this.newRoom
    this.roomsList = this.newRoom
    this.chatService.reqRoomList(this.rooms);
    this.rooms.push(this.newRoom);
    this.isinRoom = true;
    this.roomNotice = "A new user has joined";

    const newRoomObj = {
      room_name: this.newRoom,
      group_id: this.groupID
    }

    // Add new room to database.
    this.userdataService.createRoom(newRoomObj).subscribe(data => {
      if(data.success){
        alert('A new room has been created');
      } else {
        alert('Something went wrong');
      }
    });

    this.newRoom = "";
  }
  
  // Send message in room.
  sendMessage() {
    if(this.messagecontent){
      this.chatService.sendMessage(this.messagecontent);
      this.messagecontent = "";
    } else {
      console.log('No Message');
    }
  }

  // Assign new user to group.
  assignUser(){
    const userGroupRoom = {
      user_id: this.newUser,
      group_id: this.groupID
    }

    alert(JSON.stringify(userGroupRoom));

    // Assign user to group in database.
    this.userdataService.assign(userGroupRoom).subscribe(data => {
      if(data.success){
        alert('This user has been assigned to the group');
      } else {
        alert('Something went wrong');
      }
    });

    window.location.reload()
  }

  // Remove user from group.
  unassignUser(usergroup_id){
    alert(JSON.stringify(usergroup_id));
    this.userdataService.unassign(usergroup_id).subscribe(data => {
      if(data.success){
        alert('This user has been removed from the group');
      } else {
        alert('Something went wrong');
      }
    });

    window.location.reload()
  }

  // Delete entire current group.
  deleteGroup(){
    this.userdataService.deleteGroup(this.groupID).subscribe(data => {
      if(data.success){
        alert('This group has been removed');
      } else {
        alert('Something went wrong');
      }
    });

    this.router.navigate(['/homepage']);
  }

  // Show region listing users.
  showUserRegion() {
    this.userRegion = true;
  }

  // Hide region listing users.
  hideUserRegion() {
    this.userRegion = false;
  }

}
