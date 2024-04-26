import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events,ModalController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { Storage } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';


@IonicPage()
@Component({
  selector: 'page-choose-players',
  templateUrl: 'choose-players.html',
})
export class ChoosePlayersPage{
  TeamData: any;
  PlayerList: any = [];
  PhotoApiUrl: string;
  PlayerIdArray: any = [];
  person_id: any;
  PersonData: any;
  UpcomingSingleEvent:any;
  FunctionAccess:any;
  medicalInfo: boolean=false;
  ShowSeverityPage: boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events, public loadingCtrl: LoadingController, private storage: Storage, public global: GlobalProvider,
    public http: HttpClient,public statusBar: StatusBar,public gFn:GlobalFunctionsProvider,public modalCtrl:ModalController,public global_api :GlobalApiProvider) {
    this.gFn.hideMenuIcon();
    this.TeamData = navParams.get('TeamData');
    this.PhotoApiUrl = this.global.PROFILEIMAGEURL;
    this.storage.get('FunctionAccess').then((val) => {
      this.FunctionAccess = val;
    })
  }

  ionViewDidLoad() {
    this.statusBar.hide();
    if (this.navParams.get('UpcomingSingleEvent')) {
      this.UpcomingSingleEvent = JSON.parse(this.navParams.get('UpcomingSingleEvent'))
      
    }
    else{
      this.storage.get('UpcomingSingleEvent').then((val) => {
        this.UpcomingSingleEvent = JSON.parse(val)
        
      })
    }
    // this.storage.get('UpcomingSingleEvent').then((val)=>{
    //   this.UpcomingSingleEvent=JSON.parse(val)
      
    // })
    this.storage.get('loggedInUserData').then((val) => {
      this.PersonData = val

    })
    let loader = this.loadingCtrl.create({});
    loader.present();
    setTimeout(() => {

      this.choosePlayersList().then((x) => {
        if (x) {
          loader.dismiss();
        }
        else if(!x){
          loader.dismiss();
          this.navCtrl.pop()
          alert('No Data Found')
          
        }
      });

    }, 500);

  }
  ionViewDidLeave(){
    this.statusBar.show();
  }
  
  backArrow() {
    this.navCtrl.pop();
  }
  choosePlayersList() {
    return new Promise((resolve) => {
      let PlayersList = new HttpParams()
        .set('club_division_id', this.TeamData.lender_id)
        .set('client_id', this.TeamData.client_id)
        .set('person_club_division_id', this.PersonData.CLUB_DIVISION_ID)
        .set('person_client_id', this.PersonData.CLIENT_ID);

      this.http.post(this.global.APIURL + "players/getTeamPlayers", PlayersList,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if(data.SUCCESS && data.GETTEAMPLAYERS!=''){
            let PlayerListData = this.events.publish('json:query', data.GETTEAMPLAYERS);
            for (var key in PlayerListData[0]) {
              this.PlayerList.push(PlayerListData[0][key])
            }
            resolve(true);
          }
          else{
            resolve(false);
          }
          
        }, error => {
          resolve(false);
        });
    })
  }

  selectPlayers(person_id, selectPlayerCard, selectFontColor) {
    if(!this.medicalInfo && !this.ShowSeverityPage){
      if (!this.PlayerIdArray.includes(person_id)) {
        selectPlayerCard.style.backgroundColor = '#2BBFF0';
        selectFontColor.style.color = '#ffffff';
        this.PlayerIdArray.push(person_id)
      }
      else if(this.PlayerIdArray.includes(person_id)){
        selectPlayerCard.style.backgroundColor = '#ffffff';
        selectFontColor.style.color = '#15233C';
        this.PlayerIdArray.splice(this.PlayerIdArray.indexOf(person_id), 1);
      }
    }
    
  }

  
  borrow() {
    let PlayersData = new HttpParams()
      .set('event_id', this.UpcomingSingleEvent.event_id)
      .set('lending_team_id', this.TeamData.lender_id)
      .set('lending_club_id', this.TeamData.club_id)
      .set('lending_division_id', this.TeamData.lender_id)
      .set('lending_client_id', this.TeamData.client_id)
      .set('selectedTeam', this.PersonData.SELECTEDTEAM)
      .set('person_ids', JSON.stringify(this.PlayerIdArray));

    this.http.post(this.global.APIURL + "borrows/saveBorrowingPlayers", PlayersData,{headers:this.global_api.getHeader()})
      .subscribe((data: any) => {
        this.navCtrl.pop();
        this.navCtrl.push('BorrowedPlayerPage')

      }, error => {
      });
  }
  DisplaySeverityDetails(playerAilments){
    this.ShowSeverityPage=true
    if(playerAilments){
      let SeverityModal = this.modalCtrl.create('SeverityDetailsModalPage', { playerAilments: playerAilments });
      SeverityModal.present();

    }
    else{
      this.gFn.presentToast('No Details found')
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

}
