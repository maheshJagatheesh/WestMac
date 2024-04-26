import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupChatViewPage } from './group-chat-view';

@NgModule({
  declarations: [
    GroupChatViewPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupChatViewPage),
  ],
})
export class GroupChatViewPageModule {}
