import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanningPage } from './scanning';

@NgModule({
  declarations: [
    ScanningPage,
  ],
  imports: [
    IonicPageModule.forChild(ScanningPage),
  ],
})
export class ScanningPageModule {}
