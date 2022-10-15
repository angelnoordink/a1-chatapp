import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) { }

  // API Route to Create/Register User.
  registerUser(user): Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
  }

  // API Route to authenticate user by checking validity of details in database.
  authenticateUser(user): Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
  }

  // API Route to get logged in user details from auth token.
  getProfile(): Observable<any>{
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authToken
    });
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
  }

  // Store logged in data in local storage.
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // Get auth token from local storage.
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // Checks if auth token active or expired.
  loggedIn(){
    this.loadToken();
    return !this.jwtHelper.isTokenExpired(this.authToken);
  }

  // Log out current user and clear all local storage.
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // API Route to Update user details.
  updateUser(user, userId): Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.patch(`http://localhost:3000/users/user/${userId}`, user, {headers: headers})
  }
}
