import { Component, ViewChild , ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, LoadingController, ViewController } from 'ionic-angular';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { Subscription } from 'rxjs/Subscription';
import { GlobalProvider } from '../../providers/global/global';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
declare var google;
@IonicPage()
@Component({
  selector: 'page-vehicle-details',
  templateUrl: 'vehicle-details.html',
})
export class VehicleDetailsPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentMapTrack = null;
  positionSubscription: Subscription;
  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
  LocationInterval:any;
  vehicleDetails:any;
  BusDetailApi:string;
  BusDetailData:any;
  EventDetails:any;
  loader:any;
  ShowMap:any;
  totalPassenger: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,
    public http:HttpClient,public storage: Storage,public loadingCtrl:LoadingController, public gFn:GlobalFunctionsProvider,
    public global:GlobalProvider,private launchNavigator: LaunchNavigator, public viewCtrl:ViewController,public global_api:GlobalApiProvider) {
    this.vehicleDetails=navParams.get('details')
    console.log(this.vehicleDetails)
    this.getBusDetails(this.vehicleDetails.vehiclesId);
    this.storage.get('EventDetails').then((val)=>{
      this.EventDetails = val[0];
      console.log(this.EventDetails)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehicleDetailsPage');
  }
  gotoNotifyParents(){
    let Modal = this.modalCtrl.create('NotifyParentsPage',{details:this.vehicleDetails});
    Modal.present();
    // this.navCtrl.push('NotifyParentsPage')
  }
  gotoLastRollcall(){
    this.navCtrl.push('LastRollcallPage',{detail:this.vehicleDetails})
  }

  getBusDetails(transportId)
  {
    return new Promise((resolve)=>{
      this.BusDetailApi=this.global.APIURL+"transports/getBusDetails";
      let data=new HttpParams().set('transportVehicleId',transportId);
      this.http.post(this.BusDetailApi, data,{headers:this.global_api.getHeader()}).toPromise().then(
        res => {

          if (res['SUCCESS'] == true) {
            this.BusDetailData = res['BUSDETAILS'];
            console.log(this.BusDetailData); 
            this.ActivateMap(this.BusDetailData[0].TRACKINGSTAFFID)
            this.totalPassenger = this.BusDetailData[0].TOTALPASSENGER;
          }
          resolve();
        }
      )
    });
  }
    ActivateMap(key){
        
      this.loader =this.loadingCtrl.create({});
      this.loader.present();
      // $('#map').show()
      // this.getCurrentLocation()
      this.GetLocation(key)
    }
    GetLocation(StaffDetail){


      console.log('2')
      clearInterval(this.LocationInterval)
      this.fetchLocation(StaffDetail).then((x)=>{
        if(!x){
          this.gFn.presentToast('Connecting...') 
        }
        else{
          this.loader.dismiss()
        }
      })
      this.LocationInterval=setInterval(()=>{
        this.fetchLocation(StaffDetail).then((x)=>{
          if(!x){
            this.gFn.presentToast('Connection issue or Location Not Found') 
              this.loader.dismiss()
              clearInterval(this.LocationInterval)
          }
          else{
            this.loader.dismiss()
          }
        })
      },60000)
    }

    fetchLocation(staff_id){
    let mapOptions = {
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    }
    console.log('1')
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    return new Promise((resolve) => {
      let Data = new HttpParams()
        .set('staffId', staff_id )
      this.http.post(this.global.APIURL + "transports/getGPSLocation", Data,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
            if(data.SUCCESS && data.GETGPSLOCATION[0] && 
              (data.GETGPSLOCATION[0].latitude || data.GETGPSLOCATION[0].longitude)){
              
              console.log('getLocation',data)
              console.log('3')
              this.addMarker(this.map,data.GETGPSLOCATION[0].latitude,data.GETGPSLOCATION[0].longitude);
              let latLng = new google.maps.LatLng(data.GETGPSLOCATION[0].latitude,data.GETGPSLOCATION[0].longitude);
              this.map.setCenter(latLng);
              this.map.setZoom(16);
              console.log('4')
              resolve(true)
            }
            else{
              this.loader.dismiss()
              resolve(false)
            }
        }, error => {
          resolve(false)
        
        });
    })
    }
    addMarker(map:any,lat1,lng1){

      let marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: {
          lat: lat1,
          lng: lng1
        }
      });
      this.addInfoWindow(marker,lat1,lng1);
    }
    addInfoWindow(marker, lat1,lng1){
      console.log(lat1 + ', ' + lng1)
      google.maps.event.addListener(marker, 'click', () => {
        console.log(lat1 + ', ' + lng1)
        this.launchNavigator.navigate(lat1 + ', ' + lng1);
        clearInterval(this.LocationInterval)
      });
    }
    ionViewDidLeave(){
      this.gFn.showMenuIcon()
    }

    removeVehicle(){
      let loader = this.loadingCtrl.create({});
      loader.present();
      let loginData = new HttpParams()
        .set('vehicleId', this.vehicleDetails.vehiclesId);
  
      this.http.post(this.global.APIURL + "transports/removeVehicle", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if(data.SUCCESS){
            this.gFn.presentToast(data.MESSAGE);
          }
          loader.dismiss();
          this.backArrow();
        }, error => {
          loader.dismiss();
        });
    }

    backArrow(){
      this.gFn.showMenuIcon();
      this.viewCtrl.dismiss();
    }
}
