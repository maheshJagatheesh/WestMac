import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventDashboardLoadingPage } from './event-dashboard-loading';

@NgModule({
  declarations: [
    EventDashboardLoadingPage,
  ],
  imports: [
    IonicPageModule.forChild(EventDashboardLoadingPage),
  ],
})
export class EventDashboardLoadingPageModule {}
