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

  socket = io('http://localhost:3000/chat');

  
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

  reqRoomList(rooms:any) {
    this.socket.emit('roomList', (res: any)=>rooms(res));
  }

  getRoomList(next:any) {
    this.socket.on('roomList', res=>next(res));
  }

  getGroups(data:any) {
    this.socket.on('getGroups', res=>data(res));
  }

  notice(next:any) {
    this.socket.on('notice', res=>next(res));
  }

  getMessage () {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });

    return this.message$.asObservable();
  }

  sendMessage(message: string):void {
    this.socket.emit('message', message);
  }

}
