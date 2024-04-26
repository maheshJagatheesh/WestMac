import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReadOnlyTimesheetPage } from './read-only-timesheet';

@NgModule({
  declarations: [
    ReadOnlyTimesheetPage,
  ],
  imports: [
    IonicPageModule.forChild(ReadOnlyTimesheetPage),
  ],
})
export class ReadOnlyTimesheetPageModule {}
