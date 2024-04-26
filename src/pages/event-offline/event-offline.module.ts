import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventOfflinePage } from './event-offline';

@NgModule({
  declarations: [
    EventOfflinePage,
  ],
  imports: [
    IonicPageModule.forChild(EventOfflinePage),
  ],
})
export class EventOfflinePageModule {}
