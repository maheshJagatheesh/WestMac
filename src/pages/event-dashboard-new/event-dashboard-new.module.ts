import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventDashboardNewPage } from './event-dashboard-new';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    EventDashboardNewPage,
  ],
  imports: [
    IonicPageModule.forChild(EventDashboardNewPage),
    NgCircleProgressModule.forRoot()
  ],
})
export class EventDashboardNewPageModule {}
