webpackJsonp([36],{

/***/ 818:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerListGradeReportPageModule", function() { return PlayerListGradeReportPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__player_list_grade_report__ = __webpack_require__(920);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PlayerListGradeReportPageModule = /** @class */ (function () {
    function PlayerListGradeReportPageModule() {
    }
    PlayerListGradeReportPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__player_list_grade_report__["a" /* PlayerListGradeReportPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__player_list_grade_report__["a" /* PlayerListGradeReportPage */]),
            ],
        })
    ], PlayerListGradeReportPageModule);
    return PlayerListGradeReportPageModule;
}());

//# sourceMappingURL=player-list-grade-report.module.js.map

/***/ }),

/***/ 920:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerListGradeReportPage; });
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
 * Generated class for the PlayerListGradeReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PlayerListGradeReportPage = /** @class */ (function () {
    function PlayerListGradeReportPage(navCtrl, navParams, storage, events, http, loadingCtrl, global, gFn, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.events = events;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.global = global;
        this.gFn = gFn;
        this.global_api = global_api;
        this.reportCategory = '';
        this.activePlayer = '';
        this.players = [];
        this.reportCategory = this.navParams.get('report');
        this.storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
            _this.getTeamPlayersWithEventGrade();
        });
    }
    PlayerListGradeReportPage.prototype.getTeamPlayersWithEventGrade = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', this.loggedInUserData.PERSON_ID)
            .set('client_id', this.loggedInUserData.CLIENT_ID)
            .set('selectedTeam', this.loggedInUserData.SELECTEDTEAM)
            .set('flag', '1');
        this.http.post(this.global.APIURL + 'players/getTeamPlayersWithEventGrade', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS) {
                _this.players = response.GETTEAMPLAYERSWITHEVENTGRADE;
            }
        }, function (error) {
            loading.dismiss();
        });
    };
    PlayerListGradeReportPage.prototype.playerDetails = function (personID) {
        this.activePlayer = personID;
        //this.navCtrl.push('PlayerDetailsPage');
    };
    PlayerListGradeReportPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-player-list-grade-report',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/player-list-grade-report/player-list-grade-report.html"*/'<!--\n  Generated template for the PlayerListGradeReportPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <nav class="navbar navbar-fixed-top">\n    <div class="top-bar clearfix">\n      <div class="pull-left">\n        <div class="backArrow info-item" (click)="goToPlayersDashboard()">PLAYERS</div>\n      </div>\n      <div class="prev-next pull-right" (click)="goToChooseTeamsPage()">\n        <a href="javascript:void(0);" class="next"></a>\n        <a href="javascript:void(0);" class="prev"></a>\n      </div>\n    </div>\n    <ul class="nav navbar-nav top-menu player-menu">\n      <li class=""><a href="javascript:void(0);" (click)="goToPlayerGroupMessage()">Group message</a></li>\n      <li class="active"><a href="javascript:void(0);">Grading</a></li>\n      <li class=""><a href="javascript:void(0);" (click)="goToPlayerAddForGrading()">Add player</a></li>\n    </ul>\n  </nav>\n</ion-header>\n\n<ion-content class="bg-gray event">\n  <section class="main">\n    <form action="" class="user-form player-item">\n      <section class="profileFirst heightAuto xs-padding">\n        <div class="player-main">\n          <div class="player-grad-player">\n            <div class="month-report">{{reportCategory}}</div>\n          </div>\n          <div class="left-side">\n            <div class="event-card player-card bg-gray" *ngIf="players.length > 0; else noPlayers">\n              <div class="well select-card" [class.active]="(activePlayer==player.person_id)" *ngFor="let player of players" (click)="playerDetails(player.person_id)">\n                <div class="row">\n                  <div class="card-img col-xs-2 p-0">\n                    <span class="">\n                      <img *ngIf="player.photoPath != null && player.photopath.length > 0; else noImage" src="{{global.PROFILEIMAGEURL}}{{player.photopath}}" alt="" class="img-circle">\n                      <ng-template #noImage><img src="assets/images/test-user.svg" alt="" class="img-circle"></ng-template>\n                    </span>\n                  </div>\n                  <div class="card-title col-xs-9 p-0">{{player.first_name}} {{player.last_name}} <p>#01</p></div>\n                  <div class="event-next col-xs-1 p-0">\n                    <a href="javascript:void(0);" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <ng-template #noPlayers>\n              <div class="event-card player-card bg-gray">\n                <div class="well select-card">\n                  <div class="row">\n                    <div class="card-title col-xs-12 p-0">No Players Found</div>\n                  </div>\n                </div>\n              </div>\n            </ng-template>\n          </div>\n          <div class="right-side">\n            <li class=""><a href="javascript:void(0);">A</a></li>\n            <li class=""><a href="javascript:void(0);">B</a></li>\n            <li class=""><a href="javascript:void(0);">C</a></li>\n            <li class=""><a href="javascript:void(0);">D</a></li>\n            <li class=""><a href="javascript:void(0);">E</a></li>\n            <li class=""><a href="javascript:void(0);">F</a></li>\n            <li class=""><a href="javascript:void(0);">G</a></li>\n            <li class=""><a href="javascript:void(0);">H</a></li>\n            <li class=""><a href="javascript:void(0);">I</a></li>\n            <li class=""><a href="javascript:void(0);">J</a></li>\n            <li class=""><a href="javascript:void(0);">K</a></li>\n            <li class=""><a href="javascript:void(0);">L</a></li>\n            <li class=""><a href="javascript:void(0);">M</a></li>\n            <li class=""><a href="javascript:void(0);">N</a></li>\n            <li class=""><a href="javascript:void(0);">O</a></li>\n            <li class=""><a href="javascript:void(0);">P</a></li>\n            <li class=""><a href="javascript:void(0);">Q</a></li>\n            <li class=""><a href="javascript:void(0);">R</a></li>\n            <li class=""><a href="javascript:void(0);">S</a></li>\n            <li class=""><a href="javascript:void(0);">T</a></li>\n            <li class=""><a href="javascript:void(0);">U</a></li>\n            <li class=""><a href="javascript:void(0);">V</a></li>\n            <li class=""><a href="javascript:void(0);">W</a></li>\n            <li class=""><a href="javascript:void(0);">X</a></li>\n            <li class=""><a href="javascript:void(0);">Y</a></li>\n            <li class=""><a href="javascript:void(0);">Z</a></li>\n          </div>\n        </div>\n      </section>\n    </form>\n  </section>\n</ion-content>\n\n<ion-footer>\n  <nav class="navbar navbar-default navbar-fixed-bottom">\n    <div class="container-fluid">\n      <ul class="nav navbar-nav">\n        <li class="home" (click)="gotoHome()"><a href="javascript:void(0);">Home</a></li>\n        <li class="events" (click)="gotoDisplayEvents()"><a href="javascript:void(0);">Events</a></li>\n        <li class="players active" (click)="goToPlayersDashboard()"><a href="javascript:void(0);">Players</a></li>\n        <li class="comment" (click)="goToChatDashboard()"><a href="javascript:void(0);">Comments</a></li>\n        <li class="more" (click)="goToMenuPage()"><a href="javascript:void(0);">More</a></li>\n      </ul>\n    </div>\n  </nav>\n</ion-footer>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/player-list-grade-report/player-list-grade-report.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], PlayerListGradeReportPage);
    return PlayerListGradeReportPage;
}());

//# sourceMappingURL=player-list-grade-report.js.map

/***/ })

});
//# sourceMappingURL=36.js.map