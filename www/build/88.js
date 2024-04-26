webpackJsonp([88],{

/***/ 759:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChooseHomeImagePageModule", function() { return ChooseHomeImagePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__choose_home_image__ = __webpack_require__(866);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChooseHomeImagePageModule = /** @class */ (function () {
    function ChooseHomeImagePageModule() {
    }
    ChooseHomeImagePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__choose_home_image__["a" /* ChooseHomeImagePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__choose_home_image__["a" /* ChooseHomeImagePage */]),
            ],
        })
    ], ChooseHomeImagePageModule);
    return ChooseHomeImagePageModule;
}());

//# sourceMappingURL=choose-home-image.module.js.map

/***/ }),

/***/ 866:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChooseHomeImagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(18);
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






var ChooseHomeImagePage = /** @class */ (function () {
    function ChooseHomeImagePage(navCtrl, navParams, storage, http, global, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.http = http;
        this.global = global;
        this.global_api = global_api;
        this.bgThemeColor = '';
        storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
            _this.homeScreen_bg = _this.loggedInUserData.HOMESCREEN_BG;
            _this.backgroundThemeColor();
        });
    }
    ChooseHomeImagePage.prototype.backgroundThemeColor = function () {
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
    ChooseHomeImagePage.prototype.setHomeImage = function (imageName) {
        this.navCtrl.push('SetHomeImagePage', {
            data: imageName
        }, { animation: 'ios-transition' });
    };
    ChooseHomeImagePage.prototype.getFunctionAccess = function () {
        var _this = this;
        var data = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', this.loggedInUserData.PERSON_ID)
            .set('event_id', this.UpcomingSingleEvent.event_id)
            .set('selectedTeam', this.loggedInUserData.SELECTEDTEAM);
        this.http.post(this.global.APIURL + 'users/getPersonAccess', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            if (_this.loggedInUserData.ADMINLEVEL == 1) {
                var setData = {
                    user_adminLevel: 1,
                    event_StillComing: 'no',
                    event_EventDetail: 'yes',
                    event_BorrowPlayer: 'yes',
                    event_GroupMessage: 'yes',
                    event_SessionPlan: 'yes but not now',
                    event_Injury: 'yes',
                    event_tab_Attendance: 'yes',
                    event_tab_Overview: 'no',
                    event_Welfare: 'yes',
                    team_assigned: 'yes',
                    player_coachingReport: 'yes',
                    voting_for_player: 'yes',
                    game_report: 'yes',
                    game_score: 'yes'
                };
                _this.storage.set('FunctionAccess', setData);
            }
            else if (_this.loggedInUserData.ADMINLEVEL == 2) {
                var setData1 = {
                    user_adminLevel: 2,
                    event_StillComing: 'no',
                    event_EventDetail: 'yes',
                    event_BorrowPlayer: 'yes',
                    event_GroupMessage: 'yes',
                    event_SessionPlan: 'yes but not now',
                    event_Injury: 'yes',
                    event_tab_Attendance: 'yes',
                    event_tab_Overview: 'no',
                    event_Welfare: 'yes',
                    team_assigned: 'yes',
                    player_coachingReport: 'yes',
                    voting_for_player: 'yes',
                    game_report: 'yes',
                    game_score: 'yes'
                };
                _this.storage.set('FunctionAccess', setData1);
            }
            else if (_this.loggedInUserData.ADMINLEVEL == 3) {
                var setData1 = {
                    user_adminLevel: 3,
                    event_StillComing: 'no',
                    event_EventDetail: 'yes',
                    event_BorrowPlayer: 'yes',
                    event_GroupMessage: 'yes',
                    event_SessionPlan: 'yes but not now',
                    event_Injury: 'yes',
                    event_tab_Attendance: 'yes',
                    event_tab_Overview: 'no',
                    event_Welfare: 'yes',
                    team_assigned: 'yes',
                    player_coachingReport: 'yes',
                    voting_for_player: 'yes',
                    game_report: 'yes',
                    game_score: 'yes'
                };
                _this.storage.set('FunctionAccess', setData1);
            }
            else {
                var setData1 = {
                    user_adminLevel: 4,
                    event_StillComing: 'yes',
                    event_EventDetail: 'self',
                    event_BorrowPlayer: 'no',
                    event_GroupMessage: 'no',
                    event_SessionPlan: 'no',
                    event_Injury: 'self',
                    event_tab_Attendance: 'no',
                    event_tab_Overview: 'yes',
                    event_Welfare: 'self',
                    team_assigned: 'yes',
                    player_coachingReport: 'yes',
                    voting_for_player: 'no',
                    game_report: 'no',
                    game_score: 'no'
                };
                _this.storage.set('FunctionAccess', setData1);
            }
        }, function (error) {
        });
    };
    ChooseHomeImagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-choose-home-image',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/choose-home-image/choose-home-image.html"*/'\n<ion-content class="bg-gradient {{bgThemeColor}}">\n  <div class="bg-gradient {{bgThemeColor}}">\n    <section class="main">\n      <form action="" class="user-form profile">\n        <section class="innerContent bg-gradient {{bgThemeColor}}">\n          <div class="form-group">\n            <label class="mb-30">CHOOSE YOUR <br> HOMESCREEN IMAGE</label>\n          </div>\n          <div class="divider"></div>\n          <div class="form-group mt-xl">\n            <div class="homeScreen">\n              <div class="row">\n                <div class="thumbnail col-xs-4" [class.active]="(homeScreen_bg==\'img-1.jpg\')">\n                  <img src="assets/images/img-xs-1.jpg" alt="" (click)="setHomeImage(\'img-1.jpg\')">\n                </div>\n                <div class="thumbnail col-xs-4" [class.active]="(homeScreen_bg==\'img-2.jpg\')">\n                  <img src="assets/images/img-xs-2.jpg" alt="" (click)="setHomeImage(\'img-2.jpg\')">\n                </div>\n                <div class="thumbnail col-xs-4" [class.active]="(homeScreen_bg==\'img-3.jpg\')">\n                  <img src="assets/images/img-xs-3.jpg" alt="" (click)="setHomeImage(\'img-3.jpg\')">\n                </div>\n              </div>\n              <div class="row">\n                <div class="thumbnail col-xs-4" [class.active]="(homeScreen_bg==\'img-4.jpg\')">\n                  <img src="assets/images/img-xs-4.jpg" alt="" (click)="setHomeImage(\'img-4.jpg\')">\n                </div>\n                <div class="thumbnail col-xs-4"[class.active]="(homeScreen_bg==\'img-5.jpg\')">\n                  <img src="assets/images/img-xs-5.jpg" alt="" (click)="setHomeImage(\'img-5.jpg\')">\n                </div>\n                <div class="thumbnail col-xs-4" [class.active]="(homeScreen_bg==\'img-6.jpg\')">\n                  <img src="assets/images/img-xs-6.jpg" alt="" (click)="setHomeImage(\'img-6.jpg\')">\n                </div>\n              </div>\n              <div class="row">\n                <div class="thumbnail col-xs-4" [class.active]="(homeScreen_bg==\'img-7.jpg\')">\n                  <img src="assets/images/img-xs-7.jpg" alt="" (click)="setHomeImage(\'img-7.jpg\')">\n                </div>\n                <div class="thumbnail col-xs-4" [class.active]="(homeScreen_bg==\'img-8.jpg\')">\n                  <img src="assets/images/img-xs-8.jpg" alt="" (click)="setHomeImage(\'img-8.jpg\')">\n                </div>\n                <div class="thumbnail col-xs-4" [class.active]="(homeScreen_bg==\'img-9.jpg\')">\n                  <img src="assets/images/img-xs-9.jpg" alt="" (click)="setHomeImage(\'img-9.jpg\')">\n                </div>\n              </div>\n              <!-- <div class="row">\n                <div class="thumbnail col-xs-4" [class.active]="(homeScreen_bg==\'img-10.jpg\')">\n                  <img src="assets/images/img-xs-10.jpg" alt="" (click)="setHomeImage(\'img-10.jpg\')">\n                </div>\n                <div class="thumbnail col-xs-4" [class.active]="(homeScreen_bg==\'img-12.jpg\')">\n                  <img src="assets/images/img-xs-12.jpg" alt="" (click)="setHomeImage(\'img-12.jpg\')">\n                </div>\n                <div class="thumbnail col-xs-4" [class.active]="(homeScreen_bg==\'img-13.jpg\')">\n                  <img src="assets/images/img-xs-13.jpg" alt="" (click)="setHomeImage(\'img-13.jpg\')">\n                </div>\n              </div> -->\n            </div>\n          </div>\n          <div class="info-item text-left">You can come back here and change your home screen image at any time under the settings menu.</div>\n        </section>\n      </form>\n    </section>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/choose-home-image/choose-home-image.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], ChooseHomeImagePage);
    return ChooseHomeImagePage;
}());

//# sourceMappingURL=choose-home-image.js.map

/***/ })

});
//# sourceMappingURL=88.js.map