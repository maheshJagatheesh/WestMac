import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { TabsPage } from '../tabs/tabs';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

@IonicPage()
@Component({
  
  selector: 'page-set-to-go',
  templateUrl: 'set-to-go.html',
})
export class SetToGoPage {
  private loggedInUserData: any;
  public bgThemeColor: string = '';
  UpcomingSingleEvent: any;
  timeoutID: any;
  seconds: number = 0;
  SSODetails: any = {};
  isAccessGet: boolean = false;
  refresh: boolean = true;
  authToken: any;
  mobileAssets: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public http: HttpClient,
    public global: GlobalProvider,
    public global_api: GlobalApiProvider) {

    this.storage.get("mobileAssets").then(
      res => {
        if (res) {
          this.mobileAssets = res;
        }
      });

    this.storage.get('loggedInUserData').then((val) => {
      this.loggedInUserData = val;
      // this.backgroundThemeColor();
      // this.bgThemeColor = this.loggedInUserData.THEME_BG;
      if (typeof (this.loggedInUserData.THEME_BG) != "undefined" && this.loggedInUserData.THEME_BG != null && this.loggedInUserData.THEME_BG != "") {
        if (this.loggedInUserData.THEME_BG == this.mobileAssets.Theme.theme_1 || this.loggedInUserData.THEME_BG == this.mobileAssets.Theme.theme_2)
          this.bgThemeColor = this.loggedInUserData.THEME_BG;
        else
          this.bgThemeColor = this.mobileAssets.Theme.theme_1;
      } else {
        this.bgThemeColor = this.mobileAssets.Theme.theme_1;
      }

      global_api.getUnreadMessageCount(val);
      if (typeof val.siblings != 'undefined') {
        let childIds = [];
        for (let i = 0; i < val.siblings.length; i++) {
          childIds.push(val.siblings[i].person_id.toString());
        }
        childIds.push(val.PERSON_ID.toString());
        this.storage.set('filterChild', childIds);
      }
    });

    this.storage.get('SSODetails').then((val) => {
      if (val == null) {
        this.SSODetails = '';
        console.log(this.SSODetails)
      }
      else {
        this.SSODetails = val
        console.log(this.SSODetails)
      }
    });
  }

  ionViewWillEnter() {
    this.storage.set('Refresh', this.refresh);
    setInterval(() => {
      if (this.seconds >= 0) {
        this.seconds++;
      }
      if (this.seconds == 1) {
        this.getNextEventDetails();
        this.storage.set('isSetUp', true);
      }
      
      else if (this.seconds > 1 && this.isAccessGet) {
        this.seconds = -1;
        clearInterval(null);
        if (this.SSODetails) {
          //  this.navCtrl.setRoot(TabsPage,{Player_menu:this.SSODetails.SHOWPLAYERSMENU==1?'yes':'no',Refresh:this.refresh});
          this.navCtrl.setRoot(TabsPage);
        }
        else {
          this.navCtrl.setRoot(TabsPage);
        }
      }
    }, 1000);
  }

  backgroundThemeColor() {
    switch (this.loggedInUserData.THEME_BG) {
      case "blue":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      case "red":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      case "yellow":
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

  getNextEventDetails() {
    console.log("set-to-go 104");
    let data = new HttpParams()
      .set('clientTimeZone', this.loggedInUserData.CLIENTTIMEZONE)
      .set('selectedTeam', this.loggedInUserData.SELECTEDTEAM)
      .set('person_id', this.loggedInUserData.PERSON_ID)
      .set('SEASON_ID', this.loggedInUserData.SEASON_ID)
      .set('nextEvent', '1')
      .set('filter', '1')
      .set('client_id', this.loggedInUserData.CLIENT_ID);

    this.http.post<any>(this.global.APIURL + 'events/getTeamEvents', data, { headers: this.global_api.getHeader() })
      .subscribe(response => {
        if (response.SUCCESS) {
          console.log("page no 117", response);
          if (response.GETTEAMEVENTS != "") {
            console.log("set-to-go 104  response.getteamevents == ''");

            var UpcomingSingleEvent: any = JSON.stringify(response.GETTEAMEVENTS[0])
            this.storage.set('UpcomingSingleEvent', UpcomingSingleEvent);
            this.UpcomingSingleEvent = JSON.parse(UpcomingSingleEvent)
            // console.log('response',UpcomingSingleEvent)
            this.loggedInUserData['EVENT_ID'] = response.GETTEAMEVENTS[0].event_id;
            this.loggedInUserData['EVENT_TYPE_ID'] = response.GETTEAMEVENTS[0].event_type_id;
            this.storage.set('loggedInUserData', this.loggedInUserData);
          } else {
            var UpcomingSingleEvent: any = {
              event_id: 0
            }
            this.storage.set('UpcomingSingleEvent', JSON.stringify(UpcomingSingleEvent));
          }
          this.getFunctionAccess(this.loggedInUserData.CLUB_DIVISION_ID);
          this.storage.get('setActivatedTeam').then((val) => {

            var data = JSON.parse(val)
            console.log(data)
            if (this.SSODetails && val != null) {
              this.getFunctionAccess(data.CLUB_DIVISION_ID_FK)
            }
          });
        }
      }, error => {
        console.log(error)
      });
  }
  getFunctionAccess(clubDivivionId) {
    let data = new HttpParams()
      .set('person_id', this.loggedInUserData.PERSON_ID)
      .set('client_id', this.loggedInUserData.CLIENT_ID)
      .set('club_division_id', clubDivivionId)

    this.http.post<any>(this.global.APIURL + 'users/getPersonAccess', data, { headers: this.global_api.getHeader() })
      .subscribe(response => {
        console.log("getting persion data", response);
        // this.loggedInUserData['TIMESHEETREVIEWER'] = (this.SSODetails.SHOWTIMESHEETMENU==1) ? response.TIMESHEETREVIEWER : false;
        // this.loggedInUserData['ISCONTRACTOR'] = (this.SSODetails.SHOWTIMESHEETMENU==1) ? response.ISCONTRACTOR : false;
        this.loggedInUserData['SHOWTIMESHEETMENU'] = this.SSODetails.SHOWTIMESHEETMENU==1 ? true : false;
        this.loggedInUserData['TIMESHEETREVIEWER'] = response.TIMESHEETREVIEWER ? true : false;
        this.loggedInUserData['ISCONTRACTOR'] = response.ISCONTRACTOR ? true : false;
        this.loggedInUserData['PAYROL'] = response.PAYROLL;
        this.storage.set('loggedInUserData', this.loggedInUserData);

        if (response.GETPERSONACCESS == 1) {
          var setData = {
            user_adminLevel: 1,
            event_StillComing: 'no',
            event_EventDetail: 'yes', //check
            event_EventDetail_checkbox: 'yes',
            event_BorrowPlayer: 'yes',
            event_NotifyPlayer: this.SSODetails.SHOWNOTIFYPLAYERMENU == 1 ? 'yes' : 'no', //check
            event_GroupMessage: this.SSODetails.SHOWGROUPMESSAGEMENU == 1 ? 'yes' : 'no', //check
            event_SessionPlan: 'yes but not now',
            event_Injury: this.SSODetails.SHOWINJURYMENU == 1 ? 'yes' : 'no', //check
            event_Transport: this.SSODetails.SHOWTRANSPORTMENU == 1 ? this.SSODetails.SHOWTRANSPORTMENU : 0,
            event_tab_Attendance: 'yes',
            event_tab_Overview: 'no',
            event_Welfare: this.SSODetails.SHOWWELFAREMENU == 1 ? 'yes' : 'no', //check
            event_Result: this.SSODetails.SHOWRESULTSMENU == 1 ? 'yes' : 'no',
            // event_result_321voting:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no',
            team_assigned: 'yes',
            player_coachingReport: 'yes',
            player_sms: 'yes',
            player_phone: 'yes',
            player_emergency_phone: 'yes',
            voting_for_player: this.SSODetails.SHOWMVPMENU == 1 ? 'yes' : 'no',
            game_report: 'yes',
            game_score: 'yes',
            bottom_player_menu: this.SSODetails.SHOWPLAYERSMENU == 1 ? 'yes' : 'no',
            bottom_chat_menu: this.SSODetails.SHOWCHATMENU == 1 ? 'yes' : 'no',
            profile_menu: this.SSODetails.profile_menu == 1 ? 'yes' : 'no',
            sec_absences_menu: this.SSODetails.SHOWSECABSENCEMENU == 1 ? 'yes' : 'no', //check
            session_assessment_menu: this.SSODetails.SHOWSESSIONASSESSMENTMENU == 1 ? 'yes' : 'no',
            // rsvp_menu:this.SSODetails.SHOWRSVPMENU==0?'yes':'no',
            // mvp_menu:this.SSODetails.SHOWMVPMENU==1?'yes':'no',  
            // medical_menu:this.SSODetails.SHOWMEDICALMENU==1?'yes':'no',
            HasMedicineReviewAccess: this.SSODetails.SHOWMEDICALMENU == 1 ? response.HASMEDICINEREVIEWACCESS : 0, //check
            showSurveyMenu: this.SSODetails.SHOWSURVEYMENU == 1 ? 'yes' : 'no',
          }
          this.storage.set('FunctionAccess', setData)
        }
        else if (response.GETPERSONACCESS == 2) {
          var setData1 = {
            user_adminLevel: 2,
            event_StillComing: 'no',
            event_EventDetail: 'yes',
            event_EventDetail_checkbox: 'yes',
            event_BorrowPlayer: 'yes',
            event_NotifyPlayer: this.SSODetails.SHOWNOTIFYPLAYERMENU == 1 ? 'yes' : 'no',
            event_GroupMessage: this.SSODetails.SHOWGROUPMESSAGEMENU == 1 ? 'yes' : 'no',
            event_SessionPlan: 'yes but not now',
            event_Injury: this.SSODetails.SHOWINJURYMENU == 1 ? 'yes' : 'no',
            event_Transport: this.SSODetails.SHOWTRANSPORTMENU == 1 ? this.SSODetails.SHOWTRANSPORTMENU : 0,
            event_tab_Attendance: 'yes',
            event_tab_Overview: 'no',
            event_Welfare: this.SSODetails.SHOWWELFAREMENU == 1 ? 'yes' : 'no',
            event_Result: this.SSODetails.SHOWRESULTSMENU == 1 ? 'yes' : 'no',
            // event_result_321voting:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no',
            team_assigned: 'yes',
            player_coachingReport: 'yes',
            player_sms: 'no',
            player_phone: 'yes',
            player_emergency_phone: 'yes',
            voting_for_player: this.SSODetails.SHOWMVPMENU == 1 ? 'yes' : 'no',
            game_report: 'yes',
            game_score: 'yes',
            bottom_player_menu: this.SSODetails.SHOWPLAYERSMENU == 1 ? 'yes' : 'no',
            bottom_chat_menu: this.SSODetails.SHOWCHATMENU == 1 ? 'yes' : 'no',
            profile_menu: this.SSODetails.profile_menu == 1 ? 'yes' : 'no',
            sec_absences_menu: this.SSODetails.SHOWSECABSENCEMENU == 1 ? 'yes' : 'no',
            session_assessment_menu: this.SSODetails.SHOWSESSIONASSESSMENTMENU == 1 ? 'yes' : 'no',
            // rsvp_menu:this.SSODetails.SHOWRSVPMENU==1?'yes':'no',
            // mvp_menu:this.SSODetails.SHOWMVPMENU==1?'yes':'no',
            //medical_menu:this.SSODetails.SHOWMEDICALMENU==1?'yes':'no',
            HasMedicineReviewAccess: this.SSODetails.SHOWMEDICALMENU == 1 ? response.HASMEDICINEREVIEWACCESS : 0,
            showSurveyMenu: this.SSODetails.SHOWSURVEYMENU == 1 ? 'yes' : 'no',
          }
          this.storage.set('FunctionAccess', setData1)
        }
        else if (response.GETPERSONACCESS == 3) {
          var setData2 = {
            user_adminLevel: 3,
            event_StillComing: 'no',
            event_EventDetail: 'yes',
            event_EventDetail_checkbox: 'yes',
            event_BorrowPlayer: 'yes',
            event_NotifyPlayer: this.SSODetails.SHOWNOTIFYPLAYERMENU == 1 ? 'yes' : 'no',
            event_GroupMessage: this.SSODetails.SHOWGROUPMESSAGEMENU == 1 ? 'yes' : 'no',
            event_SessionPlan: 'yes but not now',
            event_Injury: this.SSODetails.SHOWINJURYMENU == 1 ? 'yes' : 'no',
            event_Transport: this.SSODetails.SHOWTRANSPORTMENU == 1 ? this.SSODetails.SHOWTRANSPORTMENU : 0,
            event_tab_Attendance: 'yes',
            event_tab_Overview: 'no',
            event_Welfare: this.SSODetails.SHOWWELFAREMENU == 1 ? 'yes' : 'no',
            event_Result: this.SSODetails.SHOWRESULTSMENU == 1 ? 'yes' : 'no',
            team_assigned: 'yes',
            player_coachingReport: 'yes',
            player_sms: 'no',
            player_phone: 'yes',
            player_emergency_phone: 'yes',
            voting_for_player: this.SSODetails.SHOWMVPMENU == 1 ? 'yes' : 'no',
            game_report: 'yes',
            game_score: 'yes',
            bottom_player_menu: this.SSODetails.SHOWPLAYERSMENU == 1 ? 'yes' : 'no',
            bottom_chat_menu: this.SSODetails.SHOWCHATMENU == 1 ? 'yes' : 'no',
            profile_menu: this.SSODetails.profile_menu == 1 ? 'yes' : 'no',
            sec_absences_menu: this.SSODetails.SHOWSECABSENCEMENU == 1 ? 'yes' : 'no',
            session_assessment_menu: this.SSODetails.SHOWSESSIONASSESSMENTMENU == 1 ? 'yes' : 'no',
            HasMedicineReviewAccess: this.SSODetails.SHOWMEDICALMENU == 1 ? response.HASMEDICINEREVIEWACCESS : 0,
            showSurveyMenu: this.SSODetails.SHOWSURVEYMENU == 1 ? 'yes' : 'no',
          }
          this.storage.set('FunctionAccess', setData2)
        }
        // ALLOWTOVIEWOTHERPLAYERS
        else {
          var setData3 = {
            user_adminLevel: 4,
            event_StillComing: this.SSODetails.SHOWRSVPMENU == 1 ? 'yes' : 'no',
            event_EventDetail: this.SSODetails.SHOWRSVPMENU == 1 ? 'self' : 'no',
            event_EventDetail_checkbox: 'self',
            event_BorrowPlayer: 'no',
            event_NotifyPlayer: 'no',
            event_GroupMessage: 'no',
            event_SessionPlan: 'no',
            event_Injury: this.SSODetails.SHOWINJURYMENU == 1 ? 'self' : 'no',  //Done
            event_Transport: this.SSODetails.SHOWTRANSPORTMENU == 1 ? this.SSODetails.SHOWTRANSPORTMENU : 0,
            event_tab_Attendance: 'no',
            event_tab_Overview: 'yes',
            event_Welfare: this.SSODetails.SHOWWELFAREMENU == 1 ? 'self' : 'no', //Done
            event_Result: this.SSODetails.SHOWRESULTSMENU == 1 ? 'yes' : 'no',
            // event_result_321voting:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no',
            team_assigned: 'yes',
            player_coachingReport: 'yes',
            player_sms: 'yes',
            player_phone: 'yes',
            player_emergency_phone: 'yes',
            voting_for_player: this.SSODetails.SHOWMVPMENU == 1 ? 'self' : 'no',
            game_report: 'no',
            game_score: 'no',
            bottom_player_menu: this.SSODetails.SHOWPLAYERSMENU == 1 ? 'yes' : 'no',//New 
            bottom_chat_menu: this.SSODetails.SHOWCHATMENU == 1 ? 'yes' : 'no',//New  //Discuss
            profile_menu: this.SSODetails.profile_menu == 1 ? 'yes' : 'no',//New       //Discuss
            sec_absences_menu: this.SSODetails.SHOWSECABSENCEMENU == 1 ? 'yes' : 'no',//New //aaj //Done
            session_assessment_menu: this.SSODetails.SHOWSESSIONASSESSMENTMENU == 1 ? 'yes' : 'no',//New //Discuss
            view_other_players: this.SSODetails.ALLOWTOVIEWOTHERPLAYERS == 1 ? 'yes' : 'no',//New //Discuss
            //rsvp_menu:this.SSODetails.SHOWRSVPMENU==1?'yes':'no',//New
            // mvp_menu:this.SSODetails.SHOWMVPMENU==1?'yes':'no',
            //medical_menu:this.SSODetails.SHOWMEDICALMENU==1?'yes':'no',//New
            HasMedicineReviewAccess: this.SSODetails.SHOWMEDICALMENU == 1 ? response.HASMEDICINEREVIEWACCESS : 0,
            showSurveyMenu: this.SSODetails.SHOWSURVEYMENU == 1 ? 'yes' : 'no',
          }
          this.storage.set('FunctionAccess', setData3)
        }
        this.isAccessGet = true;
      }, error => {
        this.storage.set('FunctionAccess', '')
        this.isAccessGet = true;
      });
  }

}
