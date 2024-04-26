import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController,
  Keyboard,
  App,
  AlertController,
  ModalController,
  Platform,
} from "ionic-angular";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Storage } from "@ionic/storage";
import { GlobalProvider } from "../../providers/global/global";
import { GlobalFunctionsProvider } from "../../providers/global-functions/global-functions";
import { Calendar } from "@ionic-native/calendar/ngx";
import {
  LaunchNavigator,
  LaunchNavigatorOptions,
} from "@ionic-native/launch-navigator/ngx";
import { GlobalApiProvider } from "../../providers/global-api/global-api";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@IonicPage()
@Component({
  selector: "page-events-results",
  templateUrl: "events-results.html",
})
export class EventsResultsPage {
  players: any = [];
  private loader: any;
  event_id: string;
  clientTimeZone: string;
  event_type_id: string;
  reportTextRowOpened: boolean = false;
  loggedInUserData: any;
  scoreHome: string = "0";
  scoreAway: string = "0";
  scoreHomePrev: string = "0";
  scoreAwayPrev: string = "0";
  gameDismissed: string = "";
  reportText: string = "";
  UpcomingSingleEvent: any;
  arrDetail: any = [];
  key: any;
  date: any;
  FunctionAccess: any;
  vote1: any = "";
  vote2: any = "";
  vote3: any = "";
  activePlayer: any = "";
  voteSuccess: boolean = false;
  voteForPlayerId: string = "";
  BackButton: any = false;
  coachDetails: any = [];
  homeAwayText: string = "";
  interval: any;
  showEvent = false;
  groundAdress: any = "";
  groundState: any = "";
  latitude: any = "";
  longitude = "";
  ShowSeverityPage: boolean = false;
  timer: any;
  scoreIsUpdated: number = 0;
  touched: boolean = false;
  previousHomeScore: any;
  previousAwayScore: any;
  score: boolean = false;


  medicalInfo: any = false;
  titleHide: any;
  input_disable: any;

  simpleHomeScore: string = "0";
  tier2HomeScore: string = "0";
  tier3HomeScore: string = "0";

  simpleAwayScore: string = "0";
  tier2AwayScore: string = "0";
  tier3AwayScore: string = "0";

  homeEventFlag: boolean = false;
  awayEventFlag: boolean = false;

  constructor(
    public navCtrl: NavController,
    public keyboard: Keyboard,
    public navParams: NavParams,
    public app: App,
    public http: HttpClient,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public global: GlobalProvider,
    private storage: Storage,
    private plt: Platform,
    private toastCtrl: ToastController,
    public gFn: GlobalFunctionsProvider,
    private calendar: Calendar,
    private launchNavigator: LaunchNavigator,
    private Alert: AlertController,
    public global_api: GlobalApiProvider
  ) {
    plt.ready().then(() => {
      plt.registerBackButtonAction(() => {
        this.navCtrl.pop();
      });
    });

    this.voteSuccess = navParams.get("success");
    this.voteForPlayerId = navParams.get("personId");
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
  }

  inputFocus() {
    this.touched = true;
    this.keyboardCheck();
  }

  inputBlur() {
    this.keyboardCheck();
  }

  ionViewDidLeave() {
    /* if (!this.showEvent) {
      $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({
        'mask-image': '',
        'height': '',
        'color': ''
      })
      $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({
        'mask-image': '',
        'height': '',
        'color': ''
      })
      $('.tabs .tab-button[aria-selected=true]:nth-child(2)').attr('aria-selected', 'false')
    } */
  }

  ionViewDidLoad() {
    // this.storage.get('EventDetails').then((val)=>{
    // 	this.arrDetail=val

    //   })
    this.storage.get("FunctionAccess").then((val) => {
      this.FunctionAccess = val;
      if (val && val.game_report == "yes") {
        this.reportTextRowOpened = true;
      }
    });
    this.storage.get("BackButton").then((val) => {
      this.BackButton = val;
    });

    this.storage.get("loggedInUserData").then((val) => {
      this.loggedInUserData = val;
      this.coachDetails[0] = val;

      this.clientTimeZone = this.loggedInUserData.CLIENTTIMEZONE;
      this.storage.get("UpcomingSingleEvent").then((val2) => {
        this.UpcomingSingleEvent = JSON.parse(val2);
        this.event_id = this.UpcomingSingleEvent.event_id;
        this.event_type_id = this.UpcomingSingleEvent.event_type_id;
        this.loadDataFromAPIs();

        this.loader = this.loadingCtrl.create({});
        this.loader.present();
      });
    });
  }

  goToChooseTeamsPage() {
    this.navCtrl.push("ChooseTeamProfilePage");
  }
  gotoAttandance() {
    this.gFn.gotoAttandance();
    this.showEvent = true;
  }
  gotoWelfare() {
    this.gFn.gotoWelfare();
    this.showEvent = true;
  }

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
      let selectedTeam = this.loggedInUserData.SELECTEDTEAM;
      if (
        this.UpcomingSingleEvent.event_type_id == 2 &&
        this.UpcomingSingleEvent.teamid
      ) {
        selectedTeam = this.UpcomingSingleEvent.teamid;
      } else if (this.UpcomingSingleEvent.event_type_id == 1) {
        if (
          this.UpcomingSingleEvent.homeclubid == this.loggedInUserData.CLUB_ID
        ) {
          selectedTeam = this.UpcomingSingleEvent.hometeam;
        } else {
          selectedTeam = this.UpcomingSingleEvent.awayteam;
        }
      }

      let data = new HttpParams()
        .set("event_id", this.UpcomingSingleEvent.event_id)
        .set("team_id", selectedTeam)
        .set("client_id", this.UpcomingSingleEvent.client_id)
        .set("selectedTeam", selectedTeam)
        .set("club_id", this.loggedInUserData.CLUB_ID)
        .set("voter_id", this.loggedInUserData.PERSON_ID);

      this.http
        .post<any>(this.global.APIURL + "votes/getVotingPlayersEvent", data, {
          headers: this.global_api.getHeader(),
        })
        .subscribe(
          (response) => {
            if (response.SUCCESS) {
              this.titleHide = response.SUCCESS;
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
          (error) => { }
        );
    });
  }

  getEventDetails() {
    let selectedTeam = this.loggedInUserData.SELECTEDTEAM;
    if (
      this.UpcomingSingleEvent.event_type_id == 2 &&
      this.UpcomingSingleEvent.teamid
    ) {
      selectedTeam = this.UpcomingSingleEvent.teamid;
    } else if (this.UpcomingSingleEvent.event_type_id == 1) {
      if (
        this.UpcomingSingleEvent.homeclubid == this.loggedInUserData.CLUB_ID
      ) {
        selectedTeam = this.UpcomingSingleEvent.hometeam;
      } else {
        selectedTeam = this.UpcomingSingleEvent.awayteam;
      }
    }
    return new Promise((resolve) => {
      let loginData = new HttpParams()
        .set("event_id", this.UpcomingSingleEvent.event_id)
        .set("event_type_id", this.UpcomingSingleEvent.event_type_id)
        .set("clientTimeZone", this.loggedInUserData.CLIENTTIMEZONE)
        .set("selectedTeam", selectedTeam)
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

            for (let keys of this.arrDetail) {
              this.key = keys;
              this.date = this.key.date.split("/")[0];
              this.groundAdress = this.key.ground_address;
              this.groundState = this.key.ground_state;
              this.longitude = this.key.geoloc_longitude;
              this.latitude = this.key.geoloc_latitude;
              this.input_disable = this.key.canScore;
            }

            if (response.GETEVENTDETAILS.length > 0) {
              console.log("response.GETEVENTDETAILS[0]",response.GETEVENTDETAILS[0]["isUpdated"]);
              
              this.scoreIsUpdated = response.GETEVENTDETAILS[0]["isUpdated"];
              this.previousHomeScore = this.getPrefixedNumberUpdate(response.GETEVENTDETAILS[0]["simpleHomeScore"]);

              this.previousAwayScore = this.getPrefixedNumberUpdate(response.GETEVENTDETAILS[0]["simpleAwayScore"]);

              this.simpleHomeScore = this.getPrefixedNumber(
                response.GETEVENTDETAILS[0]["simpleHomeScore"]
              );

              this.tier2HomeScore = this.getPrefixedNumber(
                response.GETEVENTDETAILS[0]["tier2HomeScore"]
              );
              this.tier3HomeScore = this.getPrefixedNumber(
                response.GETEVENTDETAILS[0]["tier3HomeScore"]
              );

              this.simpleAwayScore = this.getPrefixedNumber(
                response.GETEVENTDETAILS[0]["simpleAwayScore"]
              );
              this.tier2AwayScore = this.getPrefixedNumber(
                response.GETEVENTDETAILS[0]["tier2AwayScore"]
              );
              this.tier3AwayScore = this.getPrefixedNumber(
                response.GETEVENTDETAILS[0]["tier3AwayScore"]
              );
              // this.scoreHome = this.getPrefixedNumber(response.GETEVENTDETAILS[0]["homescore"]);
              // this.scoreAway = this.getPrefixedNumber(response.GETEVENTDETAILS[0]["awayscore"]);
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
          (error) => { }
        );
    });
  }

  backArrow() {
    this.navCtrl.pop();
    /* this.app.getRootNav().getActiveChildNav().select(1).then(() => {
      $('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected', 'true')
    }); */
  }

  saveGameScore() {
    /* if(this.arrDetail[0]['scoreType'] == '2'){
      this.scoreHome = this.getPrefixedNumber(this.simpleHomeScore);
      this.scoreAway = this.getPrefixedNumber(this.simpleAwayScore);
    }else{
      this.scoreHome = this.getPrefixedNumber(this.scoreHome);
        this.scoreAway = this.getPrefixedNumber(this.scoreAway);
    } */

    this.scoreHome = this.getPrefixedNumber(this.simpleHomeScore);
    this.scoreAway = this.getPrefixedNumber(this.simpleAwayScore);
    let loader = this.loadingCtrl.create({});
    loader.present();
    let data = new HttpParams()
      .set("event_id", this.event_id)
      .set("homescore", this.scoreHome)
      .set("awayscore", this.scoreAway)
      .set("tier2homeScore", this.tier2HomeScore)
      .set("tier2AwayScore", this.tier2AwayScore)
      .set("tier3homeScore", this.tier3HomeScore)
      .set("tier3AwayScore", this.tier3AwayScore);

    this.http
      .post<any>(this.global.APIURL + "events/saveGameScore", data)
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

  //   && this.reportText.trim().length

  saveGameReport(isReport, isScoreSave = false) {
    if (typeof this.loggedInUserData !== "undefined") {
      if (!isReport || isReport) {
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
          .set("person_id", this.loggedInUserData.PERSON_ID)
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
                  //msg = isScoreSave
                  // ? "Game score and report saved."
                  // : "Game report saved.";
                  if (this.reportText != "" && this.score == true) {

                    msg = "Game score and report saved."
                  }

                  else if (this.reportText != "" && this.score == false) {

                    msg = "Game report saved."
                  }
                  else if (this.score == true) {

                    "Game score saved."
                  }
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
    let selectedTeam = this.loggedInUserData.SELECTEDTEAM;
    if (
      this.UpcomingSingleEvent.event_type_id == 2 &&
      this.UpcomingSingleEvent.teamid
    ) {
      selectedTeam = this.UpcomingSingleEvent.teamid;
    } else if (this.UpcomingSingleEvent.event_type_id == 1) {
      if (
        this.UpcomingSingleEvent.homeclubid == this.loggedInUserData.CLUB_ID
      ) {
        selectedTeam = this.UpcomingSingleEvent.hometeam;
      } else {
        selectedTeam = this.UpcomingSingleEvent.awayteam;
      }
    }

    let data = new HttpParams()
      .set("event_id", this.event_id)
      .set("team_id", selectedTeam)
      .set("voter_id", this.loggedInUserData.PERSON_ID)
      .set("v3", this.vote3)
      .set("v2", this.vote2)
      .set("v1", this.vote1)
      .set("vote_baf_1", "")
      .set("vote_baf_2", "")
      .set("vote_baf_3", "")
      .set("season_id", this.loggedInUserData.SEASON_ID);

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
  getPrefixedNumberUpdate(num) {
    if (typeof num == "undefined") {
      num = "0";
    } else {
      num = num.toString().replace(/^[0]+/, "");
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

  DisplaySeverityDetails(playerAilments) {
    this.ShowSeverityPage = true;
    if (playerAilments) {
      let SeverityModal = this.modalCtrl.create("SeverityDetailsModalPage", {
        playerAilments: playerAilments,
      });
      SeverityModal.present();
    } else {
      this.presentToast("No Details found");
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

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "top",
    });
    toast.present();
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

  presentAlert(Title, SubTitle) {
    let alert = this.Alert.create({
      title: Title,
      subTitle: SubTitle,
      buttons: ["Dismiss"],
    });
    alert.present(alert);
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
  //   && this.reportText.trim().length
  saveGameScoreAndReport() {
    $(".btn-sm-black").addClass("active");
    
    if (this.scoreIsUpdated == 0) {
      //if (this.homeEventFlag || this.awayEventFlag || (this.arrDetail[0]['scoreType'] == '3' && this.simpleHomeScore  ) ) {
        this.score = true;
        this.saveGameScore();
     // }
    }
    this.saveGameReport(true, this.scoreIsUpdated == 0 ? true : false);
  }

  onInputChange(event: any): void {
    this.homeEventFlag = event.target.value ? true : false;

  }
  onAwayChange(event: any): void {
    this.awayEventFlag = event.target.value ? true : false;

  }

}
