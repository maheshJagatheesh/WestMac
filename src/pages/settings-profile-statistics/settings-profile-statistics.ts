import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
//import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the SettingsProfileStatisticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings-profile-statistics',
  templateUrl: 'settings-profile-statistics.html',
})
export class SettingsProfileStatisticsPage {
  private loggedInUserData: any;
  public bgThemeColor: string = '';
  public profileDetails: string;
  public randomNumber: string = '';
  appTheme: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private http: HttpClient, 
    public storage: Storage, 
    public events: Events, 
    public loadingCtrl: LoadingController, 
    public global: GlobalProvider, 
    public global_api: GlobalApiProvider) {

    this.storage.get("mobileAssets").then(
      res => {
        if (res && res.Theme && res.Theme) {
          this.appTheme = res.Theme;
        }
      });

    storage.get('loggedInUserData').then((val) => {
      this.loggedInUserData = val;
      if (typeof (this.loggedInUserData.THEME_BG) != "undefined" && this.loggedInUserData.THEME_BG != null && this.loggedInUserData.THEME_BG != "") {
        if (this.loggedInUserData.THEME_BG == this.appTheme.theme_1 || this.loggedInUserData.THEME_BG == this.appTheme.theme_2)
          this.bgThemeColor = this.loggedInUserData.THEME_BG;
        else
          this.bgThemeColor = this.appTheme.theme_1;
      } else {
        this.bgThemeColor = this.appTheme.theme_1;
      }

      let loading = loadingCtrl.create();
      loading.present();
      let data = new HttpParams()
        .set('person_id', this.loggedInUserData.PERSON_ID);

      this.http.post<any>(this.global.APIURL + 'players/getPersonDetails', data, { headers: this.global_api.getHeader() })
        .subscribe(response => {
          loading.dismiss();
          if (response.SUCCESS) {
            this.profileDetails = response.GETPERSONDETAILS;
            this.randomNumber = Math.floor((Math.random() * 1000) + 1).toString();
          } else {
            alert('Sorry no matching result found');
          }
        }, error => {
          loading.dismiss();
          //alert(JSON.stringify(error));
        });

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
      case "yellow":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      default:
        this.bgThemeColor = "blue";
        break;
    }
  }

  goBack() {
    this.navCtrl.pop();
  }

  goTOsettingsProfileEditPage() {
    this.navCtrl.push('SettingsProfileEditPage');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SettingsProfileStatisticsPage');
  }

}
