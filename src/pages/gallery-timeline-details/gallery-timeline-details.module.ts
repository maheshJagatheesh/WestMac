import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GalleryTimelineDetailsPage } from './gallery-timeline-details';

@NgModule({
  declarations: [
    GalleryTimelineDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(GalleryTimelineDetailsPage),
  ],
})
export class GalleryTimelineDetailsPageModule {}
