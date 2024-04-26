webpackJsonp([84],{

/***/ 763:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContracterTimesheetListPageModule", function() { return ContracterTimesheetListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contracter_timesheet_list__ = __webpack_require__(869);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ContracterTimesheetListPageModule = /** @class */ (function () {
    function ContracterTimesheetListPageModule() {
    }
    ContracterTimesheetListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__contracter_timesheet_list__["a" /* ContracterTimesheetListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__contracter_timesheet_list__["a" /* ContracterTimesheetListPage */]),
            ],
        })
    ], ContracterTimesheetListPageModule);
    return ContracterTimesheetListPageModule;
}());

//# sourceMappingURL=contracter-timesheet-list.module.js.map

/***/ }),

/***/ 869:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContracterTimesheetListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_api_global_api__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ContracterTimesheetListPage = /** @class */ (function () {
    function ContracterTimesheetListPage(navCtrl, navParams, storage, global, globalApi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.global = global;
        this.globalApi = globalApi;
        this.PersonData = {};
        this.getContractorList = [];
        this.EventsDetails = [];
        this.monthArray = [];
        this.CardViewSeeMore = 1;
        this.Event_Success = false;
        this.eventsStatusCount = [0, 0, 0]; // Pending, Approved, Rejected
    }
    ContracterTimesheetListPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.contractorData = this.navParams.get('contractorData');
        console.log(this.contractorData);
        this.storage.get('UpcomingSingleEvent').then(function (val) {
            _this.UpcomingSingleEvent = JSON.parse(val);
            _this.storage.get('loggedInUserData').then(function (val) {
                _this.PersonData = val;
                _this.contractorData['CLIENTTIMEZONE'] = _this.PersonData.CLIENTTIMEZONE;
                _this.contractorData['SELECTEDTEAM'] = _this.PersonData.SELECTEDTEAM;
                _this.contractorData['CLIENT_ID'] = _this.PersonData.CLIENT_ID;
                _this.contractorData['SEASON_ID'] = _this.PersonData.SEASON_ID;
                _this.contractorData['PERSON_ID'] = _this.contractorData.person_id_fk;
                console.log(_this.contractorData);
                _this.globalApi.getTimesheetDashboardEventsPerson(_this.contractorData).subscribe(function (user) {
                    _this.UpcomingEvent(user);
                });
            });
        });
        console.log('ionViewDidLoad ContracterTimesheetListPage');
    };
    ContracterTimesheetListPage.prototype.UpcomingEvent = function (data) {
        if (data.SUCCESS == true) {
            if (data.GETTEAMEVENTSBYMONTHGROUPUPPERSON2 != '') {
                this.Event_Success = true;
                this.EventsDetails = data.GETTEAMEVENTSBYMONTHGROUPUPPERSON2;
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
                }
                this.eventsStatusCount[0] = pendingCount;
                this.eventsStatusCount[1] = approvedCount;
                this.eventsStatusCount[2] = rejectedCount;
            }
        }
        else {
        }
    };
    ContracterTimesheetListPage.prototype.setRecordedHours = function (data) {
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
    ContracterTimesheetListPage.prototype.padLeft = function (num, size) {
        var s = num + "";
        while (s.length < size)
            s = "0" + s;
        return s;
    };
    ContracterTimesheetListPage.prototype.getEventType = function (eventType, event) {
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
    ContracterTimesheetListPage.prototype.getStatusType = function (statusType, event) {
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
    ContracterTimesheetListPage.prototype.gotoReviewerTimesheet = function (EventData, ContractorData) {
        this.navCtrl.push('ReviewerTimesheetPage', {
            UpcomingSingleEvent: JSON.stringify(EventData),
            ContractorData: JSON.stringify(ContractorData)
        });
    };
    ContracterTimesheetListPage.prototype.CardSeeMore = function (event) {
        $(event.target).closest('.ExtraMonth').find('.multi-shadow').hide();
        $(event.target).closest('.ExtraMonth').find('.mb-50').hide();
        $(event.target).closest('.ExtraMonth').find('.mt-20').show();
        this.CardViewSeeMore = this.CardViewSeeMore + 1;
    };
    ContracterTimesheetListPage.prototype.CardSeeLess = function (val) {
        $(event.target).closest('.ExtraMonth').find('.multi-shadow').show();
        $(event.target).closest('.ExtraMonth').find('.mb-50').show();
        $(event.target).closest('.ExtraMonth').find('.mt-20').hide();
        if (this.CardViewSeeMore > 0) {
            this.CardViewSeeMore = val;
        }
    };
    ContracterTimesheetListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-contracter-timesheet-list',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/contracter-timesheet-list/contracter-timesheet-list.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title><span *ngIf="contractorData">{{contractorData.first_name}} {{contractorData.last_name}}</span> TIMESHEETS</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="bg-gray event">\n  <section class="profileFirst heightAuto xs-padding" >\n    <div class="player-section" *ngIf="contractorData">\n        <div class="thumbImage">\n          <span class="" *ngIf="contractorData.photoPath==\'\'">\n              <div class="img-circle"><span class="img-text">{{contractorData.first_name[0]}} {{contractorData.last_name[0]}} </span></div>\n\n          </span>\n          <span class="" *ngIf="contractorData.photoPath">\n                      <img src="{{global.PROFILEIMAGEURL}}{{contractorData.photoPath}}" alt="" class="img-circle">\n          </span>\n        </div>\n        <div class="player-info">\n            <h5 >{{contractorData.first_name}} {{contractorData.last_name}}</h5>\n            <p >{{contractorData.designation}}</p>\n        </div>\n    </div>\n    <div class="navbar navbar-default event-menu" >\n        <ul class="nav navbar-nav">\n            <li class="" (click)="getStatusType(\'Pending\',$event)">\n				<a class="pending" href="javascript:void(0)">\n                    <svg class="pending-value" xmlns="http://www.w3.org/2000/svg" width="18.388" height="18.388" viewBox="0 0 18.388 18.388">\n                        <g id="Group_6257" data-name="Group 6257" transform="translate(-1654.684 -1129)" *ngIf="eventsStatusCount[0] < 10">\n                            <g id="Group_6247" data-name="Group 6247" transform="translate(1654.684 1129)">\n                            <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n                            </g>\n                            <text id="_5" data-name="5" transform="translate(1664 1143)" font-size="13" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="0.05em"><tspan x="-3.615" y="0">{{eventsStatusCount[0]}}</tspan></text>\n                        </g>\n						<g id="Group_6263" data-name="Group 6263" transform="translate(-1750.684 -1137)" *ngIf="eventsStatusCount[0] == 10">\n							<g id="Group_6251" data-name="Group 6251" transform="translate(1750.684 1137)">\n							  <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n							</g>\n							<text id="_10" data-name="10" transform="translate(1760 1151)" font-size="12" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="0.05em"><tspan x="-6.974" y="0">{{eventsStatusCount[0]}}</tspan></text>\n					    </g>\n						<g id="Group_6262" data-name="Group 6262" transform="translate(-1532.684 -1160)" *ngIf="eventsStatusCount[0] > 10">\n							<g id="Group_6252" data-name="Group 6252" transform="translate(1532.684 1160)">\n							  <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n							</g>\n							<text id="_10_" data-name="10+" transform="translate(1542 1173)" font-size="9" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="-0.134em"><tspan x="-6.427" y="0">{{eventsStatusCount[0]}}</tspan></text>\n						</g>\n                    </svg>\n                    pending\n				</a>\n			</li>\n            <li class="" (click)="getStatusType(\'Approved\',$event)">\n				<a class="approved" href="javascript:void(0)">\n                    <svg class="approved-value" xmlns="http://www.w3.org/2000/svg" width="18.388" height="18.388" viewBox="0 0 18.388 18.388">\n                        <g id="Group_6257" data-name="Group 6257" transform="translate(-1654.684 -1129)" *ngIf="eventsStatusCount[1] < 10">\n                            <g id="Group_6247" data-name="Group 6247" transform="translate(1654.684 1129)">\n                            <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n                            </g>\n                            <text id="_5" data-name="5" transform="translate(1664 1143)" font-size="13" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="0.05em"><tspan x="-3.615" y="0">{{eventsStatusCount[1]}}</tspan></text>\n                        </g>\n						<g id="Group_6263" data-name="Group 6263" transform="translate(-1750.684 -1137)" *ngIf="eventsStatusCount[1] == 10">\n							<g id="Group_6251" data-name="Group 6251" transform="translate(1750.684 1137)">\n							  <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n							</g>\n							<text id="_10" data-name="10" transform="translate(1760 1151)" font-size="12" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="0.05em"><tspan x="-6.974" y="0">{{eventsStatusCount[1]}}</tspan></text>\n					    </g>\n						<g id="Group_6262" data-name="Group 6262" transform="translate(-1532.684 -1160)" *ngIf="eventsStatusCount[1] > 10">\n							<g id="Group_6252" data-name="Group 6252" transform="translate(1532.684 1160)">\n							  <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n							</g>\n							<text id="_10_" data-name="10+" transform="translate(1542 1173)" font-size="9" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="-0.134em"><tspan x="-6.427" y="0">{{eventsStatusCount[1]}}</tspan></text>\n						</g>\n                    </svg>\n                    approved\n                </a>\n            </li>\n            <li class="" (click)="getStatusType(\'Rejected\',$event)">\n				<a class="rejected" href="javascript:void(0)">\n                    <svg class="rejected-value" xmlns="http://www.w3.org/2000/svg" width="18.388" height="18.388" viewBox="0 0 18.388 18.388">\n                        <g id="Group_6257" data-name="Group 6257" transform="translate(-1654.684 -1129)" *ngIf="eventsStatusCount[2] < 10">\n                            <g id="Group_6247" data-name="Group 6247" transform="translate(1654.684 1129)">\n                            <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n                            </g>\n                            <text id="_5" data-name="5" transform="translate(1664 1143)" font-size="13" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="0.05em"><tspan x="-3.615" y="0">{{eventsStatusCount[2]}}</tspan></text>\n                        </g>\n						<g id="Group_6263" data-name="Group 6263" transform="translate(-1750.684 -1137)" *ngIf="eventsStatusCount[2] == 10">\n							<g id="Group_6251" data-name="Group 6251" transform="translate(1750.684 1137)">\n							  <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n							</g>\n							<text id="_10" data-name="10" transform="translate(1760 1151)" font-size="12" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="0.05em"><tspan x="-6.974" y="0">{{eventsStatusCount[2]}}</tspan></text>\n					    </g>\n						<g id="Group_6262" data-name="Group 6262" transform="translate(-1532.684 -1160)" *ngIf="eventsStatusCount[2] > 10">\n							<g id="Group_6252" data-name="Group 6252" transform="translate(1532.684 1160)">\n							  <path id="Path_1396" data-name="Path 1396" d="M18.127,46.5a.346.346,0,0,0-.157-.039.412.412,0,0,0-.3.131l-.836.836a.392.392,0,0,0-.117.287v3.317a2.1,2.1,0,0,1-2.089,2.09H3.761A2.012,2.012,0,0,1,2.285,52.5a2.012,2.012,0,0,1-.614-1.476V40.162a2.012,2.012,0,0,1,.614-1.476,2.012,2.012,0,0,1,1.476-.614H14.627a2.321,2.321,0,0,1,.588.078.42.42,0,0,0,.117.026.413.413,0,0,0,.3-.13l.64-.64a.406.406,0,0,0,.117-.379.4.4,0,0,0-.235-.3,3.6,3.6,0,0,0-1.528-.327H3.761A3.623,3.623,0,0,0,1.1,37.5,3.623,3.623,0,0,0,0,40.162V51.028a3.623,3.623,0,0,0,1.1,2.658,3.622,3.622,0,0,0,2.658,1.1H14.627a3.769,3.769,0,0,0,3.762-3.761V46.875A.379.379,0,0,0,18.127,46.5Z" transform="translate(0 -36.401)"/>\n							</g>\n							<text id="_10_" data-name="10+" transform="translate(1542 1173)" font-size="9" font-family="Helvetica-Bold, Helvetica" font-weight="700" letter-spacing="-0.134em"><tspan x="-6.427" y="0">{{eventsStatusCount[2]}}</tspan></text>\n						</g>\n                    </svg>\n                    Rejected\n                </a>\n            </li>\n        </ul>\n    </div>\n    <div class="event-card select-events bg-gray cardBottom" *ngIf="monthArray.length<=0">\n        <div class="well select-card " >\n            <div class="row">\n                <div class="col-xs-12 ">\n                    <h5 class="sub-title">No Event Present</h5>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="ExtraMonth" *ngFor="let key of monthArray;let y=index">\n\n        <div class="event-card select-events bg-gray"  *ngIf="y <=CardViewSeeMore">\n            <div *ngIf="y <=CardViewSeeMore">\n                <div class="event-black" >\n                    <h5 class="v-center">{{key[key.length-2]}}</h5>\n                </div>\n\n                <div  *ngFor="let key1 of key; let i=index;">\n\n                        <div class="well select-card " [class.disabled]="key1.CONTRACTORS[0].TSStatus==\'Approved\'" (click)="key1.CONTRACTORS[0].TSStatus==\'Approved\'?\'\':gotoReviewerTimesheet(key1,key1.CONTRACTORS[0])" *ngIf="i<key.length-2">\n                            <div class="row">\n                                <div class="event-date col-xs-3 p-0">\n                                    <div class="badge badge-blue">{{key1.weekday}} {{key1.day}}</div>\n                                    <p class="time-center">{{key1.time24HR}}</p>\n                                </div>\n                                <div class="event-title col-xs-8 p-0">\n                                    <h5>{{key1.event_name}}</h5>\n                                    <p>{{key1.event_team}}</p>\n                                    <!-- <p>{{key1.hoursRec}} {{key1.TSStatus}}</p> -->\n                                    <p class="status-info" [class.pending]="key1.CONTRACTORS[0].TSStatus==\'Pending\' || !key1.CONTRACTORS[0].TSStatus" [class.approved]="key1.CONTRACTORS[0].TSStatus==\'Approved\'" [class.rejected]="key1.CONTRACTORS[0].TSStatus==\'Rejected\'">{{key1.CONTRACTORS[0].hoursRec}} \n                                        <span>{{key1.CONTRACTORS[0].TSStatus?key1.CONTRACTORS[0].TSStatus:\'Pending\'}}</span>\n                                    </p>\n                                </div>\n                                <div class="event-next col-xs-1 p-0">\n                                    <a href="javascript:void(0)" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n                                </div>\n                            </div>\n                        </div>\n                </div>\n            </div>\n            \n        </div>\n        <div class="event-card select-events bg-gray multi-shadow" >\n            <div *ngIf="y ==CardViewSeeMore && key[key.length-1]!=\'\'">\n                <div class="event-black" >\n                    <h5 class="v-center">{{key[key.length-1]}}</h5>\n                </div>\n            </div>\n        </div>\n\n        <div class="section-more mb-50 clearfix" *ngIf="y ==CardViewSeeMore && key[key.length-1]!=\'\'" (click)="CardSeeMore($event)">\n            <a href="javascript:void(0)" class="see-more pull-right">SEE MORE</a>\n        </div>\n        <div class="section-more clearfix mt-20" *ngIf="y <=CardViewSeeMore" (click)="CardSeeLess(y)" style="display:none">\n            <a href="javascript:void(0)"  class="see-more pull-right">SEE LESS</a>\n        </div>\n\n    </div>\n  </section>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/contracter-timesheet-list/contracter-timesheet-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], ContracterTimesheetListPage);
    return ContracterTimesheetListPage;
}());

//# sourceMappingURL=contracter-timesheet-list.js.map

/***/ })

});
//# sourceMappingURL=84.js.map