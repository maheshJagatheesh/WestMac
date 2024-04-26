import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import { IonicSwipeAllModule } from 'ionic-swipe-all';

@NgModule({
  declarations: [
    // TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    IonicSwipeAllModule
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class TabsPageModule {}
