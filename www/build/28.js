webpackJsonp([28],{

/***/ 828:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RollcallLogsPageModule", function() { return RollcallLogsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rollcall_logs__ = __webpack_require__(929);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RollcallLogsPageModule = /** @class */ (function () {
    function RollcallLogsPageModule() {
    }
    RollcallLogsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__rollcall_logs__["a" /* RollcallLogsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__rollcall_logs__["a" /* RollcallLogsPage */]),
            ],
        })
    ], RollcallLogsPageModule);
    return RollcallLogsPageModule;
}());

//# sourceMappingURL=rollcall-logs.module.js.map

/***/ }),

/***/ 929:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RollcallLogsPage; });
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







var RollcallLogsPage = /** @class */ (function () {
    function RollcallLogsPage(navCtrl, navParams, http, storage, global, gFn, modalCtrl, global_api) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.global = global;
        this.gFn = gFn;
        this.modalCtrl = modalCtrl;
        this.global_api = global_api;
        this.rollCallLogList = [];
        this.rollCallLogListSuccess = '0';
        this.phone = '';
        this.email = '';
        this.active = '';
        this.playerDetails = [];
        this.ShowLogs = false;
        this.emergencyPhoneExists = false;
        this.relations = [];
        this.NoContactFound = '0';
        this.passenger = navParams.get('passengers');
        this.relations[1] = 'Parent';
        this.relations[2] = 'Guardian';
        // console.log(this.passenger.rollcallPersonsId)
        this.getRollCallLogs();
        this.getPlayerDetails();
    }
    RollcallLogsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RollcallLogsPage');
    };
    RollcallLogsPage.prototype.getRollCallLogs = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('rollcallPersonId', _this.passenger.rollcallPersonsId)
                .set('timeZoneOffset', new Date().getTimezoneOffset().toString());
            _this.http.post(_this.global.APIURL + "transports/getRollcallLogs", Data, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS) {
                    _this.rollCallLogList = data.GETROLLCALLLOGS;
                    _this.rollCallLogListSuccess = '1';
                    resolve(true);
                }
                else {
                    _this.rollCallLogListSuccess = '2';
                    resolve(false);
                }
            }, function (error) {
                _this.rollCallLogListSuccess = '2';
                resolve(false);
            });
        });
    };
    RollcallLogsPage.prototype.getPlayerDetails = function () {
        var _this = this;
        // let loading = this.loadingCtrl.create();
        // loading.present();
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', this.passenger.person_id);
        this.http.post(this.global.APIURL + 'players/getPersonDetails', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            // loading.dismiss();
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
            }
        }, function (error) {
            // loading.dismiss();
        });
    };
    RollcallLogsPage.prototype.showSMSModal = function (phone) {
        var _this = this;
        if (phone === void 0) { phone = this.phone; }
        this.active = 'sms';
        setTimeout(function () {
            _this.active = '';
            if (phone.length == 0) {
                _this.gFn.presentToast('Phone number not set');
            }
            else {
                var smsModal = _this.modalCtrl.create('SmsModalPage', { phone: phone }, {
                    enableBackdropDismiss: true,
                    showBackdrop: true
                });
                smsModal.present();
            }
        }, 300);
    };
    RollcallLogsPage.prototype.showCallModal = function (emergency, phone_mobile) {
        var _this = this;
        if (phone_mobile === void 0) { phone_mobile = this.playerDetails[0].phone_mobile; }
        this.active = emergency ? 'emergencyPhone' : 'phone';
        setTimeout(function () {
            // this.active = '';
            if ((!emergency && phone_mobile == 0) || (emergency && !_this.emergencyPhoneExists)) {
                if (_this.active == 'phone') {
                    _this.gFn.presentToast('No associated contact found.');
                }
                else if (_this.active == 'emergencyPhone') {
                    _this.NoContactFound = '-1';
                    if (!_this.ShowLogs) {
                        _this.ShowLogs = true;
                    }
                    else {
                        _this.ShowLogs = false;
                    }
                }
            }
            else {
                _this.phone = emergency ? '' : phone_mobile;
                if (_this.active == 'phone') {
                    var callModal = _this.modalCtrl.create('CallModalPage', { phone: _this.phone, emergency: emergency, emergencyContacts: _this.emergencyContacts }, {
                        enableBackdropDismiss: true,
                        showBackdrop: true
                    });
                    callModal.present();
                }
                else if (_this.active == 'emergencyPhone') {
                    _this.NoContactFound = '1';
                    if (!_this.ShowLogs) {
                        _this.ShowLogs = true;
                    }
                    else {
                        _this.ShowLogs = false;
                    }
                }
            }
        }, 300);
    };
    RollcallLogsPage.prototype.showEmailModal = function (email) {
        var _this = this;
        if (email === void 0) { email = this.email; }
        this.active = 'email';
        setTimeout(function () {
            _this.active = '';
            if (email.length == 0) {
                _this.gFn.presentToast('Email not set');
            }
            else {
                var emailModal = _this.modalCtrl.create('EmailModalPage', { email: email }, {
                    enableBackdropDismiss: true,
                    showBackdrop: true
                });
                emailModal.present();
            }
        }, 300);
    };
    RollcallLogsPage.prototype.close = function (event) {
        if (event.toElement.className == "scroll-content") {
            this.navCtrl.pop();
        }
    };
    RollcallLogsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-rollcall-logs',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/rollcall-logs/rollcall-logs.html"*/'\n<ion-content class="bg-black" (click)="close($event)">\n    \n  <div class="modal-content logsModal">\n      \n      <div class="modal-body logsCard">\n          <div class="modal-header">\n              <h5 class="modal-title fontBold text-center">{{passenger.firstName | uppercase}} {{passenger.lastName | uppercase}}</h5>\n              <div class="card-img">\n                  <!-- <img src="assets/images/user.svg" alt="" class="img-circle"> -->\n                  <img src="{{global.PROFILEIMAGEURL}}{{passenger.photoPath}}" alt="" class="img-circle" *ngIf="passenger.photoPath!=\'\'">\n                  <span class="" *ngIf="passenger.photoPath==\'\'">\n                    <div class="img-circle"><span class="img-text">{{passenger.firstName[0]}} {{passenger.lastName[0]}} </span></div>                                  \n                  </span>\n              </div>\n          </div>\n          \n          <div class="navbar-inner clearfix">\n              <ul class="nav navbar-nav">\n                <li class="sms">\n                  <a href="javascript:void(0);" (click)="showSMSModal()"><div class="icon-circle"></div>SMS</a>\n                </li>\n                <li class="email">\n                  <a href="javascript:void(0);" (click)="showEmailModal()"><div class="icon-circle"></div>EMAIL</a>\n                </li>\n                <li class="phone">\n                  <a href="javascript:void(0);" (click)="showCallModal(false)"><div class="icon-circle"></div>PHONE</a>\n                </li>\n                <li class="emergency" *ngIf="!ShowLogs">\n                  <a href="javascript:void(0);" (click)="showCallModal(true)"><div class="icon-circle"></div>EMERGENCY</a>\n                </li>\n                <li class="logs" *ngIf="ShowLogs">\n                  <a href="javascript:void(0);" (click)="showCallModal(true)"><div class="icon-circle"></div>LOGS</a>\n                </li>\n              </ul>\n          </div>\n          <div class="log-section" *ngIf="ShowLogs">\n              <div class="header-border">\n                  <h4>EMERGENCY CONTACT</h4>\n              </div>\n              <div *ngIf="NoContactFound==\'-1\'">\n                <div class="logs-card eContact">\n                  <div class="logItem clearfix mt-10">\n                    <div class="info-item pull-left">\n                      <h4 class="m-0">No associated contact found.</h4> \n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div *ngFor="let key of emergencyContacts">\n                <div class="logs-card eContact">\n                  <div class="logItem clearfix mt-10">\n                    <div class="info-item pull-left">\n                      <h4 class="m-0">{{key.parentName}}</h4> \n                      <p>{{relations[key.relationship]}}</p>  \n                    </div>\n                    <div class="icon-item pull-left">\n                        <span (click)="showSMSModal(key.phone_mobile)"><img src="assets/images/transport/sms-black.svg" alt=""></span> \n                        <span (click)="showEmailModal(key.email_address)"><img src="assets/images/transport/email-black.svg" alt=""></span> \n                        <span (click)="showCallModal(false,key.phone_mobile)"><img src="assets/images/transport/phone-black.svg" alt=""></span> \n                    </div>\n                  </div>\n                </div>\n            </div>\n              \n          </div>\n          <div class="log-section" *ngIf="!ShowLogs">\n            <div class="header-border">\n                <h4>Rollcall logs</h4>\n            </div>\n            <div class="logs-card">\n              <div class="logItem clearfix" *ngFor="let player of rollCallLogList">\n                <div class="itemFirst pull-left"><span>{{player.onTime}}</span> {{player.statusDescription}} </div>\n                <div class="itemLast pull-right text-right">{{player.status}}</div>\n              </div>\n            </div>\n          </div>\n        </div>\n    </div>\n    \n</ion-content>\n<!-- <ion-footer [hidden]="keyboard.isOpen()">\n<div class="navbar navbar-default navbar-fixed-bottom">\n    <div class="container-fluid">\n        <ul class="nav navbar-nav">\n            <li class="home" (click)="gotoHome()"><a href="javascript:void(0);">Home</a></li>\n            <li class="events active" (click)="gotoDisplayEvents()"><a href="javascript:void(0);">Events</a></li>\n            <li class="players" (click)="goToPlayersDashboard()"><a href="javascript:void(0);">Players</a></li>\n            <li class="comment" (click)="goToChatDashboard()"><a href="javascript:void(0);">Comments</a></li>\n            <li class="more" (click)="goToMenuPage()"><a href="javascript:void(0);">More</a></li>\n        </ul>\n    </div>\n  </div>\n</ion-footer> -->\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/rollcall-logs/rollcall-logs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], RollcallLogsPage);
    return RollcallLogsPage;
}());

//# sourceMappingURL=rollcall-logs.js.map

/***/ })

});
//# sourceMappingURL=28.js.map