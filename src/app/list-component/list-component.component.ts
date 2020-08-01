import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { Items } from '../models/items';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.css'],
})
export class ListComponentComponent implements OnInit {
  objects: Items[] = [];
  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.itemsService.getJSON().subscribe((data) => {
      this.objects = data.items;
    });
  }
}
