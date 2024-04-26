import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RollcallsPage } from './rollcalls';

@NgModule({
  declarations: [
    RollcallsPage,
  ],
  imports: [
    IonicPageModule.forChild(RollcallsPage),
  ],
})
export class RollcallsPageModule {}
