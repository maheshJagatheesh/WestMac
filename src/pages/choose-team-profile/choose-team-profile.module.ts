import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseTeamProfilePage } from './choose-team-profile';

@NgModule({
  declarations: [
    ChooseTeamProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseTeamProfilePage),
  ],
})
export class ChooseTeamProfilePageModule {}
