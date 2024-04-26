import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, LoadingController, Events, ModalController, ToastController, Platform, App,
  AlertController, Keyboard
} from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import 'rxjs/add/operator/timeout';
import { EventLoggerProvider } from '../../providers/event-logger/event-logger';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { Calendar } from '@ionic-native/calendar/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { log } from 'console';
import { Network } from '@ionic-native/network/ngx';

@IonicPage()
@Component({
  selector: 'page-event-home-new',
  templateUrl: 'event-home-new.html',
})
export class EventHomeNewPage {
  loggedInUserData: any;
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
  CreateNote: any = 'Create note';
  offlineConnection: any = false;

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
  showTransport: boolean = false;
  isLoaded: boolean = false;
  isSurvey: boolean = false;
  surveyId: number = 0;
  SPORTNAME: any;
  division_name: any;
  new_date: any;
  seasonId: any;
  cardTiles: any;
  backColor: any = '#FBFACD';
  SSODetails: any;
  ground_name: any;
  postCode: any;
  groundSubAdress: any = '';
  eventstorage:any=''
  offlinestatus:any=''
  newSingleEvent:any=''

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private events: Events,
    public keyboard: Keyboard,
    public global: GlobalProvider,
    public modalCtrl: ModalController,
    public app: App,
    private launchNavigator: LaunchNavigator,
    public logger: EventLoggerProvider,
    public plt: Platform,
    public gFn: GlobalFunctionsProvider,
    private calendar: Calendar,
    private Alert: AlertController,
    private global_api: GlobalApiProvider,
    private network: Network,

    private iab: InAppBrowser) {

    plt.ready().then(() => {
      plt.registerBackButtonAction(() => {
        this.backArrow();
      });
    });

    this.storage.get("mobileAssets").then(
      res => {
        if (res && res.Theme && res.Theme) {
          this.cardTiles = res.Theme;
        }
      });

    this.storage.get('SSODetails').then((val) => {
      this.SSODetails = val;
    });
   

    // this.storage.get('offline').then((val) => {
     
    //   console.log("offlinestatuss",val)

    //   if(val===1)
    //   {
    //     this.datasynching()
    //   }
    // });

    this.storage.get('FunctionAccess').then((val) => {
      this.FunctionAccess = val;
      
      this.storage.get('loggedInUserData').then((val) => {
        this.loggedInUserData = val;
        this.coachDetails[0] = val;
        if (this.navParams.get('EventDetails_eventId')) {
          this.UpcomingSingleEvent = this.navParams.get('EventDetails_eventId');
          this.newSingleEvent = this.navParams.get('EventDetails_eventId');
          console.log("this.UpcomingSingleEvent : ",this.UpcomingSingleEvent);
          this.SPORTNAME = this.UpcomingSingleEvent.SPORTNAME;
          this.division_name = this.UpcomingSingleEvent.DIVISION_NAME;
          this.new_date = this.UpcomingSingleEvent.DATE_STARTED;
          if(this.UpcomingSingleEvent)
          {
            this.UpcomingSingleEvent = Object.keys(this.UpcomingSingleEvent).reduce((c, k) => (c[k.toLowerCase()] = this.UpcomingSingleEvent[k], c), {});
            this.storage.set('UpcomingSingleEvent', JSON.stringify(this.UpcomingSingleEvent));
          }
         
          this.event_id = this.UpcomingSingleEvent.event_id;
          this.selectedTeam = this.loggedInUserData?.SELECTEDTEAM;
          if (this.UpcomingSingleEvent.event_type_id == 2 && this.UpcomingSingleEvent.teamid) {
            this.selectedTeam = this.UpcomingSingleEvent.teamid;
          } else if (this.UpcomingSingleEvent.event_type_id == 1) {
            if (this.UpcomingSingleEvent.homeclubid == this.loggedInUserData?.CLUB_ID) {
              this.selectedTeam = this.UpcomingSingleEvent.hometeam;
            } else {
              this.selectedTeam = this.UpcomingSingleEvent.awayteam;
            }
          }
          
          if ((this.loggedInUserData && this.loggedInUserData.ISPARENT) && (this.FunctionAccess && this.FunctionAccess.user_adminLevel == 4)) {            
            this.FunctionAccess.event_Injury = 'no';
            this.FunctionAccess.event_Result = 'no';
          }
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
          //this.segmentChanged(this.AutoSegments)

          if (this.network.type === "none" || navigator.onLine === false) {
            this.checkNetwork();
          }else{
            this.loadEventDetails();
            //this.datasynching()
          }

          
         
         
        }
        else {
          this.storage.get('UpcomingSingleEvent').then((val) => {
            if (val != null) {
              this.UpcomingSingleEvent = JSON.parse(val);
              this.event_id = this.UpcomingSingleEvent.event_id;
              this.selectedTeam = this.loggedInUserData.SELECTEDTEAM;
              if (this.UpcomingSingleEvent.event_type_id == 2 && this.UpcomingSingleEvent.teamid) {
                this.selectedTeam = this.UpcomingSingleEvent.teamid;
              } else if (this.UpcomingSingleEvent.event_type_id == 1) {
                if (this.UpcomingSingleEvent.homeclubid == this.loggedInUserData.CLUB_ID) {
                  this.selectedTeam = this.UpcomingSingleEvent.hometeam;
                } else {
                  this.selectedTeam = this.UpcomingSingleEvent.awayteam;
                }
              }
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
              //this.segmentChanged(this.AutoSegments)
              if (this.network.type === "none" || navigator.onLine === false) {
                this.checkNetwork();
              }else{
                this.loadEventDetails();
              }
    
             
            } else {
              this.isLoaded = true;
            }
          })

        }
      })

    })

    
  }
  async checkNetwork() {
    let eventid = this.UpcomingSingleEvent.event_id;
    let rsp =(await this.storage.get("arrDetail")) || []; 
    //this.arrDetail[0] = rsp[0]
    this.arrDetail[0] = rsp.filter(item => item.event_id === eventid);
     //this.homeAwayText = (response.GETEVENTDETAILS[0]["ishometeam"]) ? 'Home' : 'Away';
     this.seasonId =  this.arrDetail[0]["season_id"]
     this.isSurvey = this.arrDetail[0].isSurvey == 1;
     if (typeof this.arrDetail[0].surveyId !== "undefined") {
       this.surveyId = this.arrDetail[0].surveyId;
     }
     this.storage.set('EventDetails', this.arrDetail)
     console.log("this.event_id",this.arrDetail[0])

     for (let keys of this.arrDetail[0]) {
       this.key = keys

       this.date = this.key.date.split('/')[0]
       this.groundAdress = this.key.ground_address;
       this.groundSubAdress = this.key.ground_suburb;
       this.groundState = this.key.ground_state;
       this.longitude = this.key.geoloc_longitude;
       this.latitude = this.key.geoloc_latitude;
       this.ground_name = this.key.ground_name;
       this.postCode = this.key.event_postcode;
       if (this.key.is_transport_enabled == 1 && this.FunctionAccess.event_Transport == 1) {
         this.showTransport = true
       }
       break;
     }
 if (this.arrDetail.length > 0) {
 
   let response = this.arrDetail[0]
   console.log("this.key",response)

       this.scoreIsUpdated = response["isUpdated"];
       this.reportText = (response["ishometeam"]) ? response["report_home"] : response["report_away"];
       this.homeAwayText = (response["ishometeam"]) ? 'Home' : 'Away';
       if (response["washout"] == "1") {
         this.gameDismissed = "washout";
         $(".radio-game-dismissed").each(function () {
           if ($(this).val() == "washout") $(this).attr("checked", "checked");
           $('.radio').find('.Washout').addClass('HighLight')
         })
       }
       else if (response["forfeit"] == "1") {
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

     this.storage.get('FunctionAccess').then((val) => {
      this.FunctionAccess = val;
    })
    console.log("FunctionAccess",this.FunctionAccess)
 
  }
 

  ionViewDidLoad() {
    this.offlinecheck()
  }

  ionViewDidEnter() {
    $('.scroll-content').css('margin-bottom', '56px');
  }

   offlinecheck() {
      // this.offlinestatus = this.storage.get('offline');
      

  }
  async datasynching() {
    this.eventstorage = (await this.storage.get("attendanceevents")) || [];
    
    console.log("this.eventstorage", this.eventstorage)
    if (this.eventstorage && this.eventstorage.length>0) {
      this.presentToast("Your data is Syncing please wait");
      for (let i = 0; i < this.eventstorage.length; i++) {
       
      //   if( this.eventstorage[i].bulkattendpayload){
      //     console.log("bulk attendanec")
      //     this.BulkPayload(this.eventstorage[i].bulkattendpayload)  
      //   }
         
      
      // if( this.eventstorage[i].singlepayload&&this.eventstorage[i].singlepayload.length>0)
      // {
      //   console.log("single attendance")
      //   this.SinglePayload(this.eventstorage[i].singlepayload)
      // }

      if(this.eventstorage[i].bulkattendpayload &&  this.eventstorage[i].singlepayload&&this.eventstorage[i].singlepayload.length>0)
      {
        console.log("bulk and single")
        this.BulkPayload(this.eventstorage[i].bulkattendpayload,this.eventstorage[i].singlepayload)  
      }

      if(!this.eventstorage[i].bulkattendpayload && this.eventstorage[i].singlepayload&&this.eventstorage[i].singlepayload.length>0)
      {
        console.log("single")
        this.SinglePayload(this.eventstorage[i].singlepayload)
      }

      if(this.eventstorage[i].rollstatuspayload)
      {
        console.log("rollstatuspayload")
        this.Rollstuatus(this.eventstorage[i].rollstatuspayload)
      }
       
   }
   this.storage.set("offline",0)
         
    }
  
  }
  Rollstuatus(rollstatuspayload: any) {

    console.log("payloadddd_eventhomenew",rollstatuspayload)
   

    return new Promise((resolve) => {
      let Data = new HttpParams()
        .set("eventId", rollstatuspayload.eventId)
        .set(
          "teamId",
          rollstatuspayload.teamId
        )
        .set("clubId", rollstatuspayload.clubId)
        .set("adminId", rollstatuspayload.adminId)
        .set("rollStatus", rollstatuspayload.rollStatus);     
      this.http
        .post(this.global.APIURL_CORE + "attendance/updateroll", Data, {
          headers: this.global_api.getHeader(),
        })
        .subscribe(
          (data: any) => {
            // this.reason_options_list.push(data.GETPLAYERATTENDING[0].reason_options_list);
            this.storage.set("offline",0)
            console.log("result for change", data);
            this.presentToast("Roll status updated");
            this.clearStorage("","rollstatus");
            resolve(true);
          },
          (error) => {}
        );
    });

  }
  SinglePayload(singlepayload: any) {
    console.log("fulldata",singlepayload)

    for (let i = 0; i < singlepayload.length; i++) {

      console.log("newdartaaa",singlepayload[i])
       let loginData4 = new HttpParams()
      .set("event_id", singlepayload[i].event_id)
      .set("personId", singlepayload[i].personId)
      .set("attended", singlepayload[i].attended)
      .set("confirmed", singlepayload[i].confirmed)
      .set("reasondeclined", singlepayload[i].reasondeclined)
      .set("reasondeclined_by_coach", singlepayload[i].reasondeclined_by_coach)
      .set("state_time", singlepayload[i].state_time)
      .set("selectedTeam", singlepayload[i].selectedTeam);

    this.http
      .post(
        this.global.APIURL + "events/saveSinglePlayersAttdStates",
        loginData4,
        { headers: this.global_api.getHeader() }
      )
      .subscribe(
        (data: any) => {
          if (data.SUCCESS) {
            this.storage.set("offline",0)
            this.presentToast("Single player attendance updated");
            this.clearStorage("single","");
          }
        },
        (error) => {}
      );
    }
  }
  async clearStorage(payload,rollstatus) {
   
    let offlinedata: any = (await this.storage.get("attendanceevents")) || [];

    if (offlinedata && offlinedata.length>0) {
      for (let i = 0; i < offlinedata.length; i++) {
        let event = offlinedata[i];
        // Find the matching eventid

        if(payload)
        {
          event.bulkattendpayload = ""   
          event.singlepayload = []  
        }
        if(rollstatus)
        {
          event.rollstatuspayload =""
        }

      }

      this.storage.set("attendanceevents", offlinedata);
    }

    
    
  }
  BulkPayload(bulkattendpayload: any,singlepayload:any) { 
    return new Promise((resolve) => {
      let Data = new HttpParams()
        .set("eventid", bulkattendpayload.eventid)
        .set(
          "teamid",
          bulkattendpayload.teamid
        )
        .set("attended", bulkattendpayload.attended);
        
      this.http
        .post(this.global.APIURL_CORE + "attendance/attendancebulk", Data, {
          headers: this.global_api.getHeader(),
        })
        .subscribe(
          (data: any) => {
            // this.reason_options_list.push(data.GETPLAYERATTENDING[0].reason_options_list);
             if(data.SUCCESS)
             {
              this.presentToast("Bulk attendance updated successfully");
              this.storage.set("offline",0)
              if(singlepayload&&singlepayload.length>0)
              {
                this.SinglePayload(singlepayload)
              }
             
             }
           
            resolve(true);
           
          },
          (error) => {}
        );
    });
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "top",
    });
    toast.present();
  }

  loadEventDetails() {
    /* let loader = this.loadingCtrl.create({});
    loader.present(); */
    this.global_api.getFunctionAccess(this.loggedInUserData?.PERSON_ID, this.UpcomingSingleEvent.client_id, this.selectedTeam).then((x: any) => {
      this.storage.get('FunctionAccess').then((val) => {
        console.log("Function access : ",this.FunctionAccess);
        
        this.FunctionAccess = val;
        this.offlineConnection = false;
        this.isLoaded = false;
        if ((this.loggedInUserData && this.loggedInUserData.ISPARENT) && (this.FunctionAccess && this.FunctionAccess.user_adminLevel == 4)) {
          this.FunctionAccess.event_Injury = 'no';
          this.FunctionAccess.event_Result = 'no';
        }
        if (this.navParams.get('EventDetails_eventId')) {
          this.getEventDetails().then((y) => {
            if (y) {
              //loader.dismiss();
              this.isLoaded = true;
            } else {
              //loader.dismiss();
              this.isLoaded = true;
              //this.gFn.presentAlert('Error','Data not found or Connection issue.');
              this.offlineConnection = true;
            }
          });
        } else {
          this.getNextEventDetails().then((x) => {
            if (x) {
              this.getEventDetails().then((y) => {
                if (y) {
                  //loader.dismiss();
                  this.isLoaded = true;
                } else {
                  //loader.dismiss();
                  this.isLoaded = true;
                  //this.gFn.presentAlert('Error','Data not found or Connection issue..');
                  this.offlineConnection = true;
                }
              });
            } else {
              //loader.dismiss();
              this.isLoaded = true;
              //this.gFn.presentAlert('Error','Data not found or Connection issue...');
              this.offlineConnection = true;
            }
          });
        }
      });
    });
  }

  getNextEventDetails() {
    return new Promise((resolve) => {
      let data = new HttpParams()
        .set('clientTimeZone', this.loggedInUserData?.CLIENTTIMEZONE)
        .set('selectedTeam', this.loggedInUserData?.SELECTEDTEAM)
        .set('person_id', this.loggedInUserData?.PERSON_ID)
        .set('SEASON_ID', this.loggedInUserData?.SEASON_ID)
        .set('nextEvent', '1')
        .set('filter', '1')
        .set('client_id', this.loggedInUserData.CLIENT_ID);
      this.http.post<any>(this.global.APIURL + 'events/getTeamEvents', data, { headers: this.global_api.getHeader() })
        .subscribe(response => {
          if (response.SUCCESS) {
            if (response.GETTEAMEVENTS != "") {
              this.UpcomingSingleEvent = response.GETTEAMEVENTS[0];
              this.storage.set('UpcomingSingleEvent', JSON.stringify(this.UpcomingSingleEvent));
              this.loggedInUserData['EVENT_ID'] = response.GETTEAMEVENTS[0].event_id;
              this.loggedInUserData['EVENT_TYPE_ID'] = response.GETTEAMEVENTS[0].event_type_id;
              this.storage.set('loggedInUserData', this.loggedInUserData);
            } else {
              this.loggedInUserData['EVENT_ID'] = "";
              this.loggedInUserData['EVENT_TYPE_ID'] = "";
              this.storage.set('loggedInUserData', this.loggedInUserData);
              //this.gFn.presentAlert('Upcoming Events','No upcoming events present');
            }
            resolve(true);
          } else {
            resolve(false);
          }
        }, error => {
          resolve(false);
        });
    })
  }

  getEventDetails() {
    return new Promise((resolve) => {
      let loginData = new HttpParams()
        .set('event_id', this.UpcomingSingleEvent?.event_id)
        .set('event_type_id', this.UpcomingSingleEvent?.event_type_id)
        .set('clientTimeZone', this.loggedInUserData?.CLIENTTIMEZONE)
        .set('selectedTeam', this.loggedInUserData?.SELECTEDTEAM)
        .set('person_id', this.loggedInUserData?.PERSON_ID)
        .set('client_id', this.UpcomingSingleEvent.client_id ? this.UpcomingSingleEvent.client_id : this.loggedInUserData.CLIENT_ID);

      this.http.post(this.global.APIURL + "events/getEventDetails", loginData, { headers: this.global_api.getHeader() })
        .subscribe((response: any) => {
          if (response.SUCCESS) {
            this.arrDetail = [];
            this.arrDetail[0] = response.GETEVENTDETAILS[0];
            this.setArrdetails(this.arrDetail)
            this.homeAwayText = (response.GETEVENTDETAILS[0]["ishometeam"]) ? 'Home' : 'Away';
            this.seasonId = response.GETEVENTDETAILS[0]["season_id"]
            this.isSurvey = this.arrDetail[0].isSurvey == 1;
            if (typeof this.arrDetail[0].surveyId !== "undefined") {
              this.surveyId = this.arrDetail[0].surveyId;
            }
            this.storage.set('EventDetails', this.arrDetail)
            for (let keys of this.arrDetail) {
              this.key = keys
              this.date = this.key.date.split('/')[0]
              this.groundAdress = this.key.ground_address;
              this.groundSubAdress = this.key.ground_suburb;
              this.groundState = this.key.ground_state;
              this.longitude = this.key.geoloc_longitude;
              this.latitude = this.key.geoloc_latitude;
              this.ground_name = this.key.ground_name;
              this.postCode = this.key.event_postcode;
              if (this.key.is_transport_enabled == 1 && this.FunctionAccess.event_Transport == 1) {
                this.showTransport = true
              }
              break;
            }

            if (response.GETEVENTDETAILS.length > 0) {
              this.scoreIsUpdated = response.GETEVENTDETAILS[0]["isUpdated"];
              /* this.scoreHome = this.getPrefixedNumber(response.GETEVENTDETAILS[0]["homescore"]);
              this.scoreAway = this.getPrefixedNumber(response.GETEVENTDETAILS[0]["awayscore"]); */
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
          }
          resolve(true);
        }, error => {
          resolve(false);
        });
    })
  }
  setArrdetails(arrDetail: any) {
   
    this.storage.get('arrDetail').then((events) => {   
      if (events) {
        // Check if event with same EVENT_ID already exists
        const existingEvent = events.find(event => event.event_id === arrDetail[0].event_id);
        if (!existingEvent) {
          // Event does not exist, add it
          events.push(arrDetail[0]);
          this.storage.set('arrDetail', events); // Save updated events back to storage
        }
      } else {
        // No events in storage, create new array with this event
        this.storage.set('arrDetail', [arrDetail[0]]);
      }
    });



  }

  openMap(address, state, latitude, longitude) {
    if (latitude != 0 && longitude != 0) {
      this.launchNavigator.navigate(latitude + ', ' + longitude);
    }
    else if (address || state) {
      let Actualaddress =  address + ', '+ this.groundSubAdress +', '  + state + ', ' + this.postCode;
      this.launchNavigator.navigate(Actualaddress);
    }
    else {
      this.gFn.presentToast('Location undefined');
    }
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
          this.gFn.presentAlert('Success', 'Event added to calendar.');
        },
        (err) => {
          this.gFn.presentAlert('Error', 'Problem in adding event to calendar. Please check the app permission settings.');
        }
      );
  }

  gotoInjuredList() {
    this.showEvent = true;
    if (typeof (this.SSODetails) != "undefined" && this.SSODetails != null && this.SSODetails.ISINJURYURLENABLED) {
      const browserRef = this.iab.create(this.SSODetails.INJURYURL, '_blank', 'clearcache=yes,clearsesioncache=yes');
    } else {
      if (this.FunctionAccess.event_Injury == 'self') {
        this.navCtrl.push('InjuryIncidentReportPage', { 'injured_person_id': this.loggedInUserData.PERSON_ID, 'season_id': this.seasonId });
      } else {
        this.navCtrl.push('InjuredListPage', { 'season_id': this.seasonId });
      }
    }
  }

  gotoGroupMessage() {
    this.showEvent = true
    /*let GroupMessageModal = this.modalCtrl.create('EventGroupMessagePage', { Array: this.DupeventAttendLen });
    GroupMessageModal.onDidDismiss(data => {
    });
    GroupMessageModal.present();*/
    this.navCtrl.push('EventGroupSendMessagePage', { notifyFlag: this.notifyFlag });
  }

  gotoTransport() {
    if (this.FunctionAccess.user_adminLevel == 4) {
      this.navCtrl.push('TransportListPage');
      // this.app.getActiveNav().push('TransportListPage')
    } else {
      // this.app.getRootNav().push('RollcallsPage')
      // this.app.getActiveNav().push('RollcallsPage')
      this.navCtrl.push('RollcallsPage');
    }
  }

  goToTimesheet() {
    this.navCtrl.push('TimesheetPage');
    this.showEvent = true;
  }

  borrow_player() {
    this.navCtrl.push('BorrowedPlayerPage', { UpcomingSingleEvent: JSON.stringify(this.UpcomingSingleEvent) })
    this.showEvent = true
  }

  gotoAttendance() {

    if (this.FunctionAccess && this.FunctionAccess.user_adminLevel == 4) {
      this.navCtrl.push('EventAttendancePage', { 'EventDetails_eventId': this.UpcomingSingleEvent,'originalevent':this.newSingleEvent });
    } else {
      this.navCtrl.push('EventDashboardNewPage', { 'EventDetails_eventId': this.UpcomingSingleEvent,'originalevent':this.newSingleEvent });
    }
   
  }

  WelfarePlayerQuestion() {
    this.showEvent = true;
    var Data = Object.keys(this.loggedInUserData).reduce((c, k) => (c[k.toLowerCase()] = this.loggedInUserData[k], c), {});
    this.navCtrl.push('PlayerQuestionPage', { Player_detail: Data });
  }

  gotoResults() {
    this.gFn.gotoResults()
    this.showEvent = true
  }

  // gotoWelfare() {
  //   this.gFn.gotoWelfare()
  //   this.showEvent = true
  // }

  backArrow() {
    this.navCtrl.pop();
  }

  gotoCreateNote() {
    if (this.UpcomingSingleEvent['event_notes'] == undefined) {
      this.UpcomingSingleEvent['event_notes'] = '';
    }
    if (this.loggedInUserData.adminLevel != 4 && (!this.loggedInUserData.ISPARENT || (this.loggedInUserData.ISPARENT && this.loggedInUserData.PERSON_ID == this.loggedInUserData.PARENT_ID))) {
      let modal = this.modalCtrl.create('CreateNodePage',
        { 'eventid': this.UpcomingSingleEvent['event_id'], 'event_notes': this.UpcomingSingleEvent['event_notes'] },
        { 'showBackdrop': true, 'enableBackdropDismiss': true }
      );
      modal.present();
      modal.onDidDismiss(data => {
        if (typeof data != 'undefined') {
          this.CreateNote = data.length ? data : 'Create note';
          this.UpcomingSingleEvent['event_notes'] = data;
        }
      })
    }
  }

  goToSurvey() {
    this.gFn.goToSurvey(this.surveyId, this.event_id, this.UpcomingSingleEvent.client_id, this.loggedInUserData.SELECTEDTEAM, this.loggedInUserData.PERSON_ID);
    this.showEvent = false;
  }

  gotoChat(groupid, grouptype, groupName, clientId) {
    const chatInfo = {
      from: 1,
      to: 10,
      person_id: this.loggedInUserData?.PERSON_ID,
      selectedTeam: this.loggedInUserData.SELECTEDTEAM,
      groupid: groupid,
      teamid: this.loggedInUserData.SELECTEDTEAM,
      grouptype: grouptype,
      flag: 1,
      userPhoto: "",
      groupName: groupName,
      accFirstName: this.loggedInUserData.FIRST_NAME,
      accLastName: this.loggedInUserData.LAST_NAME,
      clientId: clientId,
      groupContactId: ""
    };
    this.navCtrl.push('GroupChatViewPage', { data: chatInfo });
    //this.app.getRootNav().getActiveChildNav().select(3);
  }

  tryAgain() {
    this.loadEventDetails();
  }
  gotoWelfare() {
    this.gFn.gotoWelfare()
    this.showEvent = true
  }
}