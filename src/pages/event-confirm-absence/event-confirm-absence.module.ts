import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventConfirmAbsencePage } from './event-confirm-absence';

@NgModule({
  declarations: [
    EventConfirmAbsencePage,
  ],
  imports: [
    IonicPageModule.forChild(EventConfirmAbsencePage),
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EventConfirmAbsencePageModule {}
