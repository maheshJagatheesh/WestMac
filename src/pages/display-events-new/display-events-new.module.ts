import { MbscModule, mobiscroll, MbscCalendarOptions  } from '@mobiscroll/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayEventsNewPage } from './display-events-new';
import { ScrollingHeaderModule } from 'ionic-scrolling-header'
import { FormsModule } from '@angular/forms';
import { IonicSwipeAllModule } from 'ionic-swipe-all';


@NgModule({
  declarations: [
    DisplayEventsNewPage,

  ],
  imports: [ 
    MbscModule,
    IonicPageModule.forChild(DisplayEventsNewPage),
    ScrollingHeaderModule,
    FormsModule,
    IonicSwipeAllModule

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class DisplayEventsNewPageModule { }
