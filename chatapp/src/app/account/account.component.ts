import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  // userlogin = localStorage.getItem('userlogin');
  username = localStorage.getItem('username');
  userbirthdate = localStorage.getItem('userbirthdate');
  userage = localStorage.getItem('userage');


  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

}
