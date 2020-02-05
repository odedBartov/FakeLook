import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from '../models/postModel';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  posts: PostModel[];
  constructor(private httpClient: HttpClient) { }

  getPosts(){

  }
}
