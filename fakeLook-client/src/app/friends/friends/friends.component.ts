import { Component, OnInit } from '@angular/core';
import { FriendsApiService } from '../services/friends-api.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  public currentUsername: string;
  public msg: string = "hgs";
  constructor(private freindsApi: FriendsApiService) { }

  ngOnInit() {
  }

  //add freind to the active user
  addFriend() {
    this.freindsApi.addFriend({ friendUsername: this.currentUsername }).subscribe(data => {
      console.log(data.success)
      if (data.success) {
        this.msg = "The friend been added successfully"
      }
      else {
        this.msg = data.errorMsg;
      }
    })
  }

  //remove freind to the active user
  removeFriend() {//?
    this.freindsApi.removeFriend(this.currentUsername).subscribe(data => {

    })
  }

}
