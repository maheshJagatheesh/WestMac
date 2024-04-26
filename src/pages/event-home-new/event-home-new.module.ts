import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventHomeNewPage } from './event-home-new';

@NgModule({
  declarations: [
    EventHomeNewPage,
  ],
  imports: [
    IonicPageModule.forChild(EventHomeNewPage)
  ],
})
export class EventHomeNewPageModule {}
