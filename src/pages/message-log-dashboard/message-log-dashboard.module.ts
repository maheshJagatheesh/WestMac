import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageLogDashboardPage } from './message-log-dashboard';

@NgModule({
  declarations: [
    MessageLogDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageLogDashboardPage),
  ],
})
export class MessageLogDashboardPageModule {}
