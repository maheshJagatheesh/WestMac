import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';

/**
 * Generated class for the GalleryTimelineDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery-timeline-details',
  templateUrl: 'gallery-timeline-details.html',
})
export class GalleryTimelineDetailsPage{

  constructor(public navCtrl: NavController, public navParams: NavParams, public gFn:GlobalFunctionsProvider) {
    
  }

  goBack(){
    this.navCtrl.pop();
  }

}
