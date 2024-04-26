webpackJsonp([75],{

/***/ 776:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventDashboardPageModule", function() { return EventDashboardPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_dashboard__ = __webpack_require__(879);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_circle_progress__ = __webpack_require__(336);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var EventDashboardPageModule = /** @class */ (function () {
    function EventDashboardPageModule() {
    }
    EventDashboardPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__event_dashboard__["a" /* EventDashboardPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__event_dashboard__["a" /* EventDashboardPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ng_circle_progress__["a" /* NgCircleProgressModule */].forRoot()
            ],
        })
    ], EventDashboardPageModule);
    return EventDashboardPageModule;
}());

//# sourceMappingURL=event-dashboard.module.js.map

/***/ }),

/***/ 879:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventDashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_event_logger_event_logger__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_calendar_ngx__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_launch_navigator_ngx__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_global_api_global_api__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var EventDashboardPage = /** @class */ (function () {
    function EventDashboardPage(navCtrl, navParams, http, toastCtrl, loadingCtrl, storage, events, keyboard, global, modalCtrl, app, launchNavigator, logger, plt, gFn, calendar, Alert, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.events = events;
        this.keyboard = keyboard;
        this.global = global;
        this.modalCtrl = modalCtrl;
        this.app = app;
        this.launchNavigator = launchNavigator;
        this.logger = logger;
        this.plt = plt;
        this.gFn = gFn;
        this.calendar = calendar;
        this.Alert = Alert;
        this.global_api = global_api;
        this.eventAttend = [];
        this.DupeventAttendLen = [];
        this.DupeventAttendsec = [];
        this.DupEventAttendSecBorrowed = [];
        this.combinedPlayersArray = [];
        this.combinedBorrowedPlayersArray = [];
        this.percentArray = [];
        this.Arrowflag = false;
        this.AttendyPersonId = '';
        this.arrDetail = [];
        this.GoingColor = '#68E048';
        this.MaybeColor = '#2BBFF0';
        this.NotGoingColor = '#D80000';
        this.NoResponseColor = '#F59044';
        this.AttdnColor = '#fff';
        this.reason_options_list = [];
        this.Attendance = false;
        this.filterState = 0;
        this.filterButton = '';
        this.BorrowTagFlag = 0;
        this.BackButton = false;
        this.SymbolAlert = false;
        this.groundAdress = '';
        this.groundState = '';
        this.latitude = '';
        this.longitude = '';
        this.homeAwayText = '';
        this.isParent = false;
        this.showEvent = false;
        this.AutoSegments = {};
        this.ShowSeverityPage = false;
        this.medicalInfo = false;
        this.surveyAccess = 0;
        //Result
        this.players = [];
        this.reportTextRowOpened = false;
        this.scoreHome = "0";
        this.scoreAway = "0";
        this.scoreHomePrev = "0";
        this.scoreAwayPrev = "0";
        this.gameDismissed = "";
        this.reportText = "";
        this.vote1 = '';
        this.vote2 = '';
        this.vote3 = '';
        this.activePlayer = '';
        this.voteSuccess = false;
        this.voteForPlayerId = '';
        this.coachDetails = [];
        this.EmptyBorrowPlayer = false;
        this.scoreIsUpdated = 0;
        this.showTransport = false;
        this.isSurvey = false;
        this.surveyId = 0;
        this.temp_array = [];
        this.mBottom = "";
        this.gFn.showMenuIcon();
        this.PhotoApiUrl = this.global.PROFILEIMAGEURL;
        gFn.hideFormAccessoryBar(true);
        // $('.tabs .tab-button[aria-selected=true]:nth-child(4) .tab-button-icon').toggle()
        // $('.tabs .tab-button[aria-selected=true]:nth-child(4) .tab-button-icon').css({'mask-image': '',
        // 'height': '',
        // 'color': '#dedede'})
        if (this.navParams.get('show_tab')) {
            this.show_tab = this.navParams.get('show_tab');
        }
        this.storage.get('FunctionAccess').then(function (val) {
            _this.FunctionAccess = val;
            _this.storage.get('loggedInUserData').then(function (val) {
                _this.PersonData = val;
                _this.coachDetails[0] = val;
                if (_this.navParams.get('EventDetails_eventId')) {
                    _this.UpcomingSingleEvent = _this.navParams.get('EventDetails_eventId');
                    if (_this.navParams.get('deeplink')) {
                        _this.UpcomingSingleEvent = JSON.parse(_this.UpcomingSingleEvent);
                    }
                    _this.storage.set('UpcomingSingleEvent', JSON.stringify(_this.UpcomingSingleEvent));
                    _this.event_id = _this.UpcomingSingleEvent.event_id;
                    if (_this.FunctionAccess.event_Welfare == 'yes' && _this.UpcomingSingleEvent.welfare_question == 1) {
                        $('.top_tab').find('.Welfare_tab').css('display', 'inherit');
                        _this.ShowWelfare = true;
                    }
                    if ((_this.FunctionAccess.event_Result == 'yes' || _this.FunctionAccess.voting_for_player != 'no') && _this.UpcomingSingleEvent.event_type_id != 2) {
                        $('.top_tab').find('.Result_tab').css('display', 'inherit');
                        _this.ShowResult = true;
                    }
                    var active_tab = navParams.get('ActiveTab') ? navParams.get('ActiveTab') : 'Attendance';
                    _this.segments = active_tab;
                    _this.AutoSegments = { value: _this.segments };
                    _this.segmentChanged(_this.AutoSegments);
                }
                else {
                    _this.storage.get('UpcomingSingleEvent').then(function (val) {
                        _this.UpcomingSingleEvent = JSON.parse(val);
                        _this.event_id = _this.UpcomingSingleEvent.event_id;
                        if (_this.FunctionAccess.event_Welfare == 'yes' && _this.UpcomingSingleEvent.welfare_question == 1) {
                            $('.top_tab').find('.Welfare_tab').css('display', 'inherit');
                            _this.ShowWelfare = true;
                        }
                        if ((_this.FunctionAccess.event_Result == 'yes' || _this.FunctionAccess.voting_for_player != 'no') && _this.UpcomingSingleEvent.event_type_id != 2) {
                            $('.top_tab').find('.Result_tab').css('display', 'inherit');
                            _this.ShowResult = true;
                        }
                        var active_tab = navParams.get('ActiveTab') ? navParams.get('ActiveTab') : 'Attendance';
                        _this.segments = active_tab;
                        _this.AutoSegments = { value: _this.segments };
                        _this.segmentChanged(_this.AutoSegments);
                    });
                }
            });
        });
    }
    EventDashboardPage.prototype.segmentChanged = function (event) {
        var _this = this;
        if (event.value == 'Attendance') {
            // this.segments='Attendance'
            var loader_1 = this.loadingCtrl.create({});
            loader_1.present();
            // this.getPersonDetail().then((z) => {
            //   if (z) {
            this.getAttendingDetails();
            this.getEventDetails().then(function (x) {
                if (x) {
                    _this.AllPlayersLoad().then(function (y) {
                        if (y) {
                            loader_1.dismiss();
                        }
                    });
                }
            });
            //   }
            // });
        }
        else if (event.value == 'Welfare') {
            // this.segments='Welfare'
            var loader_2 = this.loadingCtrl.create();
            loader_2.present();
            // this.getPersonDetail().then((y) => {
            this.getEventDetails().then(function (y) {
                if (y) {
                    _this.displayFunction().then(function (x) {
                        if (x) {
                            setTimeout(function () {
                                loader_2.dismiss();
                            }, 100);
                        }
                    });
                }
            });
        }
        // else if(event.value=='Welfare'){
        //   this.segments='Welfare'
        // }
        else if (event.value == 'Result') {
            // this.segments='Result'
            this.loadDataFromAPIs();
            this.loader = this.loadingCtrl.create({});
            this.loader.present();
        }
    };
    EventDashboardPage.prototype.goToChooseTeamsPage = function () {
        this.navCtrl.push('ChooseTeamProfilePage');
    };
    EventDashboardPage.prototype.highlightMenuIcon = function () {
        // $('.tabs .tab-button[aria-selected=true]:nth-child(1)').attr('aria-selected','false')
        $('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected', 'true');
        $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({
            'mask-image': 'url(../assets/images/menu/home.svg)',
            'height': '22px',
            'color': '#dedede'
        });
        // $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': 'url(../assets/images/menu/events-blue.svg)',
        // 'height': '36px',
        // 'color': '#43B7CC'})
    };
    EventDashboardPage.prototype.unhighlightMenuIcon = function () {
        if (!this.showEvent) {
            // this.navCtrl.pop()
            $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({
                'mask-image': '',
                'height': '',
                'color': ''
            });
            // $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': '',
            // 'height': '',
            // 'color': ''})
            $('.tab-button-icon').closest('.tabs .tab-button[aria-selected=true]:nth-child(1) .activated').css({
                'mask-image': '',
                'height': '',
                'color': ''
            });
            $('.tabs .tab-button[aria-selected=true]:nth-child(2)').attr('aria-selected', 'false');
        }
    };
    EventDashboardPage.prototype.ionViewDidEnter = function () {
        this.highlightMenuIcon();
    };
    EventDashboardPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.highlightMenuIcon();
        this.storage.get('BackButton').then(function (val) {
            _this.BackButton = val;
        });
    };
    EventDashboardPage.prototype.ionViewWillLeave = function () {
        this.unhighlightMenuIcon();
    };
    EventDashboardPage.prototype.getAttendingDetails = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('event_id', _this.UpcomingSingleEvent.event_id)
                .set('client_id', _this.PersonData.CLIENT_ID)
                .set('person_id', _this.PersonData.PERSON_ID)
                .set('first_name', _this.PersonData.FIRST_NAME)
                .set('last_name', _this.PersonData.LAST_NAME)
                .set('selectedTeam', _this.PersonData.SELECTEDTEAM);
            _this.http.post(_this.global.APIURL + "players/getPlayerAttending", Data, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                _this.reason_options_list.push(data.GETPLAYERATTENDING[0].reason_options_list);
                resolve(true);
            }, function (error) {
            });
        });
    };
    EventDashboardPage.prototype.gotoResults = function () {
        this.gFn.gotoResults();
        this.showEvent = true;
    };
    EventDashboardPage.prototype.gotoWelfare = function () {
        this.gFn.gotoWelfare();
        this.showEvent = true;
    };
    EventDashboardPage.prototype.goToSurvey = function () {
        this.gFn.goToSurvey(this.surveyId, this.event_id, this.PersonData.CLIENT_ID, this.PersonData.SELECTEDTEAM, this.PersonData.PERSON_ID);
        this.showEvent = false;
    };
    EventDashboardPage.prototype.getEventDetails = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('event_id', _this.UpcomingSingleEvent.event_id)
                .set('event_type_id', _this.UpcomingSingleEvent.event_type_id)
                .set('clientTimeZone', _this.PersonData.CLIENTTIMEZONE)
                .set('selectedTeam', _this.PersonData.SELECTEDTEAM)
                .set('client_id', _this.PersonData.CLIENT_ID)
                .set('person_id', _this.PersonData.PERSON_ID);
            _this.http.post(_this.global.APIURL + "events/getEventDetails", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (response) {
                _this.arrDetail = response.GETEVENTDETAILS;
                _this.isSurvey = _this.arrDetail[0].isSurvey == 1;
                if (typeof _this.arrDetail[0].surveyId !== "undefined") {
                    _this.surveyId = _this.arrDetail[0].surveyId;
                }
                _this.surveyAccess = _this.arrDetail[0].access;
                _this.homeAwayText = (response.GETEVENTDETAILS[0]["ishometeam"]) ? 'Home' : 'Away';
                _this.storage.set('EventDetails', _this.arrDetail);
                for (var _i = 0, _a = _this.arrDetail; _i < _a.length; _i++) {
                    var keys = _a[_i];
                    _this.key = keys;
                    _this.date = _this.key.date.split('/')[0];
                    _this.groundAdress = _this.key.ground_address;
                    _this.groundState = _this.key.ground_state;
                    _this.longitude = _this.key.geoloc_longitude;
                    _this.latitude = _this.key.geoloc_latitude;
                }
                if (_this.arrDetail[0].is_transport_enabled == 1 && _this.FunctionAccess.event_Transport == 1) {
                    _this.showTransport = true;
                }
                if (response.GETEVENTDETAILS.length > 0) {
                    _this.scoreIsUpdated = response.GETEVENTDETAILS[0]["isUpdated"];
                    _this.scoreHome = _this.getPrefixedNumber(response.GETEVENTDETAILS[0]["homescore"]);
                    _this.scoreAway = _this.getPrefixedNumber(response.GETEVENTDETAILS[0]["awayscore"]);
                    _this.scoreHomePrev = _this.scoreHome;
                    _this.scoreAwayPrev = _this.scoreAway;
                    _this.reportText = (response.GETEVENTDETAILS[0]["ishometeam"]) ? response.GETEVENTDETAILS[0]["report_home"] : response.GETEVENTDETAILS[0]["report_away"];
                    _this.homeAwayText = (response.GETEVENTDETAILS[0]["ishometeam"]) ? 'Home' : 'Away';
                    if (response.GETEVENTDETAILS[0]["washout"] == "1") {
                        _this.gameDismissed = "washout";
                        $(".radio-game-dismissed").each(function () {
                            if ($(this).val() == "washout")
                                $(this).attr("checked", "checked");
                            $('.radio').find('.Washout').addClass('HighLight');
                        });
                    }
                    else if (response.GETEVENTDETAILS[0]["forfeit"] == "1") {
                        _this.gameDismissed = "forfeit";
                        $(".radio-game-dismissed").each(function () {
                            if ($(this).val() == "forfeit")
                                $(this).attr("checked", "checked");
                            $('.radio').find('.forfeit').addClass('HighLight');
                        });
                    }
                    else {
                        _this.gameDismissed = "";
                    }
                }
                resolve(true);
            }, function (error) {
            });
        });
    };
    // getPersonDetail() {
    //   return new Promise((resolve) => {
    //     this.storage.get('loggedInUserData').then((val) => {
    //       this.PersonData = val;
    //       this.coachDetails[0] = val;
    //       if(val.ISPARENT && val.PERSON_ID != val.PARENT_ID){
    //         this.isParent = true;
    //       }
    //       let loginData = new HttpParams()
    //         .set('person_id', this.PersonData.PERSON_ID);
    //       this.http.post(this.global.APIURL + "users/getUserInfo", loginData)
    //         .subscribe((data: any) => {
    //           let loggedInUserData = this.events.publish('json:query', data.GETUSERINFO);
    //           this.client_id = loggedInUserData[0][0].CLIENT_ID_FK;
    //           this.selectedTeam = (loggedInUserData[0][0].CLUB_DIVISION_ID_FK);
    //           resolve(true);
    //         }, error => {
    //         });
    //     });
    //   })
    // }
    EventDashboardPage.prototype.eventState = function (eventVal, event) {
        var _this = this;
        var loader = this.loadingCtrl.create({});
        loader.present().then(function () {
            if (_this.filterButton == eventVal) {
                _this.filterState = 0;
                _this.filterButton = '';
                _this.notifyFlag = '';
                loader.dismiss();
            }
            else {
                _this.filterButton = eventVal;
                _this.filterState = 1;
            }
            _this.combinedPlayersArray = [];
            _this.combinedBorrowedPlayersArray = [];
            if (eventVal == 'Going' && _this.filterState == 1) {
                _this.notifyFlag = 0;
                _this.DupeventAttendsec[0] = _this.eventAttend[0];
                _this.DupeventAttendsec[1] = _this.DupeventAttendsec[2] = _this.DupeventAttendsec[3] = [];
                _this.DupEventAttendSecBorrowed[0] = _this.BorrowedPlayerPresent[0];
                _this.DupEventAttendSecBorrowed[1] = _this.DupEventAttendSecBorrowed[2] = _this.DupEventAttendSecBorrowed[3] = [];
                $(event.target).closest('.radial-progressbar').find('.Going').removeClass('inactive');
                $(event.target).closest('.radial-progressbar').find('.MayBe').addClass('inactive');
                $(event.target).closest('.radial-progressbar').find('.NotGoing').addClass('inactive');
                $(event.target).closest('.radial-progressbar').find('.NoResponse').addClass('inactive');
                _this.GoingColor = '#68E048';
                _this.NoResponseColor = _this.NotGoingColor = _this.MaybeColor = '#404C62';
                loader.dismiss();
            }
            else if (eventVal == 'Maybe' && _this.filterState == 1) {
                _this.notifyFlag = 3;
                _this.DupeventAttendsec[0] = _this.eventAttend[3];
                _this.DupeventAttendsec[3] = _this.DupeventAttendsec[2] = _this.DupeventAttendsec[1] = [];
                _this.DupEventAttendSecBorrowed[0] = _this.BorrowedPlayerPresent[3];
                _this.DupEventAttendSecBorrowed[3] = _this.DupEventAttendSecBorrowed[2] = _this.DupEventAttendSecBorrowed[1] = [];
                $(event.target).closest('.radial-progressbar').find('.MayBe').removeClass('inactive');
                $(event.target).closest('.radial-progressbar').find('.Going').addClass('inactive');
                $(event.target).closest('.radial-progressbar').find('.NotGoing').addClass('inactive');
                $(event.target).closest('.radial-progressbar').find('.NoResponse').addClass('inactive');
                _this.MaybeColor = '#2BBFF0';
                _this.NoResponseColor = _this.NotGoingColor = _this.GoingColor = '#404C62';
                loader.dismiss();
            }
            else if (eventVal == 'Not going' && _this.filterState == 1) {
                _this.notifyFlag = 1;
                _this.DupeventAttendsec[0] = _this.eventAttend[1];
                _this.DupeventAttendsec[3] = _this.DupeventAttendsec[2] = _this.DupeventAttendsec[1] = [];
                _this.DupEventAttendSecBorrowed[0] = _this.BorrowedPlayerPresent[1];
                _this.DupEventAttendSecBorrowed[3] = _this.DupEventAttendSecBorrowed[2] = _this.DupEventAttendSecBorrowed[1] = [];
                $(event.target).closest('.radial-progressbar').find('.NotGoing').removeClass('inactive');
                $(event.target).closest('.radial-progressbar').find('.MayBe').addClass('inactive');
                $(event.target).closest('.radial-progressbar').find('.Going').addClass('inactive');
                $(event.target).closest('.radial-progressbar').find('.NoResponse').addClass('inactive');
                _this.NotGoingColor = '#D80000';
                _this.NoResponseColor = _this.MaybeColor = _this.GoingColor = '#404C62';
                loader.dismiss();
            }
            else if (eventVal == 'No response' && _this.filterState == 1) {
                _this.notifyFlag = 2;
                _this.DupeventAttendsec[0] = _this.eventAttend[2];
                _this.DupeventAttendsec[1] = _this.DupeventAttendsec[2] = _this.DupeventAttendsec[3] = [];
                _this.DupEventAttendSecBorrowed[0] = _this.BorrowedPlayerPresent[2];
                _this.DupEventAttendSecBorrowed[1] = _this.DupEventAttendSecBorrowed[2] = _this.DupEventAttendSecBorrowed[3] = [];
                $(event.target).closest('.radial-progressbar').find('.NoResponse').removeClass('inactive');
                $(event.target).closest('.radial-progressbar').find('.MayBe').addClass('inactive');
                $(event.target).closest('.radial-progressbar').find('.NotGoing').addClass('inactive');
                $(event.target).closest('.radial-progressbar').find('.Going').addClass('inactive');
                _this.NoResponseColor = '#F59044';
                _this.NotGoingColor = _this.MaybeColor = _this.GoingColor = '#404C62';
                loader.dismiss();
            }
            _this.CheckEmptyBorrowedPlayer();
        });
        //this.CheckEmptyBorrowedPlayer(eventVal);
    };
    EventDashboardPage.prototype.CheckEmptyBorrowedPlayer = function () {
        this.EmptyBorrowPlayer =
            (this.filterState == 1 &&
                this.notifyFlag == 3 &&
                this.DupEventAttendSecBorrowed.length > 0 &&
                this.DupEventAttendSecBorrowed[0].length == 0) ||
                (this.DupEventAttendSecBorrowed.length > 0 &&
                    this.DupEventAttendSecBorrowed[0].length == 0 &&
                    this.DupEventAttendSecBorrowed[1].length == 0 &&
                    this.DupEventAttendSecBorrowed[2].length == 0 &&
                    this.DupEventAttendSecBorrowed[3].length == 0);
    };
    EventDashboardPage.prototype.SinglePlayersAttdStates = function (confirm, attended, reason, AttendyPersonId, event) {
        var _this = this;
        var reasondeclined = '';
        var reasondeclined_by_coach = '';
        var unsetAttendance = '0';
        if ($(event.target).hasClass('SelectedReason')) {
            unsetAttendance = '1';
        }
        if (this.FunctionAccess.user_adminLevel == 4) {
            if (confirm == 'Y') {
                confirm = 'YES';
                attended = 1;
            }
            else if (confirm == 'N') {
                confirm = 'NO';
                attended = 0;
            }
            reasondeclined = reason;
        }
        else if (this.FunctionAccess.user_adminLevel != 4) {
            if (confirm == 'Y') {
                confirm = 'YES';
                attended = 1;
            }
            else if (confirm == 'N') {
                confirm = 'NO';
                attended = 0;
            }
            reasondeclined_by_coach = reason;
        }
        var loader = this.loadingCtrl.create({});
        loader.present();
        var loginData4 = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('event_id', this.UpcomingSingleEvent.event_id)
            .set('personId', AttendyPersonId)
            .set('attended', attended)
            .set('confirmed', confirm)
            .set('reasondeclined', reasondeclined)
            .set('reasondeclined_by_coach', reasondeclined_by_coach)
            .set('unsetAttendance', unsetAttendance)
            .set('state_time', '')
            .set('selectedTeam', this.PersonData.SELECTEDTEAM);
        this.http.post(this.global.APIURL + "events/saveSinglePlayersAttdStates", loginData4, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            // firebase event
            if (data.SUCCESS) {
                if (_this.FunctionAccess.user_adminLevel == 4) {
                    _this.logger.DashboardPlayerReason('PlayerAttendReasonSelect', { pram: Date.now() });
                }
                else if (_this.FunctionAccess.user_adminLevel != 4) {
                    _this.logger.CoachArrowAttd_Mark('CoachArrowAttd_Mark', { pram: Date.now() });
                }
            }
            _this.resetColors(event);
            _this.AllPlayersLoad().then(function (y) {
                if (y) {
                    loader.dismiss();
                }
            });
        }, function (error) {
        });
    };
    EventDashboardPage.prototype.ArrowFunctionality = function (event) {
        if (this.Arrowflag == false) {
            var target = event.target;
            $(target).closest('.row').find('ul').show();
            if (this.FunctionAccess.user_adminLevel == 4) {
                $(target).closest('.row').find('ul').addClass('Div-Arrow');
            }
            $(target).closest('.row').find('.collapsed-arrow').removeClass('ArrowLight');
            $(target).closest('.row').find('.collapsed-arrow').addClass('ArrowDark');
            this.Arrowflag = true;
        }
        else if (this.Arrowflag == true) {
            var target = event.target;
            $(target).closest('.row').find('ul').hide();
            $(target).closest('.row').find('.collapsed-arrow').removeClass('ArrowDark');
            $(target).closest('.row').find('.collapsed-arrow').addClass('ArrowLight');
            this.Arrowflag = false;
        }
    };
    EventDashboardPage.prototype.hideAttendanceList = function (event) {
        var target = event.target;
        if (!$(target).hasClass('collapsed-arrow') && $('ul.dropdown-menu.card-dropdown:visible').length) {
            $('.collapsed-arrow').removeClass('ArrowDark').addClass('ArrowLight');
            $('ul.dropdown-menu.card-dropdown').hide();
            this.Arrowflag = false;
        }
    };
    EventDashboardPage.prototype.goToTimesheet = function () {
        this.navCtrl.push('TimesheetPage');
        this.showEvent = true;
    };
    EventDashboardPage.prototype.borrow_player = function () {
        this.navCtrl.push('BorrowedPlayerPage', { UpcomingSingleEvent: JSON.stringify(this.UpcomingSingleEvent) });
        this.showEvent = true;
    };
    EventDashboardPage.prototype.notify_player = function () {
        this.navCtrl.push('NotifyPlayersPage', {
            notifyFlag: this.notifyFlag,
            UpcomingSingleEvent: JSON.stringify(this.UpcomingSingleEvent)
        });
        this.showEvent = true;
    };
    EventDashboardPage.prototype.WelfarePlayerQuestion = function (event) {
        var _this = this;
        this.showEvent = true;
        var Data = Object.keys(this.PersonData).reduce(function (c, k) { return (c[k.toLowerCase()] = _this.PersonData[k], c); }, {});
        this.navCtrl.push('PlayerQuestionPage', { Player_detail: Data });
    };
    EventDashboardPage.prototype.gotoGroupMessage = function () {
        this.showEvent = true;
        /*let GroupMessageModal = this.modalCtrl.create('EventGroupMessagePage', { Array: this.DupeventAttendLen });
        GroupMessageModal.onDidDismiss(data => {
        });
        GroupMessageModal.present();*/
        this.navCtrl.push('EventGroupSendMessagePage', { notifyFlag: this.notifyFlag });
    };
    EventDashboardPage.prototype.gotoSessionPlan = function () {
        this.navCtrl.push('EventSessionPlanPage');
    };
    EventDashboardPage.prototype.gotoInjuredList = function () {
        this.showEvent = true;
        if (this.FunctionAccess.event_Injury == 'self') {
            this.navCtrl.push('InjuryIncidentReportPage', { 'injured_person_id': this.PersonData.PERSON_ID });
        }
        else {
            this.navCtrl.push('InjuredListPage');
        }
    };
    // gotoReqAttendance(){
    //   this.navCtrl.push('AlertDashboardPage')
    // }
    EventDashboardPage.prototype.AllPlayersLoad = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var PlayersData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('event_id', _this.UpcomingSingleEvent.event_id)
                .set('client_id', _this.PersonData.CLIENT_ID) //this.PersonData.CLIENT_ID
                .set('selectedTeam', _this.PersonData.SELECTEDTEAM) //this.PersonData.SELECTEDTEAM
                .set('personId', _this.PersonData.PERSON_ID);
            _this.http.post(_this.global.APIURL + "players/AllLoadPlayersAttendance", PlayersData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                _this.eventAttend = data.DATA;
                _this.BorrowedPlayerPresent = data.DATA_BORROWED;
                _this.ArrangePlayers();
                _this.CheckEmptyBorrowedPlayer();
                resolve(true);
            }, function (error) {
            });
        });
    };
    EventDashboardPage.prototype.ArrangePlayers = function () {
        this.DupeventAttendLen = [];
        this.DupEventAttendSecBorrowed = [];
        this.percentArray = [];
        this.combinedPlayersArray = [];
        this.combinedBorrowedPlayersArray = [];
        this.temp_array = [];
        var key, key1;
        for (key in this.eventAttend) {
            this.DupeventAttendsec[key] = [];
            this.temp_array[key] = [];
            for (key1 in this.eventAttend[key]) {
                if (this.eventAttend[key][key1].person_id == this.PersonData.PERSON_ID) {
                    //this.eventAttend[key][key1].attendanceStatus = 1 //just for testing
                    /* if(this.FunctionAccess.view_other_players == 'yes')
                    { */
                    this.DupeventAttendsec[key].push(this.eventAttend[key][key1]);
                    /* }
                    if(this.FunctionAccess.view_other_players == 'no')
                    {
                      this.DupeventAttendsec[0].unshift(this.eventAttend[key][key1]);
                    } */
                    if (this.eventAttend[key][key1].attendanceStatus in [0, 1]) {
                        this.SymbolAlert = true;
                    }
                }
                else {
                    if (this.FunctionAccess.user_adminLevel != 4) {
                        this.DupeventAttendsec[key].push(this.eventAttend[key][key1]);
                    }
                }
                if (this.FunctionAccess.user_adminLevel != 4) {
                    if (key < 3) {
                        this.combinedPlayersArray.push(this.eventAttend[key][key1]);
                    }
                }
            }
            this.DupeventAttendLen[key] = this.DupeventAttendsec[key].length;
        }
        this.combinedPlayersArray.sort(function (a, b) {
            var x = a.first_name.toLowerCase() + ' ' + a.last_name.toLowerCase();
            var y = b.first_name.toLowerCase() + ' ' + b.last_name.toLowerCase();
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });
        //Player Name on the top of tthe List
        for (var key3 in this.combinedPlayersArray) {
            if (this.combinedPlayersArray[key3].person_id == this.PersonData.PERSON_ID) {
                this.combinedPlayersArray.unshift(this.combinedPlayersArray[key3]);
                this.combinedPlayersArray.splice(parseInt(key3) + 1, 1);
            }
        }
        if (this.FunctionAccess.user_adminLevel != 4) {
            for (key in this.BorrowedPlayerPresent) {
                this.DupEventAttendSecBorrowed[key] = [];
                for (key1 in this.BorrowedPlayerPresent[key]) {
                    if (this.BorrowedPlayerPresent[key][key1].person_id == this.PersonData.PERSON_ID) {
                        this.DupEventAttendSecBorrowed[0].unshift(this.BorrowedPlayerPresent[key][key1]);
                    }
                    else {
                        this.DupEventAttendSecBorrowed[key].push(this.BorrowedPlayerPresent[key][key1]);
                    }
                    if (key < 3) {
                        this.combinedBorrowedPlayersArray.push(this.BorrowedPlayerPresent[key][key1]);
                    }
                    this.BorrowTagFlag = 1;
                }
                this.DupeventAttendLen[key] += this.DupEventAttendSecBorrowed[key].length;
            }
            this.combinedBorrowedPlayersArray.sort(function (a, b) {
                var x = a.first_name.toLowerCase() + ' ' + a.last_name.toLowerCase();
                var y = b.first_name.toLowerCase() + ' ' + b.last_name.toLowerCase();
                if (x < y) {
                    return -1;
                }
                if (x > y) {
                    return 1;
                }
                return 0;
            });
        }
        var totalPlayerCount = this.eventAttend[0].length + this.eventAttend[1].length + this.eventAttend[2].length;
        totalPlayerCount += this.BorrowedPlayerPresent[0].length + this.BorrowedPlayerPresent[1].length + this.BorrowedPlayerPresent[2].length;
        this.DupeventAttendLen.push(totalPlayerCount);
        for (key in this.eventAttend) {
            this.percentArray.push((this.DupeventAttendLen[key] / totalPlayerCount) * 100);
            this.DupeventAttendLen[key] = this.zero_pad(this.DupeventAttendLen[key]);
        }
    };
    EventDashboardPage.prototype.resetColors = function (event) {
        this.notifyFlag = '';
        this.GoingColor = '#68E048';
        this.MaybeColor = '#2BBFF0';
        this.NotGoingColor = '#D80000';
        this.NoResponseColor = '#F59044';
        $('.radial-progressbar').find('.NoResponse,.MayBe,.NotGoing,.Going').removeClass('inactive');
        this.ArrangePlayers();
        this.hideAttendanceList(event);
        this.CheckEmptyBorrowedPlayer();
    };
    EventDashboardPage.prototype.gotoHome = function () {
        this.app.getRootNav().getActiveChildNav().select(1);
    };
    EventDashboardPage.prototype.backArrow = function () {
        this.app.getRootNav().getActiveChildNav().select(1).then(function () {
            $('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected', 'true');
        });
    };
    EventDashboardPage.prototype.zero_pad = function (num) {
        var s = num + "";
        while (s.length < 2)
            s = "0" + s;
        return s;
    };
    EventDashboardPage.prototype.AttendanceMark = function (event, Attendance, AttendyPersonId) {
        var attended;
        if ((Attendance == '' || Attendance == null || Attendance == 0) && this.FunctionAccess.user_adminLevel != 4) {
            attended = 1;
            this.AttendanceReport(attended, AttendyPersonId);
            $(event.target).removeClass('AbsentCheckbox1');
            $(event.target).addClass('PresentCheckbox1');
        }
        else if ((Attendance == '' || Attendance == null || Attendance == 1) && this.FunctionAccess.user_adminLevel != 4) {
            attended = 0;
            $(event.target).removeClass('PresentCheckbox1');
            $(event.target).addClass('AbsentCheckbox1');
            this.AttendanceReport(attended, AttendyPersonId);
        }
        this.logger.CoachRadioButtonAttd_Mark('CoachRadioButtonAttd_Mark', { pram: Date.now() });
    };
    EventDashboardPage.prototype.AttendanceReport = function (attended, AttendyPersonId) {
        var _this = this;
        var loginData4 = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('event_id', this.UpcomingSingleEvent.event_id)
            .set('personId', AttendyPersonId)
            .set('attended', attended)
            .set('confirmed', '-1')
            .set('reasondeclined', '-1')
            .set('reasondeclined_by_coach', '-1')
            .set('state_time', '')
            .set('selectedTeam', this.PersonData.SELECTEDTEAM);
        this.http.post(this.global.APIURL + "events/saveSinglePlayersAttdStates", loginData4, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            if (data.SUCCESS) {
                _this.AllPlayersLoad();
            }
        }, function (error) {
        });
    };
    EventDashboardPage.prototype.addEventToCalendar = function () {
        var _this = this;
        var calOptions = this.calendar.getCalendarOptions(); // grab the defaults
        var endDate = new Date(this.arrDetail[0].date_ended);
        endDate.setSeconds(endDate.getSeconds() + 10);
        var address = [];
        var addressName = ' ';
        if (this.arrDetail[0].ground_address.length > 0) {
            address.push(this.arrDetail[0].ground_address);
        }
        if (this.arrDetail[0].ground_state.length > 0) {
            address.push(this.arrDetail[0].ground_state);
        }
        if (address.length > 0) {
            addressName = address.join(',');
        }
        if (Object.prototype.toString.call(endDate) === "[object Date]") {
            if (isNaN(endDate.getTime())) {
                // date is not valid
                endDate = new Date(this.arrDetail[0].date_started);
                endDate.setSeconds(endDate.getSeconds() + 10);
            }
        }
        else {
            // not a date
            endDate = new Date(this.arrDetail[0].date_started);
            endDate.setSeconds(endDate.getSeconds() + 10);
        }
        this.calendar.createEventWithOptions(this.arrDetail[0].name, addressName, this.arrDetail[0].event_notes, new Date(this.arrDetail[0].date_started), endDate, calOptions).then(function (msg) {
            _this.presentAlert('Success', 'Event added to calendar.');
        }, function (err) {
            _this.presentAlert('Error', 'Problem in adding event to calendar. Please check the app permission settings.');
        });
    };
    EventDashboardPage.prototype.DisplaySeverityDetails = function (playerAilments) {
        this.ShowSeverityPage = true;
        if (playerAilments) {
            var SeverityModal = this.modalCtrl.create('SeverityDetailsModalPage', { playerAilments: playerAilments });
            SeverityModal.present();
        }
        else {
            this.presentToast('No Details found');
        }
    };
    EventDashboardPage.prototype.MedicineInformation = function (data) {
        var _this = this;
        this.medicalInfo = true;
        var MedicineInfo = this.modalCtrl.create('MedicineInfoPage', { values: data });
        MedicineInfo.present();
        MedicineInfo.onDidDismiss(function () {
            _this.medicalInfo = false;
        });
    };
    EventDashboardPage.prototype.presentAlert = function (Title, SubTitle) {
        var alert = this.Alert.create({
            title: Title,
            subTitle: SubTitle,
            buttons: ['Dismiss']
        });
        alert.present(alert);
    };
    EventDashboardPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    EventDashboardPage.prototype.openMap = function (address, state, latitude, longitude) {
        if (latitude != 0 && longitude != 0) {
            this.launchNavigator.navigate(latitude + ', ' + longitude);
        }
        else if (address || state) {
            this.launchNavigator.navigate(address + ', ' + state);
        }
        else {
            this.gFn.presentToast('Location undefined');
        }
    };
    EventDashboardPage.prototype.gotoTransport = function () {
        if (this.FunctionAccess.user_adminLevel == 4) {
            this.navCtrl.push('TransportListPage');
            // this.app.getActiveNav().push('TransportListPage')
        }
        else {
            // this.app.getRootNav().push('RollcallsPage')
            // this.app.getActiveNav().push('RollcallsPage')
            this.navCtrl.push('RollcallsPage');
        }
    };
    //Welfare
    EventDashboardPage.prototype.displayFunction = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var loginData4 = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('event_id', _this.UpcomingSingleEvent.event_id)
                .set('clientSport', 'team')
                .set('client_id', _this.PersonData.CLIENT_ID)
                .set('club_id', _this.PersonData.CLUB_ID)
                .set('adminLevel', _this.PersonData.ADMINLEVEL)
                .set('selectedTeam', _this.PersonData.SELECTEDTEAM);
            _this.http.post(_this.global.APIURL + "events/getPlayersEvent", loginData4, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                _this.WelfarePeopleDetail = data.GETPLAYERSEVENT;
                resolve(true);
            }, function (error) {
            });
        });
    };
    EventDashboardPage.prototype.PlayerQuestion = function (Player_detail, event) {
        if (!this.medicalInfo) {
            if (this.ShowSeverityPage == false) {
                if (this.PersonData.PERSON_ID == Player_detail.person_id || this.FunctionAccess.event_Welfare == 'yes') {
                    $(event.target).closest('.event-card').find('.well').addClass('active');
                    this.navCtrl.push('PlayerQuestionPage', { Player_detail: Player_detail }).then(function (x) {
                        $(event.target).closest('.event-card').find('.well').removeClass('active');
                    });
                }
            }
            else {
                this.ShowSeverityPage = false;
            }
        }
    };
    //Result
    EventDashboardPage.prototype.loadDataFromAPIs = function () {
        var _this = this;
        this.getEventDetails().then(function (x) {
            if (x) {
                _this.loadPlayersVotedState().then(function (y) {
                    _this.loader.dismiss();
                });
            }
            else {
                _this.loader.dismiss();
            }
        });
    };
    EventDashboardPage.prototype.loadPlayersVotedState = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('event_id', _this.UpcomingSingleEvent.event_id)
                .set('team_id', _this.PersonData.SELECTEDTEAM)
                .set('client_id', _this.PersonData.CLIENT_ID)
                .set('selectedTeam', _this.PersonData.SELECTEDTEAM)
                .set('club_id', _this.PersonData.CLUB_ID)
                .set('voter_id', _this.PersonData.PERSON_ID);
            _this.http.post(_this.global.APIURL + 'votes/getVotingPlayersEvent', data, { headers: _this.global_api.getHeader() })
                .subscribe(function (response) {
                if (response.SUCCESS) {
                    var count = 0;
                    for (var i = 0; i < response.GETVOTINGPLAYERSEVENT.length; i++) {
                        if ((_this.FunctionAccess && _this.FunctionAccess.voting_for_player == 'yes') &&
                            (_this.coachDetails[0].PERSON_ID == response.GETVOTINGPLAYERSEVENT[i].person_id)) {
                            _this.coachDetails[0].voted = response.GETVOTINGPLAYERSEVENT[i].voted;
                            continue;
                        }
                        _this.players[count] = response.GETVOTINGPLAYERSEVENT[i];
                        if (_this.players[count].vote1 == _this.players[count].person_id) {
                            _this.vote1 = _this.players[count].vote1;
                        }
                        else if (_this.players[count].vote2 == _this.players[count].person_id) {
                            _this.vote2 = _this.players[count].vote2;
                        }
                        else if (_this.players[count].vote3 == _this.players[count].person_id) {
                            _this.vote3 = _this.players[count].vote3;
                        }
                        count++;
                    }
                    resolve(true);
                }
            }, function (error) {
            });
        });
    };
    // getEventDetails() {
    // 	return new Promise((resolve) => {
    // 		let data = new HttpParams()
    // 			.set('event_id', this.event_id)
    // 			.set('event_type_id', this.event_type_id)
    // 			.set('clientTimeZone', this.clientTimeZone)
    // 			.set('selectedTeam', this.loggedInUserData.SELECTEDTEAM)
    // 			.set('client_id', this.loggedInUserData.CLIENT_ID);
    // 		this.http.post<any>(this.global.APIURL + 'events/getEventDetails', data)
    // 			.subscribe(response => {
    // 				if (response.SUCCESS) {
    // 					this.arrDetail = response.GETEVENTDETAILS;
    // 					this.groundAdress = this.arrDetail[0].ground_address;
    // 					this.groundState = this.arrDetail[0].ground_state;
    // 					this.longitude = this.arrDetail[0].geoloc_longitude;
    // 					this.latitude = this.arrDetail[0].geoloc_latitude;
    // 					console.log(this.groundAdress, this.groundState, this.longitude, this.latitude)
    // 					for (let keys of this.arrDetail) {
    // 						this.key = keys
    // 						this.date = this.key.date.split('/')[0]
    // 					}
    // 					if (response.GETEVENTDETAILS.length > 0) {
    // 						this.scoreHome = this.getPrefixedNumber(response.GETEVENTDETAILS[0]["homescore"]);
    // 						this.scoreAway = this.getPrefixedNumber(response.GETEVENTDETAILS[0]["awayscore"]);
    // 						this.reportText = (response.GETEVENTDETAILS[0]["ishometeam"]) ? response.GETEVENTDETAILS[0]["report_home"] : response.GETEVENTDETAILS[0]["report_away"];
    // 						this.homeAwayText = (response.GETEVENTDETAILS[0]["ishometeam"]) ? 'Home' : 'Away';
    // 						if (response.GETEVENTDETAILS[0]["washout"] == "1") {
    // 							this.gameDismissed = "washout";
    // 							$(".radio-game-dismissed").each(function () {
    // 								if ($(this).val() == "washout") $(this).attr("checked", "checked");
    // 								$('.radio').find('.Washout').addClass('HighLight')
    // 							})
    // 						}
    // 						else if (response.GETEVENTDETAILS[0]["forfeit"] == "1") {
    // 							this.gameDismissed = "forfeit";
    // 							$(".radio-game-dismissed").each(function () {
    // 								if ($(this).val() == "forfeit") $(this).attr("checked", "checked");
    // 								$('.radio').find('.forfeit').addClass('HighLight')
    // 							})
    // 						}
    // 						else {
    // 							this.gameDismissed = "";
    // 						}
    // 					}
    // 					resolve(true);
    // 				}
    // 				else { }
    // 			}, error => {
    // 			});
    // 	});
    // }
    EventDashboardPage.prototype.saveGameScore = function () {
        var _this = this;
        this.scoreHome = this.getPrefixedNumber(this.scoreHome);
        this.scoreAway = this.getPrefixedNumber(this.scoreAway);
        this.scoreHomePrev = this.scoreHome;
        this.scoreAwayPrev = this.scoreAway;
        var loader = this.loadingCtrl.create({});
        loader.present();
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('event_id', this.event_id)
            .set('homescore', this.scoreHome)
            .set('awayscore', this.scoreAway);
        this.http.post(this.global.APIURL + 'events/saveGameScore', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loader.dismiss();
            if (response.SUCCESS) {
                _this.scoreIsUpdated = response.ISUPDATED;
                //this.presentToast("Game score saved.");
            }
            else {
                //this.presentToast("Sorry we couldn't save data");
            }
        }, function (error) {
            loader.dismiss();
            //this.presentToast("Sorry we couldn't save data");
        });
    };
    EventDashboardPage.prototype.saveGameReport = function (isReport, isScoreSave) {
        var _this = this;
        if (isScoreSave === void 0) { isScoreSave = false; }
        if (typeof this.PersonData !== "undefined") {
            if (!isReport || (isReport || this.reportText.trim().length)) {
                var washout = "0";
                var forfeit = "0";
                if (this.gameDismissed == "washout") {
                    washout = "1";
                }
                else if (this.gameDismissed == "forfeit") {
                    forfeit = "1";
                }
                var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                    .set('event_id', this.event_id)
                    .set('reportHome', (this.arrDetail[0].ishometeam) ? this.reportText : '')
                    .set('reportAway', (!this.arrDetail[0].ishometeam) ? this.reportText : '')
                    .set('person_id', this.PersonData.PERSON_ID)
                    .set('washout', washout)
                    .set('forfeit', forfeit);
                this.http.post(this.global.APIURL + 'events/saveGameScoreReportByEvent', data, { headers: this.global_api.getHeader() })
                    .subscribe(function (response) {
                    $(".btn-sm-black").removeClass("active");
                    if (response.SUCCESS) {
                        _this.reportTextRowOpened = false;
                        var msg = "Game data saved.";
                        if (isReport && !_this.reportText) {
                            msg = "Game score saved.";
                            _this.presentToast(msg);
                        }
                        if (_this.reportText && !isReport) {
                            msg = "Game report saved.";
                            _this.presentToast(msg);
                        }
                        if (_this.reportText && isReport) {
                            msg = "Game score and report saved.";
                            _this.presentToast(msg);
                        }
                    }
                    else {
                        _this.presentToast("Sorry we couldn't save report");
                    }
                }, function (error) {
                    _this.presentToast("Sorry we couldn't save report");
                });
            }
            else {
                $(".btn-sm-black").removeClass("active");
                this.presentToast("Sorry couldn't save blank report");
            }
        }
    };
    EventDashboardPage.prototype.gameDismissedChange = function (ev) {
        if ((ev.target.value == "washout" && this.gameDismissed == "washout") ||
            (ev.target.value == "forfeit" && this.gameDismissed == "forfeit")) {
            this.gameDismissed = "";
        }
        else {
            $('.radio').find('.sub-title').removeClass('HighLight');
            if (ev.target.value == "washout") {
                $(ev.target).closest('.radio').find('.Washout').addClass('HighLight');
            }
            else {
                $(ev.target).closest('.radio').find('.Forfeit').addClass('HighLight');
            }
            this.gameDismissed = ev.target.value;
        }
        this.saveGameReport(false);
    };
    EventDashboardPage.prototype.saveVote = function (ev, person_id, ratings) {
        var _this = this;
        var v1 = '';
        var v2 = '';
        var v3 = '';
        if (ratings == 1) {
            v1 = person_id;
            this.vote1 = person_id;
            v2 = '';
            v3 = '';
            if (this.vote2 == this.vote1) {
                this.vote2 = 0;
            }
            else if (this.vote3 == this.vote1) {
                this.vote3 = 0;
            }
        }
        if (ratings == 2) {
            v1 = '';
            v2 = person_id;
            this.vote2 = person_id;
            v3 = '';
            if (this.vote1 == this.vote2) {
                this.vote1 = 0;
            }
            else if (this.vote3 == this.vote2) {
                this.vote3 = 0;
            }
        }
        if (ratings == 3) {
            v1 = '';
            v2 = '';
            v3 = person_id;
            this.vote3 = person_id;
            if (this.vote1 == this.vote3) {
                this.vote1 = 0;
            }
            else if (this.vote2 == this.vote3) {
                this.vote2 = 0;
            }
        }
        var loader = this.loadingCtrl.create({});
        loader.present();
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('event_id', this.event_id)
            .set('team_id', this.PersonData.SELECTEDTEAM)
            .set('voter_id', this.PersonData.PERSON_ID)
            .set('v3', this.vote3)
            .set('v2', this.vote2)
            .set('v1', this.vote1)
            .set('vote_baf_1', '')
            .set('vote_baf_2', '')
            .set('vote_baf_3', '')
            .set('season_id', this.PersonData.SEASON_ID);
        this.http.post(this.global.APIURL + 'votes/saveVotingPlayer', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loader.dismiss();
            if (response.SUCCESS) {
                _this.reportTextRowOpened = false;
                _this.presentToast("Voting records saved.");
            }
            else {
                _this.presentToast("Sorry we couldn't save data");
            }
        }, function (error) {
            loader.dismiss();
            _this.presentToast("Sorry we couldn't save data");
        });
        if (v1 != '') {
            $('.vote1').removeClass("active");
        }
        else if (v2 != '') {
            $('.vote2').removeClass("active");
        }
        else if (v3 != '') {
            $('.vote3').removeClass("active");
        }
        $(ev.target.parentElement).find("a").removeClass("active");
        $(ev.target).addClass("active");
    };
    EventDashboardPage.prototype.getPrefixedNumber = function (num) {
        if (typeof num == "undefined") {
            num = "0";
        }
        else if (num == "") {
            num = "0";
        }
        else {
            num = num.toString().replace(/^[0]+/, '');
            if (num == "")
                num = "0";
        }
        return num;
    };
    EventDashboardPage.prototype.prefixNumber = function (ev) {
        var num = this.getPrefixedNumber(ev.target.value);
        setTimeout(function () {
            if (num != ev.target.value) {
                ev.target.value = num;
            }
        }, 50);
    };
    EventDashboardPage.prototype.voteForPlayer = function (playerID, playerDetails) {
        var _this = this;
        if (!this.medicalInfo && this.FunctionAccess.voting_for_player == 'yes') {
            if (this.ShowSeverityPage == false) {
                if (this.FunctionAccess.voting_for_player == 'yes') {
                    this.activePlayer = playerID;
                    setTimeout(function () {
                        playerDetails = Object.keys(playerDetails).reduce(function (c, k) { return (c[k.toLowerCase()] = playerDetails[k], c); }, {});
                        _this.navCtrl.push('VoteForPlayerPage', { playerDetails: playerDetails, event_id: _this.event_id }).then(function () {
                            $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({
                                'mask-image': 'url(../assets/images/menu/home.svg)',
                                'height': '22px',
                                'color': '#dedede'
                            });
                            _this.gFn.hideMenuIcon();
                        });
                        _this.activePlayer = '';
                    }, 300);
                }
            }
            else {
                this.ShowSeverityPage = false;
            }
        }
    };
    EventDashboardPage.prototype.keyboardCheck = function () {
        if (this.mBottom == "") {
            this.mBottom = $(".scroll-content").css("margin-bottom");
        }
        if (this.keyboard.isOpen()) {
            $(".scroll-content").css("margin-bottom", "0");
            this.gFn.hideMenuIcon();
        }
        else {
            $(".scroll-content").css("margin-bottom", '56px');
            this.gFn.showMenuIcon();
        }
    };
    EventDashboardPage.prototype.inputFocus = function () {
        this.keyboardCheck();
    };
    EventDashboardPage.prototype.inputBlur = function () {
        this.keyboardCheck();
    };
    EventDashboardPage.prototype.saveGameScoreAndReport = function () {
        $(".btn-sm-black").addClass("active");
        if (this.scoreIsUpdated == 0 || this.reportText.trim().length) {
            this.saveGameScore();
        }
        this.saveGameReport(true, (this.scoreIsUpdated == 0) ? true : false);
    };
    EventDashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event-dashboard',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-dashboard/event-dashboard.html"*/'<ion-header class="header-md">\n  <ion-navbar class="main">\n\n    <div class="top-bar clearfix">\n      <div class="pull-left">\n\n        <div>\n            <button class="BackButton"(click)="backArrow()" *ngIf="BackButton"><img src="assets/images/arrow-black.svg"></button>\n            DASHBOARD\n          </div>\n      </div>\n      <div class="prev-next pull-right" (click)="goToChooseTeamsPage()">\n        <a href="javascript:void(0);" class="next"></a>\n      </div>\n    \n      <div class="calendar pull-right" (click)="addEventToCalendar()">\n        <img src="assets/images/calendar.svg">\n\n    </div>\n    <div class="location pull-right" (click)="openMap(groundAdress,groundState,latitude,longitude)">\n      <img src="assets/images/Location.svg">\n    </div>\n  </div>\n\n  </ion-navbar>\n  <ion-segment class ="top_tab top-menu" [(ngModel)]="segments" color="primary" (ionChange)="segmentChanged($event)" *ngIf="FunctionAccess">\n      <ion-segment-button class="Attendance_tab" value="Attendance" >\n        \n          <a href="javascript:void(0)" *ngIf="FunctionAccess.event_tab_Attendance==\'yes\'" >\n            <span [class.InactiveSpan]="segments!=\'Attendance\'" [class.active]="segments==\'Attendance\'" [class.ActiveSpan]="segments==\'Attendance\'">Attendance</span></a>\n          <a href="javascript:void(0)" *ngIf="FunctionAccess.event_tab_Overview==\'yes\'" >\n            <span [class.InactiveSpan]="segments!=\'Attendance\'" [class.active]="segments==\'Attendance\'" [class.ActiveSpan]="segments==\'Attendance\'">Overview</span>\n          </a>\n        </ion-segment-button>\n       \n        <ion-segment-button class="Welfare_tab" value="Welfare" style="display: none">\n            <a href="javascript:void(0)" >\n                <span [class.InactiveSpan]="segments!=\'Welfare\'" [class.active]="segments==\'Welfare\'" [class.ActiveSpan]="segments==\'Welfare\'">Welfare</span>\n              </a>\n        </ion-segment-button>\n        <ion-segment-button class="Result_tab" value="Result" style="display: none">\n            <a href="javascript:void(0)" >\n                <span [class.InactiveSpan]="segments!=\'Result\'" [class.active]="segments==\'Result\'" [class.ActiveSpan]="segments==\'Result\'">Results</span>\n              </a>\n        </ion-segment-button>\n    </ion-segment>\n  \n</ion-header>\n\n<ion-content class="bg-gray event attendance-content" *ngIf="segments==\'Attendance\'">\n  <section class="main">\n\n    <form action="" class="user-form profile bg-black" >\n      <section class="profileFirst heightAuto xs-padding" (click)="resetColors($event)">\n        <div *ngFor="let detail of arrDetail">\n          <div class="form-group">\n            <div class="date_time text-blue text-center">\n              <span class="dateOption">{{key.week}} {{date}} {{detail.months }}</span>\n              <span class="glyphicon glyphicon-time" *ngIf="arrDetail"></span>\n              <span class="timeOption">\n                <span>{{key.time_started}}</span>\n              </span>\n            </div>\n            <div class="homeAway-title text-center text-blue" *ngIf="UpcomingSingleEvent && UpcomingSingleEvent.event_type_id!=2">{{homeAwayText}}</div>\n          </div>\n          <h4 class="info-item text-center inverseText">{{detail.name}}\n            <p class="text-center inverseText">\n              <span *ngIf="detail.ground_name">{{detail.ground_name}}</span>\n              <br>\n              <span *ngIf="detail.ground_address && detail.ground_state" (click)="openMap(detail.ground_address, detail.ground_state,detail.geoloc_latitude,detail.geoloc_longitude)">{{detail.ground_address}},\n                {{detail.ground_state}}</span>\n              <span *ngIf="!detail.ground_address || !detail.ground_state">Undefined Location</span>\n            </p>\n          </h4>\n\n          <div class="bookmark-line mt-30"> <i class="glyphicon glyphicon-bookmark" style="background: #fff;width: 30px;height: 30px;border-radius: 15px;padding-top: 10px;"></i></div>\n          <p class="text-center inverseText mt-30">{{detail.event_notes}}</p>\n          <!--event note-->\n        </div>\n        <!-- <div>\n          <ion-icon class="alertIcon" name="ios-alert" (click)="gotoReqAttendance()" *ngIf="SymbolAlert"></ion-icon>\n        </div> -->\n        \n        <div class="radial-progressbar mt-30">\n          <div class="row">\n            <div class="info-left col-xs-3 p-0">\n              <div class="row text-right Going" (click)="eventState(\'Going\',$event)">\n                <span class="badge maybe" style=" background-color:colorGoing !important;height: 20px;">{{DupeventAttendLen[0]}}</span>\n                <h4 class="progress-item" style="color: #fff;">Going</h4>\n              </div>\n              <div class="divider"></div>\n              <div class="row text-right MayBe" (click)="eventState(\'Maybe\',$event)">\n                <span class="badge going" style="background-color:colorMaybe !important; height: 20px;">{{DupeventAttendLen[3]}}</span>\n                <h4 class="progress-item" style="color: #fff;">Notified</h4>\n              </div>\n            </div>\n\n            <div class="radial-circle p-0">\n              <circle-progress [percent]="percentArray[0]" [radius]="100" [outerStrokeWidth]="16" [innerStrokeWidth]="0"\n                [outerStrokeColor]="GoingColor" [animation]="false" [showInnerStroke]="false" [showTitle]="false"\n                [showSubtitle]="false" [showUnits]="false" class="going">\n\n              </circle-progress>\n              <circle-progress [percent]="percentArray[3]" [radius]="80" [outerStrokeWidth]="16" [innerStrokeWidth]="0"\n                [outerStrokeColor]="MaybeColor" [showInnerStroke]="false" [animation]="false" [showTitle]="false"\n                [showSubtitle]="false" [showUnits]="false" class="maybe">\n              </circle-progress>\n              <circle-progress [percent]="percentArray[1]" [radius]="60" [outerStrokeWidth]="16" [innerStrokeWidth]="0"\n                [outerStrokeColor]="NotGoingColor" [showInnerStroke]="false" [animation]="false" [showTitle]="false"\n                [showSubtitle]="false" [showUnits]="false" class="not-going">\n              </circle-progress>\n              <circle-progress [percent]="percentArray[2]" [radius]="40" [outerStrokeWidth]="16" [innerStrokeWidth]="0"\n                [outerStrokeColor]="NoResponseColor" [showInnerStroke]="false" [animation]="false" [showTitle]="false"\n                [showSubtitle]="false" [showUnits]="false" class="no-response">\n              </circle-progress>\n            </div>\n\n            <div class="info-right col-xs-3 p-0">\n              <div class="row text-left NotGoing" (click)="eventState(\'Not going\',$event)">\n                <span class="badge not-going" style="color:colorNotGoing !important;">{{DupeventAttendLen[1]}}</span>\n                <h4 class="progress-item" style="color: #fff;">Not going</h4>\n              </div>\n              <div class="divider"></div>\n              <div class="row text-left NoResponse" (click)="eventState(\'No response\',$event)">\n                <span class="badge no-response" style="background-color:colorNoResponse !important;">{{DupeventAttendLen[2]}}</span>\n                <h4 class="progress-item" style="color: #fff;">No response</h4>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class="scrollDown">\n          <i class="fa fa-chevron-down" aria-hidden="true"></i>\n        </div>\n        \n        <div class="navbar-inner clearfix">\n          <ul class="nav navbar-nav">\n            <li class="Survey" *ngIf="FunctionAccess.showSurveyMenu == \'yes\' && isSurvey" (click)="goToSurvey()">\n              <a href="javascript:void(0)">\n                <div class="icon-circle"></div><span *ngIf="surveyAccess == 2;else surveyContent"> RISK ASSESSMENT</span><ng-template #surveyContent> SURVEY</ng-template>\n              </a>\n            </li>\n            <li class="group" *ngIf="FunctionAccess && FunctionAccess.event_GroupMessage==\'yes\'" (click)="gotoGroupMessage()">\n              <a href="javascript:void(0)">\n                <div class="icon-circle"></div> GROUP MESSAGE\n              </a>\n            </li>\n            <li class="borrow" *ngIf="FunctionAccess && FunctionAccess.event_BorrowPlayer==\'yes\'" (click)="borrow_player()">\n              <a href="javascript:void(0)">\n                <div class="icon-circle"></div> BORROW STUDENT\n              </a>\n            </li>\n            <li class="notify" *ngIf="FunctionAccess && FunctionAccess.event_NotifyPlayer==\'yes\'" (click)="notify_player()">\n              <a href="javascript:void(0)">\n                <div class="icon-circle"></div> NOTIFY\n              </a>\n            </li>\n            <li class="welfare" *ngIf="FunctionAccess && FunctionAccess.event_Welfare==\'self\' && UpcomingSingleEvent && UpcomingSingleEvent.welfare_question==1" (click)="WelfarePlayerQuestion($event)">\n              <a href="javascript:void(0)">\n                <div class="icon-circle"></div> WELFARE\n              </a>\n            </li>\n            <li class="timesheet" *ngIf="PersonData && PersonData.ISCONTRACTOR" (click)="goToTimesheet()">\n              <a href="javascript:void(0)">\n                <div class="icon-circle"></div> TIMESHEET\n              </a>\n            </li>\n            <li *ngIf="showTransport" class="transport-player" (click)="gotoTransport()"> <!--*ngIf="showTransport"-->\n              <a href="javascript:void(0)">\n                <div class="icon-circle"></div> TRANSPORT\n              </a>\n            </li>\n\n            <!--\n                        <li class="session" (click)="gotoSessionPlan()">\n                            <a href="javascript:void(0)">\n                                <div class="icon-circle"></div> SESSION PLAN\n                            </a></li> -->\n            <li class="injury" *ngIf="FunctionAccess && FunctionAccess.event_Injury!=\'no\'" (click)="gotoInjuredList()">\n              <a href="javascript:void(0)">\n                <div class="icon-circle"></div> INJURY\n              </a>\n            </li>\n          </ul>\n        </div>\n      </section>\n      <div class="event-card bg-gray" *ngIf="!eventAttend && !BorrowedPlayerPresent">\n        <div class="well select-card ">\n          <div class="row">\n            <div class="col-xs-12 ">\n              <h5 class="sub-title">NO Team Mates Present</h5>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class="event-card bg-gray" (click)="hideAttendanceList($event)">\n        <div class="LastChild-check" *ngIf="eventAttend && !(combinedPlayersArray?.length > 0)">\n          <div *ngFor="let StateAttendy of DupeventAttendsec| slice:0:3;let i=index">\n            <div *ngIf="i<3">\n            <div class=" select-card" [class.well]="Attendy.injuryStatus!=1 && Attendy.injuryStatus!=2"\n              [class.RecoveredPlayer]="Attendy.injuryStatus==2" [class.InjuredPlayer]="Attendy.injuryStatus==1" *ngFor="let Attendy of StateAttendy| slice:0:3">\n\n              <div class="row">\n                <div class="card-img col-xs-2 p-0">\n                  <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2" [class.no-response]="Attendy.state==3"\n                    [class.maybe]="Attendy.state==4" *ngIf="!Attendy.PHOTOPATH">\n                    <div class="img-circle"><span class="img-text">{{Attendy.first_name[0] | uppercase}} {{Attendy.last_name[0] | uppercase}} </span></div>\n                    \n                  </span>\n                  <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2" [class.no-response]="Attendy.state==3"\n                    [class.maybe]="Attendy.state==4" *ngIf="Attendy.PHOTOPATH">\n                    <img src={{PhotoApiUrl}}{{Attendy.PHOTOPATH}} alt="" class="img-circle">\n                  </span>\n                </div>\n\n                <div class="card-title col-xs-8 p-0" [class.InjuredPlayerName]="Attendy.injuryStatus==1">{{Attendy.first_name\n                  | uppercase}} {{Attendy.last_name | uppercase}}\n                    <div class="select-group clearfix">\n                      <div class="pull-left checkArrow-group" [class.OuterDiv]="PersonData.PERSON_ID==Attendy.person_id && FunctionAccess.event_EventDetail==\'self\'" *ngIf="FunctionAccess">\n                        <div *ngIf="FunctionAccess.event_EventDetail==\'yes\'">\n                            <div class=" arrowUp ArrowLight" (click)="ArrowFunctionality($event)">\n                              <ion-icon name="ios-arrow-down" class=" collapsed-arrow"></ion-icon>\n                            </div>\n\n                          </div>\n                          <div class="  " *ngIf="PersonData.PERSON_ID==Attendy.person_id && FunctionAccess.event_EventDetail==\'self\'">\n                            <div class="p-0 arrowUp loggedIn-Arrow ArrowLight" (click)="ArrowFunctionality($event)">\n                              <ion-icon name="ios-arrow-down" class=" collapsed-arrow"></ion-icon>\n                            </div>\n                          </div>\n                          \n                      </div>\n                      \n                      <div class="display-status pull-left">\n                        <p class="Show_Status" [class.InjuredPlayerStatus]="Attendy.injuryStatus==1" *ngIf="Attendy.reasondeclined_by_coach==\'\'">{{Attendy.reasondeclined}}</p>\n                        <p class="Show_Status" [class.InjuredPlayerStatus]="Attendy.injuryStatus==1" *ngIf="Attendy.reasondeclined_by_coach!=\'\'">{{Attendy.reasondeclined_by_coach}}</p>\n                      </div>\n                    </div>\n                    <div class="suit-iconCard fixedRight" (click)="DisplaySeverityDetails(Attendy)" *ngIf="FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1 && ((Attendy.playerAilmentsSeverityIcon) || (Attendy.showMedicine==1))">\n                      <img src={{global.ImagesPath}}{{Attendy.playerAilmentsSeverityIcon}} class="suit-icon" *ngIf="(Attendy.playerAilmentsSeverityIcon  && (Attendy.showMedicine==1 || Attendy.showMedicine==0))">\n                      <img src="{{global.ImagesPath}}pills.svg" class="medical-bottle" *ngIf="((Attendy.showMedicine==1) && (!Attendy.playerAilmentsSeverityIcon))">\n                    </div>\n                </div>\n                \n                <div class="col-xs-2 checkArrow-group" [class.OuterDiv]="PersonData.PERSON_ID==Attendy.person_id && FunctionAccess.event_EventDetail_checkbox==\'self\'"\n                  *ngIf="FunctionAccess">\n                  <div class="col-xs-2 p-0 checkbox-col" *ngIf="FunctionAccess.event_EventDetail_checkbox==\'yes\'">\n\n                    <div class="checkbox1" [class.PresentCheckbox1]="Attendy.attended==1" [class.AbsentCheckbox1]="Attendy.attended==0"\n                      (click)="AttendanceMark($event,Attendy.attended,Attendy.person_id)">\n                    </div>\n                    <div class="checkbox"></div>\n                  </div>\n                </div>\n\n                <ul class="dropdown-menu card-dropdown" style="display:none; ">\n                  <li *ngFor="let key of reason_options_list[0]" (click)="SinglePlayersAttdStates(key.confirm_reason,\'\',key.reason_display,Attendy.person_id,$event)">\n                    <a href="javascript:void(0)" [class.SelectedReason]="key.reason_display==Attendy.reasondeclined_by_coach || key.reason_display==Attendy.reasondeclined">{{key.reason_display}}</a>\n                  </li>\n\n                </ul>\n              </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </div>\n\n        <!-- Regular player combined Start -->\n        <div class="LastChild-check" *ngIf="combinedPlayersArray?.length > 0">\n          <div class=" select-card" [class.well]="Attendy.injuryStatus!=1 && Attendy.injuryStatus!=2"\n            [class.RecoveredPlayer]="Attendy.injuryStatus==2" [class.InjuredPlayer]="Attendy.injuryStatus==1"\n            *ngFor="let Attendy of combinedPlayersArray">\n\n            <div class="row">\n              <div class="card-img col-xs-2 p-0">\n                <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2"\n                  [class.no-response]="Attendy.state==3" [class.maybe]="Attendy.state==4" *ngIf="!Attendy.PHOTOPATH">\n                  <div class="img-circle"><span class="img-text">{{Attendy.first_name[0] | uppercase}} {{Attendy.last_name[0] | uppercase}} </span>\n                  </div>\n                  \n                </span>\n                <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2"\n                  [class.no-response]="Attendy.state==3" [class.maybe]="Attendy.state==4" *ngIf="Attendy.PHOTOPATH">\n                  <img src={{PhotoApiUrl}}{{Attendy.PHOTOPATH}} alt="" class="img-circle">\n                </span>\n              </div>\n\n              <div class="card-title col-xs-8 p-0" [class.InjuredPlayerName]="Attendy.injuryStatus==1">\n                  {{Attendy.first_name | uppercase}} {{Attendy.last_name | uppercase}}\n                  <div class="select-group clearfix">\n                    <div class="pull-left checkArrow-group"\n                      [class.OuterDiv]="PersonData.PERSON_ID==Attendy.person_id && FunctionAccess && FunctionAccess.event_EventDetail==\'self\'"\n                      *ngIf="FunctionAccess">\n                      <div *ngIf="FunctionAccess && FunctionAccess.event_EventDetail==\'yes\'">\n                        <div class=" arrowUp ArrowLight" (click)="ArrowFunctionality($event)">\n                          <ion-icon name="ios-arrow-down" class=" collapsed-arrow"></ion-icon>\n                        </div>\n\n                      </div>\n                      <div class="  " *ngIf="PersonData.PERSON_ID==Attendy.person_id && FunctionAccess && FunctionAccess.event_EventDetail==\'self\'">\n                        <div class=" p-0 arrowUp loggedIn-Arrow ArrowLight" (click)="ArrowFunctionality($event)">\n                          <ion-icon name="ios-arrow-down" class=" collapsed-arrow"></ion-icon>\n                        </div>\n                      </div>\n                      \n                    </div>\n                    <div class="display-status pull-left">\n                      <p class="Show_Status" [class.InjuredPlayerStatus]="Attendy.injuryStatus==1"\n                        *ngIf="Attendy.reasondeclined_by_coach==\'\'">{{Attendy.reasondeclined}}</p>\n                      <p class="Show_Status" [class.InjuredPlayerStatus]="Attendy.injuryStatus==1"\n                        *ngIf="Attendy.reasondeclined_by_coach!=\'\'">{{Attendy.reasondeclined_by_coach}}</p>\n                    </div>\n                  </div>\n                  \n                  <div class="suit-iconCard fixedRight" (click)="DisplaySeverityDetails(Attendy)" *ngIf="FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1 && ((Attendy.playerAilmentsSeverityIcon) || (Attendy.showMedicine==1))">\n                    <img src={{global.ImagesPath}}{{Attendy.playerAilmentsSeverityIcon}} class="suit-icon" *ngIf="(Attendy.playerAilmentsSeverityIcon  && (Attendy.showMedicine==1 || Attendy.showMedicine==0))">\n                    <img src="{{global.ImagesPath}}pills.svg" class="medical-bottle" *ngIf="((Attendy.showMedicine==1) && (!Attendy.playerAilmentsSeverityIcon))">\n                  </div>\n              </div>\n            \n              <div class="col-xs-2 checkArrow-group"\n                [class.OuterDiv]="PersonData.PERSON_ID==Attendy.person_id && FunctionAccess.event_EventDetail_checkbox==\'self\'"\n                *ngIf="FunctionAccess">\n                <div class="col-xs-2 p-0 checkbox-col" *ngIf="FunctionAccess.event_EventDetail_checkbox==\'yes\'">\n\n                  <div class="checkbox1" [class.PresentCheckbox1]="Attendy.attended==1"\n                    [class.AbsentCheckbox1]="Attendy.attended==0"\n                    (click)="AttendanceMark($event,Attendy.attended,Attendy.person_id)">\n                  </div>\n                  <div class="checkbox"></div>\n                </div>\n              </div>\n              \n\n              <ul class="dropdown-menu card-dropdown" style="display:none; ">\n                <li *ngFor="let key of reason_options_list[0]"\n                  (click)="SinglePlayersAttdStates(key.confirm_reason,\'\',key.reason_display,Attendy.person_id,$event)">\n                  <a href="javascript:void(0)"\n                    [class.SelectedReason]="key.reason_display==Attendy.reasondeclined_by_coach || key.reason_display==Attendy.reasondeclined">{{key.reason_display}}</a>\n                </li>\n\n              </ul>\n            </div>\n\n          </div>\n        </div>\n        <!-- Regular player combined End -->\n\n        <!--  borrowed player -->\n        <div class="borrowHeading" *ngIf="BorrowTagFlag==1">\n          <p>BORROWED TEAM MATES</p>\n        </div>\n        <div class="well select-card " *ngIf="BorrowTagFlag==1 && EmptyBorrowPlayer">\n          <div class="row">\n            <div class="col-xs-12 ">\n              <h5 class="sub-title">NO TEAM MATES Present</h5>\n            </div>\n          </div>\n        </div>\n        <div class="borrowOuter" *ngIf="BorrowTagFlag==1 && !(combinedBorrowedPlayersArray?.length > 0)">\n          \n          <div *ngFor="let StateAttendy of DupEventAttendSecBorrowed;let i=index">\n              \n            <div *ngIf="i<3">\n            <div class="select-card" [class.well]="Attendy.injuryStatus!=1 && Attendy.injuryStatus!=2"\n              [class.RecoveredPlayer]="Attendy.injuryStatus==2" [class.InjuredPlayer]="Attendy.injuryStatus==1" *ngFor="let Attendy of StateAttendy">\n\n              <div class="row">\n                <div class="card-img col-xs-2 p-0">\n                  <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2" [class.no-response]="Attendy.state==3"\n                    [class.maybe]="Attendy.state==4" *ngIf="!Attendy.photoPath">\n                    <div class="img-circle"><span class="img-text">{{Attendy.first_name[0] | uppercase}} {{Attendy.last_name[0] | uppercase}} </span></div>\n                    \n                  </span>\n                  <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2" [class.no-response]="Attendy.state==3"\n                    [class.maybe]="Attendy.state==4" *ngIf="Attendy.photoPath">\n                    <img src={{PhotoApiUrl}}{{Attendy.photoPath}} alt="" class="img-circle">\n                  </span>\n\n                </div>\n                <div class="card-title col-xs-8 p-0" [class.InjuredPlayerName]="">{{Attendy.first_name | uppercase}}\n                  {{Attendy.last_name | uppercase}}\n                  <div class="select-group clearfix">\n                      <div class="checkArrow-group pull-left" [class.OuterDiv]="PersonData.PERSON_ID==Attendy.person_id && FunctionAccess.event_EventDetail==\'self\'"\n                        *ngIf="FunctionAccess">\n                          \n                          <div *ngIf="FunctionAccess.event_EventDetail==\'yes\'">\n                            <div class=" arrowUp ArrowLight" (click)="ArrowFunctionality($event)">\n                              <ion-icon name="ios-arrow-down" class=" collapsed-arrow"></ion-icon>\n                            </div>\n                          </div>\n                          <div class=" " *ngIf="PersonData.PERSON_ID==Attendy.person_id && FunctionAccess.event_EventDetail==\'self\'">\n                            <div class="p-0 arrowUp loggedIn-Arrow ArrowLight" (click)="ArrowFunctionality($event)">\n                              <ion-icon name="ios-arrow-down" class=" collapsed-arrow"></ion-icon>\n                            </div>\n                          </div>\n                          \n                      </div>\n                      <div class="display-status pull-left">\n                      <p class="Show_Status" [class.InjuredPlayerStatus]="" *ngIf="Attendy.reasondeclined_by_coach==\'\'">{{Attendy.reasondeclined}}</p>\n                      <p class="Show_Status" [class.InjuredPlayerStatus]="" *ngIf="Attendy.reasondeclined_by_coach!=\'\'">{{Attendy.reasondeclined_by_coach}}</p>\n                      </div>\n                    </div>\n                    <div class="suit-iconCard fixedRight" (click)="DisplaySeverityDetails(Attendy)" *ngIf="FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1 && ((Attendy.playerAilmentsSeverityIcon) || (Attendy.showMedicine==1))">\n                        <img src={{global.ImagesPath}}{{Attendy.playerAilmentsSeverityIcon}} class="suit-icon" *ngIf="(Attendy.playerAilmentsSeverityIcon  && (Attendy.showMedicine==1 || Attendy.showMedicine==0))">\n                        <img src="{{global.ImagesPath}}pills.svg" class="medical-bottle" *ngIf="((Attendy.showMedicine==1) && (!Attendy.playerAilmentsSeverityIcon))">\n                      </div>\n                  </div>\n               \n                <div class="col-xs-2 pr-0 checkArrow-group" [class.OuterDiv]="PersonData.PERSON_ID==Attendy.person_id && FunctionAccess.event_EventDetail_checkbox==\'self\'"\n                  *ngIf="FunctionAccess">\n\n                  <div class="col-xs-2 p-0 checkbox-col" *ngIf="FunctionAccess.event_EventDetail_checkbox==\'yes\'">\n\n                    <div class="checkbox1" [class.PresentCheckbox1]="Attendy.attended==1" [class.AbsentCheckbox1]="Attendy.attended==0"\n                      (click)="AttendanceMark($event,Attendy.attended,Attendy.person_id)">\n                    </div>\n                    <div class="checkbox"></div>\n                  </div>\n                </div>\n\n                <ul class="dropdown-menu card-dropdown" style="display: none;">\n                  <li *ngFor="let key of reason_options_list[0]" (click)="SinglePlayersAttdStates(key.confirm_reason,\'\',key.reason_display,Attendy.person_id,$event)">\n                    <a href="javascript:void(0)" [class.SelectedReason]="key.reason_display==Attendy.reasondeclined_by_coach || key.reason_display==Attendy.reasondeclined">{{key.reason_display}}</a>\n                  </li>\n                </ul>\n\n              </div>\n\n              </div>\n            </div>\n          </div>\n        </div>\n\n\n\n        <!-- Borrowed player combined Start -->\n        <div class="combinedBorrowedPlayersArray" *ngIf="BorrowTagFlag==1 && combinedBorrowedPlayersArray?.length > 0">\n          <div class="select-card" [class.well]="Attendy.injuryStatus!=1 && Attendy.injuryStatus!=2"\n            [class.RecoveredPlayer]="Attendy.injuryStatus==2" [class.InjuredPlayer]="Attendy.injuryStatus==1"\n            *ngFor="let Attendy of combinedBorrowedPlayersArray">\n\n            <div class="row">\n              <div class="card-img col-xs-2 p-0">\n                <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2"\n                  [class.no-response]="Attendy.state==3" [class.maybe]="Attendy.state==4" *ngIf="!Attendy.PHOTOPATH">\n                  <div class="img-circle"><span class="img-text">{{Attendy.first_name[0] | uppercase}} {{Attendy.last_name[0] | uppercase}} </span>\n                  </div>\n                </span>\n                <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2"\n                  [class.no-response]="Attendy.state==3" [class.maybe]="Attendy.state==4" *ngIf="Attendy.PHOTOPATH">\n                  <img src={{PhotoApiUrl}}{{Attendy.PHOTOPATH}} alt="" class="img-circle">\n                </span>\n\n              </div>\n              <div class="card-title col-xs-8 p-0" [class.InjuredPlayerName]="">{{Attendy.first_name | uppercase}}\n                {{Attendy.last_name | uppercase}}\n                <div class="select-group clearfix">\n                  <div class="checkArrow-group pull-left"\n                    [class.OuterDiv]="PersonData.PERSON_ID==Attendy.person_id && FunctionAccess.event_EventDetail==\'self\'"\n                    *ngIf="FunctionAccess">\n                    \n                    <div *ngIf="FunctionAccess.event_EventDetail==\'yes\'">\n                      <div class=" arrowUp ArrowLight" (click)="ArrowFunctionality($event)">\n                        <ion-icon name="ios-arrow-down" class=" collapsed-arrow"></ion-icon>\n                      </div>\n                    </div>\n                    <div class=" " *ngIf="PersonData.PERSON_ID==Attendy.person_id && FunctionAccess.event_EventDetail==\'self\'">\n                      <div class="p-0 arrowUp loggedIn-Arrow ArrowLight" (click)="ArrowFunctionality($event)">\n                        <ion-icon name="ios-arrow-down" class=" collapsed-arrow"></ion-icon>\n                      </div>\n                    </div>\n                    \n                  </div>\n                  <div class="display-status pull-left">\n                    <p class="Show_Status" [class.InjuredPlayerStatus]="" *ngIf="Attendy.reasondeclined_by_coach==\'\'">\n                      {{Attendy.reasondeclined}}</p>\n                    <p class="Show_Status" [class.InjuredPlayerStatus]="" *ngIf="Attendy.reasondeclined_by_coach!=\'\'">\n                      {{Attendy.reasondeclined_by_coach}}</p>\n                  </div>\n                </div>\n                <div class="suit-iconCard fixedRight" (click)="DisplaySeverityDetails(Attendy)" *ngIf="FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1 && ((Attendy.playerAilmentsSeverityIcon) || (Attendy.showMedicine==1))">\n                    <img src={{global.ImagesPath}}{{Attendy.playerAilmentsSeverityIcon}} class="suit-icon" *ngIf="(Attendy.playerAilmentsSeverityIcon  && (Attendy.showMedicine==1 || Attendy.showMedicine==0))">\n                    <img src="{{global.ImagesPath}}pills.svg" class="medical-bottle" *ngIf="((Attendy.showMedicine==1) && (!Attendy.playerAilmentsSeverityIcon))">\n                  </div>\n              </div>\n              \n              <div class="col-xs-2 p-0 checkArrow-group"\n                [class.OuterDiv]="PersonData.PERSON_ID==Attendy.person_id && FunctionAccess.event_EventDetail_checkbox==\'self\'"\n                *ngIf="FunctionAccess">\n\n                <div class="col-xs-2 p-0 checkbox-col" *ngIf="FunctionAccess.event_EventDetail_checkbox==\'yes\'">\n\n                  <div class="checkbox1" [class.PresentCheckbox1]="Attendy.attended==1"\n                    [class.AbsentCheckbox1]="Attendy.attended==0"\n                    (click)="AttendanceMark($event,Attendy.attended,Attendy.person_id)">\n                  </div>\n                  <div class="checkbox"></div>\n                </div>\n              </div>\n\n\n              <ul class="dropdown-menu card-dropdown" style="display: none;">\n                <li *ngFor="let key of reason_options_list[0]"\n                  (click)="SinglePlayersAttdStates(key.confirm_reason,\'\',key.reason_display,Attendy.person_id,$event)">\n                  <a href="javascript:void(0)"\n                    [class.SelectedReason]="key.reason_display==Attendy.reasondeclined_by_coach || key.reason_display==Attendy.reasondeclined">{{key.reason_display}}</a>\n                </li>\n              </ul>\n\n            </div>\n\n          </div>\n        </div>\n        <!-- Borrowed player combined End -->\n      </div>\n    </form>\n  </section>\n</ion-content>\n\n<!-- Welfare -->\n<ion-content *ngIf="segments==\'Welfare\'" class="welfare-content">\n    <section class="main">\n    <form action="" class="user-form player-item">\n        <section class=" heightAuto xs-padding bg-gray show-card">\n            <div class="event-card welfare" *ngIf="WelfarePeopleDetail==\'\'">\n                <div class="well select-card " >\n                    <div class="row">\n                        <div class="col-xs-12 ">\n                            <h5 class="sub-title">NO TEAM MATES FOUND</h5>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="event-card welfare" *ngFor="let details of WelfarePeopleDetail">\n                <div class="well select-card" (click)="PlayerQuestion(details,$event)" style="margin-bottom: 0 !important">\n\n                    <div class="row">\n                        <div class="card-img col-xs-2 p-0">\n                            <span class="" *ngIf="!details.photopath">\n                                <div class="img-circle"><span class="img-text">{{details.first_name[0] | uppercase}} {{details.last_name[0] | uppercase}} </span></div>\n                                <!-- <img src="assets/images/test-user.svg" alt="" class="img-circle"> -->\n                            </span>\n                            <span class="" *ngIf="details.photopath">\n                                        <img src="{{PhotoApiUrl}}{{details.photopath}}" alt="" class="img-circle">\n                            </span>\n                        </div>\n\n                        <div class="card-title col-xs-8 p-0">{{details.first_name | uppercase}} {{details.last_name | uppercase}}\n                           \n                            <div>\n                                <span *ngIf="details.uniform_id">#{{details.uniform_id}}</span>\n                            </div>\n                            <div class="suit-iconCard fixedRight" (click)="DisplaySeverityDetails(details)" *ngIf="FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1 && ((details.playerAilmentsSeverityIcon) || (details.showMedicine==1))">\n                                <img src={{global.ImagesPath}}{{details.playerAilmentsSeverityIcon}} class="suit-icon" *ngIf="(details.playerAilmentsSeverityIcon  && (details.showMedicine==1 || details.showMedicine==0))">\n                                <img src="{{global.ImagesPath}}pills.svg" class="medical-bottle" *ngIf="((details.showMedicine==1) && (!details.playerAilmentsSeverityIcon))">\n                            </div>\n                            \n                        </div>\n                        <div class="event-next col-xs-1 p-0 show-tickmark">\n                            <ion-icon class="tickIcon" ios="ios-checkmark" md="md-checkmark" color=primary *ngIf="details.welfare_answer==1"></ion-icon>\n                        </div>\n                        \n                        <div class="event-next col-xs-1 p-0">\n                            <a href="javascript:void(0)" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n                        </div>\n                    </div>\n                </div>\n\n              </div>\n        </section>\n      </form>\n      </section>\n\n</ion-content>\n\n<!-- Result  -->\n<ion-content *ngIf="segments==\'Result\'" class="bg-gray event result-content" (click)="keyboardCheck()">\n    <section class="main">\n        <form action="" class="user-form profile event-results">\n            <section class="profileFirst bg-black heightAuto xs-padding" *ngIf="FunctionAccess &&  FunctionAccess.event_Result==\'yes\'">\n                <div class="form-group" *ngFor="let detail of arrDetail">\n                    <div class="date_time text-blue text-center">\n                        <span class="dateOption">{{key.week}} {{date}}</span>\n                        <span class="glyphicon glyphicon-time" *ngIf="arrDetail"></span> <span\n                            class="timeOption">{{key.time_started}}</span>\n                    </div>\n                    <div class="homeAway-title text-center text-blue">{{homeAwayText}}</div>\n                    <h4 class="info-item text-center inverseText" *ngFor="let detail of arrDetail">{{detail.name}}</h4>\n                    <p class="text-center inverseText">{{detail.ground_name}}\n                        <br>{{detail.ground_address}},\n                        {{detail.ground_state}}\n                    </p>\n					<div class="bookmark-line mt-30"></div>\n					<h5 class="section-title mt-30">FINAL SCORE</h5>\n					<div class="voting score clearfix">\n						<div class="pull-left">\n							<div class="select-val" >\n								<ion-item>\n									<ion-input type="number" pattern="[0-9]*" elastic [(ngModel)]="scoreHome" name="scoreHome" (keyup)="prefixNumber($event)" (ionFocus)="inputFocus()" (ionBlur)="inputBlur()"\n										[readonly]="(FunctionAccess && FunctionAccess.game_score==\'no\') || scoreIsUpdated==1" ></ion-input>\n								</ion-item>\n							</div>\n							<h5 class="inverseText fontBold m-0">{{detail.hometeamname}}</h5>\n						</div>\n						<div class="pull-right">\n							<div class="select-val">\n								<ion-item>\n									<ion-input type="number" pattern="[0-9]*" elastic [(ngModel)]="scoreAway" name="scoreAway" (keyup)="prefixNumber($event)" (ionFocus)="inputFocus()" (ionBlur)="inputBlur()"\n										[readonly]="(FunctionAccess && FunctionAccess.game_score==\'no\') || scoreIsUpdated==1"></ion-input>\n								</ion-item>\n							</div>\n							<h5 class="inverseText fontBold m-0">{{detail.awayteamname}}</h5>\n						</div>\n					</div>\n					<div class="bookmark-line mt-30"></div>\n                </div>\n                <div class="row">\n                    <div class="radio-option">\n                        <div class="col-xs-12 p-0 flatten">\n                            <div class="radio col-xs-6">\n                                <input type="radio" value="washout" name="gameDismissed" [(ngModel)]="gameDismissed" class="radio-game-dismissed"\n                                    (click)="gameDismissedChange($event);" [disabled]="FunctionAccess && FunctionAccess.game_score==\'no\'" />\n                                <label class="sub-title inverseText fontBold Washout">WASHOUT</label>\n                            </div>\n\n\n                            <div class="radio col-xs-6">\n                                <input type="radio" value="forfeit" name="gameDismissed" [(ngModel)]="gameDismissed" class="radio-game-dismissed"\n                                    (click)="gameDismissedChange($event);" [disabled]="FunctionAccess && FunctionAccess.game_score==\'no\'" />\n                                <label class="sub-title inverseText fontBold Forfeit">FORFEIT</label>\n                            </div>\n                        </div>\n                        <!--<div class="team-report-wrap col-xs-2 p-0 text-center" (click)="reportTextRowOpened=true" *ngIf="FunctionAccess && FunctionAccess.game_report==\'yes\'">\n                            <img src="assets/images/team-report.svg" alt="">\n                            <div class="xs-title">TEAM<br> REPORT</div>\n                        </div>-->\n                    </div>\n                </div>\n                <div class="row" *ngIf="FunctionAccess && FunctionAccess.game_report==\'yes\'" (click)="keyboardCheck()">\n                  <div class="well report bg-white mt-30 col-xs-12">\n                      <h5 class="section-title">REPORT</h5>\n                      <ion-item>\n                        <ion-textarea class="form-control iontextarea" name="reportText" cols="30" rows="5" [(ngModel)]="reportText"\n                          (ionFocus)="inputFocus()" (ionBlur)="inputBlur()"></ion-textarea>\n                      </ion-item>\n                  </div>\n                  <button type="submit" class="btn btn-sm-black radius-10" (click)="saveGameScoreAndReport()">SAVE</button>\n                </div>\n            </section>\n            <div class="event-card bg-gray" *ngIf="FunctionAccess && FunctionAccess.voting_for_player!=\'no\'">\n                <h5 class="section-title">3-2-1 VOTING</h5>\n                <div *ngIf="FunctionAccess && FunctionAccess.voting_for_player==\'yes\'">\n                  <div class="well select-card" *ngFor="let coach of coachDetails" [class.active]="(activePlayer==coach.PERSON_ID)" (click)="voteForPlayer(coach.PERSON_ID, coach)">\n                      <div class="row">\n                        <div class="card-img col-xs-2 p-0">\n                            <span class="">\n                                <div class="img-circle" *ngIf="coach.PHOTOPATH == \'\'"><span class="img-text">{{coach.FIRST_NAME[0]}} {{coach.LAST_NAME[0]}} </span></div>\n                                <img src="{{global.PROFILEIMAGEURL}}/{{coach.PHOTOPATH}}" alt="" class="img-circle"\n                                    onerror="this.src=\'assets/images/test-user.svg\'" *ngIf="coach.PHOTOPATH != \'\'">\n                                <!-- <img src="assets/images/test-user.svg" alt="" class="img-circle" *ngIf="coach.PHOTOPATH == \'\'"> -->\n                            </span>\n                        </div>\n                        <div class="card-title col-xs-8 p-0">My Vote</div>\n                        <div class="event-next col-xs-1 p-0 show-tickmark" *ngIf="FunctionAccess && FunctionAccess.voting_for_player==\'yes\'">\n                          <ion-icon class="next-arrow v-center" ios="ios-checkmark" md="md-checkmark" color=primary *ngIf="(voteSuccess==true && voteForPlayerId==coach.PERSON_ID) || (coach.voted==1)"></ion-icon>\n                        </div>\n                          <div class="event-next col-xs-1 p-0" *ngIf="FunctionAccess && FunctionAccess.voting_for_player==\'yes\'">\n                            <a href="javascript:void(0);" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n                          </div>\n                      </div>\n                  </div>\n                  <h5 class="section-title">TEAM MATES</h5>\n                </div>\n                <div class="well select-card" *ngFor="let player of players" [class.active]="(activePlayer==player.person_id)" (click)="voteForPlayer(player.person_id, player)">\n                    <div class="row">\n                        <div class="card-img col-xs-2 p-0">\n                            <span class="">\n                                    <div class="img-circle" *ngIf="player.photoPath == \'\'"><span class="img-text">{{player.first_name[0] | uppercase}} {{player.last_name[0] | uppercase}} </span></div>\n                                <img src="{{global.PROFILEIMAGEURL}}/{{player.photoPath}}" alt="" class="img-circle"\n                                    onerror="this.src=\'assets/images/test-user.svg\'" *ngIf="player.photoPath != \'\'">\n                                <!-- <img src="assets/images/test-user.svg" alt="" class="img-circle" *ngIf="player.photoPath == \'\'"> -->\n                            </span>\n                        </div>\n                        <div class="card-title  p-0"\n                        [class.col-xs-5]="FunctionAccess && FunctionAccess.voting_for_player==\'self\'"\n                        [class.col-xs-8]="FunctionAccess && FunctionAccess.voting_for_player==\'yes\'"\n                        >{{player.first_name}} {{player.last_name}}\n                          \n                        <div>\n                            <span *ngIf="player.uniform_id">#{{player.uniform_id}}</span>\n                        </div>\n                        <!-- <div class="suit-iconCard fixedRight" (click)="DisplaySeverityDetails(player)" *ngIf="FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1 && ((player.playerAilmentsSeverityIcon) || (player.showMedicine==1))">\n                            <img src={{global.ImagesPath}}{{player.playerAilmentsSeverityIcon}} class="suit-icon" *ngIf="(player.playerAilmentsSeverityIcon  && (player.showMedicine==1 || player.showMedicine==0))">\n                            <img src="{{global.ImagesPath}}pills.svg" class="medical-bottle" *ngIf="((player.showMedicine==1) && (!player.playerAilmentsSeverityIcon))">\n                        </div> -->\n\n                          \n                        </div>\n                       \n                      <div class="event-next  col-xs-1 p-0 show-tickmark" *ngIf="FunctionAccess && FunctionAccess.voting_for_player==\'yes\'">\n                        <ion-icon class="next-arrow v-center" ios="ios-checkmark" md="md-checkmark" color=primary *ngIf="(voteSuccess==true && voteForPlayerId==player.person_id) || (player.voted==1)"></ion-icon>\n                      </div>\n                        <div class="event-next col-xs-1 p-0" *ngIf="FunctionAccess && FunctionAccess.voting_for_player==\'yes\'">\n                          <a href="javascript:void(0);" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n                        </div>\n                        <div class="voting col-xs-5 p-0" *ngIf="FunctionAccess && FunctionAccess.voting_for_player==\'self\'">\n                            <a href="javascript:void(0)" class="select-val vote3" [class.active]="player.person_id == player.vote3" (click)="saveVote($event, player.person_id, 3)">3</a>\n                            <a href="javascript:void(0)" class="select-val vote2" [class.active]="player.person_id == player.vote2" (click)="saveVote($event, player.person_id, 2)">2</a>\n                            <a href="javascript:void(0)" class="select-val vote1" [class.active]="player.person_id == player.vote1" (click)="saveVote($event, player.person_id, 1)">1</a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </section>\n</ion-content>\n\n<!-- <ion-footer *ngIf="show_tab == \'yes\'">\n  <nav class="navbar navbar-default navbar-fixed-bottom">\n      <div class="container-fluid">\n          <ul class="nav navbar-nav">\n              <li class="home" (click)="gotoHome()"><a href="javascript:void(0);">Home</a></li>\n              <li class="events active"><a href="javascript:void(0);">Events</a></li>\n              <li class="players" (click)="goToPlayersDashboard()"><a href="javascript:void(0);">Players</a></li>\n              <li class="comment" (click)="goToChatDashboard()"><a href="javascript:void(0);">Comments</a></li>\n              <li class="more" (click)="goToMenuPage()"><a href="javascript:void(0);">More</a></li>\n          </ul>\n      </div>\n  </nav>\n</ion-footer> -->\n\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-dashboard/event-dashboard.html"*/,
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[longPress]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_launch_navigator_ngx__["a" /* LaunchNavigator */],
            __WEBPACK_IMPORTED_MODULE_6__providers_event_logger_event_logger__["a" /* EventLoggerProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_7__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_calendar_ngx__["a" /* Calendar */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_10__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], EventDashboardPage);
    return EventDashboardPage;
}());

//# sourceMappingURL=event-dashboard.js.map

/***/ })

});
//# sourceMappingURL=75.js.map