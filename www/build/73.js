webpackJsonp([73],{

/***/ 779:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventGroupSendMessagePageModule", function() { return EventGroupSendMessagePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_group_send_message__ = __webpack_require__(884);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EventGroupSendMessagePageModule = /** @class */ (function () {
    function EventGroupSendMessagePageModule() {
    }
    EventGroupSendMessagePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__event_group_send_message__["a" /* EventGroupSendMessagePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__event_group_send_message__["a" /* EventGroupSendMessagePage */]),
            ],
        })
    ], EventGroupSendMessagePageModule);
    return EventGroupSendMessagePageModule;
}());

//# sourceMappingURL=event-group-send-message.module.js.map

/***/ }),

/***/ 884:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventGroupSendMessagePage; });
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









var EventGroupSendMessagePage = /** @class */ (function () {
    function EventGroupSendMessagePage(navCtrl, appVersion, modalCtrl, navParams, http, storage, global, loadingCtrl, toastCtrl, statusBar, gFn, global_api, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.appVersion = appVersion;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.global = global;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.statusBar = statusBar;
        this.gFn = gFn;
        this.global_api = global_api;
        this.eventAttend = [];
        this.BorrowedPlayerPresent = [];
        this.DupeventAttendsec = [];
        this.DupEventAttendSecBorrowed = [];
        this.BorrowTagFlag = 0;
        this.message = '';
        this.teamStaffs = [];
        this.ShowSeverityPage = false;
        this.medicalInfo = false;
        this.storage.get('setActivatedTeam').then(function (val) {
            _this.setActivatedTeam = JSON.parse(val);
            //console.log(this.setActivatedTeam.TEAM_ID_FK)
        });
        this.gFn.hideMenuIcon();
        this.storage.get('FunctionAccess').then(function (val) {
            _this.FunctionAccess = val;
        });
        platform.registerBackButtonAction(function () {
            _this.backArrow();
        });
    }
    EventGroupSendMessagePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.PhotoApiUrl = this.global.PROFILEIMAGEURL;
        console.log(this.PhotoApiUrl);
        this.statusBar.hide();
        this.appVersion.getAppName().then(function (Appname) {
            _this.AppName = Appname;
        });
        this.storage.get('loggedInUserData').then(function (val) {
            _this.PersonData = val;
            _this.storage.get('UpcomingSingleEvent').then(function (val) {
                _this.UpcomingSingleEvent = JSON.parse(val);
                _this.selectedTeam = _this.PersonData.SELECTEDTEAM;
                if (_this.UpcomingSingleEvent.event_type_id == 2 && _this.UpcomingSingleEvent.teamid) {
                    _this.selectedTeam = _this.UpcomingSingleEvent.teamid;
                }
                else if (_this.UpcomingSingleEvent.event_type_id == 1) {
                    if (_this.UpcomingSingleEvent.homeclubid == _this.PersonData.CLUB_ID) {
                        _this.selectedTeam = _this.UpcomingSingleEvent.hometeam;
                    }
                    else {
                        _this.selectedTeam = _this.UpcomingSingleEvent.awayteam;
                    }
                }
                _this.AllPlayersLoad();
                _this.loadTeamStuffs();
            });
        });
    };
    EventGroupSendMessagePage.prototype.ionViewDidLeave = function () {
        this.statusBar.show();
        this.gFn.showMenuIcon();
    };
    EventGroupSendMessagePage.prototype.AllPlayersLoad = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var loading = _this.loadingCtrl.create();
            loading.present();
            var PlayersData = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]()
                .set('event_id', _this.UpcomingSingleEvent.event_id)
                .set('client_id', _this.UpcomingSingleEvent.client_id) //this.PersonData.CLIENT_ID
                .set('selectedTeam', _this.selectedTeam) //this.PersonData.SELECTEDTEAM
                .set('personId', _this.PersonData.PERSON_ID);
            _this.http.post(_this.global.APIURL + "players/AllLoadPlayersAttendance", PlayersData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                _this.eventAttend = data.DATA;
                _this.BorrowedPlayerPresent = data.DATA_BORROWED;
                _this.ArrangePlayers();
                loading.dismiss();
                resolve(true);
            }, function (error) {
                loading.dismiss();
            });
        });
    };
    EventGroupSendMessagePage.prototype.ArrangePlayers = function () {
        var key, key1;
        for (key in this.eventAttend) {
            if (parseInt(key) < 3 && this.eventAttend[key].length > 0) {
                this.DupeventAttendsec[key] = [];
                for (key1 in this.eventAttend[key]) {
                    if (this.navParams.get('notifyFlag') == parseInt(key)) {
                        this.DupeventAttendsec[0].unshift(this.eventAttend[key][key1]);
                    }
                    else {
                        this.DupeventAttendsec[key].push(this.eventAttend[key][key1]);
                    }
                    this.DupeventAttendsec[key] = this.DupeventAttendsec[key].map(function (obj) { obj.active = true; return obj; });
                }
            }
        }
        for (key in this.BorrowedPlayerPresent) {
            if (parseInt(key) < 3 && this.BorrowedPlayerPresent[key].length > 0) {
                this.DupEventAttendSecBorrowed[key] = [];
                for (key1 in this.BorrowedPlayerPresent[key]) {
                    this.BorrowTagFlag = 1;
                    if (this.navParams.get('notifyFlag') == parseInt(key)) {
                        this.DupEventAttendSecBorrowed[0].unshift(this.BorrowedPlayerPresent[key][key1]);
                    }
                    else {
                        this.DupEventAttendSecBorrowed[key].push(this.BorrowedPlayerPresent[key][key1]);
                    }
                    this.DupEventAttendSecBorrowed[key] = this.DupEventAttendSecBorrowed[key].map(function (obj) { obj.active = true; return obj; });
                }
            }
        }
    };
    EventGroupSendMessagePage.prototype.loadTeamStuffs = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        var data = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', this.PersonData.PERSON_ID)
            .set('team_id', this.selectedTeam);
        this.http.post(this.global.APIURL + "teams/getTeamStaff", data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS) {
                _this.teamStaffs = response.GETTEAMSTAFF;
            }
        }, function (error) {
            loading.dismiss();
        });
    };
    EventGroupSendMessagePage.prototype.backArrow = function () {
        this.navCtrl.pop();
        //this.navCtrl.push('EventDashboardPage');
    };
    EventGroupSendMessagePage.prototype.selectPlayer = function (Attendy) {
        if (!this.medicalInfo) {
            if (this.ShowSeverityPage == false) {
                Attendy.active = !Attendy.active;
            }
            else {
                this.ShowSeverityPage = false;
            }
        }
    };
    EventGroupSendMessagePage.prototype.sendMessage = function () {
        var _this = this;
        var playerIDs = [];
        $('.well.select-card.active').each(function () {
            if ($(this).attr('data-id')) {
                playerIDs.push($(this).attr('data-id'));
            }
        });
        if (playerIDs.length > 0) {
            if (this.message.length > 0) {
                var loading_1 = this.loadingCtrl.create();
                loading_1.present();
                var formData = {
                    'person_id': this.PersonData.PERSON_ID,
                    'person_ids': JSON.stringify(playerIDs),
                    'message': this.message,
                    'app_name': this.AppName,
                    'team_id': '',
                    'event_id': this.UpcomingSingleEvent.event_id
                };
                var msgData = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]({ fromObject: formData });
                this.http.post(this.global.APIURL + 'players/sendGroupMsgEmailNotified', msgData, { headers: this.global_api.getHeader() })
                    .subscribe(function (response) {
                    loading_1.dismiss();
                    if (response.SUCCESS) {
                        _this.presentToast("Message sent successfully");
                    }
                    else {
                        _this.presentToast("Error in message send");
                    }
                    _this.navCtrl.pop();
                    _this.gFn.showMenuIcon();
                }, function (error) {
                    loading_1.dismiss();
                    _this.presentToast("Error in message send");
                    _this.navCtrl.pop();
                    _this.gFn.showMenuIcon();
                });
            }
            else {
                this.presentToast("Can't send blank message");
            }
        }
        else {
            var msg = 'No player selected';
            this.presentToast(msg);
        }
    };
    EventGroupSendMessagePage.prototype.DisplaySeverityDetails = function (playerAilments) {
        this.ShowSeverityPage = true;
        if (playerAilments) {
            var SeverityModal = this.modalCtrl.create('SeverityDetailsModalPage', { playerAilments: playerAilments });
            SeverityModal.present();
        }
        else {
            this.presentToast('No Details found');
        }
    };
    EventGroupSendMessagePage.prototype.MedicineInformation = function (data) {
        var _this = this;
        this.medicalInfo = true;
        var MedicineInfo = this.modalCtrl.create('MedicineInfoPage', { values: data });
        MedicineInfo.present();
        MedicineInfo.onDidDismiss(function () {
            _this.medicalInfo = false;
        });
    };
    EventGroupSendMessagePage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    EventGroupSendMessagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event-group-send-message',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-group-send-message/event-group-send-message.html"*/'\n<ion-content class="bg-black borrowPlayer">\n  <section class="main mt-20">\n    <div class="top-bar" (click)="backArrow()">\n      <div class="col-xs-3">\n        <div class="backArrow inverse"></div>\n      </div>\n    </div>\n    <form action="" class="user-form">\n      <div class="fade group-msg player-group-message" role="dialog">\n        <div class="modal-dialog plr-group-msg">\n          <div class="modal-content msg-send radius-10">\n            <div class="modal-header">\n              <h4 class="modal-title text-center">Alert Message</h4>\n            </div>\n            <div class="modal-body">\n              <textarea class="form-control msg-box plr-msg-box" name="message" [(ngModel)]="message" cols="30" rows="6"></textarea>\n            </div>\n            <div class="modal-footer">\n              <div class="row">\n                <div class="submit-link col-xs-12 text-right"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <h5 class="sm-title text-left col-xs-12 mt-20">CHOOSE PLAYER/S</h5>\n      <section class="profileFirst heightAuto">\n        <div class="event-card borrow" >\n          <div *ngFor="let StateAttendy of DupeventAttendsec;let i=index" style="padding-bottom:10px">\n            <div *ngIf="i<3">\n                <div class="well select-card" *ngFor="let Attendy of StateAttendy" [attr.data-id]="Attendy.person_id"\n                [ngClass]="{\'active\': Attendy.active}" (click)="selectPlayer(Attendy)">\n                  <div class="row">\n                    <div class="card-img col-xs-2 p-0">\n                      <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2" [class.no-response]="Attendy.state==3"\n                            [class.maybe]="Attendy.state==4" *ngIf="!Attendy.PHOTOPATH">\n                            <div class="img-circle"><span class="img-text">{{Attendy.first_name[0]}} {{Attendy.last_name[0]}} </span></div>\n                        <!-- <img src="assets/images/test-user.svg" alt="" class="img-circle"> -->\n                      </span>\n                      <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2" [class.no-response]="Attendy.state==3"\n                            [class.maybe]="Attendy.state==4" *ngIf="Attendy.PHOTOPATH">\n                        <img src={{PhotoApiUrl}}{{Attendy.PHOTOPATH}} alt="" class="img-circle" >\n                      </span>\n                    </div>\n                    <div class="card-title col-xs-10 p-0" [class.InjuredPlayerName]="Attendy.injuryStatus==1">{{Attendy.first_name\n                      | uppercase}} {{Attendy.last_name | uppercase}}\n                      <p class="Show_Status" [class.InjuredPlayerStatus]="Attendy.injuryStatus==1" *ngIf="Attendy.uniformid">{{Attendy.uniformid}}</p>\n                      <div class="suit-iconCard fixedRight" (click)="DisplaySeverityDetails(Attendy)" *ngIf="FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1 && ((Attendy.playerAilmentsSeverityIcon) || (Attendy.showMedicine==1))">\n                          <img src={{global.ImagesPath}}{{Attendy.playerAilmentsSeverityIcon}} class="suit-icon" *ngIf="(Attendy.playerAilmentsSeverityIcon  && (Attendy.showMedicine==1 || Attendy.showMedicine==0))">\n                          <img src="{{global.ImagesPath}}pills.svg" class="medical-bottle" *ngIf="((Attendy.showMedicine==1) && (!Attendy.playerAilmentsSeverityIcon))">\n                        </div>\n                    </div>\n                  </div>\n           </div>\n\n            </div>\n            \n          </div>\n          <div class="borrowHeading" *ngIf="BorrowTagFlag==1">\n            <p>BORROWED PLAYER/S</p>\n          </div>\n          <div *ngFor="let StateAttendy of DupEventAttendSecBorrowed;let i=index" style="padding-bottom:5px">\n              <div *ngIf="i<3">\n                  <div class="well select-card" *ngFor="let Attendy of StateAttendy" [attr.data-id]="Attendy.person_id"\n                  [ngClass]="{\'active\': Attendy.active}" (click)="selectPlayer(Attendy)">\n                    <div class="row">\n                      <div class="card-img col-xs-2 p-0">\n                        <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2" [class.no-response]="Attendy.state==3"\n                              [class.maybe]="Attendy.state==4" *ngIf="!Attendy.photoPath">\n                              <div class="img-circle"><span class="img-text">{{Attendy.first_name[0]}} {{Attendy.last_name[0]}} </span></div>\n                          <!-- <img src="assets/images/test-user.svg" alt="" class="img-circle"> -->\n                        </span>\n                        <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2" [class.no-response]="Attendy.state==3"\n                              [class.maybe]="Attendy.state==4" *ngIf="Attendy.photoPath">\n                          <img src={{PhotoApiUrl}}{{Attendy.photoPath}} alt="" class="img-circle" onerror="this.onerror=null;this.src=\'assets/images/test-user.svg\';">\n                        </span>\n                      </div>\n                      <div class="card-title col-xs-10 p-0" [class.InjuredPlayerName]="">{{Attendy.first_name | uppercase}}\n                        {{Attendy.last_name | uppercase}}\n                        <p class="Show_Status" [class.InjuredPlayerStatus]="" *ngIf="Attendy.uniformid">{{Attendy.uniformid}}</p>\n                        <div class="suit-iconCard fixedRight" (click)="DisplaySeverityDetails(Attendy)" *ngIf="FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1 && ((Attendy.playerAilmentsSeverityIcon) || (Attendy.showMedicine==1))">\n                            <img src={{global.ImagesPath}}{{Attendy.playerAilmentsSeverityIcon}} class="suit-icon" *ngIf="(Attendy.playerAilmentsSeverityIcon  && (Attendy.showMedicine==1 || Attendy.showMedicine==0))">\n                            <img src="{{global.ImagesPath}}pills.svg" class="medical-bottle" *ngIf="((Attendy.showMedicine==1) && (!Attendy.playerAilmentsSeverityIcon))">\n                          </div>\n                      </div>\n                      \n                    </div>\n             </div>\n                \n              </div>\n          </div>\n          <div class="borrowHeading" *ngIf="teamStaffs.length" style="margin-top: 30px;">\n            <p>STAFF</p>\n          </div>\n          <div class="well select-card" *ngFor="let staff of teamStaffs" [attr.data-id]="staff.person_id"\n               [ngClass]="{\'active\': staff.active}" (click)="selectPlayer(staff)">\n            <div class="row">\n              <div class="card-img col-xs-2 p-0">\n                <span *ngIf="!staff.photoPath">\n                    <div class="img-circle"><span class="img-text">{{staff.first_name[0]}} {{staff.last_name[0]}} </span></div>\n                  <!-- <img src="assets/images/test-user.svg" alt="" class="img-circle"> -->\n                </span>\n                <span *ngIf="staff.photoPath">\n                  <img src={{PhotoApiUrl}}{{staff.photoPath}} alt="" class="img-circle" onerror="this.onerror=null;this.src=\'assets/images/test-user.svg\';">\n                </span>\n              </div>\n              <div class="card-title col-xs-7 p-0">{{staff.first_name | uppercase}}\n                {{staff.last_name | uppercase}}\n                <p class="Show_Status" *ngIf="staff.designation">{{staff.designation}}</p>\n                <div class="suit-icon" (click)="DisplaySeverityDetails(staff.playerAilments)" *ngIf="staff.playerAilmentsSeverityIcon && FunctionAccess && FunctionAccess.medicalKit==\'yes\'">\n                    <img src={{global.ImagesPath}}{{staff.playerAilmentsSeverityIcon}} >\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </section>\n      <div class="btn-section mb-30 mt-30" >\n        <button type="submit" class="btn btn-save btn-sm-black radius-10" (click)="sendMessage()">SEND ALERT MESSAGE</button>\n      </div>\n\n    </form>\n  </section>\n\n</ion-content>\n\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-group-send-message/event-group-send-message.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_version_ngx__["a" /* AppVersion */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar_ngx__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_7__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_8__providers_global_api_global_api__["a" /* GlobalApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */]])
    ], EventGroupSendMessagePage);
    return EventGroupSendMessagePage;
}());

//# sourceMappingURL=event-group-send-message.js.map

/***/ })

});
//# sourceMappingURL=73.js.map