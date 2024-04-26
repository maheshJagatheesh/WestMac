import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RollcallLogsPage } from './rollcall-logs';

@NgModule({
  declarations: [
    RollcallLogsPage,
  ],
  imports: [
    IonicPageModule.forChild(RollcallLogsPage),
  ],
})
export class RollcallLogsPageModule {}
