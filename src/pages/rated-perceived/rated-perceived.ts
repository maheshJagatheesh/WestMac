import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';

/**
 * Generated class for the RatedPerceivedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rated-perceived',
  templateUrl: 'rated-perceived.html',
})
export class RatedPerceivedPage{
  id:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public gFn:GlobalFunctionsProvider) {
    
  this.id=navParams.get('id');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RatedPerceivedPage');
  }
  close(){
    this.navCtrl.pop();
  }

}
