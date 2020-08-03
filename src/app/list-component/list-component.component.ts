import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../shared/items.service';
import { Item } from '../models/items';
import { MapService } from '../shared/map.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.css'],
})
export class ListComponentComponent implements OnInit {
  objects: Item[];
  array: any;
  form: FormGroup;

  constructor(
    public itemsService: ItemsService,
    public mapService: MapService
  ) {
    this.objects = [];
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      latitude: new FormControl('', [Validators.required]),
      longitude: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.itemsService.getJSON().subscribe((data) => {
      this.objects = data.items;
    });
  }

  onSubmit(): void {
    const { latitude, longitude, title } = this.form.value;
    const object: Item = {
      id: this.objects.length + 1,
      title,
      latitude,
      longitude,
    };
    this.mapService.addObject(object);
    this.objects.push(object);
  }

  removeItem(obj: Item): Item[] {
    const result = this.objects.filter((item) => item.id !== obj.id);
    this.mapService.removeMarkerFromMap(obj);
    return (this.objects = result);
  }
}
