import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BorrowedPlayerPage } from './borrowed-player';

@NgModule({
  declarations: [
    BorrowedPlayerPage,
  ],
  imports: [
    IonicPageModule.forChild(BorrowedPlayerPage),
  ],
})
export class BorrowedPlayerPageModule {}
