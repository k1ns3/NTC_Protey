import * as L from 'leaflet';

export const greenIcon = new L.Icon({
  iconUrl: '../assets/img/marker-icon-2x-green.png',
  shadowUrl: '../assets/img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const redIcon = new L.Icon({
  iconUrl: '../assets/img/marker-icon-2x-red.png',
  shadowUrl: '../assets/img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
