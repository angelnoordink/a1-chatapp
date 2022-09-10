import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Userobj } from '../userobj';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userid = 0;
  username = "";
  userbirthdate = "";
  userage = 0;

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { 

    this.username = localStorage.getItem('username')!;
    this.userbirthdate = localStorage.getItem('userbirthdate')!;
    this.userage = Number(localStorage.getItem('userage'));
    this.userid = Number(localStorage.getItem('userid'));
  }

  ngOnInit(): void {
  }

  editFunc(){
    let userobj = {
      'userid': this.userid,
      'username': this.username, 
      'userbirthdate': this.userbirthdate, 
      'userage': this.userage
    }

    
    localStorage.setItem('username', this.username);
    localStorage.setItem('userbirthdate', this.userbirthdate);
    localStorage.setItem('userage', this.userage.toString());
    localStorage.setItem('userid', this.userage.toString());

    this.httpClient.post<Userobj[]>(BACKEND_URL + '/loginafter', userobj,  httpOptions)
      .subscribe((m: any) => {alert(JSON.stringify(m));});

    this.router.navigateByUrl("/account");
  }

}
