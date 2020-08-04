import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { greenIcon } from '../../constants/points';
import { MainLayer } from '../models/mainLayer';
import { MapService } from '../shared/map.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css'],
})
export class MapComponentComponent implements AfterViewInit, OnDestroy {
  private readonly _DESTROY$: Subject<any>;
  private readonly zoomLevel: number;
  markerId: any;
  oldMarkerId: L.marker;

  constructor(private mapService: MapService) {
    this.zoomLevel = 10;
    this.oldMarkerId = null;
    this.markerId = null;
  }

  ngAfterViewInit(): void {
    this.getMapData();
    this.getData();
  }

  ngOnDestroy(): void {
    this._DESTROY$.next();
    this._DESTROY$.complete();
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
        minZoom: 8,
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );
    mainLayer.addTo(this.mapService.map);
  }

  getData(): void {
    const markers = [];
    this.mapService.getJSON().subscribe((data) => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < data.items.length; i++) {
        markers.push({
          marker: L.marker([data.items[i].latitude, data.items[i].longitude], {
            icon: greenIcon,
            id: data.items[i].id,
          })
            .addTo(this.mapService.map)
            .bindPopup(
              `<h3 style="color: #264c7c">${data.items[i].title} - ${data.items[i].id}</h3>`
            )
            .on('click', (event) => this.mapService.onClickMarker(event)),
        });
      }
      this.mapService.markers = markers;
    }),
      takeUntil(this._DESTROY$);
  }
}
