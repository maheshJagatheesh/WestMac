import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseTeamPage } from './choose-team';

@NgModule({
  declarations: [
    ChooseTeamPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseTeamPage),
  ],
})
export class ChooseTeamPageModule {}
