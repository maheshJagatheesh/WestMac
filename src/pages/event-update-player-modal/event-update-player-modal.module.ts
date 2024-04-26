import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventUpdatePlayerModalPage } from './event-update-player-modal';

@NgModule({
  declarations: [
    EventUpdatePlayerModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EventUpdatePlayerModalPage),
  ],
})
export class EventUpdatePlayerModalPageModule {}
