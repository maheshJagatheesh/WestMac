webpackJsonp([42],{

/***/ 813:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotifyPlayersPageModule", function() { return NotifyPlayersPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notify_players__ = __webpack_require__(915);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NotifyPlayersPageModule = /** @class */ (function () {
    function NotifyPlayersPageModule() {
    }
    NotifyPlayersPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__notify_players__["a" /* NotifyPlayersPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__notify_players__["a" /* NotifyPlayersPage */]),
            ],
        })
    ], NotifyPlayersPageModule);
    return NotifyPlayersPageModule;
}());

//# sourceMappingURL=notify-players.module.js.map

/***/ }),

/***/ 915:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotifyPlayersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_version_ngx__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar_ngx__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_global_api_global_api__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var NotifyPlayersPage = /** @class */ (function () {
    function NotifyPlayersPage(navCtrl, navParams, http, storage, global, loadingCtrl, appVersion, statusBar, gFn, toastCtrl, modalCtrl, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.global = global;
        this.loadingCtrl = loadingCtrl;
        this.appVersion = appVersion;
        this.statusBar = statusBar;
        this.gFn = gFn;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.global_api = global_api;
        this.bgThemeColor = '';
        this.eventAttend = [];
        this.BorrowedPlayerPresent = [];
        this.DupeventAttendsec = [];
        this.DupEventAttendSecBorrowed = [];
        this.BorrowTagFlag = 0;
        this.PlayerIdArray = [];
        this.ShowSeverityPage = false;
        this.medicalInfo = false;
        this.gFn.hideMenuIcon();
        this.PhotoApiUrl = this.global.PROFILEIMAGEURL;
        this.storage.get('FunctionAccess').then(function (val) {
            _this.FunctionAccess = val;
        });
    }
    NotifyPlayersPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.statusBar.hide();
        this.appVersion.getAppName().then(function (Appname) {
            _this.AppName = Appname;
        });
        var loader = this.loadingCtrl.create({});
        loader.present();
        this.notifyFlag = this.navParams.get('notifyFlag');
        this.storage.get('loggedInUserData').then(function (val) {
            _this.PersonData = val;
            if (_this.navParams.get('UpcomingSingleEvent')) {
                _this.UpcomingSingleEvent = JSON.parse(_this.navParams.get('UpcomingSingleEvent'));
                _this.AllPlayersLoad().then(function (y) {
                    if (y) {
                        loader.dismiss();
                    }
                    else {
                        _this.navCtrl.pop();
                        loader.dismiss();
                    }
                });
            }
            else {
                _this.storage.get('UpcomingSingleEvent').then(function (val) {
                    _this.UpcomingSingleEvent = JSON.parse(val);
                    _this.AllPlayersLoad().then(function (y) {
                        if (y) {
                            loader.dismiss();
                        }
                        else {
                            _this.navCtrl.pop();
                            loader.dismiss();
                        }
                    });
                });
            }
        });
    };
    NotifyPlayersPage.prototype.ionViewDidLeave = function () {
        this.statusBar.show();
    };
    NotifyPlayersPage.prototype.AllPlayersLoad = function () {
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
            var PlayersData = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]()
                .set('event_id', _this.UpcomingSingleEvent.event_id)
                .set('client_id', _this.UpcomingSingleEvent.client_id) //this.PersonData.CLIENT_ID
                .set('selectedTeam', selectedTeam) //this.PersonData.SELECTEDTEAM
                .set('personId', _this.PersonData.PERSON_ID);
            _this.http.post(_this.global.APIURL + "players/AllLoadPlayersAttendance", PlayersData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                _this.eventAttend = data.DATA;
                console.log(_this.eventAttend);
                _this.BorrowedPlayerPresent = data.DATA_BORROWED;
                _this.ArrangePlayers();
                resolve(true);
            }, function (error) {
                resolve(false);
            });
        });
    };
    NotifyPlayersPage.prototype.ArrangePlayers = function () {
        console.log('NotifyFlag:', this.notifyFlag);
        for (var key in this.eventAttend) {
            if (parseInt(key) < 3 && this.eventAttend[key].length > 0) {
                this.DupeventAttendsec[key] = [];
                for (var key1 in this.eventAttend[key]) {
                    this.DupeventAttendsec[key].push(this.eventAttend[key][key1]);
                    var curState = this.eventAttend[key][key1].state - 1;
                    if (curState == this.notifyFlag) {
                        this.selectPlayerTile(this.eventAttend[key][key1].person_id);
                    }
                }
            }
        }
        if (this.notifyFlag) {
            var temp = this.DupeventAttendsec[this.notifyFlag];
            this.DupeventAttendsec.splice(this.notifyFlag);
            this.DupeventAttendsec.unshift(temp);
        }
        for (var key in this.BorrowedPlayerPresent) {
            if (parseInt(key) < 3 && this.BorrowedPlayerPresent[key].length > 0) {
                this.DupEventAttendSecBorrowed[key] = [];
                for (var key1 in this.BorrowedPlayerPresent[key]) {
                    this.DupEventAttendSecBorrowed[key].push(this.BorrowedPlayerPresent[key][key1]);
                    if (this.BorrowedPlayerPresent[key][key1].state - 1 == this.notifyFlag) {
                        this.selectPlayerTile(this.BorrowedPlayerPresent[key][key1].person_id);
                    }
                    this.BorrowTagFlag = 1;
                }
            }
        }
        if (this.notifyFlag) {
            var temp = this.DupEventAttendSecBorrowed[this.notifyFlag];
            this.DupEventAttendSecBorrowed.splice(this.notifyFlag);
            this.DupEventAttendSecBorrowed.unshift(temp);
        }
    };
    NotifyPlayersPage.prototype.backArrow = function () {
        this.navCtrl.push('EventDashboardNewPage');
        this.navCtrl.remove(this.navCtrl.getActive().index - 1, 2);
    };
    NotifyPlayersPage.prototype.selectPlayerTile = function (person_id) {
        if (!this.PlayerIdArray.includes(person_id)) {
            console.log('inside');
            this.PlayerIdArray.push(person_id);
        }
    };
    NotifyPlayersPage.prototype.unSelectPlayerTile = function (person_id) {
        if (this.PlayerIdArray.includes(person_id)) {
            this.PlayerIdArray.splice(this.PlayerIdArray.indexOf(person_id), 1);
        }
    };
    NotifyPlayersPage.prototype.togglePlayerTileSelection = function (person_id, event) {
        if (this.ShowSeverityPage == false && !this.medicalInfo) {
            if (this.PlayerIdArray.includes(person_id)) {
                $(event.target).closest('.well').removeClass('SelectCard');
                $(event.target).closest('.well').find('.select-card').removeClass('SelectCard');
                $(event.target).closest('.well').find('.card-title').removeClass('SelectCard');
                $(event.target).closest('.well').find('.select-card').addClass('UnselectCard');
                $(event.target).closest('.well').find('.card-title').addClass('UnselectCard');
                $(event.target).closest('.well').addClass('UnselectCard');
                this.unSelectPlayerTile(person_id);
            }
            else {
                $(event.target).closest('.well').removeClass('UnselectCard');
                $(event.target).closest('.well').find('.select-card').removeClass('UnselectCard');
                $(event.target).closest('.well').find('.card-title').removeClass('UnselectCard');
                $(event.target).closest('.well').find('.select-card').addClass('SelectCard');
                $(event.target).closest('.well').find('.card-title').addClass('SelectCard');
                $(event.target).closest('.well').addClass('SelectCard');
                this.selectPlayerTile(person_id);
            }
        }
        else {
            this.ShowSeverityPage = false;
        }
    };
    NotifyPlayersPage.prototype.Notify = function () {
        var _this = this;
        var PlayersList = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', this.PersonData.PERSON_ID)
            .set('person_ids', JSON.stringify(this.PlayerIdArray))
            .set('selectedTeam', this.PersonData.SELECTEDTEAM)
            .set('event_id', this.UpcomingSingleEvent.event_id)
            .set('app_name', this.AppName);
        this.http.post(this.global.APIURL + "players/sendEmailNotified", PlayersList, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            if (data.SUCCESS) {
                _this.presentToast('Notified successfully');
            }
            else {
                _this.presentToast('Notified Unsuccessfully');
            }
            _this.backArrow();
        }, function (error) {
            _this.presentToast('Notified Unsuccessfully');
            _this.backArrow();
        });
    };
    NotifyPlayersPage.prototype.DisplaySeverityDetails = function (playerAilments) {
        this.ShowSeverityPage = true;
        if (playerAilments) {
            var SeverityModal = this.modalCtrl.create('SeverityDetailsModalPage', { playerAilments: playerAilments });
            SeverityModal.present();
        }
        else {
            this.presentToast('No Details found');
        }
    };
    NotifyPlayersPage.prototype.MedicineInformation = function (data) {
        var _this = this;
        this.medicalInfo = true;
        var MedicineInfo = this.modalCtrl.create('MedicineInfoPage', { values: data });
        MedicineInfo.present();
        MedicineInfo.onDidDismiss(function () {
            _this.medicalInfo = false;
        });
    };
    NotifyPlayersPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    NotifyPlayersPage.prototype.backgroundThemeColor = function () {
        switch (this.loggedInUserData.THEME_BG) {
            case "red":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            case "blue":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            case "yellow":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            default:
                this.bgThemeColor = "red";
                break;
        }
    };
    NotifyPlayersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-notify-players',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/notify-players/notify-players.html"*/'<ion-content class="bg-black borrowPlayer">\n    <section class="main mt-20">\n        <div class="top-bar" (click)="backArrow()">\n            <div class="col-xs-3">\n                <div class="backArrow inverse"></div>\n            </div>\n        </div>\n        <form action="" class="user-form">\n            <h5 class="sm-title text-left col-xs-12 mt-20">CHOOSE STUDENT/S TO NOTIFY</h5>\n            <section class="profileFirst heightAuto">\n                <div class="event-card EventPlayer">\n                    <div class="CardStyle" *ngFor="let StateAttendy of DupeventAttendsec;let y=index" >\n                        <div *ngIf="y<3">\n                            <div class="well select-card" [class.SelectCard]=" notifyFlag==Attendy.state-1" \n                                        *ngFor="let Attendy of StateAttendy;let i=index" (click)="togglePlayerTileSelection(Attendy.person_id,$event)">\n                                <div class="row"  >\n                                    <!-- [class.AutoSelec]="AutoSect(Attendy.person_id,selectPlayerCard,selectFontColor,Attendy.state-1,i)" -->\n                                    <div class="card-img col-xs-2 p-0">\n                                    <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2" [class.no-response]="Attendy.state==3"\n                                        [class.maybe]="Attendy.state==4" *ngIf="!Attendy.PHOTOPATH">\n                                        <div class="img-circle"><span class="img-text">{{Attendy.first_name[0]}} {{Attendy.last_name[0]}} </span></div>\n                                        <!-- <img src="assets/images/test-user.svg" alt="" class="img-circle"> -->\n                                    </span>\n                                    <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2" [class.no-response]="Attendy.state==3"\n                                        [class.maybe]="Attendy.state==4" *ngIf="Attendy.PHOTOPATH">\n                                        <img src={{PhotoApiUrl}}{{Attendy.PHOTOPATH}} alt="" class="img-circle">\n                                    </span>\n                                    </div>\n                \n                                    <div  class="card-title col-xs-10 p-0" [class.SelectCard]=" notifyFlag==Attendy.state-1">{{Attendy.first_name\n                                    | uppercase}} {{Attendy.last_name | uppercase}}\n                                       \n                                        <div>\n                                          \n                                            <span *ngIf="Attendy.uniformid">#{{Attendy.uniformid}}</span>\n                                        </div>\n                                        <div class="suit-iconCard fixedRight" (click)="DisplaySeverityDetails(Attendy)" *ngIf="FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1 && ((Attendy.playerAilmentsSeverityIcon) || (Attendy.showMedicine==1))">\n                                            <img src={{global.ImagesPath}}{{Attendy.playerAilmentsSeverityIcon}} class="suit-icon" *ngIf="(Attendy.playerAilmentsSeverityIcon  && (Attendy.showMedicine==1 || Attendy.showMedicine==0))">\n                                            <img src="{{global.ImagesPath}}pills.svg" class="medical-bottle" *ngIf="((Attendy.showMedicine==1) && (!Attendy.playerAilmentsSeverityIcon))">\n                                        </div>\n                                        \n                                    </div>\n                                    <!-- <div class="col-xs-3 p-0">\n                                        <div class="suit-iconCard" (click)="DisplaySeverityDetails(Attendy.playerAilments)" *ngIf="Attendy.playerAilmentsSeverityIcon && FunctionAccess && FunctionAccess.medicalKit==\'yes\'">\n                                            <img src={{global.ImagesPath}}{{Attendy.playerAilmentsSeverityIcon}}  class="suit-icon">\n                                        </div> -->\n<!--                                         \n                                        <div class="medical-bottleCard" (click)="MedicineInformation(Attendy)" *ngIf="Attendy.showMedicine==1 && FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1">\n                                            <img src="{{global.ImagesPath}}medicine_bottle.png" class="medical-bottle">\n                                        </div>\n                                    </div> -->\n                                    \n                                </div>\n                            </div>\n\n                        </div>\n                        \n                    </div>\n                    <div class="borrowHeading" *ngIf="BorrowTagFlag==1">\n                        <!-- <h5 class="sm-title text-left col-xs-12 mt-20">BORROWED PLAYERS</h5> -->\n                        <p class="sm-title text-left">BORROWED TEAM MATES</p>\n                    </div>\n                    <div class="CardStyle" *ngFor="let StateAttendy of DupEventAttendSecBorrowed;let i=index">\n                        <div *ngIf="i<3">\n                            <div class="well select-card" [class.SelectCard]="notifyFlag==Attendy.state-1" *ngFor="let Attendy of StateAttendy">\n                                    <div class="row" (click)="togglePlayerTileSelection(Attendy.person_id,$event)">\n                                        <div class="card-img col-xs-2 p-0">\n                                        <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2" [class.no-response]="Attendy.state==3"\n                                            [class.maybe]="Attendy.state==4" *ngIf="!Attendy.photoPath">\n                                            <div class="img-circle"><span class="img-text">{{Attendy.first_name[0]}} {{Attendy.last_name[0]}} </span></div>\n                                            <!-- <img src="assets/images/test-user.svg" alt="" class="img-circle"> -->\n                                        </span>\n                                        <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2" [class.no-response]="Attendy.state==3"\n                                            [class.maybe]="Attendy.state==4" *ngIf="Attendy.photoPath">\n                                            <img src={{PhotoApiUrl}}{{Attendy.photoPath}} alt="" class="img-circle">\n                                        </span>\n                        \n                                        </div>\n                                        <div class="card-title col-xs-10 p-0" [class.SelectCard]="notifyFlag==Attendy.state-1">{{Attendy.first_name | uppercase}}\n                                        {{Attendy.last_name | uppercase}}\n                                            <div>\n                                                <span *ngIf="Attendy.uniformid">#{{Attendy.uniformid}}</span>\n                                            </div>\n                                            <div class="suit-iconCard fixedRight" (click)="DisplaySeverityDetails(Attendy)" *ngIf="FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1 && ((Attendy.playerAilmentsSeverityIcon) || (Attendy.showMedicine==1))">\n                                                <img src={{global.ImagesPath}}{{Attendy.playerAilmentsSeverityIcon}} class="suit-icon" *ngIf="(Attendy.playerAilmentsSeverityIcon  && (Attendy.showMedicine==1 || Attendy.showMedicine==0))">\n                                                <img src="{{global.ImagesPath}}pills.svg" class="medical-bottle" *ngIf="((Attendy.showMedicine==1) && (!Attendy.playerAilmentsSeverityIcon))">\n                                            </div>\n                                            <!-- <div class="col-xs-3 p-0">\n                                                <div class="suit-iconCard" (click)="DisplaySeverityDetails(Attendy.playerAilments)" *ngIf="Attendy.playerAilmentsSeverityIcon && FunctionAccess && FunctionAccess.medicalKit==\'yes\'">\n                                                    <img src={{global.ImagesPath}}{{Attendy.playerAilmentsSeverityIcon}}  class="suit-icon">\n                                                </div> -->\n                                                \n                                                <!-- <div class="medical-bottleCard" (click)="MedicineInformation(Attendy)" *ngIf="Attendy.showMedicine==1 && FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1">\n                                                    <img src="{{global.ImagesPath}}medicine_bottle.png" class="medical-bottle">\n                                                </div> -->\n                                            <!-- </div> -->\n                                        </div>\n                                        \n                                    </div>\n                                    \n                                </div>\n\n                        </div>\n\n                        \n                    </div>   \n                </div>\n            </section>\n            <div class="btn-section mb-30 mt-30" >\n                <button type="submit" class="btn btn-save{{bgThemeColor}} btn-sm-black radius-10" (click)=" Notify()">Notify to RSVP</button>\n            </div>\n            \n        </form>\n        </section>\n        \n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/notify-players/notify-players.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_version_ngx__["a" /* AppVersion */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar_ngx__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_7__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */], __WEBPACK_IMPORTED_MODULE_8__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], NotifyPlayersPage);
    return NotifyPlayersPage;
}());

//# sourceMappingURL=notify-players.js.map

/***/ })

});
//# sourceMappingURL=42.js.map