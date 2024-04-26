import { MbscModule, mobiscroll, MbscCalendarOptions  } from '@mobiscroll/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayEventsPage } from './display-events';
import { ScrollingHeaderModule } from 'ionic-scrolling-header'
import { FormsModule } from '@angular/forms';
import { IonicSwipeAllModule } from 'ionic-swipe-all';


@NgModule({
  declarations: [
    DisplayEventsPage,

  ],
  imports: [ 
    MbscModule,
    IonicPageModule.forChild(DisplayEventsPage),
    ScrollingHeaderModule,
    FormsModule,
    IonicSwipeAllModule

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class DisplayEventsPageModule { }
