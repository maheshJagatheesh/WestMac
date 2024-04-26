import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  hoverActive: string;
  profileHoverActive: string;
  private loggedInUserData: any;
  public bgThemeColor: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    storage.get('loggedInUserData').then((val) => {
      this.loggedInUserData = val;
      //this.themeColor = this.loggedInUserData.THEME_BG;

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


  ionViewDidLoad() {
    //console.log('ionViewDidLoad MenuPage');
  }

  goBackEventHomePage() {
    this.navCtrl.push('EventHomePage');
  }

  goToSettingsPage() {
    this.hoverActive = 'active';
    this.navCtrl.push('SettingsPage');
  }
  goToGalleryEvents() {
    this.navCtrl.push('GalleryEventsPage');
  }

  goToProfileStatisticsPage() {
    this.profileHoverActive = 'active';
    this.navCtrl.push('SettingsProfileStatisticsPage');
  }

}
