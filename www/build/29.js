webpackJsonp([29],{

/***/ 827:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReviewerTimesheetPageModule", function() { return ReviewerTimesheetPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reviewer_timesheet__ = __webpack_require__(928);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ReviewerTimesheetPageModule = /** @class */ (function () {
    function ReviewerTimesheetPageModule() {
    }
    ReviewerTimesheetPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__reviewer_timesheet__["a" /* ReviewerTimesheetPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__reviewer_timesheet__["a" /* ReviewerTimesheetPage */]),
            ],
        })
    ], ReviewerTimesheetPageModule);
    return ReviewerTimesheetPageModule;
}());

//# sourceMappingURL=reviewer-timesheet.module.js.map

/***/ }),

/***/ 928:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReviewerTimesheetPage; });
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







var ReviewerTimesheetPage = /** @class */ (function () {
    function ReviewerTimesheetPage(navCtrl, http, navParams, storage, global, keyboard, events, globalApi, gFn, global_api) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.navParams = navParams;
        this.storage = storage;
        this.global = global;
        this.keyboard = keyboard;
        this.events = events;
        this.globalApi = globalApi;
        this.gFn = gFn;
        this.global_api = global_api;
        this.arrDetail = [];
        this.scoreHour = "00";
        this.scoreMinutes = "00";
        this.TotalHours = '';
        this.getCoachData = [];
        this.homeAwayText = '';
        this.reviewerComment = '';
        this.gFn.hideMenuIcon();
    }
    ReviewerTimesheetPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log("reviewer");
        this.storage.get('loggedInUserData').then(function (val) {
            _this.PersonData = val;
            _this.loggedInUser = val;
        });
        // this.storage.get('UpcomingSingleEvent').then((val) => {
        this.UpcomingSingleEvent = JSON.parse(this.navParams.get('UpcomingSingleEvent'));
        console.log(this.UpcomingSingleEvent);
        if (this.UpcomingSingleEvent.event_id == 0) {
            this.reviewerComment = this.UpcomingSingleEvent.reviewerComment;
            this.arrDetail.push(this.UpcomingSingleEvent);
            var i = 0;
            for (var _i = 0, _a = this.arrDetail; _i < _a.length; _i++) {
                var keys = _a[_i];
                this.key = keys;
                this.date = this.key.day;
                this.key.week = this.key.weekday;
                this.key.time_started = this.formatAMPM(this.key.date_started);
                this.arrDetail[i].name = this.arrDetail[i].event_name;
                this.arrDetail[i].months = this.arrDetail[i].month;
                i++;
            }
        }
        this.storage.get('loggedInUserData').then(function (val) {
            _this.PersonData = val;
            if (_this.navParams.get('ContractorData')) {
                _this.PersonData = JSON.parse(_this.navParams.get('ContractorData'));
                _this.UpcomingSingleEvent.TSStatus = _this.PersonData.TSStatus;
                var hours = _this.PersonData.hoursRec.split(':');
                _this.scoreHour = hours[0] ? hours[0] : '00';
                _this.scoreMinutes = hours[1] ? hours[1] : '00';
                _this.comment = _this.PersonData.comment;
                _this.getCoachData.EVENT_COACH_ID = _this.PersonData.eventCID;
            }
            else if (_this.UpcomingSingleEvent.CONTRACTORS.length) {
                _this.UpcomingSingleEvent.TSStatus = _this.UpcomingSingleEvent.CONTRACTORS[0].TSStatus;
                _this.getCoachData.EVENT_COACH_ID = _this.UpcomingSingleEvent.CONTRACTORS[0].eventCID;
            }
            if (_this.UpcomingSingleEvent.event_id > 0) {
                _this.getEventDetails().then(function (x) {
                    if (x) {
                        _this.getCoachDetails().then(function (y) {
                        });
                    }
                });
            }
        });
        console.log('ionViewDidLoad ReviewerTimesheetPage');
    };
    ReviewerTimesheetPage.prototype.ionViewDidLeave = function () {
        this.gFn.showMenuIcon();
    };
    ReviewerTimesheetPage.prototype.EditData = function (val) {
        if (val == 'hours') {
            this.scoreHour = '';
        }
        else {
            this.scoreMinutes = '';
        }
    };
    ReviewerTimesheetPage.prototype.setTimePad = function () {
        if (parseInt(this.scoreHour) < 10) {
            this.scoreHour = this.padLeft(parseInt(this.scoreHour), 2);
            // this.scoreHour='00'
        }
        if (parseInt(this.scoreMinutes) < 10) {
            this.scoreMinutes = this.padLeft(parseInt(this.scoreMinutes), 2);
            // this.scoreMinutes='00'
        }
    };
    ReviewerTimesheetPage.prototype.saveGameScore = function () {
        this.TotalHours = this.scoreHour + '.' + Math.round(((100 / 60) * parseInt(this.scoreMinutes)));
    };
    ReviewerTimesheetPage.prototype.Morelength = function () {
        if (this.scoreHour >= 24) {
            if (this.scoreHour == 24) {
                this.keyboard.close();
                this.scoreMinutes = '00';
            }
            else {
                this.scoreHour = 24;
                // this.scoreHour=this.scoreHour/100;
                console.log(this.scoreHour);
            }
        }
        else if (this.scoreMinutes > 59) {
            if (this.scoreHour > 23) {
                this.scoreHour = '00';
            }
            this.scoreMinutes = 59;
            this.keyboard.close();
            console.log(this.scoreMinutes);
        }
    };
    ReviewerTimesheetPage.prototype.getCoachDetails = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('event_id', _this.UpcomingSingleEvent.event_id)
                .set('person_id', _this.UpcomingSingleEvent['CONTRACTORS'][0].PERSON_ID)
                .set('clientTimeZone', _this.UpcomingSingleEvent['CONTRACTORS'][0].CLIENTTIMEZONE)
                .set('club_id', _this.UpcomingSingleEvent['CONTRACTORS'][0].CLUB_ID)
                .set('season_id', _this.UpcomingSingleEvent['CONTRACTORS'][0].SEASON_ID);
            _this.http.post(_this.global.APIURL + "events/getCoachInfo", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                var Data = _this.events.publish('json:query', data.GETCOACHINFO[1]);
                console.log(Data[0][0].EVENT_COACH_ID);
                _this.getCoachData = Data[0][0];
                _this.comment = _this.getCoachData['APPROVAL_COMMENT'];
                _this.reviewerComment = _this.getCoachData['REVIEWER_COMMENT'] ? _this.getCoachData['REVIEWER_COMMENT'] : '';
                _this.scoreHour = Math.floor(_this.getCoachData['HOURS_RECORDED']);
                _this.scoreMinutes = parseInt((((_this.getCoachData['HOURS_RECORDED'] - Math.floor(_this.getCoachData['HOURS_RECORDED'])) * (60 / 100) * 100)).toFixed(2));
                _this.setTimePad();
                console.log((((_this.getCoachData['HOURS_RECORDED'] - Math.floor(_this.getCoachData['HOURS_RECORDED'])) * (60 / 100)).toFixed(2)));
                resolve(true);
            }, function (error) {
            });
        });
    };
    ReviewerTimesheetPage.prototype.padLeft = function (num, size) {
        var s = num + "";
        while (s.length < size)
            s = "0" + s;
        return s;
    };
    ReviewerTimesheetPage.prototype.getEventDetails = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('event_id', _this.UpcomingSingleEvent.event_id)
                .set('event_type_id', _this.UpcomingSingleEvent.event_type_id)
                .set('clientTimeZone', _this.UpcomingSingleEvent['CONTRACTORS'][0].CLIENTTIMEZONE)
                .set('selectedTeam', _this.UpcomingSingleEvent['CONTRACTORS'][0].SELECTEDTEAM)
                .set('client_id', _this.UpcomingSingleEvent['CONTRACTORS'][0].CLIENT_ID);
            _this.http.post(_this.global.APIURL + "events/getEventDetails", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                _this.arrDetail = data.GETEVENTDETAILS;
                _this.homeAwayText = (data.GETEVENTDETAILS[0]["ishometeam"]) ? 'Home' : 'Away';
                for (var _i = 0, _a = _this.arrDetail; _i < _a.length; _i++) {
                    var keys = _a[_i];
                    _this.key = keys;
                    _this.date = _this.key.date.split('/')[0];
                }
                resolve(true);
            }, function (error) {
            });
        });
    };
    ReviewerTimesheetPage.prototype.TimesheetStatus = function (status) {
        var _this = this;
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('person_id', _this.UpcomingSingleEvent['CONTRACTORS'][0].PERSON_ID)
                .set('event_coach_id', _this.getCoachData.EVENT_COACH_ID)
                .set('season_id', _this.UpcomingSingleEvent['CONTRACTORS'][0].SEASON_ID)
                .set('approve_value', status)
                .set('reviewer_comment', _this.reviewerComment)
                .set('app_type', _this.global.App_id)
                .set('clientTimeZone', _this.UpcomingSingleEvent['CONTRACTORS'][0].CLIENTTIMEZONE);
            _this.http.post(_this.global.APIURL + "events/approveTimesheets", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.APPROVETIMESHEETS == true && data.SUCCESS == true) {
                    _this.globalApi.presentToast(data.MESSAGE);
                }
                _this.navCtrl.push('TimesheetDashboardPage');
                resolve(true);
            }, function (error) {
            });
        });
    };
    ReviewerTimesheetPage.prototype.backArrow = function () {
        this.navCtrl.pop();
    };
    ReviewerTimesheetPage.prototype.formatAMPM = function (date) {
        date = new Date(date);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    };
    ReviewerTimesheetPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-reviewer-timesheet',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/reviewer-timesheet/reviewer-timesheet.html"*/'<ion-content class="bg-black" (click)="setTimePad()">\n    <section class="main mt-20">\n        <div class="top-bar" (click)="backArrow()">\n            <div class="col-xs-3">\n                <div class="backArrow inverse"></div>\n            </div>\n        </div>\n      \n      \n          <form action="" class="user-form profile bg-black" style=" padding-top: 5%!important;">\n            <section class="profileFirst heightAuto" >\n              <div *ngFor="let detail of arrDetail">\n                <div class="form-group">\n                  <div class="date_time text-blue text-center">\n                    <span class="dateOption">{{key.week}} {{date}} {{detail.months | titlecase}}</span>\n                    <span class="glyphicon glyphicon-time" *ngIf="arrDetail"></span>\n                    <span class="timeOption">\n                      <span>{{key.time_started}}</span>\n                    </span>\n                  </div>\n                  <div class="homeAway-title text-center text-blue" *ngIf="detail.event_type_id==1">{{homeAwayText}}</div>\n                </div>\n                <h4 class="info-item text-center inverseText" *ngIf="detail.event_type_id==1">{{detail.hometeamname}} vs {{detail.awayteamname}}</h4>\n                <h4 class="info-item text-center inverseText">{{detail.name}}</h4>\n              </div>\n\n              <p class="status-info mt-20" *ngIf="UpcomingSingleEvent && (UpcomingSingleEvent.CONTRACTORS[0].TSStatus || !UpcomingSingleEvent.CONTRACTORS[0].TSStatus)" [class.pending]="UpcomingSingleEvent.CONTRACTORS[0].TSStatus==\'Pending\' || !UpcomingSingleEvent.CONTRACTORS[0].TSStatus" [class.approved]="UpcomingSingleEvent.CONTRACTORS[0].TSStatus==\'Approved\'" [class.rejected]="UpcomingSingleEvent.CONTRACTORS[0].TSStatus==\'Rejected\'">\n                <span>{{UpcomingSingleEvent.CONTRACTORS[0].TSStatus?UpcomingSingleEvent.CONTRACTORS[0].TSStatus:\'Pending\'}}</span> \n              </p>\n            \n              <!-- <p class="Status-Text" *ngIf="UpcomingSingleEvent && UpcomingSingleEvent.TSStatus">\n                  {{UpcomingSingleEvent.TSStatus}}\n                </p> -->\n             <div class="bookmark-line mt-20">&nbsp;</div>\n            <h5 class="section-title">HOURS RECORDED</h5>\n            <div class="voting score clearfix">\n                <div >\n                    <div class="select-val">\n                        <ion-item>\n                        <ion-label class="hours">{{scoreHour}} : {{scoreMinutes}}</ion-label>\n                            \n                        </ion-item>\n                    </div>\n                </div>\n            </div>\n            <div class="bookmark-line mt-30"> <i class="glyphicon glyphicon-bookmark" style="background: #fff;width: 30px;height: 30px;border-radius: 15px;padding-top: 10px;"></i></div>\n            <p class="Status-Text" *ngIf="comment">{{comment}}</p>\n            <div class="background group-msg" *ngIf="UpcomingSingleEvent && UpcomingSingleEvent.TSStatus!=\'Approved\'">\n                <div class="modal-content msg-send radius-20 backgroundColor">\n                    <h4 class="modal-title text-center">COMMENT</h4>\n                    <div class="modal-body backgroundColor">\n                        <textarea class="form-control msg-box" name="" id="" cols="30" rows="7" [(ngModel)]="reviewerComment" [ngModelOptions]="{standalone: true}">{{comment}}</textarea>\n                    </div>\n                </div>\n            </div>\n            </section>\n            <div class="btn-section mb-30 mt-30" *ngIf="UpcomingSingleEvent && UpcomingSingleEvent.TSStatus!=\'Approved\'">\n                <button type="submit" class="btn btn-save btn-accept radius-10" *ngIf="UpcomingSingleEvent.TSApprove || (loggedInUser?.PERSON_ID != UpcomingSingleEvent?.CONTRACTORS[0]?.PERSON_ID)" (click)="TimesheetStatus(1)">ACCEPT TIMESHEET</button>\n            </div>\n            <div class="btn-section mb-30 mt-30" *ngIf="UpcomingSingleEvent && (UpcomingSingleEvent.TSStatus!=\'Approved\' && UpcomingSingleEvent.TSStatus!=\'Rejected\')" >\n                <button type="submit" class="btn btn-save btn-reject radius-10" *ngIf="UpcomingSingleEvent.TSApprove || (loggedInUser?.PERSON_ID != UpcomingSingleEvent?.CONTRACTORS[0]?.PERSON_ID)" (click)="TimesheetStatus(0)">REJECT TIMESHEET</button>\n            </div>\n          </form>\n        </section>\n  </ion-content>\n  '/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/reviewer-timesheet/reviewer-timesheet.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_5__providers_global_api_global_api__["a" /* GlobalApiProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], ReviewerTimesheetPage);
    return ReviewerTimesheetPage;
}());

//# sourceMappingURL=reviewer-timesheet.js.map

/***/ })

});
//# sourceMappingURL=29.js.map