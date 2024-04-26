import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotifyPlayersPage } from './notify-players';

@NgModule({
  declarations: [
    NotifyPlayersPage,
  ],
  imports: [
    IonicPageModule.forChild(NotifyPlayersPage),
  ],
})
export class NotifyPlayersPageModule {}
