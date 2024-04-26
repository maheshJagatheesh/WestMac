import { Component } from '@angular/core';
import { IonicPage, NavController,Events, NavParams,Keyboard, LoadingController, ActionSheetController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the ScanningPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scanning',
  templateUrl: 'scanning.html',
})
export class ScanningPage {

  passengersList: any = [];
  VehicleListFilter: any = [];
  presentCount:any = 0;
  TotalCount:any = 0;
  vehiclesId:any='';
  staffId:any='';
  removeOptions:any = [];
  scannedID: any = '';
  presentStatusId: any = '';
  getPassengerFilters:any = {};
  rollcallID:any = '';
  clientId:any = '';

  constructor(public navCtrl: NavController,public http: HttpClient, public storage: Storage,
    public navParams: NavParams,public global: GlobalProvider, public gFn: GlobalFunctionsProvider, 
    private events: Events, private loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, private barcodeScanner: BarcodeScanner,public global_api:GlobalApiProvider) {
      this.passengersList = navParams.get('passengersList');
      this.VehicleListFilter = navParams.get('VehicleListFilter');
      this.presentCount = navParams.get('presentCount');
      this.TotalCount = navParams.get('TotalCount');
      this.staffId = navParams.get('staffId');
      this.vehiclesId = navParams.get('vehiclesId');
      this.removeOptions = navParams.get('removeOptions');
      this.presentStatusId = navParams.get('presentStatusId');
      this.rollcallID = navParams.get('rollcallID');
      this.clientId = navParams.get('clientId');
      this.gFn.hideMenuIcon();
      gFn.hideFormAccessoryBar();
  }

  ionViewDidLoad() {
    this.getPassengerFilters={
      isDynamic:'',
      nameFilter:'',
      rollcallStatusId:[],
      staffId:[],
      vehiclesId:[],
    };
    this.getPassengersList().then(y=>{
      if(y){
        this.scannedID = '';
        this.barcodeScanner.scan().then(barcodeData => {
            //alert('Barcode data'+ JSON.stringify(barcodeData));
            this.scannedID = barcodeData.text;
            let passengerFound = false;
            let checkedIn = false;
            let isPresent = false;
            let rollcallPersonsId = '';
            let passengerName = '';
            for(let key in this.passengersList){
              if(this.scannedID != '' && (this.passengersList[key].ABF == this.scannedID || this.passengersList[key].person_id == this.scannedID)){
                passengerFound = true;
                rollcallPersonsId = this.passengersList[key].rollcallPersonsId;
                passengerName = this.passengersList[key].firstName + ' ' + this.passengersList[key].lastName;
                if(this.passengersList[key].isRemove == 1 || this.passengersList[key].isPresent == 1){
                  checkedIn = true;
                }
                if(this.passengersList[key].isPresent == 1){
                  isPresent = true;
                }
                break;
              }
            }
            if(!passengerFound && !barcodeData.cancelled){
              this.gFn.presentToast('Passenger not found');
              this.ionViewDidLoad();
            }
            if(passengerFound && !checkedIn){
              this.scannedID = '';
              this.updatePassengerStatus(rollcallPersonsId);
            }
            if(passengerFound && isPresent){
              this.gFn.presentToast(passengerName+ ' already checked in');
            }
            if(barcodeData.cancelled){
              this.backArrow();
            }
         }).catch(err => {
            this.gFn.presentToast('Scanning problem', 'danger');
            this.ionViewDidLoad();
         });
      }else{
        this.gFn.presentToast('Data load error');
        this.backArrow();
      }
    });
  }
  
  ionViewDidEnter(){
    this.gFn.hideFormAccessoryBar();
  }

  ionViewWillLeave(){
    this.gFn.hideFormAccessoryBar(true);
  }


  backArrow(){
    this.navCtrl.pop();
    this.navParams.get("parentPage").ionViewDidLoad();
  }

  goToRollcallsPage(){
    this.navCtrl.pop();
    this.navCtrl.push('RollcallsPage');
  }
 
  getPassengersList(){
    return new Promise((resolve) => {
      let loginData = new HttpParams()
        .set('rollcallId', this.rollcallID)//this.rollcallID,22
        .set('isDynamic',this.getPassengerFilters.isDynamic)
        .set('nameFilter',this.getPassengerFilters.nameFilter)
        .set('rollcallStatusIds',JSON.stringify(this.getPassengerFilters.rollcallStatusId))
        .set('staffIds',JSON.stringify(this.getPassengerFilters.staffId))
        .set('vehiclesIds',JSON.stringify(this.getPassengerFilters.vehiclesId))
        .set('clientId',this.clientId);
      this.http.post(this.global.APIURL + "transports/getPassengers", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if(data.SUCCESS){
            this.passengersList = data.GETPASSENGERS;
            this.presentCount = data.PRESENTCOUNT;
            this.TotalCount = data.PRESENTCOUNT + data.UNCHECKCOUNT;
            resolve(true);
          }else{
            resolve(false);
          }
        }, error => {
          resolve(false);
        });
    })
  }
  
  updatePassengerStatus(rollcallPersonId, rollcallStatusId = ''){
    let loginData = new HttpParams()
    .set('rollcallPersonId', rollcallPersonId)
    .set('staffId',this.staffId)
    .set('vehiclesId',this.vehiclesId);

    if(rollcallStatusId != ''){
      loginData = loginData.set('rollcallStatusId', rollcallStatusId);
    }else{
      loginData = loginData.set('rollcallStatusId', this.presentStatusId);
    }

    this.http.post(this.global.APIURL + "transports/updateRemovePassengerByStaff", loginData,{headers:this.global_api.getHeader()})
      .subscribe((data: any) => {
        if(data.UPDATEREMOVEPASSENGERBYSTAFF){
          this.gFn.presentToast(data.MESSAGE);
        }else{
          this.gFn.presentToast(data.MESSAGE);
        }
        this.ionViewDidLoad();
      }, error => {
      });
  }

  presentRemoveActionSheet(rollcallPersonId) {
    let options = [];
    for(let i=0; i < this.removeOptions.length; i++){
      options.push({
        text: this.removeOptions[i].statusName,
        handler: () => {
          this.updatePassengerStatus(rollcallPersonId, this.removeOptions[i].rollcallStatusId);
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
      buttons: options
    });
    actionSheet.present();
  }

  unscratchPassenger(rollcallPersonId){
    let loginData = new HttpParams()
    .set('rollcallPersonId', rollcallPersonId)
    .set('staffId', this.staffId)
    .set('vehiclesId', this.vehiclesId);

    this.http.post(this.global.APIURL + "transports/unscratchByStaff", loginData,{headers:this.global_api.getHeader()})
      .subscribe((data: any) => {
        if(data.UNSCRATCHBYSTAFF){
          this.gFn.presentToast(data.MESSAGE);
        }else{
          this.gFn.presentToast(data.MESSAGE);
        }
        this.ionViewDidLoad();
      }, error => {
      });
  }

  changeVehicle(vehicleId){
    this.vehiclesId = vehicleId;
  }

}
