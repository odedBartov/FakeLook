import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoWindowService {
  windows = [];
  constructor() { }

  getWindow(postId){
    if (this.windows[postId]){
      return this.windows[postId]
    }
    else{
      return undefined
    }
  }

  setWindow(postId, infoWindow){
    this.windows[postId] = infoWindow
  }

  deleteWindow(postId){
    this.windows[postId] = null;
  }
}
