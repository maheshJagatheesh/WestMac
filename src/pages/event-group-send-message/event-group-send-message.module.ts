import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventGroupSendMessagePage } from './event-group-send-message';

@NgModule({
  declarations: [
    EventGroupSendMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(EventGroupSendMessagePage),
  ],
})
export class EventGroupSendMessagePageModule {}
