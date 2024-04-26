webpackJsonp([54],{

/***/ 800:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InjuredListPageModule", function() { return InjuredListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__injured_list__ = __webpack_require__(903);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var InjuredListPageModule = /** @class */ (function () {
    function InjuredListPageModule() {
    }
    InjuredListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__injured_list__["a" /* InjuredListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__injured_list__["a" /* InjuredListPage */]),
            ],
        })
    ], InjuredListPageModule);
    return InjuredListPageModule;
}());

//# sourceMappingURL=injured-list.module.js.map

/***/ }),

/***/ 903:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InjuredListPage; });
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








var InjuredListPage = /** @class */ (function () {
    function InjuredListPage(navCtrl, navParams, toastCtrl, modalCtrl, global, statusBar, http, storage, loadingCtrl, gFn, platform, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.global = global;
        this.statusBar = statusBar;
        this.http = http;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.gFn = gFn;
        this.global_api = global_api;
        this.ShowSeverityPage = false;
        this.medicalInfo = false;
        this.gFn.hideMenuIcon();
        this.PhotoApiUrl = this.global.PROFILEIMAGEURL;
        // console.log(this.PhotoApiUrl )
        platform.registerBackButtonAction(function () {
            _this.backArrow();
        });
    }
    InjuredListPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.statusBar.hide();
        this.storage.get('FunctionAccess').then(function (val) {
            _this.FunctionAccess = val;
        });
        this.storage.get('UpcomingSingleEvent').then(function (val) {
            _this.UpcomingSingleEvent = JSON.parse(val);
            _this.seasonId = _this.navParams.get('season_id');
            _this.storage.get('loggedInUserData').then(function (val) {
                _this.PersonData = val;
                var loader = _this.loadingCtrl.create({});
                loader.present();
                _this.AllPlayersLoad().then(function (z) {
                    if (z) {
                        loader.dismiss();
                    }
                    else {
                        loader.dismiss();
                        alert("No Data Found");
                        _this.navCtrl.pop();
                    }
                });
            });
        });
    };
    InjuredListPage.prototype.ionViewDidLeave = function () {
        this.statusBar.show();
        this.gFn.showMenuIcon();
    };
    InjuredListPage.prototype.incidentReport = function (injured_person_id) {
        if (this.ShowSeverityPage == false && !this.medicalInfo) {
            if (this.PersonData.PERSON_ID == injured_person_id || this.FunctionAccess.event_Injury == 'yes') {
                this.navCtrl.push('InjuryIncidentReportPage', { 'injured_person_id': injured_person_id.person_id, 'incident_id': injured_person_id.incident_id, 'season_id': this.seasonId });
            }
        }
        else {
            this.ShowSeverityPage = false;
        }
    };
    InjuredListPage.prototype.backArrow = function () {
        //this.navCtrl.push('EventDashboardPage');
        this.navCtrl.pop();
    };
    InjuredListPage.prototype.AllPlayersLoad = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var selectedTeam = _this.PersonData.SELECTEDTEAM;
            if (_this.UpcomingSingleEvent.event_type_id == 2 && _this.UpcomingSingleEvent.teamid) {
                selectedTeam = _this.UpcomingSingleEvent.teamid;
            }
            else if (_this.UpcomingSingleEvent.event_type_id == 1) {
                if (_this.UpcomingSingleEvent.homeclubid == _this.PersonData.CLUB_ID) {
                    selectedTeam = _this.UpcomingSingleEvent.hometeam;
                }
                else {
                    selectedTeam = _this.UpcomingSingleEvent.awayteam;
                }
            }
            var PlayersData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('event_id', _this.UpcomingSingleEvent.event_id)
                .set('client_id', _this.UpcomingSingleEvent.client_id)
                .set('selectedTeam', selectedTeam);
            _this.http.post(_this.global.APIURL + "players/AllLoadPlayersAttendance", PlayersData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS) {
                    var dataLength = 0;
                    for (var key in data.DATA) {
                        for (var key in data.DATA[key]) {
                            dataLength = 1;
                        }
                    }
                    if (dataLength == 1) {
                        _this.eventAttend = data.DATA;
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }
                else {
                    resolve(false);
                }
            }, function (error) {
                resolve(false);
            });
        });
    };
    InjuredListPage.prototype.DisplaySeverityDetails = function (playerAilments) {
        this.ShowSeverityPage = true;
        if (playerAilments) {
            var SeverityModal = this.modalCtrl.create('SeverityDetailsModalPage', { playerAilments: playerAilments });
            SeverityModal.present();
        }
        else {
            this.presentToast('No Details found');
        }
    };
    InjuredListPage.prototype.MedicineInformation = function (data) {
        var _this = this;
        this.medicalInfo = true;
        var MedicineInfo = this.modalCtrl.create('MedicineInfoPage', { values: data });
        MedicineInfo.present();
        MedicineInfo.onDidDismiss(function () {
            _this.medicalInfo = false;
        });
    };
    InjuredListPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    InjuredListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-injured-list',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/injured-list/injured-list.html"*/'\n<ion-content class="bg-black borrowPlayer">\n    <section class="main mt-20">\n        <div class="top-bar" (click)="backArrow()">\n            <div class="col-xs-3">\n                <div class="backArrow inverse"></div>\n            </div>\n        </div>\n        <form action="" class="user-form">\n            \n            <section class="profileFirst heightAuto">\n                <div class="event-card borrow" *ngIf="eventAttend" >\n                    <div class="injuryCardBottom" *ngFor="let StateAttendy of eventAttend;let i=index">\n                        <div *ngIf="i<3">\n                            <div class="well select-card" [class.red]="Attendy.injuryStatus==1" *ngFor="let Attendy of StateAttendy">\n                                <div class="row" (click)="incidentReport(Attendy)">\n                                    <div class="card-img col-xs-2 p-0">\n                                            <span  *ngIf="!Attendy.PHOTOPATH">\n                                                <div class="img-circle"><span class="img-text">{{Attendy.first_name[0]}} {{Attendy.last_name[0]}} </span></div>\n                                                <!-- <img src="assets/images/test-user.svg" alt="" class="img-circle"> -->\n                                            </span>\n                                            <span  *ngIf="Attendy.PHOTOPATH">\n                                                <img src={{PhotoApiUrl}}{{Attendy.PHOTOPATH}} alt="" class="img-circle">\n                                            </span>\n                            \n                                            </div>\n                                    <div class="card-title col-xs-8 p-0">{{Attendy.first_name | uppercase}} {{Attendy.last_name | uppercase}}\n                                        \n                                        <div>\n                                            <span *ngIf="Attendy.uniformid">#{{Attendy.uniformid}}</span>\n                                        </div>\n                                        <div class="suit-iconCard fixedRight" (click)="DisplaySeverityDetails(Attendy)" *ngIf="FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1 && ((Attendy.playerAilmentsSeverityIcon) || (Attendy.showMedicine==1))">\n                                            <img src={{global.ImagesPath}}{{Attendy.playerAilmentsSeverityIcon}} class="suit-icon" *ngIf="(Attendy.playerAilmentsSeverityIcon  && (Attendy.showMedicine==1 || Attendy.showMedicine==0))">\n                                            <img src="{{global.ImagesPath}}pills.svg" class="medical-bottle" *ngIf="((Attendy.showMedicine==1) && (!Attendy.playerAilmentsSeverityIcon))">\n                                        </div>\n                                        \n                                    </div>\n                                    <!-- <div class="col-xs-3 p-0">\n                                        <div class="suit-iconCard" (click)="DisplaySeverityDetails(Attendy.playerAilments)" *ngIf="Attendy.playerAilmentsSeverityIcon && FunctionAccess && FunctionAccess.medicalKit==\'yes\'">\n                                            <img src={{global.ImagesPath}}{{Attendy.playerAilmentsSeverityIcon}}  class="suit-icon">\n                                        </div> -->\n                                        \n                                        <!-- <div class="medical-bottleCard" (click)="MedicineInformation(Attendy)" *ngIf="Attendy.showMedicine==1 && FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1">\n                                            <img src="{{global.ImagesPath}}medicine_bottle.png" class="medical-bottle">\n                                        </div>\n                                    </div> -->\n                                    <div class="event-add col-xs-2 p-0">\n                                        <i class="material-icons">add</i>\n                                    </div>\n                                </div>\n                            </div>\n\n                        </div>\n                        \n                    </div>\n\n                </div>\n            </section>\n        </form>\n        </section>\n\n</ion-content>'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/injured-list/injured-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar_ngx__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_6__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_7__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], InjuredListPage);
    return InjuredListPage;
}());

//# sourceMappingURL=injured-list.js.map

/***/ })

});
//# sourceMappingURL=54.js.map