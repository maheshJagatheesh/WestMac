import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GalleryTimelinePage } from './gallery-timeline';

@NgModule({
  declarations: [
    GalleryTimelinePage,
  ],
  imports: [
    IonicPageModule.forChild(GalleryTimelinePage),
  ],
})
export class GalleryTimelinePageModule {}
