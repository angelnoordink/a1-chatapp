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

  // getProfile(): Observable<any>{
  //   this.loadToken();
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': this.authToken
  //   });
  //   return this.http.get('http://localhost:3000/users/profile', {headers: headers})
  // }

  // updateuser(user:User){
  //   return this.http.post<any>('http://localhost:3000/api/updateuser', user);
  // }

  // deleteuser(userID: number){
  //   return this.http.post<any>('http://localhost:3000/api/deleteuser', {'userid':userID});
  // }

  // getusercount(){
  //   return this.http.get<any>('http://localhost:3000/api/usercount');
  // }

}
