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
  /*   public selectedFriend:Friend = new Friend(); */
  constructor(private freindsApi: FriendsApiService) {
    freindsApi.getFriends().subscribe(data => {
      console.log(data)
      this.friends = data
    })

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
    this.freindsApi.removeFriend(friend.userId).subscribe(data => {
      if (data.success) {
        this.friends = this.friends.filter(f => f.userId !== friend.userId);
      }
      else {

      }
    })
    /*     this.freindsApi.removeFriend(this.currentUsername).subscribe(data => {
    
        }) */
  }

  /*   onSelect(friend: Friend): void {
      /*     this.selectedFriend = friend; */
  /*     console.log(friend)
    } */


}
