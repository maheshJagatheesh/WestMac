import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventAttendanceNotePage } from './event-attendance-note';

@NgModule({
  declarations: [
    EventAttendanceNotePage,
  ],
  imports: [
    IonicPageModule.forChild(EventAttendanceNotePage),
  ],
})
export class EventAttendanceNotePageModule {}
