import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, LoadingController, Events, ModalController, ToastController, Platform, App,
  AlertController, Keyboard
} from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { Directive, ElementRef } from '@angular/core';
import 'rxjs/add/operator/timeout';
import { EventLoggerProvider } from '../../providers/event-logger/event-logger';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { TabsPage } from '../tabs/tabs';
import { Calendar } from '@ionic-native/calendar/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the EventAttendancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-attendance',
  templateUrl: 'event-attendance.html',
})
export class EventAttendancePage {
  PersonData: any;
  detailsData: any;
  client_id: any;
  selectedTeam: any;
  PhotoApiUrl: string;
  eventAttend: any = [];
  DupeventAttendLen: any = [];
  DupeventAttendsec: any = [];
  DupEventAttendSecBorrowed: any = [];
  combinedPlayersArray: any = [];
  combinedBorrowedPlayersArray: any = [];
  percentArray: any = [];
  eventVal: any;
  Arrowflag: any = false;
  AttendyPersonId: any = '';
  BorrowedPlayerPresent: any;
  arrDetail: any = [];
  key: any;
  date: any;
  UpcomingSingleEvent: any;
  GoingColor: any = '#68E048';
  MaybeColor: any = '#2BBFF0';
  NotGoingColor: any = '#D80000';
  NoResponseColor: any = '#F59044';
  AttdnColor: any = '#fff';
  PlayerAttending: any;
  reason_options_list: any = [];
  Attendance: any = false;
  FunctionAccess: any;
  filterState: any = 0;
  filterButton: any = '';
  notifyFlag: any;
  BorrowTagFlag: any = 0;
  BackButton: any = false;
  SymbolAlert: any = false;
  groundAdress: any = '';
  groundState: any = '';
  latitude: any = '';
  longitude = '';
  homeAwayText: string = '';
  isParent: boolean = false;
  showEvent: boolean = false;
  segments: any;
  AutoSegments: any = {};
  personDetail: any;
  WelfarePeopleDetail: any;
  QuestionSuccess: any;
  QuestionPlayerId: any;
  ShowSeverityPage: boolean = false
  medicalInfo: any = false;

  //Result
  players: any = [];
  private loader: any;
  event_id: string;
  clientTimeZone: string;
  event_type_id: string;
  reportTextRowOpened: boolean = false;
  scoreHome: string = "0";
  scoreAway: string = "0";
  gameDismissed: string = "";
  reportText: string = "";
  vote1: any = '';
  vote2: any = '';
  vote3: any = '';
  activePlayer: any = '';
  voteSuccess: boolean = false;
  voteForPlayerId: string = '';
  coachDetails: any = [];
  interval: any;
  ShowWelfare: any;
  ShowResult: any;
  EmptyBorrowPlayer: boolean = false;
  scoreIsUpdated: number = 0;
  isLoaded:boolean = false;
  isOffline:boolean = false;
  playerDetails: any = [];
  attendanceReason: any = '';
  person_id: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, private storage: Storage, private events: Events, public keyboard: Keyboard,
    public global: GlobalProvider, public modalCtrl: ModalController, public app: App, private launchNavigator: LaunchNavigator,
    public logger: EventLoggerProvider, public plt: Platform, public gFn: GlobalFunctionsProvider, private calendar: Calendar, 
    private Alert: AlertController, private vibration: Vibration,public global_api:GlobalApiProvider)
    {
   
      this.gFn.showMenuIcon()
      this.PhotoApiUrl = this.global.PROFILEIMAGEURL;
  
      // $('.tabs .tab-button[aria-selected=true]:nth-child(4) .tab-button-icon').toggle()
      // $('.tabs .tab-button[aria-selected=true]:nth-child(4) .tab-button-icon').css({'mask-image': '',
      // 'height': '',
      // 'color': '#dedede'})
  
     this.loadDefaultData();

      plt.registerBackButtonAction(() => { 
        this.backArrow();
      });
  
    }

    loadDefaultData(){
      this.storage.get('FunctionAccess').then((val) => {
        this.FunctionAccess = val;
        this.storage.get('loggedInUserData').then((val) => {
          this.PersonData = val;
          this.coachDetails[0] = val;
          this.person_id = this.PersonData.PERSON_ID;
          console.log(this.FunctionAccess)
          this.storage.get('filterChild').then((val) => {
            if(val != null && val.length){
              this.person_id = val[0];
            }
            if (this.navParams.get('EventDetails_eventId')) {
              this.UpcomingSingleEvent = this.navParams.get('EventDetails_eventId');
              if(this.navParams.get('deeplink')){
                this.UpcomingSingleEvent = JSON.parse(this.UpcomingSingleEvent);
              }
              this.storage.set('UpcomingSingleEvent', JSON.stringify(this.UpcomingSingleEvent));
              this.event_id = this.UpcomingSingleEvent.event_id;
              if (this.FunctionAccess.event_Welfare == 'yes' && this.UpcomingSingleEvent.welfare_question == 1) {
                $('.top_tab').find('.Welfare_tab').css('display', 'inherit')
                this.ShowWelfare = true;  
              }
              if ((this.FunctionAccess.event_Result == 'yes' || this.FunctionAccess.voting_for_player != 'no') && this.UpcomingSingleEvent.event_type_id != 2) {
                $('.top_tab').find('.Result_tab').css('display', 'inherit')
                this.ShowResult = true;
              }
              var active_tab = this.navParams.get('ActiveTab') ? this.navParams.get('ActiveTab') : 'Attendance';    
              this.segments = active_tab;
              this.AutoSegments = { value: this.segments };
              this.segmentChanged(this.AutoSegments);    
            }
            else {
              this.storage.get('UpcomingSingleEvent').then((val) => {
                this.UpcomingSingleEvent = JSON.parse(val)
                this.event_id = this.UpcomingSingleEvent.event_id;
                if (this.FunctionAccess.event_Welfare == 'yes' && this.UpcomingSingleEvent.welfare_question == 1) {
                  $('.top_tab').find('.Welfare_tab').css('display', 'inherit')
                  this.ShowWelfare = true;
                }
                if ((this.FunctionAccess.event_Result == 'yes' || this.FunctionAccess.voting_for_player != 'no') && this.UpcomingSingleEvent.event_type_id != 2) {
                  $('.top_tab').find('.Result_tab').css('display', 'inherit')
                  this.ShowResult = true;
                }
                var active_tab = this.navParams.get('ActiveTab') ? this.navParams.get('ActiveTab') : 'Attendance';    
                this.segments = active_tab;
                this.AutoSegments = { value: this.segments };
                this.segmentChanged(this.AutoSegments)    
              });    
            }
          });
        });  
      });
    }



    segmentChanged(event) {
      this.isOffline = false;
      this.getAttendingDetails();
      this.getEventDetails().then((x) => {
        if (x) {
          this.isLoaded = true;  
        }else{
          this.isOffline = true;
        }
      }); 
    }

    highlightMenuIcon() {
      // $('.tabs .tab-button[aria-selected=true]:nth-child(1)').attr('aria-selected','false')
      /* $('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected', 'true')
      $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({
        'mask-image': 'url(../assets/images/menu/home.svg)',
        'height': '22px',
        'color': '#dedede'
      }) */
      // $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': 'url(../assets/images/menu/events-blue.svg)',
      // 'height': '36px',
      // 'color': '#43B7CC'})
    }
  
    unhighlightMenuIcon() {
      if (!this.showEvent) {
        /* console.log(';ll')
        // this.navCtrl.pop()
        $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({
          'mask-image': '',
          'height': '',
          'color': ''
        })
        // $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': '',
        // 'height': '',
        // 'color': ''})
        $('.tab-button-icon').closest('.tabs .tab-button[aria-selected=true]:nth-child(1) .activated').css({
          'mask-image': '',
          'height': '',
          'color': ''
        })
        $('.tabs .tab-button[aria-selected=true]:nth-child(2)').attr('aria-selected', 'false') */
      }
    }
  
    ionViewDidEnter() {
      this.highlightMenuIcon();
    }
  
    ionViewDidLoad() {
      this.highlightMenuIcon();
  
  
      this.storage.get('BackButton').then((val) => {
        this.BackButton = val;
      })
  
    }
    ionViewWillLeave() {
      this.unhighlightMenuIcon();
    }
  
    getAttendingDetails() {
      return new Promise((resolve) => {
        let Data = new HttpParams()
          .set('event_id', this.UpcomingSingleEvent.event_id)
          .set('client_id', this.UpcomingSingleEvent.client_id)
          .set('person_id', this.person_id)
          .set('first_name', this.PersonData.FIRST_NAME)
          .set('last_name', this.PersonData.LAST_NAME)
          .set('selectedTeam', this.PersonData.SELECTEDTEAM);
  
        this.http.post(this.global.APIURL + "players/getPlayerAttending", Data,{headers:this.global_api.getHeader()})
          .subscribe((data: any) => {
            this.playerDetails = data.GETPLAYERATTENDING;
            this.reason_options_list.push(data.GETPLAYERATTENDING[0].reason_options_list);
            console.log("getAttendingDetails.reason_options_list",this.playerDetails);
            console.log("getAttendingDetails.reason_options_list[0]",this.reason_options_list[0]);
            setTimeout(() => {
              if($('.attendence:checked').length){
                this.attendanceReason = $('.attendence:checked').val();
              }
            }, 1000);
            resolve(true);
          }, error => {
  
          });
      })
  
    }
    gotoResults() {
      this.gFn.gotoResults()
      this.showEvent = true
    }
    gotoWelfare() {
      this.gFn.gotoWelfare()
      this.showEvent = true
    }
  
    private presentToast(text) {
      let toast = this.toastCtrl.create({
        message: text,
        duration: 3000,
        position: 'top'
      });
      toast.present();
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
          .subscribe((response: any) => {
            this.arrDetail = response.GETEVENTDETAILS;
            this.homeAwayText = (response.GETEVENTDETAILS[0]["ishometeam"]) ? 'Home' : 'Away';
            this.storage.set('EventDetails', this.arrDetail)
            for (let keys of this.arrDetail) {
              this.key = keys
              this.date = this.key.date.split('/')[0]
              this.groundAdress = this.key.ground_address;
              this.groundState = this.key.ground_state;
              this.longitude = this.key.geoloc_longitude;
              this.latitude = this.key.geoloc_latitude;
            }
  
            if (response.GETEVENTDETAILS.length > 0) {
              this.scoreIsUpdated = response.GETEVENTDETAILS[0]["isUpdated"];
              this.reportText = (response.GETEVENTDETAILS[0]["ishometeam"]) ? response.GETEVENTDETAILS[0]["report_home"] : response.GETEVENTDETAILS[0]["report_away"];
              this.homeAwayText = (response.GETEVENTDETAILS[0]["ishometeam"]) ? 'Home' : 'Away';
              if (response.GETEVENTDETAILS[0]["washout"] == "1") {
                this.gameDismissed = "washout";
                $(".radio-game-dismissed").each(function () {
                  if ($(this).val() == "washout") $(this).attr("checked", "checked");
                  $('.radio').find('.Washout').addClass('HighLight')
                })
              }
              else if (response.GETEVENTDETAILS[0]["forfeit"] == "1") {
                this.gameDismissed = "forfeit";
                $(".radio-game-dismissed").each(function () {
                  if ($(this).val() == "forfeit") $(this).attr("checked", "checked");
                  $('.radio').find('.forfeit').addClass('HighLight')
                })
              }
              else {
                this.gameDismissed = "";
              }
            }
            resolve(true);
          }, error => {
            resolve(false);
          });
      })
    }

    SinglePlayersAttdStates(confirm, attended, reason, AttendyPersonId, event) {
      if((this.FunctionAccess.user_adminLevel == 4)){
        event.preventDefault();
        return
      }
      if(this.PersonData.ISPARENT && confirm == 'N' && this.PersonData.PERSON_ID != AttendyPersonId && this.attendanceReason.length && $(event.target).val() != this.attendanceReason){
        this.gotoConfirmAttendance();
        return;
      }
      var reasondeclined = '';
      var reasondeclined_by_coach = '';
      let unsetAttendance = '0';
  
      if($(event.target).val() == this.attendanceReason){
        unsetAttendance = '1';
      }
  
      if (this.FunctionAccess.user_adminLevel == 4) {
        if (confirm == 'Y') {
          confirm = 'YES';
          attended = 1;
        }
        else if (confirm == 'N') {
          confirm = 'NO';
          attended = 0;
        }
        reasondeclined = reason;
      }
      else if (this.FunctionAccess.user_adminLevel != 4) {
        if (confirm == 'Y') {
          confirm = 'YES';
          attended = 1;
        }
        else if (confirm == 'N') {
          confirm = 'NO';
          attended = 0;
        }
        reasondeclined_by_coach = reason
      }
      /* let loader = this.loadingCtrl.create({});
      loader.present(); */
  
      let loginData4 = new HttpParams()
        .set('event_id', this.UpcomingSingleEvent.event_id)
        .set('personId', AttendyPersonId)
        .set('attended', attended)
        .set('confirmed', confirm)
        .set('reasondeclined', reasondeclined.trim())
        .set('reasondeclined_by_coach', reasondeclined_by_coach.trim())
        .set('unsetAttendance', unsetAttendance)
        .set('state_time', '')
        .set('selectedTeam', this.PersonData.SELECTEDTEAM);
  
      this.http.post(this.global.APIURL + "events/saveSinglePlayersAttdStates", loginData4,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {  
          if (data.SUCCESS) {
            if(unsetAttendance == '0'){
              this.attendanceReason = reason;
            }else{
              this.attendanceReason = '';
              $(event.target).prop('checked', false);
            }
            //loader.dismiss();
            if (this.FunctionAccess.user_adminLevel == 4) {
              this.logger.DashboardPlayerReason('PlayerAttendReasonSelect', { pram: Date.now() });  
            }
            else if (this.FunctionAccess.user_adminLevel != 4) {
              this.logger.CoachArrowAttd_Mark('CoachArrowAttd_Mark', { pram: Date.now() });
            }
            this.vibration.vibrate(300);
            // this.navCtrl.push('EventHomeNewPage');
            this.navCtrl.pop();
            this.presentToast('Status Updated')
          }
        }, error => {
          //loader.dismiss();
        });  
    }

    gotoConfirmAttendance(){
      let val = this.PersonData;
      val.event_id = this.event_id;
      val.attendInfo = this.playerDetails[0];
      val.attendInfo.person_id = this.playerDetails[0].child_person_id;
      val.attendInfo.parent_id = this.PersonData.PERSON_ID;
      val.attendInfo.attendanceReason = $('.attendence:checked').val();
      let Modal = this.modalCtrl.create('EventAttendanceConfirmPage', {personDetails:JSON.stringify(val)});
      Modal.present();
      //this.navCtrl.pop();
      Modal.onDidDismiss(data=>{
        if(typeof data != 'undefined'){
          this.attendanceReason = data;
        }
        if(this.attendanceReason != ''){
          $('.attendence[value="'+ this.attendanceReason +'"]').prop('checked', true);
        }else{
          $('.attendence').prop('checked', false);
        }
      });
    }

    backArrow(){
      if(this.navParams.get('deeplink')){
        this.app.getRootNav().getActiveChildNav().select(1);
      }else{
        this.navCtrl.pop();
      }
    }

    tryAgain(){
      // this.loadDefaultData();
    }
}
