// ///<reference types="@types/googlemaps" />
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject, OnDestroy } from '@angular/core';
import { PostModel } from '../models/postModel'
import { PostsService } from '../services/posts.service'
//import {} from '@types/googlemaps';
import { } from "googlemaps";
import { MapsAPILoader } from '@agm/core';
import { DOCUMENT } from '@angular/common';
import { FilterModel } from '../filters/filter/models/filterModel';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  latitude = 0;
  longitude = 0;
  radius = 15;
  posts: PostModel[];
  markers = [];
  coordinates;
  mapOptions;
  map;
  postsSubscription;

  constructor(
    @Inject(DOCUMENT) private document,
    private elementRef: ElementRef,
    private postService: PostsService,
    private mapsAPILoader: MapsAPILoader,
  ) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.coordinates = new google.maps.LatLng(this.postService.currentLatitude, this.postService.currentLongitude);
      this.mapOptions = {
        center: this.coordinates,
        zoom: 12
      };
      this.mapInitializer();
      this.initPosts();
    });
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);

    const marker = new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
      label: 'You'
    });
  }

  initPosts() {
    this.postsSubscription = this.postService.getPostsList().subscribe(res => {
      this.posts = res;
      this.posts.forEach(post => {
        const infowindow = new google.maps.InfoWindow({ content: this.getInfoWindow(post) });
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(post.latitude, post.longitude),
          map: this.map,
          icon: this.getIcon(post.imageSrc)
        });
        marker.addListener('click', function () {
          infowindow.open(this.getMap(), marker);
        });
        this.markers.push(marker);
      });
    })
    this.postService.UpdatePosts(new FilterModel);
  }

  getIcon(url) {
    const icon = {
      url: url,
      scaledSize: new google.maps.Size(90, 70)
    }
    return icon;
  }

  getInfoWindow(post: PostModel) {
    var contentString = `<img style="height: 160px;" src="${post.imageSrc}"/>
        <h4>${post.text}</h4></br>
        <h6>`;
    if (post.imageTags) {
      for (let index = 0; index < post.imageTags.length; index++) {
        const element = post.imageTags[index];
        contentString += element + (index < post.imageTags.length - 1 ? ', ' : ' ');
      }
      contentString += '</h6><h6>';
    }
    if (post.taggedUsers) {
      for (let index = 0; index < post.taggedUsers.length; index++) {
        const element = post.taggedUsers[index];
        contentString += element + (index < post.taggedUsers.length - 1 ? ', ' : ' ');
      }
    }
    contentString += '</h6>';
    return contentString;
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
