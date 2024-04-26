import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GalleryAlbumPage } from './gallery-album';

@NgModule({
  declarations: [
    GalleryAlbumPage,
  ],
  imports: [
    IonicPageModule.forChild(GalleryAlbumPage),
  ],
})
export class GalleryAlbumPageModule {}
