import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
//import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the SetHomeImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set-home-image',
  templateUrl: 'set-home-image.html',
})
export class SetHomeImagePage {
  private loggedInUserData: any;
  setImageName: string = '';
  setHomeScreenImage: string = '';
  public bgThemeColor: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public global: GlobalProvider, private http: HttpClient, private loadingCtrl: LoadingController, public events: Events,public global_api:GlobalApiProvider) {
    storage.get('loggedInUserData').then((val) => {
      this.loggedInUserData = val;
      this.setImageName = navParams.get('data');
      if(typeof this.setImageName !== 'undefined')
      {
        this.setHomeScreenImage = 'assets/images/' + this.setImageName;
      }
      else if(typeof this.loggedInUserData['HOMESCREEN_BG'] !== 'undefined' && this.loggedInUserData['HOMESCREEN_BG'] != '')
      {
        this.setImageName = this.loggedInUserData['HOMESCREEN_BG'];
        this.setHomeScreenImage = 'assets/images/' + this.loggedInUserData['HOMESCREEN_BG'];
      }

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

  goToSetToGo() {
    let loading = this.loadingCtrl.create();
    loading.present();

    let data = new HttpParams()
      .set('person_id', this.loggedInUserData.PERSON_ID)
      .set('homescreen_bg', this.setImageName);

    this.http.post<any>(this.global.APIURL + 'users/setThemeHomeScreen', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        loading.dismiss();
        if (response.SUCCESS) {
          this.loggedInUserData['HOMESCREEN_BG'] = this.setImageName;
          this.storage.set('loggedInUserData', this.loggedInUserData);
          //console.log(this.loggedInUserData);
          this.navCtrl.push('SetToGoPage', {}, {animation: 'ios-transition'});
        } else {
          alert('Error');
        }
      }, error => {
        loading.dismiss();
        //alert(JSON.stringify(error));
      });

    //this.navCtrl.push('SetToGoPage');
  }

}
