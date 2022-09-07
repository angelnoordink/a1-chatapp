import { NgIfContext } from '@angular/common';
import { NotExpr } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  
  constructor() {}

  socket = io('http://localhost:3000');

  
  joinRoom(selRoom: any): void {
    this.socket.emit("joinRoom", selRoom);
  }

  leaveRoom(selRoom: any): void {
    this.socket.emit("leaveRoom", selRoom);
  }

  joined(next: any) {
    this.socket.on('joined', res=>next(res));
  }

  createRoom(newRoom:any) {
    this.socket.emit('newRoom', newRoom);
  }

  reqNumUsers(selRoom:any) {
    this.socket.emit('numUsers', selRoom);
  }

  getNumUsers(next:any) {
    this.socket.on('numUsers', res=>next(res));
  }

  reqRoomList() {
    this.socket.emit('roomList', 'list please');
  }

  getRoomList(next:any) {
    this.socket.on('roomList', res=>next(res));
  }

  notice(next:any) {
    this.socket.on('notice', res=>next(res));
  }

  getMessage (next: any) {
    this.socket.on('message', message=>next(message));
  }

  sendMessage(message: any):void {
    this.socket.emit('message', message);
  }

}
