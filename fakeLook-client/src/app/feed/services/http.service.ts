import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostModel } from '../models/postModel';
import { FilterModel } from '../filters/filter/models/filterModel';
import { environment } from 'src/environments/environment.prod';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  posts: PostModel[];
  currentAPI = 'posts/';
  tokenHeader = new HttpHeaders({ 'access-token': environment.secretToken });
  constructor(private httpClient: HttpClient) {
  }

  private getWithHeaders(url) {
    return this.httpClient.get(url, { headers: this.tokenHeader})
    .pipe(tap(res=>{
      
    },err => {

    }));    
  }

  private postWithHeaders(url, body) {
    return this.httpClient.post(url, body, { headers: this.tokenHeader });
  }

  getPosts(filters: FilterModel) {
    return this.postWithHeaders(`${environment.URL}${this.currentAPI}getPosts`, filters);
  }

  getPost(postId: string) {
    return this.getWithHeaders(`${environment.URL}${this.currentAPI}getPost?postId=${postId}`);
  }

  publishPost(formData) {
    return this.postWithHeaders(`${environment.URL}${this.currentAPI}publishPost`, formData);
  }

  likePost(postId) {
    return this.getWithHeaders(`${environment.URL}${this.currentAPI}likePost?postId=${postId}`);
  }

  checkIfLikedPost(postId) {
    return this.getWithHeaders(`${environment.URL}${this.currentAPI}checkIfLikedPost?postId=${postId}`);
  }
}
