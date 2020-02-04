import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { postModel } from '../models/postModel';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  posts: postModel[];
  constructor(private httpClient: HttpClient) { }

  getPosts(){

  }
}
