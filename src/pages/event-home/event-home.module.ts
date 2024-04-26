import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventHomePage } from './event-home';

@NgModule({
  declarations: [
    EventHomePage,
  ],
  imports: [
    IonicPageModule.forChild(EventHomePage),
  
  ],
})
export class EventHomePageModule {}
