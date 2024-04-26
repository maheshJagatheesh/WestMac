import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

@IonicPage()
@Component({
  selector: 'page-choose-home-image',
  templateUrl: 'choose-home-image.html',
})
export class ChooseHomeImagePage {
  private loggedInUserData: any;
  homeScreen_bg: string;
  public bgThemeColor: string = '';
  UpcomingSingleEvent:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
    private http: HttpClient,public global: GlobalProvider,public global_api:GlobalApiProvider) {
    storage.get('loggedInUserData').then((val) => {
      this.loggedInUserData = val;
      this.homeScreen_bg = this.loggedInUserData.HOMESCREEN_BG;

      this.backgroundThemeColor();
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


  setHomeImage(imageName) {

    this.navCtrl.push('SetHomeImagePage', {
      data: imageName
    }, {animation: 'ios-transition'});
  }
  getFunctionAccess(){
    let data = new HttpParams()
        .set('person_id', this.loggedInUserData.PERSON_ID)
        .set('event_id', this.UpcomingSingleEvent.event_id)
        .set('selectedTeam', this.loggedInUserData.SELECTEDTEAM)
    this.http.post<any>(this.global.APIURL + 'users/getPersonAccess', data,{headers:this.global_api.getHeader()})
    .subscribe(response => {
        if(this.loggedInUserData.ADMINLEVEL==1){
          var setData={
            user_adminLevel:1,
            event_StillComing:'no',
            event_EventDetail:'yes',
            event_BorrowPlayer:'yes',
            event_GroupMessage:'yes',
            event_SessionPlan:'yes but not now',
            event_Injury:'yes',
            event_tab_Attendance:'yes',
            event_tab_Overview:'no',
            event_Welfare:'yes',
            team_assigned:'yes',
            player_coachingReport:'yes',
            voting_for_player: 'yes',
            game_report: 'yes',
            game_score: 'yes'
          }
          this.storage.set('FunctionAccess',setData)
        }
        else if(this.loggedInUserData.ADMINLEVEL==2){
          var setData1={
            user_adminLevel:2,
            event_StillComing:'no',
            event_EventDetail:'yes',
            event_BorrowPlayer:'yes',
            event_GroupMessage:'yes',
            event_SessionPlan:'yes but not now',
            event_Injury:'yes',
            event_tab_Attendance:'yes',
            event_tab_Overview:'no',
            event_Welfare:'yes',
            team_assigned:'yes',
            player_coachingReport:'yes',
            voting_for_player: 'yes',
            game_report: 'yes',
            game_score: 'yes'
          }
          this.storage.set('FunctionAccess',setData1)
        }
        else if(this.loggedInUserData.ADMINLEVEL==3){
          var setData1={
            user_adminLevel:3,
            event_StillComing:'no',
            event_EventDetail:'yes',
            event_BorrowPlayer:'yes',
            event_GroupMessage:'yes',
            event_SessionPlan:'yes but not now',
            event_Injury:'yes',
            event_tab_Attendance:'yes',
            event_tab_Overview:'no',
            event_Welfare:'yes',
            team_assigned:'yes',
            player_coachingReport:'yes',
            voting_for_player: 'yes',
            game_report: 'yes',
            game_score: 'yes'
          }
          this.storage.set('FunctionAccess',setData1)
        }
        else {
          var setData1={
            user_adminLevel:4,
            event_StillComing:'yes',
            event_EventDetail:'self',
            event_BorrowPlayer:'no',
            event_GroupMessage:'no',
            event_SessionPlan:'no',
            event_Injury:'self',
            event_tab_Attendance:'no',
            event_tab_Overview:'yes',
            event_Welfare:'self',
            team_assigned:'yes',
            player_coachingReport:'yes',
            voting_for_player: 'no',
            game_report: 'no',
            game_score: 'no'
          }
          this.storage.set('FunctionAccess',setData1)
        }
      }, error => {
      });
  }

}
