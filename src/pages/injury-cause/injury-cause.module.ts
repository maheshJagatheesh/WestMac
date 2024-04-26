import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InjuryCausePage } from './injury-cause';

@NgModule({
  declarations: [
    InjuryCausePage,
  ],
  imports: [
    IonicPageModule.forChild(InjuryCausePage),
  ],
})
export class InjuryCausePageModule {}
