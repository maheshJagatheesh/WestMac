import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChoosePlayersPage } from './choose-players';

@NgModule({
  declarations: [
    ChoosePlayersPage,
  ],
  imports: [
    IonicPageModule.forChild(ChoosePlayersPage),
  ],
})
export class ChoosePlayersPageModule {}
