import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  constructor(private http: HttpClient) { }

  // API Route to get list of all users.
  getuserlist(): Observable<any>{
    return this.http.get('http://localhost:3000/users/users')
  }

  // API Route to get list of all groups.
  getgrouplist(): Observable<any>{
    return this.http.get('http://localhost:3000/groups/groups')
  }

  // API Route to get specific group details.
  getgroup(groupId): Observable<any>{
    return this.http.get(`http://localhost:3000/groups/group/${groupId}`)
  }

  // API Route to get users within group.
  getgroupusers(groupId): Observable<any>{
    return this.http.get(`http://localhost:3000/groups/groupusers/${groupId}`)
  }

  // API Route to get specific user details.
  getuser(userId): Observable<any>{
    return this.http.get(`http://localhost:3000/users/user/${userId}`)
  }

  // API Route to get rooms within group.
  getrooms(groupId): Observable<any>{
    return this.http.get(`http://localhost:3000/groups/room/${groupId}`)
  }

  // API Route to create new group.
  createGroup(group): Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/groups/add', group, {headers: headers})
  }

  // API Route to create new room within group.
  createRoom(room): Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/groups/room', room, {headers: headers})
  }

  // API Route to assign user to group.
  assign(usergroup): Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/assign', usergroup, {headers: headers})
  }

  // API Route to remove user from group.
  unassign(userGroupId): Observable<any>{
    return this.http.delete(`http://localhost:3000/users/${userGroupId}`)
  }

  // API Route to delete group.
  deleteGroup(groupId): Observable<any>{
    return this.http.delete(`http://localhost:3000/groups/group/${groupId}`)
  }
  
  // API Route to delete user.
  deleteUser(userId): Observable<any>{
    return this.http.delete(`http://localhost:3000/users/user/${userId}`)
  }

}
