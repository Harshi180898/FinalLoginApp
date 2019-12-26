import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DataService } from '../data.service' ;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] ,
  providers: [ DataService ]
})
export class HomeComponent implements OnInit {

  user$: Object;
  @Input() userId ;

  constructor(private data: DataService, private router: Router,private login: LoginComponent) { }

  ngOnInit() {
    this.userId = this.login.returnId() ,
    this.data.getUsers(this.userId+'/').subscribe(
      data => this.user$ = data
    );
  }

  userDisplay(){
    console.log(this.user$) ;
  }

  backtoLogin(){
    this.router.navigate(['../']);
  }

}
