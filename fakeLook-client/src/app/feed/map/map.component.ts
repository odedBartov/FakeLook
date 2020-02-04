import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  latitude = 0;
  longitude = 0;
  constructor() { }

  ngOnInit() {

    navigator.geolocation.getCurrentPosition( pos => {
      this.longitude = pos.coords.longitude;
      this.latitude = pos.coords.latitude;
      console.log(pos.coords.longitude)
      console.log(pos.coords.latitude)
    });
  }
}
