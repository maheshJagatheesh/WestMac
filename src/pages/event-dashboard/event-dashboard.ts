import { Component, ViewChild } from '@angular/core';
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
import { GlobalApiProvider } from '../../providers/global-api/global-api';

@IonicPage()
@Component({
  selector: 'page-event-dashboard',
  templateUrl: 'event-dashboard.html',
})
@Directive({
  selector: '[longPress]'
})


export class EventDashboardPage {
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
  surveyAccess: any = 0;

  //Result
  players: any = [];
  private loader: any;
  event_id: string;
  clientTimeZone: string;
  event_type_id: string;
  reportTextRowOpened: boolean = false;
  scoreHome: string = "0";
  scoreAway: string = "0";
  scoreHomePrev: string = "0";
  scoreAwayPrev: string = "0";
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
  showTransport:boolean=false;
  show_tab:any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, private storage: Storage, private events: Events, public keyboard: Keyboard,
    public global: GlobalProvider, public modalCtrl: ModalController, public app: App, private launchNavigator: LaunchNavigator,
    public logger: EventLoggerProvider, public plt: Platform, public gFn: GlobalFunctionsProvider, private calendar: Calendar, private Alert: AlertController,public global_api:GlobalApiProvider) 
    
    {

    this.gFn.showMenuIcon()
    this.PhotoApiUrl = this.global.PROFILEIMAGEURL;
    gFn.hideFormAccessoryBar(true);

    // $('.tabs .tab-button[aria-selected=true]:nth-child(4) .tab-button-icon').toggle()
    // $('.tabs .tab-button[aria-selected=true]:nth-child(4) .tab-button-icon').css({'mask-image': '',
    // 'height': '',
    // 'color': '#dedede'})

    if(this.navParams.get('show_tab'))
    {
      this.show_tab = this.navParams.get('show_tab');
    }

    this.storage.get('FunctionAccess').then((val) => {
      this.FunctionAccess = val;
      this.storage.get('loggedInUserData').then((val) => {
        this.PersonData = val;
        this.coachDetails[0] = val;

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
          var active_tab = navParams.get('ActiveTab') ? navParams.get('ActiveTab') : 'Attendance';

          this.segments = active_tab
          this.AutoSegments = { value: this.segments }
          this.segmentChanged(this.AutoSegments)

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
            var active_tab = navParams.get('ActiveTab') ? navParams.get('ActiveTab') : 'Attendance';

            this.segments = active_tab
            this.AutoSegments = { value: this.segments }
            this.segmentChanged(this.AutoSegments)

          })

        }
      })

    })

  }
  segmentChanged(event) {
    if (event.value == 'Attendance') {
      // this.segments='Attendance'
      let loader = this.loadingCtrl.create({});
      loader.present();

      // this.getPersonDetail().then((z) => {
      //   if (z) {
      this.getAttendingDetails();
      this.getEventDetails().then((x) => {
        if (x) {
          this.AllPlayersLoad().then((y) => {
            if (y) {
              loader.dismiss();

            }
          });
        }
      });
      //   }
      // });
    }
    else if (event.value == 'Welfare') {
      // this.segments='Welfare'
      let loader = this.loadingCtrl.create();
      loader.present();
      // this.getPersonDetail().then((y) => {
      this.getEventDetails().then((y) => {
        if (y) {
          this.displayFunction().then((x) => {
            if (x) {
              setTimeout(() => {
                loader.dismiss();
              }, 100);

            }
          });
        }
      })
    }
    // else if(event.value=='Welfare'){
    //   this.segments='Welfare'
    // }

    else if (event.value == 'Result') {
      // this.segments='Result'
      this.loadDataFromAPIs()
      this.loader = this.loadingCtrl.create({});
      this.loader.present();
    }


  }


  goToChooseTeamsPage() {
    this.navCtrl.push('ChooseTeamProfilePage');
  }
  highlightMenuIcon() {
    // $('.tabs .tab-button[aria-selected=true]:nth-child(1)').attr('aria-selected','false')
    $('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected', 'true')
    $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({
      'mask-image': 'url(../assets/images/menu/home.svg)',
      'height': '22px',
      'color': '#dedede'
    })
    // $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': 'url(../assets/images/menu/events-blue.svg)',
    // 'height': '36px',
    // 'color': '#43B7CC'})
  }

  unhighlightMenuIcon() {
    if (!this.showEvent) {
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
      $('.tabs .tab-button[aria-selected=true]:nth-child(2)').attr('aria-selected', 'false')
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
        .set('client_id', this.PersonData.CLIENT_ID)
        .set('person_id', this.PersonData.PERSON_ID)
        .set('first_name', this.PersonData.FIRST_NAME)
        .set('last_name', this.PersonData.LAST_NAME)
        .set('selectedTeam', this.PersonData.SELECTEDTEAM);

      this.http.post(this.global.APIURL + "players/getPlayerAttending", Data,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          this.reason_options_list.push(data.GETPLAYERATTENDING[0].reason_options_list);
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

  goToSurvey()
  {
    this.gFn.goToSurvey(this.surveyId, this.event_id, this.PersonData.CLIENT_ID, this.PersonData.SELECTEDTEAM, this.PersonData.PERSON_ID);
    this.showEvent = false;
  }  

  isSurvey:boolean = false;
  surveyId:number=0;
  getEventDetails() {
    return new Promise((resolve) => {
      let loginData = new HttpParams()
        .set('event_id', this.UpcomingSingleEvent.event_id)
        .set('event_type_id', this.UpcomingSingleEvent.event_type_id)
        .set('clientTimeZone', this.PersonData.CLIENTTIMEZONE)
        .set('selectedTeam', this.PersonData.SELECTEDTEAM)
        .set('client_id', this.PersonData.CLIENT_ID)
        .set('person_id', this.PersonData.PERSON_ID);

      this.http.post(this.global.APIURL + "events/getEventDetails", loginData,{headers:this.global_api.getHeader()})
        .subscribe((response: any) => {
          this.arrDetail = response.GETEVENTDETAILS;
          this.isSurvey = this.arrDetail[0].isSurvey == 1;
          if(typeof this.arrDetail[0].surveyId !== "undefined"){
            this.surveyId = this.arrDetail[0].surveyId;
          }
          this.surveyAccess = this.arrDetail[0].access;
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
          if(this.arrDetail[0].is_transport_enabled == 1 && this.FunctionAccess.event_Transport==1){
            this.showTransport=true
          }
         
          if (response.GETEVENTDETAILS.length > 0) {
            this.scoreIsUpdated = response.GETEVENTDETAILS[0]["isUpdated"];
            this.scoreHome = this.getPrefixedNumber(response.GETEVENTDETAILS[0]["homescore"]);
            this.scoreAway = this.getPrefixedNumber(response.GETEVENTDETAILS[0]["awayscore"]);
            this.scoreHomePrev = this.scoreHome;
            this.scoreAwayPrev = this.scoreAway;
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
        });
    })
  }

  // getPersonDetail() {
  //   return new Promise((resolve) => {

  //     this.storage.get('loggedInUserData').then((val) => {
  //       this.PersonData = val;
  //       this.coachDetails[0] = val;
  //       if(val.ISPARENT && val.PERSON_ID != val.PARENT_ID){
  //         this.isParent = true;
  //       }

  //       let loginData = new HttpParams()
  //         .set('person_id', this.PersonData.PERSON_ID);

  //       this.http.post(this.global.APIURL + "users/getUserInfo", loginData)
  //         .subscribe((data: any) => {


  //           let loggedInUserData = this.events.publish('json:query', data.GETUSERINFO);
  //           this.client_id = loggedInUserData[0][0].CLIENT_ID_FK;
  //           this.selectedTeam = (loggedInUserData[0][0].CLUB_DIVISION_ID_FK);
  //           resolve(true);

  //         }, error => {
  //         });

  //     });
  //   })
  // }

  eventState(eventVal, event) {
    let loader = this.loadingCtrl.create({});
    loader.present().then(() => {
      if (this.filterButton == eventVal) {
        this.filterState = 0;
        this.filterButton = ''
        this.notifyFlag = '';
        loader.dismiss()

      }
      else {
        this.filterButton = eventVal
        this.filterState = 1;
      }

      this.combinedPlayersArray = [];
      this.combinedBorrowedPlayersArray = [];
      if (eventVal == 'Going' && this.filterState == 1) {
        this.notifyFlag = 0
        this.DupeventAttendsec[0] = this.eventAttend[0]
        this.DupeventAttendsec[1] = this.DupeventAttendsec[2] = this.DupeventAttendsec[3] = []
        this.DupEventAttendSecBorrowed[0] = this.BorrowedPlayerPresent[0]
        this.DupEventAttendSecBorrowed[1] = this.DupEventAttendSecBorrowed[2] = this.DupEventAttendSecBorrowed[3] = []

        $(event.target).closest('.radial-progressbar').find('.Going').removeClass('inactive');
        $(event.target).closest('.radial-progressbar').find('.MayBe').addClass('inactive');
        $(event.target).closest('.radial-progressbar').find('.NotGoing').addClass('inactive');
        $(event.target).closest('.radial-progressbar').find('.NoResponse').addClass('inactive');
        this.GoingColor = '#68E048';
        this.NoResponseColor = this.NotGoingColor = this.MaybeColor = '#404C62';

        loader.dismiss()
      }
      else if (eventVal == 'Maybe' && this.filterState == 1) {
        this.notifyFlag = 3
        this.DupeventAttendsec[0] = this.eventAttend[3]
        this.DupeventAttendsec[3] = this.DupeventAttendsec[2] = this.DupeventAttendsec[1] = []
        this.DupEventAttendSecBorrowed[0] = this.BorrowedPlayerPresent[3]
        this.DupEventAttendSecBorrowed[3] = this.DupEventAttendSecBorrowed[2] = this.DupEventAttendSecBorrowed[1] = []

        $(event.target).closest('.radial-progressbar').find('.MayBe').removeClass('inactive');
        $(event.target).closest('.radial-progressbar').find('.Going').addClass('inactive');
        $(event.target).closest('.radial-progressbar').find('.NotGoing').addClass('inactive');
        $(event.target).closest('.radial-progressbar').find('.NoResponse').addClass('inactive');
        this.MaybeColor = '#2BBFF0';
        this.NoResponseColor = this.NotGoingColor = this.GoingColor = '#404C62';

        loader.dismiss()
      }
      else if (eventVal == 'Not going' && this.filterState == 1) {
        this.notifyFlag = 1
        this.DupeventAttendsec[0] = this.eventAttend[1]
        this.DupeventAttendsec[3] = this.DupeventAttendsec[2] = this.DupeventAttendsec[1] = []
        this.DupEventAttendSecBorrowed[0] = this.BorrowedPlayerPresent[1]
        this.DupEventAttendSecBorrowed[3] = this.DupEventAttendSecBorrowed[2] = this.DupEventAttendSecBorrowed[1] = []

        $(event.target).closest('.radial-progressbar').find('.NotGoing').removeClass('inactive');
        $(event.target).closest('.radial-progressbar').find('.MayBe').addClass('inactive');
        $(event.target).closest('.radial-progressbar').find('.Going').addClass('inactive');
        $(event.target).closest('.radial-progressbar').find('.NoResponse').addClass('inactive');
        this.NotGoingColor = '#D80000';
        this.NoResponseColor = this.MaybeColor = this.GoingColor = '#404C62';
        loader.dismiss()
      }
      else if (eventVal == 'No response' && this.filterState == 1) {
        this.notifyFlag = 2
        this.DupeventAttendsec[0] = this.eventAttend[2]
        this.DupeventAttendsec[1] = this.DupeventAttendsec[2] = this.DupeventAttendsec[3] = []
        this.DupEventAttendSecBorrowed[0] = this.BorrowedPlayerPresent[2]
        this.DupEventAttendSecBorrowed[1] = this.DupEventAttendSecBorrowed[2] = this.DupEventAttendSecBorrowed[3] = []

        $(event.target).closest('.radial-progressbar').find('.NoResponse').removeClass('inactive');
        $(event.target).closest('.radial-progressbar').find('.MayBe').addClass('inactive');
        $(event.target).closest('.radial-progressbar').find('.NotGoing').addClass('inactive');
        $(event.target).closest('.radial-progressbar').find('.Going').addClass('inactive');
        this.NoResponseColor = '#F59044';
        this.NotGoingColor = this.MaybeColor = this.GoingColor = '#404C62';
        loader.dismiss()
      }
      this.CheckEmptyBorrowedPlayer();
    });

    
    //this.CheckEmptyBorrowedPlayer(eventVal);
  }
  CheckEmptyBorrowedPlayer(){
    this.EmptyBorrowPlayer =
      (
        this.filterState == 1 && 
        this.notifyFlag == 3 && 
        this.DupEventAttendSecBorrowed.length > 0 && 
        this.DupEventAttendSecBorrowed[0].length == 0
      ) ||
      (
        this.DupEventAttendSecBorrowed.length > 0 &&
        this.DupEventAttendSecBorrowed[0].length == 0 &&
        this.DupEventAttendSecBorrowed[1].length == 0 &&
        this.DupEventAttendSecBorrowed[2].length == 0 &&
        this.DupEventAttendSecBorrowed[3].length == 0
      );
  }
  SinglePlayersAttdStates(confirm, attended, reason, AttendyPersonId, event) {
    let reasondeclined = '';
    let reasondeclined_by_coach = '';
    let unsetAttendance = '0';

    if($(event.target).hasClass('SelectedReason')){
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
    let loader = this.loadingCtrl.create({});
    loader.present();

    let loginData4 = new HttpParams()
      .set('event_id', this.UpcomingSingleEvent.event_id)
      .set('personId', AttendyPersonId)
      .set('attended', attended)
      .set('confirmed', confirm)
      .set('reasondeclined', reasondeclined)
      .set('reasondeclined_by_coach', reasondeclined_by_coach)
      .set('unsetAttendance', unsetAttendance)
      .set('state_time', '')
      .set('selectedTeam', this.PersonData.SELECTEDTEAM);

    this.http.post(this.global.APIURL + "events/saveSinglePlayersAttdStates", loginData4,{headers:this.global_api.getHeader()})
      .subscribe((data: any) => {
        // firebase event

        if (data.SUCCESS) {
          if (this.FunctionAccess.user_adminLevel == 4) {
            this.logger.DashboardPlayerReason('PlayerAttendReasonSelect', { pram: Date.now() })

          }
          else if (this.FunctionAccess.user_adminLevel != 4) {
            this.logger.CoachArrowAttd_Mark('CoachArrowAttd_Mark', { pram: Date.now() })
          }
        }

        this.resetColors(event);
        this.AllPlayersLoad().then((y) => {
          if (y) {
            loader.dismiss();
          }
        });
      }, error => {
      });

  }

  ArrowFunctionality(event) {
    if (this.Arrowflag == false) {
      let target = event.target;
      $(target).closest('.row').find('ul').show();
      if (this.FunctionAccess.user_adminLevel == 4) {
        $(target).closest('.row').find('ul').addClass('Div-Arrow');
      }
      $(target).closest('.row').find('.collapsed-arrow').removeClass('ArrowLight');
      $(target).closest('.row').find('.collapsed-arrow').addClass('ArrowDark');

      this.Arrowflag = true;
    }
    else if (this.Arrowflag == true) {
      let target = event.target;
      $(target).closest('.row').find('ul').hide();
      $(target).closest('.row').find('.collapsed-arrow').removeClass('ArrowDark');
      $(target).closest('.row').find('.collapsed-arrow').addClass('ArrowLight');
      this.Arrowflag = false;
    }
  }

  hideAttendanceList(event) {
    let target = event.target;
    if (!$(target).hasClass('collapsed-arrow') && $('ul.dropdown-menu.card-dropdown:visible').length) {
      $('.collapsed-arrow').removeClass('ArrowDark').addClass('ArrowLight');
      $('ul.dropdown-menu.card-dropdown').hide();
      this.Arrowflag = false;
    }
  }

  goToTimesheet() {
    this.navCtrl.push('TimesheetPage')
    this.showEvent = true
  }
  borrow_player() {
    this.navCtrl.push('BorrowedPlayerPage', { UpcomingSingleEvent: JSON.stringify(this.UpcomingSingleEvent) })
    this.showEvent = true
  }
  notify_player() {
    this.navCtrl.push('NotifyPlayersPage', {
      notifyFlag: this.notifyFlag,
      UpcomingSingleEvent: JSON.stringify(this.UpcomingSingleEvent)
    })
    this.showEvent = true
  }
  WelfarePlayerQuestion(event) {
    this.showEvent = true
    var Data = Object.keys(this.PersonData).reduce((c, k) => (c[k.toLowerCase()] = this.PersonData[k], c), {})

    this.navCtrl.push('PlayerQuestionPage', { Player_detail: Data })

  }
  gotoGroupMessage() {
    this.showEvent = true
    /*let GroupMessageModal = this.modalCtrl.create('EventGroupMessagePage', { Array: this.DupeventAttendLen });
    GroupMessageModal.onDidDismiss(data => {
    });
    GroupMessageModal.present();*/
    this.navCtrl.push('EventGroupSendMessagePage', { notifyFlag: this.notifyFlag });
  }
  gotoSessionPlan() {
    this.navCtrl.push('EventSessionPlanPage')
  }
  gotoInjuredList() {
    this.showEvent = true
    if (this.FunctionAccess.event_Injury == 'self') {
      this.navCtrl.push('InjuryIncidentReportPage', { 'injured_person_id': this.PersonData.PERSON_ID });
    } else {
      this.navCtrl.push('InjuredListPage');
    }
  }
  // gotoReqAttendance(){

  //   this.navCtrl.push('AlertDashboardPage')

  // }
  AllPlayersLoad() {
    return new Promise((resolve) => {
      let PlayersData = new HttpParams()
        .set('event_id', this.UpcomingSingleEvent.event_id)
        .set('client_id', this.PersonData.CLIENT_ID)//this.PersonData.CLIENT_ID
        .set('selectedTeam', this.PersonData.SELECTEDTEAM)//this.PersonData.SELECTEDTEAM
        .set('personId', this.PersonData.PERSON_ID)
      this.http.post(this.global.APIURL + "players/AllLoadPlayersAttendance", PlayersData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          this.eventAttend = data.DATA;
          this.BorrowedPlayerPresent = data.DATA_BORROWED;
          this.ArrangePlayers();
          this.CheckEmptyBorrowedPlayer();
          resolve(true);
        }, error => {

        });
    })
  }

  temp_array:any = []
  ArrangePlayers() {
    this.DupeventAttendLen = [];
    this.DupEventAttendSecBorrowed = [];
    this.percentArray = [];
    this.combinedPlayersArray = [];
    this.combinedBorrowedPlayersArray = [];
    this.temp_array = []
    var key, key1;


    for (key in this.eventAttend) {
      
      this.DupeventAttendsec[key] = []
      this.temp_array[key] = []

      for (key1 in this.eventAttend[key]) {

      if (this.eventAttend[key][key1].person_id == this.PersonData.PERSON_ID) {
        //this.eventAttend[key][key1].attendanceStatus = 1 //just for testing

        /* if(this.FunctionAccess.view_other_players == 'yes')
        { */
          this.DupeventAttendsec[key].push(this.eventAttend[key][key1])
        /* }
        if(this.FunctionAccess.view_other_players == 'no')
        {
          this.DupeventAttendsec[0].unshift(this.eventAttend[key][key1]);
        } */
        
        
    
        
        if (this.eventAttend[key][key1].attendanceStatus in [0, 1]) {
          this.SymbolAlert = true
        }
      }
      else {
        
        if(this.FunctionAccess.user_adminLevel !=4)
        {
          this.DupeventAttendsec[key].push(this.eventAttend[key][key1])
        }
        
        
      }

      if(this.FunctionAccess.user_adminLevel !=4)
      {
        if (key < 3) {
          this.combinedPlayersArray.push(this.eventAttend[key][key1]);
        }
      }
     
        

      }
      this.DupeventAttendLen[key] = this.DupeventAttendsec[key].length;


    }

    this.combinedPlayersArray.sort(function (a, b) {
      var x = a.first_name.toLowerCase() + ' ' + a.last_name.toLowerCase();
      var y = b.first_name.toLowerCase() + ' ' + b.last_name.toLowerCase();
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    });

    //Player Name on the top of tthe List
    for (var key3 in this.combinedPlayersArray) {
      if (this.combinedPlayersArray[key3].person_id == this.PersonData.PERSON_ID) {
        this.combinedPlayersArray.unshift(this.combinedPlayersArray[key3])
        this.combinedPlayersArray.splice(parseInt(key3) + 1, 1)

      }
    }


    if(this.FunctionAccess.user_adminLevel !=4)
    {
      for (key in this.BorrowedPlayerPresent) {
        this.DupEventAttendSecBorrowed[key] = []
        for (key1 in this.BorrowedPlayerPresent[key]) {
          if (this.BorrowedPlayerPresent[key][key1].person_id == this.PersonData.PERSON_ID) {
            this.DupEventAttendSecBorrowed[0].unshift(this.BorrowedPlayerPresent[key][key1]);
          }
          else {
            this.DupEventAttendSecBorrowed[key].push(this.BorrowedPlayerPresent[key][key1]);
          }
          if (key < 3) {
            this.combinedBorrowedPlayersArray.push(this.BorrowedPlayerPresent[key][key1]);
          }
          this.BorrowTagFlag = 1
  
        }
        this.DupeventAttendLen[key] += this.DupEventAttendSecBorrowed[key].length;
      }
  
      this.combinedBorrowedPlayersArray.sort(function (a, b) {
        var x = a.first_name.toLowerCase() + ' ' + a.last_name.toLowerCase();
        var y = b.first_name.toLowerCase() + ' ' + b.last_name.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
      });
    }
    

    var totalPlayerCount = this.eventAttend[0].length + this.eventAttend[1].length + this.eventAttend[2].length;
    totalPlayerCount += this.BorrowedPlayerPresent[0].length + this.BorrowedPlayerPresent[1].length + this.BorrowedPlayerPresent[2].length;
    this.DupeventAttendLen.push(totalPlayerCount);

    for (key in this.eventAttend) {
      this.percentArray.push((this.DupeventAttendLen[key] / totalPlayerCount) * 100);
      this.DupeventAttendLen[key] = this.zero_pad(this.DupeventAttendLen[key]);
    }
    
  }

  resetColors(event) {
    this.notifyFlag = ''
    this.GoingColor = '#68E048';
    this.MaybeColor = '#2BBFF0';
    this.NotGoingColor = '#D80000';
    this.NoResponseColor = '#F59044';
    $('.radial-progressbar').find('.NoResponse,.MayBe,.NotGoing,.Going').removeClass('inactive');
    this.ArrangePlayers();
    this.hideAttendanceList(event);
    
    this.CheckEmptyBorrowedPlayer();
  }

  gotoHome(){
    this.app.getRootNav().getActiveChildNav().select(1);
  }


  backArrow() {

    this.app.getRootNav().getActiveChildNav().select(1).then(() => {
      $('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected', 'true')
    });
  }
  zero_pad(num) {
    let s = num + "";
    while (s.length < 2) s = "0" + s;
    return s;
  }


  AttendanceMark(event, Attendance, AttendyPersonId) {
    var attended;
    if ((Attendance == '' || Attendance == null || Attendance == 0) && this.FunctionAccess.user_adminLevel != 4) {
      attended = 1;
      this.AttendanceReport(attended, AttendyPersonId)
      $(event.target).removeClass('AbsentCheckbox1')
      $(event.target).addClass('PresentCheckbox1')
    }
    else if ((Attendance == '' || Attendance == null || Attendance == 1) && this.FunctionAccess.user_adminLevel != 4) {
      attended = 0;
      $(event.target).removeClass('PresentCheckbox1')
      $(event.target).addClass('AbsentCheckbox1')
      this.AttendanceReport(attended, AttendyPersonId)
    }
    this.logger.CoachRadioButtonAttd_Mark('CoachRadioButtonAttd_Mark', { pram: Date.now() })
  }
  AttendanceReport(attended, AttendyPersonId) {

    let loginData4 = new HttpParams()
      .set('event_id', this.UpcomingSingleEvent.event_id)
      .set('personId', AttendyPersonId)
      .set('attended', attended)
      .set('confirmed', '-1')
      .set('reasondeclined', '-1')
      .set('reasondeclined_by_coach', '-1')
      .set('state_time', '')
      .set('selectedTeam', this.PersonData.SELECTEDTEAM);

    this.http.post(this.global.APIURL + "events/saveSinglePlayersAttdStates", loginData4,{headers:this.global_api.getHeader()})
      .subscribe((data: any) => {
        if (data.SUCCESS) {
          this.AllPlayersLoad()
        }

      }, error => {
      });
  }

  addEventToCalendar() {
    let calOptions = this.calendar.getCalendarOptions(); // grab the defaults
    let endDate = new Date(this.arrDetail[0].date_ended);
    endDate.setSeconds(endDate.getSeconds() + 10);
    let address = [];
    let addressName = ' ';
    if (this.arrDetail[0].ground_address.length > 0) {
      address.push(this.arrDetail[0].ground_address);
    }
    if (this.arrDetail[0].ground_state.length > 0) {
      address.push(this.arrDetail[0].ground_state);
    }

    if (address.length > 0) {
      addressName = address.join(',');
    }

    if (Object.prototype.toString.call(endDate) === "[object Date]") {
      if (isNaN(endDate.getTime())) {
        // date is not valid
        endDate = new Date(this.arrDetail[0].date_started);
        endDate.setSeconds(endDate.getSeconds() + 10);
      }
    } else {
      // not a date
      endDate = new Date(this.arrDetail[0].date_started);
      endDate.setSeconds(endDate.getSeconds() + 10);
    }

    this.calendar.createEventWithOptions(
      this.arrDetail[0].name,
      addressName,
      this.arrDetail[0].event_notes,
      new Date(this.arrDetail[0].date_started),
      endDate,
      calOptions).then(
        (msg) => {
          this.presentAlert('Success', 'Event added to calendar.');
        },
        (err) => {
          this.presentAlert('Error', 'Problem in adding event to calendar. Please check the app permission settings.');
        }
      );
  }
  DisplaySeverityDetails(playerAilments) {
    this.ShowSeverityPage = true
    if (playerAilments) {
      let SeverityModal = this.modalCtrl.create('SeverityDetailsModalPage', { playerAilments: playerAilments });
      SeverityModal.present();

    }
    else {
      this.presentToast('No Details found')
    }
  }
  MedicineInformation(data) {
    this.medicalInfo = true;
    let MedicineInfo = this.modalCtrl.create('MedicineInfoPage', { values: data });
    MedicineInfo.present();
    MedicineInfo.onDidDismiss(() => {
      this.medicalInfo = false;
    })
  }

  presentAlert(Title, SubTitle) {
    let alert = this.Alert.create({
      title: Title,
      subTitle: SubTitle,
      buttons: ['Dismiss']
    });
    alert.present(alert);
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present()
  }

  openMap(address, state, latitude, longitude) {
    if (latitude != 0 && longitude != 0) {
      this.launchNavigator.navigate(latitude + ', ' + longitude);
    }
    else if (address || state) {
      this.launchNavigator.navigate(address + ', ' + state);
    }
    else {
      this.gFn.presentToast('Location undefined');
    }

  }
  gotoTransport(){
    if(this.FunctionAccess.user_adminLevel == 4){
      this.navCtrl.push('TransportListPage');
      // this.app.getActiveNav().push('TransportListPage')
    }else{
      // this.app.getRootNav().push('RollcallsPage')
      // this.app.getActiveNav().push('RollcallsPage')
      this.navCtrl.push('RollcallsPage');
    }
  }

  //Welfare
  displayFunction() {
    return new Promise((resolve) => {
      let loginData4 = new HttpParams()
        .set('event_id', this.UpcomingSingleEvent.event_id)
        .set('clientSport', 'team')
        .set('client_id', this.PersonData.CLIENT_ID)
        .set('club_id', this.PersonData.CLUB_ID)
        .set('adminLevel', this.PersonData.ADMINLEVEL)
        .set('selectedTeam', this.PersonData.SELECTEDTEAM);

      this.http.post(this.global.APIURL + "events/getPlayersEvent", loginData4,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          this.WelfarePeopleDetail = data.GETPLAYERSEVENT
          resolve(true);

        }, error => {
        });
    });

  }

  PlayerQuestion(Player_detail, event) {
    if (!this.medicalInfo) {
      if (this.ShowSeverityPage == false) {
        if (this.PersonData.PERSON_ID == Player_detail.person_id || this.FunctionAccess.event_Welfare == 'yes') {
          $(event.target).closest('.event-card').find('.well').addClass('active');
          this.navCtrl.push('PlayerQuestionPage', { Player_detail: Player_detail }).then((x) => {
            $(event.target).closest('.event-card').find('.well').removeClass('active');
          });

        }
      }
      else {
        this.ShowSeverityPage = false
      }
    }



  }

  //Result
  loadDataFromAPIs() {
    this.getEventDetails().then((x) => {
      if (x) {
        this.loadPlayersVotedState().then((y) => {

          this.loader.dismiss();
        });
      }
      else {
        this.loader.dismiss();
      }
    });
  }

  loadPlayersVotedState() {
    return new Promise((resolve) => {

      let data = new HttpParams()
        .set('event_id', this.UpcomingSingleEvent.event_id)
        .set('team_id', this.PersonData.SELECTEDTEAM)
        .set('client_id', this.PersonData.CLIENT_ID)
        .set('selectedTeam', this.PersonData.SELECTEDTEAM)
        .set('club_id', this.PersonData.CLUB_ID)
        .set('voter_id', this.PersonData.PERSON_ID);

      this.http.post<any>(this.global.APIURL + 'votes/getVotingPlayersEvent', data,{headers:this.global_api.getHeader()})
        .subscribe(response => {
          if (response.SUCCESS) {
            let count = 0;
            for (let i = 0; i < response.GETVOTINGPLAYERSEVENT.length; i++) {
              if ((this.FunctionAccess && this.FunctionAccess.voting_for_player == 'yes') &&
                (this.coachDetails[0].PERSON_ID == response.GETVOTINGPLAYERSEVENT[i].person_id)) {
                this.coachDetails[0].voted = response.GETVOTINGPLAYERSEVENT[i].voted;
                continue;
              }
              this.players[count] = response.GETVOTINGPLAYERSEVENT[i];
              if (this.players[count].vote1 == this.players[count].person_id) {
                this.vote1 = this.players[count].vote1;
              } else if (this.players[count].vote2 == this.players[count].person_id) {
                this.vote2 = this.players[count].vote2;
              } else if (this.players[count].vote3 == this.players[count].person_id) {
                this.vote3 = this.players[count].vote3;
              }
              count++;
            }
            resolve(true);
          }
        }, error => {

        });
    });
  }

  // getEventDetails() {
  // 	return new Promise((resolve) => {
  // 		let data = new HttpParams()
  // 			.set('event_id', this.event_id)
  // 			.set('event_type_id', this.event_type_id)
  // 			.set('clientTimeZone', this.clientTimeZone)
  // 			.set('selectedTeam', this.loggedInUserData.SELECTEDTEAM)
  // 			.set('client_id', this.loggedInUserData.CLIENT_ID);

  // 		this.http.post<any>(this.global.APIURL + 'events/getEventDetails', data)
  // 			.subscribe(response => {
  // 				if (response.SUCCESS) {
  // 					this.arrDetail = response.GETEVENTDETAILS;
  // 					this.groundAdress = this.arrDetail[0].ground_address;
  // 					this.groundState = this.arrDetail[0].ground_state;
  // 					this.longitude = this.arrDetail[0].geoloc_longitude;
  // 					this.latitude = this.arrDetail[0].geoloc_latitude;
  // 					console.log(this.groundAdress, this.groundState, this.longitude, this.latitude)
  // 					for (let keys of this.arrDetail) {
  // 						this.key = keys
  // 						this.date = this.key.date.split('/')[0]
  // 					}

  // 					if (response.GETEVENTDETAILS.length > 0) {
  // 						this.scoreHome = this.getPrefixedNumber(response.GETEVENTDETAILS[0]["homescore"]);
  // 						this.scoreAway = this.getPrefixedNumber(response.GETEVENTDETAILS[0]["awayscore"]);
  // 						this.reportText = (response.GETEVENTDETAILS[0]["ishometeam"]) ? response.GETEVENTDETAILS[0]["report_home"] : response.GETEVENTDETAILS[0]["report_away"];
  // 						this.homeAwayText = (response.GETEVENTDETAILS[0]["ishometeam"]) ? 'Home' : 'Away';
  // 						if (response.GETEVENTDETAILS[0]["washout"] == "1") {
  // 							this.gameDismissed = "washout";
  // 							$(".radio-game-dismissed").each(function () {
  // 								if ($(this).val() == "washout") $(this).attr("checked", "checked");
  // 								$('.radio').find('.Washout').addClass('HighLight')
  // 							})
  // 						}
  // 						else if (response.GETEVENTDETAILS[0]["forfeit"] == "1") {
  // 							this.gameDismissed = "forfeit";
  // 							$(".radio-game-dismissed").each(function () {
  // 								if ($(this).val() == "forfeit") $(this).attr("checked", "checked");
  // 								$('.radio').find('.forfeit').addClass('HighLight')
  // 							})
  // 						}
  // 						else {
  // 							this.gameDismissed = "";
  // 						}
  // 					}
  // 					resolve(true);
  // 				}
  // 				else { }
  // 			}, error => {

  // 			});
  // 	});
  // }

  saveGameScore() {
    this.scoreHome = this.getPrefixedNumber(this.scoreHome);
    this.scoreAway = this.getPrefixedNumber(this.scoreAway);
    this.scoreHomePrev = this.scoreHome;
    this.scoreAwayPrev = this.scoreAway;
    let loader = this.loadingCtrl.create({});
    loader.present();
    let data = new HttpParams()
      .set('event_id', this.event_id)
      .set('homescore', this.scoreHome)
      .set('awayscore', this.scoreAway);

    this.http.post<any>(this.global.APIURL + 'events/saveGameScore', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        loader.dismiss();
        if (response.SUCCESS) {
          this.scoreIsUpdated = response.ISUPDATED;
          //this.presentToast("Game score saved.");
        } else {
          //this.presentToast("Sorry we couldn't save data");
        }
      }, error => {
        loader.dismiss();
        //this.presentToast("Sorry we couldn't save data");
      });
  }

  saveGameReport(isReport, isScoreSave = false) {
    if (typeof this.PersonData !== "undefined") {
      if (!isReport || (isReport || this.reportText.trim().length)) {
        let washout = "0";
        let forfeit = "0";
        if (this.gameDismissed == "washout") {
          washout = "1";
        }
        else if (this.gameDismissed == "forfeit") {
          forfeit = "1";
        }
        let data = new HttpParams()
          .set('event_id', this.event_id)
          .set('reportHome', (this.arrDetail[0].ishometeam) ? this.reportText : '')
          .set('reportAway', (!this.arrDetail[0].ishometeam) ? this.reportText : '')
          .set('person_id', this.PersonData.PERSON_ID)
          .set('washout', washout)
          .set('forfeit', forfeit);

        this.http.post<any>(this.global.APIURL + 'events/saveGameScoreReportByEvent', data,{headers:this.global_api.getHeader()})
          .subscribe(response => {
            $(".btn-sm-black").removeClass("active");
            if (response.SUCCESS) {
              this.reportTextRowOpened = false;
              let msg = "Game data saved.";
              if (isReport && !this.reportText) {
                msg ="Game score saved.";
                this.presentToast(msg);
              }
              if(this.reportText && !isReport)
              {
                msg = "Game report saved.";
                this.presentToast(msg);
              }

              if(this.reportText && isReport)
              {
                msg ="Game score and report saved.";
                this.presentToast(msg);
              }
            }
            else {
              this.presentToast("Sorry we couldn't save report");
            }
          }, error => {
            this.presentToast("Sorry we couldn't save report");
          });
      } else {
        $(".btn-sm-black").removeClass("active");
        this.presentToast("Sorry couldn't save blank report");
      }
    }
  }

  gameDismissedChange(ev) {
    if ((ev.target.value == "washout" && this.gameDismissed == "washout") ||
      (ev.target.value == "forfeit" && this.gameDismissed == "forfeit")) {
      this.gameDismissed = "";
    } else {
      $('.radio').find('.sub-title').removeClass('HighLight')
      if (ev.target.value == "washout") {
        $(ev.target).closest('.radio').find('.Washout').addClass('HighLight')
      }
      else {
        $(ev.target).closest('.radio').find('.Forfeit').addClass('HighLight')
      }
      this.gameDismissed = ev.target.value;
    }

    this.saveGameReport(false);
  }

  saveVote(ev, person_id, ratings) {
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
    let data = new HttpParams()
      .set('event_id', this.event_id)
      .set('team_id', this.PersonData.SELECTEDTEAM)
      .set('voter_id', this.PersonData.PERSON_ID)
      .set('v3', this.vote3)
      .set('v2', this.vote2)
      .set('v1', this.vote1)
      .set('vote_baf_1', '')
      .set('vote_baf_2', '')
      .set('vote_baf_3', '')
      .set('season_id', this.PersonData.SEASON_ID);

    this.http.post<any>(this.global.APIURL + 'votes/saveVotingPlayer', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        loader.dismiss();
        if (response.SUCCESS) {
          this.reportTextRowOpened = false;
          this.presentToast("Voting records saved.");
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

  getPrefixedNumber(num) {
    if (typeof num == "undefined") { num = "0"; }
    else if (num == "") { num = "0"; }
    else {
      num = num.toString().replace(/^[0]+/, '');
      if (num == "") num = "0";
    }
    return num;
  }

  prefixNumber(ev) {
    let num = this.getPrefixedNumber(ev.target.value);
    setTimeout(function () {
      if (num != ev.target.value) {
        ev.target.value = num;
      }
    }, 50);

  }

  voteForPlayer(playerID, playerDetails) {
    if (!this.medicalInfo && this.FunctionAccess.voting_for_player == 'yes') {
      if (this.ShowSeverityPage == false) {
        if (this.FunctionAccess.voting_for_player == 'yes') {
          this.activePlayer = playerID;
          setTimeout(() => {
            playerDetails = Object.keys(playerDetails).reduce((c, k) => (c[k.toLowerCase()] = playerDetails[k], c), {});
            this.navCtrl.push('VoteForPlayerPage', { playerDetails: playerDetails, event_id: this.event_id }).then(() => {
              $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({
                'mask-image': 'url(../assets/images/menu/home.svg)',
                'height': '22px',
                'color': '#dedede'
              })
              this.gFn.hideMenuIcon()
            });
            this.activePlayer = '';
          }, 300);
        }
      }
      else {
        this.ShowSeverityPage = false
      }
    }

  }
  mBottom: string = "";
  keyboardCheck() {

    if (this.mBottom == "") {
      this.mBottom = $(".scroll-content").css("margin-bottom");
    }
    if (this.keyboard.isOpen()) {
      $(".scroll-content").css("margin-bottom", "0");
      this.gFn.hideMenuIcon();
    }
    else {
      $(".scroll-content").css("margin-bottom", '56px');
      this.gFn.showMenuIcon();
    }
  }
  inputFocus() {
    this.keyboardCheck()
  }

  inputBlur() {
    this.keyboardCheck()
  }

  saveGameScoreAndReport(){
    $(".btn-sm-black").addClass("active");
    if(this.scoreIsUpdated == 0 || this.reportText.trim().length){
      this.saveGameScore();
    }
    this.saveGameReport(true, (this.scoreIsUpdated == 0)?true:false);
  }

}
