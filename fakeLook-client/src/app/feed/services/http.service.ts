import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostModel } from '../models/postModel';
import { FilterModel } from '../filters/filter/models/filterModel';
import { environment } from 'src/environments/environment.prod';
import { tap } from 'rxjs/operators';
import { NavigatorService } from 'src/app/shared/navigator.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  posts: PostModel[];
  currentAPI = 'posts/';
  constructor(private httpClient: HttpClient, private navigatorService: NavigatorService) {
  }

  private getWithHeaders(url) {
    const tokenHeader = new HttpHeaders({ 'access-token': environment.secretToken });
    return this.httpClient.get(environment.URL + this.currentAPI + url, { headers: tokenHeader })
      .pipe(tap(res => {
      }, err => {
        alert(err.error);
        if (err.status == 403) {
          this.navigatorService.navigateToLogin();
        }
      }));
  }

  private postWithHeaders(url, body) {
    const tokenHeader = new HttpHeaders({ 'access-token': environment.secretToken });
    return this.httpClient.post(environment.URL + this.currentAPI + url, body, { headers: tokenHeader })
      .pipe(tap(res => {
      }, err => {
        alert(err.error);
        if (err.status == 403) {
          this.navigatorService.navigateToLogin();
        }
      }));
  }

  getPosts(filters: FilterModel) {
    return this.postWithHeaders('getPosts', filters);
  }

  getPost(postId: string) {
    return this.getWithHeaders(`getPost?postId=${postId}`);
  }

  publishPost(formData) {
    return this.postWithHeaders('publishPost', formData);
  }

  likePost(postId) {
    return this.getWithHeaders(`likePost?postId=${postId}`);
  }

  checkIfLikedPost(postId) {
    return this.getWithHeaders(`checkIfLikedPost?postId=${postId}`);
  }

  publishComment(comment) {    
    return this.postWithHeaders(`publishComment`, comment);
  }
}
