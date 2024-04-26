import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';

@IonicPage()
@Component({
  selector: 'page-gameboard',
  templateUrl: 'gameboard.html',
})
export class GameboardPage{

  constructor(public navCtrl: NavController, public navParams: NavParams, public gFn:GlobalFunctionsProvider) {
    
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad GameboardPage');
  }


}
