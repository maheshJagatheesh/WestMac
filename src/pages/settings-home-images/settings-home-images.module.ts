import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsHomeImagesPage } from './settings-home-images';

@NgModule({
  declarations: [
    SettingsHomeImagesPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsHomeImagesPage),
  ],
})
export class SettingsHomeImagesPageModule {}
