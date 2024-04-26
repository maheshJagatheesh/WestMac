import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayersDashboardPage } from './players-dashboard';
import { ScrollingHeaderModule } from 'ionic-scrolling-header';

@NgModule({
  declarations: [
    PlayersDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayersDashboardPage),
    ScrollingHeaderModule
  ],
})
export class PlayersDashboardPageModule {}
