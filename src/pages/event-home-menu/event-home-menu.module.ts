import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventHomeMenuPage } from './event-home-menu';

@NgModule({
  declarations: [
    EventHomeMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(EventHomeMenuPage),
  ],
})
export class EventHomeMenuPageModule {}
