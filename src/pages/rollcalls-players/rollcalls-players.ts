import { Component } from '@angular/core';
import { IonicPage, NavController,Events, NavParams,Keyboard, ModalController, LoadingController, ActionSheetController, ViewController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

@IonicPage()
@Component({
  selector: 'page-rollcalls-players',
  templateUrl: 'rollcalls-players.html',
})
export class RollcallsPlayersPage {
  
  passengersList: any = [];
  passengersListRoot:any=[];
  passengersListSuccess:any='0'
  rollcallID: any='';
  getPassengerFilters:any={}
  rollcallName: any;
  ShowFilter:boolean=false;
  UpcomingSingleEvent:any;
  PersonData:any;
  getFilterSuccess:any='0'
  StaffListFilter:any=[];
  VehicleListFilter:any=[];
  StatusListFilter:any=[];
  TeamListFilter:any=[];
  SportListFilter:any=[];
  getNameFilter:any='';
  loader:any;
  vehiclesId:any='';
  staffId:any= 0;
  Count:any = 0;
  TotalCount:any= 0;
  removeOptions:any = [];
  activeFilter:any;
  transportId: any;
  activePassengerId: any= '';
  isUpdating: boolean = false;
  presentStatusId: any = '';
  isFilterEnabled:any=0;
  currentVehicleDetails:any;
  currentVehicleKey:any;
  LastVehicleSelected:any;
  rollcalIisLocked: any = 0;
  listObservable: any;
  firstLoad: boolean = true;
  
  constructor(public navCtrl: NavController,public http: HttpClient, public storage: Storage,
    public navParams: NavParams,public global: GlobalProvider, public gFn: GlobalFunctionsProvider, 
    private events: Events, private modalCtrl: ModalController, private loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController,
    public keyboard:Keyboard, public speechRecognition: SpeechRecognition, public viewCtrl:ViewController,public global_api:GlobalApiProvider) {
      this.rollcallID = navParams.get('rollcallID');
      this.rollcallName = navParams.get('rollcallName');
      this.activeFilter='all'
      this.transportId = navParams.get('transportId');
      this.rollcalIisLocked = navParams.get('rollcalIisLocked');
      // this.gFn.hideMenuIcon();
      gFn.hideFormAccessoryBar();
  }

  ionViewDidLoad() {
    this.getPassengerFilters={
      isDynamic:'',
      nameFilter:'',
      sportId:[],
      teamId:[],
      rollcallStatusId:[],
      staffId:[],
      vehiclesId:[],
    }
    this.activePassengerId = '';
    this.storage.get('UpcomingSingleEvent').then((val) => {
      this.UpcomingSingleEvent = JSON.parse(val);
      this.storage.get('loggedInUserData').then((val1) => {
        this.PersonData = val1;
        // console.log(this.PersonData)
        this.getFiltersList().then(x=>{
          this.getPassengersList().then(y=>{
            if(this.isUpdating && (this.Count == this.TotalCount)){
              this.gFn.presentToast('Rollcall completed', 'success');
            }
            this.isUpdating = false;
          });
        });
        // this.loader = this.loadingCtrl.create({});
        // this.loader.present();
      })
    })
  }
  
  ionViewDidEnter(){
    this.gFn.hideFormAccessoryBar();
    if(typeof this.listObservable != 'undefined'){
      this.listObservable.unsubscribe();
    }
    this.listObservable = Observable.interval(5000).subscribe((val) => {
      this.firstLoad = false;
      this.getPassengersList().then(y=>{
        if(this.isUpdating && (this.Count == this.TotalCount)){
          this.gFn.presentToast('Rollcall completed', 'success');
        }
        this.isUpdating = false;
      });
    });
  }

  ionViewWillLeave(){
    this.gFn.hideFormAccessoryBar(true);
    if(typeof this.listObservable != 'undefined'){
      this.listObservable.unsubscribe();
    }
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
        .set('clientId',this.PersonData.CLIENT_ID)
        .set('sportIds',JSON.stringify(this.getPassengerFilters.sportId))
        .set('teamIds',JSON.stringify(this.getPassengerFilters.teamId))
        .set('mainStaffId',this.staffId);
      this.http.post(this.global.APIURL + "transports/getPassengers", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if(data.SUCCESS){
            this.passengersListRoot=data
            this.SubFilter(this.activeFilter)
            // console.log(this.passengersListRoot)
            // this.passengersList = data.GETPASSENGERS;
            // this.presentCount = data.PRESENTCOUNT;
            // this.TotalCount=this.passengersList.length
	          // this.removeOptions = data.PASSENGERREMOVEOPTION;
            this.passengersListSuccess='1'
            resolve(true);
          }
          else{
            this.passengersListSuccess='2'
            resolve(false);
          }
        }, error => {
          this.passengersListSuccess='2'
          resolve(false)
        });
    })
  }
  SubFilter(key){
    $('.FilterCard').find('.unactive').removeClass('.active')
    
    this.activeFilter=key
    if(this.passengersListRoot.LASTVEHICLEID != '' && this.firstLoad){
      this.vehiclesId = this.passengersListRoot.LASTVEHICLEID;
    }
    this.rollcalIisLocked = this.passengersListRoot.ISLOCKED;
    if(key=='all'){
      this.passengersList = this.passengersListRoot.GETPASSENGERS;
      if(this.isFilterEnabled<=0){
        this.Count = this.passengersListRoot.PRESENTCOUNT;
      }
      else{
        this.Count = this.passengersListRoot.COUNT;
      }
      this.TotalCount=this.passengersListRoot.PRESENTCOUNT+this.passengersListRoot.UNCHECKCOUNT
      this.removeOptions = this.passengersListRoot.PASSENGERREMOVEOPTION;
      this.presentStatusId = this.passengersListRoot.PRESENTSTATUSID;
    }
    else if(key=='unchecked'){
      this.passengersList=[]
      this.Count = 0;
      this.TotalCount=this.passengersListRoot.PRESENTCOUNT+this.passengersListRoot.UNCHECKCOUNT
      var DuppassengersListRoot=this.passengersListRoot;
      for(var key1 in DuppassengersListRoot.GETPASSENGERS){
        if(!DuppassengersListRoot.GETPASSENGERS[key1].isPresent && !DuppassengersListRoot.GETPASSENGERS[key1].isRemove){
          this.passengersList.push(DuppassengersListRoot.GETPASSENGERS[key1])
          this.Count++;
        }
      }
    }
    else if(key=='scratched'){
      this.passengersList=[]
      this.Count = 0;
      var DuppassengersListRoot=this.passengersListRoot;
      for(var key1 in DuppassengersListRoot.GETPASSENGERS){
        if(DuppassengersListRoot.GETPASSENGERS[key1].isRemove==1){
          this.passengersList.push(DuppassengersListRoot.GETPASSENGERS[key1])
          this.Count++;
        }
      }
      this.TotalCount=this.passengersListRoot.PRESENTCOUNT+this.passengersListRoot.UNCHECKCOUNT+this.Count
    }
  }
  getFiltersList(){
    return new Promise((resolve) => {
      let Data = new HttpParams()
        .set('transportId', this.transportId)
        .set('clientId',this.PersonData.CLIENT_ID);
      this.http.post(this.global.APIURL + "transports/getFilterList", Data,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if(data.SUCCESS){
            this.StaffListFilter=data.STAFFLIST;
            this.VehicleListFilter=data.VEHICLELIST;
            this.StatusListFilter=data.STATUSLIST;
            this.SportListFilter=data.SPORTLIST;
            this.TeamListFilter=data.TEAMLIST;
            if(this.StaffListFilter.length>0 || this.VehicleListFilter.length>0 || this.StatusListFilter.length>0){
              this.getFilterSuccess='1' //Success true and any filter found
              // console.log('data.STATUSLIST.length',this.StatusListFilter.length)
            }
            else{
              this.getFilterSuccess='2' //Success false or no filter found
            }
            if(this.VehicleListFilter.length && this.vehiclesId == ''){
              this.vehiclesId = this.VehicleListFilter[0].vehiclesId;
              this.currentVehicleKey=this.currentVehicleKey?this.currentVehicleKey:0
              this.currentVehicleDetails=this.VehicleListFilter[0];
              console.log(this.currentVehicleDetails)
            }
            if(this.StaffListFilter.length){
              for(let i=0; i < this.StaffListFilter.length; i++){
                if(this.PersonData.PERSON_ID == this.StaffListFilter[i].person_id){
                  this.staffId = this.StaffListFilter[i].staff_id;
                }
              }
            }
          }
          else{
            this.getFilterSuccess='2' //Success false or no filter found
          }
          resolve(true);
        }, error => {
          this.getFilterSuccess='3' // connection or data issue
        });
    })
  }
  // ionViewDidLeave(){
  //   this.gFn.showMenuIcon()
    
  //   this.viewCtrl.dismiss()
  // }

  assignFilters(key,value,event){
    
    if($(event.target).hasClass('checked')){
      $(event.target).removeClass('checked')
    }
    else{
      $(event.target).addClass('checked')
    }
    
    if(this.getPassengerFilters[key].indexOf(value)==-1){
      this.getPassengerFilters[key].push(value);
      this.isFilterEnabled++;
    }
    else{
      var index=this.getPassengerFilters[key].indexOf(value)
      this.getPassengerFilters[key].splice(index,1)
      this.isFilterEnabled--;
    }
    this.getPassengersList()
  }
  SearchFilter(key,value){
    console.log(key);
    console.log(value);
    if(this.getPassengerFilters[key]==value){
      this.getPassengerFilters[key]=''
      this.isFilterEnabled--;
      console.log(this.isFilterEnabled)
    }
    else{
      this.isFilterEnabled++;
      console.log(this.isFilterEnabled)
      this.getPassengerFilters[key]=value;
    }
    if(value==''){
      this.isFilterEnabled=0
    }
    this.getPassengersList()
  }

  listen()
  {
    this.speechRecognition.isRecognitionAvailable()
    .then((available: boolean) => {
      if(available){
        // Check permission
        this.speechRecognition.hasPermission()
          .then((hasPermission: boolean) => {
              if(hasPermission){
                this.gFn.presentToast('Listening...');
                this.speechRecognition.startListening()
                  .subscribe(
                    (matches: Array<string>) => {
                      console.log(matches);
                      // $("page-rollcalls-players #srch-term").blur();
                      // $("page-rollcalls-players #srch-term").val(matches[0]).focus();
                      this.getNameFilter=matches[0]
                      this.SearchFilter('nameFilter',matches[0]);
                    },
                    (onerror) => console.log('error:', onerror)
                  );
                  setTimeout(() => {
                    // Stop the recognition process (iOS only)
                    this.speechRecognition.stopListening();
                  }, 5000);
              }else{
                // Request permissions
                this.speechRecognition.requestPermission()
                  .then(
                    () => {
                      this.gFn.presentToast('Request Granted');
                      this.gFn.presentToast('Listening...');
                      this.speechRecognition.startListening()
                        .subscribe(
                          (matches: Array<string>) => {
                            console.log(matches);
                            // $("page-rollcalls-players #srch-term").blur();
                            // $("page-rollcalls-players #srch-term").val(matches[0]).focus();
                              this.getNameFilter=matches[0]
                             this.SearchFilter('nameFilter',matches[0]);

                          },
                          (onerror) => console.log('error:', onerror)
                        );
                        setTimeout(() => {
                          // Stop the recognition process (iOS only)
                          this.speechRecognition.stopListening();
                        }, 5000);
                    },
                    () => this.gFn.presentToast('Request Denied')
                  )
              }
            }
          )
      }else{
        this.gFn.presentToast('Speech recognition not available');
      }
    });
  }
  

  backArrow(){
    this.gFn.showMenuIcon()
    // this.backArrow()
    this.viewCtrl.dismiss()
    // this.navCtrl.push('RollcallsPage');
  }
  showFilter(ShowFilter){
    
    if(this.getFilterSuccess=='1'){
      if(ShowFilter){
        $('.filterImage').css('transform','rotate(0deg)')
        this.ShowFilter=false
      }
      else{
        $('.filterImage').css('transform','rotate(180deg)')
        this.ShowFilter=true
      }

    }
    else if(this.getFilterSuccess=='2'){
      this.gFn.presentToast('Filters not found')

    }
    else{
      this.gFn.presentToast('Data Issue or Connection Issue found')
    }
  }
  goToPlayerRollcallLog(passengers, e){
    if(e.target.className != 'status' && !$(e.target).hasClass('event-next')){
      let playerRollcallLogModal = this.modalCtrl.create(
        'RollcallLogsPage',
        {passengers:passengers},
        {
          enableBackdropDismiss: true,
          showBackdrop: true
        }
      );
      playerRollcallLogModal.present();
    }
  }
  
  updatePassengerStatus(rollcallPersonId, rollcallStatusId = ''){
    if(this.isUpdating){
      return;
    }
    this.isUpdating = true;
    this.activePassengerId = rollcallPersonId;
    // let loader = this.loadingCtrl.create({});
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
        // loader.dismiss();
        if(data.UPDATEREMOVEPASSENGERBYSTAFF){
          this.gFn.presentToast(data.MESSAGE);
        }else{
          this.gFn.presentToast(data.MESSAGE);
        }
        this.ionViewDidLoad();
      }, error => {
        // loader.dismiss();
        this.isUpdating = false;
      });
  }

  presentRemoveActionSheet(rollcallPersonId) {
    let Modal = this.modalCtrl.create('TransportRemoveModalPage',{removeOptions:this.removeOptions});
    Modal.present();
    Modal.onDidDismiss(rollcallStatusId => {
      console.log(rollcallStatusId);
      this.updatePassengerStatus(rollcallPersonId, rollcallStatusId);
    });
    // let options = [];
    // for(let i=0; i < this.removeOptions.length; i++){
    //   options.push({
    //     text: this.removeOptions[i].statusName,
    //     handler: () => {
    //       this.updatePassengerStatus(rollcallPersonId, this.removeOptions[i].rollcallStatusId);
    //     }
    //   });
    // }
    // options.push(
    //   {
    //     text: 'Cancel',
    //     role: 'cancel'
    //   }
    // );
    // let actionSheet = this.actionSheetCtrl.create({
    //   buttons: options
    // });
    // actionSheet.present();
  }

  unscratchPassenger(rollcallPersonId){
    if(this.isUpdating){
      return;
    }
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

  openScanner(){
    if(this.rollcalIisLocked == 1){
      this.gFn.presentToast('Current rollcall is locked');
      return false;
    }
    let data = {
      passengersList: this.passengersList,
      VehicleListFilter: this.VehicleListFilter,
      presentCount: this.Count,
      TotalCount: this.TotalCount,
      removeOptions: this.removeOptions,
      staffId: this.staffId,
      vehiclesId: this.vehiclesId,
      presentStatusId: this.presentStatusId,
      rollcallID: this.rollcallID,
      clientId: this.PersonData.CLIENT_ID,
      parentPage: this
    }
     this.navCtrl.push('ScanningPage', data);
  }

  removeRollcall(){
    let loader = this.loadingCtrl.create({});
    loader.present();
    let loginData = new HttpParams()
      .set('rollcallId', this.rollcallID);

    this.http.post(this.global.APIURL + "transports/removeRollcall", loginData,{headers:this.global_api.getHeader()})
      .subscribe((data: any) => {
        if(data.SUCCESS){
          this.gFn.presentToast(data.MESSAGE);
          if(data.REMOVEROLLCALL){
            this.backArrow();
          }
        }
        loader.dismiss();
      }, error => {
        loader.dismiss();
      });
  }

  lockUnlockRollcall(){
    let loader = this.loadingCtrl.create({});
    loader.present();
    let loginData = new HttpParams()
      .set('rollcallId', this.rollcallID)
      .set('lock', (this.rollcalIisLocked==0)?'1':'0');

    this.http.post(this.global.APIURL + "transports/lockUnlockRollcall", loginData,{headers:this.global_api.getHeader()})
      .subscribe((data: any) => {
        if(data.SUCCESS){
          this.gFn.presentToast(data.MESSAGE);
          if(data.ISLOCKED){
            this.rollcalIisLocked = (this.rollcalIisLocked==0)?1:0;
          }
        }
        loader.dismiss();
      }, error => {
        loader.dismiss();
      });
  }

  changeVehicle(vehicleDetails){
    // console.log(vehicleDetails)
    this.currentVehicleKey=vehicleDetails
    // this.currentVehicleDetails=vehicleDetails
    // console.log(this.VehicleListFilter)
    this.currentVehicleDetails=this.VehicleListFilter[parseInt(vehicleDetails)]
    
    this.vehiclesId = this.currentVehicleDetails.vehiclesId;
    // console.log(this.vehiclesId)
  }
 
}
