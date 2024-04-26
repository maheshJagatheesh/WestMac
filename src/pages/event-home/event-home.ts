import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController,AlertController,App } from 'ionic-angular';
import * as $ from 'jquery';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { GlobalProvider } from '../../providers/global/global';
import { EventLoggerProvider } from '../../providers/event-logger/event-logger';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
import { MessageLogDashboardPage } from '../message-log-dashboard/message-log-dashboard';
import { AlertDashboardPage } from '../alert-dashboard/alert-dashboard';
@IonicPage()
@Component({
  selector: 'page-event-home',
  templateUrl: 'event-home.html',
})
export class EventHomePage {
  personId: any;
  private loggedInUserData: any;
  homeScreen_bg: string;
  setHomeScreenImage: string;
  public bgThemeColor: string = '';
  CurrentDate:any;
  setActivatedTeam:any;
  FunctionAccess:any;
  isParent:any;
  interval:any;
  ShowAlert:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
    public events: Events, public http: HttpClient, public global: GlobalProvider,
    private loadingCtrl: LoadingController,public Alert: AlertController,
    public logger: EventLoggerProvider,public app:App,public global_api:GlobalApiProvider) {
      /* $('.tabbar').css('z-index','10')
   
    $('.tabs .tab-button[aria-selected=false]:nth-child(1)').attr('aria-selected','true')
    $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({'mask-image': '',
      'height': '',
      'color': ''}) */
      this.presentAlert('test', 'subtest');
    let weekdays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
    let monthNames = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
    this.CurrentDate=weekdays[new Date().getDay()]+' '+new Date().getDate()+' '+monthNames[new Date().getMonth()]+', '+new Date().getFullYear();
    // console.log('1')
    this.storage.get('setActivatedTeam').then((val) => {
      this.setActivatedTeam = JSON.parse(val);
     
      // console.log('this.setActivatedTeam',this.setActivatedTeam)
    })
    
    this.storage.get('loggedInUserData').then((val) => {
      this.loggedInUserData = val;
      global_api.getUnreadMessageCount(val);

      this.storage.get('FunctionAccess').then((val1) => {
        this.FunctionAccess=val1;
        if(this.loggedInUserData.ISPARENT && parseInt(this.loggedInUserData.PERSON_ID) != parseInt(this.loggedInUserData.PARENT_ID)){
          this.isParent = true;
          // console.log(' this.isParent', this.isParent)
          //   console.log('2')
            if(this.isParent && this.FunctionAccess.sec_absences_menu=='yes'){
              this.ShowAlert=true
              // console.log(this.FunctionAccess)
            }
         
        }
        
      });
      
     
      this.backgroundThemeColor();
      this.getImageName();
    });
    // console.log('3')

    this.global_api.getMedicineName().subscribe((data:any)=>{
      var medicineInfo = this.events.publish('json:query', data.QMEDICINE)[0][0]
      this.storage.set('medicineInfo',JSON.stringify(medicineInfo))
      // console.log(medicineInfo)
    });
    
  }
  goToChooseTeamsPage(){
    this.navCtrl.push('ChooseTeamProfilePage');
  }
  // goToTimesheet(){
  //   this.navCtrl.push('TimesheetPage')
  // }

  getNextEventDetails(){
    this.logger.NextPreviousIcons('NextPreviousIcons',{ pram: Date.now() })
    let data = new HttpParams()
        .set('clientTimeZone', this.loggedInUserData.CLIENTTIMEZONE)
        .set('selectedTeam', this.loggedInUserData.SELECTEDTEAM)
        .set('person_id', this.loggedInUserData.PERSON_ID)
        .set('SEASON_ID', this.loggedInUserData.SEASON_ID)
        .set('nextEvent', '1')
        .set('filter', '1')
        .set('client_id', this.loggedInUserData.CLIENT_ID);
    let loading = this.loadingCtrl.create();
    loading.present();
    this.http.post<any>(this.global.APIURL + 'events/getTeamEvents', data,{headers:this.global_api.getHeader()})
    .subscribe(response => {
      // console.log('response',response.GETTEAMEVENTS[0])
      if (response.SUCCESS) {
        loading.dismiss();
        if (response.GETTEAMEVENTS != "") {
          var UpcomingSingleEvent:any=JSON.stringify(response.GETTEAMEVENTS[0])
          this.storage.set('UpcomingSingleEvent', UpcomingSingleEvent);
          // console.log('response',UpcomingSingleEvent)
          this.loggedInUserData['EVENT_ID'] = response.GETTEAMEVENTS[0].event_id;
          this.loggedInUserData['EVENT_TYPE_ID'] = response.GETTEAMEVENTS[0].event_type_id;
          this.storage.set('loggedInUserData', this.loggedInUserData);
          this.sendEventDashboard(response.GETTEAMEVENTS[0]);
        }

        else {
          this.loggedInUserData['EVENT_ID'] = "";
          this.loggedInUserData['EVENT_TYPE_ID'] = "";
          this.storage.set('loggedInUserData', this.loggedInUserData);
          this.presentAlert('Upcoming Events','No upcoming events present');
        }
      } else {
        loading.dismiss();
      }
    }, error => {
      loading.dismiss();
      this.presentAlert('Error','Data not found or Connection issue.');
    });
  }

  getPreviousEventDetails(){
    this.logger.NextPreviousIcons('NextPreviousIcons',{ pram: Date.now() })
    let data = new HttpParams()
        .set('clientTimeZone', this.loggedInUserData.CLIENTTIMEZONE)
        .set('selectedTeam', this.loggedInUserData.SELECTEDTEAM)
        .set('person_id', this.loggedInUserData.PERSON_ID)
        .set('SEASON_ID', this.loggedInUserData.SEASON_ID)
        .set('nextEvent', '1')
        .set('filter', '4')
        .set('client_id', this.loggedInUserData.CLIENT_ID);
    let loading = this.loadingCtrl.create();
    loading.present();
    this.http.post<any>(this.global.APIURL + 'events/getTeamEvents', data,{headers:this.global_api.getHeader()})
    .subscribe(response => {
      // console.log('response',response.GETTEAMEVENTS[0])
      if (response.SUCCESS) {
        loading.dismiss();
        if (response.GETTEAMEVENTS != "") {
          var UpcomingSingleEvent:any=JSON.stringify(response.GETTEAMEVENTS[0])
          this.storage.set('UpcomingSingleEvent', UpcomingSingleEvent);
          // console.log('response',UpcomingSingleEvent)
          this.loggedInUserData['EVENT_ID'] = response.GETTEAMEVENTS[0].event_id;
          this.loggedInUserData['EVENT_TYPE_ID'] = response.GETTEAMEVENTS[0].event_type_id;
          this.storage.set('loggedInUserData', this.loggedInUserData);
          this.sendEventDashboard(response.GETTEAMEVENTS[0]);
        }

        else {
          this.loggedInUserData['EVENT_ID'] = "";
          this.loggedInUserData['EVENT_TYPE_ID'] = "";
          this.storage.set('loggedInUserData', this.loggedInUserData);
          this.presentAlert('Upcoming Events','No past events present');
        }
      } else {
        loading.dismiss();
      }
    }, error => {
      loading.dismiss();
      this.presentAlert('Error','Data not found or Connection issue.');
    });
  }

  backgroundThemeColor() {
    switch (this.loggedInUserData.THEME_BG) {
      case "green":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      case "blue":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      case "orange":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      case "pink":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      default:
        this.bgThemeColor = "blue";
        break;
    }
  }

  getImageName() {
    this.homeScreen_bg = this.loggedInUserData.HOMESCREEN_BG;
    this.setHomeScreenImage = 'assets/images/' + this.homeScreen_bg;
  }

  ionViewDidLoad() {
    // console.log('kk')
    /* $('.tabs .tab-button[aria-selected=true]:nth-child(2)').attr('aria-selected','false')
    $('.tabs .tab-button[aria-selected=false]:nth-child(1)').attr('aria-selected','true') */
    // $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({'mask-image': '',
    // 'height':'',
    // 'color': ''})
    // $('.tabs .tab-button[aria-selected=false]:nth-child(1) .tab-button-icon').css({'mask-image': '',
    // 'height':'',
    // 'color': ''})
    
    // $('.tabs').find('.tab-button').attr('aria-selected','true')
    this.storage.set('BackButton',false);
    
    
    

  }

  goToGradingPage() {
    this.navCtrl.push('PlayerGradingPage');
  }
  sendEventDashboard(EventData) {
    // this.navCtrl.push('EventDashboardPage')
    // this.app
    this.app.getActiveNav().push('EventHomeNewPage',{'EventDetails_eventId':EventData})
    // this.app.getRootNav().push('EventDashboardPage')
  }
  sendGameDashboard() {
    this.navCtrl.push('GameboardPage')
  }
  sendTimesheetDashboard(){
    this.navCtrl.push('TimesheetDashboardPage')
  }
  sendToMessageLog(){
    this.app.getRootNav().getActiveChildNav().select(5);
  }
  gotoAlerts(){
    this.app.getRootNav().getActiveChildNav().select(6);
  }
  

  presentAlert(Title,SubTitle) {
    let alert = this.Alert.create({
      title: Title,
      subTitle: SubTitle,
      buttons: ['Dismiss']
    });
    alert.present(alert);
  }
  gotoGalleryEvent(){
    this.navCtrl.push('GalleryEventsPage')
  }
 
}
