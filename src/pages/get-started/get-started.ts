import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { Storage } from '@ionic/storage';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { AppVersion } from '@ionic-native/app-version/ngx';
// import { Firebase } from '@ionic-native/firebase/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Buffer } from 'buffer';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
@IonicPage()
@Component({
  selector: 'page-get-started',
  templateUrl: 'get-started.html',
})
export class GetStartedPage {
  private loginForm: FormGroup;
  DeviceToken: any = '';
  DeviceType: any;
  AppName: any;
  SSODetails: any = {};
  logoURL: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private storage: Storage,
    public global: GlobalProvider, public gFn: GlobalFunctionsProvider,
    private iab: InAppBrowser,
    private loadingCtrl: LoadingController,
    private appVersion: AppVersion, public plt: Platform,
    // private firebase: Firebase,
    private formBuilder: FormBuilder, public global_api: GlobalApiProvider) {
      this.storage.get("mobileAssets").then(
        res => {
          if (res) {
            this.logoURL = res.App_icon;
          } else {
            this.logoURL = "assets/images/jtclogo-5.svg";
          }
        });
        
    this.appVersion.getAppName().then(Appname => {
      this.AppName = Appname
    })

    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      app_name: this.global.App_id
    });

    // this.firebase.getToken()
    // .then(token => {
    //   console.log(token);
    //   this.DeviceToken=token

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
    this.storage.get('SSODetails').then((val) => {
      this.SSODetails = val
      console.log(this.SSODetails)
    })

  }

  goToLogin() {

    this.navCtrl.push('LoginPage');
  }
  loadSSOBrowser(SSO_LOGIN_URL: string) {
    const browserRef = this.iab.create(SSO_LOGIN_URL, '_blank', 'clearcache=yes,clearsesioncache=yes');
    console.log("SSO_LObrowserRefGIN_URL",browserRef)
    browserRef.on('loadstart').subscribe(event => {
      // URL structure example: https://sso.gojaro.com/ssologin.cfm?cred=Q2hhQmFiMjE6VXQ3bjk%3D
      if ((event.url).startsWith("https://sso.gojaro.com/ssologin.cfm?cred=")) {
        var parts = event.url.split('=');

        // read names and values
        var cred = new Buffer(decodeURIComponent(parts[1]), 'base64').toString('ascii');
        var strArr = cred.split(':');

        browserRef.close();

        this.loginForm.setValue({ 'username': strArr[0], 'password': strArr[1], 'app_name': this.global.App_id });
        this.loginSubmit();
      }
    });
  }

  checkRequestsCanBeMade(performRequest) {
    this.http.post<any>('https://api.gojaro.com/rest/jaro/' + 'users/validateUser', new HttpParams({}))
      .subscribe(_ => {
        performRequest();
      }, _ => {
        this.gFn.presentAlert('Error', "Error getting while connecting to internet");
      });
  }

  gotoSSO() {
    const _this = this;
    function performRequest() {
      const uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

      const SSO_LOGIN_URL = _this.SSODetails.SSOURL + uid;
      console.log("SSO_LOGIN_URL",SSO_LOGIN_URL)
      _this.loadSSOBrowser(SSO_LOGIN_URL);


    }
    this.checkRequestsCanBeMade(performRequest);
  }
  loginSubmit() {
    // let loading = this.loadingCtrl.create();
    // loading.present();

    let loginData = new HttpParams({ fromObject: this.loginForm.value });
    this.http.post<any>(this.global.APIURL + 'users/validateUser', loginData)
      .subscribe(response => {
        // loading.dismiss();
        if (response.SUCCESS && typeof response.VALIDATEUSER !== 'undefined' && response.VALIDATEUSER.length > 0) {
          let loggedInUserData = response.VALIDATEUSER[0];
          loggedInUserData = Object.keys(loggedInUserData).reduce((c, k) => (c[k.toUpperCase()] = loggedInUserData[k], c), {});

          loggedInUserData['LOGGEDIN_USER_PERSON_ID'] = loggedInUserData['PERSON_ID'];
          loggedInUserData['LOGGEDIN_USER_FIRST_NAME'] = loggedInUserData['FIRST_NAME'];
          loggedInUserData['LOGGEDIN_USER_LAST_NAME'] = loggedInUserData['LAST_NAME'];
          loggedInUserData['AUTH_TOKEN'] = response['TOKEN'];
          this.global_api.loginUserToken = loggedInUserData['AUTH_TOKEN'];
          if (typeof response.SIBLINGS !== 'undefined' && response.SIBLINGS.length > 0) {
            loggedInUserData['siblings'] = response.SIBLINGS;
          }
          this.setDeviceData(loggedInUserData['PERSON_ID'])
          this.storage.set('loggedInUserData', loggedInUserData);
          this.storage.get('isSetUp').then((val) => {
            if (val) {
              this.navCtrl.push('EventHomePage');
            } else {
              this.navCtrl.push('WelcomePage');
            }
          });

        } else {
          this.gFn.presentAlert('Error', 'Sorry no matching result found');
        }
      }, error => {
        // loading.dismiss();
        this.gFn.presentAlert('Error', "Error getting while connecting to internet");
      });
  }
  setDeviceData(person_id) {
    let Data = new HttpParams()
      .set('person_id', person_id)
      .set('deviceType', this.DeviceType)
      .set('token', this.DeviceToken)
      .set('logged', '1')
      .set('appVer_major', '1')
      .set('appVer_minor', '0')
      .set('appVer_maintenance', '0')
      .set('app_name', this.AppName);

    this.http.post(this.global.APIURL + "push/registerDeviceWithPersonId", Data, { headers: this.global_api.getHeader() })
      .subscribe((data: any) => {

      }, error => {
      });
  }
  gotoForgetPassword() {
    this.navCtrl.push('ForgetPage')

  }


}