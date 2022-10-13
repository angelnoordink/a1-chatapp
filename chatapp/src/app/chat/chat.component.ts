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
  rooms: string[] = [];
  newRoom: string = "";
  isinRoom: boolean = false;
  roomNotice: string = "";
  numUsers: number= 0;
  groups: [] = [];
  username = "";
  role: string = "";
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private chatService: ChatService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    public userdataService: UserdataService
  ) { 
    this.groupID = this.route.snapshot.paramMap.get('group_id');

    // For the super users
    this.userdataService.getgroup(this.groupID).subscribe(group => {
      // this.groupString = JSON.stringify(groups[0]);
      console.log(group[0]);
      this.group = group[0]
      this.groupName = this.group.group_name;
      console.log(this.groupName);
      this.rooms = this.group.roomList;
    },
    err => {
      console.log(err);
      return false;
    });

  }

  
  ngOnInit(): void {
    
    this.role = localStorage.getItem('role')!;
    
    this.chatService.getMessage().subscribe((message: string) => {
      this.messages.push(message);
    });
    this.chatService.reqRoomList(this.rooms);
    this.chatService.getRoomList((msg:any)=>{this.rooms = JSON.parse(msg)});
    // console.log(this.rooms)
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
    console.log("RoomList  " + this.roomsList);
    this.chatService.joinRoom(this.roomsList);
    this.chatService.reqNumUsers(this.roomsList);
    this.chatService.getNumUsers((res:any)=>{this.numUsers = res});
    this.currentRoom = this.roomsList
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
    this.newRoom = "";
    this.roomNotice = "A new user has joined";
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

  
}
