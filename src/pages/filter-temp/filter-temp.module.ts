import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterTempPage } from './filter-temp';

@NgModule({
  declarations: [
    FilterTempPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterTempPage),
  ],
})
export class FilterTempPageModule {}
