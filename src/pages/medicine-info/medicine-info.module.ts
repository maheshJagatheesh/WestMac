import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicineInfoPage } from './medicine-info';

@NgModule({
  declarations: [
    MedicineInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicineInfoPage),
  ],
})
export class MedicineInfoPageModule {}
