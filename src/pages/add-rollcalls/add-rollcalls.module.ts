import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRollcallsPage } from './add-rollcalls';

@NgModule({
  declarations: [
    AddRollcallsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddRollcallsPage),
  ],
})
export class AddRollcallsPageModule {}
