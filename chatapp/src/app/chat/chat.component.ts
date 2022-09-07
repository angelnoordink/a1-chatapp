import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { ChatService } from '../services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  newMessage: string = '';
  messageList: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private chatService: ChatService
  ) { 

  }

  ngOnInit(): void {
    this.chatService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    });
  }
  

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
}
