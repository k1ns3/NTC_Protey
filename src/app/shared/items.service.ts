import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  public selectedItem: BehaviorSubject<number>;

  constructor(private http: HttpClient) {}

  public getJSON(): Observable<any> {
    return this.http.get('./assets/data/data.json');
  }

  public getTaskId(id: BehaviorSubject<number>): BehaviorSubject<number> {
    console.log(id);
    return (this.selectedItem = id);
  }
}
