import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the ChooseTeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose-team',
  templateUrl: 'choose-team.html',
})
export class ChooseTeamPage {
  private chooseTeamForm: FormGroup;
  private loggedInUserData: any;
  public selectTeam: string;
  public teamName: string;
  public teams: any[] = [];
  public bgThemeColor: string = '';
  public clients: any[] = [];
  public seasons: any[] = [];
  public divisions: any[] = [];
  public seasonNames: any;
  public seasonNamesSchool: any = ['NA', 'Term 4', 'Term 1', 'Term 2', 'Term 3'];
  public seasonNamesNonSchool: any = ['NA', 'Summer', 'Autumn', 'Winter', 'Spring'];
  public client_id: number;
  public season_id: number;
  public divisionID: number = 0;
  public defaultSelected: boolean;
  public IsParent: boolean;
  public IsPlayer: boolean;
  public siblings: any[] = [];
  public loggedInUserPersonId: number;
  public lblSeason: string = "";
  ClubDetails:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: HttpClient, private storage: Storage, public events: Events, private loadingCtrl: LoadingController, public global: GlobalProvider, public gFn: GlobalFunctionsProvider,public global_api:GlobalApiProvider) {
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
      gFn.hideFormAccessoryBar();
    });
    this.storage.get('SSODetails').then((val)=>{
      this.ClubDetails=val
      console.log(this.ClubDetails)
     
    })

    this.chooseTeamForm = this.formBuilder.group({
      default: new FormControl()
    });

    setTimeout(() => {
      if (this.IsParent) {
        this.changePerson($("#person").val());
      }
      else {
        this.getClients(this.loggedInUserData.PERSON_ID, '0');
      }
    }, 500);
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
    let teamValue = teamIdName;// this.chooseTeamForm.value.team
    teamValue = teamValue.toString().split('::');

    let data = new HttpParams()
      .set('team_person_id', this.loggedInUserData.PERSON_ID)
      .set('club_division_id', teamValue[0])
      .set('team_name', teamValue[1])
      .set('client_id', this.client_id.toString());
    this.http.post<any>(this.global.APIURL + 'teams/setActivatedTeamForHome', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        loading.dismiss();

        if (response.SUCCESS && response.SETACTIVATEDTEAMFORHOME) {
          let setActivatedTeam = this.events.publish('json:query', response.SETACTIVATEDTEAMFORHOME)[0][0];
          console.log(setActivatedTeam)
          this.storage.set('setActivatedTeam', JSON.stringify(setActivatedTeam));
          this.selectTeam = teamValue[0];
          this.loggedInUserData['SELECTEDTEAM'] = teamValue[0];
          this.loggedInUserData['SEASON_ID'] = this.season_id;
          this.loggedInUserData['CLIENT_ID'] = this.client_id;
          this.loggedInUserData['DIVISION_ID'] = this.divisionID;
          this.loggedInUserData['TIMESHEETREVIEWER'] = (setActivatedTeam && this.ClubDetails.SHOWTIMESHEETMENU==1) ? setActivatedTeam.TIMESHEETREVIEWER : false;
          this.loggedInUserData['ISCONTRACTOR'] = (setActivatedTeam && this.ClubDetails.SHOWTIMESHEETMENU==1) ? setActivatedTeam.ISCONTRACTOR : false;
          console.log(this.loggedInUserData)
          this.storage.set('loggedInUserData', this.loggedInUserData);

        } else {
          alert('Error');
        }
      }, error => {
        loading.dismiss();
      });

  }


  goToChooseHomeImage() {
    if(this.loggedInUserData.HOMESCREEN_BG != ""){
      this.navCtrl.push('SetToGoPage', {}, {animation: 'ios-transition'});
    }else{
      this.navCtrl.push('ChooseHomeImagePage', {}, {animation: 'ios-transition'});
    }
  }

  goToChooseHomeImageWithNoTeam() {
    this.loggedInUserData['SELECTEDTEAM'] = 0;
    this.loggedInUserData['SEASON_ID'] = 0;
    this.loggedInUserData['TEAM_ID'] = 0;
    this.loggedInUserData['DIVISION_ID'] = 0;
    this.loggedInUserData['TEAM_NAME'] = "";
    this.storage.set('loggedInUserData', this.loggedInUserData);
    let setActivatedTeam = {CLIENT_NAME:$('#client option:selected').text()};
    this.storage.set('setActivatedTeam', JSON.stringify(setActivatedTeam));
    this.goToChooseHomeImage();
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
            this.goToChooseTeam(this.loggedInUserData.SELECTEDTEAM + '::' + this.loggedInUserData.TEAM_NAME)
            this.chooseTeamForm = this.formBuilder.group({
              team: new FormControl(this.loggedInUserData.SELECTEDTEAM + '::' + this.loggedInUserData.TEAM_NAME, Validators.required)
            });
          } else if (teams.length) {
            this.goToChooseTeam(teams[0].club_division_id + '::' + teams[0].team_name)
            this.chooseTeamForm = this.formBuilder.group({
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

  changePerson(person_id) {
    this.loggedInUserData.PERSON_ID = person_id;

    if (person_id == this.loggedInUserPersonId) {
      this.loggedInUserData.FIRST_NAME = this.loggedInUserData.LOGGEDIN_USER_FIRST_NAME;
      this.loggedInUserData.LAST_NAME = this.loggedInUserData.LOGGEDIN_USER_LAST_NAME;
      this.loggedInUserData.PHOTOPATH =  this.loggedInUserData.LOGGEDIN_USER_PHOTOPATH;
      this.loggedInUserData.BARCODEIMAGE = this.loggedInUserData.LOGGEDIN_USER_BARCODEIMAGE;
    }
    else {
      for (var i = 0; i < this.siblings.length; i++) {
        if (person_id == this.siblings[i].person_id) {
          this.loggedInUserData.FIRST_NAME = this.siblings[i].first_name;
          this.loggedInUserData.LAST_NAME = this.siblings[i].last_name;
          this.loggedInUserData.PHOTOPATH = this.siblings[i].photopath;
          this.loggedInUserData.BARCODEIMAGE = this.siblings[i].barcodeImage;
          break;
        }
      }
    }
    this.storage.set('loggedInUserData', this.loggedInUserData);
    this.getClients(person_id, '0');
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
          if (this.IsParent && client_id == 0 && clients.length > 0) {
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
      .set('person_id', this.loggedInUserData.PERSON_ID)
      .set('selectedTeam', this.selectTeam);

    this.http.post<any>(this.global.APIURL + 'teams/getSeasonsByClient', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        if (response.SUCCESS) {
          let seasons = response.GETSEASONSBYCLIENT;
          let currentseason = seasons.filter(function(value,index) { return value.currentseason == 1; });
          let season_id = (currentseason.length) ? currentseason[0].season_id : seasons[seasons.length - 1].season_id;
          this.season_id = (isFirst && !this.IsParent) ? this.loggedInUserData.SEASON_ID : season_id;
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

  changeClient(client_id) {
    this.client_id = client_id;
    this.getSeasons(this.client_id, this.season_id, false);
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

  changeSeason(season_id) {
    this.season_id = season_id;
    this.getTeams(this.client_id, this.season_id, this.selectTeam, 0);
  }

  changeDivision(divisionID) {
    this.divisionID = divisionID;
    this.getTeams(this.client_id, this.season_id, this.selectTeam, divisionID);
  }

}
