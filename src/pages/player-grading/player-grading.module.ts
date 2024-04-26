import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerGradingPage } from './player-grading';

@NgModule({
  declarations: [
    PlayerGradingPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayerGradingPage),
  ],
})
export class PlayerGradingPageModule {}
