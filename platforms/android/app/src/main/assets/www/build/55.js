webpackJsonp([55],{

/***/ 799:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home__ = __webpack_require__(902);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]
            ]
        })
    ], HomePageModule);
    return HomePageModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 902:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__display_events_new_display_events_new__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__event_attendance_event_attendance__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__players_dashboard_players_dashboard__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__message_log_dashboard_message_log_dashboard__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_version_ngx__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_deeplinks_ngx__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_global_api_global_api__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, app, plt, events, storage, http, navParams, deeplinks, global, appVersion, gFn, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.app = app;
        this.plt = plt;
        this.events = events;
        this.storage = storage;
        this.http = http;
        this.navParams = navParams;
        this.deeplinks = deeplinks;
        this.global = global;
        this.appVersion = appVersion;
        this.gFn = gFn;
        this.global_api = global_api;
        this.seconds = 0;
        this.notify = '';
        this.absence = '';
        this.data1 = '';
        this.event_details = {};
        this.chat_details = {};
        this.storage.get("mobileAssets").then(function (res) {
            if (res) {
                _this.logoURL = res.Splash_screen;
            }
            else {
                if (_this.global_api && _this.global_api.splash) {
                    _this.logoURL = _this.global_api.splash;
                }
                else {
                    _this.logoURL = "assets/images/Poweredby.png";
                }
            }
        });
        this.primaryCheckingDuringPageLoad();
        plt.ready().then(function () {
            _this.deeplinks.route({
                '/home': __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */],
                '/event-attendance': __WEBPACK_IMPORTED_MODULE_5__event_attendance_event_attendance__["a" /* EventAttendancePage */],
                '/players-dashboard': __WEBPACK_IMPORTED_MODULE_6__players_dashboard_players_dashboard__["a" /* PlayersDashboardPage */],
                '/display-events': __WEBPACK_IMPORTED_MODULE_4__display_events_new_display_events_new__["a" /* DisplayEventsNewPage */],
                '/message-log-dashboard': __WEBPACK_IMPORTED_MODULE_7__message_log_dashboard_message_log_dashboard__["a" /* MessageLogDashboardPage */]
            }).subscribe(function (match) {
                // match.$route - the route we matched, which is the matched entry from the arguments to route()
                // match.$args - the args passed in the link
                // match.$link - the full link data
                console.log('Successfully matched route', match);
                var tabIndex = 0;
                var pageName = '';
                if (match.$link.path.indexOf('players') > -1) {
                    tabIndex = 2;
                    pageName = 'PlayersDashboardPage';
                }
                else if (match.$link.path.indexOf('event') > -1) {
                    tabIndex = 1;
                    pageName = 'DisplayEventsNewPage';
                    if (match.$link.path.indexOf('event-attendance') > -1) {
                        pageName = 'EventAttendancePage';
                    }
                }
                else if (match.$link.path.indexOf('message-log-dashboard') > -1) {
                    tabIndex = 5;
                    pageName = 'MessageLogDashboardPage';
                }
                if (tabIndex == 0) {
                    _this.navCtrl.setRoot(match.$route, match.$args);
                }
                else {
                    setTimeout(function () {
                        _this.app.getRootNav().getActiveChildNav().select(tabIndex)
                            .then(function (data) {
                            _this.app.getActiveNav().setRoot(pageName, match.$args);
                        });
                    }, 500);
                }
            }, function (nomatch) {
                // nomatch.$link - the full link data
                console.error('Got a deeplink that didn\'t match', nomatch);
            });
        });
    }
    HomePage.prototype.primaryCheckingDuringPageLoad = function () {
        var _this = this;
        console.log('test');
        this.storage.get('loggedInUserData').then(function (val) {
            console.log('step 9');
            if (val) {
                _this.firebaseNotification().then(function (x) {
                    console.log(x);
                    _this.msg = x;
                    console.log("happy happpy");
                    console.log(_this.msg);
                    if (_this.msg.body == 'You have a new group message in your email') {
                        console.log('D');
                        _this.setupPage(4);
                    }
                    else if (_this.msg.body == 'Please approve your absence.') {
                        _this.setupPage(5);
                    }
                    else if (_this.msg.body && _this.msg.body.indexOf('You have a new chat message') > -1) {
                        _this.setupPage1(_this.msg);
                    }
                    else if (_this.msg.body == 'Please confirm your attendance for the event') {
                        console.log('B');
                        _this.setupPage1(_this.msg);
                    }
                    else if (_this.msg.type == 'clientSurvey') {
                        console.log('A');
                        _this.setupPage1(_this.msg);
                    }
                    else {
                        console.log('no notification');
                        _this.setupPage(0);
                    }
                });
            }
            else {
                console.log('step 4');
                _this.setupPage(0);
            }
        });
        // this.setupPage(1)
    };
    HomePage.prototype.setupPage1 = function (msg) {
        var _this = this;
        console.log(msg);
        this.storage.get('loggedInUserData').then(function (val) {
            console.log('step 6');
            if (val) {
                _this.storage.get('isSetUp').then(function (val1) {
                    _this.seconds = -1;
                    clearInterval(null);
                    if (val1) {
                        _this.storage.get('SSODetails').then(function (val3) {
                            console.log('Step2');
                            if (val3) {
                                console.log('valStep');
                                //  this.navCtrl.setRoot(TabsPage,{Player_menu:val3.SHOWPLAYERSMENU==1?'yes':'no',activatedTab:tab});
                                _this.storage.set('BackButton', true);
                                if (("type" in msg) && ("timesheetData" in msg)) {
                                    var timesheetData = JSON.parse(msg.timesheetData);
                                    var ContractorData_1 = timesheetData.CONTRACTORS[0];
                                    ContractorData_1.hoursRec = _this.setRecordedHours(ContractorData_1.hoursRec);
                                    setTimeout(function () {
                                        _this.app.getRootNav().getActiveChildNav().select(1)
                                            .then(function (data) {
                                            _this.app.getActiveNav().push('ReadOnlyTimesheetPage', {
                                                UpcomingSingleEvent: msg.timesheetData,
                                                ContractorData: JSON.stringify(ContractorData_1)
                                            });
                                        });
                                    }, 500);
                                }
                                else if (("eventId" in msg) && !("groupId" in msg)) {
                                    //this.navCtrl.setRoot(TabsPage,{Player_menu:val3.SHOWPLAYERSMENU==1?'yes':'no'});
                                    _this.event_details.event_id = msg.eventId;
                                    _this.event_details.event_type_id = msg.eventTypeId;
                                    _this.event_details.client_id = msg.clientId;
                                    setTimeout(function () {
                                        _this.app.getRootNav().getActiveChildNav().select(1)
                                            .then(function (data) {
                                            _this.app.getActiveNav().push('EventAttendancePage', { EventDetails_eventId: _this.event_details, show_tab: 'yes' });
                                        });
                                    }, 500);
                                }
                                else if (("senderId" in msg) && msg.senderId != '' && !("groupId" in msg) && !("eventId" in msg)) {
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */], { Player_menu: val3.SHOWPLAYERSMENU == 1 ? 'yes' : 'no' });
                                    _this.chat_details.from = 1;
                                    _this.chat_details.to = 10;
                                    _this.chat_details.person_id = val.PERSON_ID;
                                    _this.chat_details.group_id = 0;
                                    _this.chat_details.receiver_name = msg.firstName + ' ' + msg.lastName;
                                    _this.chat_details.receiver_last_name = msg.lastName;
                                    _this.chat_details.receiver_id = msg.senderId;
                                    _this.chat_details.selectedTeam = val.SELECTEDTEAM;
                                    _this.chat_details.teamid = val.TEAM_ID;
                                    _this.chat_details.flag = 1;
                                    _this.chat_details.userPhoto = msg.photoPath;
                                    _this.chat_details.accFirstName = val.FIRST_NAME;
                                    _this.chat_details.accLastName = val.LAST_NAME;
                                    _this.chat_details.clientId = val.CLIENT_ID;
                                    setTimeout(function () {
                                        _this.app.getRootNav().getActiveChildNav().select(3)
                                            .then(function (data) {
                                            _this.app.getActiveNav().push('ChatViewPage', { data: _this.chat_details, show_tab: 'yes' });
                                        });
                                    }, 500);
                                }
                                else if (("groupId" in msg) && !("eventId" in msg) && msg.groupId != 0) {
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */], { Player_menu: val3.SHOWPLAYERSMENU == 1 ? 'yes' : 'no' });
                                    _this.chat_details.from = 1;
                                    _this.chat_details.to = 10;
                                    _this.chat_details.person_id = val.PERSON_ID;
                                    _this.chat_details.groupid = msg.groupId;
                                    _this.chat_details.groupName = msg.groupName;
                                    _this.chat_details.grouptype = msg.groupType;
                                    _this.chat_details.groupContactId = msg.groupContactId;
                                    _this.chat_details.selectedTeam = val.SELECTEDTEAM;
                                    _this.chat_details.teamid = val.TEAM_ID;
                                    _this.chat_details.flag = 1;
                                    _this.chat_details.userPhoto = msg.groupPhoto;
                                    _this.chat_details.accFirstName = val.FIRST_NAME;
                                    _this.chat_details.accLastName = val.LAST_NAME;
                                    _this.chat_details.clientId = val.CLIENT_ID;
                                    setTimeout(function () {
                                        _this.app.getRootNav().getActiveChildNav().select(3)
                                            .then(function (data) {
                                            _this.app.getActiveNav().push('GroupChatViewPage', { data: _this.chat_details, show_tab: 'yes' });
                                        });
                                    }, 500);
                                }
                            }
                            else {
                                console.log('Step2');
                                _this.storage.set('BackButton', true);
                                //this.navCtrl.setRoot(TabsPage);
                                _this.event_details.event_id = msg.eventId;
                                _this.event_details.event_type_id = msg.eventTypeId;
                                //  this.navCtrl.setRoot(TabsPage,{activatedTab:tab});
                                setTimeout(function () {
                                    _this.app.getRootNav().getActiveChildNav().select(1)
                                        .then(function (data) {
                                        _this.app.getActiveNav().push('EventHomeNewPage', { EventDetails_eventId: _this.event_details, show_tab: 'yes' });
                                    });
                                }, 500);
                            }
                        });
                    }
                    else {
                        _this.navCtrl.push('WelcomePage');
                    }
                });
            }
            else {
                console.log('step 7');
                // this.seconds=-1;
                // clearInterval();
                // this.navCtrl.push('GetStartedPage');
                _this.getSSOaccess().then(function (response) {
                    if (response && _this.SSOEnabled == 1) {
                        _this.navCtrl.push('GetStartedPage');
                        // if(this.SSOEnabled==1){
                        // }
                        // else if(this.SSOEnabled==0){
                        //   this.navCtrl.push('LoginPage');
                        // }
                    }
                    else {
                        setTimeout(function () {
                            _this.navCtrl.push('LoginPage');
                        }, 1000);
                    }
                });
            }
        });
    };
    HomePage.prototype.setupPage = function (tab) {
        var _this = this;
        console.log('step 5');
        this.storage.get('loggedInUserData').then(function (val) {
            console.log('step 6');
            if (val) {
                _this.storage.get('isSetUp').then(function (val1) {
                    _this.seconds = -1;
                    clearInterval(null);
                    if (val1) {
                        _this.storage.get('SSODetails').then(function (val3) {
                            console.log('Step2');
                            if (val3) {
                                console.log('valStep');
                                // this.navCtrl.setRoot(TabsPage,{Player_menu:val3.SHOWPLAYERSMENU==1?'yes':'no',activatedTab:tab});
                                _this.navCtrl.setRoot('TabsPage');
                            }
                            else {
                                console.log('Step2');
                                _this.navCtrl.setRoot('TabsPage', { activatedTab: tab });
                            }
                        });
                    }
                    else {
                        _this.navCtrl.push('WelcomePage');
                    }
                });
            }
            else {
                console.log('step 7');
                // this.seconds=-1;
                // clearInterval();
                // this.navCtrl.push('GetStartedPage');
                _this.getSSOaccess().then(function (response) {
                    if (response && _this.SSOEnabled == 1) {
                        _this.navCtrl.push('GetStartedPage');
                        // if(this.SSOEnabled==1){
                        // }
                        // else if(this.SSOEnabled==0){
                        //   this.navCtrl.push('LoginPage');
                        // }
                    }
                    else {
                        setTimeout(function () {
                            _this.navCtrl.push('LoginPage');
                        }, 1000);
                    }
                });
            }
        });
        //   setInterval(()=>{
        //   if(this.seconds>=0){
        //     this.seconds++;
        //   }
        //   if(this.seconds>1){
        //     this.storage.get('loggedInUserData').then((val) => {
        //       if(val){
        //         this.storage.get('isSetUp').then((val1) => {
        //           this.seconds=-1;
        //           clearInterval();
        //           if(val1){
        //             this.navCtrl.setRoot(TabsPage);
        //           } else {
        //             this.navCtrl.push('WelcomePage');
        //           }
        //         });
        //       }
        //       else{
        //         this.seconds=-1;
        //         clearInterval();
        //         this.navCtrl.push('GetStartedPage');
        //       }
        //     });
        //   }
        // },1000)
    };
    HomePage.prototype.firebaseNotification = function () {
        var _this = this;
        console.log('step 2');
        return new Promise(function (resolve) {
            console.log('step 3');
            // this.firebase.onNotificationOpen().subscribe(
            //   (msg) => {
            //     debugger
            //     console.log(msg);
            //     if (msg) {
            //       this.msg = msg;
            //       if(this.msg.type && this.msg.type == "groupMessage"){
            //         console.log('D');
            //         this.setupPage(5);
            //         // let count = this.msg.body.length;
            //         // this.badge.set(count)
            //       }
            //       else if(this.msg.body && this.msg.body.indexOf('Please approve your absence') > -1)
            //       {
            //         this.setupPage(6);
            //       }
            //       else if(this.msg.body && this.msg.body.indexOf('You have a new chat message') > -1)
            //       {
            //         this.setupPage1(this.msg);
            //       }
            //       else if(this.msg.type && this.msg.type == "notify")
            //       {
            //         console.log('B');
            //         this.setupPage1(this.msg);
            //       }
            //       else if(this.msg.type && this.msg.type == "timesheet")
            //       {
            //         this.setupPage1(this.msg);
            //       }
            //       else if(this.msg.type == 'clientSurvey'){
            //         console.log('A');
            //         this.setupPage1(this.msg);
            //       }
            //       else{
            //         console.log('no notification');
            //         this.setupPage(0)
            //       }
            //       resolve(msg)
            //     }
            //     else {
            //       resolve(false)
            //     }
            //   }, error => {
            //     console.log('AA')
            //   })
            _this.storage.get('loggedInUserData').then(function (val) {
                console.log('step 10');
                resolve(false);
            });
        });
    };
    HomePage.prototype.fireSetup = function () {
        var _this = this;
        this.storage.get('loggedInUserData').then(function (val) {
            console.log(val);
            if (val) {
                // this.firebase.getToken();
                // this.firebase.onNotificationOpen().subscribe(
                //   (msg) => {
                //     console.log(msg);
                //     this.msg = msg;
                //     console.log(this.msg);
                //     if (this.msg != undefined) {
                //       if (this.msg.body == 'You have a new group message in your email') {
                //         this.mssgBody = this.msg.body;
                //         this.storage.get('isSetUp').then((val1) => {
                //           this.seconds = -1;
                //           clearInterval(null);
                //           if (val1) {
                //             this.storage.get('SSODetails').then((val3) => {
                //               console.log('Step2')
                //               if (val3) {
                //                 this.navCtrl.setRoot(TabsPage, { Player_menu: val3.SHOWPLAYERSMENU == 1 ? 'yes' : 'no' });
                //                 if (this.mssgBody) {
                //                   this.navCtrl.push('MessageLogDashboardPage');
                //                 }
                //               }
                //               else {
                //                 this.navCtrl.setRoot(TabsPage);
                //                 if (this.mssgBody) {
                //                   this.navCtrl.push('MessageLogDashboardPage');
                //                 }
                //               }
                //             })
                //           } else {
                //             this.navCtrl.push('WelcomePage');
                //           }
                //         });
                //       }
                //       if (this.msg.body == 'Please approve your absence.') {
                //         this.mssgBody = this.msg.body;
                //       }
                //       if (this.plt.is('ios')) {
                //       } else {
                //         console.log(this.msg);
                //       }
                //     }
                //   });
                console.log(_this.mssgBody);
                _this.storage.get('isSetUp').then(function (val1) {
                    _this.seconds = -1;
                    clearInterval(null);
                    if (val1) {
                        _this.storage.get('SSODetails').then(function (val3) {
                            console.log('Step4');
                            if (val3) {
                                // this.navCtrl.setRoot(TabsPage, { Player_menu: val3.SHOWPLAYERSMENU == 1 ? 'yes' : 'no' });
                                _this.navCtrl.setRoot('TabsPage');
                            }
                            else {
                                _this.navCtrl.setRoot('TabsPage');
                            }
                        });
                    }
                    else {
                        _this.navCtrl.push('WelcomePage');
                    }
                });
            }
        });
    };
    HomePage.prototype.getStarted = function () {
        // this.navCtrl.push('GetStartedPage');
    };
    HomePage.prototype.getSSOaccess = function () {
        var _this = this;
        this.storage.get('loggedInUserData').then(function (val) {
            if (val == null) {
                _this.loggedInUserData = '';
            }
            else {
                _this.loggedInUserData = val;
            }
        });
        console.log('step 8');
        var headers = new __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["c" /* HttpHeaders */]({
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': this.global.App_id
        });
        return new Promise(function (resolve) {
            var Data = new __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["d" /* HttpParams */]()
                .set('app_name', _this.global.App_id);
            _this.http.post(_this.global.APIURL + "teams/getClubDetails", Data, { headers: headers })
                .subscribe(function (data) {
                if (data.SUCCESS) {
                    var SSODetails = _this.events.publish('json:query', data.GETCLUBDETAILS)[0][0];
                    _this.SSOEnabled = SSODetails && SSODetails.ISSSOENABLED ? SSODetails.ISSSOENABLED : 0;
                    _this.SSOUrl = SSODetails && SSODetails.SSOURL ? SSODetails.SSOURL : '';
                    // var SSODetails={
                    //   SSOEnabled:this.SSOEnabled,
                    //   SSOUrl:this.SSOUrl
                    // }
                    _this.storage.set('SSODetails', SSODetails);
                    resolve(true);
                }
                else {
                    resolve(false);
                    _this.gFn.presentToast('Contact Sports department for more Details');
                }
            }, function (error) {
                resolve(false);
                console.log("Error", error);
                _this.gFn.presentToast('Connection problem');
            });
        });
    };
    HomePage.prototype.setRecordedHours = function (data) {
        var hours = data;
        var scoreHour = Math.floor(hours);
        var minute = parseInt((((hours - Math.floor(hours)) * (60 / 100) * 100)).toFixed(2));
        if (scoreHour < 10) {
            scoreHour = this.padLeft(scoreHour, 2);
        }
        if (minute < 10) {
            minute = this.padLeft(minute, 2);
        }
        hours = scoreHour + ':' + minute;
        return hours;
    };
    HomePage.prototype.padLeft = function (num, size) {
        var s = num + "";
        while (s.length < size)
            s = "0" + s;
        return s;
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/home/home.html"*/'<ion-content class="bg-homeScreen" [ngStyle]="{\'background\': \'url(\' + logoURL + \') no-repeat\',\'background-position\' : \'center !important\'}" >\n  <!-- <section class="main bg-white-gradient">\n    <div class="brand-logo v-center">\n       <img class="logo" [src]="logoURL" alt="Logo"/>\n    </div>\n\n    <div class="footer-item v-bottom">\n      <a class="title" href="javascript:void(0);">Get organised</a> <br>\n       <p>Powered By</p>\n       <img class="logo1" src="assets/images/logo.svg" alt="Logo"/>\n    </div>\n\n  </section> -->\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_deeplinks_ngx__["a" /* Deeplinks */],
            __WEBPACK_IMPORTED_MODULE_9__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_version_ngx__["a" /* AppVersion */],
            __WEBPACK_IMPORTED_MODULE_10__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_13__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

});
//# sourceMappingURL=55.js.map