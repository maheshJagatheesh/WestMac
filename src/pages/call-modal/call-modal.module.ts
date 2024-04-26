import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CallModalPage } from './call-modal';

@NgModule({
  declarations: [
    CallModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CallModalPage),
  ],
})
export class CallModalPageModule {}
