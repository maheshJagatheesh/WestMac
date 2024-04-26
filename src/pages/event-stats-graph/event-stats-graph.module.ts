import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventStatsGraphPage } from './event-stats-graph';

@NgModule({
  declarations: [
    EventStatsGraphPage,
  ],
  imports: [
    IonicPageModule.forChild(EventStatsGraphPage),
  ],
})
export class EventStatsGraphPageModule {}
