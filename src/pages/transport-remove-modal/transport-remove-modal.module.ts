import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransportRemoveModalPage } from './transport-remove-modal';

@NgModule({
  declarations: [
    TransportRemoveModalPage,
  ],
  imports: [
    IonicPageModule.forChild(TransportRemoveModalPage),
  ],
})
export class TransportRemoveModalPageModule {}
