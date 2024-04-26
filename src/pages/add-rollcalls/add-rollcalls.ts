import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the AddRollcallsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-rollcalls',
  templateUrl: 'add-rollcalls.html',
})
export class AddRollcallsPage {

  event_id: any;
  selectedTeam: any;
  rollcallName: any = '';
  isDynamic: any = '0';
  createdBy: any;
  client_id: any;
  transportId: any;

  constructor(public navCtrl: NavController,public http: HttpClient, public navParams: NavParams, private viewCtrl: ViewController,
    public global: GlobalProvider, private loadingCtrl: LoadingController,public toastCtrl:ToastController,public global_api:GlobalApiProvider) {
    this.event_id = navParams.get('event_id');
    this.selectedTeam = navParams.get('selectedTeam');
    this.createdBy = navParams.get('createdBy');
    this.client_id = navParams.get('client_id');
    this.transportId = navParams.get('transportId');
  }

  close(){
    this.viewCtrl.dismiss();
  }

  setDynamic(){
    this.isDynamic = (this.isDynamic == '0')? '1': '0';
  }

  addRollcall(){
    if(this.rollcallName.trim().length > 0){
      let loader = this.loadingCtrl.create({});
      loader.present();
      let loginData = new HttpParams()
          .set('rollcallName', this.rollcallName)
          .set('transportId', this.transportId)
          .set('isDynamic', this.isDynamic)
          .set('createdBy', this.createdBy);

      this.http.post(this.global.APIURL + "transports/createRollcall", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          loader.dismiss();
          this.close();
        }, error => {
        });
    }else{
      this.presentToast('Please enter rollcall name');
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

}
