webpackJsonp([64],{

/***/ 796:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsResultsPageModule", function() { return EventsResultsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events_results__ = __webpack_require__(899);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var EventsResultsPageModule = /** @class */ (function () {
    function EventsResultsPageModule() {
    }
    EventsResultsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__events_results__["a" /* EventsResultsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__events_results__["a" /* EventsResultsPage */]),
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
            ],
        })
    ], EventsResultsPageModule);
    return EventsResultsPageModule;
}());

//# sourceMappingURL=events-results.module.js.map

/***/ }),

/***/ 899:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventsResultsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_calendar_ngx__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_launch_navigator_ngx__ = __webpack_require__(189);
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









var EventsResultsPage = /** @class */ (function () {
    function EventsResultsPage(navCtrl, keyboard, navParams, app, http, modalCtrl, loadingCtrl, global, storage, plt, toastCtrl, gFn, calendar, launchNavigator, Alert, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.keyboard = keyboard;
        this.navParams = navParams;
        this.app = app;
        this.http = http;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.global = global;
        this.storage = storage;
        this.plt = plt;
        this.toastCtrl = toastCtrl;
        this.gFn = gFn;
        this.calendar = calendar;
        this.launchNavigator = launchNavigator;
        this.Alert = Alert;
        this.global_api = global_api;
        this.players = [];
        this.reportTextRowOpened = false;
        this.scoreHome = "0";
        this.scoreAway = "0";
        this.scoreHomePrev = "0";
        this.scoreAwayPrev = "0";
        this.gameDismissed = "";
        this.reportText = "";
        this.arrDetail = [];
        this.vote1 = "";
        this.vote2 = "";
        this.vote3 = "";
        this.activePlayer = "";
        this.voteSuccess = false;
        this.voteForPlayerId = "";
        this.BackButton = false;
        this.coachDetails = [];
        this.homeAwayText = "";
        this.showEvent = false;
        this.groundAdress = "";
        this.groundState = "";
        this.latitude = "";
        this.longitude = "";
        this.ShowSeverityPage = false;
        this.scoreIsUpdated = 0;
        this.touched = false;
        this.score = false;
        this.medicalInfo = false;
        this.simpleHomeScore = "0";
        this.tier2HomeScore = "0";
        this.tier3HomeScore = "0";
        this.simpleAwayScore = "0";
        this.tier2AwayScore = "0";
        this.tier3AwayScore = "0";
        this.homeEventFlag = false;
        this.awayEventFlag = false;
        this.mBottom = "";
        plt.ready().then(function () {
            plt.registerBackButtonAction(function () {
                _this.navCtrl.pop();
            });
        });
        this.voteSuccess = navParams.get("success");
        this.voteForPlayerId = navParams.get("personId");
    }
    EventsResultsPage.prototype.keyboardCheck = function () {
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
    };
    EventsResultsPage.prototype.inputFocus = function () {
        this.touched = true;
        this.keyboardCheck();
    };
    EventsResultsPage.prototype.inputBlur = function () {
        this.keyboardCheck();
    };
    EventsResultsPage.prototype.ionViewDidLeave = function () {
        /* if (!this.showEvent) {
          $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({
            'mask-image': '',
            'height': '',
            'color': ''
          })
          $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({
            'mask-image': '',
            'height': '',
            'color': ''
          })
          $('.tabs .tab-button[aria-selected=true]:nth-child(2)').attr('aria-selected', 'false')
        } */
    };
    EventsResultsPage.prototype.ionViewDidLoad = function () {
        // this.storage.get('EventDetails').then((val)=>{
        // 	this.arrDetail=val
        var _this = this;
        //   })
        this.storage.get("FunctionAccess").then(function (val) {
            _this.FunctionAccess = val;
            if (val && val.game_report == "yes") {
                _this.reportTextRowOpened = true;
            }
        });
        this.storage.get("BackButton").then(function (val) {
            _this.BackButton = val;
        });
        this.storage.get("loggedInUserData").then(function (val) {
            _this.loggedInUserData = val;
            _this.coachDetails[0] = val;
            _this.clientTimeZone = _this.loggedInUserData.CLIENTTIMEZONE;
            _this.storage.get("UpcomingSingleEvent").then(function (val2) {
                _this.UpcomingSingleEvent = JSON.parse(val2);
                _this.event_id = _this.UpcomingSingleEvent.event_id;
                _this.event_type_id = _this.UpcomingSingleEvent.event_type_id;
                _this.loadDataFromAPIs();
                _this.loader = _this.loadingCtrl.create({});
                _this.loader.present();
            });
        });
    };
    EventsResultsPage.prototype.goToChooseTeamsPage = function () {
        this.navCtrl.push("ChooseTeamProfilePage");
    };
    EventsResultsPage.prototype.gotoAttandance = function () {
        this.gFn.gotoAttandance();
        this.showEvent = true;
    };
    EventsResultsPage.prototype.gotoWelfare = function () {
        this.gFn.gotoWelfare();
        this.showEvent = true;
    };
    EventsResultsPage.prototype.loadDataFromAPIs = function () {
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
    EventsResultsPage.prototype.loadPlayersVotedState = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var selectedTeam = _this.loggedInUserData.SELECTEDTEAM;
            if (_this.UpcomingSingleEvent.event_type_id == 2 &&
                _this.UpcomingSingleEvent.teamid) {
                selectedTeam = _this.UpcomingSingleEvent.teamid;
            }
            else if (_this.UpcomingSingleEvent.event_type_id == 1) {
                if (_this.UpcomingSingleEvent.homeclubid == _this.loggedInUserData.CLUB_ID) {
                    selectedTeam = _this.UpcomingSingleEvent.hometeam;
                }
                else {
                    selectedTeam = _this.UpcomingSingleEvent.awayteam;
                }
            }
            var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set("event_id", _this.UpcomingSingleEvent.event_id)
                .set("team_id", selectedTeam)
                .set("client_id", _this.UpcomingSingleEvent.client_id)
                .set("selectedTeam", selectedTeam)
                .set("club_id", _this.loggedInUserData.CLUB_ID)
                .set("voter_id", _this.loggedInUserData.PERSON_ID);
            _this.http
                .post(_this.global.APIURL + "votes/getVotingPlayersEvent", data, {
                headers: _this.global_api.getHeader(),
            })
                .subscribe(function (response) {
                if (response.SUCCESS) {
                    _this.titleHide = response.SUCCESS;
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
    EventsResultsPage.prototype.getEventDetails = function () {
        var _this = this;
        var selectedTeam = this.loggedInUserData.SELECTEDTEAM;
        if (this.UpcomingSingleEvent.event_type_id == 2 &&
            this.UpcomingSingleEvent.teamid) {
            selectedTeam = this.UpcomingSingleEvent.teamid;
        }
        else if (this.UpcomingSingleEvent.event_type_id == 1) {
            if (this.UpcomingSingleEvent.homeclubid == this.loggedInUserData.CLUB_ID) {
                selectedTeam = this.UpcomingSingleEvent.hometeam;
            }
            else {
                selectedTeam = this.UpcomingSingleEvent.awayteam;
            }
        }
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set("event_id", _this.UpcomingSingleEvent.event_id)
                .set("event_type_id", _this.UpcomingSingleEvent.event_type_id)
                .set("clientTimeZone", _this.loggedInUserData.CLIENTTIMEZONE)
                .set("selectedTeam", selectedTeam)
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
                for (var _i = 0, _a = _this.arrDetail; _i < _a.length; _i++) {
                    var keys = _a[_i];
                    _this.key = keys;
                    _this.date = _this.key.date.split("/")[0];
                    _this.groundAdress = _this.key.ground_address;
                    _this.groundState = _this.key.ground_state;
                    _this.longitude = _this.key.geoloc_longitude;
                    _this.latitude = _this.key.geoloc_latitude;
                    _this.input_disable = _this.key.canScore;
                }
                if (response.GETEVENTDETAILS.length > 0) {
                    console.log("response.GETEVENTDETAILS[0]", response.GETEVENTDETAILS[0]["isUpdated"]);
                    _this.scoreIsUpdated = response.GETEVENTDETAILS[0]["isUpdated"];
                    _this.previousHomeScore = _this.getPrefixedNumberUpdate(response.GETEVENTDETAILS[0]["simpleHomeScore"]);
                    _this.previousAwayScore = _this.getPrefixedNumberUpdate(response.GETEVENTDETAILS[0]["simpleAwayScore"]);
                    _this.simpleHomeScore = _this.getPrefixedNumber(response.GETEVENTDETAILS[0]["simpleHomeScore"]);
                    _this.tier2HomeScore = _this.getPrefixedNumber(response.GETEVENTDETAILS[0]["tier2HomeScore"]);
                    _this.tier3HomeScore = _this.getPrefixedNumber(response.GETEVENTDETAILS[0]["tier3HomeScore"]);
                    _this.simpleAwayScore = _this.getPrefixedNumber(response.GETEVENTDETAILS[0]["simpleAwayScore"]);
                    _this.tier2AwayScore = _this.getPrefixedNumber(response.GETEVENTDETAILS[0]["tier2AwayScore"]);
                    _this.tier3AwayScore = _this.getPrefixedNumber(response.GETEVENTDETAILS[0]["tier3AwayScore"]);
                    // this.scoreHome = this.getPrefixedNumber(response.GETEVENTDETAILS[0]["homescore"]);
                    // this.scoreAway = this.getPrefixedNumber(response.GETEVENTDETAILS[0]["awayscore"]);
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
            }, function (error) { });
        });
    };
    EventsResultsPage.prototype.backArrow = function () {
        this.navCtrl.pop();
        /* this.app.getRootNav().getActiveChildNav().select(1).then(() => {
          $('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected', 'true')
        }); */
    };
    EventsResultsPage.prototype.saveGameScore = function () {
        /* if(this.arrDetail[0]['scoreType'] == '2'){
          this.scoreHome = this.getPrefixedNumber(this.simpleHomeScore);
          this.scoreAway = this.getPrefixedNumber(this.simpleAwayScore);
        }else{
          this.scoreHome = this.getPrefixedNumber(this.scoreHome);
            this.scoreAway = this.getPrefixedNumber(this.scoreAway);
        } */
        var _this = this;
        this.scoreHome = this.getPrefixedNumber(this.simpleHomeScore);
        this.scoreAway = this.getPrefixedNumber(this.simpleAwayScore);
        var loader = this.loadingCtrl.create({});
        loader.present();
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set("event_id", this.event_id)
            .set("homescore", this.scoreHome)
            .set("awayscore", this.scoreAway)
            .set("tier2homeScore", this.tier2HomeScore)
            .set("tier2AwayScore", this.tier2AwayScore)
            .set("tier3homeScore", this.tier3HomeScore)
            .set("tier3AwayScore", this.tier3AwayScore);
        this.http
            .post(this.global.APIURL + "events/saveGameScore", data)
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
    //   && this.reportText.trim().length
    EventsResultsPage.prototype.saveGameReport = function (isReport, isScoreSave) {
        var _this = this;
        if (isScoreSave === void 0) { isScoreSave = false; }
        if (typeof this.loggedInUserData !== "undefined") {
            if (!isReport || isReport) {
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
                    .set("person_id", this.loggedInUserData.PERSON_ID)
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
                            //msg = isScoreSave
                            // ? "Game score and report saved."
                            // : "Game report saved.";
                            if (_this.reportText != "" && _this.score == true) {
                                msg = "Game score and report saved.";
                            }
                            else if (_this.reportText != "" && _this.score == false) {
                                msg = "Game report saved.";
                            }
                            else if (_this.score == true) {
                                "Game score saved.";
                            }
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
    EventsResultsPage.prototype.gameDismissedChange = function (ev) {
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
    EventsResultsPage.prototype.saveVote = function (ev, person_id, ratings) {
        var _this = this;
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
        var selectedTeam = this.loggedInUserData.SELECTEDTEAM;
        if (this.UpcomingSingleEvent.event_type_id == 2 &&
            this.UpcomingSingleEvent.teamid) {
            selectedTeam = this.UpcomingSingleEvent.teamid;
        }
        else if (this.UpcomingSingleEvent.event_type_id == 1) {
            if (this.UpcomingSingleEvent.homeclubid == this.loggedInUserData.CLUB_ID) {
                selectedTeam = this.UpcomingSingleEvent.hometeam;
            }
            else {
                selectedTeam = this.UpcomingSingleEvent.awayteam;
            }
        }
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set("event_id", this.event_id)
            .set("team_id", selectedTeam)
            .set("voter_id", this.loggedInUserData.PERSON_ID)
            .set("v3", this.vote3)
            .set("v2", this.vote2)
            .set("v1", this.vote1)
            .set("vote_baf_1", "")
            .set("vote_baf_2", "")
            .set("vote_baf_3", "")
            .set("season_id", this.loggedInUserData.SEASON_ID);
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
    EventsResultsPage.prototype.getPrefixedNumber = function (num) {
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
    EventsResultsPage.prototype.getPrefixedNumberUpdate = function (num) {
        if (typeof num == "undefined") {
            num = "0";
        }
        else {
            num = num.toString().replace(/^[0]+/, "");
        }
        return num;
    };
    EventsResultsPage.prototype.prefixNumber = function (ev) {
        var num = this.getPrefixedNumber(ev.target.value);
        setTimeout(function () {
            if (num != ev.target.value) {
                ev.target.value = num;
            }
        }, 50);
    };
    EventsResultsPage.prototype.voteForPlayer = function (playerID, playerDetails) {
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
    EventsResultsPage.prototype.DisplaySeverityDetails = function (playerAilments) {
        this.ShowSeverityPage = true;
        if (playerAilments) {
            var SeverityModal = this.modalCtrl.create("SeverityDetailsModalPage", {
                playerAilments: playerAilments,
            });
            SeverityModal.present();
        }
        else {
            this.presentToast("No Details found");
        }
    };
    EventsResultsPage.prototype.MedicineInformation = function (data) {
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
    EventsResultsPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: "top",
        });
        toast.present();
    };
    EventsResultsPage.prototype.addEventToCalendar = function () {
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
    EventsResultsPage.prototype.presentAlert = function (Title, SubTitle) {
        var alert = this.Alert.create({
            title: Title,
            subTitle: SubTitle,
            buttons: ["Dismiss"],
        });
        alert.present(alert);
    };
    EventsResultsPage.prototype.openMap = function (address, state, latitude, longitude) {
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
    //   && this.reportText.trim().length
    EventsResultsPage.prototype.saveGameScoreAndReport = function () {
        $(".btn-sm-black").addClass("active");
        if (this.scoreIsUpdated == 0) {
            //if (this.homeEventFlag || this.awayEventFlag || (this.arrDetail[0]['scoreType'] == '3' && this.simpleHomeScore  ) ) {
            this.score = true;
            this.saveGameScore();
            // }
        }
        this.saveGameReport(true, this.scoreIsUpdated == 0 ? true : false);
    };
    EventsResultsPage.prototype.onInputChange = function (event) {
        this.homeEventFlag = event.target.value ? true : false;
    };
    EventsResultsPage.prototype.onAwayChange = function (event) {
        this.awayEventFlag = event.target.value ? true : false;
    };
    EventsResultsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "page-events-results",template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/events-results/events-results.html"*/'<ion-header>\n\n    <ion-navbar class="main">\n        <div class="top-bar clearfix">\n            <div class="pull-left">\n                <div>\n                    <button class="BackButton" (click)="backArrow()" *ngIf="BackButton"><img src="assets/images/arrow-black.svg"></button> RESULT\n                </div>\n            </div>\n            <!--<div class="prev-next pull-right" (click)="goToChooseTeamsPage()">\n                <a href="javascript:void(0);" class="next"></a>\n                <a href="javascript:void(0);" class="prev"></a>\n            </div>\n            <div class="calendar pull-right" (click)="addEventToCalendar()">\n                <img src="assets/images/calendar.svg">\n\n            </div>\n            <div class="location pull-right" (click)="openMap(groundAdress,groundState,latitude,longitude)">\n              <img src="assets/images/Location.svg">\n            </div>-->\n        </div>\n    </ion-navbar>\n    <!-- <ion-grid class="nav navbar-nav top-menu">\n            <ion-row *ngIf="FunctionAccess "> -->\n    <!--<ion-col >\n                    <a  href="javascript:void(0)" *ngIf="FunctionAccess.event_tab_Attendance==\'yes\'" (click)="gotoAttandance()">\n                        <span class="ActiveSpan InactiveSpan">Attendance</span>\n                    </a>\n                    <a  href="javascript:void(0)" *ngIf="FunctionAccess.event_tab_Overview==\'yes\'" (click)="gotoAttandance()">\n                        <span class=" ActiveSpan InactiveSpan">Overview</span>\n                    </a>\n                </ion-col>-->\n    <!--<ion-col *ngIf="FunctionAccess.event_Welfare==\'yes\' && (UpcomingSingleEvent && UpcomingSingleEvent.welfare_question==1)">\n                    <a href="javascript:void(0)" (click)="gotoWelfare()">\n                        <span class="ActiveSpan InactiveSpan">Welfare</span>\n                    </a>\n                </ion-col>-->\n    <!--<ion-col *ngIf=" UpcomingSingleEvent && UpcomingSingleEvent.event_type_id!=2">\n                    <a href="javascript:void(0)" (click)="gotoStats()">\n                        <span class=" ActiveSpan InactiveSpan">Stats</span>\n                    </a>\n                </ion-col>-->\n    <!-- <ion-col *ngIf="FunctionAccess.event_Result==\'yes\' && UpcomingSingleEvent && UpcomingSingleEvent.event_type_id!=2">\n                    <a href="javascript:void(0)">\n                        <span class="active ActiveSpan">Results</span>\n                    </a>\n                </ion-col>\n            </ion-row>\n        </ion-grid> -->\n</ion-header>\n<ion-content class="bg-black event" (click)="keyboardCheck()">\n    <section class="main">\n        <form action="" class="user-form profile event-results">\n            <section class="profileFirst bg-black heightAuto xs-padding" *ngIf="FunctionAccess &&  FunctionAccess.event_Result==\'yes\'">\n                <div class="form-group" *ngFor="let detail of arrDetail">\n                    <div class="date_time text-blue text-center">\n                        <span class="dateOption">{{key.week}} {{date}}</span>\n                        <span class="glyphicon glyphicon-time" *ngIf="arrDetail"></span> <span class="timeOption">{{key.time_started}}</span>\n                    </div>\n                    <div class="homeAway-title text-center text-blue">{{homeAwayText}}</div>\n                    <h4 class="info-item text-center inverseText" *ngFor="let detail of arrDetail">{{detail.name}}</h4>\n                    <p class="text-center inverseText">{{detail.ground_name}}\n                        <br>{{detail.ground_address}}, {{detail.ground_state}}\n                    </p>\n                    <div class="bookmark-line mt-30"></div>\n                    <h5 class="section-title mt-30">FINAL SCORE</h5>\n                    <!-- code from riverView starts scoreType:1-->\n                    <div *ngIf="detail.scoreType != \'2\' && detail.scoreType != \'3\'" class="voting score clearfix">\n                        <div class="pull-left">\n                            <div class="select-val">\n                                <ion-item>\n                                    <ion-input type="number" pattern="[0-9]*" elastic [(ngModel)]="simpleHomeScore" (input)="onInputChange($event)" name="simpleHomeScore" (keyup)="prefixNumber($event)" (ionFocus)="inputFocus()" (ionBlur)="inputBlur()" [readonly]="(FunctionAccess && FunctionAccess.game_score==\'no\') || scoreIsUpdated==1"></ion-input>\n                                </ion-item>\n                            </div>\n                            <h5 class="inverseText fontBold m-0">{{detail.hometeamname}}</h5>\n                        </div>\n                        <div class="pull-right">\n                            <div class="select-val">\n                                <ion-item>\n                                    <ion-input type="number" pattern="[0-9]*" elastic [(ngModel)]="simpleAwayScore" (input)="onAwayChange($event)"\n                                    name="simpleAwayScore" (keyup)="prefixNumber($event)" (ionFocus)="inputFocus()" (ionBlur)="inputBlur()" [readonly]="(FunctionAccess && FunctionAccess.game_score==\'no\') || scoreIsUpdated==1"></ion-input>\n                                </ion-item>\n                            </div>\n                            <h5 class="inverseText fontBold m-0">{{detail.awayteamname}}</h5>\n                        </div>\n                    </div>\n                    <!-- code from riverView ends scoreType:1 -->\n                    <!-- scoreType:2 starts -->\n                    <div>\n\n                        <ion-grid *ngIf="detail.scoreType == \'2\'">\n                            <!-- home team design starts -->\n                            <ion-row>\n                                <ion-col no-lines no-padding text-center>\n                                    <h5 class="inverseText fontBold m-0" style="padding-top: 31% !important;">\n                                        {{detail.hometeamname}}</h5>\n                                </ion-col>\n                                <ion-col size="3">\n                                    <div class="pull-left">\n                                        <h5 class="inverseText fontBold m-0">{{detail.homeAwayScoreLabel}}</h5>\n                                        <div class="select-val">\n                                            <ion-item>\n                                                <!-- style="width: 60% !important;" -->\n                                                <ion-input type="number" pattern="[0-9]*" elastic [(ngModel)]="simpleHomeScore" \n                                                name="simpleHomeScore" (keyup)="prefixNumber($event)" (ionFocus)="inputFocus()" (ionBlur)="inputBlur()" [readonly]="(FunctionAccess && FunctionAccess.game_score==\'no\') || scoreIsUpdated==1">\n                                                </ion-input>\n                                            </ion-item>\n                                        </div>\n\n                                    </div>\n                                </ion-col>\n                                <ion-col size="3">\n                                    <div class="pull-left">\n                                        <h5 class="inverseText fontBold m-0">{{detail.homeAwayT2ScoreLabel}}</h5>\n                                        <div class="select-val">\n                                            <ion-item>\n                                                <ion-input type="number" pattern="[0-9]*" elastic [(ngModel)]="tier2HomeScore" name="tier2HomeScore" (keyup)="prefixNumber($event)" (ionFocus)="inputFocus()" (ionBlur)="inputBlur()" [readonly]="(FunctionAccess && FunctionAccess.game_score==\'no\') || scoreIsUpdated==1">\n                                                </ion-input>\n                                            </ion-item>\n                                        </div>\n\n                                    </div>\n                                </ion-col>\n\n                            </ion-row>\n                            <!-- home team design ends -->\n\n                            <!-- Away team design starts -->\n                            <ion-row>\n                                <ion-col no-lines no-padding text-center>\n                                    <h5 class="inverseText fontBold m-0" style="padding-top: 20% !important;">\n                                        {{detail.awayteamname}}</h5>\n                                </ion-col>\n                                <ion-col size="3">\n                                    <div class="pull-left">\n                                        <div class="select-val">\n                                            <ion-item>\n                                                <!-- style="width: 60% !important;" -->\n                                                <ion-input type="number" pattern="[0-9]*" elastic [(ngModel)]="simpleAwayScore" name="simpleAwayScore" (keyup)="prefixNumber($event)" (ionFocus)="inputFocus()" (ionBlur)="inputBlur()" [readonly]="(FunctionAccess && FunctionAccess.game_score==\'no\') || scoreIsUpdated==1">\n                                                </ion-input>\n                                            </ion-item>\n                                        </div>\n\n                                    </div>\n                                </ion-col>\n                                <ion-col size="3">\n                                    <div class="pull-left">\n                                        <div class="select-val">\n                                            <ion-item>\n                                                <ion-input type="number" pattern="[0-9]*" elastic [(ngModel)]="tier2AwayScore" name="tier2AwayScore" (keyup)="prefixNumber($event)" (ionFocus)="inputFocus()" (ionBlur)="inputBlur()" [readonly]="(FunctionAccess && FunctionAccess.game_score==\'no\') || scoreIsUpdated==1">\n                                                </ion-input>\n                                            </ion-item>\n                                        </div>\n\n                                    </div>\n                                </ion-col>\n\n                            </ion-row>\n                            <!-- Away team designing ends -->\n\n                        </ion-grid>\n                    </div>\n                    <!-- scoreType:2 ends -->\n\n                    <!-- code from riverview starts scoreType:3-->\n                    <div>\n                        <ion-grid *ngIf="detail.scoreType == \'3\'">\n                            <!-- home team design starts -->\n                            <ion-row>\n                                <ion-col no-lines no-padding text-center>\n                                    <h5 class="inverseText fontBold m-0" style="padding-top: 31% !important;">{{detail.hometeamname}}</h5>\n                                </ion-col>\n                                <ion-col size="3">\n                                    <div class="pull-left">\n                                        <h5 class="inverseText fontBold m-0">{{detail.homeAwayScoreLabel}}</h5>\n                                        <div class="select-val">\n                                            <ion-item>\n                                                <!-- style="width: 60% !important;" -->\n                                                <ion-input type="number" pattern="[0-9]*" elastic [(ngModel)]="simpleHomeScore" name="simpleHomeScore" (keyup)="prefixNumber($event)" (ionFocus)="inputFocus()" (ionBlur)="inputBlur()" [readonly]="(FunctionAccess && FunctionAccess.game_score==\'no\') || scoreIsUpdated==1"\n                                                (input)="onInputChange($event)"></ion-input>\n                                            </ion-item>\n                                        </div>\n\n                                    </div>\n                                </ion-col>\n                                <ion-col size="3">\n                                    <div class="pull-left">\n                                        <h5 class="inverseText fontBold m-0">{{detail.homeAwayT2ScoreLabel}}</h5>\n                                        <div class="select-val">\n                                            <ion-item>\n                                                <ion-input type="number" pattern="[0-9]*" elastic [(ngModel)]="tier2HomeScore" name="tier2HomeScore" (keyup)="prefixNumber($event)" (ionFocus)="inputFocus()" (ionBlur)="inputBlur()" [readonly]="(FunctionAccess && FunctionAccess.game_score==\'no\') || scoreIsUpdated==1"></ion-input>\n                                            </ion-item>\n                                        </div>\n\n                                    </div>\n                                </ion-col>\n                                <ion-col size="3">\n                                    <div class="pull-left">\n                                        <h5 class="inverseText fontBold m-0">{{detail.homeAwayT3ScoreLabel}}</h5>\n                                        <div class="select-val">\n                                            <ion-item>\n                                                <!-- style="width: 60% !important;" -->\n                                                <ion-input type="number" pattern="[0-9]*" elastic [(ngModel)]="tier3HomeScore" name="tier3HomeScore" (keyup)="prefixNumber($event)" (ionFocus)="inputFocus()" (ionBlur)="inputBlur()" [readonly]="(FunctionAccess && FunctionAccess.game_score==\'no\') || scoreIsUpdated==1"></ion-input>\n                                            </ion-item>\n                                        </div>\n\n                                    </div>\n                                </ion-col>\n                            </ion-row>\n                            <!-- home team design ends -->\n\n                            <!-- Away team design starts -->\n                            <ion-row>\n                                <ion-col no-lines no-padding text-center>\n                                    <h5 class="inverseText fontBold m-0" style="padding-top: 20% !important;">{{detail.awayteamname}}</h5>\n                                </ion-col>\n                                <ion-col size="3">\n                                    <div class="pull-left">\n                                        <div class="select-val">\n                                            <ion-item>\n                                                <!-- style="width: 60% !important;" -->\n                                                <ion-input type="number" pattern="[0-9]*" elastic [(ngModel)]="simpleAwayScore" name="simpleAwayScore" (keyup)="prefixNumber($event)" (ionFocus)="inputFocus()" (ionBlur)="inputBlur()" [readonly]="(FunctionAccess && FunctionAccess.game_score==\'no\') || scoreIsUpdated==1"\n                                                (input)="onAwayChange($event)"></ion-input>\n                                            </ion-item>\n                                        </div>\n\n                                    </div>\n                                </ion-col>\n                                <ion-col size="3">\n                                    <div class="pull-left">\n                                        <div class="select-val">\n                                            <ion-item>\n                                                <ion-input type="number" pattern="[0-9]*" elastic [(ngModel)]="tier2AwayScore" name="tier2AwayScore" (keyup)="prefixNumber($event)" (ionFocus)="inputFocus()" (ionBlur)="inputBlur()" [readonly]="(FunctionAccess && FunctionAccess.game_score==\'no\') || scoreIsUpdated==1"></ion-input>\n                                            </ion-item>\n                                        </div>\n\n                                    </div>\n                                </ion-col>\n                                <ion-col size="3">\n                                    <div class="pull-left">\n                                        <div class="select-val">\n                                            <ion-item>\n                                                <!-- style="width: 60% !important;" -->\n                                                <ion-input type="number" pattern="[0-9]*" elastic [(ngModel)]="tier3AwayScore" name="tier3AwayScore" (keyup)="prefixNumber($event)" (ionFocus)="inputFocus()" (ionBlur)="inputBlur()" [readonly]="(FunctionAccess && FunctionAccess.game_score==\'no\') || scoreIsUpdated==1"></ion-input>\n                                            </ion-item>\n                                        </div>\n\n                                    </div>\n                                </ion-col>\n                            </ion-row>\n                            <!-- Away team designing ends -->\n\n                        </ion-grid>\n                    </div>\n                    <!-- code from riverview ends scoreType:3-->\n                </div>\n                <div class="row" *ngIf="(FunctionAccess && FunctionAccess.user_adminLevel !=4) ||\n                (((loggedInUserData && loggedInUserData.ISPARENT) || (FunctionAccess && FunctionAccess.user_adminLevel ==4)) && gameDismissed.length)">\n                    <div class="bookmark-line mt-30"></div>\n                    <div class="radio-option">\n                        <div class="col-xs-12 p-0 flatten">\n                            <div class="radio col-xs-6">\n                                <input type="radio" value="washout" name="gameDismissed" [(ngModel)]="gameDismissed" class="radio-game-dismissed" (click)="gameDismissedChange($event);" />\n                                <label class="sub-title inverseText fontBold Washout">WASHOUT</label>\n                            </div>\n\n\n                            <div class="radio col-xs-6">\n                                <input type="radio" value="forfeit" name="gameDismissed" [(ngModel)]="gameDismissed" class="radio-game-dismissed" (click)="gameDismissedChange($event);" [disabled]="FunctionAccess && FunctionAccess.game_score==\'no\'" />\n                                <label class="sub-title inverseText fontBold Forfeit">FORFEIT</label>\n                            </div>\n                        </div>\n                        <!--<div class="team-report-wrap col-xs-2 p-0 text-center" (click)="reportTextRowOpened=true" *ngIf="FunctionAccess && FunctionAccess.game_report==\'yes\'">\n                            <img src="assets/images/team-report.svg" alt="">\n                            <div class="xs-title">TEAM<br> REPORT</div>\n                        </div>-->\n                    </div>\n                </div>\n                <div class="row" *ngIf="FunctionAccess && FunctionAccess.game_report==\'yes\'" (click)="keyboardCheck()">\n                    <div class="well report bg-white mt-30 col-xs-12">\n                        <h5 class="section-title report-text">REPORT</h5>\n                        <ion-item>\n                            <ion-textarea class="form-control iontextarea" name="reportText" cols="30" rows="5" [(ngModel)]="reportText" (ionFocus)="inputFocus()" (ionBlur)="inputBlur()"></ion-textarea>\n                        </ion-item>\n                    </div>\n                    <!-- <button type="submit" class="btn btn-save btn-sm-black radius-10" (click)="saveGameScoreAndReport()" *ngIf="input_disable">SAVE</button> -->\n                    <button type="submit" [disabled]="!input_disable" class="btn btn-save btn-sm-black radius-10" (click)="saveGameScoreAndReport()" >SAVE</button>\n                </div>\n            </section>\n            <div class="event-card bg-gray" *ngIf="FunctionAccess && FunctionAccess.voting_for_player!=\'no\' && titleHide">\n                <h5 class="section-title">3-2-1 VOTING</h5>\n                <div *ngIf="FunctionAccess && FunctionAccess.voting_for_player==\'yes\'">\n                    <div class="well select-card" *ngFor="let coach of coachDetails" [class.active]="(activePlayer==coach.PERSON_ID)" (click)="voteForPlayer(coach.PERSON_ID, coach)">\n                        <div class="row">\n                            <div class="card-img col-xs-2 p-0">\n                                <span class="">\n                                <div class="img-circle" *ngIf="coach.PHOTOPATH == \'\'"><span class="img-text">{{coach.FIRST_NAME[0]}} {{coach.LAST_NAME[0]}} </span></div>\n                            <img src="{{global.PROFILEIMAGEURL}}/{{coach.PHOTOPATH}}" alt="" class="img-circle" onerror="this.src=\'assets/images/test-user.svg\'" *ngIf="coach.PHOTOPATH != \'\'">\n                            <!-- <img src="assets/images/test-user.svg" alt="" class="img-circle" *ngIf="coach.PHOTOPATH == \'\'"> -->\n                            </span>\n                        </div>\n                        <div class="card-title col-xs-8 p-0">My Vote</div>\n                        <div class="event-next col-xs-1 p-0 show-tickmark" *ngIf="FunctionAccess && FunctionAccess.voting_for_player==\'yes\'">\n                            <ion-icon class="next-arrow v-center" ios="ios-checkmark" md="md-checkmark" color=primary *ngIf="(voteSuccess==true && voteForPlayerId==coach.PERSON_ID) || (coach.voted==1)"></ion-icon>\n                        </div>\n                        <div class="event-next col-xs-1 p-0" *ngIf="FunctionAccess && FunctionAccess.voting_for_player==\'yes\'">\n                            <a href="javascript:void(0);" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n                        </div>\n                    </div>\n                </div>\n                <h5 class="section-title">TEAM MATES</h5>\n            </div>\n            <div class="well select-card" *ngFor="let player of players" [class.active]="(activePlayer==player.person_id)" (click)="voteForPlayer(player.person_id, player)">\n                <div class="row">\n                    <div class="card-img col-xs-2 p-0">\n                        <span class="">\n                                    <div class="img-circle" *ngIf="player.photoPath == \'\'"><span class="img-text">{{player.first_name[0] | uppercase}} {{player.last_name[0] | uppercase}} </span></div>\n                    <img src="{{global.PROFILEIMAGEURL}}/{{player.photoPath}}" alt="" class="img-circle" onerror="this.src=\'assets/images/test-user.svg\'" *ngIf="player.photoPath != \'\'">\n                    <!-- <img src="assets/images/test-user.svg" alt="" class="img-circle" *ngIf="player.photoPath == \'\'"> -->\n                    </span>\n                </div>\n                <div class="card-title  p-0" [class.col-xs-5]="FunctionAccess && FunctionAccess.voting_for_player==\'self\'" [class.col-xs-8]="FunctionAccess && FunctionAccess.voting_for_player==\'yes\'">{{player.first_name}} {{player.last_name}}\n\n                    <div>\n                        <span *ngIf="player.uniform_id">#{{player.uniform_id}}</span>\n                    </div>\n                    <!-- <div class="suit-iconCard fixedRight" (click)="DisplaySeverityDetails(player)" *ngIf="FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1 && ((player.playerAilmentsSeverityIcon) || (player.showMedicine==1))">\n                            <img src={{global.ImagesPath}}{{player.playerAilmentsSeverityIcon}} class="suit-icon" *ngIf="(player.playerAilmentsSeverityIcon  && (player.showMedicine==1 || player.showMedicine==0))">\n                            <img src="{{global.ImagesPath}}pills.svg" class="medical-bottle" *ngIf="((player.showMedicine==1) && (!player.playerAilmentsSeverityIcon))">\n                        </div> -->\n\n\n                </div>\n\n                <div class="event-next  col-xs-1 p-0 show-tickmark" *ngIf="FunctionAccess && FunctionAccess.voting_for_player==\'yes\'">\n                    <ion-icon class="next-arrow v-center" ios="ios-checkmark" md="md-checkmark" color=primary *ngIf="(voteSuccess==true && voteForPlayerId==player.person_id) || (player.voted==1)"></ion-icon>\n                </div>\n                <div class="event-next col-xs-1 p-0" *ngIf="FunctionAccess && FunctionAccess.voting_for_player==\'yes\'">\n                    <a href="javascript:void(0);" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n                </div>\n                <div class="voting col-xs-5 p-0" *ngIf="FunctionAccess && FunctionAccess.voting_for_player==\'self\'">\n                    <a href="javascript:void(0)" class="select-val vote3" [class.active]="player.person_id == player.vote3" (click)="saveVote($event, player.person_id, 3)">3</a>\n                    <a href="javascript:void(0)" class="select-val vote2" [class.active]="player.person_id == player.vote2" (click)="saveVote($event, player.person_id, 2)">2</a>\n                    <a href="javascript:void(0)" class="select-val vote1" [class.active]="player.person_id == player.vote1" (click)="saveVote($event, player.person_id, 1)">1</a>\n                </div>\n            </div>\n            </div>\n            </div>\n        </form>\n    </section>\n</ion-content>'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/events-results/events-results.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_calendar_ngx__["a" /* Calendar */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_launch_navigator_ngx__["a" /* LaunchNavigator */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_8__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], EventsResultsPage);
    return EventsResultsPage;
}());

//# sourceMappingURL=events-results.js.map

/***/ })

});
//# sourceMappingURL=64.js.map