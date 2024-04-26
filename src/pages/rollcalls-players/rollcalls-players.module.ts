import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RollcallsPlayersPage } from './rollcalls-players';

@NgModule({
  declarations: [
    RollcallsPlayersPage,
  ],
  imports: [
    IonicPageModule.forChild(RollcallsPlayersPage),
  ],
})
export class RollcallsPlayersPageModule {}
