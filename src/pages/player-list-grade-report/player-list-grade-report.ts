import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';

import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the PlayerListGradeReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player-list-grade-report',
  templateUrl: 'player-list-grade-report.html',
})
export class PlayerListGradeReportPage{
  public loggedInUserData: any;
  public reportCategory: string = '';
  public activePlayer: string = '';
  public players: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public events: Events, private http: HttpClient, private loadingCtrl: LoadingController, public global: GlobalProvider, public gFn:GlobalFunctionsProvider,public global_api:GlobalApiProvider) {
    
    this.reportCategory = this.navParams.get('report');
    this.storage.get('loggedInUserData').then((val) => {
      this.loggedInUserData = val;
      this.getTeamPlayersWithEventGrade();
    });
  }

  getTeamPlayersWithEventGrade() {
    let loading = this.loadingCtrl.create();
    loading.present();
    let data = new HttpParams()
      .set('person_id', this.loggedInUserData.PERSON_ID)
      .set('client_id', this.loggedInUserData.CLIENT_ID)
      .set('selectedTeam', this.loggedInUserData.SELECTEDTEAM)
      .set('flag', '1');
    this.http.post<any>(this.global.APIURL + 'players/getTeamPlayersWithEventGrade', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        loading.dismiss();
        if (response.SUCCESS) {
          this.players = response.GETTEAMPLAYERSWITHEVENTGRADE;
        }
      }, error => {
        loading.dismiss();
      });
  }

  playerDetails(personID) {
    this.activePlayer = personID;
    //this.navCtrl.push('PlayerDetailsPage');
  }

  /*goBack() {
    this.navCtrl.popTo('PlayersDashboardPage');
  }*/

}
