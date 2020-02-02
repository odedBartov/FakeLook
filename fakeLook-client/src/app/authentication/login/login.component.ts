import { Component, OnInit } from '@angular/core';

import { HttpService } from "../services/http-service.service"
import { NavigatorService } from "../../utils/navigator.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string = 'oded';
  password: string = '12';
  constructor(private httpService: HttpService, private navigatorService:NavigatorService) { }

  ngOnInit() {
  }

  login(){
    if (!this.userName || !this.password){
      alert("please type user name and password")
    }
    else{
       this.httpService.Login(this.userName, this.password).subscribe(res => {
         this.navigatorService.navigateToFeed();
       }, error => {       
        alert(error.message + "\n\n" + error.error)
       })
    }
  }

  signUp(){
    this.navigatorService.navigateToSignUp()
  }
}
