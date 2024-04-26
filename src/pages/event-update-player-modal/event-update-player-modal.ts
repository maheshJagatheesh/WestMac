import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
/**
 * Generated class for the EventUpdatePlayerModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-update-player-modal',
  templateUrl: 'event-update-player-modal.html',
})
export class EventUpdatePlayerModalPage {
  playerStats: any;
  playerInfo: any;
  eventId: any;
  isButtonDisabled: boolean = false;
  btnDisabled: any = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, private http: HttpClient, public global: GlobalProvider,public global_api:GlobalApiProvider) {
  }

  ionViewWillLoad() {
    const stats = this.navParams.get('stats');
    const info = this.navParams.get('info');
    this.eventId = this.navParams.get('event');
    this.playerStats = stats;
    this.playerInfo = info;
  }
  close() {
    this.view.dismiss();
  }
  onUpdateStats(stat_id, statValue, person_stats_id, increment) {
    //let loading = this.loadingCtrl.create();
    //loading.present();
    this.btnDisabled = "disabled";
    var statVal = statValue;
    if (increment == 1) {
      statVal = Number.isInteger(statVal) ? (statVal + 1) : 1;
      //statVal = parseInt(statValue) + 1;
    } else if (statValue != 0) {
      statVal = statValue - 1;
    }
    let updateStatsData = new HttpParams()
      .set('event_id', this.eventId)
      .set('person_id', this.playerInfo.person)
      .set('person_stats_id', person_stats_id)
      .set('stat_val', statVal)
      .set('stat_id', stat_id)
      .set('period_id', '0');

    if (Number.isInteger(statVal)) {
      this.http.post<any>(this.global.APIURL + 'stats/savePlayerStats', updateStatsData,{headers:this.global_api.getHeader()})
        .subscribe(response => {
          if (response.SUCCESS) {
            let index = this.playerStats.findIndex(playerStats => playerStats.stat_id == stat_id);
            if (increment == 1) {
              if (Number.isInteger(this.playerStats[index].statValue)) {
                this.playerStats[index].statValue += 1;
              } else {
                this.playerStats[index].statValue = 1;
              }
            } else {
              if (Number.isInteger(this.playerStats[index].statValue)) {
                this.playerStats[index].statValue -= 1;
              }
            }
            this.btnDisabled = "";
            //loading.dismiss();
          }
          else {
            alert('Sorry no matching result found');
            this.btnDisabled = "";
            //loading.dismiss();
          }
        }, error => {
          this.btnDisabled = "";
          //loading.dismiss();
        });
    }


  }

}
