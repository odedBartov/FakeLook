import { Component, OnInit } from '@angular/core';

import { HttpService } from "../services/http-service.service"
import { NavigatorService } from "../../utils/navigator.service"

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userName: string = 'oded';
  password: string = '12';
  email: string = 'bla@gmail.com';
  constructor(private httpService: HttpService, private navigatorService: NavigatorService) { }

  ngOnInit() {
  }

  signUp(){
    if (!this.userName || !this.password || !this.email) {
      alert("Fill  all the fields!")
    }
    else{
      this.httpService.SignUp(this.userName, this.password, this.email).subscribe(res => {
        this.navigatorService.navigateToFeed();
      }, error => {
        alert(error.message + "\n\n" + error.error)
      })
    }
  }

  goBack(){
    this.navigatorService.navigateToLogin();
  }
}
