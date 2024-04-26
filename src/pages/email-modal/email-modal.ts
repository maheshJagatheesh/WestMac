import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { Storage } from "@ionic/storage";
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the EmailModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-email-modal',
  templateUrl: 'email-modal.html',
})
export class EmailModalPage {
  private email: string;
  private personID: string;
  private message: string = '';

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private http: HttpClient,
    private viewCtrl: ViewController,
    private storage: Storage,
    private global: GlobalProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public global_api:GlobalApiProvider
  ) {
    this.email = navParams.get('email');
    storage.get('loggedInUserData').then((val) => {
      this.personID = val.PERSON_ID;
    });
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  sendEmail(){
    if (this.message.trim().length > 0) {
      let loading = this.loadingCtrl.create();
      loading.present();
      let emailData = new HttpParams()
        .set('email_to', this.email)
        .set('person_id', this.personID)
        .set('message', encodeURIComponent(this.message));
      this.http.post(this.global.APIURL + "players/sendEmail", emailData,{headers:this.global_api.getHeader()})
        .subscribe((response: any) => {
            loading.dismiss();
            if (response.SUCCESS == true) {
              this.presentToast("Email sent successfully.");
            } else {
              this.presentToast("Error in Email sending");
            }
            this.closeModal();
          },
          error => {
            loading.dismiss();
            this.presentToast("Error in Email sending");
            this.closeModal();
          }
        );
    } else {
      this.presentToast("Can't send blank Email");
    }
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
