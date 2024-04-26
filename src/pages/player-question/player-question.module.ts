import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerQuestionPage } from './player-question';


@NgModule({
  declarations: [
    PlayerQuestionPage,
    
  ],
  imports: [
    IonicPageModule.forChild(PlayerQuestionPage),
  ],
})
export class PlayerQuestionPageModule {}
