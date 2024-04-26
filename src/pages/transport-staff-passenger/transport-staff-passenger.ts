import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the TransportStaffPassengerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transport-staff-passenger',
  templateUrl: 'transport-staff-passenger.html',
})
export class TransportStaffPassengerPage {

  client_id: any;
  selectedTeam: any;
  event_id: any;
  createdBy: any;
  staffList: any = [];
  transportId: any;
  staffId: any;

  constructor(public navCtrl: NavController,public http: HttpClient, public navParams: NavParams, private viewCtrl: ViewController,
    public global: GlobalProvider, public gFn: GlobalFunctionsProvider, private loadingCtrl: LoadingController, public toastCtrl:ToastController,public global_api:GlobalApiProvider) {
    this.client_id = navParams.get('client_id');
    this.selectedTeam = navParams.get('selectedTeam');
    this.event_id = navParams.get('event_id');
    this.createdBy = navParams.get('createdBy');
    this.transportId = navParams.get('transportId');
    this.staffId = navParams.get('staffId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransportStaffPassengerPage');
  }

  close(){
    this.viewCtrl.dismiss();
  }

  updateStaffIsPassenger(isPassenger){
    let loader = this.loadingCtrl.create({});
    loader.present();
    let loginData = new HttpParams()
        .set('transportId', this.transportId)
        .set('staffId', this.staffId)
        .set('isPassenger', isPassenger);

    this.http.post(this.global.APIURL + "transports/updateStaffIsPassenger", loginData,{headers:this.global_api.getHeader()})
      .subscribe((data: any) => {
        loader.dismiss();
        this.close();
      }, error => {
        loader.dismiss();
      });
  }

}
