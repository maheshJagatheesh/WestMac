import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdditionalPassengerPage } from './additional-passenger';

@NgModule({
  declarations: [
    AdditionalPassengerPage,
  ],
  imports: [
    IonicPageModule.forChild(AdditionalPassengerPage),
  ],
})
export class AdditionalPassengerPageModule {}
