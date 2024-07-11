webpackJsonp([66],{

/***/ 787:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventUpdatePlayerModalPageModule", function() { return EventUpdatePlayerModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_update_player_modal__ = __webpack_require__(890);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EventUpdatePlayerModalPageModule = /** @class */ (function () {
    function EventUpdatePlayerModalPageModule() {
    }
    EventUpdatePlayerModalPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__event_update_player_modal__["a" /* EventUpdatePlayerModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__event_update_player_modal__["a" /* EventUpdatePlayerModalPage */]),
            ],
        })
    ], EventUpdatePlayerModalPageModule);
    return EventUpdatePlayerModalPageModule;
}());

//# sourceMappingURL=event-update-player-modal.module.js.map

/***/ }),

/***/ 890:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventUpdatePlayerModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_api_global_api__ = __webpack_require__(24);
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
 * Generated class for the EventUpdatePlayerModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EventUpdatePlayerModalPage = /** @class */ (function () {
    function EventUpdatePlayerModalPage(navCtrl, navParams, view, http, global, global_api) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = view;
        this.http = http;
        this.global = global;
        this.global_api = global_api;
        this.isButtonDisabled = false;
        this.btnDisabled = "";
    }
    EventUpdatePlayerModalPage.prototype.ionViewWillLoad = function () {
        var stats = this.navParams.get('stats');
        var info = this.navParams.get('info');
        this.eventId = this.navParams.get('event');
        this.playerStats = stats;
        this.playerInfo = info;
    };
    EventUpdatePlayerModalPage.prototype.close = function () {
        this.view.dismiss();
    };
    EventUpdatePlayerModalPage.prototype.onUpdateStats = function (stat_id, statValue, person_stats_id, increment) {
        var _this = this;
        //let loading = this.loadingCtrl.create();
        //loading.present();
        this.btnDisabled = "disabled";
        var statVal = statValue;
        if (increment == 1) {
            statVal = Number.isInteger(statVal) ? (statVal + 1) : 1;
            //statVal = parseInt(statValue) + 1;
        }
        else if (statValue != 0) {
            statVal = statValue - 1;
        }
        var updateStatsData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('event_id', this.eventId)
            .set('person_id', this.playerInfo.person)
            .set('person_stats_id', person_stats_id)
            .set('stat_val', statVal)
            .set('stat_id', stat_id)
            .set('period_id', '0');
        if (Number.isInteger(statVal)) {
            this.http.post(this.global.APIURL + 'stats/savePlayerStats', updateStatsData, { headers: this.global_api.getHeader() })
                .subscribe(function (response) {
                if (response.SUCCESS) {
                    var index = _this.playerStats.findIndex(function (playerStats) { return playerStats.stat_id == stat_id; });
                    if (increment == 1) {
                        if (Number.isInteger(_this.playerStats[index].statValue)) {
                            _this.playerStats[index].statValue += 1;
                        }
                        else {
                            _this.playerStats[index].statValue = 1;
                        }
                    }
                    else {
                        if (Number.isInteger(_this.playerStats[index].statValue)) {
                            _this.playerStats[index].statValue -= 1;
                        }
                    }
                    _this.btnDisabled = "";
                    //loading.dismiss();
                }
                else {
                    alert('Sorry no matching result found');
                    _this.btnDisabled = "";
                    //loading.dismiss();
                }
            }, function (error) {
                _this.btnDisabled = "";
                //loading.dismiss();
            });
        }
    };
    EventUpdatePlayerModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event-update-player-modal',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-update-player-modal/event-update-player-modal.html"*/'<!--\n  Generated template for the EventUpdatePlayerModalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding>\n  <div class="play-item">\n    <div class="modal-content">\n        <div class="modal-header shadow">\n            <h4 class="modal-title fontBold text-center">{{playerInfo.fName + \' \' + playerInfo.lName}}</h4>\n            <h4 class="modal-title fontBold text-center">#12</h4>\n        </div>\n        <div class="modal-body">\n            <ul class="list-group play-list" *ngFor="let stats of playerStats">\n                <li class="list-group-item clearfix">\n                    <label *ngIf="stats.statValue == \'\'">-</label> \n                    <label *ngIf="stats.statValue != \'\'">{{stats.statValue}}</label>\n                    {{stats.stat_label}}\n\n                    <span class="pull-right plus {{btnDisabled}}" (click)="onUpdateStats(stats.stat_id, stats.statValue, stats.person_stats_id, increment = 1)"></span>\n                    <span class="pull-right minus {{btnDisabled}}"  (click)="onUpdateStats(stats.stat_id, stats.statValue, stats.person_stats_id, increment = 0)"></span>\n                </li>\n            </ul>\n            <div class="player-option shadow">\n                <div class="row">\n                    <div class="col-xs-10">\n                        <h4 class="text-blue" *ngIf="playerInfo.min > 9 && playerInfo.sec > 9">Play time <span class="time">{{playerInfo.min+\':\'+playerInfo.sec}}</span></h4>\n                        <h4 class="text-blue" *ngIf="playerInfo.min < 10 && playerInfo.sec < 10">Play time <span class="time">{{\'0\'+playerInfo.min+\':0\'+playerInfo.sec}}</span></h4>\n                        <h4 class="text-blue" *ngIf="playerInfo.min < 9 && playerInfo.sec > 9">Play time <span class="time">{{\'0\'+playerInfo.min+\':\'+playerInfo.sec}}</span></h4>\n                        <h4 class="text-blue" *ngIf="playerInfo.min > 9 && playerInfo.sec < 9">Play time <span class="time">{{playerInfo.min+\':0\'+playerInfo.sec}}</span></h4>\n                        \n                    </div>\n                    <div class="arrow-down col-xs-2">\n                        <i class="fa fa-chevron-down" aria-hidden="true" (click)="close()"></i>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="modal-footer"></div>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-update-player-modal/event-update-player-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], EventUpdatePlayerModalPage);
    return EventUpdatePlayerModalPage;
}());

//# sourceMappingURL=event-update-player-modal.js.map

/***/ })

});
//# sourceMappingURL=66.js.map