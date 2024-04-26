import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsProfileStatisticsPage } from './settings-profile-statistics';

@NgModule({
  declarations: [
    SettingsProfileStatisticsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsProfileStatisticsPage),
  ],
})
export class SettingsProfileStatisticsPageModule {}
