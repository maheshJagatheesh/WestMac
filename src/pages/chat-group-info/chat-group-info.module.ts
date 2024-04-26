import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatGroupInfoPage } from './chat-group-info';

@NgModule({
  declarations: [
    ChatGroupInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatGroupInfoPage),
  ],
})
export class ChatGroupInfoPageModule {}
