webpackJsonp([39],{

/***/ 816:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerDetailsPageModule", function() { return PlayerDetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__player_details__ = __webpack_require__(918);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PlayerDetailsPageModule = /** @class */ (function () {
    function PlayerDetailsPageModule() {
    }
    PlayerDetailsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__player_details__["a" /* PlayerDetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__player_details__["a" /* PlayerDetailsPage */]),
            ],
        })
    ], PlayerDetailsPageModule);
    return PlayerDetailsPageModule;
}());

//# sourceMappingURL=player-details.module.js.map

/***/ }),

/***/ 918:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__players_dashboard_players_dashboard__ = __webpack_require__(106);
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








/**
 * Generated class for the PlayerDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PlayerDetailsPage = /** @class */ (function () {
    function PlayerDetailsPage(navCtrl, navParams, storage, events, http, loadingCtrl, global, modalCtrl, toastCtrl, gFn, plt, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.events = events;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.global = global;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.gFn = gFn;
        this.plt = plt;
        this.global_api = global_api;
        this.playerID = '';
        this.phone = '';
        this.email = '';
        this.active = '';
        this.playerDetails = [];
        this.medicalReportGenerated = false;
        this.emergencyPhoneExists = false;
        this.OperooStatus = 0;
        plt.ready().then(function () {
            plt.registerBackButtonAction(function () {
                _this.goBack();
            });
        });
        this.storage.get('FunctionAccess').then(function (val) {
            _this.FunctionAccess = val;
        });
        this.storage.get('loggedInUserData').then(function (val) {
            _this.PersonData = val;
            _this.getOperooStatus();
        });
        this.playerID = navParams.get('playerID');
        this.getPlayerDetails();
    }
    PlayerDetailsPage.prototype.getOperooStatus = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('clubid', _this.PersonData.CLUB_ID);
            _this.http.post(_this.global.APIURL + "incidents/checkUsingOperoo", Data, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                console.log('operoo status data', data);
                if (data && data.SUCCESS) {
                    // this.OperooStatus = 0;
                    _this.OperooStatus = data.USE_OPEROO;
                }
                resolve(true);
            }, function (error) {
            });
        });
    };
    PlayerDetailsPage.prototype.getOperooData = function (playerData) {
        var _this = this;
        return new Promise(function (resolve) {
            var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('person_id', playerData.person_id)
                .set('club_id', _this.PersonData.CLUB_ID);
            _this.http.post(_this.global.APIURL + "users/getOperooProfile", Data, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
            });
        });
    };
    PlayerDetailsPage.prototype.getPlayerDetails = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', this.playerID);
        this.http.post(this.global.APIURL + 'players/getPersonDetails', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS) {
                _this.playerDetails = response.GETPERSONDETAILS;
                _this.phone = _this.playerDetails[0].phone_mobile;
                _this.email = _this.playerDetails[0].email_address;
                _this.emergencyContacts = _this.playerDetails[0].emergency_contacts;
                for (var key in _this.emergencyContacts) {
                    if (_this.emergencyContacts[key].phone_mobile.length > 0) {
                        _this.emergencyPhoneExists = true;
                        break;
                    }
                }
                _this.getMedicalHistory().then(function (x) {
                    if (x) {
                        _this.medicalReportGenerated = true;
                    }
                });
            }
        }, function (error) {
            loading.dismiss();
        });
    };
    PlayerDetailsPage.prototype.showToast = function (message, duration, position) {
        if (duration === void 0) { duration = 2000; }
        if (position === void 0) { position = "bottom"; }
        duration = duration || 2000;
        position = position || "bottom";
        var toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: position
        });
        toast.present();
    };
    PlayerDetailsPage.prototype.showSMSModal = function () {
        var _this = this;
        this.active = 'sms';
        setTimeout(function () {
            _this.active = '';
            if (_this.phone.length == 0) {
                _this.showToast('Phone number not set');
            }
            else {
                var smsModal = _this.modalCtrl.create('SmsModalPage', { phone: _this.phone }, {
                    enableBackdropDismiss: true,
                    showBackdrop: true
                });
                smsModal.present();
            }
        }, 300);
    };
    PlayerDetailsPage.prototype.showCallModal = function (emergency) {
        var _this = this;
        this.active = emergency ? 'emergencyPhone' : 'phone';
        setTimeout(function () {
            _this.active = '';
            if ((!emergency && _this.playerDetails[0].phone_mobile == 0) || (emergency && !_this.emergencyPhoneExists)) {
                _this.showToast('Phone number not found.');
            }
            else {
                _this.phone = emergency ? '' : _this.playerDetails[0].phone_mobile;
                var callModal = _this.modalCtrl.create('CallModalPage', { phone: _this.phone, emergency: emergency, emergencyContacts: _this.emergencyContacts }, {
                    enableBackdropDismiss: true,
                    showBackdrop: true
                });
                callModal.present();
            }
        }, 300);
    };
    PlayerDetailsPage.prototype.showEmailModal = function () {
        var _this = this;
        this.active = 'email';
        setTimeout(function () {
            _this.active = '';
            if (_this.email.length == 0) {
                _this.showToast('Email not set');
            }
            else {
                var emailModal = _this.modalCtrl.create('EmailModalPage', { email: _this.email }, {
                    enableBackdropDismiss: true,
                    showBackdrop: true
                });
                emailModal.present();
            }
        }, 300);
    };
    PlayerDetailsPage.prototype.coachingReport = function () {
        this.navCtrl.push('PlayerCoachingReportPage', { playerDetails: this.playerDetails });
    };
    PlayerDetailsPage.prototype.getMedicalHistory = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var PlayersData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('person_id', _this.playerDetails[0]['person_id']);
            _this.http.post(_this.global.APIURL + "players/getMedicalHistoryDetails", PlayersData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.GETMEDICALHISTORYDETAILS) {
                    var medicalHistoryDetails = _this.events.publish('json:query', data.GETMEDICALHISTORYDETAILS)[0][0];
                    _this.playerDetails[0]['medical_history'] = medicalHistoryDetails;
                }
                resolve(true);
            }, function (error) {
                console.log(error);
                resolve(false);
            });
        });
    };
    PlayerDetailsPage.prototype.medicalRecords = function () {
        var _this = this;
        console.log('playerdetails', this.playerDetails, "this.OperooStatus", this.OperooStatus);
        if (this.OperooStatus == 1) {
            this.playerDetails[0].operooEnabled = true;
            this.getOperooData(this.playerDetails[0]).then(function (data) {
                console.log('operoodata', data);
                if (data && data.SUCCESS) {
                    _this.playerDetails[0].operooData = data.OPEROOINFO;
                    if (_this.playerDetails[0]) {
                        _this.navCtrl.push('PlayerMedicalRecordsPage', { playerDetails: _this.playerDetails });
                    }
                    else {
                        alert("No details found");
                    }
                }
            });
        }
        else {
            if (this.medicalReportGenerated) {
                this.playerDetails[0].operooEnabled = false;
                this.navCtrl.push('PlayerMedicalRecordsPage', { playerDetails: this.playerDetails });
            }
            else {
                alert("Medical report generation in progress, please wait");
            }
        }
    };
    PlayerDetailsPage.prototype.viewChat = function () {
        var chatInfo = {
            from: 1,
            to: 10,
            person_id: this.PersonData.PERSON_ID,
            group_id: "0",
            receiver_name: this.playerDetails[0].first_name,
            receiver_last_name: this.playerDetails[0].last_name,
            receiver_id: this.playerDetails[0].person_id,
            selectedTeam: this.PersonData.SELECTEDTEAM,
            teamid: this.PersonData.TEAM_ID,
            flag: 1,
            userPhoto: this.playerDetails[0].photoPath,
            accFirstName: this.PersonData.FIRST_NAME,
            accLastName: this.PersonData.LAST_NAME,
            isBlocked: 0,
            clientId: this.PersonData.CLIENT_ID
        };
        this.navCtrl.push('ChatViewPage', { data: chatInfo });
    };
    PlayerDetailsPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__players_dashboard_players_dashboard__["a" /* PlayersDashboardPage */]);
    };
    PlayerDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-player-details',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/player-details/player-details.html"*/'<!--\n  Generated template for the PlayerDetailsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!-- <nav class="navbar navbar-fixed-top " hideBackButton="true" transparent>\n  \n  <div class="col-xs-6">\n    <div class="backArrow inverse inverseText" (click)="goBack()"> PLAYERS</div>\n  </div>\n  \n</nav> -->\n\n<!--<ion-header class="bg-black mt-20">\n  <div class="top-bar">\n    <div class="col-xs-6">\n      <div *ngIf="FunctionAccess?.user_adminLevel == 1 || FunctionAccess?.user_adminLevel == 2" class="backArrow inverse inverseText" (click)="goBack()" > TEAM MATES</div>\n      <div *ngIf="FunctionAccess?.user_adminLevel == 4" class="backArrow inverse inverseText" (click)="goBack()" > TEAM MATES</div>\n    </div>\n  </div>\n</ion-header>-->\n\n<ion-header>\n  <ion-navbar class="main">\n  <div class="top-bar">\n    <div class="col-xs-6">\n      <div class="inverse inverseText" (click)="goBack()"> PLAYERS</div>\n    </div>\n  </div>\n</ion-navbar>\n</ion-header>\n\n<ion-content class="bg-black">\n  <section class="main mt-20">\n    <form action="" class="user-form" *ngIf="PersonData && FunctionAccess">\n      <section class="profileFirst heightAuto p-0" *ngFor="let player of playerDetails">\n        <div class="player-section">\n          <div class="thumbImage image-sm">\n            <img *ngIf="player.photoPath != null && player.photoPath.length > 0; else noImage" src="{{global.PROFILEIMAGEURL}}{{player.photoPath}}" alt="" class="img-circle" onerror="this.onerror=null;this.src=\'assets/images/test-user.svg\';">\n            <ng-template #noImage>\n                <div class="img-circle"><span class="img-text">{{player.first_name[0]}} {{player.last_name[0]}} </span></div>\n            </ng-template>\n          </div>\n          <div class="player-info mt-20">\n            <h4 class="info-item">{{player.first_name}} {{player.last_name}}</h4>\n            <p *ngIf="player.uniform_id != null && player.uniform_id.toString().length > 0">#{{player.uniform_id}}</p>\n          </div>\n        </div>\n        <div class="row">\n          <div class="report-circle col-xs-6 p-0" [class.pl-0]="(PersonData.PERSON_ID==player.person_id || FunctionAccess.user_adminLevel!=4) && FunctionAccess.HasMedicineReviewAccess==1">\n            <div class="xl-circle">\n              <div class="xs-title coaching coaching-report" (click)="coachingReport()">COACHING <br> REPORT</div>\n            </div>\n          </div>\n          <div class="records-circle col-xs-6 pr-0" *ngIf="(PersonData.PERSON_ID==player.person_id || FunctionAccess.user_adminLevel!=4) && FunctionAccess.HasMedicineReviewAccess==1">\n            <div class="xl-circle">\n              <div class="xs-title records medical-records" (click)="medicalRecords()">MEDICAL<br>RECORDS</div>\n            </div>\n          </div>\n        </div>\n        <div class="navbar-inner" *ngIf="FunctionAccess.user_adminLevel!=4 || PersonData.PERSON_ID==player.person_id">\n          <ul class="nav navbar-nav">\n            <li class="chat border-right" [class.active]="(active == \'sms\')" *ngIf="FunctionAccess.player_sms==\'yes\'">\n              <a href="javascript:void(0);" (click)="viewChat()"><div class="icon-circle"></div>CHAT</a>\n            </li>\n            <li class="email border-right" [class.active]="(active == \'email\')">\n              <a href="javascript:void(0);" (click)="showEmailModal()"><div class="icon-circle"></div>EMAIL</a>\n            </li>\n            <li class="phone border-right" [class.active]="(active == \'phone\')" *ngIf="FunctionAccess.player_phone==\'yes\'">\n              <a href="javascript:void(0);" (click)="showCallModal(false)"><div class="icon-circle"></div>PHONE</a>\n            </li>\n            <li class="injury emergency"  [class.active]="(active == \'emergencyPhone\')" *ngIf="FunctionAccess.player_emergency_phone==\'yes\' ">\n              <a href="javascript:void(0);" (click)="showCallModal(true)"><div class="icon-circle"></div>EMERGENCY PHONE</a>\n            </li>\n          </ul>\n        </div>\n      </section>\n    </form>\n  </section>\n</ion-content>\n\n<!-- <ion-footer>\n  <nav class="navbar navbar-default navbar-fixed-bottom">\n    <div class="container-fluid">\n      <ul class="nav navbar-nav">\n        <li class="home" (click)="gFn.gotoHome()"><a href="javascript:void(0);">Home</a></li>\n        <li class="events" (click)="gFn.gotoDisplayEvents()"><a href="javascript:void(0);">Events</a></li>\n        <li class="players active" (click)="gFn.goToPlayersDashboard()"><a href="javascript:void(0);">Players</a></li>\n        <li class="comment" (click)="gFn.goToChatDashboard()"><a href="javascript:void(0);">Comments</a></li>\n        <li class="more" (click)="gFn.goToMenuPage()"><a href="javascript:void(0);">More</a></li>\n      </ul>\n    </div>\n  </nav>\n</ion-footer> -->\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/player-details/player-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_7__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], PlayerDetailsPage);
    return PlayerDetailsPage;
}());

//# sourceMappingURL=player-details.js.map

/***/ })

});
//# sourceMappingURL=39.js.map