webpackJsonp([23],{

/***/ 832:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetToGoPageModule", function() { return SetToGoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__set_to_go__ = __webpack_require__(933);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SetToGoPageModule = /** @class */ (function () {
    function SetToGoPageModule() {
    }
    SetToGoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__set_to_go__["a" /* SetToGoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__set_to_go__["a" /* SetToGoPage */]),
            ],
        })
    ], SetToGoPageModule);
    return SetToGoPageModule;
}());

//# sourceMappingURL=set-to-go.module.js.map

/***/ }),

/***/ 933:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SetToGoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tabs_tabs__ = __webpack_require__(56);
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







var SetToGoPage = /** @class */ (function () {
    function SetToGoPage(navCtrl, navParams, storage, http, global, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.http = http;
        this.global = global;
        this.global_api = global_api;
        this.bgThemeColor = '';
        this.seconds = 0;
        this.SSODetails = {};
        this.isAccessGet = false;
        this.refresh = true;
        this.storage.get("mobileAssets").then(function (res) {
            if (res) {
                _this.mobileAssets = res;
            }
        });
        this.storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
            // this.backgroundThemeColor();
            // this.bgThemeColor = this.loggedInUserData.THEME_BG;
            if (typeof (_this.loggedInUserData.THEME_BG) != "undefined" && _this.loggedInUserData.THEME_BG != null && _this.loggedInUserData.THEME_BG != "") {
                if (_this.loggedInUserData.THEME_BG == _this.mobileAssets.Theme.theme_1 || _this.loggedInUserData.THEME_BG == _this.mobileAssets.Theme.theme_2)
                    _this.bgThemeColor = _this.loggedInUserData.THEME_BG;
                else
                    _this.bgThemeColor = _this.mobileAssets.Theme.theme_1;
            }
            else {
                _this.bgThemeColor = _this.mobileAssets.Theme.theme_1;
            }
            global_api.getUnreadMessageCount(val);
            if (typeof val.siblings != 'undefined') {
                var childIds = [];
                for (var i = 0; i < val.siblings.length; i++) {
                    childIds.push(val.siblings[i].person_id.toString());
                }
                childIds.push(val.PERSON_ID.toString());
                _this.storage.set('filterChild', childIds);
            }
        });
        this.storage.get('SSODetails').then(function (val) {
            if (val == null) {
                _this.SSODetails = '';
                console.log(_this.SSODetails);
            }
            else {
                _this.SSODetails = val;
                console.log(_this.SSODetails);
            }
        });
    }
    SetToGoPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.set('Refresh', this.refresh);
        setInterval(function () {
            if (_this.seconds >= 0) {
                _this.seconds++;
            }
            if (_this.seconds == 1) {
                _this.getNextEventDetails();
                _this.storage.set('isSetUp', true);
            }
            else if (_this.seconds > 1 && _this.isAccessGet) {
                _this.seconds = -1;
                clearInterval(null);
                if (_this.SSODetails) {
                    //  this.navCtrl.setRoot(TabsPage,{Player_menu:this.SSODetails.SHOWPLAYERSMENU==1?'yes':'no',Refresh:this.refresh});
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__tabs_tabs__["a" /* TabsPage */]);
                }
                else {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__tabs_tabs__["a" /* TabsPage */]);
                }
            }
        }, 1000);
    };
    SetToGoPage.prototype.backgroundThemeColor = function () {
        switch (this.loggedInUserData.THEME_BG) {
            case "blue":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            case "red":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            case "yellow":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            case "orange":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            case "pink":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            default:
                this.bgThemeColor = "blue";
                break;
        }
    };
    SetToGoPage.prototype.getNextEventDetails = function () {
        var _this = this;
        console.log("set-to-go 104");
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('clientTimeZone', this.loggedInUserData.CLIENTTIMEZONE)
            .set('selectedTeam', this.loggedInUserData.SELECTEDTEAM)
            .set('person_id', this.loggedInUserData.PERSON_ID)
            .set('SEASON_ID', this.loggedInUserData.SEASON_ID)
            .set('nextEvent', '1')
            .set('filter', '1')
            .set('client_id', this.loggedInUserData.CLIENT_ID);
        this.http.post(this.global.APIURL + 'events/getTeamEvents', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            if (response.SUCCESS) {
                console.log("page no 117", response);
                if (response.GETTEAMEVENTS != "") {
                    console.log("set-to-go 104  response.getteamevents == ''");
                    var UpcomingSingleEvent = JSON.stringify(response.GETTEAMEVENTS[0]);
                    _this.storage.set('UpcomingSingleEvent', UpcomingSingleEvent);
                    _this.UpcomingSingleEvent = JSON.parse(UpcomingSingleEvent);
                    // console.log('response',UpcomingSingleEvent)
                    _this.loggedInUserData['EVENT_ID'] = response.GETTEAMEVENTS[0].event_id;
                    _this.loggedInUserData['EVENT_TYPE_ID'] = response.GETTEAMEVENTS[0].event_type_id;
                    _this.storage.set('loggedInUserData', _this.loggedInUserData);
                }
                else {
                    var UpcomingSingleEvent = {
                        event_id: 0
                    };
                    _this.storage.set('UpcomingSingleEvent', JSON.stringify(UpcomingSingleEvent));
                }
                _this.getFunctionAccess(_this.loggedInUserData.CLUB_DIVISION_ID);
                _this.storage.get('setActivatedTeam').then(function (val) {
                    var data = JSON.parse(val);
                    console.log(data);
                    if (_this.SSODetails && val != null) {
                        _this.getFunctionAccess(data.CLUB_DIVISION_ID_FK);
                    }
                });
            }
        }, function (error) {
            console.log(error);
        });
    };
    SetToGoPage.prototype.getFunctionAccess = function (clubDivivionId) {
        var _this = this;
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', this.loggedInUserData.PERSON_ID)
            .set('client_id', this.loggedInUserData.CLIENT_ID)
            .set('club_division_id', clubDivivionId);
        this.http.post(this.global.APIURL + 'users/getPersonAccess', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            console.log("getting persion data", response);
            // this.loggedInUserData['TIMESHEETREVIEWER'] = (this.SSODetails.SHOWTIMESHEETMENU==1) ? response.TIMESHEETREVIEWER : false;
            // this.loggedInUserData['ISCONTRACTOR'] = (this.SSODetails.SHOWTIMESHEETMENU==1) ? response.ISCONTRACTOR : false;
            _this.loggedInUserData['SHOWTIMESHEETMENU'] = _this.SSODetails.SHOWTIMESHEETMENU == 1 ? true : false;
            _this.loggedInUserData['TIMESHEETREVIEWER'] = response.TIMESHEETREVIEWER ? true : false;
            _this.loggedInUserData['ISCONTRACTOR'] = response.ISCONTRACTOR ? true : false;
            _this.loggedInUserData['PAYROL'] = response.PAYROLL;
            _this.storage.set('loggedInUserData', _this.loggedInUserData);
            if (response.GETPERSONACCESS == 1) {
                var setData = {
                    user_adminLevel: 1,
                    event_StillComing: 'no',
                    event_EventDetail: 'yes',
                    event_EventDetail_checkbox: 'yes',
                    event_BorrowPlayer: 'yes',
                    event_NotifyPlayer: _this.SSODetails.SHOWNOTIFYPLAYERMENU == 1 ? 'yes' : 'no',
                    event_GroupMessage: _this.SSODetails.SHOWGROUPMESSAGEMENU == 1 ? 'yes' : 'no',
                    event_SessionPlan: 'yes but not now',
                    event_Injury: _this.SSODetails.SHOWINJURYMENU == 1 ? 'yes' : 'no',
                    event_Transport: _this.SSODetails.SHOWTRANSPORTMENU == 1 ? _this.SSODetails.SHOWTRANSPORTMENU : 0,
                    event_tab_Attendance: 'yes',
                    event_tab_Overview: 'no',
                    event_Welfare: _this.SSODetails.SHOWWELFAREMENU == 1 ? 'yes' : 'no',
                    event_Result: _this.SSODetails.SHOWRESULTSMENU == 1 ? 'yes' : 'no',
                    // event_result_321voting:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no',
                    team_assigned: 'yes',
                    player_coachingReport: 'yes',
                    player_sms: 'yes',
                    player_phone: 'yes',
                    player_emergency_phone: 'yes',
                    voting_for_player: _this.SSODetails.SHOWMVPMENU == 1 ? 'yes' : 'no',
                    game_report: 'yes',
                    game_score: 'yes',
                    bottom_player_menu: _this.SSODetails.SHOWPLAYERSMENU == 1 ? 'yes' : 'no',
                    bottom_chat_menu: _this.SSODetails.SHOWCHATMENU == 1 ? 'yes' : 'no',
                    profile_menu: _this.SSODetails.profile_menu == 1 ? 'yes' : 'no',
                    sec_absences_menu: _this.SSODetails.SHOWSECABSENCEMENU == 1 ? 'yes' : 'no',
                    session_assessment_menu: _this.SSODetails.SHOWSESSIONASSESSMENTMENU == 1 ? 'yes' : 'no',
                    // rsvp_menu:this.SSODetails.SHOWRSVPMENU==0?'yes':'no',
                    // mvp_menu:this.SSODetails.SHOWMVPMENU==1?'yes':'no',  
                    // medical_menu:this.SSODetails.SHOWMEDICALMENU==1?'yes':'no',
                    HasMedicineReviewAccess: _this.SSODetails.SHOWMEDICALMENU == 1 ? response.HASMEDICINEREVIEWACCESS : 0,
                    showSurveyMenu: _this.SSODetails.SHOWSURVEYMENU == 1 ? 'yes' : 'no',
                };
                _this.storage.set('FunctionAccess', setData);
            }
            else if (response.GETPERSONACCESS == 2) {
                var setData1 = {
                    user_adminLevel: 2,
                    event_StillComing: 'no',
                    event_EventDetail: 'yes',
                    event_EventDetail_checkbox: 'yes',
                    event_BorrowPlayer: 'yes',
                    event_NotifyPlayer: _this.SSODetails.SHOWNOTIFYPLAYERMENU == 1 ? 'yes' : 'no',
                    event_GroupMessage: _this.SSODetails.SHOWGROUPMESSAGEMENU == 1 ? 'yes' : 'no',
                    event_SessionPlan: 'yes but not now',
                    event_Injury: _this.SSODetails.SHOWINJURYMENU == 1 ? 'yes' : 'no',
                    event_Transport: _this.SSODetails.SHOWTRANSPORTMENU == 1 ? _this.SSODetails.SHOWTRANSPORTMENU : 0,
                    event_tab_Attendance: 'yes',
                    event_tab_Overview: 'no',
                    event_Welfare: _this.SSODetails.SHOWWELFAREMENU == 1 ? 'yes' : 'no',
                    event_Result: _this.SSODetails.SHOWRESULTSMENU == 1 ? 'yes' : 'no',
                    // event_result_321voting:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no',
                    team_assigned: 'yes',
                    player_coachingReport: 'yes',
                    player_sms: 'no',
                    player_phone: 'yes',
                    player_emergency_phone: 'yes',
                    voting_for_player: _this.SSODetails.SHOWMVPMENU == 1 ? 'yes' : 'no',
                    game_report: 'yes',
                    game_score: 'yes',
                    bottom_player_menu: _this.SSODetails.SHOWPLAYERSMENU == 1 ? 'yes' : 'no',
                    bottom_chat_menu: _this.SSODetails.SHOWCHATMENU == 1 ? 'yes' : 'no',
                    profile_menu: _this.SSODetails.profile_menu == 1 ? 'yes' : 'no',
                    sec_absences_menu: _this.SSODetails.SHOWSECABSENCEMENU == 1 ? 'yes' : 'no',
                    session_assessment_menu: _this.SSODetails.SHOWSESSIONASSESSMENTMENU == 1 ? 'yes' : 'no',
                    // rsvp_menu:this.SSODetails.SHOWRSVPMENU==1?'yes':'no',
                    // mvp_menu:this.SSODetails.SHOWMVPMENU==1?'yes':'no',
                    //medical_menu:this.SSODetails.SHOWMEDICALMENU==1?'yes':'no',
                    HasMedicineReviewAccess: _this.SSODetails.SHOWMEDICALMENU == 1 ? response.HASMEDICINEREVIEWACCESS : 0,
                    showSurveyMenu: _this.SSODetails.SHOWSURVEYMENU == 1 ? 'yes' : 'no',
                };
                _this.storage.set('FunctionAccess', setData1);
            }
            else if (response.GETPERSONACCESS == 3) {
                var setData2 = {
                    user_adminLevel: 3,
                    event_StillComing: 'no',
                    event_EventDetail: 'yes',
                    event_EventDetail_checkbox: 'yes',
                    event_BorrowPlayer: 'yes',
                    event_NotifyPlayer: _this.SSODetails.SHOWNOTIFYPLAYERMENU == 1 ? 'yes' : 'no',
                    event_GroupMessage: _this.SSODetails.SHOWGROUPMESSAGEMENU == 1 ? 'yes' : 'no',
                    event_SessionPlan: 'yes but not now',
                    event_Injury: _this.SSODetails.SHOWINJURYMENU == 1 ? 'yes' : 'no',
                    event_Transport: _this.SSODetails.SHOWTRANSPORTMENU == 1 ? _this.SSODetails.SHOWTRANSPORTMENU : 0,
                    event_tab_Attendance: 'yes',
                    event_tab_Overview: 'no',
                    event_Welfare: _this.SSODetails.SHOWWELFAREMENU == 1 ? 'yes' : 'no',
                    event_Result: _this.SSODetails.SHOWRESULTSMENU == 1 ? 'yes' : 'no',
                    team_assigned: 'yes',
                    player_coachingReport: 'yes',
                    player_sms: 'no',
                    player_phone: 'yes',
                    player_emergency_phone: 'yes',
                    voting_for_player: _this.SSODetails.SHOWMVPMENU == 1 ? 'yes' : 'no',
                    game_report: 'yes',
                    game_score: 'yes',
                    bottom_player_menu: _this.SSODetails.SHOWPLAYERSMENU == 1 ? 'yes' : 'no',
                    bottom_chat_menu: _this.SSODetails.SHOWCHATMENU == 1 ? 'yes' : 'no',
                    profile_menu: _this.SSODetails.profile_menu == 1 ? 'yes' : 'no',
                    sec_absences_menu: _this.SSODetails.SHOWSECABSENCEMENU == 1 ? 'yes' : 'no',
                    session_assessment_menu: _this.SSODetails.SHOWSESSIONASSESSMENTMENU == 1 ? 'yes' : 'no',
                    HasMedicineReviewAccess: _this.SSODetails.SHOWMEDICALMENU == 1 ? response.HASMEDICINEREVIEWACCESS : 0,
                    showSurveyMenu: _this.SSODetails.SHOWSURVEYMENU == 1 ? 'yes' : 'no',
                };
                _this.storage.set('FunctionAccess', setData2);
            }
            // ALLOWTOVIEWOTHERPLAYERS
            else {
                var setData3 = {
                    user_adminLevel: 4,
                    event_StillComing: _this.SSODetails.SHOWRSVPMENU == 1 ? 'yes' : 'no',
                    event_EventDetail: _this.SSODetails.SHOWRSVPMENU == 1 ? 'self' : 'no',
                    event_EventDetail_checkbox: 'self',
                    event_BorrowPlayer: 'no',
                    event_NotifyPlayer: 'no',
                    event_GroupMessage: 'no',
                    event_SessionPlan: 'no',
                    event_Injury: _this.SSODetails.SHOWINJURYMENU == 1 ? 'self' : 'no',
                    event_Transport: _this.SSODetails.SHOWTRANSPORTMENU == 1 ? _this.SSODetails.SHOWTRANSPORTMENU : 0,
                    event_tab_Attendance: 'no',
                    event_tab_Overview: 'yes',
                    event_Welfare: _this.SSODetails.SHOWWELFAREMENU == 1 ? 'self' : 'no',
                    event_Result: _this.SSODetails.SHOWRESULTSMENU == 1 ? 'yes' : 'no',
                    // event_result_321voting:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no',
                    team_assigned: 'yes',
                    player_coachingReport: 'yes',
                    player_sms: 'yes',
                    player_phone: 'yes',
                    player_emergency_phone: 'yes',
                    voting_for_player: _this.SSODetails.SHOWMVPMENU == 1 ? 'self' : 'no',
                    game_report: 'no',
                    game_score: 'no',
                    bottom_player_menu: _this.SSODetails.SHOWPLAYERSMENU == 1 ? 'yes' : 'no',
                    bottom_chat_menu: _this.SSODetails.SHOWCHATMENU == 1 ? 'yes' : 'no',
                    profile_menu: _this.SSODetails.profile_menu == 1 ? 'yes' : 'no',
                    sec_absences_menu: _this.SSODetails.SHOWSECABSENCEMENU == 1 ? 'yes' : 'no',
                    session_assessment_menu: _this.SSODetails.SHOWSESSIONASSESSMENTMENU == 1 ? 'yes' : 'no',
                    view_other_players: _this.SSODetails.ALLOWTOVIEWOTHERPLAYERS == 1 ? 'yes' : 'no',
                    //rsvp_menu:this.SSODetails.SHOWRSVPMENU==1?'yes':'no',//New
                    // mvp_menu:this.SSODetails.SHOWMVPMENU==1?'yes':'no',
                    //medical_menu:this.SSODetails.SHOWMEDICALMENU==1?'yes':'no',//New
                    HasMedicineReviewAccess: _this.SSODetails.SHOWMEDICALMENU == 1 ? response.HASMEDICINEREVIEWACCESS : 0,
                    showSurveyMenu: _this.SSODetails.SHOWSURVEYMENU == 1 ? 'yes' : 'no',
                };
                _this.storage.set('FunctionAccess', setData3);
            }
            _this.isAccessGet = true;
        }, function (error) {
            _this.storage.set('FunctionAccess', '');
            _this.isAccessGet = true;
        });
    };
    SetToGoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-set-to-go',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/set-to-go/set-to-go.html"*/'\n<!-- class="bg-gradient {{bgThemeColor}}" -->\n<ion-content [ngStyle]="{\'background-color\': bgThemeColor ? bgThemeColor :  \'#ffffff\'}">\n  <!-- <section class="main bg-gradient {{bgThemeColor}}"> -->\n    <section>\n    <form action="" class="user-form">\n      <div class="inner v-center">\n        <div class="title inverseText {{bgThemeColor}}">Now you\'re set to go!</div>\n      </div>\n    </form>\n  </section>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/set-to-go/set-to-go.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], SetToGoPage);
    return SetToGoPage;
}());

//# sourceMappingURL=set-to-go.js.map

/***/ })

});
//# sourceMappingURL=23.js.map