webpackJsonp([8],{

/***/ 852:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransportDashboardPageModule", function() { return TransportDashboardPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transport_dashboard__ = __webpack_require__(952);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_circle_progress__ = __webpack_require__(336);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var TransportDashboardPageModule = /** @class */ (function () {
    function TransportDashboardPageModule() {
    }
    TransportDashboardPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__transport_dashboard__["a" /* TransportDashboardPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__transport_dashboard__["a" /* TransportDashboardPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ng_circle_progress__["a" /* NgCircleProgressModule */].forRoot()
            ],
        })
    ], TransportDashboardPageModule);
    return TransportDashboardPageModule;
}());

//# sourceMappingURL=transport-dashboard.module.js.map

/***/ }),

/***/ 952:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransportDashboardPage; });
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












var TransportDashboardPage = /** @class */ (function () {
    function TransportDashboardPage(navCtrl, navParams, http, loadingCtrl, storage, events, global, modalCtrl, app, launchNavigator, logger, plt, gFn, calendar, Alert, global_api) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.events = events;
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
        this.NotGoingColor = '#B04AAC';
        this.NoResponseColor = '#F59044';
        this.AttdnColor = '#fff';
        this.reason_options_list = [];
        this.Attendance = false;
        this.filterState = 0;
        this.filterButton = '';
        this.BorrowTagFlag = 0;
        this.BackButton = false;
        this.groundAdress = '';
        this.groundState = '';
        this.latitude = '';
        this.longitude = '';
        this.isParent = false;
        this.showEvent = false;
        this.gFn.showMenuIcon();
        this.PhotoApiUrl = this.global.PROFILEIMAGEURL;
        $('.tabs .tab-button[aria-selected=true]:nth-child(4) .tab-button-icon').toggle();
        // $('.tabs .tab-button[aria-selected=true]:nth-child(4) .tab-button-icon').css({'mask-image': '',
        // 'height': '',
        // 'color': '#dedede'})
    }
    TransportDashboardPage.prototype.goToChooseTeamsPage = function () {
        this.navCtrl.push('ChooseTeamProfilePage');
    };
    TransportDashboardPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // $('.tabs .tab-button[aria-selected=true]:nth-child(1)').attr('aria-selected','false')
        $('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected', 'true');
        $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({ 'mask-image': 'url(../assets/images/menu/home.svg)',
            'height': '22px',
            'color': '#dedede' });
        // $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': 'url(../assets/images/menu/events-blue.svg)',
        // 'height': '36px',
        // 'color': '#43B7CC'})
        this.storage.get('FunctionAccess').then(function (val) {
            _this.FunctionAccess = val;
            console.log(_this.FunctionAccess);
        });
        this.storage.get('BackButton').then(function (val) {
            _this.BackButton = val;
        });
        if (this.navParams.get('EventDetails_eventId')) {
            this.UpcomingSingleEvent = this.navParams.get('EventDetails_eventId');
            this.storage.set('UpcomingSingleEvent', JSON.stringify(this.UpcomingSingleEvent));
            // console.log(this.UpcomingSingleEvent)
        }
        else {
            this.storage.get('UpcomingSingleEvent').then(function (val) {
                _this.UpcomingSingleEvent = JSON.parse(val);
                // console.log(val)
            });
        }
        var loader = this.loadingCtrl.create({});
        loader.present();
        this.getPersonDetail().then(function (z) {
            if (z) {
                _this.getAttendingDetails();
                _this.getEventDetails().then(function (x) {
                    if (x) {
                        _this.AllPlayersLoad().then(function (y) {
                            if (y) {
                                loader.dismiss();
                            }
                        });
                    }
                });
            }
        });
    };
    TransportDashboardPage.prototype.ionViewDidLeave = function () {
        console.log('jj');
        if (!this.showEvent) {
            console.log(';ll');
            // this.navCtrl.pop()
            $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({ 'mask-image': '',
                'height': '',
                'color': '' });
            // $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': '',
            // 'height': '',
            // 'color': ''})
            $('.tab-button-icon').closest('.tabs .tab-button[aria-selected=true]:nth-child(1) .activated').css({ 'mask-image': '',
                'height': '',
                'color': '' });
            $('.tabs .tab-button[aria-selected=true]:nth-child(2)').attr('aria-selected', 'false');
        }
    };
    TransportDashboardPage.prototype.getAttendingDetails = function () {
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
    TransportDashboardPage.prototype.gotoResults = function () {
        this.gFn.gotoResults();
        this.showEvent = true;
    };
    TransportDashboardPage.prototype.gotoWelfare = function () {
        this.gFn.gotoWelfare();
        this.showEvent = true;
    };
    TransportDashboardPage.prototype.getEventDetails = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('event_id', _this.UpcomingSingleEvent.event_id)
                .set('event_type_id', _this.UpcomingSingleEvent.event_type_id)
                .set('clientTimeZone', _this.PersonData.CLIENTTIMEZONE)
                .set('selectedTeam', _this.PersonData.SELECTEDTEAM)
                .set('client_id', _this.PersonData.CLIENT_ID);
            _this.http.post(_this.global.APIURL + "events/getEventDetails", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                _this.arrDetail = data.GETEVENTDETAILS;
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
                resolve(true);
            }, function (error) {
            });
        });
    };
    TransportDashboardPage.prototype.getPersonDetail = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.get('loggedInUserData').then(function (val) {
                _this.PersonData = val;
                if (val.ISPARENT && val.PERSON_ID != val.PARENT_ID) {
                    _this.isParent = true;
                }
                // console.log('loggedInUserData', this.PersonData)
                var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                    .set('person_id', _this.PersonData.PERSON_ID);
                _this.http.post(_this.global.APIURL + "users/getUserInfo", loginData)
                    .subscribe(function (data) {
                    var loggedInUserData = _this.events.publish('json:query', data.GETUSERINFO);
                    _this.client_id = loggedInUserData[0][0].CLIENT_ID_FK;
                    _this.selectedTeam = (loggedInUserData[0][0].CLUB_DIVISION_ID_FK);
                    resolve(true);
                }, function (error) {
                });
            });
        });
    };
    TransportDashboardPage.prototype.eventState = function (eventVal, event) {
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
                _this.NotGoingColor = '#B04AAC';
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
        });
    };
    TransportDashboardPage.prototype.SinglePlayersAttdStates = function (confirm, attended, reason, AttendyPersonId, event) {
        var _this = this;
        var reasondeclined = '';
        var reasondeclined_by_coach = '';
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
        var target = event.target;
        var loginData4 = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('event_id', this.UpcomingSingleEvent.event_id)
            .set('personId', AttendyPersonId)
            .set('attended', attended)
            .set('confirmed', confirm)
            .set('reasondeclined', reasondeclined)
            .set('reasondeclined_by_coach', reasondeclined_by_coach)
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
    TransportDashboardPage.prototype.ArrowFunctionality = function (event) {
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
    TransportDashboardPage.prototype.hideAttendanceList = function (event) {
        var target = event.target;
        if (!$(target).hasClass('collapsed-arrow') && $('ul.dropdown-menu.card-dropdown:visible').length) {
            $('.collapsed-arrow').removeClass('ArrowDark').addClass('ArrowLight');
            $('ul.dropdown-menu.card-dropdown').hide();
            this.Arrowflag = false;
        }
    };
    TransportDashboardPage.prototype.goToTimesheet = function () {
        this.navCtrl.push('TimesheetPage');
        this.showEvent = true;
    };
    TransportDashboardPage.prototype.borrow_player = function () {
        this.navCtrl.push('BorrowedPlayerPage', { UpcomingSingleEvent: JSON.stringify(this.UpcomingSingleEvent) });
        this.showEvent = true;
    };
    TransportDashboardPage.prototype.notify_player = function () {
        this.navCtrl.push('NotifyPlayersPage', { notifyFlag: this.notifyFlag,
            UpcomingSingleEvent: JSON.stringify(this.UpcomingSingleEvent) });
        this.showEvent = true;
    };
    TransportDashboardPage.prototype.PlayerQuestion = function (event) {
        var _this = this;
        this.showEvent = true;
        var Data = Object.keys(this.PersonData).reduce(function (c, k) { return (c[k.toLowerCase()] = _this.PersonData[k], c); }, {});
        this.navCtrl.push('PlayerQuestionPage', { Player_detail: Data });
    };
    TransportDashboardPage.prototype.gotoGroupMessage = function () {
        this.showEvent = true;
        /*let GroupMessageModal = this.modalCtrl.create('EventGroupMessagePage', { Array: this.DupeventAttendLen });
        GroupMessageModal.onDidDismiss(data => {
        });
        GroupMessageModal.present();*/
        this.navCtrl.push('EventGroupSendMessagePage', { notifyFlag: this.notifyFlag });
    };
    TransportDashboardPage.prototype.gotoSessionPlan = function () {
        this.navCtrl.push('EventSessionPlanPage');
    };
    TransportDashboardPage.prototype.gotoInjuredList = function () {
        this.showEvent = true;
        if (this.FunctionAccess.event_Injury == 'self') {
            this.navCtrl.push('InjuryIncidentReportPage', { 'injured_person_id': this.PersonData.PERSON_ID });
        }
        else {
            this.navCtrl.push('InjuredListPage');
        }
    };
    TransportDashboardPage.prototype.AllPlayersLoad = function () {
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
                .set('client_id', _this.UpcomingSingleEvent.client_id) //this.PersonData.CLIENT_ID
                .set('selectedTeam', selectedTeam) //this.PersonData.SELECTEDTEAM
                .set('personId', _this.PersonData.PERSON_ID);
            _this.http.post(_this.global.APIURL + "players/AllLoadPlayersAttendance", PlayersData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                _this.eventAttend = data.DATA;
                _this.BorrowedPlayerPresent = data.DATA_BORROWED;
                _this.ArrangePlayers();
                resolve(true);
            }, function (error) {
            });
        });
    };
    TransportDashboardPage.prototype.ArrangePlayers = function () {
        this.DupeventAttendLen = [];
        this.DupEventAttendSecBorrowed = [];
        this.percentArray = [];
        this.combinedPlayersArray = [];
        this.combinedBorrowedPlayersArray = [];
        var key, key1;
        for (key in this.eventAttend) {
            this.DupeventAttendsec[key] = [];
            for (key1 in this.eventAttend[key]) {
                if (this.eventAttend[key][key1].person_id == this.PersonData.PERSON_ID) {
                    this.DupeventAttendsec[0].unshift(this.eventAttend[key][key1]);
                }
                else {
                    this.DupeventAttendsec[key].push(this.eventAttend[key][key1]);
                }
                if (key < 3) {
                    this.combinedPlayersArray.push(this.eventAttend[key][key1]);
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
        //console.log(this.BorrowedPlayerPresent)
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
        var totalPlayerCount = this.eventAttend[0].length + this.eventAttend[1].length + this.eventAttend[2].length;
        totalPlayerCount += this.BorrowedPlayerPresent[0].length + this.BorrowedPlayerPresent[1].length + this.BorrowedPlayerPresent[2].length;
        this.DupeventAttendLen.push(totalPlayerCount);
        for (key in this.eventAttend) {
            this.percentArray.push((this.DupeventAttendLen[key] / totalPlayerCount) * 100);
            this.DupeventAttendLen[key] = this.zero_pad(this.DupeventAttendLen[key]);
        }
    };
    TransportDashboardPage.prototype.resetColors = function (event) {
        this.notifyFlag = '';
        this.GoingColor = '#68E048';
        this.MaybeColor = '#2BBFF0';
        this.NotGoingColor = '#B04AAC';
        this.NoResponseColor = '#F59044';
        $('.radial-progressbar').find('.NoResponse,.MayBe,.NotGoing,.Going').removeClass('inactive');
        this.ArrangePlayers();
        this.hideAttendanceList(event);
    };
    TransportDashboardPage.prototype.backArrow = function () {
        this.app.getRootNav().getActiveChildNav().select(1).then(function () {
            $('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected', 'true');
        });
    };
    TransportDashboardPage.prototype.zero_pad = function (num) {
        var s = num + "";
        while (s.length < 2)
            s = "0" + s;
        return s;
    };
    TransportDashboardPage.prototype.AttendanceMark = function (event, Attendance, AttendyPersonId) {
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
    TransportDashboardPage.prototype.AttendanceReport = function (attended, AttendyPersonId) {
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
    TransportDashboardPage.prototype.addEventToCalendar = function () {
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
            _this.presentAlert('Error', 'Problem in adding event to calendar.');
        });
    };
    TransportDashboardPage.prototype.presentAlert = function (Title, SubTitle) {
        var alert = this.Alert.create({
            title: Title,
            subTitle: SubTitle,
            buttons: ['Dismiss']
        });
        alert.present(alert);
    };
    TransportDashboardPage.prototype.openMap = function (address, state, latitude, longitude) {
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
    TransportDashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'transport-dashboard',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/transport-dashboard/transport-dashboard.html"*/'<ion-header class="header-md">\n  <ion-navbar class="main">\n\n    <div class="top-bar clearfix">\n      <div class="pull-left">\n\n        <div>\n            <button class="BackButton bg-white"(click)="backArrow()"><img src="assets/images/arrow-black.svg"></button>\n            Events\n          </div>\n      </div>\n      <div class="prev-next pull-right" (click)="goToChooseTeamsPage()">\n        <a href="javascript:void(0);" class="next"></a>\n      </div>\n  </div>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content class="bg-gray event">\n  <section class="main">\n\n    <form action="" class="user-form profile bg-black" style=" padding-top: 0%!important;">\n      <section class="profileFirst heightAuto xs-padding" (click)="resetColors($event)">\n        <div *ngFor="let detail of arrDetail">\n          <div class="form-group">\n            <div class="date_time text-blue text-center">\n              <span class="dateOption">{{key.week}} {{date}} {{detail.months }}</span>\n              <span class="glyphicon glyphicon-time" *ngIf="arrDetail"></span>\n              <span class="timeOption">\n                <span>{{key.time_started}}</span>\n              </span>\n            </div>\n          </div>\n          <h4 class="info-item text-center inverseText">{{detail.name}}\n            <p class="text-center inverseText">\n              <span *ngIf="detail.ground_name">{{detail.ground_name}}</span>\n              <br>\n              <span *ngIf="detail.ground_address && detail.ground_state" (click)="openMap(detail.ground_address, detail.ground_state,detail.geoloc_latitude,detail.geoloc_longitude)">{{detail.ground_address}},\n                {{detail.ground_state}}</span>\n              <span *ngIf="!detail.ground_address || !detail.ground_state">Undefined Location</span>\n            </p>\n          </h4>\n\n          <div class="bookmark-line mt-30"> <i class="glyphicon glyphicon-bookmark" style="background: #fff;width: 30px;height: 30px;border-radius: 15px;padding-top: 10px;"></i></div>\n          <p class="text-center inverseText mt-30">{{detail.event_notes}}</p>\n          <!--event note-->\n        </div>\n        <div class="radial-progressbar mt-30">\n          <div class="row">\n            <div class="info-left col-xs-3 p-0">\n              <div class="row text-right Going" (click)="eventState(\'Going\',$event)">\n                <span class="badge maybe" style=" background-color:colorGoing !important;height: 20px;">{{DupeventAttendLen[0]}}</span>\n                <h4 class="progress-item" style="color: #fff;">Going</h4>\n              </div>\n              <div class="divider"></div>\n              <div class="row text-right MayBe" (click)="eventState(\'Maybe\',$event)">\n                <span class="badge going" style="background-color:colorMaybe !important; height: 20px;">{{DupeventAttendLen[3]}}</span>\n                <h4 class="progress-item" style="color: #fff;">Notified</h4>\n              </div>\n            </div>\n\n            <div class="radial-circle col-xs-6 p-0">\n              <circle-progress [percent]="percentArray[0]" [radius]="100" [outerStrokeWidth]="16" [innerStrokeWidth]="0"\n                [outerStrokeColor]="GoingColor" [animation]="false" [showInnerStroke]="false" [showTitle]="false"\n                [showSubtitle]="false" [showUnits]="false" class="going">\n\n              </circle-progress>\n              <circle-progress [percent]="percentArray[3]" [radius]="80" [outerStrokeWidth]="16" [innerStrokeWidth]="0"\n                [outerStrokeColor]="MaybeColor" [showInnerStroke]="false" [animation]="false" [showTitle]="false"\n                [showSubtitle]="false" [showUnits]="false" class="maybe">\n              </circle-progress>\n              <circle-progress [percent]="percentArray[1]" [radius]="60" [outerStrokeWidth]="16" [innerStrokeWidth]="0"\n                [outerStrokeColor]="NotGoingColor" [showInnerStroke]="false" [animation]="false" [showTitle]="false"\n                [showSubtitle]="false" [showUnits]="false" class="not-going">\n              </circle-progress>\n              <circle-progress [percent]="percentArray[2]" [radius]="40" [outerStrokeWidth]="16" [innerStrokeWidth]="0"\n                [outerStrokeColor]="NoResponseColor" [showInnerStroke]="false" [animation]="false" [showTitle]="false"\n                [showSubtitle]="false" [showUnits]="false" class="no-response">\n              </circle-progress>\n            </div>\n\n            <div class="info-right col-xs-3 p-0">\n              <div class="row text-left NotGoing" (click)="eventState(\'Not going\',$event)">\n                <span class="badge not-going" style="color:colorNotGoing !important;">{{DupeventAttendLen[1]}}</span>\n                <h4 class="progress-item" style="color: #fff;">Not going</h4>\n              </div>\n              <div class="divider"></div>\n              <div class="row text-left NoResponse" (click)="eventState(\'No response\',$event)">\n                <span class="badge no-response" style="background-color:colorNoResponse !important;">{{DupeventAttendLen[2]}}</span>\n                <h4 class="progress-item" style="color: #fff;">No response</h4>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class="scrollDown">\n          <i class="fa fa-chevron-down" aria-hidden="true"></i>\n        </div>\n        <div class="navbar-inner clearfix">\n          <ul class="nav navbar-nav">\n            <li class="group" *ngIf="FunctionAccess && FunctionAccess.event_GroupMessage==\'yes\'" (click)="gotoGroupMessage()">\n              <a href="javascript:void(0)">\n                <div class="icon-circle"></div> GROUP MESSAGE\n              </a>\n            </li>\n\n            <li class="transport" *ngIf="FunctionAccess && FunctionAccess.event_NotifyPlayer==\'yes\'" (click)="notify_player()">\n              <a href="javascript:void(0)">\n                <div class="icon-circle"></div> TRANSPORT\n              </a>\n            </li>\n            \n            <!--\n                        <li class="session" (click)="gotoSessionPlan()">\n                            <a href="javascript:void(0)">\n                                <div class="icon-circle"></div> SESSION PLAN\n                            </a></li> -->\n            <li class="injury" *ngIf="FunctionAccess && FunctionAccess.user_adminLevel" (click)="gotoInjuredList()">\n              <a href="javascript:void(0)">\n                <div class="icon-circle"></div> INJURY\n              </a></li>\n          </ul>\n        </div>\n      </section>\n    \n    </form>\n  </section>\n</ion-content>\n<!-- <ion-footer>\n  <div class="navbar navbar-default navbar-fixed-bottom">\n    <div class="container-fluid">\n      <ul class="nav navbar-nav">\n        <li class="home" (click)="gotoHome()"><a href="javascript:void(0)">Home</a></li>\n        <li class="events active" (click)="gotoDisplayEvents()"><a href="javascript:void(0)">Events</a></li>\n        <li class="players" (click)="goToPlayersDashboard()"><a href="javascript:void(0)">Players</a></li>\n        <li class="comment" (click)="goToChatDashboard()"><a href="javascript:void(0)">Comments</a></li>\n        <li class="more" (click)="goToMenuPage()"><a href="javascript:void(0)">More</a></li>\n      </ul>\n    </div>\n  </div>\n</ion-footer> -->\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/transport-dashboard/transport-dashboard.html"*/,
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[longPress]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_launch_navigator_ngx__["a" /* LaunchNavigator */],
            __WEBPACK_IMPORTED_MODULE_6__providers_event_logger_event_logger__["a" /* EventLoggerProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_7__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_calendar_ngx__["a" /* Calendar */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_10__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], TransportDashboardPage);
    return TransportDashboardPage;
}());

//# sourceMappingURL=transport-dashboard.js.map

/***/ })

});
//# sourceMappingURL=8.js.map