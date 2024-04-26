import { Component } from '@angular/core';
import { IonicPage, NavController,Events, NavParams,Keyboard, Platform } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

@IonicPage()
@Component({
  selector: 'page-timesheet-adhoc',
  templateUrl: 'timesheet-adhoc.html',
})
export class TimesheetAdhocPage {
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
  eventDate: any= '';
  eventName: any = '';
  constructor(public navCtrl: NavController,public http: HttpClient, private storage: Storage,public gFn:GlobalFunctionsProvider,
     public navParams: NavParams,public global: GlobalProvider, private events: Events,public keyboard: Keyboard, private plt: Platform,public global_api:GlobalApiProvider) {
    this.gFn.hideMenuIcon()
    this.storage.get('UpcomingSingleEvent').then((val) => {
      this.UpcomingSingleEvent = JSON.parse(val)
      this.storage.get('loggedInUserData').then((val) => {
        this.PersonData = val;        
      })
    })
    plt.ready().then(()=>{
      plt.registerBackButtonAction(()=>{
        this.backArrow();
      });
    });    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimesheetAdhocPage');
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
  }
  
  padLeft(num, size) {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  Save(){
    if(this.eventName.trim().length <= 0){
      this.gFn.presentToast('Please enter event name');
      return;
    }else if(this.eventDate.trim().length <= 0){
      this.gFn.presentToast('Please enter event date');
      return;
    }
    this.saveGameScore();
    return new Promise((resolve) => {
      let loginData = new HttpParams()
        .set('person_id', this.PersonData.PERSON_ID)
        .set('clientTimeZone', this.PersonData.CLIENTTIMEZONE)
        .set('approval_comment', this.comment)
        .set('season_id', this.PersonData.SEASON_ID)
        .set('hours', this.TotalHours)
        .set('eventName', this.eventName)
        .set('eventDate', this.eventDate)
        .set('type', '1');        
        
      this.http.post(this.global.APIURL + "events/saveAdhocTimesheets", loginData,{headers:this.global_api.getHeader()})
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
    this.gFn.showMenuIcon();
    this.navCtrl.pop();
  }

}
