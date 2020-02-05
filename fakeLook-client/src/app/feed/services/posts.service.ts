import { Injectable } from '@angular/core';
import { PostModel } from '../models/postModel';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  posts: PostModel[];
  constructor() { 
    this.initPosts();
  }

  getPosts(filters){
    return this.posts;
  }

  initPosts(){
    const p1 = new PostModel();
    p1.imageSrc = 'https://media.wired.com/photos/5e1e646743940d0008009167/master/pass/Science_Cats-84873657.jpg';
    p1.imageTags = ['cat', 'cute', 'grumpy'];
    p1.publishDate = new Date();
    p1.publisherName = 'oded';
    p1.text = 'watch my cat!';
    p1.latitude = '32.11';
    p1.longitude = '34.83';

    this.posts = [p1];
  }
}
