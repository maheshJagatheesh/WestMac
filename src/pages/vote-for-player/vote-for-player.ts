import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, ToastController,ModalController, Platform } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

@IonicPage()
@Component({
  selector: 'page-vote-for-player',
  templateUrl: 'vote-for-player.html',
})
export class VoteForPlayerPage {
  public active: string = '';
  private playerDetails: any[] = [];
  FunctionAccess:any;
  loggedInUserData: any;
  players: any= [];
  vote1:any='';
  vote2:any='';
  vote3:any='';
  event_id: string;
  btnText: string = 'RESET VOTE';
  UpcomingSingleEvent: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public storage: Storage, public events: Events, private http: HttpClient,
  private loadingCtrl: LoadingController, public global: GlobalProvider,public modalCtrl:ModalController,
  private toastCtrl: ToastController, public gFn: GlobalFunctionsProvider, public plt: Platform,public global_api:GlobalApiProvider) {
    plt.ready().then(()=>{
      plt.registerBackButtonAction(()=>{
        this.goBack();
      });
    });
    
    this.storage.get('FunctionAccess').then((val)=>{
      this.FunctionAccess=val;
    });
    this.storage.get('loggedInUserData').then((val) => {
      this.loggedInUserData = val;
      this.playerDetails[0] = navParams.get('playerDetails');
      this.event_id = navParams.get('event_id');
      this.storage.get('UpcomingSingleEvent').then((val2) => {
        this.UpcomingSingleEvent = JSON.parse(val2);
        this.loadPlayersVotedState();
      });
    });
  }

  loadPlayersVotedState() {
    let loader = this.loadingCtrl.create({});
    loader.present();
    let selectedTeam = this.loggedInUserData.SELECTEDTEAM;
    if(this.UpcomingSingleEvent.event_type_id == 2 && this.UpcomingSingleEvent.teamid){
      selectedTeam = this.UpcomingSingleEvent.teamid;
    }else if(this.UpcomingSingleEvent.event_type_id == 1){
      if(this.UpcomingSingleEvent.homeclubid == this.loggedInUserData.CLUB_ID){
        selectedTeam = this.UpcomingSingleEvent.hometeam;
      }else{
        selectedTeam = this.UpcomingSingleEvent.awayteam;
      }
    }
    let data = new HttpParams()
      .set('event_id', this.event_id)
      .set('team_id', selectedTeam)
      .set('client_id', this.UpcomingSingleEvent.client_id)
      .set('selectedTeam', selectedTeam)
      .set('club_id', this.loggedInUserData.CLUB_ID)
      .set('voter_id', this.playerDetails[0].person_id);

    this.http.post<any>(this.global.APIURL + 'votes/getVotingPlayersEvent', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        if(response.SUCCESS)
        {
          loader.dismiss();
          this.players = response.GETVOTINGPLAYERSEVENT;
          for (let i=0; i < this.players.length; i++) {
            if(this.players[i].vote1 == this.players[i].person_id) {
              this.vote1 = this.players[i].vote1;
            }else if(this.players[i].vote2 == this.players[i].person_id) {
              this.vote2 = this.players[i].vote2;
            }else if(this.players[i].vote3 == this.players[i].person_id) {
              this.vote3 = this.players[i].vote3;
            }
          }
        }
      }, error => {
        loader.dismiss();
      });
  }

  setVote(ev, person_id, ratings) {
    let v1:any = '';
    let v2:any = '';
    let v3:any = '';
    if(ratings==1){
      v1 = person_id;
      this.vote1 = person_id;
      v2 = '';
      v3 = '';
      if(this.vote2 == this.vote1){
        this.vote2 = 0;
      }else if(this.vote3 == this.vote1){
        this.vote3 = 0;
      }
    }
    if(ratings==2){
      v1 = '';
      v2 = person_id;
      this.vote2 = person_id;
      v3 = '';
      if(this.vote1 == this.vote2){
        this.vote1 = 0;
      }else if(this.vote3 == this.vote2){
        this.vote3 = 0;
      }
    }
    if(ratings==3){
      v1 = '';
      v2 = '';
      v3 = person_id;
      this.vote3 = person_id;
      if(this.vote1 == this.vote3){
        this.vote1 = 0;
      }else if(this.vote2 == this.vote3){
        this.vote2 = 0;
      }
    }
    if(v1 != ''){
      $('.vote1').removeClass("active");
    }else if(v2 != ''){
      $('.vote2').removeClass("active");
    }else if(v3 != ''){
      $('.vote3').removeClass("active");
    }
    $(ev.target.parentElement).find("a").removeClass("active");
    $(ev.target).addClass("active");
  }

  saveBlankVote(){
    this.vote1 = '';
    this.vote2 = '';
    this.vote3 = '';
    this.btnText = 'RESET VOTE';
    let loader = this.loadingCtrl.create({});
    loader.present();
    let selectedTeam = this.loggedInUserData.SELECTEDTEAM;
    if(this.UpcomingSingleEvent.event_type_id == 2 && this.UpcomingSingleEvent.teamid){
      selectedTeam = this.UpcomingSingleEvent.teamid;
    }else if(this.UpcomingSingleEvent.event_type_id == 1){
      if(this.UpcomingSingleEvent.homeclubid == this.loggedInUserData.CLUB_ID){
        selectedTeam = this.UpcomingSingleEvent.hometeam;
      }else{
        selectedTeam = this.UpcomingSingleEvent.awayteam;
      }
    }
    let data = new HttpParams()
      .set('event_id', this.event_id)
      .set('team_id', selectedTeam)
      .set('voter_id', this.playerDetails[0].person_id)
      .set('v3', this.vote3)
      .set('v2', this.vote2)
      .set('v1', this.vote1)
      .set('vote_baf_1', '')
      .set('vote_baf_2', '')
      .set('vote_baf_3', '')
      .set('season_id', this.loggedInUserData.SEASON_ID);

    this.http.post<any>(this.global.APIURL + 'votes/saveVotingPlayer', data)
      .subscribe(response => {
        loader.dismiss();
        if(response.SUCCESS) {
          this.presentToast("Voting records saved.");
          this.navCtrl.push('EventsResultsPage');
          this.navCtrl.remove(this.navCtrl.getActive().index - 1, 2);
          this.gFn.showMenuIcon();
        } else {
          this.presentToast("Sorry we couldn't save data");
        }
      }, error => {
        loader.dismiss();
        this.presentToast("Sorry we couldn't save data");
      });
  }


  //reseting vote
  resetVote(){
    this.vote1 = '';
    this.vote2 = '';
    this.vote3 = '';

    this.saveBlankVote()
  }

  //saving vote
  saveVote(ev, person_id, ratings){
    let v1: any = '';
		let v2: any = '';
		let v3: any = '';
		if (ratings == 1) {
		  v1 = person_id;
		  this.vote1 = person_id;
		  v2 = '';
		  v3 = '';
		  if (this.vote2 == this.vote1) {
			this.vote2 = 0;
		  } else if (this.vote3 == this.vote1) {
			this.vote3 = 0;
		  }
		}
		if (ratings == 2) {
		  v1 = '';
		  v2 = person_id;
		  this.vote2 = person_id;
		  v3 = '';
		  if (this.vote1 == this.vote2) {
			this.vote1 = 0;
		  } else if (this.vote3 == this.vote2) {
			this.vote3 = 0;
		  }
		}
		if (ratings == 3) {
		  v1 = '';
		  v2 = '';
		  v3 = person_id;
		  this.vote3 = person_id;
		  if (this.vote1 == this.vote3) {
			this.vote1 = 0;
		  } else if (this.vote2 == this.vote3) {
			this.vote2 = 0;
		  }
    }
    let loader = this.loadingCtrl.create({});
    loader.present();
    let selectedTeam = this.loggedInUserData.SELECTEDTEAM;
    if(this.UpcomingSingleEvent.event_type_id == 2 && this.UpcomingSingleEvent.teamid){
      selectedTeam = this.UpcomingSingleEvent.teamid;
    }else if(this.UpcomingSingleEvent.event_type_id == 1){
      if(this.UpcomingSingleEvent.homeclubid == this.loggedInUserData.CLUB_ID){
        selectedTeam = this.UpcomingSingleEvent.hometeam;
      }else{
        selectedTeam = this.UpcomingSingleEvent.awayteam;
      }
    }
    let data = new HttpParams()
      .set('event_id', this.event_id)
      .set('team_id', selectedTeam)
      .set('voter_id', this.playerDetails[0].person_id)
      .set('v3', this.vote3)
      .set('v2', this.vote2)
      .set('v1', this.vote1)
      .set('vote_baf_1', '')
      .set('vote_baf_2', '')
      .set('vote_baf_3', '')
      .set('season_id', this.loggedInUserData.SEASON_ID);

    this.http.post<any>(this.global.APIURL + 'votes/saveVotingPlayer', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        loader.dismiss();
        if(response.SUCCESS) {
          this.presentToast("Voting records saved.");
          // if('voted' in this.playerDetails[0]){
          //   console.log('yes')
          //   console.log(this.playerDetails[0])
          // }
          // else{
          //   console.log('no')
          //   this.loggedInUserData['voted']=1
          // }
    //       this.navCtrl.push('EventDashboardPage', { 
    //         success: true, 
    //         personId: this.playerDetails[0].person_id,
    //         ActiveTab: 'Result' }).then(()=>{
    //         $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': 'url(../assets/images/menu/events-blue.svg)',
    //           'height': '36px',
    //           'color': '#43B7CC'})
    // this.gFn.showMenuIcon()
    //       });
        } else {
          this.presentToast("Sorry we couldn't save data");
        }
      }, error => {
        loader.dismiss();
        this.presentToast("Sorry we couldn't save data");
      });
      if (v1 != '') {
        $('.vote1').removeClass("active");
      } else if (v2 != '') {
        $('.vote2').removeClass("active");
      } else if (v3 != '') {
        $('.vote3').removeClass("active");
      }
      $(ev.target.parentElement).find("a").removeClass("active");
      $(ev.target).addClass("active");
  }

  goBack() {
    this.navCtrl.push('EventsResultsPage');
    this.navCtrl.remove(this.navCtrl.getActive().index - 1, 2).then(()=>{
      this.gFn.showMenuIcon();
    });
  }

  DisplaySeverityDetails(playerAilments){
    if(playerAilments){
      let SeverityModal = this.modalCtrl.create('SeverityDetailsModalPage', { playerAilments: playerAilments });
      SeverityModal.present();

    }
    else{
      this.presentToast('No Details found')
    }
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
