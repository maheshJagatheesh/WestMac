import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Keyboard,Events, Platform } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
@IonicPage()
@Component({
  selector: 'page-read-only-timesheet',
  templateUrl: 'read-only-timesheet.html',
})
export class ReadOnlyTimesheetPage {
  PersonData: any;
  UpcomingSingleEvent: any;
  arrDetail: any = [];
  key: any;
  date: any;
  comment:any;
  scoreHour: any = "00";
  scoreMinutes: any = "00";
  Time:any= '00:00';
  TotalHours:any='';
  getCoachData:any = [];
  homeAwayText:string='';
  reviewerComment:any='';
  isDisabled: boolean = false;
  hideButton: boolean = false;
  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams,private storage: Storage,
    public global: GlobalProvider,public keyboard: Keyboard, private events: Events,public globalApi:GlobalApiProvider,
    public gFn:GlobalFunctionsProvider, private plt: Platform,public global_api:GlobalApiProvider ) {
      this.gFn.hideMenuIcon()
      plt.ready().then(()=>{
        plt.registerBackButtonAction(()=>{
          this.backArrow();
        });
      });
  }

  ionViewDidLoad() { 
    console.log("read-only")


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
        console.log("personData", this.PersonData)

        if(this.navParams.get('ContractorData')){
          this.PersonData=JSON.parse(this.navParams.get('ContractorData'))
          this.UpcomingSingleEvent.TSStatus=this.PersonData.TSStatus
          var hours=this.PersonData.hoursRec.split(':')
          this.scoreHour=hours[0]?hours[0]:'00'
          this.scoreMinutes=hours[1]?hours[1]:'00'
          this.Time = this.scoreHour+':'+this.scoreMinutes;
          this.comment=this.PersonData.comment
          this.getCoachData.EVENT_COACH_ID = this.PersonData.eventCID;
          if(this.UpcomingSingleEvent.TSStatus == 'Approved' || this.UpcomingSingleEvent.TSStatus == 'Rejected'){
            this.isDisabled = true;
          }
        }else if(this.UpcomingSingleEvent.CONTRACTORS.length){
          this.UpcomingSingleEvent.TSStatus = this.UpcomingSingleEvent.CONTRACTORS[0].TSStatus;
          this.getCoachData.EVENT_COACH_ID = this.UpcomingSingleEvent.CONTRACTORS[0].eventCID;
          if(this.UpcomingSingleEvent.TSStatus == 'Approved' || this.UpcomingSingleEvent.TSStatus == 'Rejected'){
            this.isDisabled = true;
          }
        }
        if(this.UpcomingSingleEvent.event_id > 0){
          this.getEventDetails().then(x=>{
            if(x){
              this.getCoachDetails().then(y=>{
                
            })
            }
          })
        }
          
          // this.getCoachDetails().then(y=>{
              
          // })
          
        
        // if(this.PersonData){
        //   console.log(this.PersonData)
          
        // }
          
        
      })
      
    // })
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
    var Time=this.Time.split(':');
    this.scoreHour=parseInt(Time[0]);
    this.scoreMinutes=Time[1];
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
        .set('person_id', this.PersonData.PERSON_ID)
        .set('clientTimeZone', this.PersonData.CLIENTTIMEZONE)
        .set('club_id', this.PersonData.CLUB_ID )
        .set('season_id', this.PersonData.SEASON_ID);

      this.http.post(this.global.APIURL + "events/getCoachInfo", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          let Data = this.events.publish('json:query', data.GETCOACHINFO[1]);
          console.log("read-only-Data",Data[0][0].EVENT_COACH_ID)
            
          this.getCoachData=Data[0][0];
          if(this.getCoachData){
            this.hideButton = true;
          }else{
            this.hideButton = false;
          }
          this.comment=this.getCoachData['APPROVAL_COMMENT']
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
        .set('clientTimeZone', this.PersonData.CLIENTTIMEZONE)
        .set('selectedTeam', this.PersonData.SELECTEDTEAM)
        .set('client_id', this.PersonData.CLIENT_ID);

      this.http.post(this.global.APIURL + "events/getEventDetails", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          this.arrDetail = data.GETEVENTDETAILS;
          this.homeAwayText = (data.GETEVENTDETAILS[0]["ishometeam"])? 'Home':'Away';
          for (let keys of this.arrDetail) {
            console.log(this.arrDetail)
            this.key = keys
            console.log(this.key)
            
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
        .set('person_id', this.PersonData.PERSON_ID)
        .set('event_coach_id', this.getCoachData.EVENT_COACH_ID)
        .set('season_id',this.PersonData.SEASON_ID)
        .set('approve_value',status)
        .set('clientTimeZone', this.PersonData.CLIENTTIMEZONE);

      this.http.post(this.global.APIURL + "events/approveTimesheets", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if(data.APPROVETIMESHEETS==true && data.SUCCESS==true){
            if(status==1){
              this.globalApi.presentToast('Accepted Timesheet')
            }
            else if(status==0){
              this.globalApi.presentToast('Rejected Timesheet')
            }
            
          }
          this.navCtrl.push('TimesheetDashboardPage')
          resolve(true);
        }, error => {
        });
    })
  }

  Save(){
    this.saveGameScore()
    return new Promise((resolve) => {
      let loginData = new HttpParams()
        .set('person_id', this.PersonData.PERSON_ID)
        .set('event_id', this.UpcomingSingleEvent.event_id)
        .set('selectedTeam', '0')
        .set('clientTimeZone', this.PersonData.CLIENTTIMEZONE)
        .set('event_coach_id',  this.getCoachData.EVENT_COACH_ID )
        .set('approval_comment', this.comment)
        .set('season_id', this.PersonData.SEASON_ID)
        .set('hours', this.TotalHours)
        .set('type', '1');
        
        
      this.http.post(this.global.APIURL + "events/updateTimesheets", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if(!data.SUCCESS){
            this.gFn.presentToast('Data issue or connection issue')
          }
          this.gFn.showMenuIcon();
          this.navCtrl.push('TimesheetDashboardPage', {segments:'MyHours'});
          this.navCtrl.remove(this.navCtrl.getActive().index - 1, 2);
          resolve(true);
        }, error => {
        });
    })

  }

  backArrow(){
    this.navCtrl.push('TimesheetDashboardPage', {segments:'MyHours'});
    this.navCtrl.remove(this.navCtrl.getActive().index - 1, 2);
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

