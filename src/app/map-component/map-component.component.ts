import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ItemsService } from '../shared/items.service';
import { greenIcon } from '../../constants/points';
import { MainLayer } from '../models/mainLayer';
import { MapService } from '../shared/map.service';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css'],
})
export class MapComponentComponent implements AfterViewInit {
  map: L.Map;
  zoomLevel: number;
  markerId: any;
  oldMarkerId: L.marker;

  constructor(
    private itemsService: ItemsService,
    private mapService: MapService
  ) {
    this.zoomLevel = 10;
    this.oldMarkerId = null;
    this.markerId = null;
  }

  ngAfterViewInit(): void {
    this.getMapData();
    this.getData();
  }

  getMapData(): void {
    const saintPetersburg = {
      latitude: 59.939043,
      longitude: 30.314954,
    };

    this.mapService.map = new L.map('map', {
      center: [saintPetersburg.latitude, saintPetersburg.longitude],
      zoom: this.zoomLevel,
    });

    const mainLayer: MainLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        minZoom: 10,
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );
    mainLayer.addTo(this.mapService.map);
  }

  getData(): void {
    const markers = [];
    this.itemsService.getJSON().subscribe((data) => {
      data.items.forEach((point) => {
        markers.push({
          marker: L.marker([point.latitude, point.longitude], {
            icon: greenIcon,
            id: point.id,
          })
            .addTo(this.mapService.map)
            .bindPopup(
              `<h3 style="color: #264c7c">${point.title} - ${point.id}</h3>`
            )
            .on('click', (event) => this.mapService.onClickMarker(event)),
        });
      });
      this.mapService.markers = markers;
    });
  }
}
