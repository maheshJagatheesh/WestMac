import { Component, ViewChild , ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { Subscription } from 'rxjs/Subscription';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
declare var google;

@IonicPage()
@Component({
  selector: 'page-map-tracker',
  templateUrl: 'map-tracker.html',
})
export class MapTrackerPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentMapTrack = null;
  positionSubscription: Subscription;
  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
  LocationInterval:any;
  loader:any;
  staff_id:any;
  memberDetails:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient, public gFn:GlobalFunctionsProvider,
    public global: GlobalProvider,public loadingCtrl:LoadingController,private launchNavigator: LaunchNavigator,public global_api:GlobalApiProvider) {
      this.staff_id=navParams.get('staff_id')
      console.log(this.staff_id)
      var Details:any=navParams.get('memberDetails')
      // this.memberDetails=navParams.get('memberDetails')
      
      for(var key in Details){
        var temp:any=Details[key]
        temp=Object.keys(temp).reduce((c, k) => (c[k.toLowerCase()] = temp[k], c), {})
        console.log(temp)
        this.memberDetails.push(temp)
      }
      console.log(this.memberDetails)
      // this.MedicineFlag=Object.keys(this.MedicineFlag).reduce((c, k) => (c[k.toLowerCase()] = this.MedicineFlag[k], c), {})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapTrackerPage');
    this.ActivateMap(this.staff_id)
  }
  ActivateMap(key){
    this.staff_id=key;
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

}
