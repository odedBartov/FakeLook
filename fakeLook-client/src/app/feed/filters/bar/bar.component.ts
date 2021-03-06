import { Component, OnInit } from '@angular/core';

import { NavigatorService } from "../../../shared/navigator.service"

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  constructor(private navigatorService: NavigatorService) { }

  ngOnInit() {
  }

  goToPublishPost(){
    this.navigatorService.navigateToPublishPost();
  }

  goToFriends(){
    this.navigatorService.navigateToFriends();
  }

  goToScrollFeed(){
    this.navigatorService.navigateToScrollFeed();
  }
}
