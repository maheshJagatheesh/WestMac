import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewDiscussionListPage } from './new-discussion-list';

@NgModule({
  declarations: [
    NewDiscussionListPage,
  ],
  imports: [
    IonicPageModule.forChild(NewDiscussionListPage),
  ],
})
export class NewDiscussionListPageModule {}
