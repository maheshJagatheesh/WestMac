import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpParams } from '@angular/common/http';

import { GlobalProvider } from '../../providers/global/global';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

@IonicPage()
@Component({
  selector: 'page-notify-players',
  templateUrl: 'notify-players.html',
})
export class NotifyPlayersPage {
  private loggedInUserData: any;
  public bgThemeColor: string = '';
  UpcomingSingleEvent: any;
  PersonData: any;
  eventAttend: any = [];
  BorrowedPlayerPresent: any=[];
  DupeventAttendsec:any=[];
  DupEventAttendSecBorrowed:any=[];
  BorrowTagFlag:any=0;
  PlayerIdArray: any = [];
  notifyFlag:any;
  AppName:any;
  PhotoApiUrl:any;
  ShowSeverityPage:boolean=false;
  FunctionAccess:any;
  medicalInfo: boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,
    private storage: Storage, public global: GlobalProvider,public loadingCtrl: LoadingController,
    private appVersion: AppVersion,public statusBar: StatusBar, public gFn:GlobalFunctionsProvider,
    private toastCtrl: ToastController,public modalCtrl:ModalController,public global_api:GlobalApiProvider) {
      this.gFn.hideMenuIcon()
      this.PhotoApiUrl = this.global.PROFILEIMAGEURL
      this.storage.get('FunctionAccess').then((val) => {
        this.FunctionAccess = val;
      })
  }

  ionViewDidLoad() {
    this.statusBar.hide();
    this.appVersion.getAppName().then(Appname=>{
      this.AppName=Appname
    })
    let loader = this.loadingCtrl.create({});
    loader.present();

    this.notifyFlag=this.navParams.get('notifyFlag')
    this.storage.get('loggedInUserData').then((val) => {
      this.PersonData = val;
      if (this.navParams.get('UpcomingSingleEvent')) {
        this.UpcomingSingleEvent = JSON.parse(this.navParams.get('UpcomingSingleEvent'))
        this.AllPlayersLoad().then((y) => {
          if (y) {
            loader.dismiss();
          }
          else{
            this.navCtrl.pop();
            loader.dismiss();
          }
      })
      }
      else{
        this.storage.get('UpcomingSingleEvent').then((val) => {
          this.UpcomingSingleEvent = JSON.parse(val)
          this.AllPlayersLoad().then((y) => {
            if (y) {
              loader.dismiss();
            }
            else{
              this.navCtrl.pop();
              loader.dismiss();
            }
        })
      })
      }
      
    })
  }
  ionViewDidLeave(){
    this.statusBar.show();
  }

  AllPlayersLoad() {
    return new Promise((resolve) => {
      let selectedTeam = this.PersonData.SELECTEDTEAM;
      if(this.UpcomingSingleEvent.event_type_id == 2 && this.UpcomingSingleEvent.teamid){
        selectedTeam = this.UpcomingSingleEvent.teamid;
      }else if(this.UpcomingSingleEvent.event_type_id == 1){
        if(this.UpcomingSingleEvent.homeclubid == this.PersonData.CLUB_ID){
          selectedTeam = this.UpcomingSingleEvent.hometeam;
        }else{
          selectedTeam = this.UpcomingSingleEvent.awayteam;
        }
      }
      let PlayersData = new HttpParams()
        .set('event_id', this.UpcomingSingleEvent.event_id)
        .set('client_id', this.UpcomingSingleEvent.client_id)//this.PersonData.CLIENT_ID
        .set('selectedTeam', selectedTeam)//this.PersonData.SELECTEDTEAM
        .set('personId', this.PersonData.PERSON_ID)
      this.http.post(this.global.APIURL + "players/AllLoadPlayersAttendance", PlayersData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          this.eventAttend = data.DATA;
          console.log(this.eventAttend)
          this.BorrowedPlayerPresent = data.DATA_BORROWED;
          this.ArrangePlayers();
          resolve(true);
        }, error => {
          resolve(false);

        });
    })
  }
  
  ArrangePlayers() {
    console.log('NotifyFlag:',this.notifyFlag)
    
    for ( var key in this.eventAttend) {
      
      if(parseInt(key)<3 && this.eventAttend[key].length>0){
        this.DupeventAttendsec[key] = []
        for ( var key1 in this.eventAttend[key]) {
          this.DupeventAttendsec[key].push(this.eventAttend[key][key1])
          var curState = this.eventAttend[key][key1].state-1;
         
          if( curState==this.notifyFlag){
            
            this.selectPlayerTile(this.eventAttend[key][key1].person_id)
          }
        }

      }
      
    }
    if(this.notifyFlag){
      var temp=this.DupeventAttendsec[this.notifyFlag]
      this.DupeventAttendsec.splice(this.notifyFlag)
      this.DupeventAttendsec.unshift(temp)
    }

    for ( var key in this.BorrowedPlayerPresent) {
      if(parseInt(key)<3 && this.BorrowedPlayerPresent[key].length>0){
        this.DupEventAttendSecBorrowed[key] = []
        for ( var key1 in this.BorrowedPlayerPresent[key]) {
          this.DupEventAttendSecBorrowed[key].push(this.BorrowedPlayerPresent[key][key1])
          if(this.BorrowedPlayerPresent[key][key1].state-1==this.notifyFlag){
            this.selectPlayerTile(this.BorrowedPlayerPresent[key][key1].person_id)
          }
          this.BorrowTagFlag=1
        }

      }
      
    }
    if(this.notifyFlag){
      var temp=this.DupEventAttendSecBorrowed[this.notifyFlag]
      this.DupEventAttendSecBorrowed.splice(this.notifyFlag)
      this.DupEventAttendSecBorrowed.unshift(temp)
    }
  }

  backArrow(){
    this.navCtrl.push('EventDashboardNewPage');
    this.navCtrl.remove(this.navCtrl.getActive().index - 1, 2);
  }

  selectPlayerTile(person_id){
    if (!this.PlayerIdArray.includes(person_id)) {
      console.log('inside');
      this.PlayerIdArray.push(person_id) 
    }
  }

  unSelectPlayerTile(person_id){
    if(this.PlayerIdArray.includes(person_id)){
      this.PlayerIdArray.splice(this.PlayerIdArray.indexOf(person_id), 1);
    }
  }

  togglePlayerTileSelection(person_id,event){
    if(this.ShowSeverityPage==false && !this.medicalInfo){
      if(this.PlayerIdArray.includes(person_id)){
        $(event.target).closest('.well').removeClass('SelectCard')
        $(event.target).closest('.well').find('.select-card').removeClass('SelectCard')
        $(event.target).closest('.well').find('.card-title').removeClass('SelectCard')
        $(event.target).closest('.well').find('.select-card').addClass('UnselectCard')
        $(event.target).closest('.well').find('.card-title').addClass('UnselectCard')
        $(event.target).closest('.well').addClass('UnselectCard')
        this.unSelectPlayerTile(person_id);
      }
      else{
        $(event.target).closest('.well').removeClass('UnselectCard')
        $(event.target).closest('.well').find('.select-card').removeClass('UnselectCard')
        $(event.target).closest('.well').find('.card-title').removeClass('UnselectCard')
        $(event.target).closest('.well').find('.select-card').addClass('SelectCard')
        $(event.target).closest('.well').find('.card-title').addClass('SelectCard')
        $(event.target).closest('.well').addClass('SelectCard')
        
        this.selectPlayerTile(person_id);
      }
    }
    else{
      this.ShowSeverityPage=false
    }
  }

  Notify() {
    
      let PlayersList = new HttpParams()
        .set('person_id',this.PersonData.PERSON_ID)
        .set('person_ids',JSON.stringify(this.PlayerIdArray))
        .set('selectedTeam', this.PersonData.SELECTEDTEAM)
        .set('event_id', this.UpcomingSingleEvent.event_id)
        .set('app_name', this.AppName);

      this.http.post(this.global.APIURL + "players/sendEmailNotified", PlayersList,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if(data.SUCCESS){
            this.presentToast('Notified successfully')
          }
          else{
            this.presentToast('Notified Unsuccessfully')
          }
          this.backArrow();          
        }, error => {
          this.presentToast('Notified Unsuccessfully')
          this.backArrow();          
        });
  }
  DisplaySeverityDetails(playerAilments){
    this.ShowSeverityPage=true
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
  backgroundThemeColor() {
    switch (this.loggedInUserData.THEME_BG) {
      case "red":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      case "blue":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
        case "yellow":
          this.bgThemeColor = this.loggedInUserData.THEME_BG;
          break;
      
      default:
        this.bgThemeColor = "red";
        break;
    }
  }


}
