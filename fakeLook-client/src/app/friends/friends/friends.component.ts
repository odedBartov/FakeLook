import { Component, OnInit } from '@angular/core';
import { FriendsApiService } from '../services/friends-api.service';
import { Friend } from '../models/friend';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  public currentUsername: string;
  public msg: string = "";
  public friends: Friend[];
  public selectedFriend:Friend = new Friend();
  constructor(private freindsApi: FriendsApiService) {
    this.friends = []
    let friend1 = new Friend();
    friend1.username = "mushky";
    let friend2 = new Friend();
    friend2.username = "shmulik";
    this.friends.push(friend1);
    this.friends.push(friend2);

  }

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
  removeFriend(friend) {//?
    console.log(friend)
/*     this.freindsApi.removeFriend(this.currentUsername).subscribe(data => {

    }) */
  }
  onSelect(friend: Friend): void {
/*     this.selectedFriend = friend; */
    console.log(friend)
  }


}
