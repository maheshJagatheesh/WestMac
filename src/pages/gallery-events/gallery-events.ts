import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';

/**
 * Generated class for the GalleryEventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery-events',
  templateUrl: 'gallery-events.html',
})
export class GalleryEventsPage{

  constructor(public navCtrl: NavController, public navParams: NavParams, public gFn:GlobalFunctionsProvider) {
    
  }

  goToGalleryTimeline() {
    this.navCtrl.push('GalleryTimelinePage');
  }

  goToGalleryAlbums() {
    //this.navCtrl.push('GalleryAlbumsPage');
  }
  gotoAlbum(){
    this.navCtrl.push('GalleryAlbumPage')

  }

}
