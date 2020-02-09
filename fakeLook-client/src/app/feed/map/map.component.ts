// ///<reference types="@types/googlemaps" />
import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList, ElementRef, Inject } from '@angular/core';
import { PostModel } from '../models/postModel'
import { PostsService } from '../services/posts.service'
//import {} from '@types/googlemaps';
import { } from "googlemaps";
import { MapsAPILoader } from '@agm/core';
import { environment } from 'src/environments/environment.prod';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  // @ViewChildren('map') public mapChildren;
  // @ViewChildren('marker') mark: QueryList<any>;
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  latitude = 32.11;
  longitude = 34.83;
  radius = 15;
  posts: PostModel[];
  coordinates;
  mapOptions;
  map;

  constructor(
    @Inject(DOCUMENT) private document,
    private elementRef: ElementRef,
    private postService: PostsService,
    private mapsAPILoader: MapsAPILoader,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initGoogleScript();
    this.mapsAPILoader.load().then(() => {
      this.initPosts();
      this.coordinates = new google.maps.LatLng(this.latitude, this.longitude);
      this.mapOptions = {
        center: this.coordinates,
        zoom: 14,
      };
      this.mapInitializer();
      this.centerMap();
    })
  }


  initPosts() {
    this.postService.getPostsList().subscribe(res => {
      this.posts = res;
      this.posts.forEach(post => {
        var infowindow = new google.maps.InfoWindow({ content: this.getInfoWindow(post) });
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(post.latitude, post.longitude),
          map: this.map,
          icon: this.getIcon(post.imageSrc)
        });
        marker.addListener('click', function () {
          infowindow.open(this.getMap(), marker);
        });
        marker.setMap(this.map);
      })
    });
  }

  centerMap() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.longitude = pos.coords.longitude;
      this.latitude = pos.coords.latitude;
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
    marker.setMap(this.map);
  }

  initGoogleScript() {
    const googleApiKey = 'AIzaSyDRU_ENlCIyblA3pyCHqoPoaAJhsaQGv98';
    // const googleApiKey = environment.googleAPi;
    const script = this.document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`;
    this.elementRef.nativeElement.appendChild(script);
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
}
