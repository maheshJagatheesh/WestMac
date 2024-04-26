import { Component } from '@angular/core';
import { IonicPage, NavController,Events, NavParams,Keyboard, ModalController, LoadingController, Platform } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

@IonicPage()
@Component({
  selector: 'page-rollcalls',
  templateUrl: 'rollcalls.html',
})
export class RollcallsPage {

  PersonData: any = [];
  StaffData:any=[];
  UpcomingSingleEvent: any;
  EventDetails: any;
  rollcallList: any = [];
  staffList: any = [];
  vehicleList: any = [];
  locationTracking: string = '0';
  activeRollcallID: any = '';
  staffId: any = '';
  LocationInterval:any;
  SendLocationToast:any;
  StartedTracking:boolean;
  trackingDetails:any;
  PreviousVehicleId:any='';
  listObservable: any;
  isStaffPassengerOpened: boolean = false;
  staffIsPassenger: any;
  transportId: any;
  passengerLists: any = [];

  
  constructor(public navCtrl: NavController,public http: HttpClient, public storage: Storage,
    public navParams: NavParams,public global: GlobalProvider, public gFn: GlobalFunctionsProvider, 
    private events: Events, private modalCtrl: ModalController, private loadingCtrl: LoadingController,
    private launchNavigator: LaunchNavigator,public geolocation:Geolocation,private platform:Platform,public global_api:GlobalApiProvider) {
      // this.gFn.showMenuIcon()
      /* platform.registerBackButtonAction(() => { 
        this.navCtrl.pop();
        this.navCtrl.push('EventDashboardPage');
      });  */
      // this.gFn.showMenuIcon();
      // this.GetLocation()
      // this.gFn.hideMenuIcon();
      
   // this.getAdditionalPassengerList();
      
  }

  ionViewDidLoad() {
    
    // console.log([].indexOf(5))
    this.storage.get('UpcomingSingleEvent').then((val) => {
      this.UpcomingSingleEvent = JSON.parse(val);
      this.storage.get('EventDetails').then((val)=>{
        this.EventDetails = val[0];
        this.transportId=this.EventDetails.transportId
        // this.EventDetails.transportId=1;
        this.storage.get('loggedInUserData').then((val) => {
          this.PersonData = val;
          let loader = this.loadingCtrl.create({});
          loader.present();
          this.getRollcallList().then(x=>{
            this.getStaffList().then(y=>{
              this.getVehicleList().then(z=>{
                this.getAdditionalPassengerList().then(m=>{
                  loader.dismiss();
                });
              });
            });
          });
        });
      });
    });

    this.setIntervalForRollcallVehicle();
  }  
  ionViewDidEnter(){
    this.highlightMenuIcon();
  }

  setIntervalForRollcallVehicle(){
    if(typeof this.listObservable != 'undefined'){
      this.listObservable.unsubscribe();
    }
    this.listObservable = Observable.interval(3000).subscribe((val) => {
        this.getRollcallList();
        this.getVehicleList();
    });
  }

  stopIntervalForRollcallVehicle(){
    if(typeof this.listObservable != 'undefined'){
      this.listObservable.unsubscribe();
    }
  }

  ionViewWillLeave() {
    this.stopIntervalForRollcallVehicle();
  }

  getRollcallList(){
    return new Promise((resolve) => {
      let loginData = new HttpParams()
        .set('transportId', this.EventDetails.transportId)
        .set('clientId',this.PersonData.CLIENT_ID);
      this.http.post(this.global.APIURL + "transports/getRollcall", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if(data.SUCCESS){
            this.rollcallList = data.GETROLLCALL;
          }
          resolve(true);
        }, error => {
        });
    })
  }

  getStaffList(){
    return new Promise((resolve) => {
      let loginData = new HttpParams()
        .set('transportId', this.EventDetails.transportId);

      this.http.post(this.global.APIURL + "transports/getStaff", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if(data.SUCCESS){
            this.staffList = data.GETSTAFF;
            for(var key in this.staffList){
              if(this.staffList[key].person_id==this.PersonData.PERSON_ID){
                this.StaffData=this.staffList[key];
                this.staffId = this.staffList[key].staff_id;
                if(this.staffList[key].isPassenger == 1){
                  this.staffIsPassenger = true;
                  $(".staffIsPassenger").prop('checked', true);
                }
                if(this.staffList[key].locationEnabled == 1){
                  this.locationTracking = '1';
                  this.checkLocationTrack(this.staffList[key].vehiclesId)
                  setTimeout(() => {
                    $(".locationTracking").prop('checked', true);
                  }, 100);
                  this.SendLocation(this.staffId);
                }
                if(!this.isStaffPassengerOpened && !this.staffIsPassenger){
                  this.isStaffPassengerOpened = true;
                  this.openStaffPassengerModal();
                }
              }
            }
          }
          resolve(true);
        }, error => {
        });
    })
  }

  getVehicleList(){
    return new Promise((resolve) => {
      let loginData = new HttpParams()
        .set('transportId', this.EventDetails.transportId);

      this.http.post(this.global.APIURL + "transports/getVehicles", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if(data.SUCCESS){
            this.vehicleList = data.GETVEHICLES;
          }
          resolve(true);
        }, error => {
        });
    })
  }
  checkLocationTrack(id){
   
      let loginData = new HttpParams()
          .set('transportId', this.EventDetails.transportId)
          .set('person_id', this.PersonData.PERSON_ID)
          .set('locationEnabled', this.locationTracking)
          .set('transportVehicleId', id);
  
        this.http.post(this.global.APIURL + "transports/locationEnabledDisable", loginData,{headers:this.global_api.getHeader()})
          .subscribe((data: any) => {
            if(this.locationTracking=='1' && data.SUCCESS && data.LOCATIONENABLEDDISABLE ){
              this.SendLocationToast=true
              this.StartedTracking=true
              this.trackingDetails={AVAILABLEBUSLIST:data.AVAILABLEBUSLIST,SELECTEDBUS:data.SELECTEDBUS}
              
              console.log(this.trackingDetails)
              // this.SendLocation(this.StaffData.staff_id)
            }
            // else{
            //   this.StartedTracking=false
            //   clearInterval(this.LocationInterval)

            // }
            // this.getStaffList()
          }, error => {
          });

  }

  setLocationTracking(){
    if(this.StaffData.staff_id){
      this.locationTracking = (this.locationTracking == '0')? '1': '0';
      let loginData = new HttpParams()
          .set('transportId', this.EventDetails.transportId)
          .set('person_id', this.PersonData.PERSON_ID)
          .set('locationEnabled', this.locationTracking)
          .set('transportVehicleId', this.PreviousVehicleId);
  
        this.http.post(this.global.APIURL + "transports/locationEnabledDisable", loginData,{headers:this.global_api.getHeader()})
          .subscribe((data: any) => {
            if(this.locationTracking=='1' && data.SUCCESS && data.LOCATIONENABLEDDISABLE ){
              this.SendLocationToast=true
              this.StartedTracking=true
              this.trackingDetails={AVAILABLEBUSLIST:data.AVAILABLEBUSLIST,SELECTEDBUS:data.SELECTEDBUS}
              
              console.log(this.trackingDetails)
              this.SendLocation(this.StaffData.staff_id)
            }
            else{
              this.StartedTracking=false
              clearInterval(this.LocationInterval)

            }
            this.getStaffList()
          }, error => {
          });
    }
    else{
      this.gFn.presentToast('Not have access to activate this feature')
    }
    
  }
  updateVehicle(){
    this.stopIntervalForRollcallVehicle();
    
    let Modal = this.modalCtrl.create('VehicleListPage',{details:this.trackingDetails.AVAILABLEBUSLIST});
    Modal.present();
    Modal.onDidDismiss(data => {
      console.log(data);
      this.PreviousVehicleId=data;
      this.locationTracking='0'
      this.setLocationTracking()
      this.setIntervalForRollcallVehicle();
    });

  }
  SendLocation(staffId){
    this.LocationInterval=setInterval(()=>{
      this.geolocation.getCurrentPosition().then((resp) => {
        // console.log(resp)
        return new Promise((resolve) => {
          let loginData = new HttpParams()
            .set('staffId', staffId )
            .set('latitude', (resp.coords.latitude.toFixed(10)))
            .set('longitude', (resp.coords.longitude.toFixed(10)));
    
          this.http.post(this.global.APIURL + "transports/updateGPSLocation", loginData,{headers:this.global_api.getHeader()})
            .subscribe((data: any) => {
              if(data.SUCCESS && data.UPDATEGPSLOCATION && this.SendLocationToast){
                this.gFn.presentToast('Location Tracking Started')
                
              }
              else if(!data.SUCCESS && this.SendLocationToast){
                this.gFn.presentToast('Location Tracking not starting')
              }
              this.SendLocationToast=false
              resolve(true);
            }, error => {
              if(this.SendLocationToast){
                this.gFn.presentToast('Location Tracking not starting')
                this.SendLocationToast=false
              }
              resolve(false);
            });
        })
      
      })

    },5000)
    
  }

  openRollcallModal() {
    this.stopIntervalForRollcallVehicle();

    this.gFn.hideMenuIcon()
    let data = {
      event_id: this.UpcomingSingleEvent.event_id,
      transportId: this.EventDetails.transportId,
      selectedTeam: this.PersonData.SELECTEDTEAM,
      client_id: this.PersonData.CLIENT_ID,
      createdBy: this.PersonData.PERSON_ID
    }
    let rollcallModal = this.modalCtrl.create(
      'AddRollcallsPage',
      data,
      {
        enableBackdropDismiss: true,
        showBackdrop: true
      }
    );
    rollcallModal.onDidDismiss(() => {
     
      this.ionViewDidLoad();
      this.gFn.showMenuIcon()
      this.setIntervalForRollcallVehicle();
    });
    rollcallModal.present();
  }

  openStaffModal(staffId = '', staffName = '') {
    this.stopIntervalForRollcallVehicle();

    let data = {
      event_id: this.UpcomingSingleEvent.event_id,
      transportId: this.EventDetails.transportId,
      staffId: staffId,
      staffName: staffName,
      selectedTeam: this.PersonData.SELECTEDTEAM,
      client_id: this.PersonData.CLIENT_ID,
      createdBy: this.PersonData.PERSON_ID
    }
    let staffModal = this.modalCtrl.create(
      'TransportAddStaffPage',
      data,
      {
        enableBackdropDismiss: true,
        showBackdrop: true
      }
    );
    staffModal.onDidDismiss(() => {
      this.ionViewDidLoad();
    });
    staffModal.present();
  }

  openStaffPassengerModal() {
    this.stopIntervalForRollcallVehicle();

    let data = {
      event_id: this.UpcomingSingleEvent.event_id,
      transportId: this.EventDetails.transportId,
      staffId: this.staffId,
      selectedTeam: this.PersonData.SELECTEDTEAM,
      client_id: this.PersonData.CLIENT_ID,
      createdBy: this.PersonData.PERSON_ID
    }
    let staffModal = this.modalCtrl.create(
      'TransportStaffPassengerPage',
      data,
      {
        enableBackdropDismiss: true,
        showBackdrop: true
      }
    );
    staffModal.onDidDismiss(() => {
      this.ionViewDidLoad();
    });
    staffModal.present();
  }

  openVehicleModal(vehicleId = '', vehicleName = '') {
    this.stopIntervalForRollcallVehicle();

    let data = {
      event_id: this.UpcomingSingleEvent.event_id,
      transportId: this.EventDetails.transportId,
      vehicleId: vehicleId,
      vehicleName: vehicleName,
      selectedTeam: this.PersonData.SELECTEDTEAM,
      client_id: this.PersonData.CLIENT_ID,
      createdBy: this.PersonData.PERSON_ID
    }
    let vehicleModal = this.modalCtrl.create(
      'VehiclePage',
      data,
      {
        enableBackdropDismiss: true,
        showBackdrop: true
      }
    );
    vehicleModal.onDidDismiss(() => {
      this.ionViewDidLoad();
    });
    vehicleModal.present();
  }

  goToRollcallDetails(rollcallID, rollcallName, rollcalIisLocked){
    if(this.staffId == ''){
      this.gFn.presentAlert('Access Denied', 'You are not a staff');
      return;
    }

    this.stopIntervalForRollcallVehicle();

    this.activeRollcallID = rollcallID;
    let data = {
      rollcallID: rollcallID,
      transportId: this.EventDetails.transportId,
      rollcalIisLocked: rollcalIisLocked,
      rollcallName: rollcallName
    };
    setTimeout(() => {
      let Modal = this.modalCtrl.create(
        'RollcallsPlayersPage',data);
      Modal.onDidDismiss(() => {
        this.getRollcallList()
        this.getVehicleList()
        this.setIntervalForRollcallVehicle();
      });
      Modal.present();
      // this.navCtrl.push('RollcallsPlayersPage', data);
      this.gFn.hideMenuIcon()
      this.activeRollcallID = '';
    }, 300);
  }

  backArrow(){
    this.navCtrl.pop();
    this.navCtrl.push('EventDashboardPage');
    // this.gFn.showMenuIcon()
  }
  openVehicle(){
    this.navCtrl.push('VehicleListPage');
  }
  gotoVehicleDetails(val){
    this.stopIntervalForRollcallVehicle();
    this.gFn.hideMenuIcon();
    let Modal = this.modalCtrl.create('VehicleDetailsPage', {details:val});
    Modal.onDidDismiss(() => {
      this.getRollcallList();
      this.getVehicleList();
      this.setIntervalForRollcallVehicle();
    });
    Modal.present();
  }
  highlightMenuIcon() {
    // $('.tabs .tab-button[aria-selected=true]:nth-child(1)').attr('aria-selected','false')
    $('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected', 'true')
    $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({
      'mask-image': 'url(../assets/images/menu/home.svg)',
      'height': '22px',
      'color': '#dedede'
    })
    // $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': 'url(../assets/images/menu/events-blue.svg)',
    // 'height': '36px',
    // 'color': '#43B7CC'})
  }

  updateStaffIsPassenger(){
    this.staffIsPassenger = (this.staffIsPassenger == '1')? '0':'1';
    /* let loader = this.loadingCtrl.create({});
    loader.present(); */
    let loginData = new HttpParams()
      .set('transportId', this.EventDetails.transportId)
      .set('staffId', this.staffId)
      .set('isPassenger', this.staffIsPassenger);

    this.http.post(this.global.APIURL + "transports/updateStaffIsPassenger", loginData,{headers:this.global_api.getHeader()})
      .subscribe((data: any) => {
        //loader.dismiss();
      }, error => {
        //loader.dismiss();
      });
  }

  goToAdditionalPassPage(transport_Id){
    this.navCtrl.push('AdditionalPassengerPage',{transportId:transport_Id});
  }

  getAdditionalPassengerList(){
    return new Promise((resolve) => {
    let loginData = new HttpParams()
        .set('transportId',this.EventDetails.transportId);
        /*let loading = this.loadingCtrl.create();
        loading.present();*/
        this.http.post<any>(this.global.APIURL + "transports/getAdditionalPassenger", loginData,{headers:this.global_api.getHeader()})
      .subscribe(response => {
          //loading.dismiss();
          if(response.SUCCESS){
            this.passengerLists = [];
            let passengerList = response.ADDITIONALPASSENGER;
            for(var key in passengerList){
              this.passengerLists.push(passengerList[key]);
            }
          }
          resolve(true);
        }, error => {
          //loading.dismiss();
        });
      })
  }

}
