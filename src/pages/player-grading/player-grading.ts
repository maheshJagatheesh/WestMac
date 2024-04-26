import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';

/**
 * Generated class for the PlayerGradingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player-grading',
  templateUrl: 'player-grading.html',
})
export class PlayerGradingPage{
  public activeReport:string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public gFn:GlobalFunctionsProvider) {
      
  }

  playerGradeReport(report) {
    this.activeReport = report;
    let param = {report: report};
    this.navCtrl.push('PlayerListGradeReportPage', param);
  }

 /* goBack(){
    this.navCtrl.popTo('PlayersDashboardPage');
  }*/

}
