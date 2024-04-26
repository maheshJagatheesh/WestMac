webpackJsonp([40],{

/***/ 815:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerCoachingReportPageModule", function() { return PlayerCoachingReportPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__player_coaching_report__ = __webpack_require__(917);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_circle_progress__ = __webpack_require__(336);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PlayerCoachingReportPageModule = /** @class */ (function () {
    function PlayerCoachingReportPageModule() {
    }
    PlayerCoachingReportPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__player_coaching_report__["a" /* PlayerCoachingReportPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__player_coaching_report__["a" /* PlayerCoachingReportPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ng_circle_progress__["a" /* NgCircleProgressModule */].forRoot({
                    radius: 58,
                    outerStrokeWidth: 6,
                    innerStrokeWidth: 0,
                    outerStrokeColor: "#2BBFF0",
                    innerStrokeColor: "#fff",
                    animation: true,
                    animationDuration: 500,
                    titleColor: '#fff',
                    titleFontSize: '28',
                    subtitleColor: '#fff',
                    subtitleFontSize: '8',
                    unitsColor: '#fff',
                    unitsFontSize: '28'
                })
            ],
        })
    ], PlayerCoachingReportPageModule);
    return PlayerCoachingReportPageModule;
}());

//# sourceMappingURL=player-coaching-report.module.js.map

/***/ }),

/***/ 917:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerCoachingReportPage; });
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
 * Generated class for the PlayerCoachingReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PlayerCoachingReportPage = /** @class */ (function () {
    function PlayerCoachingReportPage(navCtrl, navParams, storage, plt, http, loadingCtrl, global, gFn, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.plt = plt;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.global = global;
        this.gFn = gFn;
        this.global_api = global_api;
        this.playerDetails = [];
        this.playerAttendanceStats = [];
        this.playerGameDetails = [];
        this.playerRPEDetails = [];
        this.gameTimes = [];
        this.playerDetails = navParams.get('playerDetails');
        plt.ready().then(function () {
            plt.registerBackButtonAction(function () {
                _this.goBack();
            });
        });
        storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
            _this.getPlayerCoachingReport();
            for (var i = 1; i <= 11; i++) {
                _this.gameTimes.push(i);
            }
        });
    }
    PlayerCoachingReportPage.prototype.getPlayerCoachingReport = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', this.playerDetails[0].person_id)
            .set('team_id', this.loggedInUserData.SELECTEDTEAM)
            .set('client_id', this.loggedInUserData.CLIENT_ID);
        this.http.post(this.global.APIURL + 'players/getPlayerCoachingReport', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS) {
                _this.playerAttendanceStats = response.GETATTENDANCESTATS;
                /*this.playerGameDetails = response.GETALLEVENTSGAMETIME;
                this.playerRPEDetails = response.GETALLEVENTSRPE;
                setTimeout(() => {
                  $("#bars li .bar").each(function(key, bar){
                    let rpe = $(this).data('rpe') * 10;
                    $(this).animate({
                      'height':rpe+'%'
                    }, 1000);
                  });
                }, 1000);*/
            }
        }, function (error) {
            loading.dismiss();
        });
    };
    PlayerCoachingReportPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    PlayerCoachingReportPage.prototype.ionViewDidLoad = function () {
        this.gFn.hideMenuIcon();
    };
    PlayerCoachingReportPage.prototype.ionViewDidLeave = function () {
        this.gFn.showMenuIcon();
    };
    PlayerCoachingReportPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-player-coaching-report',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/player-coaching-report/player-coaching-report.html"*/'<!--\n  Generated template for the PlayerCoachingReportPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="bg-black mt-20">\n  <div class="top-bar">\n    <div class="col-xs-6">\n      <div class="backArrow inverse inverseText" (click)="goBack()"></div>\n    </div>\n  </div>\n</ion-header>\n\n<ion-content class="bg-black event">\n  <section class="main mt-20">\n    <form action="" class="user-form player">\n      <section class="profileFirst heightAuto p-0">\n        <div class="player-section" *ngFor="let player of playerDetails">\n          <div class="thumbImage image-sm">\n            <img *ngIf="player.photoPath != null && player.photoPath.length > 0; else noImage" src="{{global.PROFILEIMAGEURL}}{{player.photoPath}}" alt="" class="img-circle" onerror="this.onerror=null;this.src=\'assets/images/test-user.svg\';">\n            <ng-template #noImage>\n              <div class="img-circle" *ngIf="!player.photoPath"><span class="img-text">{{player.first_name[0]}} {{player.last_name[0]}} </span>\n              </div>\n            </ng-template>\n          </div>\n          <div class="player-info mt-20">\n            <h4 class="info-item">{{player.first_name}} {{player.last_name}}</h4>\n            <p *ngIf="player.uniform_id != null && player.uniform_id.toString().length > 0">#{{player.uniform_id}}</p>\n          </div>\n        </div>\n        <section class="radial-slider mt-20" *ngFor="let playerAttendance of playerAttendanceStats">\n          <div class="row">\n            <div class="col-xs-6">\n              <circle-progress [percent]="playerAttendance.trainingAttended" [subtitle]="\'TRAINING ATTENDANCE\'" ></circle-progress>\n            </div>\n            <div class="col-xs-6">\n              <circle-progress [percent]="playerAttendance.gamesAttended" [subtitle]="\'GAME ATTENDANCE\'" ></circle-progress>\n            </div>\n          </div>\n        </section>\n        <!--<section class="game-time mt-xl">\n          <h4 class="section-head">GAME TIME</h4>\n          <div *ngIf="playerGameDetails.length > 0; else noGame">\n            <div class="row" *ngFor="let playerGameDetail of playerGameDetails">\n              <div class="date-wrap col-xs-2">\n                <div class="date-item">{{playerGameDetail.date}}</div>\n              </div>\n              <div class="time-wrap col-xs-10">\n                <div class="time-dots">\n                  <span class="dots" [class.active]="gameTime <= playerGameDetail.timeGrade" *ngFor="let gameTime of gameTimes"></span>\n                </div>\n              </div>\n            </div>\n            <div class="row">\n              <div class="date-wrap col-xs-2"></div>\n              <div class="time-wrap col-xs-10">\n                <div class="time-dots">\n                  <span class="time-item">10</span>\n                  <span class="time-item">20</span>\n                  <span class="time-item">30</span>\n                  <span class="time-item">40</span>\n                  <span class="time-item">50</span>\n                  <span class="time-item">60</span>\n                  <span class="time-item">70</span>\n                  <span class="time-item">80</span>\n                  <span class="time-item">90</span>\n                  <span class="time-item">100</span>\n                  <span class="time-item">110</span>\n                </div>\n              </div>\n            </div>\n            <div class="row">\n              <div class="date-wrap col-xs-2"></div>\n              <div class="time-wrap col-xs-10">\n                <span class="time-item fontBold">MINUTES</span>\n              </div>\n            </div>\n          </div>\n          <ng-template #noGame>\n            <div class="row">\n              <div class="col-xs-12">\n                <span class="fontBold noData">No data found</span>\n              </div>\n            </div>\n          </ng-template>\n        </section>\n        <section class="chart-wrap mt-30">\n          <h4 class="section-head">MY WELFARE</h4>\n          <div id="chart" *ngIf="playerRPEDetails.length > 0; else noRPE">\n            <div class="chart-area">\n              <ul id="numbers">\n                <li><span>RPE</span></li>\n                <li><span>10</span></li>\n                <li><span>9</span></li>\n                <li><span>8</span></li>\n                <li><span>7</span></li>\n                <li><span>6</span></li>\n                <li><span>5</span></li>\n                <li><span>4</span></li>\n                <li><span>3</span></li>\n                <li><span>2</span></li>\n                <li><span>1</span></li>\n                <li><span>0</span></li>\n              </ul>\n              <ul id="bars">\n                <li *ngFor="let playerRPEDetail of playerRPEDetails; let i = index">\n                  <div *ngIf="i < 7" [attr.data-rpe]="playerRPEDetail.rpe" class="bar"></div>\n                </li>\n              </ul>\n            </div>\n            <ul id="bar-title">\n              <li *ngFor="let playerRPEDetail of playerRPEDetails; let i = index">\n                <span *ngIf="i < 7">{{playerRPEDetail.date}}</span>\n              </li>\n            </ul>\n          </div>\n          <ng-template #noRPE>\n            <div class="row">\n              <div class="col-xs-12">\n                <span class="fontBold noData">No data found</span>\n              </div>\n            </div>\n          </ng-template>\n        </section>-->\n      </section>\n    </form>\n  </section>\n</ion-content>\n\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/player-coaching-report/player-coaching-report.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], PlayerCoachingReportPage);
    return PlayerCoachingReportPage;
}());

//# sourceMappingURL=player-coaching-report.js.map

/***/ })

});
//# sourceMappingURL=40.js.map