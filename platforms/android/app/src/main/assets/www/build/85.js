webpackJsonp([85],{

/***/ 762:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChooseThemePageModule", function() { return ChooseThemePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__choose_theme__ = __webpack_require__(868);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChooseThemePageModule = /** @class */ (function () {
    function ChooseThemePageModule() {
    }
    ChooseThemePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__choose_theme__["a" /* ChooseThemePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__choose_theme__["a" /* ChooseThemePage */]),
            ],
        })
    ], ChooseThemePageModule);
    return ChooseThemePageModule;
}());

//# sourceMappingURL=choose-theme.module.js.map

/***/ }),

/***/ 868:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChooseThemePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_api_global_api__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ChooseThemePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChooseThemePage = /** @class */ (function () {
    function ChooseThemePage(navCtrl, navParams, storage, global, http, loadingCtrl, events, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.global = global;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.global_api = global_api;
        this.themeColor = '';
        this.bgThemeColor = '';
        storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
            _this.themeColor = val.THEME_BG;
            _this.backgroundThemeColor();
        });
    }
    ChooseThemePage.prototype.backgroundThemeColor = function () {
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
    };
    ChooseThemePage.prototype.setTheme = function (themeName) {
        var _this = this;
        this.themeColor = themeName;
        var loading = this.loadingCtrl.create();
        loading.present();
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', this.loggedInUserData.PERSON_ID)
            .set('theme_bg', this.themeColor);
        this.http.post(this.global.APIURL + 'users/setThemeHomeScreen', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS) {
                _this.bgThemeColor = themeName;
                _this.loggedInUserData['THEME_BG'] = _this.themeColor;
                _this.storage.set('loggedInUserData', _this.loggedInUserData);
            }
        }, function (error) {
            loading.dismiss();
        });
    };
    ChooseThemePage.prototype.goToChooseTeam = function () {
        //this.navCtrl.push('ChooseTeamPage', {}, {animation: 'ios-transition'});
        if (this.loggedInUserData.HOMESCREEN_BG != "") {
            this.navCtrl.push('SetToGoPage', {}, { animation: 'ios-transition' });
        }
        else {
            this.navCtrl.push('ChooseHomeImagePage', {}, { animation: 'ios-transition' });
        }
    };
    ChooseThemePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-choose-theme',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/choose-theme/choose-theme.html"*/'<!--\n  Generated template for the ChooseThemePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content>\n  <div class="bg-grey-gradient">\n    <section class="main">\n      <form action="" class="user-form profile">\n        <section class="profileFirst">\n          <div class="form-group">\n            <label class="mb-30">CHOOSE YOUR THEME</label>\n          </div>\n          <div class="divider"></div>\n          <div class="form-group mt-xl">\n            <div class="themeCircle">\n              <!--<span><img class="img-circle" [class.active]="(themeColor==\'blue\')" src="assets/images/theme/blue.svg" alt="" (click)="setTheme(\'blue\')"></span>\n              <span><img class="img-circle" [class.active]="(themeColor==\'orange\')" src="assets/images/theme/golden.svg" alt="" (click)="setTheme(\'orange\')"></span>\n              <span><img class="img-circle" [class.active]="(themeColor==\'darkgreen\')" src="assets/images/theme/darkgreen.svg" alt="" (click)="setTheme(\'darkgreen\')"></span>-->\n              <span><img class="img-circle" [class.active]="(bgThemeColor==\'blue\')" src="assets/images/theme/blue.svg" alt="" (click)="setTheme(\'blue\')"></span>\n              <span><img class="img-circle" [class.active]="(bgThemeColor==\'red\')" src="assets/images/theme/red.svg" alt="" (click)="setTheme(\'red\')"></span>\n            </div>\n            <div class="info-item">You can come back here and change your theme colour at any time by using the toggle at the top of your screen</div>\n          </div>\n          <div class="sign-up-left mt-30">\n            <button type="button" class="login-circle xs" (click)="goToChooseTeam()"></button>\n          </div>\n        </section>\n      </form>\n    </section>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/choose-theme/choose-theme.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_5__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], ChooseThemePage);
    return ChooseThemePage;
}());

//# sourceMappingURL=choose-theme.js.map

/***/ })

});
//# sourceMappingURL=85.js.map