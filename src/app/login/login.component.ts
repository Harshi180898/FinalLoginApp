import { Component, OnInit, Input, Output , EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs'
import { NgForOf } from '@angular/common';
import { $ } from 'protractor';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { userInfo } from 'os';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] ,
  providers: [ DataService ]
})
export class LoginComponent implements OnInit {

  user='';
  pwd='';
  users$: Object;
  success: boolean;
  @Output() userFound = new EventEmitter() ;
  id: number;
  
  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.data.getUsers('').subscribe(
      data => this.users$ = data
    );
  }
  
  enter(){
    for (let i = 0; i < 9 ; i++) {
      if(this.user == this.users$[i].username && this.pwd == this.users$[i].username ){
        this.success = true ;
        this.id = this.users$[i].id ;
        this.userFound.emit(this.id) ;
    }
    
    }
    if(this.success)
    {
      console.log("Done "+this.user+" ....You can goto home page now!!") ;
      console.log(this.id) ;
      this.success = false ;
      this.router.navigate(["./home"]) ;
    }

    else{
        alert("Invalid Credentials");
        console.log("Invalid Credentials");
        this.user='';
        this.pwd='';
    }
      
  }
    

}