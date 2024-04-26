
import { Component,ViewChild } from '@angular/core';
import {
  IonicPage, NavController, NavParams, LoadingController, Events, ModalController, Platform,App,
  AlertController,
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
  selector: 'transport-dashboard',
  templateUrl: 'transport-dashboard.html',
})
@Directive({
  selector: '[longPress]'
})


export class TransportDashboardPage {
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
  NotGoingColor: any = '#B04AAC';
  NoResponseColor: any = '#F59044';
  AttdnColor: any = '#fff';
  PlayerAttending: any;
  reason_options_list: any = [];
  Attendance: any = false;
  FunctionAccess: any;
  filterState: any = 0;
  filterButton: any='';
  notifyFlag:any;
  BorrowTagFlag:any=0;
  BackButton:any=false;
  groundAdress:any='';
  groundState:any='';
  latitude:any='';
  longitude='';
  isParent:boolean = false;
  showEvent:boolean=false;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,
    public loadingCtrl: LoadingController, private storage: Storage, private events: Events,
    public global: GlobalProvider, public modalCtrl: ModalController,public app:App,private launchNavigator: LaunchNavigator,
    public logger: EventLoggerProvider,public plt: Platform, public gFn: GlobalFunctionsProvider, private calendar: Calendar, private Alert: AlertController,public global_api:GlobalApiProvider ) {
    
    this.gFn.showMenuIcon()
    this.PhotoApiUrl = this.global.PROFILEIMAGEURL;
    $('.tabs .tab-button[aria-selected=true]:nth-child(4) .tab-button-icon').toggle()
    // $('.tabs .tab-button[aria-selected=true]:nth-child(4) .tab-button-icon').css({'mask-image': '',
    // 'height': '',
    // 'color': '#dedede'})

  }


  goToChooseTeamsPage(){
    this.navCtrl.push('ChooseTeamProfilePage');
  }

  ionViewDidLoad() {
    // $('.tabs .tab-button[aria-selected=true]:nth-child(1)').attr('aria-selected','false')
    $('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected','true')
    $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({'mask-image': 'url(../assets/images/menu/home.svg)',
    'height':'22px',
    'color': '#dedede'})
    // $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': 'url(../assets/images/menu/events-blue.svg)',
    // 'height': '36px',
    // 'color': '#43B7CC'})
    
    this.storage.get('FunctionAccess').then((val) => {
      this.FunctionAccess = val;
      console.log(this.FunctionAccess)
    })
    this.storage.get('BackButton').then((val) => {
      this.BackButton= val;
    })
    if (this.navParams.get('EventDetails_eventId')) {
      this.UpcomingSingleEvent = this.navParams.get('EventDetails_eventId');
      this.storage.set('UpcomingSingleEvent',JSON.stringify(this.UpcomingSingleEvent));
      // console.log(this.UpcomingSingleEvent)
    }
    else {
      this.storage.get('UpcomingSingleEvent').then((val) => {
        this.UpcomingSingleEvent = JSON.parse(val)
        // console.log(val)
      })

    }

    let loader = this.loadingCtrl.create({});
    loader.present();

    this.getPersonDetail().then((z) => {
      if (z) {
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
      }
    });
  }
  ionViewDidLeave(){
    console.log('jj')
    if(!this.showEvent){
      console.log(';ll')
      // this.navCtrl.pop()
      $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({'mask-image': '',
      'height':'',
      'color': ''})
      // $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': '',
      // 'height': '',
      // 'color': ''})
      $('.tab-button-icon').closest('.tabs .tab-button[aria-selected=true]:nth-child(1) .activated').css({'mask-image': '',
      'height':'',
      'color': ''})
      $('.tabs .tab-button[aria-selected=true]:nth-child(2)').attr('aria-selected','false')
    }
   
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
  gotoResults(){
    this.gFn.gotoResults()
    this.showEvent=true
  }
  gotoWelfare(){
    this.gFn.gotoWelfare()
    this.showEvent=true
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
          this.storage.set('EventDetails',this.arrDetail)
          for (let keys of this.arrDetail) {
            this.key = keys
            this.date = this.key.date.split('/')[0]
            this.groundAdress=this.key.ground_address;
            this.groundState=this.key.ground_state;
            this.longitude=this.key.geoloc_longitude;
            this.latitude=this.key.geoloc_latitude;
            

          }
          resolve(true);
        }, error => {
        });
    })
  }

  getPersonDetail() {
    return new Promise((resolve) => {

      this.storage.get('loggedInUserData').then((val) => {
        this.PersonData = val;
        if(val.ISPARENT && val.PERSON_ID != val.PARENT_ID){
          this.isParent = true;
        }
        // console.log('loggedInUserData', this.PersonData)

        let loginData = new HttpParams()
          .set('person_id', this.PersonData.PERSON_ID);

        this.http.post(this.global.APIURL + "users/getUserInfo", loginData)
          .subscribe((data: any) => {


            let loggedInUserData = this.events.publish('json:query', data.GETUSERINFO);
            this.client_id = loggedInUserData[0][0].CLIENT_ID_FK;
            this.selectedTeam = (loggedInUserData[0][0].CLUB_DIVISION_ID_FK);
            resolve(true);

          }, error => {
          });

      });
    })
  }

  eventState(eventVal, event) {
    let loader = this.loadingCtrl.create({});
    loader.present().then(() => {
      if (this.filterButton == eventVal) {
        this.filterState = 0;
        this.filterButton = ''
        this.notifyFlag='';
        loader.dismiss()

      }
      else {
        this.filterButton = eventVal
        this.filterState = 1;
      }

      this.combinedPlayersArray = [];
      this.combinedBorrowedPlayersArray = [];
      if (eventVal == 'Going' && this.filterState == 1) {
        this.notifyFlag=0
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
        this.notifyFlag=3
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
        this.notifyFlag=1
        this.DupeventAttendsec[0] = this.eventAttend[1]
        this.DupeventAttendsec[3] = this.DupeventAttendsec[2] = this.DupeventAttendsec[1] = []
        this.DupEventAttendSecBorrowed[0] = this.BorrowedPlayerPresent[1]
        this.DupEventAttendSecBorrowed[3] = this.DupEventAttendSecBorrowed[2] = this.DupEventAttendSecBorrowed[1] = []

        $(event.target).closest('.radial-progressbar').find('.NotGoing').removeClass('inactive');
        $(event.target).closest('.radial-progressbar').find('.MayBe').addClass('inactive');
        $(event.target).closest('.radial-progressbar').find('.Going').addClass('inactive');
        $(event.target).closest('.radial-progressbar').find('.NoResponse').addClass('inactive');
        this.NotGoingColor = '#B04AAC';
        this.NoResponseColor = this.MaybeColor = this.GoingColor = '#404C62';
        loader.dismiss()
      }
      else if (eventVal == 'No response' && this.filterState == 1) {
        this.notifyFlag=2
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

    });

  }
  SinglePlayersAttdStates(confirm, attended, reason, AttendyPersonId, event) {
    var reasondeclined = '';
    var reasondeclined_by_coach = '';

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

    let target = event.target;
    let loginData4 = new HttpParams()
      .set('event_id', this.UpcomingSingleEvent.event_id)
      .set('personId', AttendyPersonId)
      .set('attended', attended)
      .set('confirmed', confirm)
      .set('reasondeclined', reasondeclined)
      .set('reasondeclined_by_coach', reasondeclined_by_coach)
      .set('state_time', '')
      .set('selectedTeam', this.PersonData.SELECTEDTEAM);

    this.http.post(this.global.APIURL + "events/saveSinglePlayersAttdStates", loginData4,{headers:this.global_api.getHeader()})
      .subscribe((data: any) => {
        // firebase event

        if (data.SUCCESS) {
          if(this.FunctionAccess.user_adminLevel==4){
            this.logger.DashboardPlayerReason('PlayerAttendReasonSelect',{ pram: Date.now() })

          }
          else if(this.FunctionAccess.user_adminLevel!=4){
            this.logger.CoachArrowAttd_Mark('CoachArrowAttd_Mark',{ pram: Date.now() })
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

  hideAttendanceList(event){
    let target = event.target;
    if (!$(target).hasClass('collapsed-arrow') && $('ul.dropdown-menu.card-dropdown:visible').length) {
      $('.collapsed-arrow').removeClass('ArrowDark').addClass('ArrowLight');
      $('ul.dropdown-menu.card-dropdown').hide();
      this.Arrowflag = false;
    }
  }

  goToTimesheet(){
    this.navCtrl.push('TimesheetPage')
    this.showEvent=true
  }
  borrow_player() {
    this.navCtrl.push('BorrowedPlayerPage',{UpcomingSingleEvent:JSON.stringify(this.UpcomingSingleEvent)})
    this.showEvent=true
  }
  notify_player() {
    this.navCtrl.push('NotifyPlayersPage',{notifyFlag:this.notifyFlag,
      UpcomingSingleEvent:JSON.stringify(this.UpcomingSingleEvent)})
      this.showEvent=true
  }
  PlayerQuestion(event){
    this.showEvent=true
    var Data=Object.keys(this.PersonData).reduce((c, k) => (c[k.toLowerCase()] = this.PersonData[k], c), {})

    this.navCtrl.push('PlayerQuestionPage',{Player_detail:Data})

  }
  gotoGroupMessage() {
    this.showEvent=true
    /*let GroupMessageModal = this.modalCtrl.create('EventGroupMessagePage', { Array: this.DupeventAttendLen });
    GroupMessageModal.onDidDismiss(data => {
    });
    GroupMessageModal.present();*/
    this.navCtrl.push('EventGroupSendMessagePage',{notifyFlag:this.notifyFlag});
  }
  gotoSessionPlan() {
    this.navCtrl.push('EventSessionPlanPage')
  }
  gotoInjuredList() {
    this.showEvent=true
    if (this.FunctionAccess.event_Injury == 'self') {
      this.navCtrl.push('InjuryIncidentReportPage', { 'injured_person_id': this.PersonData.PERSON_ID });
    } else {
      this.navCtrl.push('InjuredListPage');
    }
  }

  AllPlayersLoad() {
    return new Promise((resolve) => {
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
      let PlayersData = new HttpParams()
        .set('event_id', this.UpcomingSingleEvent.event_id)
        .set('client_id', this.UpcomingSingleEvent.client_id)//this.PersonData.CLIENT_ID
        .set('selectedTeam', selectedTeam)//this.PersonData.SELECTEDTEAM
        .set('personId', this.PersonData.PERSON_ID)
      this.http.post(this.global.APIURL + "players/AllLoadPlayersAttendance", PlayersData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          this.eventAttend = data.DATA;
          this.BorrowedPlayerPresent = data.DATA_BORROWED;
          this.ArrangePlayers();
          resolve(true);
        }, error => {

        });
    })
  }
  ArrangePlayers() {
    this.DupeventAttendLen = [];
    this.DupEventAttendSecBorrowed = [];
    this.percentArray = [];
    this.combinedPlayersArray = [];
    this.combinedBorrowedPlayersArray = [];
    var key, key1;
    for (key in this.eventAttend) {
      this.DupeventAttendsec[key] = []

        for (key1 in this.eventAttend[key]) {
          if (this.eventAttend[key][key1].person_id == this.PersonData.PERSON_ID) {
            this.DupeventAttendsec[0].unshift(this.eventAttend[key][key1])
          }
          else {
            this.DupeventAttendsec[key].push(this.eventAttend[key][key1])
          }
          if(key < 3){
            this.combinedPlayersArray.push(this.eventAttend[key][key1]);
          }

        }
        this.DupeventAttendLen[key] = this.DupeventAttendsec[key].length;


    }

    this.combinedPlayersArray.sort(function(a, b){
      var x = a.first_name.toLowerCase() + ' ' + a.last_name.toLowerCase();
      var y = b.first_name.toLowerCase() + ' ' + b.last_name.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
    
    //Player Name on the top of tthe List
    for (var key3 in this.combinedPlayersArray){
      if(this.combinedPlayersArray[key3].person_id==this.PersonData.PERSON_ID){
        this.combinedPlayersArray.unshift(this.combinedPlayersArray[key3])
        this.combinedPlayersArray.splice(parseInt(key3)+1,1)

      }
    }
     //console.log(this.BorrowedPlayerPresent)

    for (key in this.BorrowedPlayerPresent) {
      this.DupEventAttendSecBorrowed[key] = []
      for (key1 in this.BorrowedPlayerPresent[key]) {
        if (this.BorrowedPlayerPresent[key][key1].person_id == this.PersonData.PERSON_ID) {
          this.DupEventAttendSecBorrowed[0].unshift(this.BorrowedPlayerPresent[key][key1]);
        }
        else {
          this.DupEventAttendSecBorrowed[key].push(this.BorrowedPlayerPresent[key][key1]);
        }
        if(key < 3){
          this.combinedBorrowedPlayersArray.push(this.BorrowedPlayerPresent[key][key1]);
        }
        this.BorrowTagFlag=1

      }
      this.DupeventAttendLen[key] += this.DupEventAttendSecBorrowed[key].length;
    }
    
    this.combinedBorrowedPlayersArray.sort(function(a, b){
      var x = a.first_name.toLowerCase() + ' ' + a.last_name.toLowerCase();
      var y = b.first_name.toLowerCase() + ' ' + b.last_name.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });

    var totalPlayerCount = this.eventAttend[0].length + this.eventAttend[1].length + this.eventAttend[2].length ;
    totalPlayerCount += this.BorrowedPlayerPresent[0].length + this.BorrowedPlayerPresent[1].length + this.BorrowedPlayerPresent[2].length ;
    this.DupeventAttendLen.push(totalPlayerCount);

    for (key in this.eventAttend) {
      this.percentArray.push((this.DupeventAttendLen[key] / totalPlayerCount) * 100);
      this.DupeventAttendLen[key] = this.zero_pad(this.DupeventAttendLen[key]);
    }

  }

  resetColors(event) {
    this.notifyFlag=''
    this.GoingColor = '#68E048';
    this.MaybeColor = '#2BBFF0';
    this.NotGoingColor = '#B04AAC';
    this.NoResponseColor = '#F59044';
    $('.radial-progressbar').find('.NoResponse,.MayBe,.NotGoing,.Going').removeClass('inactive');
    this.ArrangePlayers();
    this.hideAttendanceList(event);
  }
  backArrow() {
    
    this.app.getRootNav().getActiveChildNav().select(1).then(()=>{
      $('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected','true')
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
    this.logger.CoachRadioButtonAttd_Mark('CoachRadioButtonAttd_Mark',{ pram: Date.now() })
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

  addEventToCalendar(){
    let calOptions = this.calendar.getCalendarOptions(); // grab the defaults
    let endDate = new Date(this.arrDetail[0].date_ended);
    endDate.setSeconds(endDate.getSeconds() + 10);
    let address = [];
    let addressName = ' ';
    if(this.arrDetail[0].ground_address.length > 0){
      address.push(this.arrDetail[0].ground_address);
    }
    if(this.arrDetail[0].ground_state.length > 0){
      address.push(this.arrDetail[0].ground_state);
    }
    
    if(address.length > 0){
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
        this.presentAlert('Error', 'Problem in adding event to calendar.');
      }
    );
  }

  presentAlert(Title,SubTitle) {
    let alert = this.Alert.create({
      title: Title,
      subTitle: SubTitle,
      buttons: ['Dismiss']
    });
    alert.present(alert);
  }


  openMap(address, state,latitude,longitude){
    if(latitude!=0 && longitude!=0){
      this.launchNavigator.navigate(latitude + ', ' + longitude);
    }
    else if(address || state){
      this.launchNavigator.navigate(address + ', ' + state);
    }
    else{
      this.gFn.presentToast('Location undefined');
    }

  }

}

