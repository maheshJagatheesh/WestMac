import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InjuryIncidentReportPage } from './injury-incident-report';

@NgModule({
  declarations: [
    InjuryIncidentReportPage,
  ],
  imports: [
    IonicPageModule.forChild(InjuryIncidentReportPage),
  ],
})
export class InjuryIncidentReportPageModule {}
