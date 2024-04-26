import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventsResultsPage } from './events-results';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EventsResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(EventsResultsPage),
    FormsModule, // add the forms module

  ],
})
export class EventsResultsPageModule { }