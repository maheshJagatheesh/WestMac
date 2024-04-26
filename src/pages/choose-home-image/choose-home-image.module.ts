import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseHomeImagePage } from './choose-home-image';

@NgModule({
  declarations: [
    ChooseHomeImagePage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseHomeImagePage),
  ],
})
export class ChooseHomeImagePageModule {}
