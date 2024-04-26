import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { TabsPage } from '../tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { EventHomePage } from '../event-home/event-home';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { GlobalApiProvider } from '../../providers/global-api/global-api';


@IonicPage()
@Component({
  selector: 'page-choose-team-profile',
  templateUrl: 'choose-team-profile.html',
})
export class ChooseTeamProfilePage {
  public chooseTeamFormProfile: FormGroup;
  private loggedInUserData: any;
  public selectTeam: string;
  public teamName: string;
  public lastPageName: string;
  public teams: any[] = [];
  public bgThemeColor: string = '';
  public clients: any[] = [];
  public seasons: any[] = [];
  public divisions: any[] = [];
  public seasonNames: any;
  public seasonNamesSchool: any = ['NA', 'Term 4', 'Term 1', 'Term 2', 'Term 3'];
  public seasonNamesNonSchool: any = ['NA', 'Summer', 'Autumn', 'Winter', 'Spring'];
  public client_id: any;
  public season_id: number;
  public divisionID: number;
  public defaultSelected: boolean;
  public IsParent: boolean;
  public IsPlayer: boolean;
  public siblings: any[] = [];
  public loggedInUserPersonId: number;
  public lblSeason: string = "Season";
  SSODetails:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: HttpClient, private storage: Storage, public events: Events, private loadingCtrl: LoadingController, public global: GlobalProvider, public statusBar: StatusBar,public global_api:GlobalApiProvider) {
    
    
    storage.get('loggedInUserData').then((val) => {
      this.loggedInUserData = val;
      this.selectTeam = val.SELECTEDTEAM;
      this.teamName = val.TEAM_NAME;
      this.client_id = val.CLIENT_ID;
      this.season_id = val.SEASON_ID;
      this.IsParent = val.ISPARENT == 1;
      this.IsPlayer = val.HAS_RECORD_IN_PLAYERHISTORY;
      this.siblings = val.siblings;
      this.loggedInUserPersonId = val.LOGGEDIN_USER_PERSON_ID;
      this.backgroundThemeColor();
      let keyboard = new Keyboard();
      keyboard.hideFormAccessoryBar(false);
    });

    this.chooseTeamFormProfile = this.formBuilder.group({
      default: new FormControl()
    });
    this.lastPageName = this.navCtrl.last().name;

    setTimeout(() => {
      if (this.IsParent) {
        this.changePerson($("#person").val());
      }
      else {
        this.getClients(this.loggedInUserData.PERSON_ID, '0');
      }
    }, 1000);

  }

  ionViewDidLoad() {
    
    let elements = document.querySelectorAll(".tabbar");

    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }
  }
  ionViewDidLeave() {
    let elements = document.querySelectorAll(".tabbar");

    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = '';
      });
    }
    this.statusBar.show();
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

  goToChooseTeam(teamIdName) {
    let loading = this.loadingCtrl.create();
    loading.present();
    let teamValue = teamIdName;
    teamValue = teamValue.toString().split('::');
    this.storage.get('SSODetails').then((val)=>{
      this.SSODetails=val
      console.log(this.SSODetails)
      this.getFunctionAccess(teamValue[0])
    })
    //this.getFunctionAccess(teamValue[0])
    let data = new HttpParams()
      .set('team_person_id', this.loggedInUserData.PERSON_ID)
      .set('club_division_id', teamValue[0])
      .set('team_name', teamValue[1])
      .set('client_id', this.client_id);
    this.http.post<any>(this.global.APIURL + 'teams/setActivatedTeamForHome', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        loading.dismiss();

        if (response.SUCCESS && response.SETACTIVATEDTEAMFORHOME) {
          let setActivatedTeam = this.events.publish('json:query', response.SETACTIVATEDTEAMFORHOME)[0][0];
          this.storage.set('setActivatedTeam', JSON.stringify(setActivatedTeam));
          this.selectTeam = teamValue[0];
          this.loggedInUserData['SELECTEDTEAM'] = teamValue[0];
          this.loggedInUserData['CLUB_DIVISION_ID'] = teamValue[0];
          this.loggedInUserData['SEASON_ID'] = this.season_id;
          this.loggedInUserData['CLIENT_ID'] = this.client_id;
          this.loggedInUserData['TIMESHEETREVIEWER'] = (setActivatedTeam && this.SSODetails.SHOWTIMESHEETMENU==1) ? setActivatedTeam.TIMESHEETREVIEWER : false;
          this.loggedInUserData['ISCONTRACTOR'] = (setActivatedTeam && this.SSODetails.SHOWTIMESHEETMENU==1) ? setActivatedTeam.ISCONTRACTOR : false;
          this.storage.set('loggedInUserData', this.loggedInUserData);
          this.storage.get('loggedInUserData').then((val) => {
            this.loggedInUserData = val;
          })
          this.getNextEventDetails()
        } else {
          alert('Error');
        }
      }, error => {
        loading.dismiss();
      });
  }


  goToChooseHomeImage() {
    this.navCtrl.push('SettingsHomeImagesPage');
  }

  goBack() {
    this.navCtrl.setRoot(TabsPage, this.navParams.data).then(() => {
      this.statusBar.show();
    });
  }
  gotoHome(teamIdName) {
    let teamValue = teamIdName;
    teamValue = teamValue.toString().split('::');
    this.storage.get('SSODetails').then((val)=>{
      this.SSODetails=val
      console.log(this.SSODetails)
      this.getFunctionAccess(teamValue[0])
    })
    //this.getFunctionAccess(teamValue[0])
    this.navCtrl.setRoot(EventHomePage, this.navParams.data).then(() => {
      this.statusBar.show();
    });
  }

  gotoHomeWithNoTeam(){
    this.loggedInUserData['SELECTEDTEAM'] = 0;
    this.loggedInUserData['SEASON_ID'] = 0;
    this.loggedInUserData['TEAM_ID'] = 0;
    this.loggedInUserData['TEAM_NAME'] = "";
    this.storage.set('loggedInUserData', this.loggedInUserData);
    let setActivatedTeam = {CLIENT_NAME:$('#client option:selected').text()};
    this.storage.set('setActivatedTeam', JSON.stringify(setActivatedTeam));
    this.navCtrl.setRoot(EventHomePage, this.navParams.data).then(() => {
      this.statusBar.show();
    });
  }

  getTeams(client_id, season_id, selectedTeam, divisionID) {
    this.teams = [];
    this.divisions = [];
    let loading = this.loadingCtrl.create();
    loading.present();
    let data = new HttpParams()
      .set('person_id', this.loggedInUserData.PERSON_ID)
      .set('client_id', client_id)
      .set('season_id', season_id)
      .set('selectedTeam', selectedTeam)
      .set('divisionID', divisionID);

    this.http.post<any>(this.global.APIURL + 'teams/getTeamsByClientSeason', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        loading.dismiss();
        if (response.SUCCESS) {
          let teams = response.GETTEAMSBYCLIENTSEASON;
          let divisions = response.GETTEAMSBYDIVISION;
          for (var key in divisions) {
            this.divisions.push(divisions[key]);
          }
          this.defaultSelected = false;
          for (var key in teams) {
            this.teams.push(teams[key]);
            if (!this.defaultSelected && this.selectTeam == teams[key].club_division_id) {
              this.defaultSelected = true;
            }
          }

          if (this.defaultSelected) {
            this.chooseTeamFormProfile = this.formBuilder.group({
              team: new FormControl(this.loggedInUserData.SELECTEDTEAM + '::' + this.loggedInUserData.TEAM_NAME, Validators.required)
            });
          } else if (teams.length) {
            this.chooseTeamFormProfile = this.formBuilder.group({
              team: new FormControl(teams[0].club_division_id + '::' + teams[0].team_name, Validators.required)
            });
          }

        } else {
          alert('Sorry no matching result found');
        }
      }, error => {
        loading.dismiss();
      });
  }

  getClients(person_id, client_id) {
    this.clients = [];
    let data = new HttpParams()
      .set('person_id', person_id)
      .set('client_id', client_id);

    this.http.post<any>(this.global.APIURL + 'teams/getClientsByPerson', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        if (response.SUCCESS) {
          let clients = response.GETCLIENTSBYPERSON;
          for (var key in clients) {
            this.clients.push(clients[key]);
          }
          if(this.IsParent && client_id == 0 && clients.length > 0){
            this.client_id = clients[0].client_id;
          }
          this.getSeasons((client_id == 0) ? this.client_id : client_id, null, (client_id == 0) ? true : false);
        }
      }, error => {

      });
  }

  getSeasons(client_id, season_id, isFirst) {
    season_id = season_id || this.loggedInUserData.SEASON_ID;
    this.fixSeasonsNames(client_id);
    this.seasons = [];
    let data = new HttpParams()
      .set('season_id', season_id)
      .set('client_id', client_id)
      .set('clientsport', this.loggedInUserData.CLIENTSPORT)
      .set('person_id',this.loggedInUserData.PERSON_ID)
      .set('selectedTeam',this.selectTeam);

    this.http.post<any>(this.global.APIURL + 'teams/getSeasonsByClient', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        if (response.SUCCESS) {
          let seasons = response.GETSEASONSBYCLIENT;
          let currentseason = seasons.filter(function(value,index) { return value.currentseason == 1; });
          let season_id = (currentseason.length) ? currentseason[0].season_id : seasons[seasons.length - 1].season_id;
          this.season_id = (isFirst && ! this.IsParent) ? this.loggedInUserData.SEASON_ID : season_id;
          this.getTeams(client_id, this.season_id, this.selectTeam, 0);
          for (var key in seasons) {
            if(seasons[key].season_id != 0){
              this.seasons.push(seasons[key]);
            }
          }
        }
      }, error => {

      });
  }

  changePerson(person_id) {
    this.loggedInUserData.PERSON_ID = person_id;

    if (person_id == this.loggedInUserPersonId) {
      this.loggedInUserData.FIRST_NAME = this.loggedInUserData.LOGGEDIN_USER_FIRST_NAME;
      this.loggedInUserData.LAST_NAME = this.loggedInUserData.LOGGEDIN_USER_LAST_NAME;
      this.loggedInUserData.PHOTOPATH =  this.loggedInUserData.LOGGEDIN_USER_PHOTOPATH;
      this.loggedInUserData.BARCODEIMAGE = this.loggedInUserData.LOGGEDIN_USER_BARCODEIMAGE;
      this.loggedInUserData.ISCHILD=0;
    }
    else {
      for (var i = 0; i < this.siblings.length; i++) {
        if (person_id == this.siblings[i].person_id) {
          this.loggedInUserData.FIRST_NAME = this.siblings[i].first_name;
          this.loggedInUserData.LAST_NAME = this.siblings[i].last_name;
          this.loggedInUserData.PHOTOPATH = this.siblings[i].photopath;
          this.loggedInUserData.BARCODEIMAGE = this.siblings[i].barcodeImage;
          this.loggedInUserData.ISCHILD=1;
          break;
        }
      }
    }
    this.storage.set('loggedInUserData', this.loggedInUserData);
    this.getClients(person_id, '0');
  }

  changeClient(client_id) {
    this.client_id = client_id;
    this.getSeasons(this.client_id, this.season_id, false);
  }

  changeSeason(season_id) {
    this.season_id = season_id;
    this.getTeams(this.client_id, this.season_id, this.selectTeam, 0);
  }

  changeDivision(divisionID) {
    this.divisionID = divisionID;
    this.getTeams(this.client_id, this.season_id, this.selectTeam, divisionID);
  }

  getFunctionAccess(club_division_id) {
    let data = new HttpParams()
      .set('person_id', this.loggedInUserData.PERSON_ID)
      .set('client_id', this.client_id)
      .set('club_division_id', club_division_id)


    this.http.post<any>(this.global.APIURL + 'users/getPersonAccess', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        if(response.GETPERSONACCESS==1){
          var setData={
            user_adminLevel:1,
            event_StillComing:'no',
            event_EventDetail:'yes', //check
            event_EventDetail_checkbox:'yes',
            event_BorrowPlayer:'yes',
            event_NotifyPlayer:this.SSODetails.SHOWNOTIFYPLAYERMENU==1?'yes':'no',
            event_GroupMessage:this.SSODetails.SHOWGROUPMESSAGEMENU==1?'yes':'no',
            event_SessionPlan:'yes but not now',
            event_Injury:this.SSODetails.SHOWINJURYMENU==1?'yes':'no', //check
            event_Transport:this.SSODetails.SHOWTRANSPORTMENU==1?this.SSODetails.SHOWTRANSPORTMENU:0,
            event_tab_Attendance:'yes',
            event_tab_Overview:'no',
            event_Welfare:this.SSODetails.SHOWWELFAREMENU==1?'yes':'no', //check
            event_Result:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no', 
            // event_result_321voting:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no',
            team_assigned:'yes',
            player_coachingReport:'yes',
            player_sms:'yes',
            player_phone:'yes',
            player_emergency_phone:'yes',
            voting_for_player: this.SSODetails.SHOWMVPMENU==1?'yes':'no',
            game_report: 'yes',
            game_score: 'yes',
            bottom_player_menu:this.SSODetails.SHOWPLAYERSMENU==1?'yes':'no',
            bottom_chat_menu:this.SSODetails.SHOWCHATMENU==1?'yes':'no',
            profile_menu:this.SSODetails.profile_menu==1?'yes':'no',
            sec_absences_menu:this.SSODetails.SHOWSECABSENCEMENU==1?'yes':'no', //check
            session_assessment_menu:this.SSODetails.SHOWSESSIONASSESSMENTMENU==1?'yes':'no',
            // rsvp_menu:this.SSODetails.SHOWRSVPMENU==0?'yes':'no',
            // mvp_menu:this.SSODetails.SHOWMVPMENU==1?'yes':'no', 
            // medical_menu:this.SSODetails.SHOWMEDICALMENU==1?'yes':'no',
            HasMedicineReviewAccess:this.SSODetails.SHOWMEDICALMENU==1?response.HASMEDICINEREVIEWACCESS:0, //check
            showSurveyMenu:this.SSODetails.SHOWSURVEYMENU==1?'yes':'no',
          }
          this.storage.set('FunctionAccess',setData)
        }
        else if(response.GETPERSONACCESS==2){
          var setData1={
            user_adminLevel:2,
            event_StillComing:'no',
            event_EventDetail:'yes',
            event_EventDetail_checkbox:'yes',
            event_BorrowPlayer:'yes',
            event_NotifyPlayer:this.SSODetails.SHOWNOTIFYPLAYERMENU==1?'yes':'no',
            event_GroupMessage:this.SSODetails.SHOWGROUPMESSAGEMENU==1?'yes':'no',
            event_SessionPlan:'yes but not now',
            event_Injury:this.SSODetails.SHOWINJURYMENU==1?'yes':'no',
            event_Transport:this.SSODetails.SHOWTRANSPORTMENU==1?this.SSODetails.SHOWTRANSPORTMENU:0,
            event_tab_Attendance:'yes',
            event_tab_Overview:'no',
            event_Welfare:this.SSODetails.SHOWWELFAREMENU==1?'yes':'no',
            event_Result:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no', 
            // event_result_321voting:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no',
            team_assigned:'yes',
            player_coachingReport:'yes',
            player_sms:'no',
            player_phone:'yes',
            player_emergency_phone:'yes',
            voting_for_player: this.SSODetails.SHOWMVPMENU==1?'yes':'no',
            game_report: 'yes',
            game_score: 'yes',
            bottom_player_menu:this.SSODetails.SHOWPLAYERSMENU==1?'yes':'no',
            bottom_chat_menu:this.SSODetails.SHOWCHATMENU==1?'yes':'no',
            profile_menu:this.SSODetails.profile_menu==1?'yes':'no',
            sec_absences_menu:this.SSODetails.SHOWSECABSENCEMENU==1?'yes':'no',
            session_assessment_menu:this.SSODetails.SHOWSESSIONASSESSMENTMENU==1?'yes':'no',
            // rsvp_menu:this.SSODetails.SHOWRSVPMENU==1?'yes':'no',
            // mvp_menu:this.SSODetails.SHOWMVPMENU==1?'yes':'no',
            //medical_menu:this.SSODetails.SHOWMEDICALMENU==1?'yes':'no',
            HasMedicineReviewAccess:this.SSODetails.SHOWMEDICALMENU==1?response.HASMEDICINEREVIEWACCESS:0,
            showSurveyMenu:this.SSODetails.SHOWSURVEYMENU==1?'yes':'no',
          }
          this.storage.set('FunctionAccess',setData1)
        }
        else if(response.GETPERSONACCESS==3){
          var setData2={
            user_adminLevel:3,
            event_StillComing:'no',
            event_EventDetail:'yes',
            event_EventDetail_checkbox:'yes',
            event_BorrowPlayer:'yes',
            event_NotifyPlayer:this.SSODetails.SHOWNOTIFYPLAYERMENU==1?'yes':'no',
            event_GroupMessage:this.SSODetails.SHOWGROUPMESSAGEMENU==1?'yes':'no',
            event_SessionPlan:'yes but not now',
            event_Injury:this.SSODetails.SHOWINJURYMENU==1?'yes':'no',
            event_Transport:this.SSODetails.SHOWTRANSPORTMENU==1?this.SSODetails.SHOWTRANSPORTMENU:0,
            event_tab_Attendance:'yes',
            event_tab_Overview:'no',
            event_Welfare:this.SSODetails.SHOWWELFAREMENU==1?'yes':'no',
            event_Result:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no', 
            // event_result_321voting:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no',
            team_assigned:'yes',
            player_coachingReport:'yes',
            player_sms:'no',
            player_phone:'yes',
            player_emergency_phone:'yes',
            voting_for_player: this.SSODetails.SHOWMVPMENU==1?'yes':'no',
            game_report: 'yes',
            game_score: 'yes',
            bottom_player_menu:this.SSODetails.SHOWPLAYERSMENU==1?'yes':'no',
            bottom_chat_menu:this.SSODetails.SHOWCHATMENU==1?'yes':'no',
            profile_menu:this.SSODetails.profile_menu==1?'yes':'no',
            sec_absences_menu:this.SSODetails.SHOWSECABSENCEMENU==1?'yes':'no',
            session_assessment_menu:this.SSODetails.SHOWSESSIONASSESSMENTMENU==1?'yes':'no',
            //rsvp_menu:this.SSODetails.SHOWRSVPMENU==1?'yes':'no',
            // mvp_menu:this.SSODetails.SHOWMVPMENU==1?'yes':'no',
            //medical_menu:this.SSODetails.SHOWMEDICALMENU==1?'yes':'no',
            HasMedicineReviewAccess:this.SSODetails.SHOWMEDICALMENU==1?response.HASMEDICINEREVIEWACCESS:0,
            showSurveyMenu:this.SSODetails.SHOWSURVEYMENU==1?'yes':'no',
          }
          this.storage.set('FunctionAccess',setData2)
        }
        else {
          var setData3={
            user_adminLevel:4,
            event_StillComing:this.SSODetails.SHOWRSVPMENU==1?'yes':'no',
            event_EventDetail:this.SSODetails.SHOWRSVPMENU==1?'self':'no',
            event_EventDetail_checkbox:'self',
            event_BorrowPlayer:'no',
            event_NotifyPlayer:'no',
            event_GroupMessage:'no',
            event_SessionPlan:'no',
            event_Injury:this.SSODetails.SHOWINJURYMENU==1?'self':'no',  //Done
            event_Transport:this.SSODetails.SHOWTRANSPORTMENU==1?this.SSODetails.SHOWTRANSPORTMENU:0,
            event_tab_Attendance:'no',
            event_tab_Overview:'yes',
            event_Welfare:this.SSODetails.SHOWWELFAREMENU==1?'self':'no', //Done
            event_Result:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no', 
            // event_result_321voting:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no',
            team_assigned:'yes',
            player_coachingReport:'yes',
            player_sms:'yes',
            player_phone:'yes',
            player_emergency_phone:'yes',
            voting_for_player: this.SSODetails.SHOWMVPMENU==1?'self':'no',
            game_report: 'no',
            game_score: 'no',
            bottom_player_menu:this.SSODetails.SHOWPLAYERSMENU==1?'yes':'no',//New 
            bottom_chat_menu:this.SSODetails.SHOWCHATMENU==1?'yes':'no',//New  //Discuss
            profile_menu:this.SSODetails.profile_menu==1?'yes':'no',//New       //Discuss
            sec_absences_menu:this.SSODetails.SHOWSECABSENCEMENU==1?'yes':'no',//New //aaj //Done
            session_assessment_menu:this.SSODetails.SHOWSESSIONASSESSMENTMENU==1?'yes':'no',//New //Discuss
            //rsvp_menu:this.SSODetails.SHOWRSVPMENU==1?'yes':'no',//New
            // mvp_menu:this.SSODetails.SHOWMVPMENU==1?'yes':'no',
            //medical_menu:this.SSODetails.SHOWMEDICALMENU==1?'yes':'no',//New
            HasMedicineReviewAccess:this.SSODetails.SHOWMEDICALMENU==1?response.HASMEDICINEREVIEWACCESS:0,
            showSurveyMenu:this.SSODetails.SHOWSURVEYMENU==1?'yes':'no',
          }
          this.storage.set('FunctionAccess',setData3)
        }
        
      }, error => {
        this.storage.set('FunctionAccess', '')
      });
  }
  getNextEventDetails() {
    this.storage.get('loggedInUserData').then((val) => {

      var loggedInUserData = val
      let data = new HttpParams()
        .set('clientTimeZone', loggedInUserData.CLIENTTIMEZONE)
        .set('selectedTeam', loggedInUserData.SELECTEDTEAM)
        .set('person_id', loggedInUserData.PERSON_ID)
        .set('SEASON_ID', loggedInUserData.SEASON_ID)
        .set('nextEvent', '1')
        .set('filter', '1')
        .set('client_id', loggedInUserData.CLIENT_ID);

      this.http.post<any>(this.global.APIURL + 'events/getTeamEvents', data,{headers:this.global_api.getHeader()})
        .subscribe(response => {

          if (response.SUCCESS) {

            if (response.GETTEAMEVENTS != "") {
              var UpcomingSingleEvent: any = JSON.stringify(response.GETTEAMEVENTS[0])
              this.storage.set('UpcomingSingleEvent', UpcomingSingleEvent);

            }
          }
        }, error => {
        });
    })
  }

  fixSeasonsNames(client_id) {
    this.seasonNames = this.seasonNamesNonSchool;
    for (var i = 0; i < this.clients.length; i++) {
      if (this.clients[i].client_id == client_id) {
        this.seasonNames = (this.clients[i].is_school == 1) ? this.seasonNamesSchool : this.seasonNamesNonSchool;
        this.lblSeason = (this.clients[i].is_school == 1) ? "Term" : "Season";
        break;
      }
    }
  }

}
