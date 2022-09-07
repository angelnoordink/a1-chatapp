import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  newGroup: string = '';
  
  groupList = [
    {"groupCode": "1007ICT", "groupName": "Computer Systems and Networks"},
    {"groupCode": "1701ICT", "groupName": "Creative Coding"},
    {"groupCode": "2807ICT", "groupName": "Programming Principles"},
    {"groupCode": "2703ICT", "groupName": "Web Application Development"},
    {"groupCode": "2808ICT", "groupName": "Information and Security Management"},
    {"groupCode": "3702ICT", "groupName": "Games Development"},
    {"groupCode": "3813ICT", "groupName": "Software Frameworks"},
    {"groupCode": "3822ICT", "groupName": "Work Integrated Learning - Placement"},
  ];


  constructor(
    private browserAnimationsModule: BrowserAnimationsModule,
    private matCardModule: MatCardModule,
    private matToolbarModule: MatToolbarModule,
    private matButtonModule: MatButtonModule,
    private flexLayoutModuleformBuilder: FlexLayoutModule
    ) { }

  ngOnInit(): void {
  }

}
