import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the VehiclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vehicle',
  templateUrl: 'vehicle.html',
})
export class VehiclePage {

  client_id: any;
  selectedTeam: any;
  event_id: any;
  createdBy: any;
  vehicleName: any = '';
  vehicleCapacity:any='';
  transportId: any;
  removeVehicleId: any;
  removeVehicleName: any;
  savedVehicleList: any = [];
  isRemove: boolean = false;

  constructor(public navCtrl: NavController,public http: HttpClient, public navParams: NavParams, private viewCtrl: ViewController,
    public global: GlobalProvider, public gFn: GlobalFunctionsProvider, private loadingCtrl: LoadingController,public toastCtrl:ToastController,public global_api:GlobalApiProvider) {
    this.client_id = navParams.get('client_id');
    this.selectedTeam = navParams.get('selectedTeam');
    this.event_id = navParams.get('event_id');
    this.createdBy = navParams.get('createdBy');
    this.transportId = navParams.get('transportId');
    this.removeVehicleId = navParams.get('vehicleId');
    this.removeVehicleName = navParams.get('vehicleName');
    if(this.removeVehicleId != '' && this.removeVehicleName != ''){
      this.isRemove = true;
      this.vehicleName = this.removeVehicleName;
    }
  }
  
  ionViewDidLoad() {
    this.getSavedVehicleList();
  }

  close(){
    this.viewCtrl.dismiss();
  }

  getSavedVehicleList(){
    return new Promise((resolve) => {
      let loginData = new HttpParams()
        .set('transportId', this.transportId);

      this.http.post(this.global.APIURL + "transports/getSavedVehicles", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if(data.SUCCESS){
            this.savedVehicleList = data.GETVEHICLES;
          }
          resolve(true);
        }, error => {
        });
    })
  }

  selectVehicle(vehicle){
    vehicle.active = !vehicle.active;
  }

  addSavedVehicle(){
    let vehicleIDs = [];
    $('.well.select-card.savedVehicle.active').each( function(){
      if($(this).attr('data-id')){
        vehicleIDs.push($(this).attr('data-id'));
      }
    });
    if(vehicleIDs.length > 0) {
      let loader = this.loadingCtrl.create({});
      loader.present();
      let loginData = new HttpParams()
          .set('transportId', this.transportId)
          .set('vehicleIds', JSON.stringify(vehicleIDs))
          .set('createdBy', this.createdBy);

      this.http.post(this.global.APIURL + "transports/addSavedVehicle", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          loader.dismiss();
          this.close();
        }, error => {
        });
    }else{
      this.gFn.presentToast('Please select a vehicle');
    }
  }

  addVehicle(){
    console.log(this.vehicleCapacity)
    if(this.vehicleName.trim().length > 0 && this.vehicleCapacity > 0){
      let loader = this.loadingCtrl.create({});
      loader.present();
      let loginData = new HttpParams()
          .set('transportId', this.transportId)
          .set('vehicleName', this.vehicleName)
          .set('createdBy', this.createdBy)
          .set('vehicleCapacity',this.vehicleCapacity);

      this.http.post(this.global.APIURL + "transports/addVehicle", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          loader.dismiss();
          this.close();
        }, error => {
        });
    }
    else if(this.vehicleName.trim().length <= 0){
      this.gFn.presentToast('Please enter vehicle name');
    }
    else if(this.vehicleCapacity <= 0){
      this.gFn.presentToast('Please enter vehicle capacity');
    }
  }

  removeVehicle(){
    let loader = this.loadingCtrl.create({});
    loader.present();
    let loginData = new HttpParams()
        .set('vehicleId', this.removeVehicleId);

    this.http.post(this.global.APIURL + "transports/removeVehicle", loginData,{headers:this.global_api.getHeader()})
      .subscribe((data: any) => {
        if(data.SUCCESS){
          this.gFn.presentToast(data.MESSAGE, 'success');
        }
        loader.dismiss();
        this.close();
      }, error => {
      });
  }

}
