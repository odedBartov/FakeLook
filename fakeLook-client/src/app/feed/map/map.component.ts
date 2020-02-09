///<reference types="@types/googlemaps" />
import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { PostModel } from '../models/postModel'
import { PostsService } from '../services/posts.service'
//import {} from '@types/googlemaps';
import { } from "googlemaps";
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChildren('map') public mapChildren;
  @ViewChildren('marker') mark: QueryList<any>;
  latitude = 0;
  longitude = 0;
  radius = 15;
  posts: PostModel[];
  size;

  constructor(private postService: PostsService, private mapsAPILoader: MapsAPILoader) { }

  ngOnInit() {
    this.centerMap();
    this.initPosts();
  }

  ngAfterViewInit() {
    // this.mapsAPILoader.load().then(() => {

    // var latlng = new google.maps.LatLng(32.115, 34.835);
    // var myOptions = {
    //     zoom: 8,
    //     center: latlng,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // };


    // const map = new google.maps.Map(this.mapChildren.first._elem.nativeElement, myOptions);
    // const mark = new google.maps.Marker({icon: this.getIcon(), position: {lat: 32.11, lng: 34.83}, map: map})
    // mark.setMap(map);
    // })
  }


  initPosts() {
    this.postService.getPostsList().subscribe(res => {
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
