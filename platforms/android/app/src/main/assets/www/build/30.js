webpackJsonp([30],{

/***/ 826:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReadOnlyTimesheetPageModule", function() { return ReadOnlyTimesheetPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__read_only_timesheet__ = __webpack_require__(927);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ReadOnlyTimesheetPageModule = /** @class */ (function () {
    function ReadOnlyTimesheetPageModule() {
    }
    ReadOnlyTimesheetPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__read_only_timesheet__["a" /* ReadOnlyTimesheetPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__read_only_timesheet__["a" /* ReadOnlyTimesheetPage */]),
            ],
        })
    ], ReadOnlyTimesheetPageModule);
    return ReadOnlyTimesheetPageModule;
}());

//# sourceMappingURL=read-only-timesheet.module.js.map

/***/ }),

/***/ 927:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReadOnlyTimesheetPage; });
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







var ReadOnlyTimesheetPage = /** @class */ (function () {
    function ReadOnlyTimesheetPage(navCtrl, http, navParams, storage, global, keyboard, events, globalApi, gFn, plt, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.http = http;
        this.navParams = navParams;
        this.storage = storage;
        this.global = global;
        this.keyboard = keyboard;
        this.events = events;
        this.globalApi = globalApi;
        this.gFn = gFn;
        this.plt = plt;
        this.global_api = global_api;
        this.arrDetail = [];
        this.scoreHour = "00";
        this.scoreMinutes = "00";
        this.Time = '00:00';
        this.TotalHours = '';
        this.getCoachData = [];
        this.homeAwayText = '';
        this.reviewerComment = '';
        this.isDisabled = false;
        this.hideButton = false;
        this.gFn.hideMenuIcon();
        plt.ready().then(function () {
            plt.registerBackButtonAction(function () {
                _this.backArrow();
            });
        });
    }
    ReadOnlyTimesheetPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log("read-only");
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
            console.log("personData", _this.PersonData);
            if (_this.navParams.get('ContractorData')) {
                _this.PersonData = JSON.parse(_this.navParams.get('ContractorData'));
                _this.UpcomingSingleEvent.TSStatus = _this.PersonData.TSStatus;
                var hours = _this.PersonData.hoursRec.split(':');
                _this.scoreHour = hours[0] ? hours[0] : '00';
                _this.scoreMinutes = hours[1] ? hours[1] : '00';
                _this.Time = _this.scoreHour + ':' + _this.scoreMinutes;
                _this.comment = _this.PersonData.comment;
                _this.getCoachData.EVENT_COACH_ID = _this.PersonData.eventCID;
                if (_this.UpcomingSingleEvent.TSStatus == 'Approved' || _this.UpcomingSingleEvent.TSStatus == 'Rejected') {
                    _this.isDisabled = true;
                }
            }
            else if (_this.UpcomingSingleEvent.CONTRACTORS.length) {
                _this.UpcomingSingleEvent.TSStatus = _this.UpcomingSingleEvent.CONTRACTORS[0].TSStatus;
                _this.getCoachData.EVENT_COACH_ID = _this.UpcomingSingleEvent.CONTRACTORS[0].eventCID;
                if (_this.UpcomingSingleEvent.TSStatus == 'Approved' || _this.UpcomingSingleEvent.TSStatus == 'Rejected') {
                    _this.isDisabled = true;
                }
            }
            if (_this.UpcomingSingleEvent.event_id > 0) {
                _this.getEventDetails().then(function (x) {
                    if (x) {
                        _this.getCoachDetails().then(function (y) {
                        });
                    }
                });
            }
            // this.getCoachDetails().then(y=>{
            // })
            // if(this.PersonData){
            //   console.log(this.PersonData)
            // }
        });
        // })
        console.log('ionViewDidLoad ReviewerTimesheetPage');
    };
    ReadOnlyTimesheetPage.prototype.ionViewDidLeave = function () {
        this.gFn.showMenuIcon();
    };
    ReadOnlyTimesheetPage.prototype.EditData = function (val) {
        if (val == 'hours') {
            this.scoreHour = '';
        }
        else {
            this.scoreMinutes = '';
        }
    };
    ReadOnlyTimesheetPage.prototype.setTimePad = function () {
        if (parseInt(this.scoreHour) < 10) {
            this.scoreHour = this.padLeft(parseInt(this.scoreHour), 2);
            // this.scoreHour='00'
        }
        if (parseInt(this.scoreMinutes) < 10) {
            this.scoreMinutes = this.padLeft(parseInt(this.scoreMinutes), 2);
            // this.scoreMinutes='00'
        }
    };
    ReadOnlyTimesheetPage.prototype.saveGameScore = function () {
        var Time = this.Time.split(':');
        this.scoreHour = parseInt(Time[0]);
        this.scoreMinutes = Time[1];
        this.TotalHours = this.scoreHour + '.' + Math.round(((100 / 60) * parseInt(this.scoreMinutes)));
    };
    ReadOnlyTimesheetPage.prototype.Morelength = function () {
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
    ReadOnlyTimesheetPage.prototype.getCoachDetails = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('event_id', _this.UpcomingSingleEvent.event_id)
                .set('person_id', _this.PersonData.PERSON_ID)
                .set('clientTimeZone', _this.PersonData.CLIENTTIMEZONE)
                .set('club_id', _this.PersonData.CLUB_ID)
                .set('season_id', _this.PersonData.SEASON_ID);
            _this.http.post(_this.global.APIURL + "events/getCoachInfo", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                var Data = _this.events.publish('json:query', data.GETCOACHINFO[1]);
                console.log("read-only-Data", Data[0][0].EVENT_COACH_ID);
                _this.getCoachData = Data[0][0];
                if (_this.getCoachData) {
                    _this.hideButton = true;
                }
                else {
                    _this.hideButton = false;
                }
                _this.comment = _this.getCoachData['APPROVAL_COMMENT'];
                _this.scoreHour = Math.floor(_this.getCoachData['HOURS_RECORDED']);
                _this.scoreMinutes = parseInt((((_this.getCoachData['HOURS_RECORDED'] - Math.floor(_this.getCoachData['HOURS_RECORDED'])) * (60 / 100) * 100)).toFixed(2));
                _this.setTimePad();
                console.log((((_this.getCoachData['HOURS_RECORDED'] - Math.floor(_this.getCoachData['HOURS_RECORDED'])) * (60 / 100)).toFixed(2)));
                resolve(true);
            }, function (error) {
            });
        });
    };
    ReadOnlyTimesheetPage.prototype.padLeft = function (num, size) {
        var s = num + "";
        while (s.length < size)
            s = "0" + s;
        return s;
    };
    ReadOnlyTimesheetPage.prototype.getEventDetails = function () {
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
                _this.homeAwayText = (data.GETEVENTDETAILS[0]["ishometeam"]) ? 'Home' : 'Away';
                for (var _i = 0, _a = _this.arrDetail; _i < _a.length; _i++) {
                    var keys = _a[_i];
                    console.log(_this.arrDetail);
                    _this.key = keys;
                    console.log(_this.key);
                    _this.date = _this.key.date.split('/')[0];
                }
                resolve(true);
            }, function (error) {
            });
        });
    };
    ReadOnlyTimesheetPage.prototype.TimesheetStatus = function (status) {
        var _this = this;
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('person_id', _this.PersonData.PERSON_ID)
                .set('event_coach_id', _this.getCoachData.EVENT_COACH_ID)
                .set('season_id', _this.PersonData.SEASON_ID)
                .set('approve_value', status)
                .set('clientTimeZone', _this.PersonData.CLIENTTIMEZONE);
            _this.http.post(_this.global.APIURL + "events/approveTimesheets", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.APPROVETIMESHEETS == true && data.SUCCESS == true) {
                    if (status == 1) {
                        _this.globalApi.presentToast('Accepted Timesheet');
                    }
                    else if (status == 0) {
                        _this.globalApi.presentToast('Rejected Timesheet');
                    }
                }
                _this.navCtrl.push('TimesheetDashboardPage');
                resolve(true);
            }, function (error) {
            });
        });
    };
    ReadOnlyTimesheetPage.prototype.Save = function () {
        var _this = this;
        this.saveGameScore();
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('person_id', _this.PersonData.PERSON_ID)
                .set('event_id', _this.UpcomingSingleEvent.event_id)
                .set('selectedTeam', '0')
                .set('clientTimeZone', _this.PersonData.CLIENTTIMEZONE)
                .set('event_coach_id', _this.getCoachData.EVENT_COACH_ID)
                .set('approval_comment', _this.comment)
                .set('season_id', _this.PersonData.SEASON_ID)
                .set('hours', _this.TotalHours)
                .set('type', '1');
            _this.http.post(_this.global.APIURL + "events/updateTimesheets", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (!data.SUCCESS) {
                    _this.gFn.presentToast('Data issue or connection issue');
                }
                _this.gFn.showMenuIcon();
                _this.navCtrl.push('TimesheetDashboardPage', { segments: 'MyHours' });
                _this.navCtrl.remove(_this.navCtrl.getActive().index - 1, 2);
                resolve(true);
            }, function (error) {
            });
        });
    };
    ReadOnlyTimesheetPage.prototype.backArrow = function () {
        this.navCtrl.push('TimesheetDashboardPage', { segments: 'MyHours' });
        this.navCtrl.remove(this.navCtrl.getActive().index - 1, 2);
    };
    ReadOnlyTimesheetPage.prototype.formatAMPM = function (date) {
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
    ReadOnlyTimesheetPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-read-only-timesheet',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/read-only-timesheet/read-only-timesheet.html"*/'<ion-content class="bg-black" (click)="setTimePad()">\n  <section class="main mt-20">\n      <div class="top-bar" (click)="backArrow()">\n          <div class="col-xs-3">\n              <div class="backArrow inverse"></div>\n          </div>\n      </div>\n    \n    \n        <form action="" class="user-form profile bg-black" style=" padding-top: 5%!important;">\n          <section class="profileFirst heightAuto" >\n            <div *ngFor="let detail of arrDetail">\n              <div class="form-group">\n                <div class="date_time text-blue text-center">\n                  <span class="dateOption">{{detail.week}} {{date}} {{detail.months | titlecase}}</span>\n                  <span class="glyphicon glyphicon-time" *ngIf="arrDetail"></span>\n                  <span class="timeOption">\n                    <span>{{detail.time_started}}</span>\n                  </span>\n                </div>\n                \n                <div class="homeAway-title text-center text-blue" *ngIf="detail.event_type_id==1">{{homeAwayText}}</div>\n              </div>\n              <h4 class="info-item text-center inverseText" *ngIf="detail.event_type_id==1">{{detail.hometeamname}} vs {{detail.awayteamname}}</h4>\n              <h4 class="info-item text-center inverseText">{{detail.name}}</h4>\n            </div>\n            <p class="status-info mt-20" *ngIf="UpcomingSingleEvent && UpcomingSingleEvent.TSStatus" [class.pending]="UpcomingSingleEvent.TSStatus==\'Pending\' || !UpcomingSingleEvent.TSStatus" \n                [class.approved]="UpcomingSingleEvent.TSStatus==\'Approved\'" [class.rejected]="UpcomingSingleEvent.TSStatus==\'Rejected\'">\n              <span>{{UpcomingSingleEvent.TSStatus?UpcomingSingleEvent.TSStatus:\'Pending\'}}</span> \n            </p>\n            <div class="bookmark-line mt-20">&nbsp;</div>\n            <!-- <p class="Status-Text" *ngIf="UpcomingSingleEvent && UpcomingSingleEvent.TSStatus">{{UpcomingSingleEvent.TSStatus}}</p> -->\n          <h5 class="section-title">HOURS RECORDED</h5>\n            <div class="voting score clearfix">\n                <div >\n                    <div class="select-val">\n                        <ion-item>\n                          <ion-datetime class="hours" displayFormat="HH:mm" minuteValues="0,15,30,45" [(ngModel)]="Time" [ngModelOptions]="{standalone: true}" [disabled]="isDisabled"></ion-datetime>\n                        </ion-item>\n                    </div>\n                </div>\n            </div>\n            <div class="bookmark-line mt-30"> <i class="glyphicon glyphicon-bookmark" style="background: #fff;width: 30px;height: 30px;border-radius: 15px;padding-top: 10px;"></i></div>\n            <p class="Status-Text" *ngIf="comment && isDisabled">{{comment}}</p>\n            <p class="Status-Text" *ngIf="reviewerComment && isDisabled">{{reviewerComment}}</p>\n            \n            <div class="background group-msg" *ngIf="!isDisabled">\n              <div class="modal-content msg-send radius-20 backgroundColor">\n                  <h4 class="modal-title text-center">COMMENT</h4>\n                  <div class="modal-body backgroundColor">\n                      <textarea class="form-control msg-box" name="" id="" cols="30" rows="7" [(ngModel)]="comment" [ngModelOptions]="{standalone: true}" [readonly]="isSaved">{{comment}}</textarea>\n                  </div>\n              </div>\n            </div>\n            <div class="btn-section mb-30 mt-30" *ngIf="!isDisabled">\n              <button type="submit" class="btn btn-save btn-sm-black radius-10" *ngIf="!hideButton" (click)="Save()">SAVE AND SUBMIT TIMESHEET</button>\n            </div>                \n          </section>\n        </form>\n      </section>\n</ion-content>\n\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/read-only-timesheet/read-only-timesheet.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_5__providers_global_api_global_api__["a" /* GlobalApiProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], ReadOnlyTimesheetPage);
    return ReadOnlyTimesheetPage;
}());

//# sourceMappingURL=read-only-timesheet.js.map

/***/ })

});
//# sourceMappingURL=30.js.map