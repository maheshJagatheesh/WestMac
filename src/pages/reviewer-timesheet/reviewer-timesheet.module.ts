import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewerTimesheetPage } from './reviewer-timesheet';

@NgModule({
  declarations: [
    ReviewerTimesheetPage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewerTimesheetPage),
  ],
})
export class ReviewerTimesheetPageModule {}
