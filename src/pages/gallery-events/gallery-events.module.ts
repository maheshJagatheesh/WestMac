import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GalleryEventsPage } from './gallery-events';

@NgModule({
  declarations: [
    GalleryEventsPage,
  ],
  imports: [
    IonicPageModule.forChild(GalleryEventsPage),
  ],
})
export class GalleryEventsPageModule {}
