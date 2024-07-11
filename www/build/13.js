webpackJsonp([13],{

/***/ 843:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimesheetAdhocPageModule", function() { return TimesheetAdhocPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timesheet_adhoc__ = __webpack_require__(943);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TimesheetAdhocPageModule = /** @class */ (function () {
    function TimesheetAdhocPageModule() {
    }
    TimesheetAdhocPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__timesheet_adhoc__["a" /* TimesheetAdhocPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__timesheet_adhoc__["a" /* TimesheetAdhocPage */]),
            ],
        })
    ], TimesheetAdhocPageModule);
    return TimesheetAdhocPageModule;
}());

//# sourceMappingURL=timesheet-adhoc.module.js.map

/***/ }),

/***/ 943:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimesheetAdhocPage; });
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







var TimesheetAdhocPage = /** @class */ (function () {
    function TimesheetAdhocPage(navCtrl, http, storage, gFn, navParams, global, events, keyboard, plt, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.http = http;
        this.storage = storage;
        this.gFn = gFn;
        this.navParams = navParams;
        this.global = global;
        this.events = events;
        this.keyboard = keyboard;
        this.plt = plt;
        this.global_api = global_api;
        this.comment = '';
        this.scoreHour = "00";
        this.scoreMinutes = "00";
        this.TotalHours = '';
        this.homeAwayText = '';
        this.Time = '00:00';
        this.eventDate = '';
        this.eventName = '';
        this.gFn.hideMenuIcon();
        this.storage.get('UpcomingSingleEvent').then(function (val) {
            _this.UpcomingSingleEvent = JSON.parse(val);
            _this.storage.get('loggedInUserData').then(function (val) {
                _this.PersonData = val;
            });
        });
        plt.ready().then(function () {
            plt.registerBackButtonAction(function () {
                _this.backArrow();
            });
        });
    }
    TimesheetAdhocPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TimesheetAdhocPage');
    };
    TimesheetAdhocPage.prototype.setTimePad = function () {
        if (parseInt(this.scoreHour) < 10) {
            this.scoreHour = this.padLeft(parseInt(this.scoreHour), 2);
            // this.scoreHour='00'
        }
        if (parseInt(this.scoreMinutes) < 10) {
            this.scoreMinutes = this.padLeft(parseInt(this.scoreMinutes), 2);
            // this.scoreMinutes='00'
        }
    };
    TimesheetAdhocPage.prototype.saveGameScore = function () {
        var Time = this.Time.split(':');
        this.scoreHour = parseInt(Time[0]);
        this.scoreMinutes = Time[1];
        console.log(Time);
        this.TotalHours = this.scoreHour + '.' + Math.round(((100 / 60) * parseInt(this.scoreMinutes)));
    };
    TimesheetAdhocPage.prototype.Morelength = function () {
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
    TimesheetAdhocPage.prototype.padLeft = function (num, size) {
        var s = num + "";
        while (s.length < size)
            s = "0" + s;
        return s;
    };
    TimesheetAdhocPage.prototype.Save = function () {
        var _this = this;
        if (this.eventName.trim().length <= 0) {
            this.gFn.presentToast('Please enter event name');
            return;
        }
        else if (this.eventDate.trim().length <= 0) {
            this.gFn.presentToast('Please enter event date');
            return;
        }
        this.saveGameScore();
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('person_id', _this.PersonData.PERSON_ID)
                .set('clientTimeZone', _this.PersonData.CLIENTTIMEZONE)
                .set('approval_comment', _this.comment)
                .set('season_id', _this.PersonData.SEASON_ID)
                .set('hours', _this.TotalHours)
                .set('eventName', _this.eventName)
                .set('eventDate', _this.eventDate)
                .set('type', '1');
            _this.http.post(_this.global.APIURL + "events/saveAdhocTimesheets", loginData, { headers: _this.global_api.getHeader() })
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
    TimesheetAdhocPage.prototype.backArrow = function () {
        this.gFn.showMenuIcon();
        this.navCtrl.pop();
    };
    TimesheetAdhocPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-timesheet-adhoc',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/timesheet-adhoc/timesheet-adhoc.html"*/'<ion-content class="bg-black" (click)="setTimePad()">\n    <section class="main mt-20">\n        <div class="top-bar" (click)="backArrow()">\n            <div class="col-xs-12">\n                <div class="backArrow inverse inverseText"><span>ADHOC TIMESHEET</span></div>\n            </div>\n        </div>\n      \n      \n          <form action="" class="user-form profile bg-black" style=" padding-top: 5%!important;">\n            <section class="profileFirst heightAuto" >\n              <div>\n                <div class="form-group">\n                  <h5 class="section-title mt-30">EVENT INFO</h5>\n                  <div class="date_time text-blue text-center">\n                    <span class="voting eventDetails">\n                      <ion-item class="select-val">\n                        <ion-input class="event_name" placeholder="Event Name" [(ngModel)]="eventName" [ngModelOptions]="{standalone: true}"></ion-input>\n                      </ion-item>\n                      <ion-item class="select-val">\n                        <ion-datetime class="event_date" placeholder="Event Date" displayFormat="YYYY-MM-DD HH:mm" minuteValues="0,15,30,45" [(ngModel)]="eventDate" [ngModelOptions]="{standalone: true}"></ion-datetime>\n                      </ion-item>\n                    </span>\n                  </div>\n                </div>\n                <h4 class="info-item text-center inverseText"></h4>\n              </div>\n              <!-- <div class="bg-info mt-20 clearfix">\n                <div class="sm-title pull-left">TIMESHEET </div>\n              </div> -->\n            <h5 class="section-title mt-30">HOURS RECORDED</h5>\n                  <div class="voting score clearfix">\n                      <div >\n                          <ion-item class="select-val">\n                              <!-- <ion-label>hh:mm A (15 min steps)</ion-label> -->\n                              <ion-datetime class="hours" displayFormat="HH:mm" minuteValues="0,15,30,45" [(ngModel)]="Time" [ngModelOptions]="{standalone: true}"></ion-datetime>\n                            </ion-item>\n                          <!-- <div class="select-val">\n                              <ion-item>\n                                  <ion-input class="hours" type="number" elastic (input)="Morelength()" placeholder=\'00\' [(ngModel)]="scoreHour" name="scoreHour" (click)="EditData(\'hours\')"></ion-input>\n                                   <ion-label class="middlePart" style="order:1;">:</ion-label>\n                                  <ion-input class="minute" type="number" elastic (input)="Morelength()" placeholder=\'00\' [(ngModel)]="scoreMinutes" name="scoreMinutes" (click)="EditData(\'minute\')"  style="order:1;"></ion-input>\n                              </ion-item>\n                          </div> -->\n                      </div>\n                  </div>\n                  <div class="background group-msg">\n                    <div class="modal-content msg-send radius-20 backgroundColor">\n                        <h4 class="modal-title text-center">COMMENT</h4>\n                        <div class="modal-body backgroundColor">\n                            <textarea class="form-control msg-box" name="" id="" cols="30" rows="7" [(ngModel)]="comment" [ngModelOptions]="{standalone: true}" [readonly]="isSaved">{{comment}}</textarea>\n                        </div>\n                    </div>\n                </div>\n            </section>\n            <div class="btn-section mb-30 mt-30">\n                <button type="submit" class="btn btn-save btn-sm-black radius-10" (click)="Save()">SAVE AND SUBMIT TIMESHEET</button>\n            </div>\n          </form>\n        </section>\n  </ion-content>  '/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/timesheet-adhoc/timesheet-adhoc.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], TimesheetAdhocPage);
    return TimesheetAdhocPage;
}());

//# sourceMappingURL=timesheet-adhoc.js.map

/***/ })

});
//# sourceMappingURL=13.js.map