import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewDiscussionSavePage } from './new-discussion-save';

@NgModule({
  declarations: [
    NewDiscussionSavePage,
  ],
  imports: [
    IonicPageModule.forChild(NewDiscussionSavePage),
  ],
})
export class NewDiscussionSavePageModule {}
