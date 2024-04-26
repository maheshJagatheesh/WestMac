import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventWelfarePage } from './event-welfare';

@NgModule({
  declarations: [
    EventWelfarePage,
  ],
  imports: [
    IonicPageModule.forChild(EventWelfarePage),
  ],
})
export class EventWelfarePageModule {}
