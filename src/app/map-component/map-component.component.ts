import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css'],
})
export class MapComponentComponent implements AfterViewInit {
  map: any;

  constructor() {}

  ngAfterViewInit(): void {
    this.getMapData();
  }

  getMapData(): void {
    const saintPetersburg = {
      latitude: 59.939043,
      longitude: 30.314954,
    };

    const zoomLevel: number = 12;

    this.map = L.map('map', {
      center: [saintPetersburg.latitude, saintPetersburg.longitude],
      zoom: zoomLevel,
    });

    const mainLayer: any = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        minZoom: 12,
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );

    mainLayer.addTo(this.map);
    const marker: any = L.marker([
      saintPetersburg.latitude,
      saintPetersburg.longitude,
    ]).addTo(this.map);
  }
}
