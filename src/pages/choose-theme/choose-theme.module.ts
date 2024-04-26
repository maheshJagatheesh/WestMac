import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseThemePage } from './choose-theme';

@NgModule({
  declarations: [
    ChooseThemePage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseThemePage),
  ],
})
export class ChooseThemePageModule {}
