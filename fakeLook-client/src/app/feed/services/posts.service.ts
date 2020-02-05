import { Injectable } from '@angular/core';
import { PostModel } from '../models/postModel';
import { HttpService } from 'src/app/feed/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  posts: PostModel[];
  constructor(private httpService: HttpService) { 
  }

   getPosts(filters){     
    return this.httpService.getPosts();
  }
}
