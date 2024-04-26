import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
@IonicPage()
@Component({
  selector: 'page-last-rollcall',
  templateUrl: 'last-rollcall.html',
})
export class LastRollcallPage {
  passengersList:any=[];
  total:any=0;
  StaffListFilter:any=[];
  VehicleListFilter:any=[];
  StatusListFilter:any=[];
  SportListFilter:any=[];
  TeamListFilter:any=[];
  PersonData:any;
  getFilterSuccess:any='0'
  vehiclesId:any='';
  staffId:any='';
  passengersListSuccess:any='0'
  UpcomingSingleEvent:any;
  getPassengerFilters:any={}
  loader:any;
  ShowFilter:boolean=false;
  EventDetails:any;
  isFilterEnabled:any=0;
  vehicleDetails:any;
  getNameFilter:any='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient, public storage: Storage,
    public global: GlobalProvider, public gFn: GlobalFunctionsProvider, public loadingCtrl:LoadingController, public speechRecognition: SpeechRecognition,public global_api:GlobalApiProvider) {
      this.vehicleDetails=navParams.get('detail')
      console.log(this.vehicleDetails)
     
      
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
   
    console.log('ionViewDidLoad LastRollcallPage');
    this.storage.get('EventDetails').then((val)=>{
      this.EventDetails = val[0];
   
      this.storage.get('UpcomingSingleEvent').then((val) => {
        this.UpcomingSingleEvent = JSON.parse(val);
        this.storage.get('loggedInUserData').then((val1) => {
          this.PersonData = val1;
          
          this.getFiltersList()
          this.loader = this.loadingCtrl.create({});
          this.loader.present();
          this.getPassengersList().then(y=>{
            this.loader.dismiss();
            // this.isUpdating = false;
          });
        })
      })
    })
    
  }
  getPassengersList(){
    return new Promise((resolve) => {
      let loginData = new HttpParams()
        .set('transportVehicleId',this.vehicleDetails.vehiclesId)
        .set('nameFilter',this.getPassengerFilters.nameFilter)
        .set('sportIds',JSON.stringify(this.getPassengerFilters.sportId))
        .set('vehiclesIds',JSON.stringify(this.getPassengerFilters.vehiclesId))
        .set('teamIds',JSON.stringify(this.getPassengerFilters.teamId));
        
      this.http.post(this.global.APIURL + "transports/getPassengerByBus", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if(data.SUCCESS){
            this.passengersList=data.PASSENGERLIST
            this.total=data.TOTALPASSENGER
            resolve(true);
          }
          else{
           
            resolve(false);
          }
        }, error => {
         
          resolve(false)
        });
    })
  }
  getFiltersList(){
    return new Promise((resolve) => {
      let Data = new HttpParams()
        .set('transportId', this.EventDetails.transportId)
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

}
