import { Component, ViewChild , ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { Storage } from '@ionic/storage';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { Subscription } from 'rxjs/Subscription';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';

@IonicPage()
@Component({
  selector: 'page-track-member',
  templateUrl: 'track-member.html',
})
export class TrackMemberPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentMapTrack = null;
 
  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
 
  positionSubscription: Subscription;
  
  member:any;
  transportId:any;
  StaffList:any=[];
  ChildList:any=[];
  PersonData:any;
  LocationInterval:any;
  loader:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient, public gFn:GlobalFunctionsProvider,
    public global: GlobalProvider, public storage: Storage,public loadingCtrl:LoadingController,private launchNavigator: LaunchNavigator) {
  }

  ionViewDidLoad() {
    this.member=this.navParams.get('member')
    this.transportId=this.navParams.get('transportId')
    if(this.member){
      this.ChildList=this.navParams.get('memberList')
    }
    else{
      this.StaffList=this.navParams.get('memberList')
    }
    this.storage.get('loggedInUserData').then((val) => {
      this.PersonData = val;
    })
    console.log('ionViewDidLoad TrackMemberPage');
  }
  close(event){
    if(event.toElement.className=="scroll-content"){
     this.navCtrl.pop()
    }
  }
  openMap(id){
    this.navCtrl.push('MapTrackerPage',{staff_id:id,memberDetails:this.member?this.ChildList:this.StaffList})

  }
 
}
