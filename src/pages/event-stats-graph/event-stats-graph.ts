import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';

/**
 * Generated class for the EventStatsGraphPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-stats-graph',
  templateUrl: 'event-stats-graph.html',
})
export class EventStatsGraphPage{

  constructor(public navCtrl: NavController, public navParams: NavParams, public gFn:GlobalFunctionsProvider) {
    
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad EventStatsGraphPage');
  }

}
