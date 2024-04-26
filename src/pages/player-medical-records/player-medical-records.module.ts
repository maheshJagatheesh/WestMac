import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerMedicalRecordsPage } from './player-medical-records';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PlayerMedicalRecordsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayerMedicalRecordsPage),
    PipesModule
  ],
})
export class PlayerMedicalRecordsPageModule {}
