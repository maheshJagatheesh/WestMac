import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InjuredListPage } from './injured-list';

@NgModule({
  declarations: [
    InjuredListPage,
  ],
  imports: [
    IonicPageModule.forChild(InjuredListPage),
  ],
})
export class InjuredListPageModule {}
