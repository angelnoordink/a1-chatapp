import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  // userlogin = sessionStorage.getItem('userlogin');
  username = sessionStorage.getItem('username');
  userbirthdate = sessionStorage.getItem('userbirthdate');
  userage = sessionStorage.getItem('userage');


  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

}
