import { Injectable } from '@angular/core';
import { PostModel } from '../models/postModel';
import { HttpService } from 'src/app/feed/services/http.service';
import { Subject } from 'rxjs';

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

  UpdatePosts(filters){
  this.httpService.getPosts().then(res => {
    this.posts.next(res);
  })
  }
}
