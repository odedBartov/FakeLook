import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from '../models/postModel';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  posts: PostModel[];
  constructor(private httpClient: HttpClient) { }

  getPosts() {
    return new Promise<PostModel[]>((res, rej) => {
      setTimeout(() => {
        const p1 = new PostModel();
        p1.imageSrc = 'https://media.wired.com/photos/5e1e646743940d0008009167/master/pass/Science_Cats-84873657.jpg';
        p1.imageTags = ['cat', 'cute', 'grumpy'];
        p1.publishDate = new Date();
        p1.publisherName = 'oded';
        p1.text = 'watch my cat!';
        p1.latitude = '32.11';
        p1.longitude = '34.83';
        this.posts = [p1];
        res(this.posts);
      }, 10);
    })
  }
}
