import { Component, OnInit } from '@angular/core';


interface Menu{
  ruta:string;
  nombre:string;
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
    li{cursor:pointer}
    `
  ]
})
export class MenuComponent {

  // constructor() { }
  menuItem:Menu[] = [
    {
      ruta:'/mapas/fullScreen',
      nombre:'FullScreen'
    },
    {
      ruta:'/mapas/zoom-range',
      nombre:'Range'
    },
    {
      ruta:'/mapas/marcadores',
      nombre:'Marcadores'
    },
    {
      ruta:'/mapas/propiedades',
      nombre:'Propiedades'
    },
  ]


}
