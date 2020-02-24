import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendsApiService {

  friendsUrl: string = "http://localhost:1000/friends";
  constructor(private httpClient:HttpClient) {

  }

  addFriend(username): Observable<any> {
    return this.httpClient.post<any>(`${this.friendsUrl}/addFriend`, username);
  }

  removeFriend(friendId): Observable<any> {
    return this.httpClient.delete<any>(`${this.friendsUrl}/removeFriend/${friendId}`);
  }

  getFriends(): Observable<any> {
    return this.httpClient.get<any>(`${this.friendsUrl}/getFriends`);
  }

}
