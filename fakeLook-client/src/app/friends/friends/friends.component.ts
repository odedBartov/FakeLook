import { Component, OnInit } from '@angular/core';
import { FriendsApiService } from '../services/friends-api.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  public currentUsername: string;
  public error: string;
  constructor(private freindsApi: FriendsApiService) { }

  ngOnInit() {
  }

  //add freind to the active user
  addFreind() {//?
    this.freindsApi.addFriend(this.currentUsername).subscribe(data => {

    })
  }

  //remove freind to the active user
  removeFriend() {//?
    this.freindsApi.removeFriend(this.currentUsername).subscribe(data => {

    })
  }

}
