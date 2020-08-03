import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { greenIcon, redIcon } from '../../constants/points';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public selectedItem: BehaviorSubject<number>;
  public markers: L.marker[];
  map: L.Map;
  oldMarkerId: L.marker;
  newMarkerId: L.marker;
  markerId: any;

  constructor() {}

  public onClickMarker(event): void {
    const layer = event.target;
    this.map.panTo(layer.getLatLng());
    this.onChangeItem(event.target);
  }

  public onChangeItem(layer: L.marker): void {
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

  public addObject(obj: any): void {
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
    console.log('Маркеры обновлены: ', this.markers);
  }

  public getTaskId(id: BehaviorSubject<number>): BehaviorSubject<number> {
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
}
