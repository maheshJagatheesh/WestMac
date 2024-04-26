import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController,Platform } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';

import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the SettingsHomeImagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings-home-images',
  templateUrl: 'settings-home-images.html',
})
export class SettingsHomeImagesPage{
  private loggedInUserData: any;
  public bgThemeColor: string = '';
  public getHomeImageName: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private platform: Platform, public global: GlobalProvider, private http: HttpClient, private loadingCtrl:LoadingController, public events: Events, public gFn:GlobalFunctionsProvider,public global_api:GlobalApiProvider) {
    
    storage.get('loggedInUserData').then((val) => {
      this.loggedInUserData = val;
      this.getHomeImageName = this.loggedInUserData.HOMESCREEN_BG;

      this.backgroundThemeColor();
      platform.ready().then(()=>{
        platform.registerBackButtonAction(()=>{
          this.navCtrl.pop()
          //this.navCtrl.setRoot('EventHomePage')
        });

      })

    });
  }

  backgroundThemeColor(){
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
      default :
        this.bgThemeColor = "blue";
        break;
    }
  }

  goBack() {
    this.gFn.gotoHome();
    // this.navCtrl.pop();
  }

  setSettingsHomeImage(imageName){
    let loading = this.loadingCtrl.create();
    loading.present();

    this.getHomeImageName = imageName;

    let data = new HttpParams()
      .set('person_id', this.loggedInUserData.PERSON_ID)
      .set('homescreen_bg', this.getHomeImageName);

    this.http.post<any>(this.global.APIURL + 'users/setThemeHomeScreen', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        loading.dismiss();
        if (response.SUCCESS) {
          this.loggedInUserData['HOMESCREEN_BG'] = this.getHomeImageName;
          this.storage.set('loggedInUserData', this.loggedInUserData);
          this.gFn.gotoHome()
		  // this.gotoHome();
        } else {
          alert('Error');
        }
      }, error => {
        loading.dismiss();
        //alert(JSON.stringify(error));
      });
  }
  gotoHome(){
    this.gFn.gotoHome();
  }

}
