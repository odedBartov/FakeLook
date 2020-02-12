import { Injectable } from '@angular/core';
import { PostModel } from '../models/postModel';
import { HttpService } from 'src/app/feed/services/http.service';
import { Subject } from 'rxjs';
import { FilterModel } from '../filters/filter/models/filterModel';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Subject<PostModel[]>;
  currentLatitude;
  currentLongitude;

  constructor(private httpService: HttpService) {
    navigator.geolocation.getCurrentPosition(pos => {
      this.currentLatitude = pos.coords.latitude;
      this.currentLongitude = pos.coords.longitude;
    })
    this.posts = new Subject<PostModel[]>();
  }

  getPostsList() {
    return this.posts;
  }

  UpdatePosts(filter: FilterModel) {
    filter.latitude = this.currentLatitude;
    filter.longitude = this.currentLongitude;
    this.httpService.getPosts(filter).subscribe((res: PostModel[]) => {
      this.posts.next(res);
    })
  }

  publishPost(post: PostModel, image) {
    post.latitude = this.currentLatitude;
    post.longitude = this.currentLongitude;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('post', JSON.stringify(post));    
    return this.httpService.publishPost(formData);
  }
}

