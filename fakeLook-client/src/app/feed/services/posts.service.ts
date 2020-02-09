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
  constructor(private httpService: HttpService) { 
    this.posts = new Subject<PostModel[]>();
  }

   getPostsList(){     
     return this.posts;
  }

  UpdatePosts(filters: FilterModel){
  this.httpService.getPosts(filters).then(res => {
    this.posts.next(filters.radius? [] : res);
  })
  }

  publishPost(post){
    this.httpService.publishPost(post);
  }
}
