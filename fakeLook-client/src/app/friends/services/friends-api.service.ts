import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/authentication/services/http-service.service';
import { environment } from 'src/environments/environment.prod';
import { GenericHttpService } from 'src/app/shared/generic-http.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsApiService {

  currentApi: string = `friends/`;
  constructor(private httpService:GenericHttpService) {
  }

  addFriend(username): Observable<any> {
   return this.httpService.postWithHeaders(`${this.currentApi}addFriend`,username);
  }

  removeFriend(friendId): Observable<any> {
    return this.httpService.deleteWithHeaders(`${this.currentApi}removeFriend/${friendId}`);
  }

  getFriends(): Observable<any> {
    return this.httpService.getWithHeaders(`${this.currentApi}getFriends`);
  }

}
