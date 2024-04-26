webpackJsonp([22],{

/***/ 834:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsHomeImagesPageModule", function() { return SettingsHomeImagesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_home_images__ = __webpack_require__(935);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SettingsHomeImagesPageModule = /** @class */ (function () {
    function SettingsHomeImagesPageModule() {
    }
    SettingsHomeImagesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__settings_home_images__["a" /* SettingsHomeImagesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__settings_home_images__["a" /* SettingsHomeImagesPage */]),
            ],
        })
    ], SettingsHomeImagesPageModule);
    return SettingsHomeImagesPageModule;
}());

//# sourceMappingURL=settings-home-images.module.js.map

/***/ }),

/***/ 935:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsHomeImagesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__ = __webpack_require__(24);
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
 * Generated class for the SettingsHomeImagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsHomeImagesPage = /** @class */ (function () {
    function SettingsHomeImagesPage(navCtrl, navParams, storage, platform, global, http, loadingCtrl, events, gFn, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.platform = platform;
        this.global = global;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.gFn = gFn;
        this.global_api = global_api;
        this.bgThemeColor = '';
        this.getHomeImageName = '';
        storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
            _this.getHomeImageName = _this.loggedInUserData.HOMESCREEN_BG;
            _this.backgroundThemeColor();
            platform.ready().then(function () {
                platform.registerBackButtonAction(function () {
                    _this.navCtrl.pop();
                    //this.navCtrl.setRoot('EventHomePage')
                });
            });
        });
    }
    SettingsHomeImagesPage.prototype.backgroundThemeColor = function () {
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
    };
    SettingsHomeImagesPage.prototype.goBack = function () {
        this.gFn.gotoHome();
        // this.navCtrl.pop();
    };
    SettingsHomeImagesPage.prototype.setSettingsHomeImage = function (imageName) {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.getHomeImageName = imageName;
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', this.loggedInUserData.PERSON_ID)
            .set('homescreen_bg', this.getHomeImageName);
        this.http.post(this.global.APIURL + 'users/setThemeHomeScreen', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS) {
                _this.loggedInUserData['HOMESCREEN_BG'] = _this.getHomeImageName;
                _this.storage.set('loggedInUserData', _this.loggedInUserData);
                _this.gFn.gotoHome();
                // this.gotoHome();
            }
            else {
                alert('Error');
            }
        }, function (error) {
            loading.dismiss();
            //alert(JSON.stringify(error));
        });
    };
    SettingsHomeImagesPage.prototype.gotoHome = function () {
        this.gFn.gotoHome();
    };
    SettingsHomeImagesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-settings-home-images',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/settings-home-images/settings-home-images.html"*/'<!--\n  Generated template for the SettingsHomeImagesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content class="bg-gradient {{bgThemeColor}}">\n  <section class="main mt-20">\n    <div class="top-bar">\n      <div class="col-xs-3">\n        <div class="backArrow" (click)="goBack()"></div>\n      </div>\n    </div>\n    <form action="" class="user-form profile">\n      <section class="innerContent">\n        <div class="form-group">\n          <label class="mb-30">CHOOSE YOUR <br> HOMESCREEN IMAGE</label>\n        </div>\n        <div class="divider"></div>\n        <div class="form-group mt-xl">\n          <div class="homeScreen mb-30">\n            <div class="row">\n              <div class="thumbnail col-xs-4" [class.active]="(getHomeImageName==\'img-1.jpg\')">\n                <img src="assets/images/img-xs-1.jpg" alt="" (click)="setSettingsHomeImage(\'img-1.jpg\')">\n              </div>\n              <div class="thumbnail col-xs-4" [class.active]="(getHomeImageName==\'img-2.jpg\')">\n                <img src="assets/images/img-xs-2.jpg" alt="" (click)="setSettingsHomeImage(\'img-2.jpg\')">\n              </div>\n              <div class="thumbnail col-xs-4" [class.active]="(getHomeImageName==\'img-3.jpg\')">\n                <img src="assets/images/img-xs-3.jpg" alt="" (click)="setSettingsHomeImage(\'img-3.jpg\')">\n              </div>\n            </div>\n            <div class="row">\n              <div class="thumbnail col-xs-4" [class.active]="(getHomeImageName==\'img-4.jpg\')">\n                <img src="assets/images/img-xs-4.jpg" alt="" (click)="setSettingsHomeImage(\'img-4.jpg\')">\n              </div>\n              <div class="thumbnail col-xs-4" [class.active]="(getHomeImageName==\'img-5.jpg\')">\n                <img src="assets/images/img-xs-5.jpg" alt="" (click)="setSettingsHomeImage(\'img-5.jpg\')">\n              </div>\n              <div class="thumbnail col-xs-4" [class.active]="(getHomeImageName==\'img-6.jpg\')">\n                <img src="assets/images/img-xs-6.jpg" alt="" (click)="setSettingsHomeImage(\'img-6.jpg\')">\n              </div>\n            </div>\n            <div class="row">\n              <div class="thumbnail col-xs-4" [class.active]="(getHomeImageName==\'img-7.jpg\')">\n                <img src="assets/images/img-xs-7.jpg" alt="" (click)="setSettingsHomeImage(\'img-7.jpg\')">\n              </div>\n              <div class="thumbnail col-xs-4" [class.active]="(getHomeImageName==\'img-8.jpg\')">\n                <img src="assets/images/img-xs-8.jpg" alt="" (click)="setSettingsHomeImage(\'img-8.jpg\')">\n              </div>\n              <div class="thumbnail col-xs-4" [class.active]="(getHomeImageName==\'img-9.jpg\')">\n                <img src="assets/images/img-xs-9.jpg" alt="" (click)="setSettingsHomeImage(\'img-9.jpg\')">\n              </div>\n            </div>\n            <div class="row">\n              <div class="thumbnail col-xs-4" [class.active]="(getHomeImageName==\'img-10.jpg\')">\n                <img src="assets/images/img-xs-10.jpg" alt="" (click)="setSettingsHomeImage(\'img-10.jpg\')">\n              </div>\n              <div class="thumbnail col-xs-4" [class.active]="(getHomeImageName==\'img-12.jpg\')">\n                <img src="assets/images/img-xs-12.jpg" alt="" (click)="setSettingsHomeImage(\'img-12.jpg\')">\n              </div>\n              <div class="thumbnail col-xs-4" [class.active]="(getHomeImageName==\'img-13.jpg\')">\n                <img src="assets/images/img-xs-13.jpg" alt="" (click)="setSettingsHomeImage(\'img-13.jpg\')">\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class="info-item text-left"></div>\n      </section>\n    </form>\n  </section>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/settings-home-images/settings-home-images.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], SettingsHomeImagesPage);
    return SettingsHomeImagesPage;
}());

//# sourceMappingURL=settings-home-images.js.map

/***/ })

});
//# sourceMappingURL=22.js.map