import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  selectedItem: number;

  constructor(private http: HttpClient) {}

  public getJSON(): Observable<any> {
    return this.http.get('./assets/data/data.json');
  }

  public getTaskId(id: number): number {
    return (this.selectedItem = id);
  }
}
