import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponentComponent } from './list-component/list-component.component';
import { MapComponentComponent } from './map-component/map-component.component';

@NgModule({
  declarations: [AppComponent, ListComponentComponent, MapComponentComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
