///<reference types="@types/googlemaps" />
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PostModel } from '../models/postModel'
import { PostsService } from '../services/posts.service'
//import {} from '@types/googlemaps';
import {} from "googlemaps";
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('', {static: false}) map;
  latitude = 0;
  longitude = 0;
  radius = 15;
  posts: PostModel[];
  size;

  constructor(private postService: PostsService, private mapsAPILoader: MapsAPILoader) { }

  ngOnInit() {
    this.centerMap();
    this.initPosts();
    
    this.mapsAPILoader.load().then(() => {
      this.size = new google.maps.Size(120, 120);
    })
  }
  

  initPosts() {
    this.postService.getPosts({}).then(res => {    
      this.posts = res;
     });
  }

  centerMap() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.longitude = pos.coords.longitude;
      this.latitude = pos.coords.latitude;
    });
  }

  getIcon() {
    return 'https://media.wired.com/photos/5e1e646743940d0008009167/master/pass/Science_Cats-84873657.jpg';
    // const icon = {
    //   url: 'https://media.wired.com/photos/5e1e646743940d0008009167/master/pass/Science_Cats-84873657.jpg',
    //   scaledSize: {
    //     height: 100,
    //     width: 100
    //   }
    // }
    // return icon;
  }
}
