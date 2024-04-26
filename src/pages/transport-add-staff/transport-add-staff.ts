import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the TransportAddStaffPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transport-add-staff',
  templateUrl: 'transport-add-staff.html',
})
export class TransportAddStaffPage {

  client_id: any;
  selectedTeam: any;
  event_id: any;
  createdBy: any;
  staffList: any = [];
  transportId: any;
  removeStaffId: any;
  removeStaffName: any;
  isRemove: boolean = false;

  constructor(public navCtrl: NavController,public http: HttpClient, public navParams: NavParams, private viewCtrl: ViewController,
    public global: GlobalProvider, public gFn: GlobalFunctionsProvider, private loadingCtrl: LoadingController, public toastCtrl:ToastController,public global_api:GlobalApiProvider) {
    this.client_id = navParams.get('client_id');
    this.selectedTeam = navParams.get('selectedTeam');
    this.event_id = navParams.get('event_id');
    this.createdBy = navParams.get('createdBy');
    this.transportId = navParams.get('transportId');
    this.removeStaffId = navParams.get('staffId');
    this.removeStaffName = navParams.get('staffName');
    if(this.removeStaffId != '' && this.removeStaffName != ''){
      this.isRemove = true;
    }
  }
  
  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({});
    loader.present();
    this.getStaffPlayersList().then(y=>{
      loader.dismiss();
    });
  }

  close(){
    this.viewCtrl.dismiss();
  }

  getStaffPlayersList(){
    return new Promise((resolve) => {
      let loginData = new HttpParams()
          .set('transportId', this.transportId);

        this.http.post(this.global.APIURL + "transports/getStaffPlayerList", loginData,{headers:this.global_api.getHeader()})
          .subscribe((data: any) => {
            if(data.SUCCESS){
              this.staffList = data.GETSTAFFPLAYERLIST;
            }
            resolve(true);
          }, error => {
          });
      });
  }

  addStaff(){
    let person_ids = [];
    $(".person_ids:checked").each(function(){
      person_ids.push($(this).val());
    });
    if(person_ids.length > 0){
      let loader = this.loadingCtrl.create({});
      loader.present();
      let loginData = new HttpParams()
          .set('transportId', this.transportId)
          .set('person_ids', JSON.stringify(person_ids))
          .set('createdBy', this.createdBy);

      this.http.post(this.global.APIURL + "transports/addStaff", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          loader.dismiss();
          this.close();
        }, error => {
        });
    }else{
      this.gFn.presentToast('Please select staff');
    }
  }

  removeStaff(){
    let loader = this.loadingCtrl.create({});
    loader.present();
    let loginData = new HttpParams()
      .set('staffId', this.removeStaffId);

    this.http.post(this.global.APIURL + "transports/removeStaff", loginData,{headers:this.global_api.getHeader()})
      .subscribe((data: any) => {
        if(data.SUCCESS){
          this.gFn.presentToast(data.MESSAGE);
        }
        loader.dismiss();
        this.close();
      }, error => {
      });
  }

}
