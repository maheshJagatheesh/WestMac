webpackJsonp([50],{

/***/ 804:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(907);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]),
            ],
        })
    ], LoginPageModule);
    return LoginPageModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 907:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_version_ngx__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser_ngx__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_buffer__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_buffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_buffer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_global_api_global_api__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_keyboard_ngx__ = __webpack_require__(114);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







// import { Firebase } from '@ionic-native/firebase/ngx';
// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';





var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, http, formBuilder, storage, events, keyboard, global, loadingCtrl, appVersion, plt, 
    // private firebase: Firebase, 
    alert, gFn, iab, global_api) {
        var _this_1 = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.events = events;
        this.keyboard = keyboard;
        this.global = global;
        this.loadingCtrl = loadingCtrl;
        this.appVersion = appVersion;
        this.plt = plt;
        this.alert = alert;
        this.gFn = gFn;
        this.iab = iab;
        this.global_api = global_api;
        this.DeviceToken = '';
        this.bgThemeColor = '';
        // this.getMobileAssets();
        // super(navCtrl,navParams,loadingCtrl,plt )
        // super(IonicPage, NavController, NavParams,LoadingController,Platform )
        this.appVersion.getAppName().then(function (Appname) {
            _this_1.AppName = Appname;
        });
        this.loginForm = this.formBuilder.group({
            username: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required),
            password: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required),
            app_name: this.global.App_id
        });
        // this.firebase.getToken()
        // .then(token => {
        //   console.log(token);
        //   this.DeviceToken=token
        // })
        this.storage.get('registerDeviceToken').then(function (val) {
            if (val && val.token && val.platform) {
                console.log(val.token);
                _this_1.DeviceToken = val.token;
            }
        });
        if (plt.is('ios')) {
            this.DeviceType = 'apple';
            // this.firebase.hasPermission().then((data) => {
            //   if(!data.isEnabled){
            //     this.firebase.grantPermission().then((success) => {
            //       console.log(success);
            //     }).catch((error) => {
            //       console.log(error);
            //       this.DeviceToken = '';
            //     });
            //   }
            // });
        }
        else if (plt.is('android')) {
            this.DeviceType = 'android';
        }
        this.storage.get('SSODetails').then(function (val) {
            _this_1.SSODetails = val;
        });
    }
    LoginPage.prototype.loadSSOBrowser = function (SSO_LOGIN_URL) {
        var _this_1 = this;
        var browserRef = this.iab.create(SSO_LOGIN_URL, '_blank', 'clearcache=yes,clearsesioncache=yes');
        browserRef.on('loadstart').subscribe(function (event) {
            // URL structure example: https://sso.gojaro.com/ssologin.cfm?cred=Q2hhQmFiMjE6VXQ3bjk%3D
            if ((event.url).startsWith("https://sso.gojaro.com/ssologin.cfm?cred=")) {
                var parts = event.url.split('=');
                // read names and values
                var cred = new __WEBPACK_IMPORTED_MODULE_8_buffer__["Buffer"](decodeURIComponent(parts[1]), 'base64').toString('ascii');
                var strArr = cred.split(':');
                browserRef.close();
                _this_1.loginForm.setValue({ 'username': strArr[0], 'password': strArr[1], 'app_name': _this_1.global.App_id });
                _this_1.loginSubmit();
            }
        });
    };
    LoginPage.prototype.backgroundThemeColor = function () {
        switch (this.loggedInUserData.THEME_BG) {
            case "red":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            case "blue":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            case "yellow":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            default:
                this.bgThemeColor = "blue";
                break;
        }
    };
    LoginPage.prototype.checkRequestsCanBeMade = function (performRequest) {
        var _this_1 = this;
        this.http.post(this.global.APIURL + 'users/validateUser', new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]({}))
            .subscribe(function (_) {
            performRequest();
        }, function (_) {
            _this_1.gFn.presentAlert('Error', "Error getting while connecting to internet");
        });
    };
    LoginPage.prototype.gotoSSO = function () {
        var _this = this;
        function performRequest() {
            var uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            var SSO_LOGIN_URL = _this.SSODetails.SSOURL + uid;
            console.log(SSO_LOGIN_URL);
            _this.loadSSOBrowser(SSO_LOGIN_URL);
            // })
        }
        this.checkRequestsCanBeMade(performRequest);
    };
    LoginPage.prototype.loginSubmit = function () {
        var _this_1 = this;
        var isLogout = true;
        this.storage.set('isLogout', isLogout);
        var loading = this.loadingCtrl.create();
        loading.present();
        var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]({ fromObject: this.loginForm.value });
        this.http.post(this.global.APIURL + 'users/validateUser', loginData)
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS && typeof response.VALIDATEUSER !== 'undefined' && response.VALIDATEUSER.length > 0) {
                var loggedInUserData_1 = response.VALIDATEUSER[0];
                loggedInUserData_1 = Object.keys(loggedInUserData_1).reduce(function (c, k) { return (c[k.toUpperCase()] = loggedInUserData_1[k], c); }, {});
                loggedInUserData_1['LOGGEDIN_USER_PERSON_ID'] = loggedInUserData_1['PERSON_ID'];
                loggedInUserData_1['LOGGEDIN_USER_FIRST_NAME'] = loggedInUserData_1['FIRST_NAME'];
                loggedInUserData_1['LOGGEDIN_USER_LAST_NAME'] = loggedInUserData_1['LAST_NAME'];
                loggedInUserData_1['LOGGEDIN_USER_PHOTOPATH'] = loggedInUserData_1['PHOTOPATH'];
                loggedInUserData_1['LOGGEDIN_USER_BARCODEIMAGE'] = loggedInUserData_1['BARCODEIMAGE'];
                loggedInUserData_1['AUTH_TOKEN'] = response['TOKEN'];
                loggedInUserData_1['APP_NAME'] = loggedInUserData_1['appName'];
                _this_1.global_api.loginUserToken = loggedInUserData_1['AUTH_TOKEN'];
                console.log(loggedInUserData_1);
                if (typeof response.SIBLINGS !== 'undefined' && response.SIBLINGS.length > 0) {
                    loggedInUserData_1['siblings'] = response.SIBLINGS;
                }
                _this_1.setDeviceData(loggedInUserData_1['PERSON_ID']);
                var loginTime = new Date();
                _this_1.storage.set('loggedInTime', loginTime);
                _this_1.storage.set('loggedInUserData', loggedInUserData_1);
                _this_1.storage.get('isSetUp').then(function (val) {
                    console.log("i'm here");
                    if (val) {
                        _this_1.navCtrl.push('EventHomePage', {}, { animation: 'ios-transition' });
                    }
                    else {
                        _this_1.navCtrl.push('WelcomePage', {}, { animation: 'ios-transition' });
                    }
                });
            }
            else {
                _this_1.presentAlert('Error', 'Sorry no matching result found');
            }
        }, function (error) {
            loading.dismiss();
            _this_1.presentAlert('Error', "Error getting while connecting to internet");
        });
    };
    LoginPage.prototype.gotoForgetPassword = function () {
        this.navCtrl.push('ForgetPage');
    };
    LoginPage.prototype.goTogetStarted = function () {
        this.navCtrl.push('GetStartedPage');
    };
    LoginPage.prototype.setDeviceData = function (person_id) {
        var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', person_id)
            .set('deviceType', this.DeviceType)
            .set('token', this.DeviceToken)
            .set('logged', '1')
            .set('appVer_major', '1')
            .set('appVer_minor', '0')
            .set('appVer_maintenance', '0')
            .set('app_name', this.AppName);
        this.http.post(this.global.APIURL + "push/registerDeviceWithPersonId", Data, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
        }, function (error) {
        });
    };
    LoginPage.prototype.presentAlert = function (Title, SubTitle) {
        var alert = this.alert.create({
            title: Title,
            subTitle: SubTitle,
            buttons: ['Dismiss']
        });
        alert.present(alert);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content>\n  <section class="main bg-gradient {{bgThemeColor}}">\n    <form action="" class="user-form login-wrap login" [formGroup]="loginForm" (ngSubmit)="loginSubmit();">\n      <div class="form-group">\n        <label for="username">USERNAME</label>\n        <input type="text" class="form-control" id="username" placeholder="" formControlName="username" required>\n      </div>\n      <div class="divider"></div>\n      <div class="form-group">\n        <label for="password">PASSWORD</label>\n        <input type="password" class="form-control" id="password" placeholder="" formControlName="password" required>\n      </div>\n      <div class="login-icon text-center">\n        <button class="login-circle xs {{bgThemeColor}}" type="submit" [disabled]="!loginForm.valid"></button>\n      </div>\n      <!-- <div class="portalCard" [hidden]="keyboard.isOpen()" > -->\n        <!-- <p *ngIf="SSODetails && SSODetails.ISSSOENABLED==1" (click)="gotoSSO()">Login through school portal</p> -->\n      <!-- </div> -->\n      <!-- <div [hidden]="keyboard.isOpen()" class="forget mt-xxl" > -->\n <!-- <p *ngIf="SSODetails && SSODetails.ISSSOENABLED==1" (click)="gotoSSO()">Login through school portal</p> -->\n	  <!-- </div> -->\n      \n    </form>\n    <div class="footer-item v-bottom" >\n      <!--- <a class="title" href="javascript:void(0);" (click)="goToLogin();">Login using JARO credentials</a>-->\n       <p class="mt-20"  style="font-weight: 600;" *ngIf="!keyboard.isVisible" (click)="goTogetStarted();">Login through school portal</p>\n       <!----<div class="links">\n         <a href="javascript:void(0)"><img class="play-vid" src="assets/images/play-video.svg" alt=""/> Watch a quick video introduction</a>\n       </div>-->\n     </div>\n  </section>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_keyboard_ngx__["a" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_5__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_version_ngx__["a" /* AppVersion */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_9__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser_ngx__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_10__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

});
//# sourceMappingURL=50.js.map