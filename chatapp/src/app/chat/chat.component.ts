import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { io } from "socket.io-client";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserdataService } from '../services/userdata.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

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
  groupList: any;
  groupString: any;
  roomName: string = "";
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
  groups: [] = [];
  username = "";
  role: string = "";
  groupUsers: any = [];
  allUsers: any = [];
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private chatService: ChatService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    public userdataService: UserdataService
  ) { 
    this.groupID = this.route.snapshot.paramMap.get('group_id');
  }

  
  ngOnInit(): void {
    
    const currUser =  JSON.parse(localStorage.getItem('user')!);
    this.role = currUser.role;

    this.groupID = this.route.snapshot.paramMap.get('group_id');

    // For the super users
    this.userdataService.getgroup(this.groupID).subscribe(group => {
      console.log("Group"+JSON.stringify(group[0]));
      this.group = group[0];
      this.groupName = this.group.group_name;
    }, err => {
      console.log(err);
      return false;
    });

    this.userdataService.getgroupusers(this.groupID).subscribe(currentGroup => {
      this.groupUsers = currentGroup;
      console.log("Users"+JSON.stringify(currentGroup));
    }, err => {
      console.log(err);
      return false;
    });

    this.userdataService.getuserlist().subscribe(users => {
      this.allUsers = users;
      console.log("AllUSers"+JSON.stringify(this.allUsers));
    },
    err => {
      console.log(err);
      return false;
    });

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

  
  joinRoom(){
    this.chatService.joinRoom(this.roomsList);
    this.chatService.reqNumUsers(this.roomsList);
    this.chatService.getNumUsers((res:any)=>{this.numUsers = res});
    this.currentRoom = this.roomsList;
    this.isinRoom = true;
    this.roomNotice = "A new user has joined";
  }

  clearNotice() {
    this.roomNotice = "";
  }

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

    // Register user
    this.userdataService.createRoom(newRoomObj).subscribe(data => {
      if(data.success){
        alert('A new room has been created');
      } else {
        alert('Something went wrong');
      }
    });

    this.newRoom = "";
  }
  

  sendMessage() {
    console.log("Message  " + this.messagecontent);
    if(this.messagecontent){
      this.chatService.sendMessage(this.messagecontent);
      this.messagecontent = "";
    } else {
      console.log('No Message');
    }
  }

  getById(arr:any, id:any) {
    for (var d = 0, len = arr.length; d < len; d += 1) {
        if (arr[d].id === id) {
            return arr[d];
        }
    }
  }

  assignUser(){

    const userGroupRoom = {
      user_id: this.newUser,
      group_id: this.groupID
    }

    alert(JSON.stringify(userGroupRoom));

    // Register user
    this.userdataService.assign(userGroupRoom).subscribe(data => {
      if(data.success){
        alert('This user has been assigned to the group');
      } else {
        alert('Something went wrong');
      }
    });

    this.userdataService.getgroupusers(this.groupID).subscribe(currentGroup => {
      this.groupUsers = currentGroup;
      console.log("Users"+JSON.stringify(currentGroup));
    }, err => {
      console.log(err);
      return false;
    });

    window.location.reload()
  }

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

  deleteGroup(){
    this.userdataService.deleteGroup(this.groupID).subscribe(data => {
      if(data.success){
        alert('This user has been removed from the group');
      } else {
        alert('Something went wrong');
      }
    });

    this.router.navigate(['/homepage']);
  }

  showUserRegion() {
    this.userRegion = true;
  }

  hideUserRegion() {
    this.userRegion = false;
  }

}
