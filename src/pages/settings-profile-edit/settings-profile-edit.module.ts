import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsProfileEditPage } from './settings-profile-edit';

@NgModule({
  declarations: [
    SettingsProfileEditPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsProfileEditPage),
  ],
})
export class SettingsProfileEditPageModule {}
