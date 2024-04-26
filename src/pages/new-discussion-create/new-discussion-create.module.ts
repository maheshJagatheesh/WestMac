import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewDiscussionCreatePage } from './new-discussion-create';

@NgModule({
  declarations: [
    NewDiscussionCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(NewDiscussionCreatePage),
  ],
})
export class NewDiscussionCreatePageModule {}
