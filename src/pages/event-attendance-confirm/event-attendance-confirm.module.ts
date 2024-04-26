import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventAttendanceConfirmPage } from './event-attendance-confirm';

@NgModule({
  declarations: [
    EventAttendanceConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(EventAttendanceConfirmPage),
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EventAttendanceConfirmPageModule {}
