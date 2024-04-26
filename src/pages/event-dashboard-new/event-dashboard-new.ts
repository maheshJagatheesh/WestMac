import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  Events,
  ModalController,
  ToastController,
  Platform,
  App,
  AlertController,
  Keyboard,
} from "ionic-angular";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { GlobalProvider } from "../../providers/global/global";
import { Directive, ElementRef } from "@angular/core";
import "rxjs/add/operator/timeout";
import { EventLoggerProvider } from "../../providers/event-logger/event-logger";
import { GlobalFunctionsProvider } from "../../providers/global-functions/global-functions";
import { TabsPage } from "../tabs/tabs";
import { Calendar } from "@ionic-native/calendar/ngx";
import {
  LaunchNavigator,
  LaunchNavigatorOptions,
} from "@ionic-native/launch-navigator/ngx";
import { Vibration } from "@ionic-native/vibration/ngx";
import { GlobalApiProvider } from "../../providers/global-api/global-api";
import {
  SecureStorage,
  SecureStorageObject,
} from "@ionic-native/secure-storage/ngx";
import { Network } from "@ionic-native/network/ngx";

/**
 * Generated class for the EventDashboardNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-event-dashboard-new",
  templateUrl: "event-dashboard-new.html",
})
@Directive({
  selector: "[longPress]",
})
export class EventDashboardNewPage {
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
  AttendyPersonId: any = "";
  BorrowedPlayerPresent: any;
  arrDetail: any = [];
  key: any;
  date: any;
  UpcomingSingleEvent: any;
  GoingColor: any = "#68E048";
  MaybeColor: any = "#2BBFF0";
  NotGoingColor: any = "#D80000";
  NoResponseColor: any = "#F59044";
  AttdnColor: any = "#fff";
  PlayerAttending: any;
  reason_options_list: any = [];
  Attendance: any = false;
  FunctionAccess: any;
  filterState: any = 0;
  filterButton: any = "";
  notifyFlag: any;
  BorrowTagFlag: any = 0;
  BackButton: any = false;
  SymbolAlert: any = false;
  groundAdress: any = "";
  groundState: any = "";
  latitude: any = "";
  longitude = "";
  homeAwayText: string = "";
  isParent: boolean = false;
  showEvent: boolean = false;
  segments: any;
  AutoSegments: any = {};
  personDetail: any;
  WelfarePeopleDetail: any;
  QuestionSuccess: any;
  QuestionPlayerId: any;
  ShowSeverityPage: boolean = false;
  medicalInfo: any = false;
  eventstorage: any = [];
  eventExists: any;
  existingEvents: any[];
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
  vote1: any = "";
  vote2: any = "";
  vote3: any = "";
  activePlayer: any = "";
  voteSuccess: boolean = false;
  voteForPlayerId: string = "";
  coachDetails: any = [];
  interval: any;
  ShowWelfare: any;
  ShowResult: any;
  EmptyBorrowPlayer: boolean = false;
  scoreIsUpdated: number = 0;
  isLoaded: boolean = false;
  isOffline: boolean = false;
  rollstatus = "ROLL NOT TAKEN";
  offlinehtml:any=[];
  upcommingevent:any;
  OperooData: operooInterface = {
    emergencyContacts: [],
    schoolId: "",
    safetyAlerts: [],
    bloodGroup: "",
    WearsContacts: "",
    medicalContacts: [],
    swimmingAbility: "",
    paracetamolAllowed: "",
    wearsGlasses: "",
  };
  OperooStatus = 0;
  currentRollStatus: "";
  singleplayerstatus:any=[];

  constructor(
    public navCtrl: NavController,
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
    private vibration: Vibration,
    public global_api: GlobalApiProvider,
    private alertCtrl: AlertController,
    private secureStorage: SecureStorage,
    private network: Network
  ) {
    this.checkNetwork();
  }

 async checkNetwork() {

   this.offlinehtml = (await this.storage.get("attendanceevents")) || [];
   this.upcommingevent    =this.navParams.get("originalevent")
   this.storeselectedevent()

    // Check if the application is running in a web browser
    if (this.network.type === "none" || navigator.onLine === false) {
      this.getknowdta()

      this.setOfflineData();
    } else {
      this.storage.set("offline", 0);
      // this.storage.remove('attendanceevents');
      this.eventIdstorage();
      this.gFn.showMenuIcon();
      this.PhotoApiUrl = this.global.PROFILEIMAGEURL;
      this.getDefaultDataLoad();
      this.plt.registerBackButtonAction(() => {
        this.backArrow();
      });
      // For physical devices, use the Network plugin to handle further connectivity checks
      this.network.onDisconnect().subscribe(() => {});

      this.network.onConnect().subscribe(() => {
        console.log("Network connected!");
        setTimeout(() => {
          if (this.network.type === "wifi") {
          }
        }, 3000);
      });
    }
  }
  chkoflinedta() {
    throw new Error("Method not implemented.");
  }

  async eventIdstorage() {
    this.existingEvents = (await this.storage.get("attendanceevents")) || [];
    console.log("newevntentiiddd", this.existingEvents);
    let newEventId = this.navParams.get("EventDetails_eventId").event_id;
    if (Array.isArray(this.existingEvents)) {
      this.eventExists = this.existingEvents.some(
        (event) => event.eventid === newEventId
      );
    }
    if (!this.eventExists) {
      this.existingEvents.push({ eventid: newEventId });
      await this.storage.set("attendanceevents", this.existingEvents);
    } else {
      // Handle case where event already exists (optional)
    }
    
  }
  async setOfflineData() {
    
    this.storage.set("offline", 1);
    this.storeselectedevent()
    this.getDefaultDataLoad();
    let offlinedata:any = (await this.storage.get("attendanceevents")) || [];
      
    if (offlinedata && offlinedata.length>0) {
      for (let i = 0; i < offlinedata.length; i++) {
        let event = offlinedata[i];
        // Find the matching eventid
        if (
          event.eventid === this.navParams.get("EventDetails_eventId").event_id
        ) {
          this.arrDetail = event.EventDetails;
          this.GetStatusChang(event.rollstatus);
          if (event.eventAttend) {
            let persondata =(await this.storage.get("loggedInUserData"))
            this.eventAttend = event.eventAttend.DATA;
            this.BorrowedPlayerPresent = event.eventAttend.DATA_BORROWED;
            // this.ArrangePlayers();
           
            this.ArrangePlayersOffline(this.eventAttend)
            this.CheckEmptyBorrowedPlayer();
          }

          if(event.rollstatus)
          {
            console.log("event.rollstatus",event.rollstatus)
            this.GetStatusChang(event.rollstatus.toString());
          }
         
          this.isLoaded = true;
          this.isOffline = true;
          this.isOffline = false;
        }
      }
    }

  }
  storeselectedevent() {
        //this.storage.set("selectedEvent",this.upcommingevent)

        this.storage.get('selectedEvent').then((events) => {
          console.log("neweventss",events)
          
          if (events) {
            console.log("first",events)
            // Check if event with same EVENT_ID already exists
            const existingEvent = events.find(event => event.EVENT_ID === this.upcommingevent.EVENT_ID);
            if (!existingEvent) {
              console.log("existingEvent",existingEvent)

              // Event does not exist, add it
              events.push(this.upcommingevent);
              this.storage.set('selectedEvent', events); // Save updated events back to storage
            }
          } else {
            console.log("second",events)
            // No events in storage, create new array with this event
            this.storage.set('selectedEvent', [this.upcommingevent]);
          }
        });
      

  }
  getrollstatus(PersonData) {
    return new Promise((resolve) => {
      let Data = new HttpParams()
        .set("eventId", this.navParams.get("EventDetails_eventId").event_id)
        .set(
          "teamId",
          this.getTeamId(
            this.navParams.get("EventDetails_eventId"),
            this.PersonData
          )
        )
        .set("clubId", PersonData?.CLUB_ID ? PersonData.CLUB_ID : "")
        .set("adminId", PersonData?.PERSON_ID);

      this.http
        .post(this.global.APIURL_CORE + "attendance/getrollstatus", Data, {
          headers: this.global_api.getHeader(),
        })
        .subscribe(
          (data: any) => {
            // this.reason_options_list.push(data.GETPLAYERATTENDING[0].reason_options_list);
            this.currentRollStatus = data.GETROLLSTATUS.rollStatus;
            this.storage.set("rollstatus", this.currentRollStatus);
            this.storageset("", this.currentRollStatus, "", "", "");
            this.setBulkupdateStorage("","","","",this.currentRollStatus)
            this.GetStatusChang(this.currentRollStatus);
            resolve(true);
          },
          (error) => {}
        );
    });
  }
  GetStatusChang(currentRollStatus: string) {
    console.log("currentRollStatus", currentRollStatus);

    if (currentRollStatus == "2") {
      this.rollstatus = "ROLL CLOSED";
    } else if (currentRollStatus == "1") {
      this.rollstatus = "ROLL OPEN";
    } else {
      this.rollstatus = "ROLL NOT TAKEN";
    }
  }
  changeRoll() {
    switch (this.rollstatus) {
      case "ROLL NOT TAKEN": {
        this.rollstatus = "ROLL OPEN";
        this.rollStatusChange(
          this.navParams.get("EventDetails_eventId").event_id,
          "1"
        );
        break;
      }
      case "ROLL OPEN": {
        // this.rollstatus = 'ROLL OPEN';
        this.presentCloseroll();
        console.log("Roll open");
        break;
      }
      case "ROLL CLOSED": {
        this.rollstatus = "ROLL OPEN";
        // this.presentCloseroll();
        console.log("Roll closeddd");
        this.rollStatusChange(
          this.navParams.get("EventDetails_eventId").event_id,
          "1"
        );
        break;
      }
      default: {
      }
    }
  }

  getTeamId(eventData, personData) {
    if (eventData.event_type_id == 2) {
      return eventData.teamid;
    } else {
      if (eventData.awayclubid == personData?.CLUB_ID) {
        return eventData.awayteam;
      } else if (eventData.homeclubid == personData?.CLUB_ID) {
        return eventData.hometeam;
      } else {
        return "";
      }
    }
  }
  rollStatusChange(event_type_id: any, event: any) {
   

    if (this.network.type === "none" || navigator.onLine === false) {
      this.storage.set("offline", 1);
      let Data = new HttpParams()
          .set("eventId", event_type_id)
          .set(
            "teamId",
            this.getTeamId(
              this.navParams.get("EventDetails_eventId"),
              this.PersonData
            )
          )
          .set("clubId", this.PersonData?.CLUB_ID)
          .set("adminId", this.PersonData?.PERSON_ID)
          .set("rollStatus", event);

         let rollstauspayload ={
          eventId :event_type_id,
          teamId :this.getTeamId(
            this.navParams.get("EventDetails_eventId"),
            this.PersonData
          ),
          clubId: this.PersonData?.CLUB_ID,
          adminId:this.PersonData?.PERSON_ID,
          rollStatus:event
         }

          this.setBulkupdateStorage("","","",rollstauspayload,event)
         this.storage.set("rollstatuspayload", Data);
        //this.storageset("", "", "", Data, "")
    } else {
      this.storage.set("offline", 0);
      return new Promise((resolve) => {
        let Data = new HttpParams()
          .set("eventId", event_type_id)
          .set(
            "teamId",
            this.getTeamId(
              this.navParams.get("EventDetails_eventId"),
              this.PersonData
            )
          )
          .set("clubId", this.PersonData?.CLUB_ID)
          .set("adminId", this.PersonData?.PERSON_ID)
          .set("rollStatus", event);
  
        this.storage.set("rollstatuspayload", Data);
        this.storageset("", "", "", Data, "");
        this.setBulkupdateStorage("","","","",event)
        this.http
          .post(this.global.APIURL_CORE + "attendance/updateroll", Data, {
            headers: this.global_api.getHeader(),
          })
          .subscribe(
            (data: any) => {
              // this.reason_options_list.push(data.GETPLAYERATTENDING[0].reason_options_list);
  
              console.log("result for change", data);
              resolve(true);
            },
            (error) => {}
          );
      });
    }  
  }

  async PresentStatusUpdate(status) {

    if (this.network.type === "none" || navigator.onLine === false) {
      this.storage.set("offline", 1);
      if (status.toString() === '0') {

        let allObjects: any[] = [];

        // Iterate through each array starting from index 0
        for (let i = 0; i <  this.eventAttend.length; i++) {
            // If the array is not empty
            if ( this.eventAttend[i].length > 0) {
                // Iterate through each element in this array
                for (let j = 0; j <  this.eventAttend[i].length; j++) {
                    // Change the "attended" status to 0
                    this.eventAttend[i][j].attended = 0;
                    this.eventAttend[i][j].state = 3;
                    // Push this element to the allObjects array
                    allObjects.push( this.eventAttend[i][j]);
                }
                // Empty the current array
                this.eventAttend[i] = [];
            }
        }
       
        // Place allObjects into the third position of the main array
        this.eventAttend[2] = allObjects;
        console.log("absentarrayattend",this.eventAttend)
      } 
      else if (status.toString() === '1') {
        
        for (let i = 1; i < this.eventAttend.length; i++) {
          // If the array is not empty
          if (this.eventAttend[i].length > 0) {
              // Iterate through each element in this array
              for (let j = 0; j < this.eventAttend[i].length; j++) {
                  // Change the "attended" status to 1
                  this.eventAttend[i][j].attended = 1;
                  this.eventAttend[i][j].state = 1;
                  // Move this element to the first array
                  this.eventAttend[0].push(this.eventAttend[i][j]);
              }
              // Empty the current array
              this.eventAttend[i] = [];
          }
      }
       console.log("presentarrayattend",this.eventAttend)
      }
     
      
      let payloads = {
        eventid:this.navParams.get("EventDetails_eventId").event_id,
        teamid: this.getTeamId(
          this.navParams.get("EventDetails_eventId"),
          this.PersonData
        ),
        attended:status.toString()
      }

      let data: any = (await this.storage.get("attendanceevents")) || [];
       
       this.setBulkupdateStorage(this.eventAttend,payloads,1,"","")

      
      
    } 
    else {
      this.storage.set("offline", 0);
      return new Promise((resolve) => {
        let Data = new HttpParams()
          .set("eventid", this.navParams.get("EventDetails_eventId").event_id)
          .set(
            "teamid",
            this.getTeamId(
              this.navParams.get("EventDetails_eventId"),
              this.PersonData
            )
          )
          .set("attended", status.toString());

          
        this.http
          .post(this.global.APIURL_CORE + "attendance/attendancebulk", Data, {
            headers: this.global_api.getHeader(),
          })
          .subscribe(
            (data: any) => {
              // this.reason_options_list.push(data.GETPLAYERATTENDING[0].reason_options_list);
  
              this.presentToast("Bulk attendance updated successfully");
              resolve(true);
              this.AllPlayersLoad();
            },
            (error) => {}
          );
      });
    }  
  }
 async setBulkupdateStorage(eventsttend,bulkpayload,singlepayload,rollstatuspayload,rollstatus) {

    let offlinedata: any = (await this.storage.get("attendanceevents")) || [];

    if (offlinedata && offlinedata.length>0) {
      for (let i = 0; i < offlinedata.length; i++) {
        let event = offlinedata[i];
        // Find the matching eventid
        if (
          event.eventid === this.navParams.get("EventDetails_eventId").event_id
        ) {         
          if(eventsttend)
          {
            event.eventAttend.DATA = eventsttend ;
          }

        if(bulkpayload)
        {
          event.bulkattendpayload = bulkpayload    

        }

        if(singlepayload)
        {
          if(singlepayload=='1')
          {
            event.singlepayload = [] 
          }
          else{
            event.singlepayload = singlepayload  

          }
        }

        if(rollstatuspayload)
        {
          event.rollstatuspayload =rollstatuspayload
        }

        if(rollstatus)
        {
          event.rollstatus =rollstatus
        }
        }
      }

    
    }
    console.log("singlpayload check",singlepayload)
    this.storage.set("attendanceevents", offlinedata);

    this.getknowdta()

  }
  async getknowdta() {
    let data: any = (await this.storage.get("attendanceevents")) || [];
    console.log("afterbulkstorae",data)
  }
  presentCloseroll() {
    let alert = this.alertCtrl.create({
      title: "<p>CLOSE ROLL</p>",
      message:
        "<div><p>You are about to close the roll for this event.</p></div><div><p>If necessary, you can re-open and update the roll.</p></div>",
      cssClass: "close-roll-modal",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "CANCEL",
          role: "cancel",
          cssClass: "modal-cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
        {
          text: "CLOSE ROLL",
          cssClass: "modal-submit",
          handler: () => {
            console.log("Buy clicked");
            this.rollstatus = "ROLL CLOSED";
            this.rollStatusChange(
              this.navParams.get("EventDetails_eventId").event_id,
              "2"
            );
          },
        },
      ],
    });
    alert.present();
  }

  presentLwCloseroll() {
    let alert = this.alertCtrl.create({
      title: '<p class="m-0">LEAVE WITHOUT CLOSING ROLL?</p>',
      message:
        "<div><p>You are about to leave without closing the roll.</p></div>",
      cssClass: "closelw-roll-modal",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "LEAVE",
          role: "cancel",
          cssClass: "modal-cancel",
          handler: () => {
            console.log("Cancel clicked");
            this.navCtrl.pop();
          },
        },
        {
          text: "CLOSE ROLL",
          cssClass: "modal-submit",
          handler: () => {
            console.log("Buy clicked");
            this.rollstatus = "ROLL CLOSED";
            this.rollStatusChange(
              this.navParams.get("EventDetails_eventId").event_id,
              "2"
            );
          },
        },
      ],
    });
    alert.present();
  }

  getDefaultDataLoad() {
    this.storage.get("FunctionAccess").then((val) => {
      this.FunctionAccess = val;
      this.storage.get("loggedInUserData").then((val) => {
        this.PersonData = val;
        this.coachDetails[0] = val;
        console.log(this.FunctionAccess);

        this.getrollstatus(this.PersonData);
        if (this.navParams.get("EventDetails_eventId")) {
          this.UpcomingSingleEvent = this.navParams.get("EventDetails_eventId");
          this.storage.set(
            "UpcomingSingleEvent",
            JSON.stringify(this.UpcomingSingleEvent)
          );
          this.event_id = this.UpcomingSingleEvent.event_id;
          this.selectedTeam = this.PersonData?.SELECTEDTEAM;
          if (
            this.UpcomingSingleEvent.event_type_id == 2 &&
            this.UpcomingSingleEvent.teamid
          ) {
            this.selectedTeam = this.UpcomingSingleEvent.teamid;
          } else if (this.UpcomingSingleEvent.event_type_id == 1) {
            if (
              this.UpcomingSingleEvent.homeclubid == this.PersonData.CLUB_ID
            ) {
              this.selectedTeam = this.UpcomingSingleEvent.hometeam;
            } else {
              this.selectedTeam = this.UpcomingSingleEvent.awayteam;
            }
          }
          if (
            this.FunctionAccess?.event_Welfare == "yes" &&
            this.UpcomingSingleEvent.welfare_question == 1
          ) {
            $(".top_tab").find(".Welfare_tab").css("display", "inherit");
            this.ShowWelfare = true;
            console.log(" this.ShowWelfare", this.ShowWelfare);
            console.log(
              "this.FunctionAccess.event_Welfare",
              this.FunctionAccess?.event_Welfare
            );
            console.log(
              "this.UpcomingSingleEvent.welfare_question",
              this.UpcomingSingleEvent.welfare_question
            );
          }
          if (
            (this.FunctionAccess?.event_Result == "yes" ||
              this.FunctionAccess.voting_for_player != "no") &&
            this.UpcomingSingleEvent.event_type_id != 2
          ) {
            $(".top_tab").find(".Result_tab").css("display", "inherit");
            this.ShowResult = true;
            console.log(
              "this.FunctionAccess.event_Result",
              this.FunctionAccess?.event_Result
            );
          }
          var active_tab = this.navParams.get("ActiveTab")
            ? this.navParams.get("ActiveTab")
            : "Attendance";

          this.segments = active_tab;
          this.AutoSegments = { value: this.segments };
          this.segmentChanged(this.AutoSegments);
        } else {
          this.storage.get("UpcomingSingleEvent").then((val) => {
            this.UpcomingSingleEvent = JSON.parse(val);
            this.event_id = this.UpcomingSingleEvent.event_id;
            this.selectedTeam = this.PersonData.SELECTEDTEAM;
            if (
              this.UpcomingSingleEvent.event_type_id == 2 &&
              this.UpcomingSingleEvent.teamid
            ) {
              this.selectedTeam = this.UpcomingSingleEvent.teamid;
            } else if (this.UpcomingSingleEvent.event_type_id == 1) {
              if (
                this.UpcomingSingleEvent.homeclubid == this.PersonData.CLUB_ID
              ) {
                this.selectedTeam = this.UpcomingSingleEvent.hometeam;
              } else {
                this.selectedTeam = this.UpcomingSingleEvent.awayteam;
              }
            }
            if (
              this.FunctionAccess?.event_Welfare == "yes" &&
              this.UpcomingSingleEvent.welfare_question == 1
            ) {
              $(".top_tab").find(".Welfare_tab").css("display", "inherit");
              this.ShowWelfare = true;
              console.log(" this.ShowWelfare", this.ShowWelfare);
              console.log(
                "this.FunctionAccess.event_Welfare",
                this.FunctionAccess?.event_Welfare
              );
              console.log(
                "this.UpcomingSingleEvent.welfare_question",
                this.UpcomingSingleEvent.welfare_question
              );
            }
            if (
              (this.FunctionAccess?.event_Result == "yes" ||
                this.FunctionAccess.voting_for_player != "no") &&
              this.UpcomingSingleEvent.event_type_id != 2
            ) {
              $(".top_tab").find(".Result_tab").css("display", "inherit");
              this.ShowResult = true;
            }
            var active_tab = this.navParams.get("ActiveTab")
              ? this.navParams.get("ActiveTab")
              : "Attendance";

            this.segments = active_tab;
            this.AutoSegments = { value: this.segments };
            this.segmentChanged(this.AutoSegments);
          });
        }
      });
    });
  }

  segmentChanged(event) {
    console.log(this.segments);
    this.isOffline = false;

    if (event.value == "Attendance") {
      // this.segments='Attendance'
      /* let loader = this.loadingCtrl.create({});
        loader.present(); */

      // this.getPersonDetail().then((z) => {
      //   if (z) {
      this.getOperooStatus();
      this.getAttendingDetails();
      this.getEventDetails().then((x) => {
        if (x) {
          this.AllPlayersLoad().then((y) => {
            if (y) {
              this.isLoaded = true;
            } else {
              this.isOffline = true;
            }
          });
        } else {
          this.isOffline = true;
        }
      });
      //   }
      // });
    } else if (event.value == "Welfare") {
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
      });
    }
    // else if(event.value=='Welfare'){
    //   this.segments='Welfare'
    // }
    else if (event.value == "Result") {
      // this.segments='Result'
      this.loadDataFromAPIs();
      this.loader = this.loadingCtrl.create({});
      this.loader.present();
    }
  }

  goToChooseTeamsPage() {
    this.navCtrl.push("ChooseTeamProfilePage");
  }
  highlightMenuIcon() {
    // $('.tabs .tab-button[aria-selected=true]:nth-child(1)').attr('aria-selected','false')
    $(".tabs .tab-button[aria-selected=false]:nth-child(2)").attr(
      "aria-selected",
      "true"
    );
    $(
      ".tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon"
    ).css({
      "mask-image": "url(../assets/images/menu/home.svg)",
      height: "22px",
      color: "#dedede",
    });
    // $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': 'url(../assets/images/menu/events-blue.svg)',
    // 'height': '36px',
    // 'color': '#43B7CC'})
  }

  unhighlightMenuIcon() {
    if (!this.showEvent) {
      console.log(";ll");
      // this.navCtrl.pop()
      $(
        ".tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon"
      ).css({
        "mask-image": "",
        height: "",
        color: "",
      });
      // $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': '',
      // 'height': '',
      // 'color': ''})
      $(".tab-button-icon")
        .closest(
          ".tabs .tab-button[aria-selected=true]:nth-child(1) .activated"
        )
        .css({
          "mask-image": "",
          height: "",
          color: "",
        });
      $(".tabs .tab-button[aria-selected=true]:nth-child(2)").attr(
        "aria-selected",
        "false"
      );
    }
  }

  ionViewDidEnter() {
    this.highlightMenuIcon();
  }

  ionViewDidLoad() {
    this.highlightMenuIcon();

    this.storage.get("BackButton").then((val) => {
      this.BackButton = val;
    });
  }
  ionViewWillLeave() {
    this.unhighlightMenuIcon();
  }

  getOperooProfile() {
    return new Promise((resolve) => {
      // console.log('this.PersonData', this.PersonData)
      let Data = new HttpParams().set("school_id", "").set("club_id", "7742");

      this.http
        .post(this.global.APIURL + "users/getOperooProfile", Data, {
          headers: this.global_api.getHeader(),
        })
        .subscribe(
          (data: any) => {
            console.log("operoodata", data);
            resolve(true);
          },
          (error) => {}
        );
    });
  }

  getAttendingDetails() {
    return new Promise((resolve) => {
      let Data = new HttpParams()
        .set("event_id", this.UpcomingSingleEvent.event_id)
        .set("client_id", this.UpcomingSingleEvent.client_id)
        .set("person_id", this.PersonData?.PERSON_ID)
        .set("first_name", this.PersonData?.FIRST_NAME)
        .set("last_name", this.PersonData?.LAST_NAME)
        .set("selectedTeam", this.selectedTeam);

      this.http
        .post(this.global.APIURL + "players/getPlayerAttending", Data, {
          headers: this.global_api.getHeader(),
        })
        .subscribe(
          (data: any) => {
            this.reason_options_list.push(
              data.GETPLAYERATTENDING[0].reason_options_list
            );
            this.storage.set("playerslist", this.reason_options_list);
            resolve(true);
          },
          (error) => {}
        );
    });
  }

  getOperooData(playerData) {
    return new Promise((resolve) => {
      let Data = new HttpParams()
        .set("person_id", playerData?.person_id)
        .set("club_id", this.PersonData?.CLUB_ID);

      this.http
        .post(this.global.APIURL + "users/getOperooProfile", Data, {
          headers: this.global_api.getHeader(),
        })
        .subscribe(
          (data: any) => {
            resolve(data);
          },
          (error) => {}
        );
    });
  }

  getOperooStatus() {
    return new Promise((resolve) => {
      let Data = new HttpParams().set("clubid", this.PersonData?.CLUB_ID);

      this.http
        .post(this.global.APIURL + "incidents/checkUsingOperoo", Data, {
          headers: this.global_api.getHeader(),
        })
        .subscribe(
          (data: any) => {
            console.log("operoo status data", data);
            if (data && data.SUCCESS) {
              // this.OperooStatus = 1;
              this.OperooStatus = data.USE_OPEROO;
            }
            resolve(true);
          },
          (error) => {}
        );
    });
  }
  gotoResults() {
    this.gFn.gotoResults();
    this.showEvent = true;
  }
  gotoWelfare() {
    this.gFn.gotoWelfare();
    this.showEvent = true;
  }

  getEventDetails() {
    return new Promise((resolve) => {
      let loginData = new HttpParams()
        .set("event_id", this.UpcomingSingleEvent.event_id)
        .set("event_type_id", this.UpcomingSingleEvent.event_type_id)
        .set("clientTimeZone", this.PersonData.CLIENTTIMEZONE ?this.PersonData.CLIENTTIMEZONE :"")
        .set("selectedTeam", this.selectedTeam)
        .set("client_id", this.UpcomingSingleEvent.client_id);

      this.http
        .post(this.global.APIURL + "events/getEventDetails", loginData, {
          headers: this.global_api.getHeader(),
        })
        .subscribe(
          (response: any) => {
            this.arrDetail = response.GETEVENTDETAILS;

            this.homeAwayText = response.GETEVENTDETAILS[0]["ishometeam"]
              ? "Home"
              : "Away";
            this.storage.set("EventDetails", this.arrDetail);
            this.storageset(this.arrDetail, "", "", "", "");
            for (let keys of this.arrDetail) {
              this.key = keys;
              this.date = this.key.date.split("/")[0];
              this.groundAdress = this.key.ground_address;
              this.groundState = this.key.ground_state;
              this.longitude = this.key.geoloc_longitude;
              this.latitude = this.key.geoloc_latitude;
            }

            if (response.GETEVENTDETAILS.length > 0) {
              this.scoreIsUpdated = response.GETEVENTDETAILS[0]["isUpdated"];
              this.scoreHome = this.getPrefixedNumber(
                response.GETEVENTDETAILS[0]["homescore"]
              );
              this.scoreAway = this.getPrefixedNumber(
                response.GETEVENTDETAILS[0]["awayscore"]
              );
              this.reportText = response.GETEVENTDETAILS[0]["ishometeam"]
                ? response.GETEVENTDETAILS[0]["report_home"]
                : response.GETEVENTDETAILS[0]["report_away"];
              this.homeAwayText = response.GETEVENTDETAILS[0]["ishometeam"]
                ? "Home"
                : "Away";
              if (response.GETEVENTDETAILS[0]["washout"] == "1") {
                this.gameDismissed = "washout";
                $(".radio-game-dismissed").each(function () {
                  if ($(this).val() == "washout")
                    $(this).attr("checked", "checked");
                  $(".radio").find(".Washout").addClass("HighLight");
                });
              } else if (response.GETEVENTDETAILS[0]["forfeit"] == "1") {
                this.gameDismissed = "forfeit";
                $(".radio-game-dismissed").each(function () {
                  if ($(this).val() == "forfeit")
                    $(this).attr("checked", "checked");
                  $(".radio").find(".forfeit").addClass("HighLight");
                });
              } else {
                this.gameDismissed = "";
              }
            }
            resolve(true);
          },
          (error) => {
            resolve(false);
          }
        );
    });
  }
  storageset(value, roll, eventattend, rollstatuspayload, bulkattendpayload) {

    for (let i = 0; i < this.existingEvents.length; i++) {
      let event = this.existingEvents[i];

      // Find the matching eventid
      if (
        event.eventid === this.navParams.get("EventDetails_eventId").event_id
      ) {
        // Update this condition with the appropriate eventid
        if (value) {
          event.EventDetails = value;
        } else if (roll) {
          event.rollstatus = roll;
        } else if (eventattend) {
          event.eventAttend = eventattend;
        } else if (rollstatuspayload) {
          event.rollstatuspayload = rollstatuspayload;
        } else if (bulkattendpayload) {
          event.bulkattendpayload = bulkattendpayload;
        }

        break; // Exit the loop since we found and updated the event
      }
    }
    this.storage.set("attendanceevents", this.existingEvents);
    this.getknowdta()
  }

  eventState(eventVal, event) {
    setTimeout(() => {
      if (this.filterButton == eventVal) {
        this.filterState = 0;
        this.filterButton = "";
        this.notifyFlag = "";
        //loader.dismiss()
      } else {
        this.filterButton = eventVal;
        this.filterState = 1;
      }

      this.combinedPlayersArray = [];
      this.combinedBorrowedPlayersArray = [];
      if (eventVal == "Going" && this.filterState == 1) {
        this.notifyFlag = 0;
        this.DupeventAttendsec[0] = this.eventAttend[0];
        this.DupeventAttendsec[1] =
          this.DupeventAttendsec[2] =
          this.DupeventAttendsec[3] =
            [];
        this.DupEventAttendSecBorrowed[0] = this.BorrowedPlayerPresent[0];
        this.DupEventAttendSecBorrowed[1] =
          this.DupEventAttendSecBorrowed[2] =
          this.DupEventAttendSecBorrowed[3] =
            [];

        $(event.target)
          .closest(".radial-progressbar")
          .find(".Going")
          .removeClass("inactive");
        $(event.target)
          .closest(".radial-progressbar")
          .find(".MayBe")
          .addClass("inactive");
        $(event.target)
          .closest(".radial-progressbar")
          .find(".NotGoing")
          .addClass("inactive");
        $(event.target)
          .closest(".radial-progressbar")
          .find(".NoResponse")
          .addClass("inactive");
        this.GoingColor = "#68E048";
        this.NoResponseColor = this.NotGoingColor = this.MaybeColor = "#404C62";

        //loader.dismiss()
      } else if (eventVal == "Maybe" && this.filterState == 1) {
        this.notifyFlag = 3;
        this.DupeventAttendsec[0] = this.eventAttend[3];
        this.DupeventAttendsec[3] =
          this.DupeventAttendsec[2] =
          this.DupeventAttendsec[1] =
            [];
        this.DupEventAttendSecBorrowed[0] = this.BorrowedPlayerPresent[3];
        this.DupEventAttendSecBorrowed[3] =
          this.DupEventAttendSecBorrowed[2] =
          this.DupEventAttendSecBorrowed[1] =
            [];

        $(event.target)
          .closest(".radial-progressbar")
          .find(".MayBe")
          .removeClass("inactive");
        $(event.target)
          .closest(".radial-progressbar")
          .find(".Going")
          .addClass("inactive");
        $(event.target)
          .closest(".radial-progressbar")
          .find(".NotGoing")
          .addClass("inactive");
        $(event.target)
          .closest(".radial-progressbar")
          .find(".NoResponse")
          .addClass("inactive");
        this.MaybeColor = "#2BBFF0";
        this.NoResponseColor = this.NotGoingColor = this.GoingColor = "#404C62";

        //loader.dismiss()
      } else if (eventVal == "Not going" && this.filterState == 1) {
        this.notifyFlag = 1;
        this.DupeventAttendsec[0] = this.eventAttend[1];
        this.DupeventAttendsec[3] =
          this.DupeventAttendsec[2] =
          this.DupeventAttendsec[1] =
            [];
        this.DupEventAttendSecBorrowed[0] = this.BorrowedPlayerPresent[1];
        this.DupEventAttendSecBorrowed[3] =
          this.DupEventAttendSecBorrowed[2] =
          this.DupEventAttendSecBorrowed[1] =
            [];

        console.log("DupeventAttendsec 497", this.DupeventAttendsec);
        $(event.target)
          .closest(".radial-progressbar")
          .find(".NotGoing")
          .removeClass("inactive");
        $(event.target)
          .closest(".radial-progressbar")
          .find(".MayBe")
          .addClass("inactive");
        $(event.target)
          .closest(".radial-progressbar")
          .find(".Going")
          .addClass("inactive");
        $(event.target)
          .closest(".radial-progressbar")
          .find(".NoResponse")
          .addClass("inactive");
        this.NotGoingColor = "#D80000";
        this.NoResponseColor = this.MaybeColor = this.GoingColor = "#404C62";
        //loader.dismiss()
      } else if (eventVal == "No response" && this.filterState == 1) {
        this.notifyFlag = 2;
        this.DupeventAttendsec[0] = this.eventAttend[2];
        this.DupeventAttendsec[1] =
          this.DupeventAttendsec[2] =
          this.DupeventAttendsec[3] =
            [];
        this.DupEventAttendSecBorrowed[0] = this.BorrowedPlayerPresent[2];
        this.DupEventAttendSecBorrowed[1] =
          this.DupEventAttendSecBorrowed[2] =
          this.DupEventAttendSecBorrowed[3] =
            [];

        $(event.target)
          .closest(".radial-progressbar")
          .find(".NoResponse")
          .removeClass("inactive");
        $(event.target)
          .closest(".radial-progressbar")
          .find(".MayBe")
          .addClass("inactive");
        $(event.target)
          .closest(".radial-progressbar")
          .find(".NotGoing")
          .addClass("inactive");
        $(event.target)
          .closest(".radial-progressbar")
          .find(".Going")
          .addClass("inactive");
        this.NoResponseColor = "#F59044";
        this.NotGoingColor = this.MaybeColor = this.GoingColor = "#404C62";
        //loader.dismiss()
      }
      this.CheckEmptyBorrowedPlayer();
    }, 100);

    //this.CheckEmptyBorrowedPlayer(eventVal);
  }
  CheckEmptyBorrowedPlayer() {
    this.EmptyBorrowPlayer =
      (this.filterState == 1 &&
        this.notifyFlag == 3 &&
        this.DupEventAttendSecBorrowed.length > 0 &&
        this.DupEventAttendSecBorrowed[0].length == 0) ||
      (this.DupEventAttendSecBorrowed.length > 0 &&
        this.DupEventAttendSecBorrowed[0].length == 0 &&
        this.DupEventAttendSecBorrowed[1].length == 0 &&
        this.DupEventAttendSecBorrowed[2].length == 0 &&
        this.DupEventAttendSecBorrowed[3].length == 0);
  }
  SinglePlayersAttdStates(confirm, attended, reason, AttendyPersonId, event) {
    if (this.PersonData.ADMINLEVEL !== 3) {
      var reasondeclined = "";
      var reasondeclined_by_coach = "";
      let unsetAttendance = "0";

      if ($(event.target).hasClass("SelectedReason")) {
        unsetAttendance = "1";
      }

      if (this.FunctionAccess.user_adminLevel == 4) {
        if (confirm == "Y") {
          confirm = "YES";
          attended = 1;
        } else if (confirm == "N") {
          confirm = "NO";
          attended = 0;
        }
        reasondeclined = reason;
      } else if (this.FunctionAccess.user_adminLevel != 4) {
        if (confirm == "Y") {
          confirm = "YES";
          attended = 1;
        } else if (confirm == "N") {
          confirm = "NO";
          attended = 0;
        }
        reasondeclined_by_coach = reason;
      }
      let loader = this.loadingCtrl.create({});
      loader.present();

      let target = event.target;
      let loginData4 = new HttpParams()
        .set("event_id", this.UpcomingSingleEvent.event_id)
        .set("personId", AttendyPersonId)
        .set("attended", attended)
        .set("confirmed", confirm)
        .set("reasondeclined", reasondeclined)
        .set("reasondeclined_by_coach", reasondeclined_by_coach)
        .set("unsetAttendance", unsetAttendance)
        .set("state_time", "")
        .set("selectedTeam", this.selectedTeam);

      this.http
        .post(
          this.global.APIURL + "events/saveSinglePlayersAttdStates",
          loginData4,
          { headers: this.global_api.getHeader() }
        )
        .subscribe(
          (data: any) => {
            // firebase event

            if (data.SUCCESS) {
              if (this.FunctionAccess.user_adminLevel == 4) {
                this.logger.DashboardPlayerReason("PlayerAttendReasonSelect", {
                  pram: Date.now(),
                });
              } else if (this.FunctionAccess.user_adminLevel != 4) {
                this.logger.CoachArrowAttd_Mark("CoachArrowAttd_Mark", {
                  pram: Date.now(),
                });
              }
              this.vibration.vibrate(500);
            }

            this.resetColors(event);
            this.AllPlayersLoad().then((y) => {
              if (y) {
                loader.dismiss();
              }
            });
          },
          (error) => {}
        );
    }






   
  }

  ArrowFunctionality(event) {
    if (this.Arrowflag == false) {
      let target = event.target;
      $(target).closest(".row").find("ul").show();
      if (this.FunctionAccess.user_adminLevel == 4) {
        $(target).closest(".row").find("ul").addClass("Div-Arrow");
      }
      $(target)
        .closest(".row")
        .find(".collapsed-arrow")
        .removeClass("ArrowLight");
      $(target).closest(".row").find(".collapsed-arrow").addClass("ArrowDark");

      this.Arrowflag = true;
    } else if (this.Arrowflag == true) {
      let target = event.target;
      $(target).closest(".row").find("ul").hide();
      $(target)
        .closest(".row")
        .find(".collapsed-arrow")
        .removeClass("ArrowDark");
      $(target).closest(".row").find(".collapsed-arrow").addClass("ArrowLight");
      this.Arrowflag = false;
    }
  }

  hideAttendanceList(event) {
    let target = event.target;
    if (
      !$(target).hasClass("collapsed-arrow") &&
      $("ul.dropdown-menu.card-dropdown:visible").length
    ) {
      $(".collapsed-arrow").removeClass("ArrowDark").addClass("ArrowLight");
      $("ul.dropdown-menu.card-dropdown").hide();
      this.Arrowflag = false;
    }
  }

  goToTimesheet() {
    this.navCtrl.push("TimesheetPage");
    this.showEvent = true;
  }
  borrow_player() {
    this.navCtrl.push("BorrowedPlayerPage", {
      UpcomingSingleEvent: JSON.stringify(this.UpcomingSingleEvent),
    });
    this.showEvent = true;
  }
  notify_player() {
    this.navCtrl.push("NotifyPlayersPage", {
      notifyFlag: this.notifyFlag,
      UpcomingSingleEvent: JSON.stringify(this.UpcomingSingleEvent),
    });
    this.showEvent = true;
  }
  WelfarePlayerQuestion(event) {
    this.showEvent = true;
    var Data = Object.keys(this.PersonData).reduce(
      (c, k) => ((c[k.toLowerCase()] = this.PersonData[k]), c),
      {}
    );

    this.navCtrl.push("PlayerQuestionPage", { Player_detail: Data });
  }
  gotoGroupMessage() {
    this.showEvent = true;
    /*let GroupMessageModal = this.modalCtrl.create('EventGroupMessagePage', { Array: this.DupeventAttendLen });
      GroupMessageModal.onDidDismiss(data => {
      });
      GroupMessageModal.present();*/
    this.navCtrl.push("EventGroupSendMessagePage", {
      notifyFlag: this.notifyFlag,
    });
  }
  gotoSessionPlan() {
    this.navCtrl.push("EventSessionPlanPage");
  }
  gotoInjuredList() {
    this.showEvent = true;
    if (this.FunctionAccess.event_Injury == "self") {
      this.navCtrl.push("InjuryIncidentReportPage", {
        injured_person_id: this.PersonData?.PERSON_ID,
      });
    } else {
      this.navCtrl.push("InjuredListPage");
    }
  }
  // gotoReqAttendance(){

  //   this.navCtrl.push('AlertDashboardPage')

  // }
  AllPlayersLoad() {
    return new Promise((resolve) => {
      let PlayersData = new HttpParams()
        .set("event_id", this.UpcomingSingleEvent.event_id)
        .set("client_id", this.UpcomingSingleEvent.client_id) //this.PersonData.CLIENT_ID
        .set("selectedTeam", this.selectedTeam) //this.PersonData.SELECTEDTEAM
        .set("personId", this.PersonData.PERSON_ID?this.PersonData.PERSON_ID:"");
      this.http
        .post(
          this.global.APIURL + "players/AllLoadPlayersAttendance",
          PlayersData,
          { headers: this.global_api.getHeader() }
        )
        .subscribe(
          (data: any) => {
            this.eventAttend = data.DATA;
            this.storage.set("eventAttend", data);
            this.storageset("", "", data, "", "");
            this.BorrowedPlayerPresent = data.DATA_BORROWED;
            this.ArrangePlayers();
            this.CheckEmptyBorrowedPlayer();
            resolve(true);
          },
          (error) => {
            resolve(false);
          }
        );
    });
  }

  ArrangePlayersOffline(eventAttend)
  {
   
   
    this.eventAttend =eventAttend
    this.DupeventAttendLen = [];
    this.DupEventAttendSecBorrowed = [];
    this.percentArray = [];
    this.combinedPlayersArray = [];
    this.combinedBorrowedPlayersArray = [];
    var key, key1;

    
   
    for (key in eventAttend) {
      this.DupeventAttendsec[key] = [];

      for (key1 in this.eventAttend[key]) {
        if (
          this.eventAttend[key][key1].person_id == this.PersonData?.PERSON_ID
        ) {
          this.eventAttend[key][key1].attendanceStatus = 1; //just for testing
          this.DupeventAttendsec[0].unshift(this.eventAttend[key][key1]);
          if (this.eventAttend[key][key1].attendanceStatus in [0, 1]) {
            this.SymbolAlert = true;
          }
        } else {
          // this.SymbolAlert=true
          this.DupeventAttendsec[key].push(this.eventAttend[key][key1]);
        }
        if (key < 3) {
          this.combinedPlayersArray.push(this.eventAttend[key][key1]);
        }
      }
      this.DupeventAttendLen[key] = this.DupeventAttendsec[key].length;
    }

    this.combinedPlayersArray.sort(function (a, b) {
      var x = a.first_name.toLowerCase() + " " + a.last_name.toLowerCase();
      var y = b.first_name.toLowerCase() + " " + b.last_name.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });

    //Player Name on the top of tthe List
    for (var key3 in this.combinedPlayersArray) {
      if (
        this.PersonData?.PERSON_ID && this.combinedPlayersArray[key3].person_id == this.PersonData?.PERSON_ID
      ) {
        this.combinedPlayersArray.unshift(this.combinedPlayersArray[key3]);
        this.combinedPlayersArray.splice(parseInt(key3) + 1, 1);
      }
    }
    // console.log('bh',this.combinedPlayersArray)

    for (key in this.BorrowedPlayerPresent) {
      this.DupEventAttendSecBorrowed[key] = [];
      for (key1 in this.BorrowedPlayerPresent[key]) {
        if (
          this.PersonData?.PERSON_ID && this.BorrowedPlayerPresent[key][key1].person_id ==
          this.PersonData?.PERSON_ID
        ) {
          this.DupEventAttendSecBorrowed[0].unshift(
            this.BorrowedPlayerPresent[key][key1]
          );
        } else {
          this.DupEventAttendSecBorrowed[key].push(
            this.BorrowedPlayerPresent[key][key1]
          );
        }
        if (key < 3) {
          this.combinedBorrowedPlayersArray.push(
            this.BorrowedPlayerPresent[key][key1]
          );
        }
        this.BorrowTagFlag = 1;
      }
      this.DupeventAttendLen[key] += this.DupEventAttendSecBorrowed[key].length;
    }

    this.combinedBorrowedPlayersArray.sort(function (a, b) {
      var x = a.first_name.toLowerCase() + " " + a.last_name.toLowerCase();
      var y = b.first_name.toLowerCase() + " " + b.last_name.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });

    var totalPlayerCount =
      this.eventAttend[0].length +
      this.eventAttend[1].length +
      this.eventAttend[2].length;
    totalPlayerCount +=
      this.BorrowedPlayerPresent[0].length +
      this.BorrowedPlayerPresent[1].length +
      this.BorrowedPlayerPresent[2].length;
    this.DupeventAttendLen.push(totalPlayerCount);

    for (key in this.eventAttend) {
      this.percentArray.push(
        (this.DupeventAttendLen[key] / totalPlayerCount) * 100
      );
      this.DupeventAttendLen[key] = this.zero_pad(this.DupeventAttendLen[key]);
    }
  }





  ArrangePlayers() 
  {
    this.DupeventAttendLen = [];
    this.DupEventAttendSecBorrowed = [];
    this.percentArray = [];
    this.combinedPlayersArray = [];
    this.combinedBorrowedPlayersArray = [];
    var key, key1;
    
    for (key in this.eventAttend) {
      this.DupeventAttendsec[key] = [];

      for (key1 in this.eventAttend[key]) {
        if (
          this.PersonData?.PERSON_ID&& this.eventAttend[key][key1].person_id == this.PersonData?.PERSON_ID
        ) {
          this.eventAttend[key][key1].attendanceStatus = 1; //just for testing
          this.DupeventAttendsec[0].unshift(this.eventAttend[key][key1]);
          if (this.eventAttend[key][key1].attendanceStatus in [0, 1]) {
            this.SymbolAlert = true;
          }
        } else {
          // this.SymbolAlert=true
          this.DupeventAttendsec[key].push(this.eventAttend[key][key1]);
        }
        if (key < 3) {
          this.combinedPlayersArray.push(this.eventAttend[key][key1]);
        }
      }
      this.DupeventAttendLen[key] = this.DupeventAttendsec[key].length;
    }

    this.combinedPlayersArray.sort(function (a, b) {
      var x = a.first_name.toLowerCase() + " " + a.last_name.toLowerCase();
      var y = b.first_name.toLowerCase() + " " + b.last_name.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });

    //Player Name on the top of tthe List
    for (var key3 in this.combinedPlayersArray) {
      if (
        this.PersonData?.PERSON_ID && this.combinedPlayersArray[key3].person_id == this.PersonData?.PERSON_ID
      ) {
        this.combinedPlayersArray.unshift(this.combinedPlayersArray[key3]);
        this.combinedPlayersArray.splice(parseInt(key3) + 1, 1);
      }
    }
    // console.log('bh',this.combinedPlayersArray)

    for (key in this.BorrowedPlayerPresent) {
      this.DupEventAttendSecBorrowed[key] = [];
      for (key1 in this.BorrowedPlayerPresent[key]) {
        if (
          this.PersonData?.PERSON_ID && this.BorrowedPlayerPresent[key][key1].person_id ==
          this.PersonData?.PERSON_ID
        ) {
          this.DupEventAttendSecBorrowed[0].unshift(
            this.BorrowedPlayerPresent[key][key1]
          );
        } else {
          this.DupEventAttendSecBorrowed[key].push(
            this.BorrowedPlayerPresent[key][key1]
          );
        }
        if (key < 3) {
          this.combinedBorrowedPlayersArray.push(
            this.BorrowedPlayerPresent[key][key1]
          );
        }
        this.BorrowTagFlag = 1;
      }
      this.DupeventAttendLen[key] += this.DupEventAttendSecBorrowed[key].length;
    }
    if(this.combinedBorrowedPlayersArray.length>0){
      this.combinedBorrowedPlayersArray.sort(function (a, b) {
        var x = a.first_name.toLowerCase() + " " + a.last_name.toLowerCase();
        var y = b.first_name.toLowerCase() + " " + b.last_name.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
    }

   

    var totalPlayerCount =
      this.eventAttend[0].length +
      this.eventAttend[1].length +
      this.eventAttend[2].length;
    totalPlayerCount +=
      this.BorrowedPlayerPresent[0].length +
      this.BorrowedPlayerPresent[1].length +
      this.BorrowedPlayerPresent[2].length;
    this.DupeventAttendLen.push(totalPlayerCount);

    for (key in this.eventAttend) {
      this.percentArray.push(
        (this.DupeventAttendLen[key] / totalPlayerCount) * 100
      );
      this.DupeventAttendLen[key] = this.zero_pad(this.DupeventAttendLen[key]);
    }
  }

  resetColors(event) {
    this.notifyFlag = "";
    this.GoingColor = "#68E048";
    this.MaybeColor = "#2BBFF0";
    this.NotGoingColor = "#D80000";
    this.NoResponseColor = "#F59044";
    $(".radial-progressbar")
      .find(".NoResponse,.MayBe,.NotGoing,.Going")
      .removeClass("inactive");
    this.ArrangePlayers();
    this.hideAttendanceList(event);

    this.CheckEmptyBorrowedPlayer();
  }
  backArrow() {
    /* this.app.getRootNav().getActiveChildNav().select(1).then(() => {
        $('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected', 'true')
      }); */
    if (this.rollstatus == "ROLL OPEN") {
      this.presentLwCloseroll();
    } else {
      this.navCtrl.pop();
    }
  }
  zero_pad(num) {
    let s = num + "";
    while (s.length < 2) s = "0" + s;
    return s;
  }

  async AttendanceMark(event, Attendance, AttendyPersonId,attendy) {
    
    if (this.network.type === "none" || navigator.onLine === false) {
      this.storage.set("offline", 1);
      var attended;
      if (
        (Attendance == "" || Attendance == null || Attendance == 0) &&
        this.FunctionAccess.user_adminLevel != 4
      ) {
        attended = 1;
       
        $(event.target).removeClass("AbsentCheckbox1");
        $(event.target).addClass("PresentCheckbox1");


        const index = this.eventAttend[2].findIndex((obj) => obj.person_id === attendy.person_id);

        if (index !== -1) {
            // Remove the object from data[2] and store it
            const removedObj = this.eventAttend[2].splice(index, 1)[0];
            removedObj.state = 1;

            // Add the removed object to the beginning of data[0]
            this.eventAttend[0].unshift(removedObj);
        }
        this.AttendanceReport(attended, AttendyPersonId,"0");
      
      //this.setBulkupdateStorage(this.eventAttend,"","","","")
     
      
      } else if (
        (Attendance == "" || Attendance == null || Attendance == 1) &&
        this.FunctionAccess.user_adminLevel != 4
      ) {
        attended = 2;
        $(event.target).removeClass("PresentCheckbox1");
        $(event.target).removeClass("AbsentCheckbox1");
        $(event.target).addClass("NoneCheckbox1");
       

        // Find index of single object in the first array
        const index = this.eventAttend[0].findIndex((item: any) => item.person_id === attendy.person_id);
                  
        if (index !== -1) {
          // Remove the object from the first array
          const removedItem = this.eventAttend[0].splice(index, 1)[0];
          
          // Add the object to the third array
          removedItem.attended = 2 // Set attended based on event
          removedItem.state = 3
          console.log("this.eventAttend",removedItem)
          this.eventAttend[2].push(removedItem);
         
        
        }
        this.AttendanceReport(attended, AttendyPersonId,"0");
        let data: any = (await this.storage.get("attendanceevents")) || [];
        //this.setBulkupdateStorage(this.eventAttend,"","","","")
        

      } else if (
        (Attendance == "" || Attendance == null || Attendance == 2) &&
        this.FunctionAccess.user_adminLevel != 4
      ) {
        attended = 0;
        $(event.target).removeClass("PresentCheckbox1");
        $(event.target).removeClass("NoneCheckbox1");
        $(event.target).addClass("AbsentCheckbox1");
        


 
        if (attended === 0) {
          for (let i = 0; i < this.eventAttend.length; i++) {
              for (let j = 0; j < this.eventAttend[i].length; j++) {
                  if (this.eventAttend[i][j].person_id === attendy.person_id) {
                    this.eventAttend[i][j].attended = 0;
                      return; // Exit the function once updated
                  }
              }
          }

          this.AttendanceReport(attended, AttendyPersonId,"0");
          let data: any = (await this.storage.get("attendanceevents")) || [];
          //this.setBulkupdateStorage(this.eventAttend,"","","","")
          
      }
             
      }
      this.logger.CoachRadioButtonAttd_Mark("CoachRadioButtonAttd_Mark", {
        pram: Date.now(),
      });
    } 
    else 
    {
      this.storage.set("offline", 0);
      var attended;
      if (
        (Attendance == "" || Attendance == null || Attendance == 0) &&
        this.FunctionAccess.user_adminLevel != 4
      ) {
        attended = 1;
        this.AttendanceReport(attended, AttendyPersonId,"1");
        $(event.target).removeClass("AbsentCheckbox1");
        $(event.target).addClass("PresentCheckbox1");
      } else if (
        (Attendance == "" || Attendance == null || Attendance == 1) &&
        this.FunctionAccess.user_adminLevel != 4
      ) {
        attended = 2;
        $(event.target).removeClass("PresentCheckbox1");
        $(event.target).removeClass("AbsentCheckbox1");
        $(event.target).addClass("NoneCheckbox1");
        this.AttendanceReport(attended, AttendyPersonId,"1");
      } else if (
        (Attendance == "" || Attendance == null || Attendance == 2) &&
        this.FunctionAccess.user_adminLevel != 4
      ) {
        attended = 0;
        $(event.target).removeClass("PresentCheckbox1");
        $(event.target).removeClass("NoneCheckbox1");
        $(event.target).addClass("AbsentCheckbox1");
        this.AttendanceReport(attended, AttendyPersonId,"1");
      }
      this.logger.CoachRadioButtonAttd_Mark("CoachRadioButtonAttd_Mark", {
        pram: Date.now(),
      });
    }

    
   
  }
  AttendanceReport(attended, AttendyPersonId,status) {


    if(status=='0')
    {
      
     let payload={
      event_id :this.UpcomingSingleEvent.event_id,
      personId:AttendyPersonId,
      attended:attended,
      confirmed:"-1",
      reasondeclined:"-1",
      reasondeclined_by_coach:"-1",
      state_time:"",
      selectedTeam:this.selectedTeam

     }
     let existingIndex = this.singleplayerstatus.findIndex(item => 
      item.personId === payload.personId
    );
    
    if (existingIndex !== -1) {
      // If a duplicate exists, replace it with the new payload
      this.singleplayerstatus[existingIndex] = payload;
    } else {
      // If no duplicate, push the payload
      this.singleplayerstatus.push(payload);
    }

    console.log("singleplayerstatus",this.singleplayerstatus)

     this.setBulkupdateStorage("","",this.singleplayerstatus,"","")
    }
    else{
 
      let loginData4 = new HttpParams()
      .set("event_id", this.UpcomingSingleEvent.event_id)
      .set("personId", AttendyPersonId)
      .set("attended", attended)
      .set("confirmed", "-1")
      .set("reasondeclined", "-1")
      .set("reasondeclined_by_coach", "-1")
      .set("state_time", "")
      .set("selectedTeam", this.selectedTeam);

    this.http
      .post(
        this.global.APIURL + "events/saveSinglePlayersAttdStates",
        loginData4,
        { headers: this.global_api.getHeader() }
      )
      .subscribe(
        (data: any) => {
          if (data.SUCCESS) {
            this.AllPlayersLoad();
          }
        },
        (error) => {}
      );
    }

  
  }

  addEventToCalendar() {
    let calOptions = this.calendar.getCalendarOptions(); // grab the defaults
    let endDate = new Date(this.arrDetail[0].date_ended);
    endDate.setSeconds(endDate.getSeconds() + 10);
    let address = [];
    let addressName = " ";
    if (this.arrDetail[0].ground_address.length > 0) {
      address.push(this.arrDetail[0].ground_address);
    }
    if (this.arrDetail[0].ground_state.length > 0) {
      address.push(this.arrDetail[0].ground_state);
    }

    if (address.length > 0) {
      addressName = address.join(",");
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

    this.calendar
      .createEventWithOptions(
        this.arrDetail[0].name,
        addressName,
        this.arrDetail[0].event_notes,
        new Date(this.arrDetail[0].date_started),
        endDate,
        calOptions
      )
      .then(
        (msg) => {
          this.presentAlert("Success", "Event added to calendar.");
        },
        (err) => {
          this.presentAlert(
            "Error",
            "Problem in adding event to calendar. Please check the app permission settings."
          );
        }
      );
  }
  DisplaySeverityDetails(playerAilments) {
    console.log("playerAilments", playerAilments);
    this.ShowSeverityPage = true;
    let playerail = { ...playerAilments };
    if (this.OperooStatus == 1) {
      playerail.operooEnabled = true;
      this.getOperooData(playerAilments).then((data: any) => {
        console.log("operoodata", data);

        if (data && data.SUCCESS) {
          playerail.operooData = data.OPEROOINFO;
          this.OperooData = data.OPEROOINFO;
          if (playerail) {
            let SeverityModal = this.modalCtrl.create(
              "SeverityDetailsModalPage",
              { playerAilments: playerail }
            );
            SeverityModal.present();
          } else {
            this.presentToast("No Details found");
          }
        }
      });
    } else {
      if (playerail) {
        let SeverityModal = this.modalCtrl.create("SeverityDetailsModalPage", {
          playerAilments: playerail,
        });
        SeverityModal.present();
      } else {
        this.presentToast("No Details found");
      }
    }
  }

  MedicineInformation(data) {
    this.medicalInfo = true;
    let MedicineInfo = this.modalCtrl.create("MedicineInfoPage", {
      values: data,
    });
    MedicineInfo.present();
    MedicineInfo.onDidDismiss(() => {
      this.medicalInfo = false;
    });
  }

  presentAlert(Title, SubTitle) {
    let alert = this.Alert.create({
      title: Title,
      subTitle: SubTitle,
      buttons: ["Dismiss"],
    });
    alert.present(alert);
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "top",
    });
    toast.present();
  }

  openMap(address, state, latitude, longitude) {
    if (latitude != 0 && longitude != 0) {
      this.launchNavigator.navigate(latitude + ", " + longitude);
    } else if (address || state) {
      this.launchNavigator.navigate(address + ", " + state);
    } else {
      this.gFn.presentToast("Location undefined");
    }
  }

  //Welfare
  displayFunction() {
    return new Promise((resolve) => {
      let loginData4 = new HttpParams()
        .set("event_id", this.UpcomingSingleEvent.event_id)
        .set("clientSport", "team")
        .set("client_id", this.UpcomingSingleEvent.client_id)
        .set("club_id", this.PersonData?.CLUB_ID)
        .set("adminLevel", this.PersonData?.ADMINLEVEL)
        .set("selectedTeam", this.selectedTeam);

      this.http
        .post(this.global.APIURL + "events/getPlayersEvent", loginData4, {
          headers: this.global_api.getHeader(),
        })
        .subscribe(
          (data: any) => {
            this.WelfarePeopleDetail = data.GETPLAYERSEVENT;
            //console.log('data',data)
            resolve(true);
          },
          (error) => {
            //console.log(error);
          }
        );
    });
  }

  PlayerQuestion(Player_detail, event) {
    if (!this.medicalInfo) {
      if (this.ShowSeverityPage == false) {
        if (
          this.PersonData?.PERSON_ID == Player_detail.person_id ||
          this.FunctionAccess?.event_Welfare == "yes"
        ) {
          $(event.target)
            .closest(".event-card")
            .find(".well")
            .addClass("active");
          this.navCtrl
            .push("PlayerQuestionPage", { Player_detail: Player_detail })
            .then((x) => {
              $(event.target)
                .closest(".event-card")
                .find(".well")
                .removeClass("active");
            });
        }
      } else {
        this.ShowSeverityPage = false;
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
      } else {
        this.loader.dismiss();
      }
    });
  }

  loadPlayersVotedState() {
    return new Promise((resolve) => {
      let data = new HttpParams()
        .set("event_id", this.UpcomingSingleEvent.event_id)
        .set("team_id", this.selectedTeam)
        .set("client_id", this.UpcomingSingleEvent.client_id)
        .set("selectedTeam", this.selectedTeam)
        .set("club_id", this.PersonData?.CLUB_ID)
        .set("voter_id", this.PersonData?.PERSON_ID ?this.PersonData?.PERSON_ID:"" );

      this.http
        .post<any>(this.global.APIURL + "votes/getVotingPlayersEvent", data, {
          headers: this.global_api.getHeader(),
        })
        .subscribe(
          (response) => {
            if (response.SUCCESS) {
              let count = 0;
              for (let i = 0; i < response.GETVOTINGPLAYERSEVENT.length; i++) {
                if (
                  this.FunctionAccess &&
                  this.FunctionAccess.voting_for_player == "yes" &&
                  this.coachDetails[0].PERSON_ID ==
                    response.GETVOTINGPLAYERSEVENT[i].person_id
                ) {
                  this.coachDetails[0].voted =
                    response.GETVOTINGPLAYERSEVENT[i].voted;
                  continue;
                }
                this.players[count] = response.GETVOTINGPLAYERSEVENT[i];
                if (
                  this.players[count].vote1 == this.players[count].person_id
                ) {
                  this.vote1 = this.players[count].vote1;
                } else if (
                  this.players[count].vote2 == this.players[count].person_id
                ) {
                  this.vote2 = this.players[count].vote2;
                } else if (
                  this.players[count].vote3 == this.players[count].person_id
                ) {
                  this.vote3 = this.players[count].vote3;
                }
                count++;
              }
              resolve(true);
            }
          },
          (error) => {}
        );
    });
  }

 
  saveGameScore() {
    this.scoreHome = this.getPrefixedNumber(this.scoreHome);
    this.scoreAway = this.getPrefixedNumber(this.scoreAway);
    let loader = this.loadingCtrl.create({});
    loader.present();
    let data = new HttpParams()
      .set("event_id", this.event_id)
      .set("homescore", this.scoreHome)
      .set("awayscore", this.scoreAway);

    this.http
      .post<any>(this.global.APIURL + "events/saveGameScore", data, {
        headers: this.global_api.getHeader(),
      })
      .subscribe(
        (response) => {
          loader.dismiss();
          if (response.SUCCESS) {
            this.scoreIsUpdated = response.ISUPDATED;
            //this.presentToast("Game score saved.");
          } else {
            //this.presentToast("Sorry we couldn't save data");
          }
        },
        (error) => {
          loader.dismiss();
          //this.presentToast("Sorry we couldn't save data");
        }
      );
  }

  saveGameReport(isReport, isScoreSave = false) {
    if (typeof this.PersonData !== "undefined") {
      if (!isReport || (isReport && this.reportText.trim().length)) {
        let washout = "0";
        let forfeit = "0";
        if (this.gameDismissed == "washout") {
          washout = "1";
        } else if (this.gameDismissed == "forfeit") {
          forfeit = "1";
        }
        let data = new HttpParams()
          .set("event_id", this.event_id)
          .set(
            "reportHome",
            this.arrDetail[0].ishometeam ? this.reportText : ""
          )
          .set(
            "reportAway",
            !this.arrDetail[0].ishometeam ? this.reportText : ""
          )
          .set("person_id", this.PersonData?.PERSON_ID)
          .set("washout", washout)
          .set("forfeit", forfeit);

        this.http
          .post<any>(
            this.global.APIURL + "events/saveGameScoreReportByEvent",
            data,
            { headers: this.global_api.getHeader() }
          )
          .subscribe(
            (response) => {
              $(".btn-sm-black").removeClass("active");
              if (response.SUCCESS) {
                this.reportTextRowOpened = false;
                let msg = "Game data saved.";
                if (isReport) {
                  msg = isScoreSave
                    ? "Game score and report saved."
                    : "Game report saved.";
                  this.presentToast(msg);
                }
              } else {
                this.presentToast("Sorry we couldn't save report");
              }
            },
            (error) => {
              this.presentToast("Sorry we couldn't save report");
            }
          );
      } else {
        $(".btn-sm-black").removeClass("active");
        this.presentToast("Sorry couldn't save blank report");
      }
    }
  }

  gameDismissedChange(ev) {
    console.log(ev.target.value);
    if (
      (ev.target.value == "washout" && this.gameDismissed == "washout") ||
      (ev.target.value == "forfeit" && this.gameDismissed == "forfeit")
    ) {
      this.gameDismissed = "";
    } else {
      $(".radio").find(".sub-title").removeClass("HighLight");
      if (ev.target.value == "washout") {
        $(ev.target).closest(".radio").find(".Washout").addClass("HighLight");
      } else {
        $(ev.target).closest(".radio").find(".Forfeit").addClass("HighLight");
      }
      this.gameDismissed = ev.target.value;
    }

    this.saveGameReport(false);
  }

  saveVote(ev, person_id, ratings) {
    let v1: any = "";
    let v2: any = "";
    let v3: any = "";
    if (ratings == 1) {
      v1 = person_id;
      this.vote1 = person_id;
      v2 = "";
      v3 = "";
      if (this.vote2 == this.vote1) {
        this.vote2 = 0;
      } else if (this.vote3 == this.vote1) {
        this.vote3 = 0;
      }
    }
    if (ratings == 2) {
      v1 = "";
      v2 = person_id;
      this.vote2 = person_id;
      v3 = "";
      if (this.vote1 == this.vote2) {
        this.vote1 = 0;
      } else if (this.vote3 == this.vote2) {
        this.vote3 = 0;
      }
    }
    if (ratings == 3) {
      v1 = "";
      v2 = "";
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
      .set("event_id", this.event_id)
      .set("team_id", this.selectedTeam)
      .set("voter_id", this.PersonData?.PERSON_ID)
      .set("v3", this.vote3)
      .set("v2", this.vote2)
      .set("v1", this.vote1)
      .set("vote_baf_1", "")
      .set("vote_baf_2", "")
      .set("vote_baf_3", "")
      .set("season_id", this.PersonData.SEASON_ID);

    this.http
      .post<any>(this.global.APIURL + "votes/saveVotingPlayer", data, {
        headers: this.global_api.getHeader(),
      })
      .subscribe(
        (response) => {
          loader.dismiss();
          if (response.SUCCESS) {
            this.reportTextRowOpened = false;
            this.presentToast("Voting records saved.");
          } else {
            this.presentToast("Sorry we couldn't save data");
          }
        },
        (error) => {
          loader.dismiss();
          this.presentToast("Sorry we couldn't save data");
        }
      );
    if (v1 != "") {
      $(".vote1").removeClass("active");
    } else if (v2 != "") {
      $(".vote2").removeClass("active");
    } else if (v3 != "") {
      $(".vote3").removeClass("active");
    }
    $(ev.target.parentElement).find("a").removeClass("active");
    $(ev.target).addClass("active");
  }

  getPrefixedNumber(num) {
    if (typeof num == "undefined") {
      num = "0";
    } else if (num == "") {
      num = "0";
    } else {
      num = num.toString().replace(/^[0]+/, "");
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
    if (!this.medicalInfo && this.FunctionAccess.voting_for_player == "yes") {
      if (this.ShowSeverityPage == false) {
        if (this.FunctionAccess.voting_for_player == "yes") {
          this.activePlayer = playerID;
          setTimeout(() => {
            playerDetails = Object.keys(playerDetails).reduce(
              (c, k) => ((c[k.toLowerCase()] = playerDetails[k]), c),
              {}
            );
            this.navCtrl
              .push("VoteForPlayerPage", {
                playerDetails: playerDetails,
                event_id: this.event_id,
              })
              .then(() => {
                $(
                  ".tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon"
                ).css({
                  "mask-image": "url(../assets/images/menu/home.svg)",
                  height: "22px",
                  color: "#dedede",
                });
                this.gFn.hideMenuIcon();
              });
            this.activePlayer = "";
          }, 300);
        }
      } else {
        this.ShowSeverityPage = false;
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
    } else {
      $(".scroll-content").css("margin-bottom", "56px");
      this.gFn.showMenuIcon();
    }

    // console.log('The keyboard is open:', this.keyboard.isOpen());
  }
  inputFocus() {
    this.keyboardCheck();
  }

  inputBlur() {
    this.keyboardCheck();
  }

  saveGameScoreAndReport() {
    $(".btn-sm-black").addClass("active");
    if (this.scoreIsUpdated == 0 && this.reportText.trim().length) {
      this.saveGameScore();
    }
    this.saveGameReport(true, this.scoreIsUpdated == 0 ? true : false);
  }

  gotoAttendanceNote(personId) {
    let modal = this.modalCtrl.create(
      "EventAttendanceNotePage",
      {
        eventId: this.UpcomingSingleEvent.event_id,
        personId: personId,
        note: "",
      },
      { showBackdrop: true, enableBackdropDismiss: true }
    );
    modal.present();
  }

  tryAgain() {
    this.getDefaultDataLoad();
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad EventDashboardNewPage');
  // }
}

export interface operooInterface {
  emergencyContacts: Array<any>;
  schoolId: string;
  safetyAlerts: Array<any>;
  bloodGroup: string;
  WearsContacts: string;
  medicalContacts: Array<any>;
  swimmingAbility: string;
  paracetamolAllowed: string;
  wearsGlasses: string;
}
