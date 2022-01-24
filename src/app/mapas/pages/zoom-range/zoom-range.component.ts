import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
  
  .row{
    background-color:white;
    position:fixed;
    bottom:56px;
    left:50px;
    z-index:999;
    width:450px;
  }
  `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy{
  @ViewChild('mapa') divMapa!: ElementRef
  mapa!:mapboxgl.Map;
  zommlevel:number = 18;
  center:[number, number]=[-72.366161, 5.322844]
  constructor() { }
  ngOnDestroy(): void {
    this.mapa.off('zomm',()=>{});
    this.mapa.off('zoomend',()=>{});
    this.mapa.off('move',()=>{});
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zommlevel
    });

    this.mapa.on('zoom', evt =>{
      const zoom = this.mapa.getZoom();
      this.zommlevel = zoom;
    });
    this.mapa.on('zoomend', evt =>{
      if(this.mapa.getZoom() > 18){
        this.mapa.zoomTo(18)
      }
    });

    this.mapa.on('move',evt =>{
      const {lng, lat} = evt.target.getCenter();
      this.center = [lng, lat]
    });

  }

  zoomOut(){
    this.mapa.zoomOut()
  }
  zoomIn(){
    this.mapa.zoomIn()
  }
  zoomCambio(valor:string){
    this.mapa.zoomTo(Number(valor));
  }

}
