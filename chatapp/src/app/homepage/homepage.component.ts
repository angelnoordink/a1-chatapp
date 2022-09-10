import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

const BACKEND_URL = 'http://localhost:3000';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  newGroup: string = '';
  groupList: any;
  groupString: any;

  constructor(
    private browserAnimationsModule: BrowserAnimationsModule,
    private router: Router,
    private matCardModule: MatCardModule,
    private matToolbarModule: MatToolbarModule,
    private matButtonModule: MatButtonModule,
    private flexLayoutModuleformBuilder: FlexLayoutModule,
    private httpClient: HttpClient,
    private chatService: ChatService
    ) { 
      this.groupString = localStorage.getItem('groups');
      this.groupList = JSON.parse(this.groupString);
    }

  ngOnInit(): void {
  }

  onSelect(group_id:any){
    this.router.navigate(['/chat', group_id]);
    // console.log(typeof(group_id));
  }

}
