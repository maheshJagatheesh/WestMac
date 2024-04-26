import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerScannerAttendancePage } from './player-scanner-attendance';

@NgModule({
  declarations: [
    PlayerScannerAttendancePage,
  ],
  imports: [
    IonicPageModule.forChild(PlayerScannerAttendancePage),
  ],
})
export class PlayerScannerAttendancePageModule {}
