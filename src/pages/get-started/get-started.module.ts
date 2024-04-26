import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { GetStartedPage } from './get-started';

@NgModule({
  declarations: [
    GetStartedPage,
  ],
  imports: [
    IonicPageModule.forChild(GetStartedPage),
    IonicModule.forRoot(GetStartedPage)
  ],
  exports: [
    GetStartedPage
  ]
})
export class GetStartedPageModule {}
