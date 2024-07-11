webpackJsonp([38],{

/***/ 817:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerGradingPageModule", function() { return PlayerGradingPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__player_grading__ = __webpack_require__(919);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PlayerGradingPageModule = /** @class */ (function () {
    function PlayerGradingPageModule() {
    }
    PlayerGradingPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__player_grading__["a" /* PlayerGradingPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__player_grading__["a" /* PlayerGradingPage */]),
            ],
        })
    ], PlayerGradingPageModule);
    return PlayerGradingPageModule;
}());

//# sourceMappingURL=player-grading.module.js.map

/***/ }),

/***/ 919:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerGradingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_functions_global_functions__ = __webpack_require__(34);
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
 * Generated class for the PlayerGradingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PlayerGradingPage = /** @class */ (function () {
    function PlayerGradingPage(navCtrl, navParams, gFn) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.gFn = gFn;
        this.activeReport = '';
    }
    PlayerGradingPage.prototype.playerGradeReport = function (report) {
        this.activeReport = report;
        var param = { report: report };
        this.navCtrl.push('PlayerListGradeReportPage', param);
    };
    PlayerGradingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-player-grading',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/player-grading/player-grading.html"*/'<!--\n  Generated template for the PlayerGradingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <nav class="navbar navbar-fixed-top">\n    <div class="top-bar clearfix">\n      <div class="pull-left">\n        <div class="backArrow info-item" (click)="goToPlayersDashboard()">PLAYERS</div>\n      </div>\n      <div class="prev-next pull-right" (click)="goToChooseTeamsPage()">\n        <a href="javascript:void(0);" class="next"></a>\n        <a href="javascript:void(0);" class="prev"></a>\n      </div>\n    </div>\n    <ul class="nav navbar-nav top-menu player-menu">\n      <li class=""><a href="javascript:void(0);" (click)="goToPlayerGroupMessage()">Group message</a></li>\n      <li class="active"><a href="javascript:void(0);">Grading</a></li>\n      <li class=""><a href="javascript:void(0);" (click)="goToPlayerAddForGrading()">Add player</a></li>\n    </ul>\n  </nav>\n</ion-header>\n\n<ion-content>\n  <div class="bg-gray event">\n    <section class="main">\n      <form action="" class="user-form player-item">\n        <section class="profileFirst heightAuto xs-padding">\n          <div class="event-card welfare bg-gray player-list">\n            <div class="well select-card" [class.active]="(activeReport==\'REPORT 1\')" (click)="playerGradeReport(\'REPORT 1\')">\n              <div class="row">\n                <div class="card-title col-xs-11 p-0">REPORT 1 </div>\n                <div class="event-next col-xs-1 p-0">\n                  <a href="javascript:void(0);" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n                </div>\n              </div>\n            </div>\n            <div class="well select-card" [class.active]="(activeReport==\'REPORT 2\')" (click)="playerGradeReport(\'REPORT 2\')">\n              <div class="row">\n                <div class="card-title col-xs-11 p-0">REPORT 2 </div>\n                <div class="event-next col-xs-1 p-0">\n                  <a href="javascript:void(0);" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n                </div>\n              </div>\n            </div>\n            <div class="well select-card" [class.active]="(activeReport==\'WEEKLY REPORT\')" (click)="playerGradeReport(\'WEEKLY REPORT\')">\n              <div class="row">\n                <div class="card-title col-xs-11 p-0">WEEKLY REPORT </div>\n                <div class="event-next col-xs-1 p-0">\n                  <a href="javascript:void(0);" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n                </div>\n              </div>\n            </div>\n            <div class="well select-card" [class.active]="(activeReport==\'MONTHLY REPORT\')" (click)="playerGradeReport(\'MONTHLY REPORT\')">\n              <div class="row">\n                <div class="card-title col-xs-11 p-0">MONTHLY REPORT </div>\n                <div class="event-next col-xs-1 p-0">\n                  <a href="javascript:void(0);" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n                </div>\n              </div>\n            </div>\n            <div class="well select-card" [class.active]="(activeReport==\'TRAINING REPORT\')" (click)="playerGradeReport(\'TRAINING REPORT\')">\n              <div class="row">\n                <div class="card-title col-xs-11 p-0">TRAINING REPORT </div>\n                <div class="event-next col-xs-1 p-0">\n                  <a href="javascript:void(0);" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n                </div>\n              </div>\n            </div>\n          </div>\n        </section>\n      </form>\n    </section>\n  </div>\n</ion-content>\n\n<ion-footer>\n  <nav class="navbar navbar-default navbar-fixed-bottom">\n    <div class="container-fluid">\n      <ul class="nav navbar-nav">\n        <li class="home" (click)="gotoHome()"><a href="javascript:void(0);">Home</a></li>\n        <li class="events" (click)="gotoDisplayEvents()"><a href="javascript:void(0);">Events</a></li>\n        <li class="players active" (click)="goToPlayersDashboard()"><a href="javascript:void(0);">Players</a></li>\n        <li class="comment" (click)="goToChatDashboard()"><a href="javascript:void(0);">Comments</a></li>\n        <li class="more" (click)="goToMenuPage()"><a href="javascript:void(0);">More</a></li>\n      </ul>\n    </div>\n  </nav>\n</ion-footer>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/player-grading/player-grading.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */]])
    ], PlayerGradingPage);
    return PlayerGradingPage;
}());

//# sourceMappingURL=player-grading.js.map

/***/ })

});
//# sourceMappingURL=38.js.map