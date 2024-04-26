webpackJsonp([11],{

/***/ 847:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimesheetPageModule", function() { return TimesheetPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timesheet__ = __webpack_require__(947);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TimesheetPageModule = /** @class */ (function () {
    function TimesheetPageModule() {
    }
    TimesheetPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__timesheet__["a" /* TimesheetPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__timesheet__["a" /* TimesheetPage */]),
            ],
        })
    ], TimesheetPageModule);
    return TimesheetPageModule;
}());

//# sourceMappingURL=timesheet.module.js.map

/***/ }),

/***/ 947:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimesheetPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__ = __webpack_require__(34);
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







var TimesheetPage = /** @class */ (function () {
    function TimesheetPage(navCtrl, http, storage, gFn, navParams, global, events, keyboard, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.http = http;
        this.storage = storage;
        this.gFn = gFn;
        this.navParams = navParams;
        this.global = global;
        this.events = events;
        this.keyboard = keyboard;
        this.global_api = global_api;
        this.comment = '';
        this.scoreHour = "00";
        this.scoreMinutes = "00";
        this.TotalHours = '';
        this.homeAwayText = '';
        this.Time = '00:00';
        this.isSaved = true;
        this.gFn.hideMenuIcon();
        this.storage.get('UpcomingSingleEvent').then(function (val) {
            _this.UpcomingSingleEvent = JSON.parse(val);
            _this.storage.get('loggedInUserData').then(function (val) {
                _this.PersonData = val;
                _this.getEventDetails().then(function (x) {
                    if (x) {
                        _this.getCoachDetails().then(function (y) {
                        });
                    }
                });
            });
        });
    }
    TimesheetPage.prototype.EditData = function (val) {
        if (val == 'hours') {
            this.scoreHour = '';
        }
        else {
            this.scoreMinutes = '';
        }
    };
    TimesheetPage.prototype.setTimePad = function () {
        if (parseInt(this.scoreHour) < 10) {
            this.scoreHour = this.padLeft(parseInt(this.scoreHour), 2);
            // this.scoreHour='00'
        }
        if (parseInt(this.scoreMinutes) < 10) {
            this.scoreMinutes = this.padLeft(parseInt(this.scoreMinutes), 2);
            // this.scoreMinutes='00'
        }
    };
    TimesheetPage.prototype.saveGameScore = function () {
        var Time = this.Time.split(':');
        this.scoreHour = parseInt(Time[0]);
        this.scoreMinutes = Time[1];
        console.log(Time);
        this.TotalHours = this.scoreHour + '.' + Math.round(((100 / 60) * parseInt(this.scoreMinutes)));
    };
    TimesheetPage.prototype.Morelength = function () {
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
        // else if(this.scoreHour<24){
        //   if(this.scoreMinutes>59){
        //     this.scoreMinutes=59
        //     // this.scoreMinutes=this.scoreMinutes%100;
        //     this.keyboard.close()
        //     console.log(this.scoreMinutes)
        //   }
        // }
    };
    TimesheetPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TimesheetPage');
    };
    TimesheetPage.prototype.Save = function () {
        var _this = this;
        this.saveGameScore();
        var selectedTeam = this.PersonData.SELECTEDTEAM;
        if (this.UpcomingSingleEvent.event_type_id == 2 && this.UpcomingSingleEvent.teamid) {
            selectedTeam = this.UpcomingSingleEvent.teamid;
        }
        else if (this.UpcomingSingleEvent.event_type_id == 1) {
            if (this.UpcomingSingleEvent.homeclubid == this.PersonData.CLUB_ID) {
                selectedTeam = this.UpcomingSingleEvent.hometeam;
            }
            else {
                selectedTeam = this.UpcomingSingleEvent.awayteam;
            }
        }
        return new Promise(function (resolve) {
            // this.PersonData.SEASON_ID
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('person_id', _this.PersonData.PERSON_ID)
                .set('event_id', _this.UpcomingSingleEvent.event_id)
                .set('selectedTeam', selectedTeam)
                .set('clientTimeZone', _this.PersonData.CLIENTTIMEZONE)
                .set('event_coach_id', _this.getCoachData ? _this.getCoachData.EVENT_COACH_ID : '')
                .set('approval_comment', _this.comment)
                .set('season_id', _this.arrDetail[0]['season_id'])
                .set('hours', _this.TotalHours)
                .set('type', '1');
            _this.http.post(_this.global.APIURL + "events/updateTimesheets", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (!data.SUCCESS) {
                    _this.gFn.presentToast('Data issue or connection issue');
                }
                _this.gFn.showMenuIcon();
                _this.navCtrl.pop();
                console.log(data);
                resolve(true);
            }, function (error) {
            });
        });
    };
    TimesheetPage.prototype.getCoachDetails = function () {
        var _this = this;
        console.log("this.PersonData.SEASON_ID", this.PersonData.SEASON_ID);
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('event_id', _this.UpcomingSingleEvent.event_id)
                .set('person_id', _this.PersonData.PERSON_ID)
                .set('clientTimeZone', _this.PersonData.CLIENTTIMEZONE)
                .set('club_id', _this.PersonData.CLUB_ID)
                .set('season_id', _this.PersonData.SEASON_ID);
            console.log("season_id", _this.PersonData.SEASON_ID);
            _this.http.post(_this.global.APIURL + "events/getCoachInfo", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                var Data = _this.events.publish('json:query', data.GETCOACHINFO[1]);
                console.log("DATA", Data);
                var Data_new = data.GETCOACHINFO[0].canFillTimeSheet;
                if (Data_new) {
                    _this.isSaved = true;
                }
                else {
                    _this.isSaved = false;
                }
                _this.getCoachData = Data[0][0];
                console.log("data from getCoachInfo", _this.getCoachData);
                if (_this.getCoachData) {
                    // this.isSaved = true;
                    _this.comment = _this.getCoachData['APPROVAL_COMMENT'];
                    console.log("comment", _this.comment);
                    _this.scoreHour = Math.floor(_this.getCoachData['HOURS_RECORDED']);
                    _this.scoreMinutes = parseInt((((_this.getCoachData['HOURS_RECORDED'] - Math.floor(_this.getCoachData['HOURS_RECORDED'])) * (60 / 100) * 100)).toFixed(2));
                    _this.setTimePad();
                    _this.Time = _this.scoreHour + ':' + _this.scoreMinutes;
                    console.log((((_this.getCoachData['HOURS_RECORDED'] - Math.floor(_this.getCoachData['HOURS_RECORDED'])) * (60 / 100)).toFixed(2)));
                }
                else {
                    // this.isSaved = false;
                }
                resolve(true);
            }, function (error) {
            });
        });
    };
    TimesheetPage.prototype.padLeft = function (num, size) {
        var s = num + "";
        while (s.length < size)
            s = "0" + s;
        return s;
    };
    TimesheetPage.prototype.getEventDetails = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('event_id', _this.UpcomingSingleEvent.event_id)
                .set('event_type_id', _this.UpcomingSingleEvent.event_type_id)
                .set('clientTimeZone', _this.PersonData.CLIENTTIMEZONE)
                .set('selectedTeam', _this.PersonData.SELECTEDTEAM)
                .set('client_id', _this.UpcomingSingleEvent.client_id);
            _this.http.post(_this.global.APIURL + "events/getEventDetails", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                _this.arrDetail = data.GETEVENTDETAILS;
                _this.homeAwayText = (data.GETEVENTDETAILS[0]["ishometeam"]) ? 'Home' : 'Away';
                for (var _i = 0, _a = _this.arrDetail; _i < _a.length; _i++) {
                    var keys = _a[_i];
                    _this.key = keys;
                    _this.date = _this.key.date.split('/')[0];
                    _this.input_disable = _this.key.canScore;
                }
                resolve(true);
            }, function (error) {
            });
        });
    };
    TimesheetPage.prototype.backArrow = function () {
        this.gFn.showMenuIcon();
        this.navCtrl.pop();
    };
    TimesheetPage.prototype.ionViewDidLeave = function () {
        this.gFn.showMenuIcon();
    };
    TimesheetPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-timesheet',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/timesheet/timesheet.html"*/'<ion-content class="bg-black" (click)="setTimePad()">\n  <section class="main mt-20">\n      <div class="top-bar" (click)="backArrow()">\n          <div class="col-xs-3">\n              <div class="backArrow inverse"></div>\n          </div>\n      </div>\n    \n    \n        <form action="" class="user-form profile bg-black" style=" padding-top: 5%!important;">\n          <section class="profileFirst heightAuto" >\n            <div *ngFor="let detail of arrDetail">\n              <div class="form-group">\n                <div class="date_time text-blue text-center">\n                  <span class="dateOption">{{key.week}} {{date}} {{detail.months }}</span>\n                  <span class="glyphicon glyphicon-time" *ngIf="arrDetail"></span>\n                  <span class="timeOption">\n                    <span>{{key.time_started}}</span>\n                  </span>\n                </div>\n                <div class="homeAway-title text-center text-blue" *ngIf="detail.event_type_id==1">{{homeAwayText}}</div>\n              </div>\n              <h4 class="info-item text-center inverseText" *ngIf="detail.event_type_id==1">{{detail.hometeamname}} vs {{detail.awayteamname}}</h4>\n              <h4 class="info-item text-center inverseText">{{detail.name}}</h4>\n            </div>\n            <div class="bg-info mt-20 clearfix">\n              <div class="sm-title pull-left">TIMESHEET </div>\n          </div>\n          <h5 class="section-title mt-30">HOURS RECORDED</h5>\n                <div class="voting score clearfix">\n                    <div >\n                        <ion-item class="select-val">\n                            <!-- <ion-label>hh:mm A (15 min steps)</ion-label> -->\n                            <ion-datetime class="hours" displayFormat="HH:mm" minuteValues="0,15,30,45" [(ngModel)]="Time" [ngModelOptions]="{standalone: true}" [disabled]="!isSaved"></ion-datetime>\n                          </ion-item>\n                        <!-- <div class="select-val">\n                            <ion-item>\n                                <ion-input class="hours" type="number" elastic (input)="Morelength()" placeholder=\'00\' [(ngModel)]="scoreHour" name="scoreHour" (click)="EditData(\'hours\')"></ion-input>\n                                 <ion-label class="middlePart" style="order:1;">:</ion-label>\n                                <ion-input class="minute" type="number" elastic (input)="Morelength()" placeholder=\'00\' [(ngModel)]="scoreMinutes" name="scoreMinutes" (click)="EditData(\'minute\')"  style="order:1;"></ion-input>\n                            </ion-item>\n                        </div> -->\n                    </div>\n                </div>\n                <div class="background group-msg">\n                  <div class="modal-content msg-send radius-20 backgroundColor">\n                      <h4 class="modal-title text-center">COMMENT</h4>\n                      <div class="modal-body backgroundColor">\n                          <textarea class="form-control msg-box" name="" id="" cols="30" rows="7" [(ngModel)]="comment" [ngModelOptions]="{standalone: true}" [readonly]="!isSaved">{{comment}}</textarea>\n                      </div>\n                  </div>\n              </div>\n          </section>\n          <div class="btn-section mb-30 mt-30" *ngIf="isSaved && input_disable">\n              <button type="submit" class="btn btn-save btn-sm-black radius-10" (click)=" Save()">SAVE AND SUBMIT TIMESHEET</button>\n          </div>\n        </form>\n      </section>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/timesheet/timesheet.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], TimesheetPage);
    return TimesheetPage;
}());

//# sourceMappingURL=timesheet.js.map

/***/ })

});
//# sourceMappingURL=11.js.map