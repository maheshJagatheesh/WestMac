import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapTrackerPage } from './map-tracker';

@NgModule({
  declarations: [
    MapTrackerPage,
  ],
  imports: [
    IonicPageModule.forChild(MapTrackerPage),
  ],
})
export class MapTrackerPageModule {}
