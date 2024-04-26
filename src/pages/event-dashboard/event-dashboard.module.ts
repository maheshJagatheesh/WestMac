import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventDashboardPage } from './event-dashboard';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    EventDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(EventDashboardPage),
    NgCircleProgressModule.forRoot()
  ],
})
export class EventDashboardPageModule {}
