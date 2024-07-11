webpackJsonp([12],{

/***/ 845:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimesheetDashboardPageModule", function() { return TimesheetDashboardPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timesheet_dashboard__ = __webpack_require__(945);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TimesheetDashboardPageModule = /** @class */ (function () {
    function TimesheetDashboardPageModule() {
    }
    TimesheetDashboardPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__timesheet_dashboard__["a" /* TimesheetDashboardPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__timesheet_dashboard__["a" /* TimesheetDashboardPage */]),
            ],
        })
    ], TimesheetDashboardPageModule);
    return TimesheetDashboardPageModule;
}());

//# sourceMappingURL=timesheet-dashboard.module.js.map

/***/ }),

/***/ 945:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimesheetDashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_api_global_api__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_global_functions_global_functions__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TimesheetDashboardPage = /** @class */ (function () {
    function TimesheetDashboardPage(navCtrl, http, storage, globalApi, navParams, global, events, keyboard, app, gFn, global_api) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.storage = storage;
        this.globalApi = globalApi;
        this.navParams = navParams;
        this.global = global;
        this.events = events;
        this.keyboard = keyboard;
        this.app = app;
        this.gFn = gFn;
        this.global_api = global_api;
        this.segments = '';
        this.PersonData = {};
        this.getContractorList = [];
        this.EventsDetails = [];
        this.HomeEventsDetails = [];
        this.monthArray = [];
        this.HomemonthArray = [];
        this.CardViewSeeMore = 1;
        this.Event_Success = false;
        this.Hours_Success = false;
        this.eventsStatusCount = [0, 0, 0]; // Pending, Approved, Rejected
        this.homeEventsStatusCount = [0, 0, 0]; // Pending, Approved, Rejected
        gFn.showMenuIcon();
        // console.log("navParamData",this.navParams.get('segments'));
        // this.storage.get('loggedInUserData').then((val) => {
        //   this.PersonData = val;
        //   console.log("Person Access level",this.PersonData);
        // });
    }
    TimesheetDashboardPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // this.PROFILEIMAGEURL= this.global.PROFILEIMAGEDEVURL
        this.gFn.showMenuIcon();
        if (this.navParams.get('segments')) {
            this.segments = this.navParams.get('segments');
        }
        else {
            this.segments = 'Events';
        }
        this.storage.get('UpcomingSingleEvent').then(function (val) {
            _this.UpcomingSingleEvent = JSON.parse(val);
            console.log("UpcomingSingleEvent--->", _this.UpcomingSingleEvent);
            _this.storage.get('loggedInUserData').then(function (val) {
                _this.PersonData = val;
                console.log("PersonData", _this.PersonData);
                if (_this.PersonData.ISCONTRACTOR == 1) {
                    _this.segments = "MyHours";
                }
                if (_this.UpcomingSingleEvent) {
                    _this.getCoachDetails().then(function (y) {
                    });
                }
                if (_this.navParams.get('segments')) {
                    var event_1 = {};
                    event_1.value = _this.segments;
                    _this.segmentChanged(event_1);
                }
                else {
                    // this.globalApi.getTimesheetEvents(this.PersonData).subscribe((user)=>{
                    //   this.UpcomingEvent(user)
                    _this.HomemonthArray = [];
                    _this.globalApi.getTimesheetDashboardEventsPerson(_this.PersonData).subscribe(function (users) {
                        _this.UpcomingEventSinglePerson(users);
                    });
                }
            });
        });
    };
    TimesheetDashboardPage.prototype.segmentChanged = function (ev) {
        var _this = this;
        if (ev.value == 'Events') {
            this.monthArray = [];
            this.isLoading = true;
            this.globalApi.getTimesheetEvents(this.PersonData).subscribe(function (user) {
                console.log("user", user);
                _this.UpcomingEvent(user);
            });
            this.CardViewSeeMore = 1;
        }
        else if (ev.value == 'MyHours') {
            this.HomemonthArray = [];
            this.isMyHoursLoading = true;
            this.globalApi.getTimesheetDashboardEventsPerson(this.PersonData).subscribe(function (users) {
                _this.UpcomingEventSinglePerson(users);
            });
            this.CardViewSeeMore = 1;
        }
        else if (ev.value == 'Contractors') {
            this.isContractorsLoading = true;
            // this.storage.get('UpcomingSingleEvent').then((val) => {
            //   this.UpcomingSingleEvent = JSON.parse(val)
            //   console.log("UpcomingSingleEvent--->",this.UpcomingSingleEvent);
            this.getCoachDetails().then(function (y) {
            });
            // })
            // this.getCoachDetails();
        }
    };
    TimesheetDashboardPage.prototype.getCoachDetails = function () {
        var _this = this;
        // this.storage.get('UpcomingSingleEvent').then((val) =>{
        //     this.UpcomingSingleEvent = JSON.parse(val);
        //     console.log("upcommigdata",this.UpcomingSingleEvent)
        // })
        this.UpcomingSingleEvent.event_id = 0;
        console.log("timesheet dashboard from 90", this.UpcomingSingleEvent.event_id);
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('event_id', _this.UpcomingSingleEvent.event_id)
                .set('person_id', _this.PersonData.PERSON_ID)
                .set('clientTimeZone', _this.PersonData.CLIENTTIMEZONE)
                .set('club_id', _this.PersonData.CLUB_ID)
                .set('season_id', _this.PersonData.SEASON_ID)
                .set('app_name', _this.global.App_id);
            _this.http.post(_this.global.APIURL + "events/getListOfCoaches", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                _this.getContractorList = data.GETLISTOFCOACHES;
                _this.isContractorsLoading = false;
                resolve(true);
            }, function (error) {
                _this.isContractorsLoading = false;
            });
        });
    };
    TimesheetDashboardPage.prototype.UpcomingEventSinglePerson = function (data) {
        if (data.SUCCESS == true) {
            if (data.GETTEAMEVENTSBYMONTHGROUPUPPERSON2 != '') {
                this.Hours_Success = true;
                this.HomeEventsDetails = data.GETTEAMEVENTSBYMONTHGROUPUPPERSON2;
                var pendingCount = 0;
                var approvedCount = 0;
                var rejectedCount = 0;
                this.isMyHoursLoading = false;
                for (var key in this.HomeEventsDetails) {
                    var tempArray = [];
                    for (var key1 in this.HomeEventsDetails[key]) {
                        if (key1 != 'month' && key1 != 'next_month' && this.HomeEventsDetails[key][key1]['CONTRACTORS'].length > 0) {
                            for (var key2 in this.HomeEventsDetails[key][key1].CONTRACTORS) {
                                if (this.HomeEventsDetails[key][key1].CONTRACTORS[key2] && this.HomeEventsDetails[key][key1].CONTRACTORS[key2].hoursRec >= 0) {
                                    this.HomeEventsDetails[key][key1].CONTRACTORS[key2].hoursRec = this.setRecordedHours(this.HomeEventsDetails[key][key1].CONTRACTORS[key2].hoursRec);
                                }
                                if (this.HomeEventsDetails[key][key1].CONTRACTORS[key2].TSStatus == 'Pending' || this.HomeEventsDetails[key][key1].CONTRACTORS[key2].TSStatus == '') {
                                    pendingCount++;
                                }
                                if (this.HomeEventsDetails[key][key1].CONTRACTORS[key2].TSStatus == 'Approved') {
                                    approvedCount++;
                                }
                                if (this.HomeEventsDetails[key][key1].CONTRACTORS[key2].TSStatus == 'Rejected') {
                                    rejectedCount++;
                                }
                            }
                        }
                        tempArray.push(this.HomeEventsDetails[key][key1]);
                    }
                    if (tempArray.length > 0) {
                        this.HomemonthArray.push(tempArray);
                    }
                }
                this.homeEventsStatusCount[0] = pendingCount;
                this.homeEventsStatusCount[1] = approvedCount;
                this.homeEventsStatusCount[2] = rejectedCount;
            }
        }
        else {
            this.isMyHoursLoading = false;
        }
    };
    TimesheetDashboardPage.prototype.UpcomingEvent = function (data) {
        console.log("data", data);
        this.isLoading = true;
        if (data.SUCCESS == true) {
            if (data.GETTEAMEVENTSBYMONTHGROUPUPCONS2 != '') {
                this.Event_Success = true;
                this.EventsDetails = data.GETTEAMEVENTSBYMONTHGROUPUPCONS2;
                var pendingCount = 0;
                var approvedCount = 0;
                var rejectedCount = 0;
                for (var key in this.EventsDetails) {
                    var tempArray = [];
                    for (var key1 in this.EventsDetails[key]) {
                        for (var key2 in this.EventsDetails[key][key1].CONTRACTORS) {
                            if (this.EventsDetails[key][key1].CONTRACTORS[key2].hoursRec >= 0) {
                                this.EventsDetails[key][key1].CONTRACTORS[key2].hoursRec = this.setRecordedHours(this.EventsDetails[key][key1].CONTRACTORS[key2].hoursRec);
                            }
                            if (this.EventsDetails[key][key1].CONTRACTORS[key2].TSStatus == 'Pending' || this.EventsDetails[key][key1].CONTRACTORS[key2].TSStatus == '') {
                                pendingCount++;
                            }
                            if (this.EventsDetails[key][key1].CONTRACTORS[key2].TSStatus == 'Approved') {
                                approvedCount++;
                            }
                            if (this.EventsDetails[key][key1].CONTRACTORS[key2].TSStatus == 'Rejected') {
                                rejectedCount++;
                            }
                        }
                        tempArray.push(this.EventsDetails[key][key1]);
                    }
                    this.monthArray.push(tempArray);
                    this.isLoading = false;
                }
                this.eventsStatusCount[0] = pendingCount;
                this.eventsStatusCount[1] = approvedCount;
                this.eventsStatusCount[2] = rejectedCount;
            }
        }
        else {
        }
    };
    TimesheetDashboardPage.prototype.getHomeEventType = function (eventType, event) {
        $(event.target).closest('.navbar-nav').find('li').removeClass('active');
        this.HomemonthArray = [];
        this.CardViewSeeMore = 0;
        if (eventType == 1 || eventType == 2) {
            for (var key in this.HomeEventsDetails) {
                var tempArray = [];
                for (var key1 in this.HomeEventsDetails[key]) {
                    if (this.HomeEventsDetails[key][key1].event_type_id == eventType) {
                        tempArray.push(this.HomeEventsDetails[key][key1]);
                    }
                    else if (this.HomeEventsDetails[key].month && tempArray.length > 0) {
                        tempArray.push(this.HomeEventsDetails[key][key1]);
                    }
                }
                if (tempArray.length > 0) {
                    this.HomemonthArray.push(tempArray);
                }
            }
        }
        else if (eventType == 'all') {
            for (var key2 in this.HomeEventsDetails) {
                var tempArray2 = [];
                for (var key3 in this.HomeEventsDetails[key2]) {
                    tempArray2.push(this.HomeEventsDetails[key2][key3]);
                }
                this.HomemonthArray.push(tempArray2);
            }
        }
        $(event.target).closest('li').addClass('active');
    };
    TimesheetDashboardPage.prototype.getHomeStatusType = function (statusType, event) {
        $(event.target).closest('.navbar-nav').find('li').removeClass('active');
        this.HomemonthArray = [];
        this.CardViewSeeMore = 1;
        for (var key in this.HomeEventsDetails) {
            var tempArray = [];
            for (var key1 in this.HomeEventsDetails[key]) {
                if (typeof this.HomeEventsDetails[key][key1].CONTRACTORS != "undefined" &&
                    this.HomeEventsDetails[key][key1].CONTRACTORS.length &&
                    (this.HomeEventsDetails[key][key1].CONTRACTORS[0].TSStatus == statusType || (statusType == 'Pending' && this.HomeEventsDetails[key][key1].CONTRACTORS[0].TSStatus == ''))) {
                    tempArray.push(this.HomeEventsDetails[key][key1]);
                }
                else if (this.HomeEventsDetails[key].month && tempArray.length > 0) {
                    if (key1 == 'month' || key1 == 'next_month') {
                        tempArray.push(this.HomeEventsDetails[key][key1]);
                    }
                }
            }
            if (tempArray.length > 0) {
                this.HomemonthArray.push(tempArray);
            }
        }
        $(event.target).closest('li').addClass('active');
    };
    TimesheetDashboardPage.prototype.getEventType = function (eventType, event) {
        $(event.target).closest('.navbar-nav').find('li').removeClass('active');
        this.monthArray = [];
        this.CardViewSeeMore = 0;
        if (eventType == 1 || eventType == 2) {
            for (var key in this.EventsDetails) {
                var tempArray = [];
                for (var key1 in this.EventsDetails[key]) {
                    if (this.EventsDetails[key][key1].event_type_id == eventType) {
                        tempArray.push(this.EventsDetails[key][key1]);
                    }
                    else if (this.EventsDetails[key].month && tempArray.length > 0) {
                        tempArray.push(this.EventsDetails[key][key1]);
                    }
                }
                if (tempArray.length > 0) {
                    this.monthArray.push(tempArray);
                }
            }
        }
        else if (eventType == 'all') {
            for (var key2 in this.EventsDetails) {
                var tempArray2 = [];
                for (var key3 in this.EventsDetails[key2]) {
                    tempArray2.push(this.EventsDetails[key2][key3]);
                }
                this.monthArray.push(tempArray2);
            }
        }
        $(event.target).closest('li').addClass('active');
    };
    TimesheetDashboardPage.prototype.getStatusType = function (statusType, event) {
        $(event.target).closest('.navbar-nav').find('li').removeClass('active');
        this.monthArray = [];
        this.CardViewSeeMore = 1;
        for (var key in this.EventsDetails) {
            var tempArray = [];
            for (var key1 in this.EventsDetails[key]) {
                if (typeof this.EventsDetails[key][key1].CONTRACTORS != "undefined" &&
                    this.EventsDetails[key][key1].CONTRACTORS.length &&
                    (this.EventsDetails[key][key1].CONTRACTORS[0].TSStatus == statusType || (statusType == 'Pending' && this.EventsDetails[key][key1].CONTRACTORS[0].TSStatus == ''))) {
                    tempArray.push(this.EventsDetails[key][key1]);
                }
                else if (this.EventsDetails[key].month && tempArray.length > 0) {
                    if (key1 == 'month' || key1 == 'next_month') {
                        tempArray.push(this.EventsDetails[key][key1]);
                    }
                }
            }
            if (tempArray.length > 0) {
                this.monthArray.push(tempArray);
            }
        }
        $(event.target).closest('li').addClass('active');
    };
    TimesheetDashboardPage.prototype.gototimesheetlist = function (details) {
        this.navCtrl.push('ContracterTimesheetListPage', { contractorData: details });
    };
    TimesheetDashboardPage.prototype.goToReadOnlyTimeSheet = function (EventData) {
        this.navCtrl.push('ReadOnlyTimesheetPage', { UpcomingSingleEvent: JSON.stringify(EventData) });
    };
    TimesheetDashboardPage.prototype.goToReadOnlyContTimeSheet = function (EventData, ContractorData) {
        this.navCtrl.push('ReadOnlyTimesheetPage', {
            UpcomingSingleEvent: JSON.stringify(EventData),
            ContractorData: JSON.stringify(ContractorData)
        });
    };
    TimesheetDashboardPage.prototype.gotoReviewerTimesheet = function (EventData, ContractorData) {
        this.navCtrl.push('ReviewerTimesheetPage', {
            UpcomingSingleEvent: JSON.stringify(EventData),
            ContractorData: JSON.stringify(ContractorData)
        });
    };
    TimesheetDashboardPage.prototype.setRecordedHours = function (data) {
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
    TimesheetDashboardPage.prototype.padLeft = function (num, size) {
        var s = num + "";
        while (s.length < size)
            s = "0" + s;
        return s;
    };
    TimesheetDashboardPage.prototype.backArrow = function () {
        this.gFn.hideMenuIcon();
        this.app.getRootNav().getActiveChildNav().select(0);
    };
    TimesheetDashboardPage.prototype.CardSeeMore = function (event) {
        $(event.target).closest('.ExtraMonth').find('.multi-shadow').hide();
        $(event.target).closest('.ExtraMonth').find('.multiShadow').hide();
        $(event.target).closest('.ExtraMonth').find('.mb-50').hide();
        $(event.target).closest('.ExtraMonth').find('.mt-20').show();
        this.CardViewSeeMore = this.CardViewSeeMore + 1;
    };
    TimesheetDashboardPage.prototype.CardSeeLess = function (val) {
        $(event.target).closest('.ExtraMonth').find('.multi-shadow').show();
        $(event.target).closest('.ExtraMonth').find('.multiShadow').show();
        $(event.target).closest('.ExtraMonth').find('.mb-50').show();
        $(event.target).closest('.ExtraMonth').find('.mt-20').hide();
        if (this.CardViewSeeMore > 0) {
            this.CardViewSeeMore = val;
        }
    };
    TimesheetDashboardPage.prototype.gotoAdhocTimesheet = function () {
        this.navCtrl.push('TimesheetAdhocPage');
    };
    TimesheetDashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-timesheet-dashboard',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/timesheet-dashboard/timesheet-dashboard.html"*/'<ion-header class="header-md">\n  <ion-navbar class="main">\n\n    <div class="top-bar clearfix">   \n        <div class="pull-left col-xs-6 pr-0" (click)="backArrow()">\n            <div class="backArrow"> TIMESHEETS</div>\n        </div>\n    </div>\n  </ion-navbar>\n \n  <ion-segment class="top-menu" *ngIf="(PersonData?.TIMESHEETREVIEWER == 1) || (PersonData?.TIMESHEETREVIEWER == 0)"  (ionChange)="segmentChanged($event)" [(ngModel)]="segments">\n    <ion-segment-button value="MyHours" *ngIf="(PersonData?.ISCONTRACTOR == 1) ">\n        <ion-label>My Hours</ion-label>\n    </ion-segment-button>\n    <ion-segment-button value="Events" *ngIf="((PersonData?.TIMESHEETREVIEWER == 1) && (PersonData?.ISCONTRACTOR == 1)) ||(PersonData?.PAYROL == 1)">\n      <ion-label>Events</ion-label>\n    </ion-segment-button>\n    <ion-segment-button value="Contractors" *ngIf="((PersonData?.TIMESHEETREVIEWER == 1) && (PersonData?.ISCONTRACTOR == 1)) || (PersonData?.PAYROL == 1)">\n      <ion-label>Contractors</ion-label>\n    </ion-segment-button>\n  </ion-segment>\n</ion-header>\n<ion-content class="bg-gray event">\n    <section class="profileFirst heightAuto xs-padding" *ngIf="segments==\'MyHours\'">\n        <div class="navbar navbar-default event-menu" >\n            <div class="btn-section adhoc mb-20 mt-10" *ngIf="PersonData?.ISCONTRACTOR">\n                <button class="btn btn-save radius-10" type="btn" (click)="gotoAdhocTimesheet()"><ion-icon name="add"></ion-icon>CREATE AD HOC TIMESHEET</button>\n            </div>\n            <ul class="nav navbar-nav">\n                <li class="" (click)="getHomeStatusType(\'Pending\',$event)"><a class="pending" href="javascript:void(0)">\n                    \n                    <svg class="pending-value" xmlns="http://www.w3.org/2000/svg" width="18.388" height="18.388" viewBox="0 0 18.388 18.388">\n						<g id="Group_6257" data-name="Group 6257" transform="translate(-1654.684 -1129)" *ngIf="homeEventsStatusCount[0] < 10">\n                            <g id="Group_6247" data-name="Group 6247" transform="translate(1654.684 1129)">\n                            <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n                            </g>\n                            <text id="_5" data-name="5" transform="translate(1664 1143)" font-size="13" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="0.05em"><tspan x="-3.615" y="0">{{homeEventsStatusCount[0]}}</tspan></text>\n                        </g>\n						<g id="Group_6263" data-name="Group 6263" transform="translate(-1750.684 -1137)" *ngIf="homeEventsStatusCount[0] == 10">\n							<g id="Group_6251" data-name="Group 6251" transform="translate(1750.684 1137)">\n							  <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n							</g>\n							<text id="_10" data-name="10" transform="translate(1760 1151)" font-size="12" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="0.05em"><tspan x="-6.974" y="0">{{homeEventsStatusCount[0]}}</tspan></text>\n					    </g>\n						<g id="Group_6262" data-name="Group 6262" transform="translate(-1532.684 -1160)" *ngIf="homeEventsStatusCount[0] > 10">\n							<g id="Group_6252" data-name="Group 6252" transform="translate(1532.684 1160)">\n							  <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n							</g>\n							<text id="_10_" data-name="10+" transform="translate(1542 1173)" font-size="9" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="-0.134em"><tspan x="-6.427" y="0">{{homeEventsStatusCount[0]}}</tspan></text>\n						</g>\n                    </svg>\n                   \n                    Pending\n                </a>\n            </li>\n                <li class="" (click)="getHomeStatusType(\'Approved\',$event)"><a class="approved" href="javascript:void(0)">\n                    <svg class="approved-value" xmlns="http://www.w3.org/2000/svg" width="18.388" height="18.388" viewBox="0 0 18.388 18.388">\n                        <g id="Group_6257" data-name="Group 6257" transform="translate(-1654.684 -1129)" *ngIf="homeEventsStatusCount[1] < 10">\n                            <g id="Group_6247" data-name="Group 6247" transform="translate(1654.684 1129)">\n                            <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n                            </g>\n                            <text id="_5" data-name="5" transform="translate(1664 1143)" font-size="13" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="0.05em"><tspan x="-3.615" y="0">{{homeEventsStatusCount[1]}}</tspan></text>\n                        </g>\n						<g id="Group_6263" data-name="Group 6263" transform="translate(-1750.684 -1137)" *ngIf="homeEventsStatusCount[1] == 10">\n							<g id="Group_6251" data-name="Group 6251" transform="translate(1750.684 1137)">\n							  <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n							</g>\n							<text id="_10" data-name="10" transform="translate(1760 1151)" font-size="12" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="0.05em"><tspan x="-6.974" y="0">{{homeEventsStatusCount[1]}}</tspan></text>\n					    </g>\n						<g id="Group_6262" data-name="Group 6262" transform="translate(-1532.684 -1160)" *ngIf="homeEventsStatusCount[1] > 10">\n							<g id="Group_6252" data-name="Group 6252" transform="translate(1532.684 1160)">\n							  <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n							</g>\n							<text id="_10_" data-name="10+" transform="translate(1542 1173)" font-size="9" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="-0.134em"><tspan x="-6.427" y="0">{{homeEventsStatusCount[1]}}</tspan></text>\n						</g>\n                    </svg>\n                    Approved\n                    </a>\n                </li>\n                <li class="" (click)="getHomeStatusType(\'Rejected\',$event)"><a class="rejected" href="javascript:void(0)">\n                    <svg class="rejected-value" xmlns="http://www.w3.org/2000/svg" width="18.388" height="18.388" viewBox="0 0 18.388 18.388">\n                        <g id="Group_6257" data-name="Group 6257" transform="translate(-1654.684 -1129)" *ngIf="homeEventsStatusCount[2] < 10">\n                            <g id="Group_6247" data-name="Group 6247" transform="translate(1654.684 1129)">\n                            <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n                            </g>\n                            <text id="_5" data-name="5" transform="translate(1664 1143)" font-size="13" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="0.05em"><tspan x="-3.615" y="0">{{homeEventsStatusCount[2]}}</tspan></text>\n                        </g>\n						<g id="Group_6263" data-name="Group 6263" transform="translate(-1750.684 -1137)" *ngIf="homeEventsStatusCount[2] == 10">\n							<g id="Group_6251" data-name="Group 6251" transform="translate(1750.684 1137)">\n							  <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n							</g>\n							<text id="_10" data-name="10" transform="translate(1760 1151)" font-size="12" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="0.05em"><tspan x="-6.974" y="0">{{homeEventsStatusCount[2]}}</tspan></text>\n					    </g>\n						<g id="Group_6262" data-name="Group 6262" transform="translate(-1532.684 -1160)" *ngIf="homeEventsStatusCount[2] > 10">\n							<g id="Group_6252" data-name="Group 6252" transform="translate(1532.684 1160)">\n							  <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n							</g>\n							<text id="_10_" data-name="10+" transform="translate(1542 1173)" font-size="9" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="-0.134em"><tspan x="-6.427" y="0">{{homeEventsStatusCount[2]}}</tspan></text>\n						</g>\n                    </svg>\n                    Rejected\n                    </a>\n                </li>\n            </ul>\n        </div>\n        <div class="event-card select-events bg-gray cardBottom" *ngIf="HomemonthArray.length<=0 && !isMyHoursLoading">\n            <div class="well select-card " >\n                <div class="row">\n                    <div class="col-xs-12 ">\n                        <h5 class="sub-title">No Event Present</h5>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n               <!-- while loading -->\n               <div class="event-card select-events bg-gray cardBottom" *ngIf="HomemonthArray.length<=0 && isMyHoursLoading">\n                <div class="well select-card " >\n                    <div class="row">\n                        <div class="col-xs-12 ">\n                            <h5 class="sub-title">There are a large number of records, this page may take up to 30 seconds to load.</h5>\n                        </div>\n                    </div>\n                </div>\n            </div>\n           <!-- while loading -->\n\n        <div class="ExtraMonth HomemonthArray" *ngFor="let key of HomemonthArray;let y=index">\n\n            <div class="event-card select-events bg-gray"  *ngIf="y <=CardViewSeeMore">\n                <div *ngIf="y <=CardViewSeeMore">\n                    <div class="event-black" >\n                        <h5 class="v-center">{{key[key.length-2]}}</h5>\n                    </div>\n\n                    <div  *ngFor="let key1 of key; let i=index;">\n                        <div class="well select-card" *ngIf="i<key.length-2 && key1.CONTRACTORS?.length > 0" (click)="goToReadOnlyContTimeSheet(key1, key1.CONTRACTORS[0])">\n                                <!-- (click)="goToReadOnlyTimeSheet(key1)" -->\n                            <div class="row">\n                                <div class="event-date col-xs-3 p-0">\n                                    <div class="badge badge-blue">{{key1.weekday}} {{key1.day}}</div>\n                                    <p class="time-center">{{key1.time24HR}}</p>\n                                </div>\n                                <div class="event-title col-xs-8 p-0">\n                                    <!-- <h5>{{contractor.first_name}} {{contractor.last_name}}</h5> -->\n                                    <h5>{{key1.event_name}}</h5>\n                                    <p>{{key1.event_team}}</p>\n                                    <!-- <p>{{key1.hoursRec}} {{key1.TSStatus}}</p> -->\n                                    <p class="status-info" [class.pending]="key1.CONTRACTORS[0].TSStatus==\'Pending\' || !key1.CONTRACTORS[0].TSStatus" [class.approved]="key1.CONTRACTORS[0].TSStatus==\'Approved\'" [class.rejected]="key1.CONTRACTORS[0].TSStatus==\'Rejected\'">{{key1.CONTRACTORS[0].hoursRec}}\n                                        <span>{{key1.CONTRACTORS[0].TSStatus?key1.CONTRACTORS[0].TSStatus:\'Pending\'}}</span>\n                                    </p>\n                                </div>\n                                <div class="event-next col-xs-1 p-0">\n                                    <a href="javascript:void(0)" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n            <div class="event-card select-events bg-gray multi-shadow" >\n                <div *ngIf="y ==CardViewSeeMore && key[key.length-1]!=\'\'">\n                    <div class="event-black" >\n                        <h5 class="v-center">{{key[key.length-1]}}</h5>\n                    </div>\n                </div>\n            </div>\n\n            <div class="section-more mb-50 clearfix" *ngIf="y ==CardViewSeeMore && key[key.length-1]!=\'\'" (click)="CardSeeMore($event)">\n                <a href="javascript:void(0)" class="see-more pull-right">SEE MORE</a>\n            </div>\n            <div class="section-more clearfix mt-20" *ngIf="y <=CardViewSeeMore" (click)="CardSeeLess(y)" style="display:none">\n                <a href="javascript:void(0)"  class="see-more pull-right">SEE LESS</a>\n            </div>\n\n        </div>\n    </section>\n  <section class="profileFirst heightAuto xs-padding" *ngIf="segments==\'Events\'">\n    <div class="navbar navbar-default event-menu" >\n        <ul class="nav navbar-nav">\n            <li class="" (click)="getStatusType(\'Pending\',$event)"><a class="pending" href="javascript:void(0)">\n                    <svg class="pending-value" xmlns="http://www.w3.org/2000/svg" width="18.388" height="18.388" viewBox="0 0 18.388 18.388">\n                        <g id="Group_6257" data-name="Group 6257" transform="translate(-1654.684 -1129)" *ngIf="eventsStatusCount[0] < 10">\n                            <g id="Group_6247" data-name="Group 6247" transform="translate(1654.684 1129)">\n                            <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n                            </g>\n                            <text id="_5" data-name="5" transform="translate(1664 1143)" font-size="13" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="0.05em"><tspan x="-3.615" y="0">{{eventsStatusCount[0]}}</tspan></text>\n                        </g>\n						<g id="Group_6263" data-name="Group 6263" transform="translate(-1750.684 -1137)" *ngIf="eventsStatusCount[0] == 10">\n							<g id="Group_6251" data-name="Group 6251" transform="translate(1750.684 1137)">\n							  <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n							</g>\n							<text id="_10" data-name="10" transform="translate(1760 1151)" font-size="12" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="0.05em"><tspan x="-6.974" y="0">{{eventsStatusCount[0]}}</tspan></text>\n					    </g>\n						<g id="Group_6262" data-name="Group 6262" transform="translate(-1532.684 -1160)" *ngIf="eventsStatusCount[0] > 10">\n							<g id="Group_6252" data-name="Group 6252" transform="translate(1532.684 1160)">\n							  <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n							</g>\n							<text id="_10_" data-name="10+" transform="translate(1542 1173)" font-size="9" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="-0.134em"><tspan x="-6.427" y="0">{{eventsStatusCount[0]}}</tspan></text>\n						</g>\n                    </svg>\n                    pending\n            </a>\n        </li>\n            <li class="" (click)="getStatusType(\'Approved\',$event)"><a class="approved" href="javascript:void(0)">\n                    <svg class="approved-value" xmlns="http://www.w3.org/2000/svg" width="18.388" height="18.388" viewBox="0 0 18.388 18.388">\n                        <g id="Group_6257" data-name="Group 6257" transform="translate(-1654.684 -1129)" *ngIf="eventsStatusCount[1] < 10">\n                            <g id="Group_6247" data-name="Group 6247" transform="translate(1654.684 1129)">\n                            <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n                            </g>\n                            <text id="_5" data-name="5" transform="translate(1664 1143)" font-size="13" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="0.05em"><tspan x="-3.615" y="0">{{eventsStatusCount[1]}}</tspan></text>\n                        </g>\n						<g id="Group_6263" data-name="Group 6263" transform="translate(-1750.684 -1137)" *ngIf="eventsStatusCount[1] == 10">\n							<g id="Group_6251" data-name="Group 6251" transform="translate(1750.684 1137)">\n							  <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n							</g>\n							<text id="_10" data-name="10" transform="translate(1760 1151)" font-size="12" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="0.05em"><tspan x="-6.974" y="0">{{eventsStatusCount[1]}}</tspan></text>\n					    </g>\n						<g id="Group_6262" data-name="Group 6262" transform="translate(-1532.684 -1160)" *ngIf="eventsStatusCount[1] > 10">\n							<g id="Group_6252" data-name="Group 6252" transform="translate(1532.684 1160)">\n							  <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n							</g>\n							<text id="_10_" data-name="10+" transform="translate(1542 1173)" font-size="9" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="-0.134em"><tspan x="-6.427" y="0">{{eventsStatusCount[1]}}</tspan></text>\n						</g>\n                    </svg>\n                    approved\n                    </a>\n            </li>\n            <li class="" (click)="getStatusType(\'Rejected\',$event)"><a class="rejected" href="javascript:void(0)">\n                    <svg class="rejected-value" xmlns="http://www.w3.org/2000/svg" width="18.388" height="18.388" viewBox="0 0 18.388 18.388">\n                        <g id="Group_6257" data-name="Group 6257" transform="translate(-1654.684 -1129)" *ngIf="eventsStatusCount[2] < 10">\n                            <g id="Group_6247" data-name="Group 6247" transform="translate(1654.684 1129)">\n                            <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n                            </g>\n                            <text id="_5" data-name="5" transform="translate(1664 1143)" font-size="13" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="0.05em"><tspan x="-3.615" y="0">{{eventsStatusCount[2]}}</tspan></text>\n                        </g>\n						<g id="Group_6263" data-name="Group 6263" transform="translate(-1750.684 -1137)" *ngIf="eventsStatusCount[2] == 10">\n							<g id="Group_6251" data-name="Group 6251" transform="translate(1750.684 1137)">\n							  <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n							</g>\n							<text id="_10" data-name="10" transform="translate(1760 1151)" font-size="12" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="0.05em"><tspan x="-6.974" y="0">{{eventsStatusCount[2]}}</tspan></text>\n					    </g>\n						<g id="Group_6262" data-name="Group 6262" transform="translate(-1532.684 -1160)" *ngIf="eventsStatusCount[2] > 10">\n							<g id="Group_6252" data-name="Group 6252" transform="translate(1532.684 1160)">\n							  <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n							</g>\n							<text id="_10_" data-name="10+" transform="translate(1542 1173)" font-size="9" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="-0.134em"><tspan x="-6.427" y="0">{{eventsStatusCount[2]}}</tspan></text>\n						</g>\n                    </svg>\n                    Rejected\n                    </a>\n            </li>\n        </ul>\n    </div>\n    <div class="event-card select-events bg-gray cardBottom" *ngIf="monthArray.length<=0 && !isLoading">\n        <div class="well select-card " >\n            <div class="row">\n                <div class="col-xs-12 ">\n                    <h5 class="sub-title">No Event Present</h5>\n                </div>\n            </div>\n        </div>\n    </div>\n\n        <!-- while loading  starts-->\n        <div class="event-card select-events bg-gray cardBottom" *ngIf="isLoading && monthArray.length<=0">\n            <div class="well select-card " >\n                <div class="row">\n                    <div class="col-xs-12 ">\n                        <h5 class="sub-title">There are a large number of records, this page may take up to 30 seconds to load.</h5>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!-- while loading ends -->\n\n    <div class="ExtraMonth monthArray" *ngFor="let key of monthArray;let y=index">\n\n        <div class="event-card select-events bg-gray"  *ngIf="y <=CardViewSeeMore">\n            <div *ngIf="y <=CardViewSeeMore">\n                <div class="event-black" >\n                    <h5 class="v-center">{{key[key.length-2]}}</h5>\n                </div>\n\n                <div  *ngFor="let key1 of key; let i=index;" >\n                    <div *ngFor="let contractor of key1.CONTRACTORS">\n                        <!-- <p>ii</p> -->\n                        <div class="well select-card " [class.disabled]="key1.CONTRACTORS[0].TSStatus==\'Approved\'" (click)="key1.CONTRACTORS[0].TSStatus==\'Approved\'?\'\':gotoReviewerTimesheet(key1,contractor)" *ngIf="i<key.length-2">\n                            <div class="row">\n                                <div class="event-date col-xs-3 p-0">\n                                    <div class="badge badge-blue">{{key1.weekday}} {{key1.day}}</div>\n                                    <p class="time-center">{{key1.time24HR}}</p>\n                                </div>\n                                <div class="event-title col-xs-8 p-0">\n                                    <h5 class="text-blue">{{contractor.first_name}} {{contractor.last_name}}</h5>\n                                    <h5>{{key1.event_name}}</h5>\n                                    <p>{{key1.event_team}}</p>\n                                    <p class="status-info" [class.pending]="contractor.TSStatus==\'Pending\' || !contractor.TSStatus" [class.approved]="contractor.TSStatus==\'Approved\'" [class.rejected]="contractor.TSStatus==\'Rejected\'">{{contractor.hoursRec}}\n                                        <span>{{contractor.TSStatus?contractor.TSStatus:\'Pending\'}}</span>\n                                    </p>\n                                </div>\n                                <div class="event-next col-xs-1 p-0">\n                                    <a href="javascript:void(0)" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n        <div class="event-card select-events bg-gray multiShadow" [class.multi-shadow]="monthArray.length != y + 1 || (monthArray.length > y + 1 && monthArray[y + 1].length > 2)">\n            <div *ngIf="y ==CardViewSeeMore && key[key.length-1]!=\'\'">\n                <div class="event-black" >\n                    <h5 class="v-center">{{key[key.length-1]}}</h5>\n                </div>\n            </div>\n        </div>\n\n        <div class="section-more mb-50 clearfix" *ngIf="y ==CardViewSeeMore && key[key.length-1]!=\'\'" (click)="CardSeeMore($event)">\n            <a href="javascript:void(0)" class="see-more pull-right">SEE MORE</a>\n        </div>\n        <div class="section-more clearfix mt-20" *ngIf="y <=CardViewSeeMore" (click)="CardSeeLess(y)" style="display:none">\n            <a href="javascript:void(0)"  class="see-more pull-right">SEE LESS</a>\n        </div>\n\n    </div>\n  </section>\n  <div *ngIf="segments==\'Contractors\'" style="padding-top: 10%;" class="mt-10">\n        <!-- while loading -->\n        <div class="event-card select-events bg-gray cardBottom" *ngIf="getContractorList.length<=0 && isContractorsLoading">\n            <div class="well select-card " >\n                <div class="row">\n                    <div class="col-xs-12 ">\n                        <h5 class="sub-title">There are a large number of records, this page may take up to 30 seconds to load.</h5>\n                    </div>\n                </div>\n            </div>\n        </div>\n       <!-- while loading -->\n      <div class="event-card welfare" *ngFor="let details of getContractorList">\n          <div class="well select-card" (click)="gototimesheetlist(details)" style="margin-bottom: 0 !important">\n\n              <div class="row">\n                  <div class="card-img col-xs-2 p-0">\n                      <span class="" *ngIf="details.photoPath==\'\'">\n                          <div class="img-circle"><span class="img-text">{{details.first_name[0]}} {{details.last_name[0]}} </span></div>\n\n                      </span>\n                      <span class="" *ngIf="details.photoPath">\n                            <img src="{{global.PROFILEIMAGEURL}}{{details.photoPath}}" alt="" class="img-circle">\n                      </span>\n                  </div>\n\n                  <div class="card-title col-xs-7 p-0">{{details.first_name | uppercase}} {{details.last_name | uppercase}}\n                      <p >{{details.designation}}</p>\n                  </div>\n                  <div class="show-value col-xs-2 p-0">\n                        <svg class="timesheet-value v-center" xmlns="http://www.w3.org/2000/svg" width="18.388" height="18.388" viewBox="0 0 18.388 18.388">\n                            <g id="Group_6257" data-name="Group 6257" transform="translate(-1654.684 -1129)" *ngIf="details.pendingCount < 10">\n								<g id="Group_6247" data-name="Group 6247" transform="translate(1654.684 1129)">\n								<path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n								</g>\n								<text id="_5" data-name="5" transform="translate(1664 1143)" font-size="13" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="0.05em"><tspan x="-3.615" y="0">{{details.pendingCount}}</tspan></text>\n							</g>\n							<g id="Group_6263" data-name="Group 6263" transform="translate(-1750.684 -1137)" *ngIf="details.pendingCount == 10">\n								<g id="Group_6251" data-name="Group 6251" transform="translate(1750.684 1137)">\n								  <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n								</g>\n								<text id="_10" data-name="10" transform="translate(1760 1151)" font-size="12" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="0.05em"><tspan x="-6.974" y="0">{{details.pendingCount}}</tspan></text>\n							</g>\n							<g id="Group_6262" data-name="Group 6262" transform="translate(-1532.684 -1160)" *ngIf="details.pendingCount > 10">\n								<g id="Group_6252" data-name="Group 6252" transform="translate(1532.684 1160)">\n								  <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n								</g>\n								<text id="_10_" data-name="10+" transform="translate(1542 1173)" font-size="9" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="-0.134em"><tspan x="-6.427" y="0">{{details.pendingCount}}</tspan></text>\n							</g>\n                        </svg>\n                  </div>\n\n                  <div class="event-next col-xs-1 p-0">\n                      <a href="javascript:void(0)" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n                  </div>\n              </div>\n          </div>\n\n        </div>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/timesheet-dashboard/timesheet-dashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__providers_global_api_global_api__["a" /* GlobalApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_6__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], TimesheetDashboardPage);
    return TimesheetDashboardPage;
}());

//# sourceMappingURL=timesheet-dashboard.js.map

/***/ })

});
//# sourceMappingURL=12.js.map