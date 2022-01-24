import { Component, OnInit } from '@angular/core';
// import mapboxgl from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

   

    var map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-72.366161, 5.322844],
      zoom: 18
    });
  }

}
