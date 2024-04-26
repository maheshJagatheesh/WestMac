import { Component } from '@angular/core';
import { IonicPage, NavController,Events, NavParams,Keyboard } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
@IonicPage()
@Component({
  selector: 'page-timesheet',
  templateUrl: 'timesheet.html',
})
export class TimesheetPage {
  PersonData: any;
  UpcomingSingleEvent: any;
  arrDetail: string[];
  key: any;
  date: any;
  comment:any = '';
  scoreHour: any = "00";
  scoreMinutes: any = "00";
  TotalHours:any='';
  getCoachData:any;
  homeAwayText:string='';
  Time:any='00:00';
  isSaved: boolean = true;
  input_disable: any;
  constructor(public navCtrl: NavController,public http: HttpClient, private storage: Storage,public gFn:GlobalFunctionsProvider,
     public navParams: NavParams,public global: GlobalProvider, private events: Events,public keyboard: Keyboard,public global_api:GlobalApiProvider) {
    this.gFn.hideMenuIcon()
    this.storage.get('UpcomingSingleEvent').then((val) => {
      this.UpcomingSingleEvent = JSON.parse(val)
      this.storage.get('loggedInUserData').then((val) => {
        this.PersonData = val;
        this.getEventDetails().then(x=>{
          if(x){
            this.getCoachDetails().then(y=>{
            
            })

          }
          

        })
        
      })
    })
    
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
    var Time=this.Time.split(':')
    this.scoreHour=parseInt(Time[0]) 
    this.scoreMinutes=Time[1] 
    console.log(Time)
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
    // else if(this.scoreHour<24){
    //   if(this.scoreMinutes>59){
    //     this.scoreMinutes=59
    //     // this.scoreMinutes=this.scoreMinutes%100;
    //     this.keyboard.close()
    //     console.log(this.scoreMinutes)
    //   }

    // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimesheetPage');
  }
  Save(){
    this.saveGameScore()
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
    return new Promise((resolve) => {
      // this.PersonData.SEASON_ID
      let loginData = new HttpParams()
        .set('person_id', this.PersonData.PERSON_ID)
        .set('event_id',this.UpcomingSingleEvent.event_id)
        .set('selectedTeam',selectedTeam)
        .set('clientTimeZone', this.PersonData.CLIENTTIMEZONE)
        .set('event_coach_id',  this.getCoachData?this.getCoachData.EVENT_COACH_ID:'' )
        .set('approval_comment', this.comment)
        .set('season_id', this.arrDetail[0]['season_id'])
        .set('hours', this.TotalHours)
        .set('type', '1');
        
        
      this.http.post(this.global.APIURL + "events/updateTimesheets", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if(!data.SUCCESS){
            this.gFn.presentToast('Data issue or connection issue')
          }
          this.gFn.showMenuIcon();
          this.navCtrl.pop();
          console.log(data)
          resolve(true);
        }, error => {
        });
    })

  }
  getCoachDetails() {
        console.log("this.PersonData.SEASON_ID",this.PersonData.SEASON_ID) 

    return new Promise((resolve) => {
      let loginData = new HttpParams()
        .set('event_id',this.UpcomingSingleEvent.event_id)
        .set('person_id', this.PersonData.PERSON_ID)
        .set('clientTimeZone', this.PersonData.CLIENTTIMEZONE)
        .set('club_id', this.PersonData.CLUB_ID )
        .set('season_id', this.PersonData.SEASON_ID);
        console.log("season_id", this.PersonData.SEASON_ID);

      this.http.post(this.global.APIURL + "events/getCoachInfo", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          let Data = this.events.publish('json:query', data.GETCOACHINFO[1]);
          console.log("DATA",Data);

          let Data_new = data.GETCOACHINFO[0].canFillTimeSheet;

          if(Data_new){
            this.isSaved = true;
          }else{
            this.isSaved = false;
          }

          this.getCoachData=Data[0][0];
           console.log("data from getCoachInfo",this.getCoachData);
          if(this.getCoachData){
            // this.isSaved = true;
            this.comment=this.getCoachData['APPROVAL_COMMENT'];
            console.log("comment",this.comment)

            this.scoreHour=Math.floor(this.getCoachData['HOURS_RECORDED'])
            this.scoreMinutes=parseInt((((this.getCoachData['HOURS_RECORDED']-Math.floor(this.getCoachData['HOURS_RECORDED']))*(60/100)*100)).toFixed(2))
            this.setTimePad();
            this.Time=this.scoreHour+':'+this.scoreMinutes
            console.log((((this.getCoachData['HOURS_RECORDED']-Math.floor(this.getCoachData['HOURS_RECORDED']))*(60/100)).toFixed(2)))
          }else{
            // this.isSaved = false;
          }
          
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
        .set('client_id', this.UpcomingSingleEvent.client_id);

      this.http.post(this.global.APIURL + "events/getEventDetails", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          this.arrDetail = data.GETEVENTDETAILS;
          
          this.homeAwayText = (data.GETEVENTDETAILS[0]["ishometeam"])? 'Home':'Away';
          for (let keys of this.arrDetail) {
            this.key = keys
            this.date = this.key.date.split('/')[0];
            this.input_disable = this.key.canScore;
          }
          resolve(true);
        }, error => {
        });
    })
  }
  backArrow(){
    this.gFn.showMenuIcon();
    this.navCtrl.pop();
  }
  ionViewDidLeave(){
    this.gFn.showMenuIcon()
  }

}
