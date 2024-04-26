import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContracterTimesheetListPage } from './contracter-timesheet-list';

@NgModule({
  declarations: [
    ContracterTimesheetListPage,
  ],
  imports: [
    IonicPageModule.forChild(ContracterTimesheetListPage),
  ],
})
export class ContracterTimesheetListPageModule {}
