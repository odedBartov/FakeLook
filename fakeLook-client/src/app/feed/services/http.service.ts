import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from '../models/postModel';
import { FilterModel } from '../filters/filter/models/filterModel';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  posts: PostModel[];
  currentAPI = 'posts/';
  constructor(private httpClient: HttpClient) { }

  getPosts(filters: FilterModel) {    
    return this.httpClient.post(`${environment.URL}${this.currentAPI}getPosts`, filters);
  }

  getPost(postId: string){    
    return this.httpClient.get(`${environment.URL}${this.currentAPI}getPost?postId=${postId}`);
  }

  publishPost(formData){
      return this.httpClient.post(`${environment.URL}${this.currentAPI}publishPost`, formData);
  }

  likePost(postId){    
    return this.httpClient.get(`${environment.URL}${this.currentAPI}likePost?postId=${postId}`);
  }

  checkIfLikedPost(postId){
    return this.httpClient.get(`${environment.URL}${this.currentAPI}checkIfLikedPost?postId=${postId}`);
  }
}
