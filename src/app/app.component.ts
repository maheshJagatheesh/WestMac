import { Component, ViewChild } from '@angular/core';
import { Platform, Events, NavController, Nav, AlertController, ModalController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GlobalProvider } from '../providers/global/global';
// import { Firebase } from '@ionic-native/firebase/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { GlobalApiProvider } from '../providers/global-api/global-api';
// import { Deeplinks } from '@ionic-native/deeplinks/ngx';
// import { Badge }from '@ionic-native/badge/ngx';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { HomePage } from '../pages/home/home';
import { EventAttendancePage } from '../pages/event-attendance/event-attendance';
import { PlayersDashboardPage } from '../pages/players-dashboard/players-dashboard';
import { DisplayEventsNewPage } from '../pages/display-events-new/display-events-new';
import { MessageLogDashboardPage } from '../pages/message-log-dashboard/message-log-dashboard';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { GlobalFunctionsProvider } from '../providers/global-functions/global-functions';
import { WelcomePage } from '../pages/welcome/welcome';
import { GetStartedPage } from '../pages/get-started/get-started';
import { LoginPage } from '../pages/login/login';
declare let window: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav;
  rootPage: any = 'LoginPage';
  interval: any;
  AppName: any = '';
  packageName: any = '';
  count: any;
  homeScreen: any;
  SplashScreen: any;
  msg: any;

  SSOEnabled: any;
  SSOUrl: any;
  seconds: any = 0;
  loggedInUserData: any;

  constructor(private platform: Platform,
    private statusBar: StatusBar,
    private events: Events,
    public storage: Storage,
    public splashScreen: SplashScreen,
    public push: Push,
    public http: HttpClient,
    public global: GlobalProvider,
    private alert: AlertController,
    private appVersion: AppVersion,
    public global_api: GlobalApiProvider,
    public modalCtrl: ModalController,
    public deeplinks: Deeplinks,
    public app: App,
    public gFn: GlobalFunctionsProvider) {

    platform.ready().then(async () => {
      //this.getMobileAssets();

      // statusBar.backgroundColorByHexString('#ffffff');
      // splashScreen.hide();

      this.appVersion.getPackageName().then(packageName => {
        this.packageName = packageName;
        // this.global.App_id = this.packageName;
      });

      /* Clear Cache */
      let success = function (status) {
        console.log('Message: ' + status);
      };
      let error = function (status) {
        console.log('Error: ' + status);
      };


      if (typeof window.CacheClear !== "undefined") {
        window.CacheClear(success, error);
      }

      this.appVersion.getAppName().then(Appname => {
        this.AppName = Appname;
      });
      this.initializeApp();
      this.pushNotification();

      setTimeout(() => {
        this.checkUpdateInformation();
        platform.resume.subscribe((e) => {
          if (typeof window.CacheClear !== "undefined") {
            window.CacheClear(success, error);
          }
          this.checkUpdateInformation();
        });
      }, 500);
    });

    events.subscribe('json:query', (jsonObj) => {
      return this.jsonToQuery(jsonObj);
    });

    if (this.platform.exitApp) {
      console.log("app closed", this.platform.exitApp);
      this.storage.remove('filterTeam');
      this.storage.remove('bucket');
      this.storage.remove('divisionBuckets');
    }
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.getMobileAssets();
      this.setupPage(0);
      if (this.platform.is('cordova')) {
        this.deepLink();
      }
    });
  }

  setupPage(tab) {
    this.storage.get('loggedInUserData').then((val) => {
      if (val) {
        this.storage.get('isSetUp').then((val1) => {
          this.seconds = -1;
          clearInterval(null);
          if (val1) {
            this.getSSOaccess().then((response) => {
              console.log("Called ===>",response);
              
              if (response) {
                this.nav.setRoot(TabsPage);
                this.splashScreen.hide();
              }
              else {
                this.nav.setRoot(TabsPage,{ activatedTab: tab });
                this.splashScreen.hide();
              }
            });
          } else {
            this.nav.setRoot(WelcomePage,{ activatedTab: tab });
            this.splashScreen.hide();
          }
        });
      }
      else {
        this.getSSOaccess().then((response) => {
          if (response && this.SSOEnabled == 1) {
            this.nav.setRoot('GetStartedPage');
            this.splashScreen.hide();
          }
          else {
              this.nav.setRoot('LoginPage');
              this.splashScreen.hide();
          }
        });
      }
    });
  }

  getSSOaccess() {
    this.storage.get('loggedInUserData').then((val) => {
      if (val == null) {
        this.loggedInUserData = '';
      }
      else {
        this.loggedInUserData = val;
      }
    });

    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': this.global.App_id
    });
    return new Promise((resolve) => {
      let Data = new HttpParams()
        .set('app_name', this.global.App_id);

      this.http.post(this.global.APIURL + "teams/getClubDetails", Data, { headers })
        .subscribe((data: any) => {
          if (data.SUCCESS) {
            let SSODetails = this.events.publish('json:query', data.GETCLUBDETAILS)[0][0];
            this.SSOEnabled = SSODetails && SSODetails.ISSSOENABLED ? SSODetails.ISSSOENABLED : 0;
            this.SSOUrl = SSODetails && SSODetails.SSOURL ? SSODetails.SSOURL : '';
            // var SSODetails={
            //   SSOEnabled:this.SSOEnabled,
            //   SSOUrl:this.SSOUrl
            // }
            console.log("SSO details : ",SSODetails);
            
            this.storage.set('SSODetails', SSODetails)
            resolve(true);
          }
          else {
            resolve(false);
            this.gFn.presentToast('Contact Sports department for more Details')
          }
        }, error => {
          resolve(false)
          console.log("Error", error)
          this.gFn.presentToast('Connection problem')
        });
    });
  }

  deepLink() {
    this.deeplinks.route({
      '/home': TabsPage,
      '/event-attendance': EventAttendancePage,
      '/players-dashboard': PlayersDashboardPage,
      '/display-events': DisplayEventsNewPage,
      '/message-log-dashboard': MessageLogDashboardPage
    }).subscribe(match => {
      // match.$route - the route we matched, which is the matched entry from the arguments to route()
      // match.$args - the args passed in the link
      // match.$link - the full link data
      let tabIndex = 0;
      let pageName = '';
      if (match.$link.path.indexOf('players') > -1) {
        tabIndex = 2;
        pageName = 'PlayersDashboardPage';
      } else if (match.$link.path.indexOf('event') > -1) {
        tabIndex = 1;
        pageName = 'DisplayEventsNewPage';
        if (match.$link.path.indexOf('event-attendance') > -1) {
          pageName = 'EventAttendancePage';
        }
      } else if (match.$link.path.indexOf('message-log-dashboard') > -1) {
        tabIndex = 5;
        pageName = 'MessageLogDashboardPage';
      }
      if (tabIndex == 0) {
        // this.navCtrl.setRoot(match.$route, match.$args);
        this.app.getActiveNav().setRoot(match.$route, match.$args);
      } else {
        setTimeout(() => {
          this.app.getRootNav().getActiveChildNav().select(tabIndex)
            .then(data => {
              this.app.getActiveNav().setRoot(pageName, match.$args);
            });
        }, 500);
      }
    }, nomatch => {
      // nomatch.$link - the full link data
      console.error('Got a deeplink that didn\'t match', nomatch);
    });
  }

  getMobileAssets() {
    new Promise((resolve) => {
      let Data = new HttpParams()
        .set('app_name', this.global.App_id);

      this.http.post(this.global.APIURL + "teams/getMobileAssets", Data, { headers: this.global_api.getHeader() })
        .subscribe((data: any) => {
          if (data && data.ASSETS) {
            this.storage.set("mobileAssets", data.ASSETS[0]);
            this.SplashScreen = data.ASSETS[0].Splash_screen;
            this.homeScreen = data.ASSETS[0].Theme.Home_screen_Img.replace(/ /g, "%20").toString();
            this.global_api.splash = data.ASSETS[0].Splash_screen;
            resolve(true);
          }
        }, error => {
          resolve(false);
        });
    });
  }

  checkUpdateInformation() {
    console.trace("checkUpdateInformation");
    new Promise((resolve) => {
      let Data = new HttpParams()
        .set('app_name', this.global.App_id);

      this.http.post(this.global.APIURL + "teams/getVersionDetails", Data, { headers: this.global_api.getHeader() })
        .subscribe((data: any) => {

          if (data.SUCCESS) {
            let versionDetails = this.events.publish('json:query', data.GETVERSIONDETAILS)[0][0];
            this.appVersion.getVersionNumber().then(Appversion => {
              if (this.platform.is("android")) {
                this.storage.get('isSkippedVersion').then((val) => {
                  if (val && val.length > 0) {
                    if (val != versionDetails.APPVERSIONLATESTANDROID) {
                      this.checkAndroid(Appversion, versionDetails);
                    } else {
                      console.log("Skipped update for android: " + versionDetails.APPVERSIONLATESTIOS);
                    }
                  } else {
                    this.checkAndroid(Appversion, versionDetails);
                  }
                }, (reason) => {
                  this.checkAndroid(Appversion, versionDetails);
                });
              }
              else if (this.platform.is("ios")) {
                this.storage.get('isSkippedVersion').then((val) => {
                  if (val && val.length > 0) {
                    if (val != versionDetails.APPVERSIONLATESTIOS) {
                      this.checkIOS(Appversion, versionDetails);
                    } else {
                      console.log("Skipped update for iOS: " + versionDetails.APPVERSIONLATESTIOS);
                    }
                  } else {
                    this.checkIOS(Appversion, versionDetails);
                  }
                }, (reason) => {
                  this.checkIOS(Appversion, versionDetails);
                });
              }
            }, err => { })
          }
        }, error => {
          resolve(false);
        });
    });
  }

  private checkIOS(Appversion: string, versionDetails: any) {
    let needUpdate = this.checkIosVersion(Appversion, versionDetails);
    if (needUpdate && versionDetails.APP_ID_IOS > 0) {
      window.open("https://itunes.apple.com/us/app/urbanspoon/id" + versionDetails.APP_ID_IOS, '_system', 'location=yes');
      this.platform.exitApp();
    }
  }

  private checkAndroid(Appversion: string, versionDetails: any) {
    let needUpdate = this.checkAndroidVersion(Appversion, versionDetails);
    if (needUpdate) {
      window.open("market://details?id=" + this.global.App_id, '_system', 'location=yes');
      this.platform.exitApp();
    }
  }

  checkAndroidVersion(appVersion: string, versionDetails: any) {
    let compared = this.CheckVersion(appVersion, versionDetails.APPVERSIONMINANDROID, versionDetails.APPVERSIONLATESTANDROID);
    let msg = "";
    if (compared == 2) {
      msg = this.AppName + " has been updated and the old version is no longer available. To continue using " + this.AppName + ", please update now.";
      this.forceUpdateAlert("Update Required", msg, "forceUpdate").then(needUpdate => {
        if (needUpdate) {
          window.open("market://details?id=" + this.global.App_id, '_system', 'location=yes');
          this.platform.exitApp();
        }
      });
    }
    else if (compared == 1) {
      msg = this.AppName + " has been updated and the old version is no longer available. To continue using " + this.AppName + ", please update now.";
      this.confirmUpdateAlert("Update Required", msg, "forceUpdate").then(willUpdate => {
        if (willUpdate == true) {
          window.open("market://details?id=" + this.global.App_id, '_system', 'location=yes');
          this.platform.exitApp();
        } else {
          this.storage.set('isSkippedVersion', versionDetails.APPVERSIONLATESTANDROID);
          return false;
        }
      });
    }
    else return false;
  }

  checkIosVersion(appVersion: string, versionDetails: any) {
    let compared = this.CheckVersion(appVersion, versionDetails.APPVERSIONMINIOS, versionDetails.APPVERSIONLATESTIOS);
    let msg = "";
    if (compared == 2) {
      msg = this.AppName + " has been updated and the old version is no longer available. To continue using " + this.AppName + ", please update now.";
      this.forceUpdateAlert("Update Required", msg, "forceUpdate").then(needUpdate => {
        if (needUpdate && versionDetails.APP_ID_IOS > 0) {
          window.open("https://itunes.apple.com/us/app/urbanspoon/id" + versionDetails.APP_ID_IOS, '_system', 'location=yes');
          this.platform.exitApp();
        }
      });
    }
    else if (compared == 1) {
      msg = this.AppName + " has been updated and the old version is no longer available. To continue using " + this.AppName + ", please update now.";
      this.confirmUpdateAlert("Update Required", msg, "forceUpdate").then(willUpdate => {
        if (willUpdate == true) {
          window.open("https://itunes.apple.com/us/app/urbanspoon/id" + versionDetails.APP_ID_IOS, '_system', 'location=yes');
          this.platform.exitApp();
        } else {
          this.storage.set('isSkippedVersion', versionDetails.APPVERSIONLATESTIOS);
          return false;
        }
      });
    }
    else return false;
  }

  CheckVersion(appVersion: string, minVersion: string, currentVersion: string) {
    if (minVersion == null) minVersion = "";
    if (currentVersion == null) currentVersion = "";
    if (minVersion.length == 0 && currentVersion.length == 0) { return 0; }
    else {
      let appVersionArr = ["0", "0", "0"];
      let minVersionArr = ["0", "0", "0"];
      let curVersionArr = ["0", "0", "0"];
      appVersionArr = appVersion.split(".");
      if (minVersion.length > 0) minVersionArr = minVersion.split(".");
      if (currentVersion.length > 0) curVersionArr = currentVersion.split(".");

      if (this.VersionIsHigher(minVersionArr, appVersionArr)) return 2;
      else if (this.VersionIsHigher(curVersionArr, appVersionArr)) return 1;
      return 0;
    }
  }

  VersionIsHigher(v1, v2) {
    if (v1.length == v2.length) {
      for (let i = 0; i < v1.length; i++) {
        if (Number(v1[i]) > Number(v2[i])) return true;
        if (Number(v1[i]) < Number(v2[i])) return false;
      }
    }
    return false;
  }

  forceUpdateAlert(Title, SubTitle, cssClass = '') {
    return new Promise((resolve) => {
      let alert = this.alert.create({
        title: Title,
        subTitle: SubTitle,
        cssClass: cssClass,
        enableBackdropDismiss: false,
        buttons: [{
          text: 'Update',
          handler: () => {
            resolve(true);
          }
        }]
      });
      alert.present(alert);
    })
  }

  confirmUpdateAlert(Title, SubTitle, cssClass = '') {
    return new Promise((resolve) => {
      let alert = this.alert.create({
        title: Title,
        subTitle: SubTitle,
        cssClass: cssClass,
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Skip',
            role: 'cancel',
            cssClass: 'cancel',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: 'Update',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });
      alert.present(alert);
    })
  }

  jsonToQuery(jsonObj) {
    let data = jsonObj.DATA;
    let columns = jsonObj.COLUMNS;
    let queryObj = {};
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        queryObj[key] = {};
        for (let count in data[key]) {
          if (data[key].hasOwnProperty(count)) {
            queryObj[key][columns[count]] = data[key][count];
          }
        }
      }
    }
    return queryObj;
  }

  pushNotification() {
    let isPlatform;
    if (this.platform.is("ios")) {
      isPlatform = 'ios';
    } else if (this.platform.is("android")) {
      isPlatform = 'android';
    } else {
      isPlatform = 'cordova'
    }

    const options: PushOptions = {
      android: {
        senderID: '352512629670',
        iconColor: '#ecb51c',
        sound: true,
        vibrate: true,
        clearBadge: true,
        clearNotifications: true,
        forceShow: true
      },
      ios: {
        alert: true,
        badge: true,
        sound: true,
      },
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    }

    const pushObject: PushObject = this.push.init(options);
    pushObject.on('notification').subscribe((notification: any) => {
      console.log("notification :", notification);
    });

    pushObject.on('registration').subscribe((registration: any) => {
      console.log("registration : ", registration.registrationId);

      let registerDevice = {
        token: registration.registrationId,
        platform: isPlatform
      }
      if (registration) {
        this.storage.set('registerDeviceToken', registerDevice);
      }
    });
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
}