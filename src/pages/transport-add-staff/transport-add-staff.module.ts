import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransportAddStaffPage } from './transport-add-staff';

@NgModule({
  declarations: [
    TransportAddStaffPage,
  ],
  imports: [
    IonicPageModule.forChild(TransportAddStaffPage),
  ],
})
export class TransportAddStaffPageModule {}
