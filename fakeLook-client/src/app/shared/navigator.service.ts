import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {

  constructor(private router: Router) { }

  navigateToFeed(){
    this.router.navigateByUrl('feed')
  }

  navigateToSignUp(){
    this.router.navigateByUrl('signUp');
  }

  navigateToLogin(){
    this.router.navigateByUrl('login')
  }

  navigateToPublishPost(){
    this.router.navigateByUrl('publishPost');
  }

  navigateToFriends(){
    this.router.navigateByUrl('friends');
  }

  navigateToScrollFeed(){
    this.router.navigateByUrl('scrollFeed');
  }
}
