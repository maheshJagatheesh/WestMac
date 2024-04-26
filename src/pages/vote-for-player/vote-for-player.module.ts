import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoteForPlayerPage } from './vote-for-player';

@NgModule({
  declarations: [
    VoteForPlayerPage,
  ],
  imports: [
    IonicPageModule.forChild(VoteForPlayerPage),
  ],
})
export class VoteForPlayerPageModule {}
