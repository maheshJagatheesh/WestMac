import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackMemberPage } from './track-member';

@NgModule({
  declarations: [
    TrackMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(TrackMemberPage),
  ],
})
export class TrackMemberPageModule {}
