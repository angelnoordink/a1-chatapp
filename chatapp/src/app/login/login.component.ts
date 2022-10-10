import { Component, createPlatform, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    
  }

  submit(){
    let user = {username: this.username, pwd: this.password};
    this.httpClient.post(BACKEND_URL + '/login', user)
    .subscribe((data:any)=>{
      alert("posting: " +JSON.stringify(user));
      alert("postRes: " +JSON.stringify(data));
      if (data.ok){
        alert("correct");
        localStorage.setItem('userid', data.userid.toString());
        localStorage.setItem('userlogin', data.ok.toString());
        localStorage.setItem('username', data.username);
        localStorage.setItem('role', data.role);
        localStorage.setItem('email', data.email.toString());
        
        let groups: any = [];

        localStorage.setItem("data", JSON.stringify(data));

        data.groups.forEach((group:any) => {
          groups.push({group_id: group.group_id, group_name: group.group_name, rooms: group.rooms});
        });
        localStorage.setItem("groups", JSON.stringify(groups));
        
        this.router.navigateByUrl("");
      }
      else { alert("username or password incorrect");}
    })
  }
  
}

