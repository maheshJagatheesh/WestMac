import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomePage } from './welcome';
import { LazyLoadImageModule } from 'ng-lazyload-image';


@NgModule({
  declarations: [
    WelcomePage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomePage),
    LazyLoadImageModule
  ],
})
export class WelcomePageModule {}
