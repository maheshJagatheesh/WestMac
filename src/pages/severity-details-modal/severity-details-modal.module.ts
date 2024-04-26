import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeverityDetailsModalPage } from './severity-details-modal';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    SeverityDetailsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SeverityDetailsModalPage),
    PipesModule
  ],
})
export class SeverityDetailsModalPageModule {}
