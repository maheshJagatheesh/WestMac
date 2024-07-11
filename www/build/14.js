webpackJsonp([14],{

/***/ 842:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamListPageModule", function() { return TeamListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__team_list__ = __webpack_require__(942);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TeamListPageModule = /** @class */ (function () {
    function TeamListPageModule() {
    }
    TeamListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__team_list__["a" /* TeamListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__team_list__["a" /* TeamListPage */]),
            ],
        })
    ], TeamListPageModule);
    return TeamListPageModule;
}());

//# sourceMappingURL=team-list.module.js.map

/***/ }),

/***/ 942:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar_ngx__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_global_api_global_api__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var TeamListPage = /** @class */ (function () {
    function TeamListPage(navCtrl, navParams, loadingCtrl, storage, global, http, statusBar, gFn, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.global = global;
        this.http = http;
        this.statusBar = statusBar;
        this.gFn = gFn;
        this.global_api = global_api;
        this.gFn.hideMenuIcon();
        var loader = this.loadingCtrl.create({});
        loader.present();
        setTimeout(function () {
            _this.getTeamList().then(function (x) {
                if (x) {
                    loader.dismiss();
                }
                else {
                    _this.navCtrl.pop();
                }
            });
        }, 1200);
    }
    TeamListPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.statusBar.hide();
        if (this.navParams.get('UpcomingSingleEvent')) {
            this.UpcomingSingleEvent = JSON.parse(this.navParams.get('UpcomingSingleEvent'));
        }
        else {
            this.storage.get('UpcomingSingleEvent').then(function (val) {
                _this.UpcomingSingleEvent = JSON.parse(val);
            });
        }
    };
    TeamListPage.prototype.ionViewDidLeave = function () {
        this.statusBar.show();
    };
    TeamListPage.prototype.getTeamList = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.get('loggedInUserData').then(function (val) {
                _this.LoggedInDataCred = val;
                var teamData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                    // .set('person_id', this.LoggedInDataCred.PERSON_ID)
                    .set('selectedTeam', _this.LoggedInDataCred.SELECTEDTEAM);
                // this.http.post(this.global.APIURL+"teams/getAllTeams", teamData)
                _this.http.post(_this.global.APIURL + "teams/getAllBorrowedTeams", teamData, { headers: _this.global_api.getHeader() })
                    .subscribe(function (data) {
                    if (data.SUCCESS) {
                        _this.TeamList = data.GETALLBORROWEDTEAMS;
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }, function (error) {
                    resolve(false);
                });
            });
        });
    };
    TeamListPage.prototype.backArrow = function () {
        this.navCtrl.pop();
    };
    TeamListPage.prototype.choosePlayer = function (TeamData, event) {
        $(event.target).closest('.well').addClass('active');
        this.navCtrl.push('ChoosePlayersPage', { TeamData: TeamData, UpcomingSingleEvent: JSON.stringify(this.UpcomingSingleEvent) }).then(function () {
            $(event.target).closest('.well').removeClass('active');
        });
    };
    TeamListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-team-list',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/team-list/team-list.html"*/'\n<ion-content class="bg-black borrowPlayer">\n    <section class="main mt-20" style="margin-top: 10%;">\n        <div class="top-bar">\n            <div class="col-xs-3" (click)="backArrow()">\n                <div class="backArrow inverse"></div>\n            </div>\n        </div>\n        <form action="" class="user-form">\n            <h5 class="sm-title text-left col-xs-12 mt-20" >TEAM LIST\n            <section class="heightAuto">\n                <div class="event-card borrow" >\n                    <div class="well select-card " *ngIf="TeamList==\'\' ">\n                        <div class="row">\n                            <div class="col-xs-12 ">\n                                <h5 class="sub-title">NO TEAM FOUND</h5>\n                            </div>\n                        </div>\n                    </div>\n                    \n                    <div class="well select-card" *ngFor="let key of TeamList; let i= index" (click)="choosePlayer(key,$event)">\n                        \n                        <div class="row">\n                            <div class="card-item col-xs-2 p-0">\n                                <div class="text-info">{{i+1}}</div>\n                            </div>\n                            <div class="card-title col-xs-6 p-0"> {{key.lendTeam_name}}</div>\n                            <div class="card-item col-xs-3 p-0">\n                                <div class="text-info">{{key.division_name}}</div>\n                            </div>\n                            <div class="event-next col-xs-1 p-0">\n                                <a href="" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n                            </div>\n                        </div>\n                    </div>\n\n                </div>\n            </section>\n          </h5>\n        </form>\n        </section>\n\n</ion-content>\n\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/team-list/team-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar_ngx__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_6__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], TeamListPage);
    return TeamListPage;
}());

//# sourceMappingURL=team-list.js.map

/***/ })

});
//# sourceMappingURL=14.js.map