import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css'],
})
export class MapComponentComponent implements AfterViewInit, OnInit {
  map: L.Map;
  constructor(private itemsService: ItemsService) {}

  ngAfterViewInit(): void {
    this.getMapData();
  }

  ngOnInit(): void {
    this.getData();
  }

  getMapData(): void {
    const saintPetersburg = {
      latitude: 59.939043,
      longitude: 30.314954,
    };

    const zoomLevel = 11;

    this.map = new L.map('map', {
      center: [saintPetersburg.latitude, saintPetersburg.longitude],
      zoom: zoomLevel,
    });

    const mainLayer: any = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        minZoom: 11,
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );
    mainLayer.addTo(this.map);
  }

  getData(): void {
    this.itemsService.getJSON().subscribe((data) => {
      data.items.forEach((point) => {
        L.marker([point.latitude, point.longitude])
          .bindPopup(point.title)
          .addTo(this.map);
      });
    });
  }
}
