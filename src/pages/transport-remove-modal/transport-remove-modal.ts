import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the TransportRemoveModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transport-remove-modal',
  templateUrl: 'transport-remove-modal.html',
})
export class TransportRemoveModalPage {
  removeoption:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    this.removeoption=navParams.get('removeOptions')
    console.log(this.removeoption)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransportRemoveModalPage');
  }
  sendRollcallId(data){
    console.log(data)
    this.viewCtrl.dismiss(data)
  }
  close(event){
    if(event.toElement.className=="scroll-content"){
      this.viewCtrl.dismiss()
    }
   }
   back(){
    this.viewCtrl.dismiss()
   }

}
