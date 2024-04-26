import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the ChooseThemePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose-theme',
  templateUrl: 'choose-theme.html',
})
export class ChooseThemePage {
  public chooseThemeForm: FormGroup;
  private loggedInUserData: any;
  public themeColor: string = '';
  public bgThemeColor: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public global: GlobalProvider, private http: HttpClient, private loadingCtrl: LoadingController, public events: Events,public global_api:GlobalApiProvider) {
    storage.get('loggedInUserData').then((val) => {
      this.loggedInUserData = val;
      this.themeColor = val.THEME_BG;

      this.backgroundThemeColor();

    });
  }

  backgroundThemeColor() {
    switch (this.loggedInUserData.THEME_BG) {
      /*case "green":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;*/
      case "blue":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      case "orange":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      case "darkgreen":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      /*case "pink":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;*/
      default:
        this.bgThemeColor = "darkgreen";
        this.themeColor = "darkgreen";
        break;
    }
  }


  setTheme(themeName) {
    this.themeColor = themeName;
    let loading = this.loadingCtrl.create();
    loading.present();
	
    let data = new HttpParams()    
    
      .set('person_id', this.loggedInUserData.PERSON_ID)
      .set('theme_bg', this.themeColor);

    this.http.post<any>(this.global.APIURL + 'users/setThemeHomeScreen', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        loading.dismiss();
        if (response.SUCCESS) {
          this.bgThemeColor = themeName;
          this.loggedInUserData['THEME_BG'] = this.themeColor;
          this.storage.set('loggedInUserData', this.loggedInUserData);
        }
      }, error => {
        loading.dismiss();
      });
  }

  goToChooseTeam() {
    //this.navCtrl.push('ChooseTeamPage', {}, {animation: 'ios-transition'});
    if(this.loggedInUserData.HOMESCREEN_BG != ""){
      this.navCtrl.push('SetToGoPage', {}, {animation: 'ios-transition'});
    }else{
      this.navCtrl.push('ChooseHomeImagePage', {}, {animation: 'ios-transition'});
    }
  }

}
