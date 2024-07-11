webpackJsonp([72],{

/***/ 857:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventHomeNewPageModule", function() { return EventHomeNewPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_home_new__ = __webpack_require__(956);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EventHomeNewPageModule = /** @class */ (function () {
    function EventHomeNewPageModule() {
    }
    EventHomeNewPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__event_home_new__["a" /* EventHomeNewPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__event_home_new__["a" /* EventHomeNewPage */])
            ],
        })
    ], EventHomeNewPageModule);
    return EventHomeNewPageModule;
}());

//# sourceMappingURL=event-home-new.module.js.map

/***/ }),

/***/ 956:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventHomeNewPage; });
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_in_app_browser_ngx__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_network_ngx__ = __webpack_require__(111);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};













var EventHomeNewPage = /** @class */ (function () {
    function EventHomeNewPage(navCtrl, navParams, http, toastCtrl, loadingCtrl, storage, events, keyboard, global, modalCtrl, app, launchNavigator, logger, plt, gFn, calendar, Alert, global_api, network, iab) {
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
        this.network = network;
        this.iab = iab;
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
        this.CreateNote = 'Create note';
        this.offlineConnection = false;
        //Result
        this.players = [];
        this.reportTextRowOpened = false;
        this.scoreHome = "0";
        this.scoreAway = "0";
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
        this.isLoaded = false;
        this.isSurvey = false;
        this.surveyId = 0;
        this.backColor = '#FBFACD';
        this.groundSubAdress = '';
        this.eventstorage = '';
        this.offlinestatus = '';
        this.newSingleEvent = '';
        plt.ready().then(function () {
            plt.registerBackButtonAction(function () {
                _this.backArrow();
            });
        });
        this.storage.get("mobileAssets").then(function (res) {
            if (res && res.Theme && res.Theme) {
                _this.cardTiles = res.Theme;
            }
        });
        this.storage.get('SSODetails').then(function (val) {
            _this.SSODetails = val;
        });
        // this.storage.get('offline').then((val) => {
        //   console.log("offlinestatuss",val)
        //   if(val===1)
        //   {
        //     this.datasynching()
        //   }
        // });
        this.storage.get('FunctionAccess').then(function (val) {
            _this.FunctionAccess = val;
            _this.storage.get('loggedInUserData').then(function (val) {
                var _a, _b;
                _this.loggedInUserData = val;
                _this.coachDetails[0] = val;
                if (_this.navParams.get('EventDetails_eventId')) {
                    _this.UpcomingSingleEvent = _this.navParams.get('EventDetails_eventId');
                    _this.newSingleEvent = _this.navParams.get('EventDetails_eventId');
                    console.log("this.UpcomingSingleEvent : ", _this.UpcomingSingleEvent);
                    _this.SPORTNAME = _this.UpcomingSingleEvent.SPORTNAME;
                    _this.division_name = _this.UpcomingSingleEvent.DIVISION_NAME;
                    _this.new_date = _this.UpcomingSingleEvent.DATE_STARTED;
                    if (_this.UpcomingSingleEvent) {
                        _this.UpcomingSingleEvent = Object.keys(_this.UpcomingSingleEvent).reduce(function (c, k) { return (c[k.toLowerCase()] = _this.UpcomingSingleEvent[k], c); }, {});
                        _this.storage.set('UpcomingSingleEvent', JSON.stringify(_this.UpcomingSingleEvent));
                    }
                    _this.event_id = _this.UpcomingSingleEvent.event_id;
                    _this.selectedTeam = (_a = _this.loggedInUserData) === null || _a === void 0 ? void 0 : _a.SELECTEDTEAM;
                    if (_this.UpcomingSingleEvent.event_type_id == 2 && _this.UpcomingSingleEvent.teamid) {
                        _this.selectedTeam = _this.UpcomingSingleEvent.teamid;
                    }
                    else if (_this.UpcomingSingleEvent.event_type_id == 1) {
                        if (_this.UpcomingSingleEvent.homeclubid == ((_b = _this.loggedInUserData) === null || _b === void 0 ? void 0 : _b.CLUB_ID)) {
                            _this.selectedTeam = _this.UpcomingSingleEvent.hometeam;
                        }
                        else {
                            _this.selectedTeam = _this.UpcomingSingleEvent.awayteam;
                        }
                    }
                    if ((_this.loggedInUserData && _this.loggedInUserData.ISPARENT) && (_this.FunctionAccess && _this.FunctionAccess.user_adminLevel == 4)) {
                        _this.FunctionAccess.event_Injury = 'no';
                        _this.FunctionAccess.event_Result = 'no';
                    }
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
                    //this.segmentChanged(this.AutoSegments)
                    if (_this.network.type === "none" || navigator.onLine === false) {
                        _this.checkNetwork();
                    }
                    else {
                        _this.loadEventDetails();
                        //this.datasynching()
                    }
                }
                else {
                    _this.storage.get('UpcomingSingleEvent').then(function (val) {
                        if (val != null) {
                            _this.UpcomingSingleEvent = JSON.parse(val);
                            _this.event_id = _this.UpcomingSingleEvent.event_id;
                            _this.selectedTeam = _this.loggedInUserData.SELECTEDTEAM;
                            if (_this.UpcomingSingleEvent.event_type_id == 2 && _this.UpcomingSingleEvent.teamid) {
                                _this.selectedTeam = _this.UpcomingSingleEvent.teamid;
                            }
                            else if (_this.UpcomingSingleEvent.event_type_id == 1) {
                                if (_this.UpcomingSingleEvent.homeclubid == _this.loggedInUserData.CLUB_ID) {
                                    _this.selectedTeam = _this.UpcomingSingleEvent.hometeam;
                                }
                                else {
                                    _this.selectedTeam = _this.UpcomingSingleEvent.awayteam;
                                }
                            }
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
                            //this.segmentChanged(this.AutoSegments)
                            if (_this.network.type === "none" || navigator.onLine === false) {
                                _this.checkNetwork();
                            }
                            else {
                                _this.loadEventDetails();
                            }
                        }
                        else {
                            _this.isLoaded = true;
                        }
                    });
                }
            });
        });
    }
    EventHomeNewPage.prototype.checkNetwork = function () {
        return __awaiter(this, void 0, void 0, function () {
            var eventid, rsp, _i, _a, keys, response;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        eventid = this.UpcomingSingleEvent.event_id;
                        return [4 /*yield*/, this.storage.get("arrDetail")];
                    case 1:
                        rsp = (_b.sent()) || [];
                        //this.arrDetail[0] = rsp[0]
                        this.arrDetail[0] = rsp.filter(function (item) { return item.event_id === eventid; });
                        //this.homeAwayText = (response.GETEVENTDETAILS[0]["ishometeam"]) ? 'Home' : 'Away';
                        this.seasonId = this.arrDetail[0]["season_id"];
                        this.isSurvey = this.arrDetail[0].isSurvey == 1;
                        if (typeof this.arrDetail[0].surveyId !== "undefined") {
                            this.surveyId = this.arrDetail[0].surveyId;
                        }
                        this.storage.set('EventDetails', this.arrDetail);
                        console.log("this.event_id", this.arrDetail[0]);
                        for (_i = 0, _a = this.arrDetail[0]; _i < _a.length; _i++) {
                            keys = _a[_i];
                            this.key = keys;
                            this.date = this.key.date.split('/')[0];
                            this.groundAdress = this.key.ground_address;
                            this.groundSubAdress = this.key.ground_suburb;
                            this.groundState = this.key.ground_state;
                            this.longitude = this.key.geoloc_longitude;
                            this.latitude = this.key.geoloc_latitude;
                            this.ground_name = this.key.ground_name;
                            this.postCode = this.key.event_postcode;
                            if (this.key.is_transport_enabled == 1 && this.FunctionAccess.event_Transport == 1) {
                                this.showTransport = true;
                            }
                            break;
                        }
                        if (this.arrDetail.length > 0) {
                            response = this.arrDetail[0];
                            console.log("this.key", response);
                            this.scoreIsUpdated = response["isUpdated"];
                            this.reportText = (response["ishometeam"]) ? response["report_home"] : response["report_away"];
                            this.homeAwayText = (response["ishometeam"]) ? 'Home' : 'Away';
                            if (response["washout"] == "1") {
                                this.gameDismissed = "washout";
                                $(".radio-game-dismissed").each(function () {
                                    if ($(this).val() == "washout")
                                        $(this).attr("checked", "checked");
                                    $('.radio').find('.Washout').addClass('HighLight');
                                });
                            }
                            else if (response["forfeit"] == "1") {
                                this.gameDismissed = "forfeit";
                                $(".radio-game-dismissed").each(function () {
                                    if ($(this).val() == "forfeit")
                                        $(this).attr("checked", "checked");
                                    $('.radio').find('.forfeit').addClass('HighLight');
                                });
                            }
                            else {
                                this.gameDismissed = "";
                            }
                        }
                        this.storage.get('FunctionAccess').then(function (val) {
                            _this.FunctionAccess = val;
                        });
                        console.log("FunctionAccess", this.FunctionAccess);
                        return [2 /*return*/];
                }
            });
        });
    };
    EventHomeNewPage.prototype.ionViewDidLoad = function () {
        this.offlinecheck();
    };
    EventHomeNewPage.prototype.ionViewDidEnter = function () {
        $('.scroll-content').css('margin-bottom', '56px');
    };
    EventHomeNewPage.prototype.offlinecheck = function () {
        // this.offlinestatus = this.storage.get('offline');
    };
    EventHomeNewPage.prototype.datasynching = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.storage.get("attendanceevents")];
                    case 1:
                        _a.eventstorage = (_b.sent()) || [];
                        console.log("this.eventstorage", this.eventstorage);
                        if (this.eventstorage && this.eventstorage.length > 0) {
                            this.presentToast("Your data is Syncing please wait");
                            for (i = 0; i < this.eventstorage.length; i++) {
                                //   if( this.eventstorage[i].bulkattendpayload){
                                //     console.log("bulk attendanec")
                                //     this.BulkPayload(this.eventstorage[i].bulkattendpayload)  
                                //   }
                                // if( this.eventstorage[i].singlepayload&&this.eventstorage[i].singlepayload.length>0)
                                // {
                                //   console.log("single attendance")
                                //   this.SinglePayload(this.eventstorage[i].singlepayload)
                                // }
                                if (this.eventstorage[i].bulkattendpayload && this.eventstorage[i].singlepayload && this.eventstorage[i].singlepayload.length > 0) {
                                    console.log("bulk and single");
                                    this.BulkPayload(this.eventstorage[i].bulkattendpayload, this.eventstorage[i].singlepayload);
                                }
                                if (!this.eventstorage[i].bulkattendpayload && this.eventstorage[i].singlepayload && this.eventstorage[i].singlepayload.length > 0) {
                                    console.log("single");
                                    this.SinglePayload(this.eventstorage[i].singlepayload);
                                }
                                if (this.eventstorage[i].rollstatuspayload) {
                                    console.log("rollstatuspayload");
                                    this.Rollstuatus(this.eventstorage[i].rollstatuspayload);
                                }
                            }
                            this.storage.set("offline", 0);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EventHomeNewPage.prototype.Rollstuatus = function (rollstatuspayload) {
        var _this = this;
        console.log("payloadddd_eventhomenew", rollstatuspayload);
        return new Promise(function (resolve) {
            var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set("eventId", rollstatuspayload.eventId)
                .set("teamId", rollstatuspayload.teamId)
                .set("clubId", rollstatuspayload.clubId)
                .set("adminId", rollstatuspayload.adminId)
                .set("rollStatus", rollstatuspayload.rollStatus);
            _this.http
                .post(_this.global.APIURL_CORE + "attendance/updateroll", Data, {
                headers: _this.global_api.getHeader(),
            })
                .subscribe(function (data) {
                // this.reason_options_list.push(data.GETPLAYERATTENDING[0].reason_options_list);
                _this.storage.set("offline", 0);
                console.log("result for change", data);
                _this.presentToast("Roll status updated");
                _this.clearStorage("", "rollstatus");
                resolve(true);
            }, function (error) { });
        });
    };
    EventHomeNewPage.prototype.SinglePayload = function (singlepayload) {
        var _this = this;
        console.log("fulldata", singlepayload);
        for (var i = 0; i < singlepayload.length; i++) {
            console.log("newdartaaa", singlepayload[i]);
            var loginData4 = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set("event_id", singlepayload[i].event_id)
                .set("personId", singlepayload[i].personId)
                .set("attended", singlepayload[i].attended)
                .set("confirmed", singlepayload[i].confirmed)
                .set("reasondeclined", singlepayload[i].reasondeclined)
                .set("reasondeclined_by_coach", singlepayload[i].reasondeclined_by_coach)
                .set("state_time", singlepayload[i].state_time)
                .set("selectedTeam", singlepayload[i].selectedTeam);
            this.http
                .post(this.global.APIURL + "events/saveSinglePlayersAttdStates", loginData4, { headers: this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS) {
                    _this.storage.set("offline", 0);
                    _this.presentToast("Single player attendance updated");
                    _this.clearStorage("single", "");
                }
            }, function (error) { });
        }
    };
    EventHomeNewPage.prototype.clearStorage = function (payload, rollstatus) {
        return __awaiter(this, void 0, void 0, function () {
            var offlinedata, i, event_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get("attendanceevents")];
                    case 1:
                        offlinedata = (_a.sent()) || [];
                        if (offlinedata && offlinedata.length > 0) {
                            for (i = 0; i < offlinedata.length; i++) {
                                event_1 = offlinedata[i];
                                // Find the matching eventid
                                if (payload) {
                                    event_1.bulkattendpayload = "";
                                    event_1.singlepayload = [];
                                }
                                if (rollstatus) {
                                    event_1.rollstatuspayload = "";
                                }
                            }
                            this.storage.set("attendanceevents", offlinedata);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EventHomeNewPage.prototype.BulkPayload = function (bulkattendpayload, singlepayload) {
        var _this = this;
        return new Promise(function (resolve) {
            var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set("eventid", bulkattendpayload.eventid)
                .set("teamid", bulkattendpayload.teamid)
                .set("attended", bulkattendpayload.attended);
            _this.http
                .post(_this.global.APIURL_CORE + "attendance/attendancebulk", Data, {
                headers: _this.global_api.getHeader(),
            })
                .subscribe(function (data) {
                // this.reason_options_list.push(data.GETPLAYERATTENDING[0].reason_options_list);
                if (data.SUCCESS) {
                    _this.presentToast("Bulk attendance updated successfully");
                    _this.storage.set("offline", 0);
                    if (singlepayload && singlepayload.length > 0) {
                        _this.SinglePayload(singlepayload);
                    }
                }
                resolve(true);
            }, function (error) { });
        });
    };
    EventHomeNewPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: "top",
        });
        toast.present();
    };
    EventHomeNewPage.prototype.loadEventDetails = function () {
        var _this = this;
        var _a;
        /* let loader = this.loadingCtrl.create({});
        loader.present(); */
        this.global_api.getFunctionAccess((_a = this.loggedInUserData) === null || _a === void 0 ? void 0 : _a.PERSON_ID, this.UpcomingSingleEvent.client_id, this.selectedTeam).then(function (x) {
            _this.storage.get('FunctionAccess').then(function (val) {
                console.log("Function access : ", _this.FunctionAccess);
                _this.FunctionAccess = val;
                _this.offlineConnection = false;
                _this.isLoaded = false;
                if ((_this.loggedInUserData && _this.loggedInUserData.ISPARENT) && (_this.FunctionAccess && _this.FunctionAccess.user_adminLevel == 4)) {
                    _this.FunctionAccess.event_Injury = 'no';
                    _this.FunctionAccess.event_Result = 'no';
                }
                if (_this.navParams.get('EventDetails_eventId')) {
                    _this.getEventDetails().then(function (y) {
                        if (y) {
                            //loader.dismiss();
                            _this.isLoaded = true;
                        }
                        else {
                            //loader.dismiss();
                            _this.isLoaded = true;
                            //this.gFn.presentAlert('Error','Data not found or Connection issue.');
                            _this.offlineConnection = true;
                        }
                    });
                }
                else {
                    _this.getNextEventDetails().then(function (x) {
                        if (x) {
                            _this.getEventDetails().then(function (y) {
                                if (y) {
                                    //loader.dismiss();
                                    _this.isLoaded = true;
                                }
                                else {
                                    //loader.dismiss();
                                    _this.isLoaded = true;
                                    //this.gFn.presentAlert('Error','Data not found or Connection issue..');
                                    _this.offlineConnection = true;
                                }
                            });
                        }
                        else {
                            //loader.dismiss();
                            _this.isLoaded = true;
                            //this.gFn.presentAlert('Error','Data not found or Connection issue...');
                            _this.offlineConnection = true;
                        }
                    });
                }
            });
        });
    };
    EventHomeNewPage.prototype.getNextEventDetails = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var _a, _b, _c, _d;
            var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('clientTimeZone', (_a = _this.loggedInUserData) === null || _a === void 0 ? void 0 : _a.CLIENTTIMEZONE)
                .set('selectedTeam', (_b = _this.loggedInUserData) === null || _b === void 0 ? void 0 : _b.SELECTEDTEAM)
                .set('person_id', (_c = _this.loggedInUserData) === null || _c === void 0 ? void 0 : _c.PERSON_ID)
                .set('SEASON_ID', (_d = _this.loggedInUserData) === null || _d === void 0 ? void 0 : _d.SEASON_ID)
                .set('nextEvent', '1')
                .set('filter', '1')
                .set('client_id', _this.loggedInUserData.CLIENT_ID);
            _this.http.post(_this.global.APIURL + 'events/getTeamEvents', data, { headers: _this.global_api.getHeader() })
                .subscribe(function (response) {
                if (response.SUCCESS) {
                    if (response.GETTEAMEVENTS != "") {
                        _this.UpcomingSingleEvent = response.GETTEAMEVENTS[0];
                        _this.storage.set('UpcomingSingleEvent', JSON.stringify(_this.UpcomingSingleEvent));
                        _this.loggedInUserData['EVENT_ID'] = response.GETTEAMEVENTS[0].event_id;
                        _this.loggedInUserData['EVENT_TYPE_ID'] = response.GETTEAMEVENTS[0].event_type_id;
                        _this.storage.set('loggedInUserData', _this.loggedInUserData);
                    }
                    else {
                        _this.loggedInUserData['EVENT_ID'] = "";
                        _this.loggedInUserData['EVENT_TYPE_ID'] = "";
                        _this.storage.set('loggedInUserData', _this.loggedInUserData);
                        //this.gFn.presentAlert('Upcoming Events','No upcoming events present');
                    }
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }, function (error) {
                resolve(false);
            });
        });
    };
    EventHomeNewPage.prototype.getEventDetails = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var _a, _b, _c, _d, _e;
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('event_id', (_a = _this.UpcomingSingleEvent) === null || _a === void 0 ? void 0 : _a.event_id)
                .set('event_type_id', (_b = _this.UpcomingSingleEvent) === null || _b === void 0 ? void 0 : _b.event_type_id)
                .set('clientTimeZone', (_c = _this.loggedInUserData) === null || _c === void 0 ? void 0 : _c.CLIENTTIMEZONE)
                .set('selectedTeam', (_d = _this.loggedInUserData) === null || _d === void 0 ? void 0 : _d.SELECTEDTEAM)
                .set('person_id', (_e = _this.loggedInUserData) === null || _e === void 0 ? void 0 : _e.PERSON_ID)
                .set('client_id', _this.UpcomingSingleEvent.client_id ? _this.UpcomingSingleEvent.client_id : _this.loggedInUserData.CLIENT_ID);
            _this.http.post(_this.global.APIURL + "events/getEventDetails", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (response) {
                if (response.SUCCESS) {
                    _this.arrDetail = [];
                    _this.arrDetail[0] = response.GETEVENTDETAILS[0];
                    _this.setArrdetails(_this.arrDetail);
                    _this.homeAwayText = (response.GETEVENTDETAILS[0]["ishometeam"]) ? 'Home' : 'Away';
                    _this.seasonId = response.GETEVENTDETAILS[0]["season_id"];
                    _this.isSurvey = _this.arrDetail[0].isSurvey == 1;
                    if (typeof _this.arrDetail[0].surveyId !== "undefined") {
                        _this.surveyId = _this.arrDetail[0].surveyId;
                    }
                    _this.storage.set('EventDetails', _this.arrDetail);
                    for (var _i = 0, _a = _this.arrDetail; _i < _a.length; _i++) {
                        var keys = _a[_i];
                        _this.key = keys;
                        _this.date = _this.key.date.split('/')[0];
                        _this.groundAdress = _this.key.ground_address;
                        _this.groundSubAdress = _this.key.ground_suburb;
                        _this.groundState = _this.key.ground_state;
                        _this.longitude = _this.key.geoloc_longitude;
                        _this.latitude = _this.key.geoloc_latitude;
                        _this.ground_name = _this.key.ground_name;
                        _this.postCode = _this.key.event_postcode;
                        if (_this.key.is_transport_enabled == 1 && _this.FunctionAccess.event_Transport == 1) {
                            _this.showTransport = true;
                        }
                        break;
                    }
                    if (response.GETEVENTDETAILS.length > 0) {
                        _this.scoreIsUpdated = response.GETEVENTDETAILS[0]["isUpdated"];
                        /* this.scoreHome = this.getPrefixedNumber(response.GETEVENTDETAILS[0]["homescore"]);
                        this.scoreAway = this.getPrefixedNumber(response.GETEVENTDETAILS[0]["awayscore"]); */
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
                }
                resolve(true);
            }, function (error) {
                resolve(false);
            });
        });
    };
    EventHomeNewPage.prototype.setArrdetails = function (arrDetail) {
        var _this = this;
        this.storage.get('arrDetail').then(function (events) {
            if (events) {
                // Check if event with same EVENT_ID already exists
                var existingEvent = events.find(function (event) { return event.event_id === arrDetail[0].event_id; });
                if (!existingEvent) {
                    // Event does not exist, add it
                    events.push(arrDetail[0]);
                    _this.storage.set('arrDetail', events); // Save updated events back to storage
                }
            }
            else {
                // No events in storage, create new array with this event
                _this.storage.set('arrDetail', [arrDetail[0]]);
            }
        });
    };
    EventHomeNewPage.prototype.openMap = function (address, state, latitude, longitude) {
        if (latitude != 0 && longitude != 0) {
            this.launchNavigator.navigate(latitude + ', ' + longitude);
        }
        else if (address || state) {
            var Actualaddress = address + ', ' + this.groundSubAdress + ', ' + state + ', ' + this.postCode;
            this.launchNavigator.navigate(Actualaddress);
        }
        else {
            this.gFn.presentToast('Location undefined');
        }
    };
    EventHomeNewPage.prototype.addEventToCalendar = function () {
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
            _this.gFn.presentAlert('Success', 'Event added to calendar.');
        }, function (err) {
            _this.gFn.presentAlert('Error', 'Problem in adding event to calendar. Please check the app permission settings.');
        });
    };
    EventHomeNewPage.prototype.gotoInjuredList = function () {
        this.showEvent = true;
        if (typeof (this.SSODetails) != "undefined" && this.SSODetails != null && this.SSODetails.ISINJURYURLENABLED) {
            var browserRef = this.iab.create(this.SSODetails.INJURYURL, '_blank', 'clearcache=yes,clearsesioncache=yes');
        }
        else {
            if (this.FunctionAccess.event_Injury == 'self') {
                this.navCtrl.push('InjuryIncidentReportPage', { 'injured_person_id': this.loggedInUserData.PERSON_ID, 'season_id': this.seasonId });
            }
            else {
                this.navCtrl.push('InjuredListPage', { 'season_id': this.seasonId });
            }
        }
    };
    EventHomeNewPage.prototype.gotoGroupMessage = function () {
        this.showEvent = true;
        /*let GroupMessageModal = this.modalCtrl.create('EventGroupMessagePage', { Array: this.DupeventAttendLen });
        GroupMessageModal.onDidDismiss(data => {
        });
        GroupMessageModal.present();*/
        this.navCtrl.push('EventGroupSendMessagePage', { notifyFlag: this.notifyFlag });
    };
    EventHomeNewPage.prototype.gotoTransport = function () {
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
    EventHomeNewPage.prototype.goToTimesheet = function () {
        this.navCtrl.push('TimesheetPage');
        this.showEvent = true;
    };
    EventHomeNewPage.prototype.borrow_player = function () {
        this.navCtrl.push('BorrowedPlayerPage', { UpcomingSingleEvent: JSON.stringify(this.UpcomingSingleEvent) });
        this.showEvent = true;
    };
    EventHomeNewPage.prototype.gotoAttendance = function () {
        if (this.FunctionAccess && this.FunctionAccess.user_adminLevel == 4) {
            this.navCtrl.push('EventAttendancePage', { 'EventDetails_eventId': this.UpcomingSingleEvent, 'originalevent': this.newSingleEvent });
        }
        else {
            this.navCtrl.push('EventDashboardNewPage', { 'EventDetails_eventId': this.UpcomingSingleEvent, 'originalevent': this.newSingleEvent });
        }
    };
    EventHomeNewPage.prototype.WelfarePlayerQuestion = function () {
        var _this = this;
        this.showEvent = true;
        var Data = Object.keys(this.loggedInUserData).reduce(function (c, k) { return (c[k.toLowerCase()] = _this.loggedInUserData[k], c); }, {});
        this.navCtrl.push('PlayerQuestionPage', { Player_detail: Data });
    };
    EventHomeNewPage.prototype.gotoResults = function () {
        this.gFn.gotoResults();
        this.showEvent = true;
    };
    // gotoWelfare() {
    //   this.gFn.gotoWelfare()
    //   this.showEvent = true
    // }
    EventHomeNewPage.prototype.backArrow = function () {
        this.navCtrl.pop();
    };
    EventHomeNewPage.prototype.gotoCreateNote = function () {
        var _this = this;
        if (this.UpcomingSingleEvent['event_notes'] == undefined) {
            this.UpcomingSingleEvent['event_notes'] = '';
        }
        if (this.loggedInUserData.adminLevel != 4 && (!this.loggedInUserData.ISPARENT || (this.loggedInUserData.ISPARENT && this.loggedInUserData.PERSON_ID == this.loggedInUserData.PARENT_ID))) {
            var modal = this.modalCtrl.create('CreateNodePage', { 'eventid': this.UpcomingSingleEvent['event_id'], 'event_notes': this.UpcomingSingleEvent['event_notes'] }, { 'showBackdrop': true, 'enableBackdropDismiss': true });
            modal.present();
            modal.onDidDismiss(function (data) {
                if (typeof data != 'undefined') {
                    _this.CreateNote = data.length ? data : 'Create note';
                    _this.UpcomingSingleEvent['event_notes'] = data;
                }
            });
        }
    };
    EventHomeNewPage.prototype.goToSurvey = function () {
        this.gFn.goToSurvey(this.surveyId, this.event_id, this.UpcomingSingleEvent.client_id, this.loggedInUserData.SELECTEDTEAM, this.loggedInUserData.PERSON_ID);
        this.showEvent = false;
    };
    EventHomeNewPage.prototype.gotoChat = function (groupid, grouptype, groupName, clientId) {
        var _a;
        var chatInfo = {
            from: 1,
            to: 10,
            person_id: (_a = this.loggedInUserData) === null || _a === void 0 ? void 0 : _a.PERSON_ID,
            selectedTeam: this.loggedInUserData.SELECTEDTEAM,
            groupid: groupid,
            teamid: this.loggedInUserData.SELECTEDTEAM,
            grouptype: grouptype,
            flag: 1,
            userPhoto: "",
            groupName: groupName,
            accFirstName: this.loggedInUserData.FIRST_NAME,
            accLastName: this.loggedInUserData.LAST_NAME,
            clientId: clientId,
            groupContactId: ""
        };
        this.navCtrl.push('GroupChatViewPage', { data: chatInfo });
        //this.app.getRootNav().getActiveChildNav().select(3);
    };
    EventHomeNewPage.prototype.tryAgain = function () {
        this.loadEventDetails();
    };
    EventHomeNewPage.prototype.gotoWelfare = function () {
        this.gFn.gotoWelfare();
        this.showEvent = true;
    };
    EventHomeNewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event-home-new',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-home-new/event-home-new.html"*/'\n<ion-header class="header-md header">\n  <ion-navbar>\n      <div class="top-bar clearfix">\n        <div class="pull-left col-xs-6 pl-5">\n          <div>EVENTS</div>\n        </div>\n      </div>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="grey_container">\n    <!-- <div class="background_grey" *ngIf="offlineConnection">\n      <div class="off-wrap">\n        <p><img src="assets/images/events-new-icon/offline-logo-alt.svg" class=""></p>\n        <h3>OFFLINE</h3>\n        <p>Your network is unavalaible, please check your data or connection</p>\n        <button type="button" class="btn btn-sm-black try-again" (click)="tryAgain()">TRY AGAIN</button>\n      </div>\n    </div> -->\n<!-- no internet message end -->\n\n  <!-- loading section -->\n  <!-- <div class="loding_overlay" *ngIf="!isLoaded && !offlineConnection">\n      <div class="h4_loading fadeShine"></div>\n      <div class="h3_loading fadeShine"></div>\n      <div class="p_loading fadeShine"></div>\n      <div class="p_loading_2nd fadeShine"></div>\n      <div class="icon_loading mt-30">\n          <div class="inner fadeShine"></div>\n          <div class="inner fadeShine"></div>\n      </div>\n      <div class="icon_loading">\n          <div class="inner fadeShine"></div>\n          <div class="inner fadeShine"></div>\n      </div>  \n      <div class="options_loading fadeShine"></div>\n      <div class="options_loading fadeShine"></div>\n      <div class="options_loading fadeShine"></div>\n      <div class="options_loading fadeShine"></div>\n      <div class="options_loading fadeShine"></div>\n      <div class="options_loading fadeShine"></div>\n      <div class="options_loading fadeShine"></div>\n      <div class="options_loading_2nd fadeShine"></div>\n  </div> -->\n  <!-- loading section end-->\n\n  <div class="grey_container xs-padding" *ngIf="arrDetail.length">\n    <div class="time_text" *ngFor="let detail of arrDetail">\n        <div class="card-img" *ngIf="loggedInUserData && loggedInUserData.ISPARENT">\n          <div *ngFor="let child of detail.childs">\n            <span *ngIf="!child.PHOTOPATH">\n              <div class="img-circle"><span class="img-text">{{child.FIRSTNAME[0] | uppercase}} {{child.LASTNAME[0] | uppercase}} </span></div>          \n            </span>\n            <span *ngIf="child.PHOTOPATH">\n              <img src="{{global.PROFILEIMAGEURL}}{{child.PHOTOPATH}}" alt="" class="img-circle" onerror="this.src=\'assets/images/test-user.svg\'">\n            </span>\n          </div>\n        </div>\n        <h3 *ngIf="key.event_type_id==2">TRAINING - {{SPORTNAME }}</h3>\n        <h3 *ngIf="key.event_type_id==1">{{SPORTNAME }} - {{division_name}}</h3>\n        <!-- <h4>{{key.week}} {{date}} {{detail.months }} {{key.time_started}}</h4> -->\n        <h4>{{new_date | date: "EEEE d/M/yy"}} {{key.time_started | lowercase }}</h4>\n        <h3 *ngIf="key.event_type_id==1">{{key.hometeamname}} vs {{key.awayteamname}}</h3>\n        <h3 *ngIf="key.event_type_id==2 && (division_name == key.hometeamname)">{{key.hometeamname}}</h3>\n        <h3 *ngIf="(key.event_type_id==2) && (division_name != key.hometeamname)">{{division_name}}, {{key.hometeamname}}</h3>\n        <!-- <h3 *ngIf="key.event_type_id==2">{{key.name}}</h3> -->\n        <p *ngIf="detail.ground_name != \'\' && detail.ground_address != \'\' && detail.ground_state != \'\'">{{detail.ground_name}}\n          <br>{{detail.ground_address}}, {{detail.ground_suburb}},\n          {{detail.ground_state}}, {{detail.event_postcode}} </p>\n    </div>\n\n    <div class="icon_wraper clearfix">\n\n      <div class="icon-card bg-map pull-left"\n      [ngStyle]="{\'background-color\': cardTiles && cardTiles.Map_color_tile ? cardTiles.Map_color_tile : \'#A79F9A\'}"\n         *ngIf="!showTransport" (click)="openMap(groundAdress,groundState,latitude,longitude)">\n        <h4 style="color:white !important;">MAP</h4>\n        <p><img src="assets/images/events-new-icon/map-location.svg" class="icon_img"></p>\n      </div>\n\n      <div class="icon-card bg-blue-alt pull-left" *ngIf="showTransport" (click)="gotoTransport()">\n        <h4 >TRANSPORT</h4>\n        <p><img src="assets/images/events-new-icon/bus-front.svg" class="icon_img"></p>\n      </div>\n      \n      <div class="icon-card bg-blue-new pull-right" \n      [ngStyle]="{\'background-color\': cardTiles && cardTiles.Attendance_color_tile ? cardTiles.Attendance_color_tile :  \'#004278\'}" \n      (click)="gotoAttendance()" *ngIf="(loggedInUserData.ISPARENT !== 1 && this.FunctionAccess.user_adminLevel != 4)">\n        <h4>ATTENDANCE</h4>\n        <p><img src="assets/images/events-new-icon/attendence-calender.svg" class="icon_img"></p>\n\n      </div>\n\n      <div class="icon-card bg-blue"  *ngIf="(FunctionAccess && FunctionAccess.user_adminLevel ==4)" (click)="addEventToCalendar()" [class.pull-right]="FunctionAccess && FunctionAccess.user_adminLevel ==4" >\n        <h4 style="color:white !important;">ADD TO CALENDAR</h4>\n        <p><img src="assets/images/events-new-icon/calendar-alt.svg" class="icon_img"></p>\n      </div>\n       \n    \n      \n      <div class="icon-card bg-injury pull-right" \n      [ngStyle]="{\'background-color\': cardTiles && cardTiles.Injury_color_tile ? cardTiles.Injury_color_tile :  \'#BE3A34\'}"\n       *ngIf="(FunctionAccess && FunctionAccess.event_Injury!=\'no\') && (this.FunctionAccess.user_adminLevel == 1 || this.FunctionAccess.user_adminLevel == 2 || this.FunctionAccess.user_adminLevel == 3)"  (click)="gotoInjuredList()">\n        <h4>INJURY</h4>\n        <p><img src="assets/images/events-new-icon/ingury.svg" class="icon_img"></p>\n      </div>\n\n      <div class="icon-card bg-alert pull-left"\n      [ngStyle]="{\'background-color\': cardTiles && cardTiles.Alert_color_tile ? cardTiles.Alert_color_tile :  \'#fdb913\'}"\n      *ngIf="FunctionAccess && FunctionAccess.event_GroupMessage==\'yes\'" (click)="gotoGroupMessage()">\n        <h4 class="inverseText">ALERT</h4>\n        <p><img src="assets/images/events-new-icon/comment-add.svg" class="icon_img"></p>\n      </div>\n\n      <!-- <div class="icon-card bg-darkBlue" [class.pull-left]="FunctionAccess && FunctionAccess.user_adminLevel ==3" [class.pull-left]="FunctionAccess && FunctionAccess.user_adminLevel != 3" *ngIf="loggedInUserData && FunctionAccess && (FunctionAccess.user_adminLevel == 1 || FunctionAccess.user_adminLevel == 2) && (UpcomingSingleEvent && UpcomingSingleEvent.event_type_id != 2) && (!loggedInUserData.ISPARENT)" (click)="gotoResults()">\n        <h4 style="font-size: 15px;">RESULTS</h4>\n        <p><img src="assets/images/events-new-icon/result_parent.svg"  style="width: 50px;\n          margin-top: 21px;" class="icon_img"></p>\n      </div> -->\n    </div>\n    \n\n    <div class="options_wrap">\n      <div class="options" *ngIf="showTransport" (click)="openMap(groundAdress,groundState,latitude,longitude)">\n        <img src="assets/images/events-new-icon/blue/m-location-small.svg" style="width: 20px">\n        <p>Map</p>\n        <img src="assets/images/events-new-icon/Select arrow.svg" style="width: 15px" class="pull_right_arrow">\n      </div>\n\n      <div class="options" *ngIf="(FunctionAccess && (FunctionAccess.event_Welfare==\'self\' || FunctionAccess.event_Welfare==\'yes\')) && UpcomingSingleEvent && UpcomingSingleEvent.welfare_question==1" (click)="(FunctionAccess && FunctionAccess.event_Welfare==\'self\')? WelfarePlayerQuestion():gotoWelfare()">\n        <img src="assets/images/events-new-icon/wellfare-face.svg" style="width: 20px">\n        <p>Welfare</p>\n        <img src="assets/images/events-new-icon/Select arrow.svg" style="width: 15px" class="pull_right_arrow">\n      </div>\n\n      <div class="options" *ngIf="FunctionAccess && FunctionAccess.event_Result==\'yes\' && UpcomingSingleEvent && UpcomingSingleEvent.event_type_id != 2" (click)="gotoResults()">\n        <img src="assets/images/events-new-icon/blue/result123.svg" style="width: 20px">\n        <p>Results</p>\n        <img src="assets/images/events-new-icon/Select arrow.svg" style="width: 15px" class="pull_right_arrow">\n      </div>\n\n      <div class="options" *ngIf="loggedInUserData && loggedInUserData.ISCONTRACTOR" (click)="goToTimesheet()">\n        <img src="assets/images/events-new-icon/blue/time-watch.svg" style="width: 20px">\n        <p>Timesheet</p>\n        <img src="assets/images/events-new-icon/Select arrow.svg" style="width: 15px" class="pull_right_arrow">\n      </div>\n\n      <div class="options" *ngIf="FunctionAccess && FunctionAccess.event_BorrowPlayer==\'yes\'" (click)="borrow_player()">\n        <img src="assets/images/events-new-icon/blue/borrow-icon.svg" style="width: 20px">\n        <p>Borrow teammates</p>\n        <img src="assets/images/events-new-icon/Select arrow.svg" style="width: 15px" class="pull_right_arrow">\n      </div>\n\n      <div class="options" *ngIf="FunctionAccess.showSurveyMenu == \'yes\' && isSurvey" (click)="goToSurvey()">\n        <img src="assets/images/events-new-icon/blue/survey.svg" style="width: 20px">\n        <p>Survey</p>\n        <img src="assets/images/events-new-icon/Select arrow.svg" style="width: 15px" class="pull_right_arrow">\n      </div>\n\n      <!-- <div class="options">\n        <img src="assets/images/events-new-icon/green/\n        stat-icon.svg" style="width: 20px">\n        <p>Stats</p>\n        <img src="assets/images/events-new-icon/Select arrow.svg" style="width: 15px" class="pull_right_arrow">\n      </div> -->\n\n      <div class="options" *ngIf="FunctionAccess.user_adminLevel !=4 && (!this.loggedInUserData.ISPARENT || (loggedInUserData.ISPARENT && loggedInUserData.PERSON_ID == this.loggedInUserData.PARENT_ID))" (click)="gotoCreateNote()">\n        <img src="assets/images/events-new-icon/blue/note-megaphone.svg" style="width: 20px">\n        <p>Notes</p>\n        <img src="assets/images/events-new-icon/Select arrow.svg" style="width: 15px" class="pull_right_arrow">\n      </div>\n\n      <div class="options" *ngFor="let groupChat of arrDetail[0].groupInfo" (click)="gotoChat(groupChat.GROUPID, groupChat.GROUPTYPE, groupChat.GROUPNAME, groupChat.CLIENTID)">\n        <img src="assets/images/events-new-icon/blue/chat.svg" style="width: 20px">\n        <p>Access to group chat\n          <span *ngIf="arrDetail[0].groupInfo.length == 2 && (arrDetail[0].event_type_id == 1 && groupChat.ISHOME == 1)">[Home]</span>\n          <span *ngIf="arrDetail[0].groupInfo.length == 2 && (arrDetail[0].event_type_id == 1 && groupChat.ISAWAY == 1)">[Away]</span>\n        </p>\n        <img src="assets/images/events-new-icon/Select arrow.svg" style="width: 15px" class="pull_right_arrow">\n      </div>\n    </div>\n\n  </div>\n\n  <div class="grey_container xs-padding" *ngIf="isLoaded && !offlineConnection && !arrDetail.length">\n    <div class="time_text">\n      <h3>No Upcoming Event</h3>\n    </div>\n  </div>\n\n</ion-content>'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-home-new/event-home-new.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_launch_navigator_ngx__["a" /* LaunchNavigator */],
            __WEBPACK_IMPORTED_MODULE_6__providers_event_logger_event_logger__["a" /* EventLoggerProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_calendar_ngx__["a" /* Calendar */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_10__providers_global_api_global_api__["a" /* GlobalApiProvider */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_network_ngx__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_in_app_browser_ngx__["a" /* InAppBrowser */]])
    ], EventHomeNewPage);
    return EventHomeNewPage;
}());

//# sourceMappingURL=event-home-new.js.map

/***/ })

});
//# sourceMappingURL=72.js.map