import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private http: HttpClient) { }

  adduser(user:User){
    return this.http.post<any>('http://localhost:3000/api/adduser', user);
  }

  getuserlist(){
    return this.http.get<any>('http://localhost:3000/api/getuserlist');
  }

  getuser(userID: any){
    return this.http.post<any>('http://localhost:3000/api/getuser', {'userid':userID});
  }

  updateuser(user:User){
    return this.http.post<any>('http://localhost:3000/api/updateuser', user);
  }

  deleteuser(userID: number){
    return this.http.post<any>('http://localhost:3000/api/deleteuser', {'userid':userID});
  }

  checkvalidid(userID: number){
    return this.http.post<any>('http://localhost:3000/api/checkvalidid', {'id':userID});
  }

  getusercount(){
    return this.http.get<any>('http://localhost:3000/api/usercount');
  }

}
