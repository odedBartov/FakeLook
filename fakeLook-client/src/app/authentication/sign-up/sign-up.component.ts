import { Component, OnInit } from '@angular/core';

import { HttpService } from "../services/http-service.service"
import { NavigatorService } from "../../shared/navigator.service"

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userName: string = '';
  password: string = '';
  email: string = '';
  constructor(private httpService: HttpService, private navigatorService: NavigatorService) { }

  ngOnInit() {
  }

  signUp(){
    if (!this.userName || !this.password || !this.email) {
      alert("Fill  all the fields!")
    }
    else{
      this.httpService.SignUp(this.userName, this.password, this.email).subscribe(res => {
        alert("New user created successfuly")
        this.goBack();
      }, error => {        
        alert(error.message + "\n\n" + error.error.message)
      })
    }
  }

  goBack(){
    this.navigatorService.navigateToLogin();
  }
}
