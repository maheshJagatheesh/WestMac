import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatDashboardPage } from './chat-dashboard';

@NgModule({
  declarations: [
    ChatDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatDashboardPage),
  ],
})
export class ChatDashboardPageModule {}
