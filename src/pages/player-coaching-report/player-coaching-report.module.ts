import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerCoachingReportPage } from './player-coaching-report';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    PlayerCoachingReportPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayerCoachingReportPage),
    NgCircleProgressModule.forRoot({
      radius: 58,
      outerStrokeWidth: 6,
      innerStrokeWidth: 0,
      outerStrokeColor: "#2BBFF0",
      innerStrokeColor: "#fff",
      animation: true,
      animationDuration: 500,
      titleColor: '#fff',
      titleFontSize: '28',
      subtitleColor: '#fff',
      subtitleFontSize: '8',
      unitsColor: '#fff',
      unitsFontSize: '28'
    })
  ],
})
export class PlayerCoachingReportPageModule {}
