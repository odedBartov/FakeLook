import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendsApiService {

  friendsUrl: string = "http://localhost:3000/freinds";
  constructor(private httpClient:HttpClient) {
  }

  addFriend(username:string): Observable<any> {
    return this.httpClient.post<any>(`${this.friendsUrl}/addFriend`, username);
  }

  removeFriend(username:string): Observable<any> {
    return this.httpClient.delete<any>(`${this.friendsUrl}/removeFriend/${username}`);
  }

}
