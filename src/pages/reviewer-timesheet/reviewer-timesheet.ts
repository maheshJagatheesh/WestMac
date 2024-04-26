import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Keyboard,Events } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
@IonicPage()
@Component({
  selector: 'page-reviewer-timesheet',
  templateUrl: 'reviewer-timesheet.html',
})
export class ReviewerTimesheetPage {
  PersonData: any;
  UpcomingSingleEvent: any;
  arrDetail: any = [];
  key: any;
  date: any;
  comment:any;
  scoreHour: any = "00";
  scoreMinutes: any = "00";
  TotalHours:any='';
  getCoachData:any = [];
  homeAwayText:string='';
  reviewerComment:any='';
  loggedInUser: any;
  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams,private storage: Storage,
    public global: GlobalProvider,public keyboard: Keyboard, private events: Events,public globalApi:GlobalApiProvider,
    public gFn:GlobalFunctionsProvider,public global_api:GlobalApiProvider) {
      this.gFn.hideMenuIcon()
  }

  ionViewDidLoad() {

 console.log("reviewer")

    this.storage.get('loggedInUserData').then((val) => {
      this.PersonData = val;
      this.loggedInUser = val;
    })
    // this.storage.get('UpcomingSingleEvent').then((val) => {
      this.UpcomingSingleEvent = JSON.parse(this.navParams.get('UpcomingSingleEvent'))
        console.log(this.UpcomingSingleEvent)
        if(this.UpcomingSingleEvent.event_id == 0){
          this.reviewerComment = this.UpcomingSingleEvent.reviewerComment;
          this.arrDetail.push(this.UpcomingSingleEvent);
          let i = 0;
          for (let keys of this.arrDetail) {
            this.key = keys;
            this.date = this.key.day;
            this.key.week = this.key.weekday;
            this.key.time_started = this.formatAMPM(this.key.date_started);
            this.arrDetail[i].name = this.arrDetail[i].event_name;
            this.arrDetail[i].months = this.arrDetail[i].month;
            i++;
          }
        }
        this.storage.get('loggedInUserData').then((val) => {
          this.PersonData = val;
          if(this.navParams.get('ContractorData')){
            this.PersonData=JSON.parse(this.navParams.get('ContractorData'))
            this.UpcomingSingleEvent.TSStatus=this.PersonData.TSStatus
            var hours=this.PersonData.hoursRec.split(':')
            this.scoreHour=hours[0]?hours[0]:'00'
            this.scoreMinutes=hours[1]?hours[1]:'00'
            this.comment=this.PersonData.comment
            this.getCoachData.EVENT_COACH_ID = this.PersonData.eventCID;
          }else if(this.UpcomingSingleEvent.CONTRACTORS.length){
            this.UpcomingSingleEvent.TSStatus = this.UpcomingSingleEvent.CONTRACTORS[0].TSStatus;
            this.getCoachData.EVENT_COACH_ID = this.UpcomingSingleEvent.CONTRACTORS[0].eventCID;
          }
          if(this.UpcomingSingleEvent.event_id > 0){
            this.getEventDetails().then(x=>{
              if(x){
                this.getCoachDetails().then(y=>{

                })

              }
            })
          }
        })

    console.log('ionViewDidLoad ReviewerTimesheetPage');
  }
  ionViewDidLeave(){
    this.gFn.showMenuIcon()
  }
  EditData(val){
    if(val=='hours'){
      this.scoreHour='';
    }
    else{
      this.scoreMinutes='';
    }

  }
  setTimePad(){
    if(parseInt(this.scoreHour)<10){
      this.scoreHour=this.padLeft(parseInt(this.scoreHour), 2)
      // this.scoreHour='00'
    }
    if(parseInt(this.scoreMinutes)<10){
      this.scoreMinutes=this.padLeft(parseInt(this.scoreMinutes), 2)
      // this.scoreMinutes='00'
    }

  }
  saveGameScore(){
    this.TotalHours=this.scoreHour+'.'+Math.round(((100/60)*parseInt(this.scoreMinutes)));
  }
  Morelength(){

    if(this.scoreHour>=24){

      if(this.scoreHour==24){
        this.keyboard.close()
        this.scoreMinutes='00'
      }
      else{
        this.scoreHour=24
      // this.scoreHour=this.scoreHour/100;

      console.log(this.scoreHour)

      }

    }
    else if(this.scoreMinutes>59){
      if(this.scoreHour>23){
        this.scoreHour='00'
      }
      this.scoreMinutes=59

      this.keyboard.close()
      console.log(this.scoreMinutes)
    }

  }

  getCoachDetails() {
    return new Promise((resolve) => {
      let loginData = new HttpParams()
        .set('event_id',this.UpcomingSingleEvent.event_id)
        .set('person_id', this.UpcomingSingleEvent['CONTRACTORS'][0].PERSON_ID)
        .set('clientTimeZone', this.UpcomingSingleEvent['CONTRACTORS'][0].CLIENTTIMEZONE)
        .set('club_id', this.UpcomingSingleEvent['CONTRACTORS'][0].CLUB_ID )
        .set('season_id', this.UpcomingSingleEvent['CONTRACTORS'][0].SEASON_ID);

      this.http.post(this.global.APIURL + "events/getCoachInfo", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          let Data = this.events.publish('json:query', data.GETCOACHINFO[1]);
          console.log(Data[0][0].EVENT_COACH_ID)

          this.getCoachData=Data[0][0];
          this.comment=this.getCoachData['APPROVAL_COMMENT']
          this.reviewerComment = this.getCoachData['REVIEWER_COMMENT'] ? this.getCoachData['REVIEWER_COMMENT'] : '';
          this.scoreHour=Math.floor(this.getCoachData['HOURS_RECORDED'])
          this.scoreMinutes=parseInt((((this.getCoachData['HOURS_RECORDED']-Math.floor(this.getCoachData['HOURS_RECORDED']))*(60/100)*100)).toFixed(2))
          this.setTimePad();
          console.log((((this.getCoachData['HOURS_RECORDED']-Math.floor(this.getCoachData['HOURS_RECORDED']))*(60/100)).toFixed(2)))
          resolve(true);
        }, error => {
        });
    })
  }
 padLeft(num, size) {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  getEventDetails() {
    return new Promise((resolve) => {
      let loginData = new HttpParams()
        .set('event_id', this.UpcomingSingleEvent.event_id)
        .set('event_type_id', this.UpcomingSingleEvent.event_type_id)
        .set('clientTimeZone', this.UpcomingSingleEvent['CONTRACTORS'][0].CLIENTTIMEZONE)
        .set('selectedTeam', this.UpcomingSingleEvent['CONTRACTORS'][0].SELECTEDTEAM)
        .set('client_id', this.UpcomingSingleEvent['CONTRACTORS'][0].CLIENT_ID);


      this.http.post(this.global.APIURL + "events/getEventDetails", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          this.arrDetail = data.GETEVENTDETAILS;
          this.homeAwayText = (data.GETEVENTDETAILS[0]["ishometeam"])? 'Home':'Away';
          for (let keys of this.arrDetail) {
            this.key = keys
            this.date = this.key.date.split('/')[0]
          }
          resolve(true);
        }, error => {
        });
    })
  }
  TimesheetStatus(status) {
    return new Promise((resolve) => {
      let loginData = new HttpParams()
        .set('person_id', this.UpcomingSingleEvent['CONTRACTORS'][0].PERSON_ID)
        .set('event_coach_id', this.getCoachData.EVENT_COACH_ID)
        .set('season_id',this.UpcomingSingleEvent['CONTRACTORS'][0].SEASON_ID)
        .set('approve_value',status)
        .set('reviewer_comment', this.reviewerComment)
        .set('app_type', this.global.App_id)
        .set('clientTimeZone', this.UpcomingSingleEvent['CONTRACTORS'][0].CLIENTTIMEZONE);

      this.http.post(this.global.APIURL + "events/approveTimesheets", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if(data.APPROVETIMESHEETS==true && data.SUCCESS==true){
            this.globalApi.presentToast(data.MESSAGE);
          }
          this.navCtrl.push('TimesheetDashboardPage')
          resolve(true);
        }, error => {
        });
    })
  }

  backArrow(){
    this.navCtrl.pop();
  }

  formatAMPM(date) {
    date = new Date(date);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

}
