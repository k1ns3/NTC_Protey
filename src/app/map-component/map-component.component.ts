import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ItemsService } from '../shared/items.service';
import { greenIcon, redIcon } from '../../constants/points';
import { MainLayer } from '../models/mainLayer';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css'],
})
export class MapComponentComponent implements AfterViewInit {
  map: L.Map;
  zoomLevel: number;
  markerId: number;
  oldMarkerId: L.marker;
  markers: L.marker[];

  constructor(private itemsService: ItemsService) {
    this.zoomLevel = 10;
    this.markers = [];
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

    this.map = new L.map('map', {
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
    mainLayer.addTo(this.map);
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
            .addTo(this.map)
            .bindPopup(`<h3 style="color: #264c7c">${point.title}</h3>`)
            .on('click', (event) => this.onClickMarker(event)),
        });
      });
      this.markers = markers;
    });
  }

  onClickMarker(event): void {
    const layer = event.target;
    this.map.panTo(layer.getLatLng());
    this.onChangeMarkerIcon(layer);
  }

  onChangeMarkerIcon(layer: L.marker): void {
    layer.setIcon(redIcon);
    this.oldMarkerId = this.markers.find(
      (item) => item.marker.options.id === this.markerId
    );
    if (this.oldMarkerId !== undefined) {
      this.oldMarkerId.marker.setIcon(greenIcon);
    }
    this.markerId = layer.options.id;
  }
}
