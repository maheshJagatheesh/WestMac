webpackJsonp([76],{

/***/ 775:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventDashboardNewPageModule", function() { return EventDashboardNewPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_dashboard_new__ = __webpack_require__(878);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_circle_progress__ = __webpack_require__(336);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var EventDashboardNewPageModule = /** @class */ (function () {
    function EventDashboardNewPageModule() {
    }
    EventDashboardNewPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__event_dashboard_new__["a" /* EventDashboardNewPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__event_dashboard_new__["a" /* EventDashboardNewPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ng_circle_progress__["a" /* NgCircleProgressModule */].forRoot()
            ],
        })
    ], EventDashboardNewPageModule);
    return EventDashboardNewPageModule;
}());

//# sourceMappingURL=event-dashboard-new.module.js.map

/***/ }),

/***/ 878:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventDashboardNewPage; });
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_vibration_ngx__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_global_api_global_api__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_secure_storage_ngx__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_network_ngx__ = __webpack_require__(111);
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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















/**
 * Generated class for the EventDashboardNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EventDashboardNewPage = /** @class */ (function () {
    function EventDashboardNewPage(navCtrl, navParams, http, toastCtrl, loadingCtrl, storage, events, keyboard, global, modalCtrl, app, launchNavigator, logger, plt, gFn, calendar, Alert, vibration, global_api, alertCtrl, secureStorage, network) {
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
        this.vibration = vibration;
        this.global_api = global_api;
        this.alertCtrl = alertCtrl;
        this.secureStorage = secureStorage;
        this.network = network;
        this.eventAttend = [];
        this.DupeventAttendLen = [];
        this.DupeventAttendsec = [];
        this.DupEventAttendSecBorrowed = [];
        this.combinedPlayersArray = [];
        this.combinedBorrowedPlayersArray = [];
        this.percentArray = [];
        this.Arrowflag = false;
        this.AttendyPersonId = "";
        this.arrDetail = [];
        this.GoingColor = "#68E048";
        this.MaybeColor = "#2BBFF0";
        this.NotGoingColor = "#D80000";
        this.NoResponseColor = "#F59044";
        this.AttdnColor = "#fff";
        this.reason_options_list = [];
        this.Attendance = false;
        this.filterState = 0;
        this.filterButton = "";
        this.BorrowTagFlag = 0;
        this.BackButton = false;
        this.SymbolAlert = false;
        this.groundAdress = "";
        this.groundState = "";
        this.latitude = "";
        this.longitude = "";
        this.homeAwayText = "";
        this.isParent = false;
        this.showEvent = false;
        this.AutoSegments = {};
        this.ShowSeverityPage = false;
        this.medicalInfo = false;
        this.eventstorage = [];
        //Result
        this.players = [];
        this.reportTextRowOpened = false;
        this.scoreHome = "0";
        this.scoreAway = "0";
        this.gameDismissed = "";
        this.reportText = "";
        this.vote1 = "";
        this.vote2 = "";
        this.vote3 = "";
        this.activePlayer = "";
        this.voteSuccess = false;
        this.voteForPlayerId = "";
        this.coachDetails = [];
        this.EmptyBorrowPlayer = false;
        this.scoreIsUpdated = 0;
        this.isLoaded = false;
        this.isOffline = false;
        this.rollstatus = "ROLL NOT TAKEN";
        this.offlinehtml = [];
        this.OperooData = {
            emergencyContacts: [],
            schoolId: "",
            safetyAlerts: [],
            bloodGroup: "",
            WearsContacts: "",
            medicalContacts: [],
            swimmingAbility: "",
            paracetamolAllowed: "",
            wearsGlasses: "",
        };
        this.OperooStatus = 0;
        this.singleplayerstatus = [];
        this.mBottom = "";
        this.checkNetwork();
    }
    EventDashboardNewPage.prototype.checkNetwork = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.storage.get("attendanceevents")];
                    case 1:
                        _a.offlinehtml = (_b.sent()) || [];
                        this.upcommingevent = this.navParams.get("originalevent");
                        this.storeselectedevent();
                        // Check if the application is running in a web browser
                        if (this.network.type === "none" || navigator.onLine === false) {
                            this.getknowdta();
                            this.setOfflineData();
                        }
                        else {
                            this.storage.set("offline", 0);
                            // this.storage.remove('attendanceevents');
                            this.eventIdstorage();
                            this.gFn.showMenuIcon();
                            this.PhotoApiUrl = this.global.PROFILEIMAGEURL;
                            this.getDefaultDataLoad();
                            this.plt.registerBackButtonAction(function () {
                                _this.backArrow();
                            });
                            // For physical devices, use the Network plugin to handle further connectivity checks
                            this.network.onDisconnect().subscribe(function () { });
                            this.network.onConnect().subscribe(function () {
                                console.log("Network connected!");
                                setTimeout(function () {
                                    if (_this.network.type === "wifi") {
                                    }
                                }, 3000);
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EventDashboardNewPage.prototype.chkoflinedta = function () {
        throw new Error("Method not implemented.");
    };
    EventDashboardNewPage.prototype.eventIdstorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, newEventId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.storage.get("attendanceevents")];
                    case 1:
                        _a.existingEvents = (_b.sent()) || [];
                        console.log("newevntentiiddd", this.existingEvents);
                        newEventId = this.navParams.get("EventDetails_eventId").event_id;
                        if (Array.isArray(this.existingEvents)) {
                            this.eventExists = this.existingEvents.some(function (event) { return event.eventid === newEventId; });
                        }
                        if (!!this.eventExists) return [3 /*break*/, 3];
                        this.existingEvents.push({ eventid: newEventId });
                        return [4 /*yield*/, this.storage.set("attendanceevents", this.existingEvents)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EventDashboardNewPage.prototype.setOfflineData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var offlinedata, i, event_1, persondata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.storage.set("offline", 1);
                        this.storeselectedevent();
                        this.getDefaultDataLoad();
                        return [4 /*yield*/, this.storage.get("attendanceevents")];
                    case 1:
                        offlinedata = (_a.sent()) || [];
                        if (!(offlinedata && offlinedata.length > 0)) return [3 /*break*/, 6];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < offlinedata.length)) return [3 /*break*/, 6];
                        event_1 = offlinedata[i];
                        if (!(event_1.eventid === this.navParams.get("EventDetails_eventId").event_id)) return [3 /*break*/, 5];
                        this.arrDetail = event_1.EventDetails;
                        this.GetStatusChang(event_1.rollstatus);
                        if (!event_1.eventAttend) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.storage.get("loggedInUserData")];
                    case 3:
                        persondata = (_a.sent());
                        this.eventAttend = event_1.eventAttend.DATA;
                        this.BorrowedPlayerPresent = event_1.eventAttend.DATA_BORROWED;
                        // this.ArrangePlayers();
                        this.ArrangePlayersOffline(this.eventAttend);
                        this.CheckEmptyBorrowedPlayer();
                        _a.label = 4;
                    case 4:
                        if (event_1.rollstatus) {
                            console.log("event.rollstatus", event_1.rollstatus);
                            this.GetStatusChang(event_1.rollstatus.toString());
                        }
                        this.isLoaded = true;
                        this.isOffline = true;
                        this.isOffline = false;
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    EventDashboardNewPage.prototype.storeselectedevent = function () {
        //this.storage.set("selectedEvent",this.upcommingevent)
        var _this = this;
        this.storage.get('selectedEvent').then(function (events) {
            console.log("neweventss", events);
            if (events) {
                console.log("first", events);
                // Check if event with same EVENT_ID already exists
                var existingEvent = events.find(function (event) { return event.EVENT_ID === _this.upcommingevent.EVENT_ID; });
                if (!existingEvent) {
                    console.log("existingEvent", existingEvent);
                    // Event does not exist, add it
                    events.push(_this.upcommingevent);
                    _this.storage.set('selectedEvent', events); // Save updated events back to storage
                }
            }
            else {
                console.log("second", events);
                // No events in storage, create new array with this event
                _this.storage.set('selectedEvent', [_this.upcommingevent]);
            }
        });
    };
    EventDashboardNewPage.prototype.getrollstatus = function (PersonData) {
        var _this = this;
        return new Promise(function (resolve) {
            var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set("eventId", _this.navParams.get("EventDetails_eventId").event_id)
                .set("teamId", _this.getTeamId(_this.navParams.get("EventDetails_eventId"), _this.PersonData))
                .set("clubId", (PersonData === null || PersonData === void 0 ? void 0 : PersonData.CLUB_ID) ? PersonData.CLUB_ID : "")
                .set("adminId", PersonData === null || PersonData === void 0 ? void 0 : PersonData.PERSON_ID);
            _this.http
                .post(_this.global.APIURL_CORE + "attendance/getrollstatus", Data, {
                headers: _this.global_api.getHeader(),
            })
                .subscribe(function (data) {
                // this.reason_options_list.push(data.GETPLAYERATTENDING[0].reason_options_list);
                _this.currentRollStatus = data.GETROLLSTATUS.rollStatus;
                _this.storage.set("rollstatus", _this.currentRollStatus);
                _this.storageset("", _this.currentRollStatus, "", "", "");
                _this.setBulkupdateStorage("", "", "", "", _this.currentRollStatus);
                _this.GetStatusChang(_this.currentRollStatus);
                resolve(true);
            }, function (error) { });
        });
    };
    EventDashboardNewPage.prototype.GetStatusChang = function (currentRollStatus) {
        console.log("currentRollStatus", currentRollStatus);
        if (currentRollStatus == "2") {
            this.rollstatus = "ROLL CLOSED";
        }
        else if (currentRollStatus == "1") {
            this.rollstatus = "ROLL OPEN";
        }
        else {
            this.rollstatus = "ROLL NOT TAKEN";
        }
    };
    EventDashboardNewPage.prototype.changeRoll = function () {
        switch (this.rollstatus) {
            case "ROLL NOT TAKEN": {
                this.rollstatus = "ROLL OPEN";
                this.rollStatusChange(this.navParams.get("EventDetails_eventId").event_id, "1");
                break;
            }
            case "ROLL OPEN": {
                // this.rollstatus = 'ROLL OPEN';
                this.presentCloseroll();
                console.log("Roll open");
                break;
            }
            case "ROLL CLOSED": {
                this.rollstatus = "ROLL OPEN";
                // this.presentCloseroll();
                console.log("Roll closeddd");
                this.rollStatusChange(this.navParams.get("EventDetails_eventId").event_id, "1");
                break;
            }
            default: {
            }
        }
    };
    EventDashboardNewPage.prototype.getTeamId = function (eventData, personData) {
        if (eventData.event_type_id == 2) {
            return eventData.teamid;
        }
        else {
            if (eventData.awayclubid == (personData === null || personData === void 0 ? void 0 : personData.CLUB_ID)) {
                return eventData.awayteam;
            }
            else if (eventData.homeclubid == (personData === null || personData === void 0 ? void 0 : personData.CLUB_ID)) {
                return eventData.hometeam;
            }
            else {
                return "";
            }
        }
    };
    EventDashboardNewPage.prototype.rollStatusChange = function (event_type_id, event) {
        var _this = this;
        var _a, _b, _c, _d;
        if (this.network.type === "none" || navigator.onLine === false) {
            this.storage.set("offline", 1);
            var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set("eventId", event_type_id)
                .set("teamId", this.getTeamId(this.navParams.get("EventDetails_eventId"), this.PersonData))
                .set("clubId", (_a = this.PersonData) === null || _a === void 0 ? void 0 : _a.CLUB_ID)
                .set("adminId", (_b = this.PersonData) === null || _b === void 0 ? void 0 : _b.PERSON_ID)
                .set("rollStatus", event);
            var rollstauspayload = {
                eventId: event_type_id,
                teamId: this.getTeamId(this.navParams.get("EventDetails_eventId"), this.PersonData),
                clubId: (_c = this.PersonData) === null || _c === void 0 ? void 0 : _c.CLUB_ID,
                adminId: (_d = this.PersonData) === null || _d === void 0 ? void 0 : _d.PERSON_ID,
                rollStatus: event
            };
            this.setBulkupdateStorage("", "", "", rollstauspayload, event);
            this.storage.set("rollstatuspayload", Data);
            //this.storageset("", "", "", Data, "")
        }
        else {
            this.storage.set("offline", 0);
            return new Promise(function (resolve) {
                var _a, _b;
                var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                    .set("eventId", event_type_id)
                    .set("teamId", _this.getTeamId(_this.navParams.get("EventDetails_eventId"), _this.PersonData))
                    .set("clubId", (_a = _this.PersonData) === null || _a === void 0 ? void 0 : _a.CLUB_ID)
                    .set("adminId", (_b = _this.PersonData) === null || _b === void 0 ? void 0 : _b.PERSON_ID)
                    .set("rollStatus", event);
                _this.storage.set("rollstatuspayload", Data);
                _this.storageset("", "", "", Data, "");
                _this.setBulkupdateStorage("", "", "", "", event);
                _this.http
                    .post(_this.global.APIURL_CORE + "attendance/updateroll", Data, {
                    headers: _this.global_api.getHeader(),
                })
                    .subscribe(function (data) {
                    // this.reason_options_list.push(data.GETPLAYERATTENDING[0].reason_options_list);
                    console.log("result for change", data);
                    resolve(true);
                }, function (error) { });
            });
        }
    };
    EventDashboardNewPage.prototype.PresentStatusUpdate = function (status) {
        return __awaiter(this, void 0, void 0, function () {
            var allObjects, i, j, i, j, payloads, data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.network.type === "none" || navigator.onLine === false)) return [3 /*break*/, 2];
                        this.storage.set("offline", 1);
                        if (status.toString() === '0') {
                            allObjects = [];
                            // Iterate through each array starting from index 0
                            for (i = 0; i < this.eventAttend.length; i++) {
                                // If the array is not empty
                                if (this.eventAttend[i].length > 0) {
                                    // Iterate through each element in this array
                                    for (j = 0; j < this.eventAttend[i].length; j++) {
                                        // Change the "attended" status to 0
                                        this.eventAttend[i][j].attended = 0;
                                        this.eventAttend[i][j].state = 3;
                                        // Push this element to the allObjects array
                                        allObjects.push(this.eventAttend[i][j]);
                                    }
                                    // Empty the current array
                                    this.eventAttend[i] = [];
                                }
                            }
                            // Place allObjects into the third position of the main array
                            this.eventAttend[2] = allObjects;
                            console.log("absentarrayattend", this.eventAttend);
                        }
                        else if (status.toString() === '1') {
                            for (i = 1; i < this.eventAttend.length; i++) {
                                // If the array is not empty
                                if (this.eventAttend[i].length > 0) {
                                    // Iterate through each element in this array
                                    for (j = 0; j < this.eventAttend[i].length; j++) {
                                        // Change the "attended" status to 1
                                        this.eventAttend[i][j].attended = 1;
                                        this.eventAttend[i][j].state = 1;
                                        // Move this element to the first array
                                        this.eventAttend[0].push(this.eventAttend[i][j]);
                                    }
                                    // Empty the current array
                                    this.eventAttend[i] = [];
                                }
                            }
                            console.log("presentarrayattend", this.eventAttend);
                        }
                        payloads = {
                            eventid: this.navParams.get("EventDetails_eventId").event_id,
                            teamid: this.getTeamId(this.navParams.get("EventDetails_eventId"), this.PersonData),
                            attended: status.toString()
                        };
                        return [4 /*yield*/, this.storage.get("attendanceevents")];
                    case 1:
                        data = (_a.sent()) || [];
                        this.setBulkupdateStorage(this.eventAttend, payloads, 1, "", "");
                        return [3 /*break*/, 3];
                    case 2:
                        this.storage.set("offline", 0);
                        return [2 /*return*/, new Promise(function (resolve) {
                                var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                                    .set("eventid", _this.navParams.get("EventDetails_eventId").event_id)
                                    .set("teamid", _this.getTeamId(_this.navParams.get("EventDetails_eventId"), _this.PersonData))
                                    .set("attended", status.toString());
                                _this.http
                                    .post(_this.global.APIURL_CORE + "attendance/attendancebulk", Data, {
                                    headers: _this.global_api.getHeader(),
                                })
                                    .subscribe(function (data) {
                                    // this.reason_options_list.push(data.GETPLAYERATTENDING[0].reason_options_list);
                                    _this.presentToast("Bulk attendance updated successfully");
                                    resolve(true);
                                    _this.AllPlayersLoad();
                                }, function (error) { });
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EventDashboardNewPage.prototype.setBulkupdateStorage = function (eventsttend, bulkpayload, singlepayload, rollstatuspayload, rollstatus) {
        return __awaiter(this, void 0, void 0, function () {
            var offlinedata, i, event_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get("attendanceevents")];
                    case 1:
                        offlinedata = (_a.sent()) || [];
                        if (offlinedata && offlinedata.length > 0) {
                            for (i = 0; i < offlinedata.length; i++) {
                                event_2 = offlinedata[i];
                                // Find the matching eventid
                                if (event_2.eventid === this.navParams.get("EventDetails_eventId").event_id) {
                                    if (eventsttend) {
                                        event_2.eventAttend.DATA = eventsttend;
                                    }
                                    if (bulkpayload) {
                                        event_2.bulkattendpayload = bulkpayload;
                                    }
                                    if (singlepayload) {
                                        if (singlepayload == '1') {
                                            event_2.singlepayload = [];
                                        }
                                        else {
                                            event_2.singlepayload = singlepayload;
                                        }
                                    }
                                    if (rollstatuspayload) {
                                        event_2.rollstatuspayload = rollstatuspayload;
                                    }
                                    if (rollstatus) {
                                        event_2.rollstatus = rollstatus;
                                    }
                                }
                            }
                        }
                        console.log("singlpayload check", singlepayload);
                        this.storage.set("attendanceevents", offlinedata);
                        this.getknowdta();
                        return [2 /*return*/];
                }
            });
        });
    };
    EventDashboardNewPage.prototype.getknowdta = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get("attendanceevents")];
                    case 1:
                        data = (_a.sent()) || [];
                        console.log("afterbulkstorae", data);
                        return [2 /*return*/];
                }
            });
        });
    };
    EventDashboardNewPage.prototype.presentCloseroll = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "<p>CLOSE ROLL</p>",
            message: "<div><p>You are about to close the roll for this event.</p></div><div><p>If necessary, you can re-open and update the roll.</p></div>",
            cssClass: "close-roll-modal",
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: "CANCEL",
                    role: "cancel",
                    cssClass: "modal-cancel",
                    handler: function () {
                        console.log("Cancel clicked");
                    },
                },
                {
                    text: "CLOSE ROLL",
                    cssClass: "modal-submit",
                    handler: function () {
                        console.log("Buy clicked");
                        _this.rollstatus = "ROLL CLOSED";
                        _this.rollStatusChange(_this.navParams.get("EventDetails_eventId").event_id, "2");
                    },
                },
            ],
        });
        alert.present();
    };
    EventDashboardNewPage.prototype.presentLwCloseroll = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '<p class="m-0">LEAVE WITHOUT CLOSING ROLL?</p>',
            message: "<div><p>You are about to leave without closing the roll.</p></div>",
            cssClass: "closelw-roll-modal",
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: "LEAVE",
                    role: "cancel",
                    cssClass: "modal-cancel",
                    handler: function () {
                        console.log("Cancel clicked");
                        _this.navCtrl.pop();
                    },
                },
                {
                    text: "CLOSE ROLL",
                    cssClass: "modal-submit",
                    handler: function () {
                        console.log("Buy clicked");
                        _this.rollstatus = "ROLL CLOSED";
                        _this.rollStatusChange(_this.navParams.get("EventDetails_eventId").event_id, "2");
                    },
                },
            ],
        });
        alert.present();
    };
    EventDashboardNewPage.prototype.getDefaultDataLoad = function () {
        var _this = this;
        this.storage.get("FunctionAccess").then(function (val) {
            _this.FunctionAccess = val;
            _this.storage.get("loggedInUserData").then(function (val) {
                var _a, _b, _c, _d, _e;
                _this.PersonData = val;
                _this.coachDetails[0] = val;
                console.log(_this.FunctionAccess);
                _this.getrollstatus(_this.PersonData);
                if (_this.navParams.get("EventDetails_eventId")) {
                    _this.UpcomingSingleEvent = _this.navParams.get("EventDetails_eventId");
                    _this.storage.set("UpcomingSingleEvent", JSON.stringify(_this.UpcomingSingleEvent));
                    _this.event_id = _this.UpcomingSingleEvent.event_id;
                    _this.selectedTeam = (_a = _this.PersonData) === null || _a === void 0 ? void 0 : _a.SELECTEDTEAM;
                    if (_this.UpcomingSingleEvent.event_type_id == 2 &&
                        _this.UpcomingSingleEvent.teamid) {
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
                    if (((_b = _this.FunctionAccess) === null || _b === void 0 ? void 0 : _b.event_Welfare) == "yes" &&
                        _this.UpcomingSingleEvent.welfare_question == 1) {
                        $(".top_tab").find(".Welfare_tab").css("display", "inherit");
                        _this.ShowWelfare = true;
                        console.log(" this.ShowWelfare", _this.ShowWelfare);
                        console.log("this.FunctionAccess.event_Welfare", (_c = _this.FunctionAccess) === null || _c === void 0 ? void 0 : _c.event_Welfare);
                        console.log("this.UpcomingSingleEvent.welfare_question", _this.UpcomingSingleEvent.welfare_question);
                    }
                    if ((((_d = _this.FunctionAccess) === null || _d === void 0 ? void 0 : _d.event_Result) == "yes" ||
                        _this.FunctionAccess.voting_for_player != "no") &&
                        _this.UpcomingSingleEvent.event_type_id != 2) {
                        $(".top_tab").find(".Result_tab").css("display", "inherit");
                        _this.ShowResult = true;
                        console.log("this.FunctionAccess.event_Result", (_e = _this.FunctionAccess) === null || _e === void 0 ? void 0 : _e.event_Result);
                    }
                    var active_tab = _this.navParams.get("ActiveTab")
                        ? _this.navParams.get("ActiveTab")
                        : "Attendance";
                    _this.segments = active_tab;
                    _this.AutoSegments = { value: _this.segments };
                    _this.segmentChanged(_this.AutoSegments);
                }
                else {
                    _this.storage.get("UpcomingSingleEvent").then(function (val) {
                        var _a, _b, _c;
                        _this.UpcomingSingleEvent = JSON.parse(val);
                        _this.event_id = _this.UpcomingSingleEvent.event_id;
                        _this.selectedTeam = _this.PersonData.SELECTEDTEAM;
                        if (_this.UpcomingSingleEvent.event_type_id == 2 &&
                            _this.UpcomingSingleEvent.teamid) {
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
                        if (((_a = _this.FunctionAccess) === null || _a === void 0 ? void 0 : _a.event_Welfare) == "yes" &&
                            _this.UpcomingSingleEvent.welfare_question == 1) {
                            $(".top_tab").find(".Welfare_tab").css("display", "inherit");
                            _this.ShowWelfare = true;
                            console.log(" this.ShowWelfare", _this.ShowWelfare);
                            console.log("this.FunctionAccess.event_Welfare", (_b = _this.FunctionAccess) === null || _b === void 0 ? void 0 : _b.event_Welfare);
                            console.log("this.UpcomingSingleEvent.welfare_question", _this.UpcomingSingleEvent.welfare_question);
                        }
                        if ((((_c = _this.FunctionAccess) === null || _c === void 0 ? void 0 : _c.event_Result) == "yes" ||
                            _this.FunctionAccess.voting_for_player != "no") &&
                            _this.UpcomingSingleEvent.event_type_id != 2) {
                            $(".top_tab").find(".Result_tab").css("display", "inherit");
                            _this.ShowResult = true;
                        }
                        var active_tab = _this.navParams.get("ActiveTab")
                            ? _this.navParams.get("ActiveTab")
                            : "Attendance";
                        _this.segments = active_tab;
                        _this.AutoSegments = { value: _this.segments };
                        _this.segmentChanged(_this.AutoSegments);
                    });
                }
            });
        });
    };
    EventDashboardNewPage.prototype.segmentChanged = function (event) {
        var _this = this;
        console.log(this.segments);
        this.isOffline = false;
        if (event.value == "Attendance") {
            // this.segments='Attendance'
            /* let loader = this.loadingCtrl.create({});
              loader.present(); */
            // this.getPersonDetail().then((z) => {
            //   if (z) {
            this.getOperooStatus();
            this.getAttendingDetails();
            this.getEventDetails().then(function (x) {
                if (x) {
                    _this.AllPlayersLoad().then(function (y) {
                        if (y) {
                            _this.isLoaded = true;
                        }
                        else {
                            _this.isOffline = true;
                        }
                    });
                }
                else {
                    _this.isOffline = true;
                }
            });
            //   }
            // });
        }
        else if (event.value == "Welfare") {
            // this.segments='Welfare'
            var loader_1 = this.loadingCtrl.create();
            loader_1.present();
            // this.getPersonDetail().then((y) => {
            this.getEventDetails().then(function (y) {
                if (y) {
                    _this.displayFunction().then(function (x) {
                        if (x) {
                            setTimeout(function () {
                                loader_1.dismiss();
                            }, 100);
                        }
                    });
                }
            });
        }
        // else if(event.value=='Welfare'){
        //   this.segments='Welfare'
        // }
        else if (event.value == "Result") {
            // this.segments='Result'
            this.loadDataFromAPIs();
            this.loader = this.loadingCtrl.create({});
            this.loader.present();
        }
    };
    EventDashboardNewPage.prototype.goToChooseTeamsPage = function () {
        this.navCtrl.push("ChooseTeamProfilePage");
    };
    EventDashboardNewPage.prototype.highlightMenuIcon = function () {
        // $('.tabs .tab-button[aria-selected=true]:nth-child(1)').attr('aria-selected','false')
        $(".tabs .tab-button[aria-selected=false]:nth-child(2)").attr("aria-selected", "true");
        $(".tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon").css({
            "mask-image": "url(../assets/images/menu/home.svg)",
            height: "22px",
            color: "#dedede",
        });
        // $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': 'url(../assets/images/menu/events-blue.svg)',
        // 'height': '36px',
        // 'color': '#43B7CC'})
    };
    EventDashboardNewPage.prototype.unhighlightMenuIcon = function () {
        if (!this.showEvent) {
            console.log(";ll");
            // this.navCtrl.pop()
            $(".tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon").css({
                "mask-image": "",
                height: "",
                color: "",
            });
            // $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': '',
            // 'height': '',
            // 'color': ''})
            $(".tab-button-icon")
                .closest(".tabs .tab-button[aria-selected=true]:nth-child(1) .activated")
                .css({
                "mask-image": "",
                height: "",
                color: "",
            });
            $(".tabs .tab-button[aria-selected=true]:nth-child(2)").attr("aria-selected", "false");
        }
    };
    EventDashboardNewPage.prototype.ionViewDidEnter = function () {
        this.highlightMenuIcon();
    };
    EventDashboardNewPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.highlightMenuIcon();
        this.storage.get("BackButton").then(function (val) {
            _this.BackButton = val;
        });
    };
    EventDashboardNewPage.prototype.ionViewWillLeave = function () {
        this.unhighlightMenuIcon();
    };
    EventDashboardNewPage.prototype.getOperooProfile = function () {
        var _this = this;
        return new Promise(function (resolve) {
            // console.log('this.PersonData', this.PersonData)
            var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]().set("school_id", "").set("club_id", "7742");
            _this.http
                .post(_this.global.APIURL + "users/getOperooProfile", Data, {
                headers: _this.global_api.getHeader(),
            })
                .subscribe(function (data) {
                console.log("operoodata", data);
                resolve(true);
            }, function (error) { });
        });
    };
    EventDashboardNewPage.prototype.getAttendingDetails = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var _a, _b, _c;
            var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set("event_id", _this.UpcomingSingleEvent.event_id)
                .set("client_id", _this.UpcomingSingleEvent.client_id)
                .set("person_id", (_a = _this.PersonData) === null || _a === void 0 ? void 0 : _a.PERSON_ID)
                .set("first_name", (_b = _this.PersonData) === null || _b === void 0 ? void 0 : _b.FIRST_NAME)
                .set("last_name", (_c = _this.PersonData) === null || _c === void 0 ? void 0 : _c.LAST_NAME)
                .set("selectedTeam", _this.selectedTeam);
            _this.http
                .post(_this.global.APIURL + "players/getPlayerAttending", Data, {
                headers: _this.global_api.getHeader(),
            })
                .subscribe(function (data) {
                _this.reason_options_list.push(data.GETPLAYERATTENDING[0].reason_options_list);
                _this.storage.set("playerslist", _this.reason_options_list);
                resolve(true);
            }, function (error) { });
        });
    };
    EventDashboardNewPage.prototype.getOperooData = function (playerData) {
        var _this = this;
        return new Promise(function (resolve) {
            var _a;
            var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set("person_id", playerData === null || playerData === void 0 ? void 0 : playerData.person_id)
                .set("club_id", (_a = _this.PersonData) === null || _a === void 0 ? void 0 : _a.CLUB_ID);
            _this.http
                .post(_this.global.APIURL + "users/getOperooProfile", Data, {
                headers: _this.global_api.getHeader(),
            })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) { });
        });
    };
    EventDashboardNewPage.prototype.getOperooStatus = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var _a;
            var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]().set("clubid", (_a = _this.PersonData) === null || _a === void 0 ? void 0 : _a.CLUB_ID);
            _this.http
                .post(_this.global.APIURL + "incidents/checkUsingOperoo", Data, {
                headers: _this.global_api.getHeader(),
            })
                .subscribe(function (data) {
                console.log("operoo status data", data);
                if (data && data.SUCCESS) {
                    // this.OperooStatus = 1;
                    _this.OperooStatus = data.USE_OPEROO;
                }
                resolve(true);
            }, function (error) { });
        });
    };
    EventDashboardNewPage.prototype.gotoResults = function () {
        this.gFn.gotoResults();
        this.showEvent = true;
    };
    EventDashboardNewPage.prototype.gotoWelfare = function () {
        this.gFn.gotoWelfare();
        this.showEvent = true;
    };
    EventDashboardNewPage.prototype.getEventDetails = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set("event_id", _this.UpcomingSingleEvent.event_id)
                .set("event_type_id", _this.UpcomingSingleEvent.event_type_id)
                .set("clientTimeZone", _this.PersonData.CLIENTTIMEZONE ? _this.PersonData.CLIENTTIMEZONE : "")
                .set("selectedTeam", _this.selectedTeam)
                .set("client_id", _this.UpcomingSingleEvent.client_id);
            _this.http
                .post(_this.global.APIURL + "events/getEventDetails", loginData, {
                headers: _this.global_api.getHeader(),
            })
                .subscribe(function (response) {
                _this.arrDetail = response.GETEVENTDETAILS;
                _this.homeAwayText = response.GETEVENTDETAILS[0]["ishometeam"]
                    ? "Home"
                    : "Away";
                _this.storage.set("EventDetails", _this.arrDetail);
                _this.storageset(_this.arrDetail, "", "", "", "");
                for (var _i = 0, _a = _this.arrDetail; _i < _a.length; _i++) {
                    var keys = _a[_i];
                    _this.key = keys;
                    _this.date = _this.key.date.split("/")[0];
                    _this.groundAdress = _this.key.ground_address;
                    _this.groundState = _this.key.ground_state;
                    _this.longitude = _this.key.geoloc_longitude;
                    _this.latitude = _this.key.geoloc_latitude;
                }
                if (response.GETEVENTDETAILS.length > 0) {
                    _this.scoreIsUpdated = response.GETEVENTDETAILS[0]["isUpdated"];
                    _this.scoreHome = _this.getPrefixedNumber(response.GETEVENTDETAILS[0]["homescore"]);
                    _this.scoreAway = _this.getPrefixedNumber(response.GETEVENTDETAILS[0]["awayscore"]);
                    _this.reportText = response.GETEVENTDETAILS[0]["ishometeam"]
                        ? response.GETEVENTDETAILS[0]["report_home"]
                        : response.GETEVENTDETAILS[0]["report_away"];
                    _this.homeAwayText = response.GETEVENTDETAILS[0]["ishometeam"]
                        ? "Home"
                        : "Away";
                    if (response.GETEVENTDETAILS[0]["washout"] == "1") {
                        _this.gameDismissed = "washout";
                        $(".radio-game-dismissed").each(function () {
                            if ($(this).val() == "washout")
                                $(this).attr("checked", "checked");
                            $(".radio").find(".Washout").addClass("HighLight");
                        });
                    }
                    else if (response.GETEVENTDETAILS[0]["forfeit"] == "1") {
                        _this.gameDismissed = "forfeit";
                        $(".radio-game-dismissed").each(function () {
                            if ($(this).val() == "forfeit")
                                $(this).attr("checked", "checked");
                            $(".radio").find(".forfeit").addClass("HighLight");
                        });
                    }
                    else {
                        _this.gameDismissed = "";
                    }
                }
                resolve(true);
            }, function (error) {
                resolve(false);
            });
        });
    };
    EventDashboardNewPage.prototype.storageset = function (value, roll, eventattend, rollstatuspayload, bulkattendpayload) {
        for (var i = 0; i < this.existingEvents.length; i++) {
            var event_3 = this.existingEvents[i];
            // Find the matching eventid
            if (event_3.eventid === this.navParams.get("EventDetails_eventId").event_id) {
                // Update this condition with the appropriate eventid
                if (value) {
                    event_3.EventDetails = value;
                }
                else if (roll) {
                    event_3.rollstatus = roll;
                }
                else if (eventattend) {
                    event_3.eventAttend = eventattend;
                }
                else if (rollstatuspayload) {
                    event_3.rollstatuspayload = rollstatuspayload;
                }
                else if (bulkattendpayload) {
                    event_3.bulkattendpayload = bulkattendpayload;
                }
                break; // Exit the loop since we found and updated the event
            }
        }
        this.storage.set("attendanceevents", this.existingEvents);
        this.getknowdta();
    };
    EventDashboardNewPage.prototype.eventState = function (eventVal, event) {
        var _this = this;
        setTimeout(function () {
            if (_this.filterButton == eventVal) {
                _this.filterState = 0;
                _this.filterButton = "";
                _this.notifyFlag = "";
                //loader.dismiss()
            }
            else {
                _this.filterButton = eventVal;
                _this.filterState = 1;
            }
            _this.combinedPlayersArray = [];
            _this.combinedBorrowedPlayersArray = [];
            if (eventVal == "Going" && _this.filterState == 1) {
                _this.notifyFlag = 0;
                _this.DupeventAttendsec[0] = _this.eventAttend[0];
                _this.DupeventAttendsec[1] =
                    _this.DupeventAttendsec[2] =
                        _this.DupeventAttendsec[3] =
                            [];
                _this.DupEventAttendSecBorrowed[0] = _this.BorrowedPlayerPresent[0];
                _this.DupEventAttendSecBorrowed[1] =
                    _this.DupEventAttendSecBorrowed[2] =
                        _this.DupEventAttendSecBorrowed[3] =
                            [];
                $(event.target)
                    .closest(".radial-progressbar")
                    .find(".Going")
                    .removeClass("inactive");
                $(event.target)
                    .closest(".radial-progressbar")
                    .find(".MayBe")
                    .addClass("inactive");
                $(event.target)
                    .closest(".radial-progressbar")
                    .find(".NotGoing")
                    .addClass("inactive");
                $(event.target)
                    .closest(".radial-progressbar")
                    .find(".NoResponse")
                    .addClass("inactive");
                _this.GoingColor = "#68E048";
                _this.NoResponseColor = _this.NotGoingColor = _this.MaybeColor = "#404C62";
                //loader.dismiss()
            }
            else if (eventVal == "Maybe" && _this.filterState == 1) {
                _this.notifyFlag = 3;
                _this.DupeventAttendsec[0] = _this.eventAttend[3];
                _this.DupeventAttendsec[3] =
                    _this.DupeventAttendsec[2] =
                        _this.DupeventAttendsec[1] =
                            [];
                _this.DupEventAttendSecBorrowed[0] = _this.BorrowedPlayerPresent[3];
                _this.DupEventAttendSecBorrowed[3] =
                    _this.DupEventAttendSecBorrowed[2] =
                        _this.DupEventAttendSecBorrowed[1] =
                            [];
                $(event.target)
                    .closest(".radial-progressbar")
                    .find(".MayBe")
                    .removeClass("inactive");
                $(event.target)
                    .closest(".radial-progressbar")
                    .find(".Going")
                    .addClass("inactive");
                $(event.target)
                    .closest(".radial-progressbar")
                    .find(".NotGoing")
                    .addClass("inactive");
                $(event.target)
                    .closest(".radial-progressbar")
                    .find(".NoResponse")
                    .addClass("inactive");
                _this.MaybeColor = "#2BBFF0";
                _this.NoResponseColor = _this.NotGoingColor = _this.GoingColor = "#404C62";
                //loader.dismiss()
            }
            else if (eventVal == "Not going" && _this.filterState == 1) {
                _this.notifyFlag = 1;
                _this.DupeventAttendsec[0] = _this.eventAttend[1];
                _this.DupeventAttendsec[3] =
                    _this.DupeventAttendsec[2] =
                        _this.DupeventAttendsec[1] =
                            [];
                _this.DupEventAttendSecBorrowed[0] = _this.BorrowedPlayerPresent[1];
                _this.DupEventAttendSecBorrowed[3] =
                    _this.DupEventAttendSecBorrowed[2] =
                        _this.DupEventAttendSecBorrowed[1] =
                            [];
                console.log("DupeventAttendsec 497", _this.DupeventAttendsec);
                $(event.target)
                    .closest(".radial-progressbar")
                    .find(".NotGoing")
                    .removeClass("inactive");
                $(event.target)
                    .closest(".radial-progressbar")
                    .find(".MayBe")
                    .addClass("inactive");
                $(event.target)
                    .closest(".radial-progressbar")
                    .find(".Going")
                    .addClass("inactive");
                $(event.target)
                    .closest(".radial-progressbar")
                    .find(".NoResponse")
                    .addClass("inactive");
                _this.NotGoingColor = "#D80000";
                _this.NoResponseColor = _this.MaybeColor = _this.GoingColor = "#404C62";
                //loader.dismiss()
            }
            else if (eventVal == "No response" && _this.filterState == 1) {
                _this.notifyFlag = 2;
                _this.DupeventAttendsec[0] = _this.eventAttend[2];
                _this.DupeventAttendsec[1] =
                    _this.DupeventAttendsec[2] =
                        _this.DupeventAttendsec[3] =
                            [];
                _this.DupEventAttendSecBorrowed[0] = _this.BorrowedPlayerPresent[2];
                _this.DupEventAttendSecBorrowed[1] =
                    _this.DupEventAttendSecBorrowed[2] =
                        _this.DupEventAttendSecBorrowed[3] =
                            [];
                $(event.target)
                    .closest(".radial-progressbar")
                    .find(".NoResponse")
                    .removeClass("inactive");
                $(event.target)
                    .closest(".radial-progressbar")
                    .find(".MayBe")
                    .addClass("inactive");
                $(event.target)
                    .closest(".radial-progressbar")
                    .find(".NotGoing")
                    .addClass("inactive");
                $(event.target)
                    .closest(".radial-progressbar")
                    .find(".Going")
                    .addClass("inactive");
                _this.NoResponseColor = "#F59044";
                _this.NotGoingColor = _this.MaybeColor = _this.GoingColor = "#404C62";
                //loader.dismiss()
            }
            _this.CheckEmptyBorrowedPlayer();
        }, 100);
        //this.CheckEmptyBorrowedPlayer(eventVal);
    };
    EventDashboardNewPage.prototype.CheckEmptyBorrowedPlayer = function () {
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
    EventDashboardNewPage.prototype.SinglePlayersAttdStates = function (confirm, attended, reason, AttendyPersonId, event) {
        var _this = this;
        if (this.PersonData.ADMINLEVEL !== 3) {
            var reasondeclined = "";
            var reasondeclined_by_coach = "";
            var unsetAttendance = "0";
            if ($(event.target).hasClass("SelectedReason")) {
                unsetAttendance = "1";
            }
            if (this.FunctionAccess.user_adminLevel == 4) {
                if (confirm == "Y") {
                    confirm = "YES";
                    attended = 1;
                }
                else if (confirm == "N") {
                    confirm = "NO";
                    attended = 0;
                }
                reasondeclined = reason;
            }
            else if (this.FunctionAccess.user_adminLevel != 4) {
                if (confirm == "Y") {
                    confirm = "YES";
                    attended = 1;
                }
                else if (confirm == "N") {
                    confirm = "NO";
                    attended = 0;
                }
                reasondeclined_by_coach = reason;
            }
            var loader_2 = this.loadingCtrl.create({});
            loader_2.present();
            var target = event.target;
            var loginData4 = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set("event_id", this.UpcomingSingleEvent.event_id)
                .set("personId", AttendyPersonId)
                .set("attended", attended)
                .set("confirmed", confirm)
                .set("reasondeclined", reasondeclined)
                .set("reasondeclined_by_coach", reasondeclined_by_coach)
                .set("unsetAttendance", unsetAttendance)
                .set("state_time", "")
                .set("selectedTeam", this.selectedTeam);
            this.http
                .post(this.global.APIURL + "events/saveSinglePlayersAttdStates", loginData4, { headers: this.global_api.getHeader() })
                .subscribe(function (data) {
                // firebase event
                if (data.SUCCESS) {
                    if (_this.FunctionAccess.user_adminLevel == 4) {
                        _this.logger.DashboardPlayerReason("PlayerAttendReasonSelect", {
                            pram: Date.now(),
                        });
                    }
                    else if (_this.FunctionAccess.user_adminLevel != 4) {
                        _this.logger.CoachArrowAttd_Mark("CoachArrowAttd_Mark", {
                            pram: Date.now(),
                        });
                    }
                    _this.vibration.vibrate(500);
                }
                _this.resetColors(event);
                _this.AllPlayersLoad().then(function (y) {
                    if (y) {
                        loader_2.dismiss();
                    }
                });
            }, function (error) { });
        }
    };
    EventDashboardNewPage.prototype.ArrowFunctionality = function (event) {
        if (this.Arrowflag == false) {
            var target = event.target;
            $(target).closest(".row").find("ul").show();
            if (this.FunctionAccess.user_adminLevel == 4) {
                $(target).closest(".row").find("ul").addClass("Div-Arrow");
            }
            $(target)
                .closest(".row")
                .find(".collapsed-arrow")
                .removeClass("ArrowLight");
            $(target).closest(".row").find(".collapsed-arrow").addClass("ArrowDark");
            this.Arrowflag = true;
        }
        else if (this.Arrowflag == true) {
            var target = event.target;
            $(target).closest(".row").find("ul").hide();
            $(target)
                .closest(".row")
                .find(".collapsed-arrow")
                .removeClass("ArrowDark");
            $(target).closest(".row").find(".collapsed-arrow").addClass("ArrowLight");
            this.Arrowflag = false;
        }
    };
    EventDashboardNewPage.prototype.hideAttendanceList = function (event) {
        var target = event.target;
        if (!$(target).hasClass("collapsed-arrow") &&
            $("ul.dropdown-menu.card-dropdown:visible").length) {
            $(".collapsed-arrow").removeClass("ArrowDark").addClass("ArrowLight");
            $("ul.dropdown-menu.card-dropdown").hide();
            this.Arrowflag = false;
        }
    };
    EventDashboardNewPage.prototype.goToTimesheet = function () {
        this.navCtrl.push("TimesheetPage");
        this.showEvent = true;
    };
    EventDashboardNewPage.prototype.borrow_player = function () {
        this.navCtrl.push("BorrowedPlayerPage", {
            UpcomingSingleEvent: JSON.stringify(this.UpcomingSingleEvent),
        });
        this.showEvent = true;
    };
    EventDashboardNewPage.prototype.notify_player = function () {
        this.navCtrl.push("NotifyPlayersPage", {
            notifyFlag: this.notifyFlag,
            UpcomingSingleEvent: JSON.stringify(this.UpcomingSingleEvent),
        });
        this.showEvent = true;
    };
    EventDashboardNewPage.prototype.WelfarePlayerQuestion = function (event) {
        var _this = this;
        this.showEvent = true;
        var Data = Object.keys(this.PersonData).reduce(function (c, k) { return ((c[k.toLowerCase()] = _this.PersonData[k]), c); }, {});
        this.navCtrl.push("PlayerQuestionPage", { Player_detail: Data });
    };
    EventDashboardNewPage.prototype.gotoGroupMessage = function () {
        this.showEvent = true;
        /*let GroupMessageModal = this.modalCtrl.create('EventGroupMessagePage', { Array: this.DupeventAttendLen });
          GroupMessageModal.onDidDismiss(data => {
          });
          GroupMessageModal.present();*/
        this.navCtrl.push("EventGroupSendMessagePage", {
            notifyFlag: this.notifyFlag,
        });
    };
    EventDashboardNewPage.prototype.gotoSessionPlan = function () {
        this.navCtrl.push("EventSessionPlanPage");
    };
    EventDashboardNewPage.prototype.gotoInjuredList = function () {
        var _a;
        this.showEvent = true;
        if (this.FunctionAccess.event_Injury == "self") {
            this.navCtrl.push("InjuryIncidentReportPage", {
                injured_person_id: (_a = this.PersonData) === null || _a === void 0 ? void 0 : _a.PERSON_ID,
            });
        }
        else {
            this.navCtrl.push("InjuredListPage");
        }
    };
    // gotoReqAttendance(){
    //   this.navCtrl.push('AlertDashboardPage')
    // }
    EventDashboardNewPage.prototype.AllPlayersLoad = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var PlayersData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set("event_id", _this.UpcomingSingleEvent.event_id)
                .set("client_id", _this.UpcomingSingleEvent.client_id) //this.PersonData.CLIENT_ID
                .set("selectedTeam", _this.selectedTeam) //this.PersonData.SELECTEDTEAM
                .set("personId", _this.PersonData.PERSON_ID ? _this.PersonData.PERSON_ID : "");
            _this.http
                .post(_this.global.APIURL + "players/AllLoadPlayersAttendance", PlayersData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                _this.eventAttend = data.DATA;
                _this.storage.set("eventAttend", data);
                _this.storageset("", "", data, "", "");
                _this.BorrowedPlayerPresent = data.DATA_BORROWED;
                _this.ArrangePlayers();
                _this.CheckEmptyBorrowedPlayer();
                resolve(true);
            }, function (error) {
                resolve(false);
            });
        });
    };
    EventDashboardNewPage.prototype.ArrangePlayersOffline = function (eventAttend) {
        var _a, _b, _c, _d, _e;
        this.eventAttend = eventAttend;
        this.DupeventAttendLen = [];
        this.DupEventAttendSecBorrowed = [];
        this.percentArray = [];
        this.combinedPlayersArray = [];
        this.combinedBorrowedPlayersArray = [];
        var key, key1;
        for (key in eventAttend) {
            this.DupeventAttendsec[key] = [];
            for (key1 in this.eventAttend[key]) {
                if (this.eventAttend[key][key1].person_id == ((_a = this.PersonData) === null || _a === void 0 ? void 0 : _a.PERSON_ID)) {
                    this.eventAttend[key][key1].attendanceStatus = 1; //just for testing
                    this.DupeventAttendsec[0].unshift(this.eventAttend[key][key1]);
                    if (this.eventAttend[key][key1].attendanceStatus in [0, 1]) {
                        this.SymbolAlert = true;
                    }
                }
                else {
                    // this.SymbolAlert=true
                    this.DupeventAttendsec[key].push(this.eventAttend[key][key1]);
                }
                if (key < 3) {
                    this.combinedPlayersArray.push(this.eventAttend[key][key1]);
                }
            }
            this.DupeventAttendLen[key] = this.DupeventAttendsec[key].length;
        }
        this.combinedPlayersArray.sort(function (a, b) {
            var x = a.first_name.toLowerCase() + " " + a.last_name.toLowerCase();
            var y = b.first_name.toLowerCase() + " " + b.last_name.toLowerCase();
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
            if (((_b = this.PersonData) === null || _b === void 0 ? void 0 : _b.PERSON_ID) && this.combinedPlayersArray[key3].person_id == ((_c = this.PersonData) === null || _c === void 0 ? void 0 : _c.PERSON_ID)) {
                this.combinedPlayersArray.unshift(this.combinedPlayersArray[key3]);
                this.combinedPlayersArray.splice(parseInt(key3) + 1, 1);
            }
        }
        // console.log('bh',this.combinedPlayersArray)
        for (key in this.BorrowedPlayerPresent) {
            this.DupEventAttendSecBorrowed[key] = [];
            for (key1 in this.BorrowedPlayerPresent[key]) {
                if (((_d = this.PersonData) === null || _d === void 0 ? void 0 : _d.PERSON_ID) && this.BorrowedPlayerPresent[key][key1].person_id == ((_e = this.PersonData) === null || _e === void 0 ? void 0 : _e.PERSON_ID)) {
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
            var x = a.first_name.toLowerCase() + " " + a.last_name.toLowerCase();
            var y = b.first_name.toLowerCase() + " " + b.last_name.toLowerCase();
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });
        var totalPlayerCount = this.eventAttend[0].length +
            this.eventAttend[1].length +
            this.eventAttend[2].length;
        totalPlayerCount +=
            this.BorrowedPlayerPresent[0].length +
                this.BorrowedPlayerPresent[1].length +
                this.BorrowedPlayerPresent[2].length;
        this.DupeventAttendLen.push(totalPlayerCount);
        for (key in this.eventAttend) {
            this.percentArray.push((this.DupeventAttendLen[key] / totalPlayerCount) * 100);
            this.DupeventAttendLen[key] = this.zero_pad(this.DupeventAttendLen[key]);
        }
    };
    EventDashboardNewPage.prototype.ArrangePlayers = function () {
        var _a, _b, _c, _d, _e, _f;
        this.DupeventAttendLen = [];
        this.DupEventAttendSecBorrowed = [];
        this.percentArray = [];
        this.combinedPlayersArray = [];
        this.combinedBorrowedPlayersArray = [];
        var key, key1;
        for (key in this.eventAttend) {
            this.DupeventAttendsec[key] = [];
            for (key1 in this.eventAttend[key]) {
                if (((_a = this.PersonData) === null || _a === void 0 ? void 0 : _a.PERSON_ID) && this.eventAttend[key][key1].person_id == ((_b = this.PersonData) === null || _b === void 0 ? void 0 : _b.PERSON_ID)) {
                    this.eventAttend[key][key1].attendanceStatus = 1; //just for testing
                    this.DupeventAttendsec[0].unshift(this.eventAttend[key][key1]);
                    if (this.eventAttend[key][key1].attendanceStatus in [0, 1]) {
                        this.SymbolAlert = true;
                    }
                }
                else {
                    // this.SymbolAlert=true
                    this.DupeventAttendsec[key].push(this.eventAttend[key][key1]);
                }
                if (key < 3) {
                    this.combinedPlayersArray.push(this.eventAttend[key][key1]);
                }
            }
            this.DupeventAttendLen[key] = this.DupeventAttendsec[key].length;
        }
        this.combinedPlayersArray.sort(function (a, b) {
            var x = a.first_name.toLowerCase() + " " + a.last_name.toLowerCase();
            var y = b.first_name.toLowerCase() + " " + b.last_name.toLowerCase();
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
            if (((_c = this.PersonData) === null || _c === void 0 ? void 0 : _c.PERSON_ID) && this.combinedPlayersArray[key3].person_id == ((_d = this.PersonData) === null || _d === void 0 ? void 0 : _d.PERSON_ID)) {
                this.combinedPlayersArray.unshift(this.combinedPlayersArray[key3]);
                this.combinedPlayersArray.splice(parseInt(key3) + 1, 1);
            }
        }
        // console.log('bh',this.combinedPlayersArray)
        for (key in this.BorrowedPlayerPresent) {
            this.DupEventAttendSecBorrowed[key] = [];
            for (key1 in this.BorrowedPlayerPresent[key]) {
                if (((_e = this.PersonData) === null || _e === void 0 ? void 0 : _e.PERSON_ID) && this.BorrowedPlayerPresent[key][key1].person_id == ((_f = this.PersonData) === null || _f === void 0 ? void 0 : _f.PERSON_ID)) {
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
        if (this.combinedBorrowedPlayersArray.length > 0) {
            this.combinedBorrowedPlayersArray.sort(function (a, b) {
                var x = a.first_name.toLowerCase() + " " + a.last_name.toLowerCase();
                var y = b.first_name.toLowerCase() + " " + b.last_name.toLowerCase();
                if (x < y) {
                    return -1;
                }
                if (x > y) {
                    return 1;
                }
                return 0;
            });
        }
        var totalPlayerCount = this.eventAttend[0].length +
            this.eventAttend[1].length +
            this.eventAttend[2].length;
        totalPlayerCount +=
            this.BorrowedPlayerPresent[0].length +
                this.BorrowedPlayerPresent[1].length +
                this.BorrowedPlayerPresent[2].length;
        this.DupeventAttendLen.push(totalPlayerCount);
        for (key in this.eventAttend) {
            this.percentArray.push((this.DupeventAttendLen[key] / totalPlayerCount) * 100);
            this.DupeventAttendLen[key] = this.zero_pad(this.DupeventAttendLen[key]);
        }
    };
    EventDashboardNewPage.prototype.resetColors = function (event) {
        this.notifyFlag = "";
        this.GoingColor = "#68E048";
        this.MaybeColor = "#2BBFF0";
        this.NotGoingColor = "#D80000";
        this.NoResponseColor = "#F59044";
        $(".radial-progressbar")
            .find(".NoResponse,.MayBe,.NotGoing,.Going")
            .removeClass("inactive");
        this.ArrangePlayers();
        this.hideAttendanceList(event);
        this.CheckEmptyBorrowedPlayer();
    };
    EventDashboardNewPage.prototype.backArrow = function () {
        /* this.app.getRootNav().getActiveChildNav().select(1).then(() => {
            $('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected', 'true')
          }); */
        if (this.rollstatus == "ROLL OPEN") {
            this.presentLwCloseroll();
        }
        else {
            this.navCtrl.pop();
        }
    };
    EventDashboardNewPage.prototype.zero_pad = function (num) {
        var s = num + "";
        while (s.length < 2)
            s = "0" + s;
        return s;
    };
    EventDashboardNewPage.prototype.AttendanceMark = function (event, Attendance, AttendyPersonId, attendy) {
        return __awaiter(this, void 0, void 0, function () {
            var attended, index, removedObj, index, removedItem, data, i, j, data, attended;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.network.type === "none" || navigator.onLine === false)) return [3 /*break*/, 6];
                        this.storage.set("offline", 1);
                        if (!((Attendance == "" || Attendance == null || Attendance == 0) &&
                            this.FunctionAccess.user_adminLevel != 4)) return [3 /*break*/, 1];
                        attended = 1;
                        $(event.target).removeClass("AbsentCheckbox1");
                        $(event.target).addClass("PresentCheckbox1");
                        index = this.eventAttend[2].findIndex(function (obj) { return obj.person_id === attendy.person_id; });
                        if (index !== -1) {
                            removedObj = this.eventAttend[2].splice(index, 1)[0];
                            removedObj.state = 1;
                            // Add the removed object to the beginning of data[0]
                            this.eventAttend[0].unshift(removedObj);
                        }
                        this.AttendanceReport(attended, AttendyPersonId, "0");
                        return [3 /*break*/, 5];
                    case 1:
                        if (!((Attendance == "" || Attendance == null || Attendance == 1) &&
                            this.FunctionAccess.user_adminLevel != 4)) return [3 /*break*/, 3];
                        attended = 2;
                        $(event.target).removeClass("PresentCheckbox1");
                        $(event.target).removeClass("AbsentCheckbox1");
                        $(event.target).addClass("NoneCheckbox1");
                        index = this.eventAttend[0].findIndex(function (item) { return item.person_id === attendy.person_id; });
                        if (index !== -1) {
                            removedItem = this.eventAttend[0].splice(index, 1)[0];
                            // Add the object to the third array
                            removedItem.attended = 2; // Set attended based on event
                            removedItem.state = 3;
                            console.log("this.eventAttend", removedItem);
                            this.eventAttend[2].push(removedItem);
                        }
                        this.AttendanceReport(attended, AttendyPersonId, "0");
                        return [4 /*yield*/, this.storage.get("attendanceevents")];
                    case 2:
                        data = (_a.sent()) || [];
                        return [3 /*break*/, 5];
                    case 3:
                        if (!((Attendance == "" || Attendance == null || Attendance == 2) &&
                            this.FunctionAccess.user_adminLevel != 4)) return [3 /*break*/, 5];
                        attended = 0;
                        $(event.target).removeClass("PresentCheckbox1");
                        $(event.target).removeClass("NoneCheckbox1");
                        $(event.target).addClass("AbsentCheckbox1");
                        if (!(attended === 0)) return [3 /*break*/, 5];
                        for (i = 0; i < this.eventAttend.length; i++) {
                            for (j = 0; j < this.eventAttend[i].length; j++) {
                                if (this.eventAttend[i][j].person_id === attendy.person_id) {
                                    this.eventAttend[i][j].attended = 0;
                                    return [2 /*return*/]; // Exit the function once updated
                                }
                            }
                        }
                        this.AttendanceReport(attended, AttendyPersonId, "0");
                        return [4 /*yield*/, this.storage.get("attendanceevents")];
                    case 4:
                        data = (_a.sent()) || [];
                        _a.label = 5;
                    case 5:
                        this.logger.CoachRadioButtonAttd_Mark("CoachRadioButtonAttd_Mark", {
                            pram: Date.now(),
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        this.storage.set("offline", 0);
                        if ((Attendance == "" || Attendance == null || Attendance == 0) &&
                            this.FunctionAccess.user_adminLevel != 4) {
                            attended = 1;
                            this.AttendanceReport(attended, AttendyPersonId, "1");
                            $(event.target).removeClass("AbsentCheckbox1");
                            $(event.target).addClass("PresentCheckbox1");
                        }
                        else if ((Attendance == "" || Attendance == null || Attendance == 1) &&
                            this.FunctionAccess.user_adminLevel != 4) {
                            attended = 2;
                            $(event.target).removeClass("PresentCheckbox1");
                            $(event.target).removeClass("AbsentCheckbox1");
                            $(event.target).addClass("NoneCheckbox1");
                            this.AttendanceReport(attended, AttendyPersonId, "1");
                        }
                        else if ((Attendance == "" || Attendance == null || Attendance == 2) &&
                            this.FunctionAccess.user_adminLevel != 4) {
                            attended = 0;
                            $(event.target).removeClass("PresentCheckbox1");
                            $(event.target).removeClass("NoneCheckbox1");
                            $(event.target).addClass("AbsentCheckbox1");
                            this.AttendanceReport(attended, AttendyPersonId, "1");
                        }
                        this.logger.CoachRadioButtonAttd_Mark("CoachRadioButtonAttd_Mark", {
                            pram: Date.now(),
                        });
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    EventDashboardNewPage.prototype.AttendanceReport = function (attended, AttendyPersonId, status) {
        var _this = this;
        if (status == '0') {
            var payload_1 = {
                event_id: this.UpcomingSingleEvent.event_id,
                personId: AttendyPersonId,
                attended: attended,
                confirmed: "-1",
                reasondeclined: "-1",
                reasondeclined_by_coach: "-1",
                state_time: "",
                selectedTeam: this.selectedTeam
            };
            var existingIndex = this.singleplayerstatus.findIndex(function (item) {
                return item.personId === payload_1.personId;
            });
            if (existingIndex !== -1) {
                // If a duplicate exists, replace it with the new payload
                this.singleplayerstatus[existingIndex] = payload_1;
            }
            else {
                // If no duplicate, push the payload
                this.singleplayerstatus.push(payload_1);
            }
            console.log("singleplayerstatus", this.singleplayerstatus);
            this.setBulkupdateStorage("", "", this.singleplayerstatus, "", "");
        }
        else {
            var loginData4 = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set("event_id", this.UpcomingSingleEvent.event_id)
                .set("personId", AttendyPersonId)
                .set("attended", attended)
                .set("confirmed", "-1")
                .set("reasondeclined", "-1")
                .set("reasondeclined_by_coach", "-1")
                .set("state_time", "")
                .set("selectedTeam", this.selectedTeam);
            this.http
                .post(this.global.APIURL + "events/saveSinglePlayersAttdStates", loginData4, { headers: this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS) {
                    _this.AllPlayersLoad();
                }
            }, function (error) { });
        }
    };
    EventDashboardNewPage.prototype.addEventToCalendar = function () {
        var _this = this;
        var calOptions = this.calendar.getCalendarOptions(); // grab the defaults
        var endDate = new Date(this.arrDetail[0].date_ended);
        endDate.setSeconds(endDate.getSeconds() + 10);
        var address = [];
        var addressName = " ";
        if (this.arrDetail[0].ground_address.length > 0) {
            address.push(this.arrDetail[0].ground_address);
        }
        if (this.arrDetail[0].ground_state.length > 0) {
            address.push(this.arrDetail[0].ground_state);
        }
        if (address.length > 0) {
            addressName = address.join(",");
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
        this.calendar
            .createEventWithOptions(this.arrDetail[0].name, addressName, this.arrDetail[0].event_notes, new Date(this.arrDetail[0].date_started), endDate, calOptions)
            .then(function (msg) {
            _this.presentAlert("Success", "Event added to calendar.");
        }, function (err) {
            _this.presentAlert("Error", "Problem in adding event to calendar. Please check the app permission settings.");
        });
    };
    EventDashboardNewPage.prototype.DisplaySeverityDetails = function (playerAilments) {
        var _this = this;
        console.log("playerAilments", playerAilments);
        this.ShowSeverityPage = true;
        var playerail = __assign({}, playerAilments);
        if (this.OperooStatus == 1) {
            playerail.operooEnabled = true;
            this.getOperooData(playerAilments).then(function (data) {
                console.log("operoodata", data);
                if (data && data.SUCCESS) {
                    playerail.operooData = data.OPEROOINFO;
                    _this.OperooData = data.OPEROOINFO;
                    if (playerail) {
                        var SeverityModal = _this.modalCtrl.create("SeverityDetailsModalPage", { playerAilments: playerail });
                        SeverityModal.present();
                    }
                    else {
                        _this.presentToast("No Details found");
                    }
                }
            });
        }
        else {
            if (playerail) {
                var SeverityModal = this.modalCtrl.create("SeverityDetailsModalPage", {
                    playerAilments: playerail,
                });
                SeverityModal.present();
            }
            else {
                this.presentToast("No Details found");
            }
        }
    };
    EventDashboardNewPage.prototype.MedicineInformation = function (data) {
        var _this = this;
        this.medicalInfo = true;
        var MedicineInfo = this.modalCtrl.create("MedicineInfoPage", {
            values: data,
        });
        MedicineInfo.present();
        MedicineInfo.onDidDismiss(function () {
            _this.medicalInfo = false;
        });
    };
    EventDashboardNewPage.prototype.presentAlert = function (Title, SubTitle) {
        var alert = this.Alert.create({
            title: Title,
            subTitle: SubTitle,
            buttons: ["Dismiss"],
        });
        alert.present(alert);
    };
    EventDashboardNewPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: "top",
        });
        toast.present();
    };
    EventDashboardNewPage.prototype.openMap = function (address, state, latitude, longitude) {
        if (latitude != 0 && longitude != 0) {
            this.launchNavigator.navigate(latitude + ", " + longitude);
        }
        else if (address || state) {
            this.launchNavigator.navigate(address + ", " + state);
        }
        else {
            this.gFn.presentToast("Location undefined");
        }
    };
    //Welfare
    EventDashboardNewPage.prototype.displayFunction = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var _a, _b;
            var loginData4 = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set("event_id", _this.UpcomingSingleEvent.event_id)
                .set("clientSport", "team")
                .set("client_id", _this.UpcomingSingleEvent.client_id)
                .set("club_id", (_a = _this.PersonData) === null || _a === void 0 ? void 0 : _a.CLUB_ID)
                .set("adminLevel", (_b = _this.PersonData) === null || _b === void 0 ? void 0 : _b.ADMINLEVEL)
                .set("selectedTeam", _this.selectedTeam);
            _this.http
                .post(_this.global.APIURL + "events/getPlayersEvent", loginData4, {
                headers: _this.global_api.getHeader(),
            })
                .subscribe(function (data) {
                _this.WelfarePeopleDetail = data.GETPLAYERSEVENT;
                //console.log('data',data)
                resolve(true);
            }, function (error) {
                //console.log(error);
            });
        });
    };
    EventDashboardNewPage.prototype.PlayerQuestion = function (Player_detail, event) {
        var _a, _b;
        if (!this.medicalInfo) {
            if (this.ShowSeverityPage == false) {
                if (((_a = this.PersonData) === null || _a === void 0 ? void 0 : _a.PERSON_ID) == Player_detail.person_id ||
                    ((_b = this.FunctionAccess) === null || _b === void 0 ? void 0 : _b.event_Welfare) == "yes") {
                    $(event.target)
                        .closest(".event-card")
                        .find(".well")
                        .addClass("active");
                    this.navCtrl
                        .push("PlayerQuestionPage", { Player_detail: Player_detail })
                        .then(function (x) {
                        $(event.target)
                            .closest(".event-card")
                            .find(".well")
                            .removeClass("active");
                    });
                }
            }
            else {
                this.ShowSeverityPage = false;
            }
        }
    };
    //Result
    EventDashboardNewPage.prototype.loadDataFromAPIs = function () {
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
    EventDashboardNewPage.prototype.loadPlayersVotedState = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var _a, _b, _c;
            var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set("event_id", _this.UpcomingSingleEvent.event_id)
                .set("team_id", _this.selectedTeam)
                .set("client_id", _this.UpcomingSingleEvent.client_id)
                .set("selectedTeam", _this.selectedTeam)
                .set("club_id", (_a = _this.PersonData) === null || _a === void 0 ? void 0 : _a.CLUB_ID)
                .set("voter_id", ((_b = _this.PersonData) === null || _b === void 0 ? void 0 : _b.PERSON_ID) ? (_c = _this.PersonData) === null || _c === void 0 ? void 0 : _c.PERSON_ID : "");
            _this.http
                .post(_this.global.APIURL + "votes/getVotingPlayersEvent", data, {
                headers: _this.global_api.getHeader(),
            })
                .subscribe(function (response) {
                if (response.SUCCESS) {
                    var count = 0;
                    for (var i = 0; i < response.GETVOTINGPLAYERSEVENT.length; i++) {
                        if (_this.FunctionAccess &&
                            _this.FunctionAccess.voting_for_player == "yes" &&
                            _this.coachDetails[0].PERSON_ID ==
                                response.GETVOTINGPLAYERSEVENT[i].person_id) {
                            _this.coachDetails[0].voted =
                                response.GETVOTINGPLAYERSEVENT[i].voted;
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
            }, function (error) { });
        });
    };
    EventDashboardNewPage.prototype.saveGameScore = function () {
        var _this = this;
        this.scoreHome = this.getPrefixedNumber(this.scoreHome);
        this.scoreAway = this.getPrefixedNumber(this.scoreAway);
        var loader = this.loadingCtrl.create({});
        loader.present();
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set("event_id", this.event_id)
            .set("homescore", this.scoreHome)
            .set("awayscore", this.scoreAway);
        this.http
            .post(this.global.APIURL + "events/saveGameScore", data, {
            headers: this.global_api.getHeader(),
        })
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
    EventDashboardNewPage.prototype.saveGameReport = function (isReport, isScoreSave) {
        var _this = this;
        var _a;
        if (isScoreSave === void 0) { isScoreSave = false; }
        if (typeof this.PersonData !== "undefined") {
            if (!isReport || (isReport && this.reportText.trim().length)) {
                var washout = "0";
                var forfeit = "0";
                if (this.gameDismissed == "washout") {
                    washout = "1";
                }
                else if (this.gameDismissed == "forfeit") {
                    forfeit = "1";
                }
                var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                    .set("event_id", this.event_id)
                    .set("reportHome", this.arrDetail[0].ishometeam ? this.reportText : "")
                    .set("reportAway", !this.arrDetail[0].ishometeam ? this.reportText : "")
                    .set("person_id", (_a = this.PersonData) === null || _a === void 0 ? void 0 : _a.PERSON_ID)
                    .set("washout", washout)
                    .set("forfeit", forfeit);
                this.http
                    .post(this.global.APIURL + "events/saveGameScoreReportByEvent", data, { headers: this.global_api.getHeader() })
                    .subscribe(function (response) {
                    $(".btn-sm-black").removeClass("active");
                    if (response.SUCCESS) {
                        _this.reportTextRowOpened = false;
                        var msg = "Game data saved.";
                        if (isReport) {
                            msg = isScoreSave
                                ? "Game score and report saved."
                                : "Game report saved.";
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
    EventDashboardNewPage.prototype.gameDismissedChange = function (ev) {
        console.log(ev.target.value);
        if ((ev.target.value == "washout" && this.gameDismissed == "washout") ||
            (ev.target.value == "forfeit" && this.gameDismissed == "forfeit")) {
            this.gameDismissed = "";
        }
        else {
            $(".radio").find(".sub-title").removeClass("HighLight");
            if (ev.target.value == "washout") {
                $(ev.target).closest(".radio").find(".Washout").addClass("HighLight");
            }
            else {
                $(ev.target).closest(".radio").find(".Forfeit").addClass("HighLight");
            }
            this.gameDismissed = ev.target.value;
        }
        this.saveGameReport(false);
    };
    EventDashboardNewPage.prototype.saveVote = function (ev, person_id, ratings) {
        var _this = this;
        var _a;
        var v1 = "";
        var v2 = "";
        var v3 = "";
        if (ratings == 1) {
            v1 = person_id;
            this.vote1 = person_id;
            v2 = "";
            v3 = "";
            if (this.vote2 == this.vote1) {
                this.vote2 = 0;
            }
            else if (this.vote3 == this.vote1) {
                this.vote3 = 0;
            }
        }
        if (ratings == 2) {
            v1 = "";
            v2 = person_id;
            this.vote2 = person_id;
            v3 = "";
            if (this.vote1 == this.vote2) {
                this.vote1 = 0;
            }
            else if (this.vote3 == this.vote2) {
                this.vote3 = 0;
            }
        }
        if (ratings == 3) {
            v1 = "";
            v2 = "";
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
            .set("event_id", this.event_id)
            .set("team_id", this.selectedTeam)
            .set("voter_id", (_a = this.PersonData) === null || _a === void 0 ? void 0 : _a.PERSON_ID)
            .set("v3", this.vote3)
            .set("v2", this.vote2)
            .set("v1", this.vote1)
            .set("vote_baf_1", "")
            .set("vote_baf_2", "")
            .set("vote_baf_3", "")
            .set("season_id", this.PersonData.SEASON_ID);
        this.http
            .post(this.global.APIURL + "votes/saveVotingPlayer", data, {
            headers: this.global_api.getHeader(),
        })
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
        if (v1 != "") {
            $(".vote1").removeClass("active");
        }
        else if (v2 != "") {
            $(".vote2").removeClass("active");
        }
        else if (v3 != "") {
            $(".vote3").removeClass("active");
        }
        $(ev.target.parentElement).find("a").removeClass("active");
        $(ev.target).addClass("active");
    };
    EventDashboardNewPage.prototype.getPrefixedNumber = function (num) {
        if (typeof num == "undefined") {
            num = "0";
        }
        else if (num == "") {
            num = "0";
        }
        else {
            num = num.toString().replace(/^[0]+/, "");
            if (num == "")
                num = "0";
        }
        return num;
    };
    EventDashboardNewPage.prototype.prefixNumber = function (ev) {
        var num = this.getPrefixedNumber(ev.target.value);
        setTimeout(function () {
            if (num != ev.target.value) {
                ev.target.value = num;
            }
        }, 50);
    };
    EventDashboardNewPage.prototype.voteForPlayer = function (playerID, playerDetails) {
        var _this = this;
        if (!this.medicalInfo && this.FunctionAccess.voting_for_player == "yes") {
            if (this.ShowSeverityPage == false) {
                if (this.FunctionAccess.voting_for_player == "yes") {
                    this.activePlayer = playerID;
                    setTimeout(function () {
                        playerDetails = Object.keys(playerDetails).reduce(function (c, k) { return ((c[k.toLowerCase()] = playerDetails[k]), c); }, {});
                        _this.navCtrl
                            .push("VoteForPlayerPage", {
                            playerDetails: playerDetails,
                            event_id: _this.event_id,
                        })
                            .then(function () {
                            $(".tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon").css({
                                "mask-image": "url(../assets/images/menu/home.svg)",
                                height: "22px",
                                color: "#dedede",
                            });
                            _this.gFn.hideMenuIcon();
                        });
                        _this.activePlayer = "";
                    }, 300);
                }
            }
            else {
                this.ShowSeverityPage = false;
            }
        }
    };
    EventDashboardNewPage.prototype.keyboardCheck = function () {
        if (this.mBottom == "") {
            this.mBottom = $(".scroll-content").css("margin-bottom");
        }
        if (this.keyboard.isOpen()) {
            $(".scroll-content").css("margin-bottom", "0");
            this.gFn.hideMenuIcon();
        }
        else {
            $(".scroll-content").css("margin-bottom", "56px");
            this.gFn.showMenuIcon();
        }
        // console.log('The keyboard is open:', this.keyboard.isOpen());
    };
    EventDashboardNewPage.prototype.inputFocus = function () {
        this.keyboardCheck();
    };
    EventDashboardNewPage.prototype.inputBlur = function () {
        this.keyboardCheck();
    };
    EventDashboardNewPage.prototype.saveGameScoreAndReport = function () {
        $(".btn-sm-black").addClass("active");
        if (this.scoreIsUpdated == 0 && this.reportText.trim().length) {
            this.saveGameScore();
        }
        this.saveGameReport(true, this.scoreIsUpdated == 0 ? true : false);
    };
    EventDashboardNewPage.prototype.gotoAttendanceNote = function (personId) {
        var modal = this.modalCtrl.create("EventAttendanceNotePage", {
            eventId: this.UpcomingSingleEvent.event_id,
            personId: personId,
            note: "",
        }, { showBackdrop: true, enableBackdropDismiss: true });
        modal.present();
    };
    EventDashboardNewPage.prototype.tryAgain = function () {
        this.getDefaultDataLoad();
    };
    EventDashboardNewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "page-event-dashboard-new",template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-dashboard-new/event-dashboard-new.html"*/'<ion-header class="header-md">\n  <ion-navbar class="main">\n    <div class="top-bar clearfix">\n      <div class="pull-left">\n        <div>\n            <button class="BackButton"(click)="backArrow()"><img src="assets/images/arrow-black.svg"></button>\n            EVENT\n          </div>\n      </div>\n    </div>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="bg-gray event attendance-content">\n  <section class="main">\n    <!-- loading skeleton -->\n    <form action="" class="user-form profile bg-black skeleton" *ngIf="!isLoaded && !isOffline">\n   \n        <section class="profileFirst heightAuto xs-padding">\n        \n          <div class="top-info mt-10">\n              <h3 class="title text-center animate">&nbsp;</h3>\n              <div class="divider"></div>\n              <h4 class="text-center animate">&nbsp;</h4>\n              <p class="venu animate">&nbsp;</p>\n              <div class="time-info animate">&nbsp;</div>\n          </div>\n          \n          <div class="radial-item mt-30">\n            <div class="row">\n              <div class="info-item col-xs-6 text-right">\n                  <span class="progress-item animate"></span>\n                </div>\n                <div class="info-item col-xs-6 text-left ">\n                    <span class="progress-item animate"></span>\n                  </div>\n            </div>            \n          </div>\n          <div class="btn-wrap mt-30">\n              <button class="btn radius-25 btn-blue animate"></button>\n          </div>\n    \n        </section>\n        \n        <div class="event-card bg-gray">\n  \n            <div class=" select-card well mt-10 fadeShine">\n              <div class="row">\n                <div class="card-img col-xs-2 p-0">\n                  <span>\n                    <div class="img-circle">\n                        <span class="img-text"></span>\n                    </div>\n                  </span>\n                </div>\n                <div class="card-title col-xs-8 p-0"></div>\n                <div class="col-xs-2 checkArrow-group"></div>\n              </div>\n          </div>\n          <div class=" select-card well fadeShine">\n              <div class="row">\n                <div class="card-img col-xs-2 p-0">\n                  <span>\n                    <div class="img-circle">\n                        <span class="img-text"></span>\n                    </div>\n                  </span>\n                </div>\n                <div class="card-title col-xs-8 p-0"></div>\n                <div class="col-xs-2 checkArrow-group"></div>\n              </div>\n          </div>\n          <div class=" select-card well fadeShine">\n              <div class="row">\n                <div class="card-img col-xs-2 p-0">\n                  <span>\n                    <div class="img-circle">\n                        <span class="img-text"></span>\n                    </div>\n                  </span>\n                </div>\n                <div class="card-title col-xs-8 p-0"></div>\n                <div class="col-xs-2 checkArrow-group"></div>\n              </div>\n          </div>\n          <div class=" select-card well fadeShine">\n              <div class="row">\n                <div class="card-img col-xs-2 p-0">\n                  <span>\n                    <div class="img-circle">\n                        <span class="img-text"></span>\n                    </div>\n                  </span>\n                </div>\n                <div class="card-title col-xs-8 p-0"></div>\n                <div class="col-xs-2 checkArrow-group"></div>\n              </div>\n          </div>\n          <div class=" select-card well fadeShine">\n              <div class="row">\n                <div class="card-img col-xs-2 p-0">\n                  <span>\n                    <div class="img-circle">\n                        <span class="img-text"></span>\n                    </div>\n                  </span>\n                </div>\n                <div class="card-title col-xs-8 p-0"></div>\n                <div class="col-xs-2 checkArrow-group"></div>\n              </div>\n          </div>\n          <div class=" select-card well fadeShine">\n              <div class="row">\n                <div class="card-img col-xs-2 p-0">\n                  <span>\n                    <div class="img-circle">\n                        <span class="img-text"></span>\n                    </div>\n                  </span>\n                </div>\n                <div class="card-title col-xs-8 p-0"></div>\n                <div class="col-xs-2 checkArrow-group"></div>\n              </div>\n          </div>\n          <div class=" select-card well fadeShine">\n              <div class="row">\n                <div class="card-img col-xs-2 p-0">\n                  <span>\n                    <div class="img-circle">\n                        <span class="img-text"></span>\n                    </div>\n                  </span>\n                </div>\n                <div class="card-title col-xs-8 p-0"></div>\n                <div class="col-xs-2 checkArrow-group"></div>\n              </div>\n          </div>\n  \n        </div>\n      </form>\n    <!-- loading skeleton end -->\n\n    <!-- <form action="" class="user-form profile bg-black" *ngIf="isLoaded && !isOffline"> -->\n      <form action="" class="user-form profile bg-black">\n      <section class="profileFirst heightAuto xs-padding" (click)="resetColors($event)">\n        <img src="assets/images/no-internet.png" style="height: 50px; width: 50px" *ngIf="isOffline">\n        <div class="top-info" *ngFor="let detail of arrDetail">\n            <h3 class="title text-center inverseText">ATTENDANCE</h3>\n            <!-- <div class="divider"></div> -->\n            <h4 class="text-center inverseText" *ngIf="detail.event_type_id==1">{{detail.hometeamname}} vs {{detail.awayteamname}}</h4>\n            <h4 class="text-center inverseText trainning" *ngIf="detail.event_type_id==2">{{detail.hometeamname}}</h4>\n            <h4 class="text-center inverseText" *ngIf="detail.event_type_id==2">{{detail.name}}</h4>\n            <p class="venu" *ngIf="detail.ground_name">{{detail.ground_name}}</p>\n            <p class="venu" *ngIf="detail.ground_address && detail.ground_state">{{detail.ground_address}},{{detail.ground_suburb}},{{detail.ground_state}}</p>\n            <div class="time-info">{{detail.date_started | date: \'MMM d\'}} AT {{detail.time_started}}</div>\n        </div>\n         \n        <div class="radial-item mt-10" *ngIf="rollstatus == \'ROLL CLOSED\'">\n          <div class="row">\n            <div class="info-item col-xs-6 text-right Going" (click)="eventState(\'Going\',$event)">\n                <span class="progress-item" style="color: #FFF;">Present</span>\n                <span class="badge maybe" style=" background-color:colorGoing !important;height: 23px;color: #000000;">{{DupeventAttendLen[0]}}</span>\n              </div>\n              <div class="info-item col-xs-6 text-left NotGoing" (click)="eventState(\'Not going\',$event)">\n                  <span class="badge not-going" style="color:colorNotGoing !important;height: 23px;color: #ffffff">{{DupeventAttendLen[2]}}</span>\n                  <span class="progress-item" style="color: #FFF;">Absent</span>\n                </div>\n          </div>\n          \n        </div>\n       \n        <div class="row">\n          <div class="col-xs-6 p-0">\n            <div class="open-roll" [ngClass]="rollstatus == \'ROLL OPEN\' ? \'close-roll\': rollstatus == \'ROLL CLOSED\' ? \'closed-roll\': \'\'"  (click)="changeRoll()">\n              <p *ngIf="rollstatus != \'ROLL OPEN\' && rollstatus != \'ROLL CLOSED\'">OPEN ROLL</p>\n              <p *ngIf="rollstatus == \'ROLL OPEN\'">CLOSE ROLL</p>\n              <p *ngIf="rollstatus == \'ROLL CLOSED\'">ROLL CLOSED</p>\n            </div>\n          </div>\n          <div class="col-xs-3 p-0">\n            <div (click)="PresentStatusUpdate(1)">\n              <div class="checkArrow-group or-chck">\n                <div class="p-0 or-chck-in">\n                  <div class="checkbox2 PresentCheckbox1">\n                  </div>\n                  <div class="checkbox-cst"></div>\n                </div>\n              </div>\n              <div class="markall-p">\n                <p>MARK ALL PRESENT</p>\n              </div>\n            </div>\n            \n          </div>\n          <div class="col-xs-3 p-0">\n            <div (click)="PresentStatusUpdate(0)" >\n              <div class="checkArrow-group or-chck">\n                <div class="p-0 or-chck-in">\n                  <div class="checkbox2 AbsentCheckbox1">\n                  </div>\n                  <div class="checkbox-cst"></div>\n                </div>\n              </div>\n              <div class="markall-p" >\n                <p>MARK ALL ABSENT</p>\n              </div>\n            </div>\n          </div>\n        </div>\n  \n      </section>\n      <div class="event-card bg-gray" *ngIf="!eventAttend && !BorrowedPlayerPresent">\n        <div class="well select-card ">\n          <div class="row">\n            <div class="col-xs-12 ">\n              <h5 class="sub-title">NO TEAM MATES Present</h5>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class="event-card bg-gray" (click)="hideAttendanceList($event)" *ngIf="rollstatus == \'ROLL OPEN\'">\n        <div class="LastChild-check" *ngIf="eventAttend && !(combinedPlayersArray?.length > 0)">\n          <div *ngFor="let StateAttendy of DupeventAttendsec;let i=index">\n            <div *ngIf="i<3">\n            <div class=" select-card" [class.well]="Attendy.injuryStatus!=1 && Attendy.injuryStatus!=2"\n              [class.RecoveredPlayer]="Attendy.injuryStatus==2" [class.InjuredPlayer]="Attendy.injuryStatus==1" *ngFor="let Attendy of StateAttendy">\n\n              <div class="row">\n                <div class="card-img col-xs-2 p-0">\n                  <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2" [class.no-response]="Attendy.state==3"\n                    [class.maybe]="Attendy.state==4" *ngIf="!Attendy.PHOTOPATH">\n                    <div class="img-circle"><span class="img-text">{{Attendy.first_name[0] | uppercase}} {{Attendy.last_name[0] | uppercase}} </span></div>\n                    \n                  </span>\n                  <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2" [class.no-response]="Attendy.state==3"\n                    [class.maybe]="Attendy.state==4" *ngIf="Attendy.PHOTOPATH">\n                    <img src={{PhotoApiUrl}}{{Attendy.PHOTOPATH}} alt="" class="img-circle">\n                  </span>\n                </div>\n\n                <div class="card-title col-xs-8 p-0" [class.InjuredPlayerName]="Attendy.injuryStatus==1">{{Attendy.first_name\n                  | uppercase}} {{Attendy.last_name | uppercase}}\n                    <div class="select-group clearfix">\n                      <div class="pull-left checkArrow-group" [class.OuterDiv]="PersonData?.PERSON_ID && PersonData?.PERSON_ID==Attendy.person_id && FunctionAccess.event_EventDetail==\'self\'" *ngIf="FunctionAccess">\n                        <div *ngIf="FunctionAccess.event_EventDetail==\'yes\' && FunctionAccess.user_adminLevel != 1 &&  FunctionAccess.user_adminLevel != 3 &&  FunctionAccess.user_adminLevel != 2">\n                            <div class=" arrowUp ArrowLight" (click)="ArrowFunctionality($event)">\n                              <ion-icon name="ios-arrow-down" class=" collapsed-arrow"></ion-icon>\n                            </div>\n\n                          </div>\n                          <div class="  " *ngIf="PersonData?.PERSON_ID && PersonData?.PERSON_ID==Attendy.person_id && FunctionAccess.event_EventDetail==\'self\'">\n                            <div class="p-0 arrowUp loggedIn-Arrow ArrowLight" (click)="ArrowFunctionality($event)">\n                              <ion-icon name="ios-arrow-down" class=" collapsed-arrow"></ion-icon>\n                            </div>\n                          </div>\n                          \n                      </div>\n                      \n                      <div class="display-status pull-left">\n                        <p class="Show_Status" [class.InjuredPlayerStatus]="Attendy.injuryStatus==1" *ngIf="Attendy.reasondeclined_by_coach==\'\'">{{Attendy.reasondeclined}}</p>\n                        <p class="Show_Status" [class.InjuredPlayerStatus]="Attendy.injuryStatus==1" *ngIf="Attendy.reasondeclined_by_coach!=\'\'">{{Attendy.reasondeclined_by_coach}}</p>\n                      </div>\n                    </div>\n                    <div class="suit-iconCard fixedRight" (click)="DisplaySeverityDetails(Attendy)" *ngIf="FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1 && ((Attendy.playerAilmentsSeverityIcon) || (Attendy.showMedicine==1))">\n                      <img src={{global.ImagesPath}}{{Attendy.playerAilmentsSeverityIcon}} class="suit-icon" *ngIf="(Attendy.playerAilmentsSeverityIcon  && (Attendy.showMedicine==1 || Attendy.showMedicine==0))">\n                      <img src="{{global.ImagesPath}}pills.svg" class="medical-bottle" *ngIf="((Attendy.showMedicine==1) && (!Attendy.playerAilmentsSeverityIcon))">\n                    </div>\n                </div>\n                \n                <div class="col-xs-2 checkArrow-group" [class.OuterDiv]="PersonData?.PERSON_ID && PersonData?.PERSON_ID==Attendy.person_id && FunctionAccess.event_EventDetail_checkbox==\'self\'"\n                  *ngIf="FunctionAccess">\n                  <div class="col-xs-2 p-0 checkbox-col" *ngIf="FunctionAccess.event_EventDetail_checkbox==\'yes\'">\n\n                    <div class="checkbox1" [class.PresentCheckbox1]="Attendy.attended==1" [class.AbsentCheckbox1]="Attendy.attended==0" [class.NoneCheckbox1]="Attendy.attended==2"\n                      (click)="AttendanceMark($event,Attendy.attended,Attendy.person_id,Attendy)">\n                    </div>\n                    <div class="checkbox"></div>\n                  </div>\n                </div>\n\n                <ul class="dropdown-menu card-dropdown" style="display:none; ">\n                  <li *ngFor="let key of reason_options_list[0]" (click)="SinglePlayersAttdStates(key.confirm_reason,\'\',key.reason_display,Attendy.person_id,$event)" [class.disabled]="PersonData.ADMINLEVEL==3" >\n                    <a href="javascript:void(0)" [class.SelectedReason]="key.reason_display==Attendy.reasondeclined_by_coach || key.reason_display==Attendy.reasondeclined">{{key.reason_display}}</a>\n                  </li>\n                  <li *ngIf="Attendy.reasondeclined_by_coach !=\'\' || Attendy.reasondeclined !=\'\'" (click)="gotoAttendanceNote(Attendy.person_id)">\n                    <a href="javascript:void(0)">Add note</a>\n                  </li>\n                </ul>\n              </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </div>\n\n        <!-- Regular player combined Start -->\n        <div class="LastChild-check" *ngIf="combinedPlayersArray?.length > 0">\n          <div class=" select-card" [class.well]="Attendy.injuryStatus!=1 && Attendy.injuryStatus!=2"\n            [class.RecoveredPlayer]="Attendy.injuryStatus==2" [class.InjuredPlayer]="Attendy.injuryStatus==1"\n            *ngFor="let Attendy of combinedPlayersArray">\n\n            <div class="row">\n              <div class="card-img col-xs-2 p-0">\n                <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2"\n                  [class.no-response]="Attendy.state==3" [class.maybe]="Attendy.state==4" *ngIf="!Attendy.PHOTOPATH">\n                  <div class="img-circle"><span class="img-text">{{Attendy.first_name[0] | uppercase}} {{Attendy.last_name[0] | uppercase}} </span>\n                  </div>\n                  \n                </span>\n                <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2"\n                  [class.no-response]="Attendy.state==3" [class.maybe]="Attendy.state==4" *ngIf="Attendy.PHOTOPATH">\n                  <img src={{PhotoApiUrl}}{{Attendy.PHOTOPATH}} alt="" class="img-circle">\n                </span>\n              </div>\n\n              <div class="card-title col-xs-8 p-0" [class.InjuredPlayerName]="Attendy.injuryStatus==1">\n                  {{Attendy.first_name | uppercase}} {{Attendy.last_name | uppercase}}\n                  <div class="select-group clearfix">\n                    <div class="pull-left checkArrow-group"\n                      [class.OuterDiv]="PersonData?.PERSON_ID && PersonData?.PERSON_ID==Attendy.person_id && FunctionAccess && FunctionAccess.event_EventDetail==\'self\'"\n                      *ngIf="FunctionAccess">\n                      <div *ngIf="FunctionAccess && FunctionAccess.event_EventDetail==\'yes\' && FunctionAccess.user_adminLevel != 1 &&  FunctionAccess.user_adminLevel != 3 &&  FunctionAccess.user_adminLevel != 2">\n                        <div class=" arrowUp ArrowLight" (click)="ArrowFunctionality($event)">\n                          <ion-icon name="ios-arrow-down" class=" collapsed-arrow"></ion-icon>\n                        </div>\n\n                      </div>\n                      <div class="  " *ngIf="PersonData?.PERSON_ID && PersonData?.PERSON_ID==Attendy.person_id && FunctionAccess && FunctionAccess.event_EventDetail==\'self\'">\n                        <div class=" p-0 arrowUp loggedIn-Arrow ArrowLight" (click)="ArrowFunctionality($event)">\n                          <ion-icon name="ios-arrow-down" class=" collapsed-arrow"></ion-icon>\n                        </div>\n                      </div>\n                      \n                    </div>\n                    <div class="display-status pull-left">\n                      <p class="Show_Status" [class.InjuredPlayerStatus]="Attendy.injuryStatus==1"\n                        *ngIf="Attendy.reasondeclined_by_coach==\'\'">{{Attendy.reasondeclined}}</p>\n                      <p class="Show_Status" [class.InjuredPlayerStatus]="Attendy.injuryStatus==1"\n                        *ngIf="Attendy.reasondeclined_by_coach!=\'\'">{{Attendy.reasondeclined_by_coach}}</p>\n                    </div>\n                  </div>\n                  \n                  <div class="suit-iconCard fixedRight" (click)="DisplaySeverityDetails(Attendy)" *ngIf="FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1 && ((Attendy.playerAilmentsSeverityIcon) || (Attendy.showMedicine==1))">\n                    <img src={{global.ImagesPath}}{{Attendy.playerAilmentsSeverityIcon}} class="suit-icon" *ngIf="(Attendy.playerAilmentsSeverityIcon  && (Attendy.showMedicine==1 || Attendy.showMedicine==0))">\n                    <img src="{{global.ImagesPath}}pills.svg" class="medical-bottle" *ngIf="((Attendy.showMedicine==1) && (!Attendy.playerAilmentsSeverityIcon))">\n                  </div>\n              </div>\n            \n              <div class="col-xs-2 checkArrow-group"\n                [class.OuterDiv]="PersonData?.PERSON_ID && PersonData?.PERSON_ID==Attendy.person_id && FunctionAccess.event_EventDetail_checkbox==\'self\'"\n                *ngIf="FunctionAccess">\n                <div class="col-xs-2 p-0 checkbox-col" *ngIf="FunctionAccess.event_EventDetail_checkbox==\'yes\'">\n\n                  <div class="checkbox1" [class.PresentCheckbox1]="Attendy.attended==1"\n                    [class.AbsentCheckbox1]="Attendy.attended==0" [class.NoneCheckbox1]="Attendy.attended==2"\n                    (click)="AttendanceMark($event,Attendy.attended,Attendy.person_id,Attendy)">\n                  </div>\n                  <div class="checkbox"></div>\n                </div>\n              </div>\n              \n\n              <ul class="dropdown-menu card-dropdown" style="display:none; ">\n                <li *ngFor="let key of reason_options_list[0]"\n                  (click)="SinglePlayersAttdStates(key.confirm_reason,\'\',key.reason_display,Attendy.person_id,$event)" [class.disabled]="PersonData.ADMINLEVEL==3">\n                  <a href="javascript:void(0)"\n                    [class.SelectedReason]="key.reason_display==Attendy.reasondeclined_by_coach || key.reason_display==Attendy.reasondeclined">{{key.reason_display}}</a>\n                </li>\n                <li *ngIf="Attendy.reasondeclined_by_coach !=\'\' || Attendy.reasondeclined !=\'\'" (click)="gotoAttendanceNote(Attendy.person_id)">\n                  <a href="javascript:void(0)">Add note</a>\n                </li>\n              </ul>\n            </div>\n\n          </div>\n        </div>\n        <!-- Regular player combined End -->\n\n        <!--  borrowed player -->\n        <div class="borrowHeading" *ngIf="BorrowTagFlag==1">\n          <p>BORROWED TEAM MATES</p>\n        </div>\n        <div class="well select-card " *ngIf="BorrowTagFlag==1 && EmptyBorrowPlayer">\n          <div class="row">\n            <div class="col-xs-12 ">\n              <h5 class="sub-title">NO TEAM MATES Present</h5>\n            </div>\n          </div>\n        </div>\n        <div class="borrowOuter" *ngIf="BorrowTagFlag==1 && !(combinedBorrowedPlayersArray?.length > 0)">\n          \n          <div *ngFor="let StateAttendy of DupEventAttendSecBorrowed;let i=index">\n              \n            <div *ngIf="i<3">\n            <div class="select-card" [class.well]="Attendy.injuryStatus!=1 && Attendy.injuryStatus!=2"\n              [class.RecoveredPlayer]="Attendy.injuryStatus==2" [class.InjuredPlayer]="Attendy.injuryStatus==1" *ngFor="let Attendy of StateAttendy">\n\n              <div class="row">\n                <div class="card-img col-xs-2 p-0">\n                  <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2" [class.no-response]="Attendy.state==3"\n                    [class.maybe]="Attendy.state==4" *ngIf="!Attendy.photoPath">\n                    <div class="img-circle"><span class="img-text">{{Attendy.first_name[0] | uppercase}} {{Attendy.last_name[0] | uppercase}} </span></div>\n                    \n                  </span>\n                  <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2" [class.no-response]="Attendy.state==3"\n                    [class.maybe]="Attendy.state==4" *ngIf="Attendy.photoPath">\n                    <img src={{PhotoApiUrl}}{{Attendy.photoPath}} alt="" class="img-circle">\n                  </span>\n\n                </div>\n                <div class="card-title col-xs-8 p-0" [class.InjuredPlayerName]="">{{Attendy.first_name | uppercase}}\n                  {{Attendy.last_name | uppercase}}\n                  <div class="select-group clearfix">\n                      <div class="checkArrow-group pull-left" [class.OuterDiv]="PersonData?.PERSON_ID && PersonData?.PERSON_ID==Attendy.person_id && FunctionAccess.event_EventDetail==\'self\'"\n                        *ngIf="FunctionAccess">\n                          \n                          <div *ngIf="FunctionAccess.event_EventDetail==\'yes\' && FunctionAccess.user_adminLevel != 1 &&  FunctionAccess.user_adminLevel != 3 &&  FunctionAccess.user_adminLevel != 2">\n                            <div class=" arrowUp ArrowLight" (click)="ArrowFunctionality($event)">\n                              <ion-icon name="ios-arrow-down" class=" collapsed-arrow"></ion-icon>\n                            </div>\n                          </div>\n                          <div class=" " *ngIf="PersonData?.PERSON_ID && PersonData?.PERSON_ID==Attendy.person_id && FunctionAccess.event_EventDetail==\'self\'">\n                            <div class="p-0 arrowUp loggedIn-Arrow ArrowLight" (click)="ArrowFunctionality($event)">\n                              <ion-icon name="ios-arrow-down" class=" collapsed-arrow"></ion-icon>\n                            </div>\n                          </div>\n                          \n                      </div>\n                      <div class="display-status pull-left">\n                      <p class="Show_Status" [class.InjuredPlayerStatus]="" *ngIf="Attendy.reasondeclined_by_coach==\'\'">{{Attendy.reasondeclined}}</p>\n                      <p class="Show_Status" [class.InjuredPlayerStatus]="" *ngIf="Attendy.reasondeclined_by_coach!=\'\'">{{Attendy.reasondeclined_by_coach}}</p>\n                      </div>\n                    </div>\n                    <div class="suit-iconCard fixedRight" (click)="DisplaySeverityDetails(Attendy)" *ngIf="FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1 && ((Attendy.playerAilmentsSeverityIcon) || (Attendy.showMedicine==1))">\n                        <img src={{global.ImagesPath}}{{Attendy.playerAilmentsSeverityIcon}} class="suit-icon" *ngIf="(Attendy.playerAilmentsSeverityIcon  && (Attendy.showMedicine==1 || Attendy.showMedicine==0))">\n                        <img src="{{global.ImagesPath}}pills.svg" class="medical-bottle" *ngIf="((Attendy.showMedicine==1) && (!Attendy.playerAilmentsSeverityIcon))">\n                      </div>\n                  </div>\n               \n                <div class="col-xs-2 pr-0 checkArrow-group" [class.OuterDiv]="PersonData?.PERSON_ID && PersonData?.PERSON_ID==Attendy.person_id && FunctionAccess.event_EventDetail_checkbox==\'self\'"\n                  *ngIf="FunctionAccess">\n\n                  <div class="col-xs-2 p-0 checkbox-col" *ngIf="FunctionAccess.event_EventDetail_checkbox==\'yes\'">\n\n                    <div class="checkbox1" [class.PresentCheckbox1]="Attendy.attended==1" [class.AbsentCheckbox1]="Attendy.attended==0" [class.NoneCheckbox1]="Attendy.attended==2"\n                      (click)="AttendanceMark($event,Attendy.attended,Attendy.person_id,Attendy)">\n                    </div>\n                    <div class="checkbox"></div>\n                  </div>\n                </div>\n\n                <ul class="dropdown-menu card-dropdown" style="display: none;">\n                  <li *ngFor="let key of reason_options_list[0]" (click)="SinglePlayersAttdStates(key.confirm_reason,\'\',key.reason_display,Attendy.person_id,$event)" [class.disabled]="PersonData.ADMINLEVEL==3">\n                    <a href="javascript:void(0)" [class.SelectedReason]="key.reason_display==Attendy.reasondeclined_by_coach || key.reason_display==Attendy.reasondeclined">{{key.reason_display}}</a>\n                  </li>\n                  <li *ngIf="Attendy.reasondeclined_by_coach !=\'\' || Attendy.reasondeclined !=\'\'" (click)="gotoAttendanceNote(Attendy.person_id)">\n                    <a href="javascript:void(0)">Add note</a>\n                  </li>\n                </ul>\n\n              </div>\n\n              </div>\n            </div>\n          </div>\n        </div>\n\n\n\n        <!-- Borrowed player combined Start -->\n        <div class="combinedBorrowedPlayersArray" *ngIf="BorrowTagFlag==1 && combinedBorrowedPlayersArray?.length > 0">\n          <div class="select-card" [class.well]="Attendy.injuryStatus!=1 && Attendy.injuryStatus!=2"\n            [class.RecoveredPlayer]="Attendy.injuryStatus==2" [class.InjuredPlayer]="Attendy.injuryStatus==1"\n            *ngFor="let Attendy of combinedBorrowedPlayersArray">\n\n            <div class="row">\n              <div class="card-img col-xs-2 p-0">\n                <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2"\n                  [class.no-response]="Attendy.state==3" [class.maybe]="Attendy.state==4" *ngIf="!Attendy.PHOTOPATH">\n                  <div class="img-circle"><span class="img-text">{{Attendy.first_name[0] | uppercase}} {{Attendy.last_name[0] | uppercase}} </span>\n                  </div>\n                </span>\n                <span [class.going]="Attendy.state==1" [class.not-going]="Attendy.state==2"\n                  [class.no-response]="Attendy.state==3" [class.maybe]="Attendy.state==4" *ngIf="Attendy.PHOTOPATH">\n                  <img src={{PhotoApiUrl}}{{Attendy.PHOTOPATH}} alt="" class="img-circle">\n                </span>\n\n              </div>\n              <div class="card-title col-xs-8 p-0" [class.InjuredPlayerName]="">{{Attendy.first_name | uppercase}}\n                {{Attendy.last_name | uppercase}}\n                <div class="select-group clearfix">\n                  <div class="checkArrow-group pull-left"\n                    [class.OuterDiv]="PersonData?.PERSON_ID && PersonData?.PERSON_ID==Attendy.person_id && FunctionAccess.event_EventDetail==\'self\'"\n                    *ngIf="FunctionAccess">\n                    \n                    <div *ngIf="FunctionAccess.event_EventDetail==\'yes\' && FunctionAccess.user_adminLevel != 1 &&  FunctionAccess.user_adminLevel != 3 &&  FunctionAccess.user_adminLevel != 2">\n                      <div class=" arrowUp ArrowLight" (click)="ArrowFunctionality($event)">\n                        <ion-icon name="ios-arrow-down" class=" collapsed-arrow"></ion-icon>\n                      </div>\n                    </div>\n                    <div class=" " *ngIf="PersonData?.PERSON_ID && PersonData?.PERSON_ID==Attendy.person_id && FunctionAccess.event_EventDetail==\'self\'">\n                      <div class="p-0 arrowUp loggedIn-Arrow ArrowLight" (click)="ArrowFunctionality($event)">\n                        <ion-icon name="ios-arrow-down" class=" collapsed-arrow"></ion-icon>\n                      </div>\n                    </div>\n                    \n                  </div>\n                  <div class="display-status pull-left">\n                    <p class="Show_Status" [class.InjuredPlayerStatus]="" *ngIf="Attendy.reasondeclined_by_coach==\'\'">\n                      {{Attendy.reasondeclined}}</p>\n                    <p class="Show_Status" [class.InjuredPlayerStatus]="" *ngIf="Attendy.reasondeclined_by_coach!=\'\'">\n                      {{Attendy.reasondeclined_by_coach}}</p>\n                  </div>\n                </div>\n                <div class="suit-iconCard fixedRight" (click)="DisplaySeverityDetails(Attendy)" *ngIf="FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1 && ((Attendy.playerAilmentsSeverityIcon) || (Attendy.showMedicine==1))">\n                    <img src={{global.ImagesPath}}{{Attendy.playerAilmentsSeverityIcon}} class="suit-icon" *ngIf="(Attendy.playerAilmentsSeverityIcon  && (Attendy.showMedicine==1 || Attendy.showMedicine==0))">\n                    <img src="{{global.ImagesPath}}pills.svg" class="medical-bottle" *ngIf="((Attendy.showMedicine==1) && (!Attendy.playerAilmentsSeverityIcon))">\n                  </div>\n              </div>\n              \n              <div class="col-xs-2 p-0 checkArrow-group"\n                [class.OuterDiv]="PersonData?.PERSON_ID && PersonData?.PERSON_ID==Attendy.person_id && FunctionAccess.event_EventDetail_checkbox==\'self\'"\n                *ngIf="FunctionAccess">\n\n                <div class="col-xs-2 p-0 checkbox-col" *ngIf="FunctionAccess.event_EventDetail_checkbox==\'yes\'">\n\n                  <div class="checkbox1" [class.PresentCheckbox1]="Attendy.attended==1"\n                    [class.AbsentCheckbox1]="Attendy.attended==0" [class.NoneCheckbox1]="Attendy.attended==2"\n                    (click)="AttendanceMark($event,Attendy.attended,Attendy.person_id,Attendy)">\n                  </div>\n                  <div class="checkbox"></div>\n                </div>\n              </div>\n\n\n              <ul class="dropdown-menu card-dropdown" style="display: none;">\n                <li *ngFor="let key of reason_options_list[0]"\n                  (click)="SinglePlayersAttdStates(key.confirm_reason,\'\',key.reason_display,Attendy.person_id,$event)" [class.disabled]="PersonData.ADMINLEVEL==3">\n                  <a href="javascript:void(0)"\n                    [class.SelectedReason]="key.reason_display==Attendy.reasondeclined_by_coach || key.reason_display==Attendy.reasondeclined">{{key.reason_display}}</a>\n                </li>\n                <li *ngIf="Attendy.reasondeclined_by_coach !=\'\' || Attendy.reasondeclined !=\'\'" (click)="gotoAttendanceNote(Attendy.person_id)">\n                  <a href="javascript:void(0)">Add note</a>\n                </li>\n              </ul>\n\n            </div>\n\n          </div>\n        </div>\n        <!-- Borrowed player combined End -->\n      </div>\n    </form>\n    <!-- Offline -->\n    <!-- <div class="background_blue" *ngIf="isOffline">\n      <div class="off-wrap">\n        <p><img src="assets/images/events-new-icon/offline-logo.svg" class=""></p>\n        <h3>OFFLINE</h3>\n        <p>Your network is unavalaible, please check your data or connection</p>\n        <button type="button" class="btn btn-sm-black try-again" (click)="tryAgain()">TRY AGAIN</button>\n      </div>  \n    </div> -->\n  </section>\n</ion-content>\n\n\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-dashboard-new/event-dashboard-new.html"*/,
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: "[longPress]",
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
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_vibration_ngx__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_11__providers_global_api_global_api__["a" /* GlobalApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_secure_storage_ngx__["a" /* SecureStorage */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_network_ngx__["a" /* Network */]])
    ], EventDashboardNewPage);
    return EventDashboardNewPage;
}());

//# sourceMappingURL=event-dashboard-new.js.map

/***/ })

});
//# sourceMappingURL=76.js.map