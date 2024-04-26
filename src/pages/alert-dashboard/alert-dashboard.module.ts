import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlertDashboardPage } from './alert-dashboard';
import { ScrollingHeaderModule } from 'ionic-scrolling-header';


@NgModule({
  declarations: [
    AlertDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(AlertDashboardPage),
    ScrollingHeaderModule
  ],
})
export class AlertDashboardPageModule {}
