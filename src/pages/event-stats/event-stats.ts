import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import * as $ from 'jquery';

import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the EventStatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-stats',
  templateUrl: 'event-stats.html',
})
export class EventStatsPage {
  userData: any;
  players: any[] = [];
  uniformId: any;
  minutes: any = "00";
  seconds: any = "00";
  playDisp: any = "block";
  pauseDisp: any = "none";
  personId: any = "";
  graphView: any = "none";
  statsView: any = "block";
  signalIcon: any = "assets/images/network-signal.png";
  eventId: any = 46144;
  Time:any;
  FunctionAccess:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    public global: GlobalProvider,
    public modalCtrl: ModalController,
    public gFn:GlobalFunctionsProvider,
    public global_api:GlobalApiProvider
  ) {
    
    this.storage.get('loggedInUserData').then((val) => {
      this.userData = val;
      this.setPlayersEvents();
      // this.GameStart();
    });
  }
  // GameStart(){
  //   setInterval(()=>{
  //     let currentDate=new Date();
  //     this.Time=currentDate.toLocaleTimeString()
      
  //   },100)
  // }
  

  setPlayersEvents()
  {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.getPlayersEvents().then((x) => {
			if(x)
			{
        loading.dismiss();

        for (var i = 0; i < this.players.length; i++) {
          //console.log("player", i);
          let percentage = 0;
          if (i == 14)
          {
            break;
          }
          else if (this.players[i].game_minutes != "" && this.players[i].game_seconds != "") 
          {
            percentage = this.players[i].game_minutes + (this.players[i].game_seconds) / 60;
          }
          else if (this.players[i].game_minutes == "" && this.players[i].game_seconds != "") 
          {
            percentage = (this.players[i].game_seconds) / 60;
          }

          $(".graphClass").append("<li><div data-percentage='" + percentage + "' class='bar'></div></li>");
        }
      }
    });
  }

  private getPlayersEvents() {
    //console.log(this.userData);
    return new Promise((resolve) => {
      let eventStatsData = new HttpParams()
        .set('event_id', '46144')
        .set('selectedTeam', this.userData.SELECTEDTEAM)
        .set('client_id', this.userData.CLIENT_ID)
        .set('club_id', this.userData.CLUB_ID)
        .set('adminLevel', this.userData.ADMINLEVEL)
        .set('clientSport', this.userData.SPORT_TYPE);
      this.http.post<any>(this.global.APIURL + 'events/getPlayersEvent', eventStatsData,{headers:this.global_api.getHeader()})
        .subscribe(response => {
          if (response.SUCCESS) {
            this.players = response.GETPLAYERSEVENT;
            
            resolve(true);
          }
          else {
            alert('Sorry no matching result found');
          }
        }, error => {
          
        });
    });
    
    
  }

  ionViewDidLoad() {
    this.storage.get('FunctionAccess').then((val)=>{
      this.FunctionAccess=val;
    })
    //console.log('ionViewDidLoad EventStatsPage');
    $(function () {
      $("#bars li .bar").each(function (key, bar) {
        var percentage = $(this).data('percentage');

        $(this).animate({
          'height': percentage * 4.3 + '%'
        }, 1000);
      })
    })
  }

  time: any = 0;
  offset: any;
  interval: any;
  isOn: boolean = false;

  setTimer(personId, uniformId, sec, min, event) {
    if (this.isOn) {
      this.pressStop();
    }
    this.playDisp = "block";
    this.pauseDisp = "none";
    this.uniformId = uniformId;
    this.personId = personId;
    sec == "" ? this.seconds = "00" : (sec < 10 ? this.seconds = "0" + sec : this.seconds = sec);
    min == "" ? this.minutes = "00" : (min < 10 ? this.minutes = "0" + min : this.minutes = min);
    //console.log(event.class);
    //this.seconds = sec;
    //this.minutes = min;
  }

  pressPlay() {
    if (this.personId != "") {
      this.playDisp = "none";
      this.pauseDisp = "";
      this.start();
    }
  }
  pressPause() {
    this.pause();
    this.playDisp = "block";
    this.pauseDisp = "none";

  }
  pressStop() {
    this.stop();
    this.playDisp = "block";
    this.pauseDisp = "none";
  }




  update() {
    if (this.isOn) {
      var t = this.delta();
      this.time = this.time + t;
      this.formatTime(this.time);
    }
  }
  formatTime(t: any) {
    //var timeInMil = ((parseInt(this.minutes)*60) + parseInt(this.seconds))*1000;
    var time = new Date(t);

    var minutes = (time.getMinutes() - 30).toString();
    var seconds = (time.getSeconds()).toString();
    //console.log(minutes+":"+seconds);
    if (seconds.length < 2) {
      seconds = "0" + seconds;
    }
    if (minutes.length < 2) {
      minutes = "0" + minutes;
    }
    this.minutes = minutes;
    this.seconds = seconds;
  }
  start() {
    this.isOn = true;
    var timeInMil: any = new Date(((parseInt(this.minutes) * 60) + parseInt(this.seconds)) * 1000);
    this.offset = Date.now() - timeInMil;
    var u = this;
    this.interval = setInterval(function () {
      u.update();
    }, 1000);
  }
  pause() {
    this.interval = null;
    this.isOn = false;
  }
  stop() {
    this.savePlayerTime();
    this.time = null;
    this.interval = null;
    this.isOn = false;
    this.offset = null;
    this.minutes = "00";
    this.seconds = "00";
    this.update();
  }
  delta() {
    var now = Date.now();
    var timePassed = now - this.offset;
    this.offset = now;
    return timePassed;
  }
  savePlayerTime() {
    let playerTimeData = new HttpParams()
      .set('event_id', '46144')
      .set('person_id', this.personId)
      .set('mins', this.minutes)
      .set('secs', this.seconds)
      .set('team_id', '3442');

    this.http.post<any>(this.global.APIURL + 'events/savePlayersGameTime', playerTimeData,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        //console.log(JSON.stringify(response));
        if (response.SUCCESS) {
          this.navCtrl.push("EventStatsPage");
        }
        else {
          alert('Sorry no matching result found');
        }
      }, error => {

      });

  }
  goToGraph() {
    if (this.graphView == "none") {
      this.statsView = "none";
      this.graphView = "block";
      this.signalIcon = "assets/images/signal-rotate.png";
      this.ionViewDidLoad();
    } else {
      this.statsView = "block";
      this.graphView = "none";
      this.signalIcon = "assets/images/network-signal.png";
    }
  }
  onClickApplyAction(personId, firstName, lastName, uniformId, minutes, seconds) {
    const playerInfo = {
      fName: firstName,
      lName: lastName,
      uniform: uniformId,
      min: minutes,
      sec: seconds,
      person: personId
    };
    let playerData = new HttpParams()
      .set('event_id', '46144')
      .set('person_id', personId);
    this.http.post<any>(this.global.APIURL + 'stats/getPlayerStats', playerData,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        console.log(JSON.stringify(response));
        if (response.SUCCESS) {
          let playerStats = response.GETPLAYERSTATS;

          let statsModal = this.modalCtrl.create('EventUpdatePlayerModalPage', { stats: playerStats, info: playerInfo, event: this.eventId });
          statsModal.present();
        }
        else {
          alert('Sorry no matching result found');
        }
      }, error => {
      });
  }
}
/*
export class StopWatch{
  time:any = 0;
  offset:any;
  interval:any;
  isOn:boolean = false;
  minute:any;
  second:any;
  minutes:any;
  update(){
    if(this.isOn){
      var t = this.delta();
      this.time = this.time + t;
      this.formatTime(this.time);
    }
  }
  formatTime(t:any){
    var time = new Date(t);
    var minutes = (time.getMinutes() - 30).toString();
    var seconds = time.getSeconds().toString();
    console.log(minutes+":"+seconds);
    if(seconds.length < 2){
      seconds = "0"+seconds;
    }
    if(minutes.length < 2){
      minutes = "0"+minutes;
    }
    console.log(minutes+":"+seconds);
    //this.minutes = minutes;
    //this.seconds = seconds;
  }
  start() {
    this.isOn = true;
    this.offset = Date.now();
    var u = this;
    this.interval = setInterval(function(){
      u.update();
    }, 1000);
  }
  pause(){
    this.interval = null;
    this.isOn = false;
  }
  stop(){
    this.time = 0;
    this.interval = null;
    this.isOn = false;
    this.minute = "00";
    this.second = "00";
    this.update();
  }
  delta() {
    var now = Date.now();
    var timePassed = now - this.offset;
    this.offset = now;
    return timePassed;
  }

  getMin(){
    return this.minute;
  }
  getSecond(){
    return this.second;
  }
}
*/
