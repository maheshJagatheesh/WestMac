import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimesheetDashboardPage } from './timesheet-dashboard';

@NgModule({
  declarations: [
    TimesheetDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(TimesheetDashboardPage),
  ],
})
export class TimesheetDashboardPageModule {}
