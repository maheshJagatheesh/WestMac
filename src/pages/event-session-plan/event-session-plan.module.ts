import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventSessionPlanPage } from './event-session-plan';

@NgModule({
  declarations: [
    EventSessionPlanPage,
  ],
  imports: [
    IonicPageModule.forChild(EventSessionPlanPage),
  ],
})
export class EventSessionPlanPageModule {}
