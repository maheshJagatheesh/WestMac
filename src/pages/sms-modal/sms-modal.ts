import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms/ngx';

/**
 * Generated class for the SmsModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sms-modal',
  templateUrl: 'sms-modal.html',
})
export class SmsModalPage {
  private phone: string;
  private message: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private sms: SMS, private viewCtrl: ViewController) {
    this.phone = navParams.get('phone');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  sendSMS(){
    this.closeModal();
    let options = {
     replaceLineBreaks: false, // true to replace \n by a new line, false by default
     android: {
       intent: 'INTENT' // send SMS with the native android SMS messaging
       //intent: '' // send SMS without open any other app
       //intent: 'INTENT' // send SMS inside a default SMS app
       }
     };
     this.sms.send(this.phone, this.message, options);
  }

  close(){
    this.viewCtrl.dismiss();
  }
}
