import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SmsModalPage } from './sms-modal';

@NgModule({
  declarations: [
    SmsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SmsModalPage),
  ],
})
export class SmsModalPageModule {}
