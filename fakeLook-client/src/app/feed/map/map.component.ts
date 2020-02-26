// ///<reference types="@types/googlemaps" />
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject, OnDestroy, ComponentRef, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { PostModel } from '../models/postModel'
import { PostsService } from '../services/posts.service'
//import {} from '@types/googlemaps';
import { } from "googlemaps";
import { MapsAPILoader } from '@agm/core';
//import { DOCUMENT } from '@angular/common';
import { FilterModel } from '../filters/filter/models/filterModel';
import { InfoWindowComponent } from './info-window/info-window.component';
import { postToShow } from '../models/postToShow';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  postsCountToPin = 3;
  latitude = 0;
  longitude = 0;
  radius = 15;
  posts: postToShow[];
  markers = [];
  coordinates;
  mapOptions;
  map;
  postsSubscription;
  compRef: ComponentRef<InfoWindowComponent>;

  constructor(
    // @Inject(DOCUMENT) private document,
    private postService: PostsService,
    private mapsAPILoader: MapsAPILoader,
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.coordinates = new google.maps.LatLng(this.postService.currentLatitude, this.postService.currentLongitude);
      this.mapOptions = {
        center: this.coordinates,
        zoom: 6
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
    this.postsSubscription = this.postService.getPostsList().subscribe((res: postToShow[]) => {
      this.clearMarkers();
      this.posts = res;
      this.posts.forEach(post => {
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(post.latitude, post.longitude),
          map: this.map,
          icon: this.getIcon(post.imageSrc)
        });
        marker.addListener('click', () => {
          const infowindow = new google.maps.InfoWindow({ content: this.getInfoWindow(post.postId) });
          infowindow.open(this.map, marker);
        });
        this.markers.push(marker);
      });

    })
    this.postService.UpdatePosts(new FilterModel);
  }

  getIcon(url) {
    var icon;
    if (this.posts.length > this.postsCountToPin) {
      icon = {
        path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
        fillColor: '#FFBC3B',
        fillOpacity: 1,
      }
    }
    else {
      icon = {
        url: url,
        scaledSize: new google.maps.Size(100, 70)
      }
    }    
    return icon;
  }

  getInfoWindow(postId: string) {
    const compFactory = this.resolver.resolveComponentFactory(InfoWindowComponent);
    this.compRef = compFactory.create(this.injector);
    this.compRef.instance.postId = postId;
    this.appRef.attachView(this.compRef.hostView);
    let div = document.createElement('div');
    div.appendChild(this.compRef.location.nativeElement);
    return div;
  }

  clearMarkers() {
    this.markers.forEach(marker => {
      marker.setMap(null);
    })
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
