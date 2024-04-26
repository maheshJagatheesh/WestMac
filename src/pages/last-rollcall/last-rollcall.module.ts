import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LastRollcallPage } from './last-rollcall';

@NgModule({
  declarations: [
    LastRollcallPage,
  ],
  imports: [
    IonicPageModule.forChild(LastRollcallPage),
  ],
})
export class LastRollcallPageModule {}
