webpackJsonp([20],{

/***/ 836:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsProfileStatisticsPageModule", function() { return SettingsProfileStatisticsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_profile_statistics__ = __webpack_require__(937);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SettingsProfileStatisticsPageModule = /** @class */ (function () {
    function SettingsProfileStatisticsPageModule() {
    }
    SettingsProfileStatisticsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__settings_profile_statistics__["a" /* SettingsProfileStatisticsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__settings_profile_statistics__["a" /* SettingsProfileStatisticsPage */]),
            ],
        })
    ], SettingsProfileStatisticsPageModule);
    return SettingsProfileStatisticsPageModule;
}());

//# sourceMappingURL=settings-profile-statistics.module.js.map

/***/ }),

/***/ 937:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsProfileStatisticsPage; });
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



//import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';



/**
 * Generated class for the SettingsProfileStatisticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsProfileStatisticsPage = /** @class */ (function () {
    function SettingsProfileStatisticsPage(navCtrl, navParams, http, storage, events, loadingCtrl, global, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.global = global;
        this.global_api = global_api;
        this.bgThemeColor = '';
        this.randomNumber = '';
        this.storage.get("mobileAssets").then(function (res) {
            if (res && res.Theme && res.Theme) {
                _this.appTheme = res.Theme;
            }
        });
        storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
            if (typeof (_this.loggedInUserData.THEME_BG) != "undefined" && _this.loggedInUserData.THEME_BG != null && _this.loggedInUserData.THEME_BG != "") {
                if (_this.loggedInUserData.THEME_BG == _this.appTheme.theme_1 || _this.loggedInUserData.THEME_BG == _this.appTheme.theme_2)
                    _this.bgThemeColor = _this.loggedInUserData.THEME_BG;
                else
                    _this.bgThemeColor = _this.appTheme.theme_1;
            }
            else {
                _this.bgThemeColor = _this.appTheme.theme_1;
            }
            var loading = loadingCtrl.create();
            loading.present();
            var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('person_id', _this.loggedInUserData.PERSON_ID);
            _this.http.post(_this.global.APIURL + 'players/getPersonDetails', data, { headers: _this.global_api.getHeader() })
                .subscribe(function (response) {
                loading.dismiss();
                if (response.SUCCESS) {
                    _this.profileDetails = response.GETPERSONDETAILS;
                    _this.randomNumber = Math.floor((Math.random() * 1000) + 1).toString();
                }
                else {
                    alert('Sorry no matching result found');
                }
            }, function (error) {
                loading.dismiss();
                //alert(JSON.stringify(error));
            });
        });
    }
    SettingsProfileStatisticsPage.prototype.backgroundThemeColor = function () {
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
            case "yellow":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            default:
                this.bgThemeColor = "blue";
                break;
        }
    };
    SettingsProfileStatisticsPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    SettingsProfileStatisticsPage.prototype.goTOsettingsProfileEditPage = function () {
        this.navCtrl.push('SettingsProfileEditPage');
    };
    SettingsProfileStatisticsPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad SettingsProfileStatisticsPage');
    };
    SettingsProfileStatisticsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-settings-profile-statistics',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/settings-profile-statistics/settings-profile-statistics.html"*/'<ion-content [ngStyle]="{\'background-color\': bgThemeColor ? bgThemeColor :  \'#ffffff\'}">\n  <section class="main mt-20">\n    <div class="top-bar">\n      <div class="col-xs-3">\n        <div class="backArrow inverse" (click)="goBack()"></div>\n      </div>\n    </div>\n\n    <form action="" class="user-form profile">\n      <section class="profileFirst profile-first">\n        <div class="form-group">\n          <label class="mb-30">YOUR PROFILE <br>AND STATISTICS</label>\n        </div>\n        <div class="divider"></div>\n        <div class="form-group mt-xl" *ngFor="let profileDetail of profileDetails">\n\n          <div class="row profile-row">\n            <div class="card-title col-xs-11 p-0 profile-details">\n              <p> {{profileDetail.first_name}} {{profileDetail.last_name}}</p>\n              <p>e: {{profileDetail.email_address}}</p>\n              <p>m: {{profileDetail.phone_mobile}} </p>\n            </div>\n            <div class="event-next col-xs-1 p-0 frofile-edit">\n\n              <!-- <a href="javascript:void(0);" class="next-arrow v-center"><span class=""><img src="assets/images/edit.png" alt="" class="img-edit-circle" (click)="goTOsettingsProfileEditPage()"></span></a> -->\n\n            </div>\n          </div>\n          <div class="row profile-row">\n            <div class="card-img col-xs-12 p-0 profile-image" *ngIf="profileDetail.photoPath.length > 0; else noImage">\n              <span class=""><img src="{{global.PROFILEIMAGEURL}}{{profileDetail.photoPath}}?r={{randomNumber}}" alt="" class="img-circle"></span>\n            </div>\n            <ng-template #noImage>\n              <div class="card-img col-xs-12 p-0 profile-image">\n                <span class=""><img src="assets/images/test-user.svg" alt="" class="img-circle"></span>\n              </div>\n            </ng-template>\n          </div>\n\n        </div>\n      </section>\n    </form>\n  </section>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/settings-profile-statistics/settings-profile-statistics.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], SettingsProfileStatisticsPage);
    return SettingsProfileStatisticsPage;
}());

//# sourceMappingURL=settings-profile-statistics.js.map

/***/ })

});
//# sourceMappingURL=20.js.map