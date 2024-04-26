import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';

import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the PlayerCoachingReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player-coaching-report',
  templateUrl: 'player-coaching-report.html',
})
export class PlayerCoachingReportPage{
  private loggedInUserData: any;
  private playerDetails: any[] = [];
  public playerAttendanceStats: any[] = [];
  public playerGameDetails: any[] = [];
  public playerRPEDetails: any[] = [];
  private gameTimes: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public plt: Platform, private http: HttpClient, private loadingCtrl:LoadingController, private global: GlobalProvider, public gFn:GlobalFunctionsProvider,public global_api:GlobalApiProvider) {
    this.playerDetails = navParams.get('playerDetails');
    plt.ready().then(()=>{
      plt.registerBackButtonAction(()=>{
        this.goBack();
      });
    });
    storage.get('loggedInUserData').then((val) => {
      this.loggedInUserData = val;
      this.getPlayerCoachingReport();
      for(let i=1; i <= 11; i++){
        this.gameTimes.push(i);
      }
    });
  }

  getPlayerCoachingReport(){
    let loading = this.loadingCtrl.create();
    loading.present();
    let data = new HttpParams()
      .set('person_id', this.playerDetails[0].person_id)
      .set('team_id', this.loggedInUserData.SELECTEDTEAM)
      .set('client_id', this.loggedInUserData.CLIENT_ID);
    this.http.post<any>(this.global.APIURL + 'players/getPlayerCoachingReport', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        loading.dismiss();
        if(response.SUCCESS){
          this.playerAttendanceStats = response.GETATTENDANCESTATS;
          /*this.playerGameDetails = response.GETALLEVENTSGAMETIME;
          this.playerRPEDetails = response.GETALLEVENTSRPE;
          setTimeout(() => {
            $("#bars li .bar").each(function(key, bar){
              let rpe = $(this).data('rpe') * 10;
              $(this).animate({
                'height':rpe+'%'
              }, 1000);
            });
          }, 1000);*/
        }
      }, error => {
        loading.dismiss();
      });
  }

  goBack(){
    this.navCtrl.pop();
  }
  ionViewDidLoad(){
    this.gFn.hideMenuIcon()
  }
  ionViewDidLeave(){
    this.gFn.showMenuIcon()
  }

}
