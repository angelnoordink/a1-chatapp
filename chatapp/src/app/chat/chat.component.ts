import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { io } from "socket.io-client";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  
  messagecontent: string = '';
  groupName: string = '';
  roomName: string = "";
  roomsList: string = "";
  currentRoom: string = "";
  messages: string[] = [];
  rooms: string[] = [ 'room1', 'room2', 'room3', 'room4' ];
  newRoom: string = "";
  isinRoom: boolean = false;
  roomNotice: string = "";
  numUsers: number= 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private chatService: ChatService
  ) { 

  }

  
  ngOnInit(): void {
    this.chatService.getMessage().subscribe((message: string) => {
      this.messages.push(message);
    });
    this.chatService.reqRoomList();
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
    this.numUsers = 0;
    this.roomNotice = "A user has left the room.";
    this.messages = [];
  }

  addRoom() {
    this.chatService.createRoom(this.newRoom);
    this.currentRoom = this.newRoom
    this.roomsList = this.newRoom
    this.chatService.reqRoomList();
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

  
}
