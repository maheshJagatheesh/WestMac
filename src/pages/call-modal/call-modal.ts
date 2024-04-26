import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the CallModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-call-modal',
  templateUrl: 'call-modal.html',
})
export class CallModalPage {
  private phone: string;
  public emergency: boolean;
  public emergencyContacts: any;
  private relations: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private actionSheetCtrl: ActionSheetController) {
    this.phone = navParams.get('phone');
    this.emergency = navParams.get('emergency');
    this.emergencyContacts = navParams.get('emergencyContacts');
    this.relations[1] = 'Parent';
    this.relations[2] = 'Guardian';
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  call(phone = '') {
    if(phone.length){
      this.phone = phone;
    }
    this.closeModal();
    window.open('tel:' + this.phone, '_system');
  }

  public presentActionSheet() {
    if(this.emergency){
      if(this.emergencyContacts.length == 1){
        this.call(this.emergencyContacts[0].phone_mobile);
        return;
      }
      let options = [];
      for(let key in this.emergencyContacts){
        options.push({
          text: this.emergencyContacts[key].phone_mobile,
          handler: () => {
            this.call(this.emergencyContacts[key].phone_mobile);
          }
        });
      }
      options.push(
        {
          text: 'Cancel',
          role: 'cancel'
        }
      );
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Select Phone Number',
        buttons: options
      });
      actionSheet.present();
    }else{
      this.call();
    }
  }

}
