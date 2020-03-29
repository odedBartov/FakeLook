import { Injectable } from '@angular/core';
import { PostModel } from '../models/postModel';
import { HttpService } from 'src/app/feed/services/http.service';
import { Subject } from 'rxjs';
import { FilterModel } from '../filters/filter/models/filterModel';
import { postToUpload } from '../models/postToUpload';
import { postToShow } from '../models/postToShow';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Subject<postToShow[]>;
  currentLatitude = 33;
  currentLongitude = 33;
  currentFeed = 'map';

  constructor(private httpService: HttpService) {
    navigator.geolocation.getCurrentPosition(pos => {
      this.currentLatitude = pos.coords.latitude;
      this.currentLongitude = pos.coords.longitude;
    })
    this.posts = new Subject<postToShow[]>();
  }

  getPostsList() {
    return this.posts;
  }
  
  getPost(postId: string){
    return this.httpService.getPost(postId);
  }

  UpdatePosts(filter: FilterModel) {
    filter.latitude = this.currentLatitude;
    filter.longitude = this.currentLongitude;
    this.httpService.getPosts(filter).subscribe((res: PostModel[]) => {      
      this.posts.next(res);
    })
  }

  publishPost(post: postToUpload, image) {
    post.location = {lat: this.currentLatitude + Math.random()*3 - 1, lon:this.currentLongitude + Math.random()*3 - 1};
    //buffer for check. to remove

    const formData = new FormData();
    formData.append('image', image);
    formData.append('post', JSON.stringify(post));    
    return this.httpService.publishPost(formData);
  }

  likePost(postId){
    return this.httpService.likePost(postId);
  }

  checkIfLikedPost(postId){
    return this.httpService.checkIfLikedPost(postId);
  }

  publishComment(comment){
    return this.httpService.publishComment(comment);
  }

  likeComment(commentId){

  }
}

