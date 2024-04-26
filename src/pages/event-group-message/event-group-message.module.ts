import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventGroupMessagePage } from './event-group-message';
import { ClickOutsideModule } from 'ng4-click-outside';

@NgModule({
  declarations: [
    EventGroupMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(EventGroupMessagePage),
    ClickOutsideModule
  ],
})
export class EventGroupMessagePageModule {}
