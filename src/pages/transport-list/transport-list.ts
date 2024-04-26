import { Component, ViewChild , ElementRef} from '@angular/core';
import { IonicPage, NavController,Events, NavParams,Keyboard, ModalController,Platform,LoadingController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
declare var google;
@IonicPage()
@Component({
  selector: 'page-transport-list',
  templateUrl: 'transport-list.html',
})
export class TransportListPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentMapTrack = null;
 
  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
 
  positionSubscription: Subscription;
 
  PersonData: any = [];
  EventDetails: any;
  rollcallList: any = [];
  StaffList: any = [];
  StatusList:any=[];
  getRollcallListSuccess:any='0';
  StaffListSuccess:any='0'
  LocationInterval:any;
  // CurrentLocationInterval:any;
  LocationIntervalToast:any;
  Arrowflag: any = false;
  ShowMap:boolean=false;
  loader:any;
  CurrentPosition:any={latitude:'',longitude:''};
  transportId:any;
  isParent:any;
  trackingEnable:any;
  ChildList:any;
  constructor(public navCtrl: NavController,public http: HttpClient, public storage: Storage,
    public navParams: NavParams,public global: GlobalProvider, private events: Events, private modalCtrl: ModalController,public plt:Platform,
    public gFn: GlobalFunctionsProvider,private launchNavigator: LaunchNavigator,public geolocation:Geolocation,
    public loadingCtrl:LoadingController,public global_api:GlobalApiProvider) {
      // this.gFn.hideMenuIcon();
      plt.registerBackButtonAction(() => { 
        this.navCtrl.pop();
        this.navCtrl.push('EventDashboardPage');
      }); 
  }

  ionViewDidLoad() {
    this.storage.get('EventDetails').then((val)=>{
      this.EventDetails = val[0];
      this.storage.get('loggedInUserData').then((val1) => {
        this.PersonData = val1;
        if(this.PersonData.ISPARENT && parseInt(this.PersonData.PERSON_ID) != parseInt(this.PersonData.PARENT_ID)){
          this.isParent = true;
          this.getChildDetails().then((x:any)=>{
            if(x){
              this.ChildList=x.CHILDSDATA
              if(x.ISTRACKENABLE==1){
                this.trackingEnable=true
              }
            }
            console.log(x,'x')
          })
        }
        else{
          this.isParent = false;
        }
        this.getRollcallList().then(y=>{
          
          if(!y){
            // this.navCtrl.pop();
            this.gFn.presentToast('Data Issue or Connection Issue found')
          }
        
          this.getStaffList().then(x=>{
           
            if(!x){
              // this.navCtrl.pop();
              this.gFn.presentToast('Data Issue or Connection Issue found')
            }
          });
        });
      });
    });
    
  }
  ionViewDidEnter(){
    this.highlightMenuIcon()
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

  getChildDetails(){
    return new Promise((resolve) => {
      let loginData = new HttpParams()
        .set('transportId', this.EventDetails.transportId)
        .set('parentId',this.PersonData.PARENT_ID)
        this.http.post(this.global.APIURL + "transports/trackingCheckForParent", loginData,{headers:this.global_api.getHeader()}).subscribe((data:any)=>{
          if(data.SUCCESS){
            resolve(data)
          }
          else{
            resolve(false)
          }
         
      },error=>{
          this.gFn.presentToast('Connection issue')
      });
      
    })
  }

  getRollcallList(){
    return new Promise((resolve) => {
      let loginData = new HttpParams()
        .set('transportId', this.EventDetails.transportId)
        .set('personId',this.PersonData.PERSON_ID)
        .set('clientId',this.PersonData.CLIENT_ID)
        //.set('club_id', this.PersonData.CLUB_ID );// this.PersonData.CLUB_ID, 225

      this.http.post(this.global.APIURL + "transports/getRollcall", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if(data.SUCCESS){
            for(var key in data.GETROLLCALL){
              this.rollcallList.push(data.GETROLLCALL[key]);
            }
            for(var key1 in data.GETSTATUSLIST){
              this.StatusList.push(data.GETSTATUSLIST[key1]);
            }
            // console.log(this.rollcallList)
            this.getRollcallListSuccess='1'
          }
          else{
            this.getRollcallListSuccess='2'
          }
          resolve(true);
        }, error => {
          this.getRollcallListSuccess='2'
          resolve(false)
        });
    })
  }
  ActivateMap(key){
    if(this.ShowMap){
      $('#map').hide()
      this.ShowMap=false;
      // this.stopTracking()
      // clearInterval(this.CurrentLocationInterval)
      clearInterval(this.LocationInterval)

    }
    else{
      this.loader =this.loadingCtrl.create({});
      this.loader.present();
      $('#map').show()
      // this.getCurrentLocation()
      this.GetLocation(key)
      
    }
  }
  // getCurrentLocation(){
   
  //     this.plt.ready().then(() => {
       
  //       let mapOptions = {
  //         zoom: 13,
  //         mapTypeId: google.maps.MapTypeId.ROADMAP,
  //         mapTypeControl: false,
  //         streetViewControl: false,
  //         fullscreenControl: false
  //       }
        
  //       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        
  //       this.CurrentLocationInterval=setInterval(()=>{
  //       this.geolocation.getCurrentPosition().then(pos => {
          
  //         if(pos.coords){
  //           this.CurrentPosition.latitude=pos.coords.latitude
  //           this.CurrentPosition.longitude=pos.coords.longitude
           
  //         }
  //         let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
  //         this.map.setCenter(latLng);
  //         this.map.setZoom(16);
  //         this.ShowMap=true;
  //       }).catch((error) => {
          
  //       });
  //     },15000)
  //     });
  // }
  // startTracking(destinationLat,destinationLong) {
  //   this.isTracking = true;
  //   this.trackedRoute = [];
  //       setTimeout(() => {
  //         this.trackedRoute.push({ lat: destinationLat, lng: destinationLong });
  //         this.trackedRoute.push({lat:this.CurrentPosition.latitude,lng:this.CurrentPosition.longitude})
  //         if((destinationLat || destinationLong) && (this.CurrentPosition.latitude || this.CurrentPosition.longitude)){
  //           this.loader.dismiss()
  //         }
         
  //         this.redrawPath(this.trackedRoute);
  //       }, 0);
  // }
 
  // redrawPath(path) {
  //   if (this.currentMapTrack) {
  //     this.currentMapTrack.setMap(null);
  //   }
 
  //   if (path.length > 1) {
  //     this.currentMapTrack = new google.maps.Polyline({
  //       path: path,
  //       geodesic: true,
  //       strokeColor: '#ff00ff',
  //       strokeOpacity: 1.0,
  //       strokeWeight: 3
  //     });
  //     this.currentMapTrack.setMap(this.map);
  //   }
  // }
  addMarker(map:any,lat1,lng1){

    let marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: {
        lat: lat1,
        lng: lng1
      }
    });
    
    // let content = "<h4>Information!</h4>";
    // this.addInfoWindow(marker, content);

    this.addInfoWindow(marker,lat1,lng1);
  }
  addInfoWindow(marker, lat1,lng1){

    // let infoWindow = new google.maps.InfoWindow({
    //   content: content
    // });

    google.maps.event.addListener(marker, 'click', () => {
      // infoWindow.open(this.map, marker);
      this.launchNavigator.navigate(lat1 + ', ' + lng1);
      // clearInterval(this.CurrentLocationInterval)
      clearInterval(this.LocationInterval)
    });
  }
  
  GetLocation(StaffDetail){
    
    
    console.log('2')
    clearInterval(this.LocationInterval)
    this.fetchLocation(StaffDetail).then((x)=>{
      if(!x){
        this.gFn.presentToast('Connecting...') 
          // clearInterval(this.LocationInterval)
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
            $('#map').hide()
            this.ShowMap=false;
            clearInterval(this.LocationInterval)
        }
        else{
          this.loader.dismiss()
        }
        
      })

    },60000)
  }
  fetchLocation(StaffDetail){
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
        .set('staffId', StaffDetail.staff_id )
      this.http.post(this.global.APIURL + "transports/getGPSLocation", Data,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
            if(data.SUCCESS && data.GETGPSLOCATION[0] && 
              (data.GETGPSLOCATION[0].latitude || data.GETGPSLOCATION[0].longitude)){
              console.log('getLocation',data)
              console.log('3')
              this.addMarker(this.map,data.GETGPSLOCATION[0].latitude,data.GETGPSLOCATION[0].longitude);
              // this.startTracking(data.GETGPSLOCATION[0].latitude,data.GETGPSLOCATION[0].longitude)
              let latLng = new google.maps.LatLng(data.GETGPSLOCATION[0].latitude,data.GETGPSLOCATION[0].longitude);
              this.map.setCenter(latLng);
              this.map.setZoom(16);
              console.log('4')
              this.ShowMap=true;
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
  // stopTracking() {
  //   let newRoute = { finished: new Date().getTime(), path: this.trackedRoute };
  //   this.previousTracks.push(newRoute);
    
  //   this.isTracking = false;
    
  //   this.currentMapTrack.setMap(null);
  // }
  ionViewDidLeave(){
    // clearInterval(this.CurrentLocationInterval)
    clearInterval(this.LocationInterval)
  }
 
  getStaffList(){
    return new Promise((resolve) => {
      let loginData = new HttpParams()
        .set('transportId', this.EventDetails.transportId)//this.UpcomingSingleEvent.event_id, 2288
        .set('locationEnabled', '1' );

      this.http.post(this.global.APIURL + "transports/getStaff", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if(data.SUCCESS){
            for(var key in data.GETSTAFF){
              if(data.GETSTAFF[key].locationEnabled==1){
                this.trackingEnable=true
              }
              this.StaffList.push(data.GETSTAFF[key]);
            }
            //console.log(this.StaffList)
            this.StaffListSuccess='1'
          }
          else{
            this.StaffListSuccess='2'
          }
          resolve(true);
        }, error => {
          this.StaffListSuccess='2'
          resolve(false)
        });
    })
  }
  backArrow(){
    this.navCtrl.pop();
    this.navCtrl.push('EventDashboardPage');
  }
  ArrowFunctionality(event) {
    if (this.Arrowflag == false) {
      let target = event.target;
      $(target).closest('.row').find('ul').show();
      $(target).closest('.row').find('ul').addClass('Div-Arrow');
      $(target).closest('.row').find('.collapsed-arrow').removeClass('ArrowLight');
      $(target).closest('.row').find('.collapsed-arrow').addClass('ArrowDark');
      this.Arrowflag = true;
    }
    else if (this.Arrowflag == true) {
      let target = event.target;
      $(target).closest('.row').find('ul').hide();
      $(target).closest('.row').find('.collapsed-arrow').removeClass('ArrowDark');
      $(target).closest('.row').find('.collapsed-arrow').addClass('ArrowLight');
      this.Arrowflag = false;
    }
  }
 
  updateStatus(rollcall_id,rollcall_status_id){
    return new Promise((resolve) => {
      //console.log(rollcall_id,rollcall_status_id)
      let Data = new HttpParams()
        .set('rollcallId',rollcall_id)
        .set('rollcallStatusId', rollcall_status_id)
        .set('createdBy', this.PersonData.PERSON_ID)
       
      this.http.post(this.global.APIURL + "transports/selfUpdateRollcall", Data,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if(data.SUCCESS){
            this.gFn.presentToast('Updation Successfull')
          }
          else{
            this.gFn.presentToast('Updation unsuccessfull')
          }
          
          $('.row').find('ul').hide();
          $('.row').find('.collapsed-arrow').removeClass('ArrowDark');
          $('.row').find('.collapsed-arrow').addClass('ArrowLight');
          this.Arrowflag = false;
          resolve(true);
        }, error => {
          this.gFn.presentToast('Data or Connection Issue found')
        });
    })
  }
  showBarcode(){
    let playerScannerAttendanceModal = this.modalCtrl.create(
      'PlayerScannerAttendancePage',
      {},
      {
        enableBackdropDismiss: true,
        showBackdrop: true
      }
    );
    playerScannerAttendanceModal.present();
  }

  gotomember(){
    let trackMember = this.modalCtrl.create('TrackMemberPage',{member:this.isParent,transportId:this.EventDetails.transportId,memberList:(this.isParent?this.ChildList:this.StaffList)});
    trackMember.present();
  }
}
