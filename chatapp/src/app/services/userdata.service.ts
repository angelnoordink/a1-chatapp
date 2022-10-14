import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  constructor(private http: HttpClient) { }

  getuserlist(): Observable<any>{
    return this.http.get('http://localhost:3000/users/users')
  }

  getgrouplist(): Observable<any>{
    return this.http.get('http://localhost:3000/groups/groups')
  }

  getgroup(groupId): Observable<any>{
    return this.http.get(`http://localhost:3000/groups/group/${groupId}`)
  }

  getgroupusers(groupId): Observable<any>{
    return this.http.get(`http://localhost:3000/groups/groupusers/${groupId}`)
  }

  getuser(userId): Observable<any>{
    console.log("Test")
    return this.http.get(`http://localhost:3000/users/user/${userId}`)
  }

  getrooms(groupId): Observable<any>{
    return this.http.get(`http://localhost:3000/groups/room/${groupId}`)
  }

  createGroup(group): Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/groups/add', group, {headers: headers})
  }

  createRoom(room): Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/groups/room', room, {headers: headers})
  }

  assign(usergroup): Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/assign', usergroup, {headers: headers})
  }

  unassign(userGroupId): Observable<any>{
    return this.http.delete(`http://localhost:3000/users/${userGroupId}`)
  }

  deleteGroup(groupId): Observable<any>{
    return this.http.delete(`http://localhost:3000/groups/group/${groupId}`)
  }

}
