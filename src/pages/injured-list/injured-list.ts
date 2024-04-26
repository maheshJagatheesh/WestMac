import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,LoadingController, ToastController, Platform } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { Storage } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

@IonicPage()
@Component({
  selector: 'page-injured-list',
  templateUrl: 'injured-list.html',
})
export class InjuredListPage {
  UpcomingSingleEvent:any;
  eventAttend:any;
  PersonData: any;
  FunctionAccess:any;
  PhotoApiUrl:any;
  ShowSeverityPage:boolean=false;
  medicalInfo: boolean=false;
  seasonId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController,
    public modalCtrl: ModalController,public global: GlobalProvider,public statusBar: StatusBar,
    private http: HttpClient,private storage: Storage,public loadingCtrl: LoadingController, public gFn:GlobalFunctionsProvider,
    platform:Platform,public global_api :GlobalApiProvider) {
      this.gFn.hideMenuIcon()
      this.PhotoApiUrl = this.global.PROFILEIMAGEURL
      // console.log(this.PhotoApiUrl )

      platform.registerBackButtonAction(() => { 
        this.backArrow();
      }); 
  }

  ionViewDidLoad() {
    this.statusBar.hide();
    this.storage.get('FunctionAccess').then((val)=>{
      this.FunctionAccess=val;
    })
    this.storage.get('UpcomingSingleEvent').then((val)=>{
      this.UpcomingSingleEvent=JSON.parse(val)
      this.seasonId =  this.navParams.get('season_id');
      this.storage.get('loggedInUserData').then((val) => {
        this.PersonData = val;
        let loader = this.loadingCtrl.create({});
        loader.present();
        this.AllPlayersLoad().then((z) => {
          if (z) {
            loader.dismiss();
          }
          else{
            loader.dismiss();
            alert("No Data Found")
            this.navCtrl.pop()

          }
        })

      })
    })
  }
  ionViewDidLeave(){
    this.statusBar.show();
    this.gFn.showMenuIcon();
  }
  
  incidentReport(injured_person_id) {
    if(this.ShowSeverityPage==false && !this.medicalInfo){
      if(this.PersonData.PERSON_ID==injured_person_id || this.FunctionAccess.event_Injury=='yes'){
        this.navCtrl.push('InjuryIncidentReportPage',{'injured_person_id':injured_person_id.person_id,'incident_id':injured_person_id.incident_id,'season_id':this.seasonId})
        
      }
    }
    else{
      this.ShowSeverityPage=false
    }
    
  }
  backArrow() {
    //this.navCtrl.push('EventDashboardPage');
    this.navCtrl.pop();
  }

  AllPlayersLoad(){
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
          .set('client_id', this.UpcomingSingleEvent.client_id)
          .set('selectedTeam', selectedTeam)

        this.http.post(this.global.APIURL + "players/AllLoadPlayersAttendance", PlayersData,{headers:this.global_api.getHeader()})
          .subscribe((data: any) => {
            if(data.SUCCESS){
              var dataLength=0;
              for(var key in data.DATA){
                for(var key in data.DATA[key]){
                  dataLength=1;
                }
              }
              if(dataLength==1){
                this.eventAttend=data.DATA
                resolve(true);
              }
              else{
                resolve(false);
              }
            }
            else{
              resolve(false);
            }
          }, error => {
            resolve(false);
          });
        })
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
