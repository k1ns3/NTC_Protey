import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.css'],
})
export class ListComponentComponent implements OnInit {
  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.itemsService.getJSON().subscribe((data) => {
      console.log(data);
    });
  }
}
