import { Component, Injectable, Pipe, PipeTransform } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController, Platform, ViewController, App } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
// import { Firebase } from '@ionic-native/firebase/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TabsPage } from '../tabs/tabs';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
import { DomSanitizer } from '@angular/platform-browser';
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  private loggedInUserData: any;
  public themeColor: string = '';
  public bgThemeColor: string = '';
  profileHoverActive: string;
  public lastPageName: string;
  public getVal: string;
  DeviceType: any = '';
  DeviceToken: any = '';
  AppName: any = '';
  AppVersion: any;
  LogoutClicked: boolean = false;
  ShowAlert: boolean = false;
  FunctionAccess: any;
  load: any = false;
  appTheme: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public global: GlobalProvider,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    public events: Events,
    private emailComposer: EmailComposer,
    private appVersion: AppVersion,
    public plt: Platform,
    private alert: AlertController,
    public statusBar: StatusBar,
    private gFn: GlobalFunctionsProvider,
    public app: App,
    public global_api: GlobalApiProvider) {
    global_api.removeUnreadCounter();
    /* $('.tabs .tab-button[aria-selected=true]:nth-child(2)').attr('aria-selected','false')
    $('.tabbar').css('z-index','0') */
    //   let elements = document.querySelectorAll(".tabbar");

    // if (elements != null) {
    // 	Object.keys(elements).map((key) => {
    // 		elements[key].style.display = 'none';
    // 	});
    // }




    plt.ready().then(() => {
      //statusBar.hide();
      plt.registerBackButtonAction(() => {
        this.goBack();
      });
    });

    this.storage.get("mobileAssets").then(
      res => {
        if (res && res.Theme && res.Theme) {
          this.appTheme = res.Theme;
        }
      });

    storage.get('loggedInUserData').then((val) => {
      this.loggedInUserData = val;
      //this.themeColor = this.loggedInUserData.THEME_BG;
      console.log("Login user Data : ", this.loggedInUserData);

      // this.backgroundThemeColor();
      // this.bgThemeColor = this.loggedInUserData.THEME_BG;

      if (typeof (this.loggedInUserData.THEME_BG) != "undefined" && this.loggedInUserData.THEME_BG != null && this.loggedInUserData.THEME_BG != "") {
        if (this.loggedInUserData.THEME_BG == this.appTheme.theme_1 || this.loggedInUserData.THEME_BG == this.appTheme.theme_2)
          this.bgThemeColor = this.loggedInUserData.THEME_BG;
        else
          this.bgThemeColor = this.appTheme.theme_1;
      } else {
        this.bgThemeColor = this.appTheme.theme_1;
      }

      this.storage.get('FunctionAccess').then((val1) => {
        this.FunctionAccess = val1;
        if (this.loggedInUserData.ISPARENT && parseInt(this.loggedInUserData.PERSON_ID) != parseInt(this.loggedInUserData.PARENT_ID)) {
          if (this.FunctionAccess.sec_absences_menu == 'yes') {
            this.ShowAlert = true
          }
        }
      });
    });
    this.appVersion.getAppName().then(Appname => {
      this.AppName = Appname
      console.log('b', this.AppName)
    })
    this.appVersion.getVersionNumber().then(Appversion => {
      this.AppVersion = Appversion
      console.log(Appversion)
    })
    // this.firebase.getToken().then(token => {
    //   this.DeviceToken = token
    //   console.log('c', this.DeviceToken)
    // })


    this.storage.get('registerDeviceToken').then(val => {
      if (val && val.token && val.platform) {
        console.log(val.token);
        this.DeviceToken = val.token;
      }
    });
    if (plt.is('ios')) {
      this.DeviceType = 'apple'
    }
    else if (plt.is('android')) {
      this.DeviceType = 'android'
    }
    // this.gFn.hideMenuIcon()
    // this.lastPageName = this.navCtrl.last().name;
  }

  ionViewDidLeave() {
    // this.gFn.showMenuIcon()
    if (!this.LogoutClicked) {
      this.gFn.showMenuIcon()
      //this.statusBar.show();
    }
  }
  ionViewDidLoad() {
    this.gFn.hideMenuIcon();
  }

  backgroundThemeColor() {
    switch (this.loggedInUserData.THEME_BG) {
      case "blue":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      case "red":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      case "grey":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      case "orange":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      case "darkgreen":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      case "yellow":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      /*case "pink":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;*/
      default:
        this.bgThemeColor = "blue";
        this.themeColor = "blue";
        break;
    }
  }

  goBack() {
    this.gFn.gotoHome()
    // this.navCtrl.setRoot(TabsPage, this.navParams.data).then(() => {
    //this.statusBar.show();
    // });
  }
  emailSender() {
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        //Now we know we can send
      }
    });
    let email = {
      to: 'support@gojaro.com',
      isHtml: true
    }

    // Send a text message using default options
    this.emailComposer.open(email);

  }

  setTheme(themeName) {
    let loading = this.loadingCtrl.create();
    loading.present();

    this.bgThemeColor = themeName;
    let data = new HttpParams()
      .set('person_id', this.loggedInUserData.PERSON_ID)
      .set('theme_bg', this.bgThemeColor);

    this.http.post<any>(this.global.APIURL + 'users/setThemeHomeScreen', data, { headers: this.global_api.getHeader() })
      .subscribe(response => {
        loading.dismiss();
        if (response.SUCCESS) {
          this.loggedInUserData['THEME_BG'] = this.bgThemeColor;
          this.storage.set('loggedInUserData', this.loggedInUserData);
        } else {
          alert('Error');
        }
      }, error => {
        loading.dismiss();
        //alert(JSON.stringify(error));
      });
  }


  goToSettingsHomeImage() {
    this.navCtrl.push('SettingsHomeImagesPage');
  }

  goToGalleryEvents() {
    this.navCtrl.push('GalleryEventsPage');

  }


  logOut() {
    // this.app.getActiveNav().setRoot('HomePage')
    $('.tabs').find('.tab-button').attr('aria-selected', 'false')
    // $('.tabs .tab-button[aria-selected=false]:nth-child(1)')
    // $('.tab-button').find('aria-label',).attr('aria-selected','false')
    // this.navCtrl.setRoot('HomePage')
    this.storage.set('Refresh', this.load);
    this.LogoutClicked = true;
    // this.setDeviceData(this.loggedInUserData.PERSON_ID)
    this.storage.clear();
    this.getClubDetails();
    this.setMobileAssets();
    let elements = document.querySelectorAll(".tabbar");

    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }
  }

  

  setMobileAssets() {
    new Promise((resolve) => {
      let Data = new HttpParams()
        .set('app_name', this.global.App_id);

      this.http.post(this.global.APIURL + "teams/getMobileAssets", Data, { headers: this.global_api.getHeader() })
        .subscribe((data: any) => {
          if (data && data.ASSETS) {
            this.storage.set("mobileAssets", data.ASSETS[0]);
            this.navCtrl.setRoot('LoginPage');
          } else {
            this.navCtrl.setRoot('LoginPage');
          }
        }, error => {
          this.navCtrl.setRoot('LoginPage');
          resolve(false);
        });
    });
  }
  getClubDetails() {
    new Promise((resolve) => {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': this.global.App_id
    });

    let Data = new HttpParams()
      .set('app_name', this.global.App_id);
    this.http.post(this.global.APIURL + "teams/getClubDetails", Data, { headers })
      .subscribe((data: any) => {
        if (data.SUCCESS) {
          let SSODetails = this.events.publish('json:query', data.GETCLUBDETAILS)[0][0];
          this.storage.set('SSODetails', SSODetails)
          resolve(true)
        }
      }, err=> {
        resolve(true)
      });
    });
  }


  goToProfileStatisticsPage() {
    this.profileHoverActive = 'active';
    this.navCtrl.push('SettingsProfileStatisticsPage');
  }

  setDeviceData(person_id) {
    let Data = new HttpParams()
      .set('person_id', person_id)
      .set('deviceType', this.DeviceType)
      .set('token', this.DeviceToken)
      .set('logged', '0')
      .set('appVer_major', '1')
      .set('appVer_minor', '0')
      .set('appVer_maintenance', '0')
      .set('app_name', this.AppName);

    this.http.post(this.global.APIURL + "push/registerDeviceWithPersonId", Data, { headers: this.global_api.getHeader() })
      .subscribe((data: any) => {

      }, error => {
      });
  }

  showAboutUs() {
    let data = new HttpParams();
    let loading = this.loadingCtrl.create();
    loading.present();
    this.http.post<any>(this.global.APIURL + 'settings/getAboutUs', data, { headers: this.global_api.getHeader() })
      .subscribe(response => {
        if (response.SUCCESS) {
          loading.dismiss();
          let alert = this.alert.create({
            title: 'Version No: ' + this.AppVersion,//response.GETABOUTUS
            buttons: ['Dismiss']
          });
          alert.present(alert);
        } else {
          loading.dismiss();
        }
      }, error => {
        loading.dismiss();
      });
  }
  sendTimesheetDashboard() {
    this.navCtrl.push('TimesheetDashboardPage');
  }
  gotoAlerts() {
    this.app.getRootNav().getActiveChildNav().select(6);
  }

}