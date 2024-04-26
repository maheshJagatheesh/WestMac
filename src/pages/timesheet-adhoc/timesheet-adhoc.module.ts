import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimesheetAdhocPage } from './timesheet-adhoc';

@NgModule({
  declarations: [
    TimesheetAdhocPage,
  ],
  imports: [
    IonicPageModule.forChild(TimesheetAdhocPage),
  ],
})
export class TimesheetAdhocPageModule {}
