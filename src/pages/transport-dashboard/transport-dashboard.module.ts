import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransportDashboardPage } from './transport-dashboard';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    TransportDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(TransportDashboardPage),
    NgCircleProgressModule.forRoot()
  ],
})
export class TransportDashboardPageModule {}
