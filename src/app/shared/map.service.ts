import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { greenIcon, redIcon } from '../../constants/points';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../models/items';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  selectedItem: BehaviorSubject<number>;
  markers: L.marker[];
  map: L.Map;
  oldMarkerId: L.marker;
  newMarkerId: L.marker;
  markerId: any;

  constructor(private http: HttpClient) {}

  getJSON(): Observable<any> {
    return this.http.get('./assets/data/data.json');
  }

  onClickMarker(event): void {
    const layer = event.target;
    this.map.panTo(layer.getLatLng());
    this.onChangeItem(event.target);
  }

  onChangeItem(layer: L.marker): void {
    layer.setIcon(redIcon);
    this.oldMarkerId = this.markers.find(
      (item) => item.marker.options.id === this.markerId
    );
    if (this.oldMarkerId) {
      this.oldMarkerId.marker.setIcon(greenIcon);
    }
    this.markerId = layer.options.id;
    this.getTaskId(this.markerId);
  }

  addObject(obj: any): void {
    this.markers.push({
      marker: L.marker([Number(obj.latitude), Number(obj.longitude)], {
        icon: greenIcon,
        id: this.markers.length + 1,
      })
        .addTo(this.map)
        .bindPopup(
          `<h3 style="color: #264c7c">${obj.title} - ${
            this.markers.length + 1
          }</h3>`
        )
        .on('click', (event) => this.onClickMarker(event)),
    });
  }

  getTaskId(id: BehaviorSubject<number>): BehaviorSubject<number> {
    this.oldMarkerId = this.markers.find(
      (item) => item.marker.options.id === id
    );
    if (this.oldMarkerId) {
      this.oldMarkerId.marker.setIcon(redIcon);
    }

    this.newMarkerId = this.markers.find(
      (item) => item.marker.options.id === this.selectedItem
    );
    if (this.newMarkerId) {
      this.newMarkerId.marker.setIcon(greenIcon);
    }
    return (this.selectedItem = id);
  }

  removeMarkerFromMap(obj: Item): void {
    const result = this.markers.find(
      (item) => item.marker.options.id === obj.id
    );
    this.map.removeLayer(result.marker);
  }
}
