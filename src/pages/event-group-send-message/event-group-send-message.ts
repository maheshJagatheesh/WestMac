import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController,ModalController, Platform} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpParams } from '@angular/common/http';

import { GlobalProvider } from '../../providers/global/global';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

@IonicPage()
@Component({
  selector: 'page-event-group-send-message',
  templateUrl: 'event-group-send-message.html',
})
export class EventGroupSendMessagePage {
  UpcomingSingleEvent: any;
  PersonData: any;
  selectedTeam: any;
  eventAttend: any = [];
  BorrowedPlayerPresent: any=[];
  DupeventAttendsec:any=[];
  DupEventAttendSecBorrowed:any=[];
  BorrowTagFlag:any=0;
  private message: string = '';
  teamStaffs:any=[];
  AppName:any;
  PhotoApiUrl:any;
  setActivatedTeam:any;
  ShowSeverityPage:boolean=false;
  FunctionAccess:any;
  medicalInfo: boolean=false;
  constructor(
    public navCtrl: NavController,private appVersion: AppVersion,
    public modalCtrl:ModalController,
    public navParams: NavParams,
    public http: HttpClient,
    private storage: Storage,
    public global: GlobalProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public statusBar: StatusBar,
    public gFn:GlobalFunctionsProvider,
    public global_api:GlobalApiProvider,
    platform:Platform
  ) {
    this.storage.get('setActivatedTeam').then((val)=>{
      this.setActivatedTeam=JSON.parse(val)
      //console.log(this.setActivatedTeam.TEAM_ID_FK)
    })
    this.gFn.hideMenuIcon()
    this.storage.get('FunctionAccess').then((val)=>{
      this.FunctionAccess=val;
    });
    platform.registerBackButtonAction(() => { 
      this.backArrow();
    }); 
  }

  ionViewDidLoad() {
    this.PhotoApiUrl = this.global.PROFILEIMAGEURL
    console.log(this.PhotoApiUrl)
    this.statusBar.hide();
    this.appVersion.getAppName().then(Appname=>{
      this.AppName=Appname
      
    })
    this.storage.get('loggedInUserData').then((val) => {
      this.PersonData = val;
      this.storage.get('UpcomingSingleEvent').then((val) => {
        this.UpcomingSingleEvent = JSON.parse(val)
        this.selectedTeam = this.PersonData.SELECTEDTEAM;
        if(this.UpcomingSingleEvent.event_type_id == 2 && this.UpcomingSingleEvent.teamid){
          this.selectedTeam = this.UpcomingSingleEvent.teamid;
        }else if(this.UpcomingSingleEvent.event_type_id == 1){
          if(this.UpcomingSingleEvent.homeclubid == this.PersonData.CLUB_ID){
            this.selectedTeam = this.UpcomingSingleEvent.hometeam;
          }else{
            this.selectedTeam = this.UpcomingSingleEvent.awayteam;
          }
        }        
        this.AllPlayersLoad();
        this.loadTeamStuffs();
      })
    });
  }
  ionViewDidLeave(){
    this.statusBar.show();
    this.gFn.showMenuIcon();
  }
  AllPlayersLoad() {
    return new Promise((resolve) => {
      let loading = this.loadingCtrl.create();
      loading.present();
      let PlayersData = new HttpParams()
        .set('event_id', this.UpcomingSingleEvent.event_id)
        .set('client_id', this.UpcomingSingleEvent.client_id)//this.PersonData.CLIENT_ID
        .set('selectedTeam', this.selectedTeam)//this.PersonData.SELECTEDTEAM
        .set('personId', this.PersonData.PERSON_ID)
      this.http.post(this.global.APIURL + "players/AllLoadPlayersAttendance", PlayersData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          this.eventAttend = data.DATA;
          this.BorrowedPlayerPresent = data.DATA_BORROWED;
          this.ArrangePlayers();
          loading.dismiss();
          resolve(true);
        }, error => {
          loading.dismiss();
        });
    })
  }
  ArrangePlayers() {
    var key,key1;
    for ( key in this.eventAttend) {
      if(parseInt(key)<3 && this.eventAttend[key].length>0){
        this.DupeventAttendsec[key] = []
        for ( key1 in this.eventAttend[key]) {
          if (this.navParams.get('notifyFlag')==parseInt(key)) {
            this.DupeventAttendsec[0].unshift(this.eventAttend[key][key1])
          }
          else {
            this.DupeventAttendsec[key].push(this.eventAttend[key][key1])
          }
          this.DupeventAttendsec[key] = this.DupeventAttendsec[key].map(obj => { obj.active=true; return obj; });
        }

      }
      
    }

    for ( key in this.BorrowedPlayerPresent) {
      if(parseInt(key)<3 && this.BorrowedPlayerPresent[key].length>0){
        this.DupEventAttendSecBorrowed[key] = []
        for ( key1 in this.BorrowedPlayerPresent[key]) {
          this.BorrowTagFlag=1
          if (this.navParams.get('notifyFlag')==parseInt(key)) {
            this.DupEventAttendSecBorrowed[0].unshift(this.BorrowedPlayerPresent[key][key1]);
          }
          else {
            this.DupEventAttendSecBorrowed[key].push(this.BorrowedPlayerPresent[key][key1]);
          }
          this.DupEventAttendSecBorrowed[key] = this.DupEventAttendSecBorrowed[key].map(obj => { obj.active=true; return obj; });
        }

      }
      
    }
  }

  loadTeamStuffs(){
    let loading = this.loadingCtrl.create();
    loading.present();
    let data = new HttpParams()
      .set('person_id', this.PersonData.PERSON_ID)
      .set('team_id', this.selectedTeam);
    this.http.post(this.global.APIURL + "teams/getTeamStaff", data,{headers:this.global_api.getHeader()})
      .subscribe((response: any) => {
        loading.dismiss();
        if(response.SUCCESS){
          this.teamStaffs = response.GETTEAMSTAFF;
        }
      }, error => {
        loading.dismiss();
      });
  }

  backArrow(){
    this.navCtrl.pop();
    //this.navCtrl.push('EventDashboardPage');
  }

  selectPlayer(Attendy){
    if(!this.medicalInfo){
      if(this.ShowSeverityPage==false){
        Attendy.active = !Attendy.active;
      }
      else{
        this.ShowSeverityPage=false
      }
    }
    
    
  }

  sendMessage(){
    let playerIDs = [];
    $('.well.select-card.active').each( function(){
      if($(this).attr('data-id')){
        playerIDs.push($(this).attr('data-id'));
      }
    });
    if(playerIDs.length > 0) {
      if (this.message.length > 0) {
        let loading = this.loadingCtrl.create();
        loading.present();
        let formData = {
          'person_id': this.PersonData.PERSON_ID,
          'person_ids': JSON.stringify(playerIDs),
          'message': this.message,
          'app_name':this.AppName,
          'team_id':'',
          'event_id':this.UpcomingSingleEvent.event_id
        };
        let msgData = new HttpParams({ fromObject: formData });
        this.http.post<any>(this.global.APIURL + 'players/sendGroupMsgEmailNotified', msgData,{headers:this.global_api.getHeader()})
          .subscribe(response => {
              loading.dismiss();
              if (response.SUCCESS) {
                this.presentToast("Message sent successfully");
              }else{
                this.presentToast("Error in message send");
              }
              this.navCtrl.pop()
              this.gFn.showMenuIcon()
            },
            error => {
              loading.dismiss();
              this.presentToast("Error in message send");
              this.navCtrl.pop()
              this.gFn.showMenuIcon()
            });
      } else {
        this.presentToast("Can't send blank message");
      }
    } else {
      let msg = 'No player selected';
      this.presentToast(msg);
    }
  }
  DisplaySeverityDetails(playerAilments){
    this.ShowSeverityPage=true;
    if(playerAilments){
      let SeverityModal = this.modalCtrl.create('SeverityDetailsModalPage', { playerAilments: playerAilments });
      SeverityModal.present();

    }
    else{
      this.presentToast('No Details found')
    }
  }
  MedicineInformation(data){
    this.medicalInfo=true;
		let MedicineInfo = this.modalCtrl.create('MedicineInfoPage', {values:data});
    MedicineInfo.present();
    MedicineInfo.onDidDismiss(()=>{
      this.medicalInfo=false;
    })
	}

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
