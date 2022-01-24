import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface Marcador{
  color:string;
  marker?:mapboxgl.Marker;
  center?:[number, number];
};

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .list-group{
      position:fixed;
      top:20px;
      right:20px;
      z-index:99;
    }
    li{
      cursor:pointer;
    }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!:mapboxgl.Map;
  zommlevel:number = 14;
  center:[number, number]=[-72.366161, 5.322844];

  marcadores:Marcador[] = [];

  constructor() { }


  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zommlevel
    });

    this.leerlocalStorage();
    
  }

  addMarker(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const marker = new mapboxgl.Marker({draggable:true,color}).setLngLat(this.center).addTo(this.mapa);
    this.marcadores.push({
      color,
      marker
    })
    this.guardarMarcadoresLocalStorage();
    marker.on('dragend', ()=>{
      this.guardarMarcadoresLocalStorage()
    })
  }
  irMarcador(marker:mapboxgl.Marker ){
    this.mapa.flyTo({
      center:marker.getLngLat(),
      zoom:20
    });
    // console.log()
  }
  guardarMarcadoresLocalStorage(){
    const lngArr: Marcador[] = [];
    this.marcadores.forEach((data)=>{
      const color = data.color;
      const {lat,lng} = data.marker!.getLngLat();
      lngArr.push({color, center:[lng,lat]})
    })
    localStorage.setItem('markers', JSON.stringify(lngArr));
  }
  leerlocalStorage(){
    if(!localStorage.getItem('markers')){return;}
    const markers:Marcador[] = JSON.parse(localStorage.getItem('markers')!);
    markers.forEach((data)=>{

      const marker = new mapboxgl.Marker({draggable:true,color:data.color}).setLngLat(data.center!).addTo(this.mapa);

      this.marcadores.push({
        marker,
        color:data.color
      })

      marker.on('dragend', ()=>{
        this.guardarMarcadoresLocalStorage()
      })

    })
  }
  borrarMarcador(i:number){
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i,1);
    this.guardarMarcadoresLocalStorage();
  }
}
