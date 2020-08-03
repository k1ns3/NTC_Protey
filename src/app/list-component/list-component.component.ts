import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../shared/items.service';
import { Item } from '../models/items';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.css'],
})
export class ListComponentComponent implements OnInit {
  objects: Item[];
  array: any;

  constructor(public itemsService: ItemsService) {
    this.objects = [];
  }

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.itemsService.getJSON().subscribe((data) => {
      this.objects = data.items;
    });
  }
}
