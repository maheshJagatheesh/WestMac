import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventStatsPage } from './event-stats';

@NgModule({
  declarations: [
    EventStatsPage,
  ],
  imports: [
    IonicPageModule.forChild(EventStatsPage),
  ],
})
export class EventStatsPageModule {}
