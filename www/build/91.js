webpackJsonp([91],{

/***/ 755:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatGroupInfoPageModule", function() { return ChatGroupInfoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat_group_info__ = __webpack_require__(862);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChatGroupInfoPageModule = /** @class */ (function () {
    function ChatGroupInfoPageModule() {
    }
    ChatGroupInfoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__chat_group_info__["a" /* ChatGroupInfoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__chat_group_info__["a" /* ChatGroupInfoPage */]),
            ],
        })
    ], ChatGroupInfoPageModule);
    return ChatGroupInfoPageModule;
}());

//# sourceMappingURL=chat-group-info.module.js.map

/***/ }),

/***/ 862:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatGroupInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(18);
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
 * Generated class for the ChatGroupInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChatGroupInfoPage = /** @class */ (function () {
    function ChatGroupInfoPage(navCtrl, navParams, storage, http, alertCtrl, loadingCtrl, gFn, global, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.gFn = gFn;
        this.global = global;
        this.global_api = global_api;
        this.isMuteStatus = false;
        this.personId = '';
        this.pepperoni = false;
        this.groupId = navParams.get('group_Id');
        this.isMuteUnmuteStatus = navParams.get('isMuteStatus');
        if (this.isMuteUnmuteStatus == 1) {
            this.isMuteStatus = true;
        }
        this.storage.get('loggedInUserData').then(function (val) {
            _this.personId = val.PERSON_ID;
            _this.getGroupInfo();
        });
    }
    ChatGroupInfoPage.prototype.ionViewDidLoad = function () {
        // console.log('ionViewDidLoad ChatGroupInfoPage');
    };
    ChatGroupInfoPage.prototype.getGroupInfo = function () {
        var _this = this;
        var chatData = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]()
            .set('groupId', this.groupId)
            .set('personId', this.personId);
        this.http.post(this.global.APIURL + 'messages/getChatGroupInfo', chatData, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            _this.teamName = response.GROUPINFO.TEAMS;
            _this.divisionName = response.GROUPINFO.DIVISIONS;
            _this.sportName = response.GROUPINFO.SPORTS;
            _this.memberList = response.GROUPINFO.TOTALUSER;
            _this.ISMUTE = response.GROUPINFO.ISMUTE;
            if (_this.ISMUTE == 1) {
                _this.isMuteStatus = true;
            }
            var groupInfoDetails = response.GROUPINFO.USERLIST;
            console.log(groupInfoDetails);
            _this.groupInfo = [];
            for (var key in groupInfoDetails) {
                _this.groupInfo.push(groupInfoDetails[key]);
            }
            if (response.SUCCESS) {
            }
        }, function (error) {
        });
    };
    ChatGroupInfoPage.prototype.muteUnmuteFunction = function (dis_group_Id) {
        //console.log(this.isMuteStatus);
        if (this.isMuteStatus == false) {
            this.muteNotification(dis_group_Id);
        }
        else {
            this.unmuteNotification(dis_group_Id);
        }
    };
    ChatGroupInfoPage.prototype.muteNotification = function (dis_group_Id) {
        var _this = this;
        //console.log(dis_group_Id);
        var alert = this.alertCtrl.create({
            title: 'Specify the reason',
            enableBackdropDismiss: false,
            inputs: [
                {
                    type: 'radio',
                    label: 'Mute for 8 hours',
                    value: '8'
                },
                {
                    type: 'radio',
                    label: 'Mute for 1 day',
                    value: '24'
                },
                {
                    type: 'radio',
                    label: 'Mute for 1 week',
                    value: '168'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                        _this.goBack();
                    }
                },
                {
                    text: 'OK',
                    handler: function (muteTime) {
                        if (muteTime === void 0) { muteTime = '0'; }
                        console.log('OK clicked: ');
                        //console.log(this.personId);
                        var muteUnmuteChat = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]()
                            .set('groupId', dis_group_Id)
                            .set('muteHours', muteTime)
                            .set('personeId', _this.personId);
                        var loading = _this.loadingCtrl.create();
                        loading.present();
                        _this.http.post(_this.global.APIURL + 'messages/muteUnmuteChat', muteUnmuteChat, { headers: _this.global_api.getHeader() })
                            .subscribe(function (response) {
                            loading.dismiss();
                            if (response.SUCCESS) {
                                _this.isMuteStatus = true;
                                if (muteTime == '8') {
                                    _this.gFn.presentToast('Mute successful for ' + muteTime + ' hours.');
                                }
                                else if (muteTime == '24') {
                                    _this.gFn.presentToast('Mute successful for one days.');
                                }
                                else if (muteTime == '168') {
                                    _this.gFn.presentToast('Mute successful for one week.');
                                }
                                // this.goBack();
                                _this.navCtrl.remove(_this.navCtrl.getActive().index - 1, 2);
                            }
                            else {
                                _this.gFn.presentToast('Problem in mute notification.');
                            }
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    ChatGroupInfoPage.prototype.unmuteNotification = function (dis_group_Id) {
        var _this = this;
        this.isMuteStatus = false;
        var muteUnmuteChat = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]()
            .set('groupId', dis_group_Id)
            .set('muteHours', '0')
            .set('personeId', this.personId);
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.global.APIURL + 'messages/muteUnmuteChat', muteUnmuteChat, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS) {
                _this.gFn.presentToast('Notification unmute successfully.');
                //this.goBack();
                _this.navCtrl.remove(_this.navCtrl.getActive().index - 1, 2);
            }
            else {
                _this.gFn.presentToast('Problem in mute notification.');
            }
        });
    };
    ChatGroupInfoPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    ChatGroupInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-chat-group-info',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/chat-group-info/chat-group-info.html"*/'<!--\n  Generated template for the ChatGroupInfoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <nav class="navbar navbar-fixed-top">\n    <div class="top-bar clearfix">\n        <div class="pull-left">\n            <div class="backArrow info-item" (click)="goBack()">INFO</div>\n        </div>\n    </div>\n  </nav>\n</ion-header>\n\n\n<ion-content>\n    <div class="bg-gray event">\n        <section class="main">\n          <form class="user-form profile setting-first">\n              <section class="profileFirst heightAuto player-search-swipe-down">\n                  <div class="event-card welfare bg-gray">\n\n                    <div class="chat-logo text-center">\n                        <h4 class="teamName">{{teamName}}</h4>\n                        <h5>{{divisionName}}</h5>\n                        <h5 class="sport">{{sportName}}</h5>\n                    </div>\n                  </div>\n\n                    <div class="well select-card mute-notifications">\n                        <div class="row">\n                            <div class="d-flex p-0 chat-home toggle-bar">\n                                <span>Mute Notifications</span>\n                                <ion-item class="notifications-taggle">\n                                  <ion-toggle checked="{{isMuteStatus}}" color="secondary" mode="ios" (ionChange)="muteUnmuteFunction(groupId)"></ion-toggle>\n                                </ion-item>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class="event-card welfare bg-gray">\n                    <div class="row">\n                        <div class=" col-xs-5 p-0 chat-new-message">\n                            <h5>{{memberList}} PARTICIPANTS</h5>\n                        </div>\n                    </div>\n                    <div class="well select-card" *ngFor="let memberInfoList of groupInfo">\n                      <div class="row">\n                          <div class="card-img col-xs-2 p-0">\n                              <span class="">\n                                  <img *ngIf="memberInfoList.PHOTOPATH != \'\'; else noImage" src="{{global.PROFILEIMAGEURL + memberInfoList.PHOTOPATH}}" alt="" class="img-circle" onerror="this.onerror=null;this.src=\'assets/images/test-user.svg\';">\n                                  <!--<img src="assets/images/test-user.svg" alt="" class="img-circle">-->\n                                  <ng-template #noImage>\n                                      <div class="img-circle" *ngIf="memberInfoList.FIRSTNAME != \'\'"><span class="img-text">{{memberInfoList.FIRSTNAME[0] | uppercase}} {{memberInfoList.LASTNAME[0] | uppercase}} </span></div>\n                                      <div class="img-circle" *ngIf="memberInfoList.FIRSTNAME == \'\'"><span class="img-text"> N N </span></div>\n                                  </ng-template>\n                            </span>\n                          </div>\n                          <div class="card-title col-xs-10 p-0 chat-home">\n                              <div class="row">\n                                  <div class="col-xs-7 p-0">\n                                        <span>{{memberInfoList.FIRSTNAME}} {{memberInfoList.LASTNAME}}</span>\n                                  </div>\n                              </div>\n                              <div class="row">\n                                  <div class="col-xs-12 p-0">\n                                    <p class="ch-time">{{memberInfoList.USERINFO}}</p>\n                                  </div>\n                              </div>\n                          </div>\n                      </div>\n                    </div>\n                </div>\n              </section>\n          </form>\n      </section>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/chat-group-info/chat-group-info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], ChatGroupInfoPage);
    return ChatGroupInfoPage;
}());

//# sourceMappingURL=chat-group-info.js.map

/***/ })

});
//# sourceMappingURL=91.js.map