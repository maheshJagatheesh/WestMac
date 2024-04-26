webpackJsonp([65],{

/***/ 789:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventWelfarePageModule", function() { return EventWelfarePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_welfare__ = __webpack_require__(892);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EventWelfarePageModule = /** @class */ (function () {
    function EventWelfarePageModule() {
    }
    EventWelfarePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__event_welfare__["a" /* EventWelfarePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__event_welfare__["a" /* EventWelfarePage */]),
            ],
        })
    ], EventWelfarePageModule);
    return EventWelfarePageModule;
}());

//# sourceMappingURL=event-welfare.module.js.map

/***/ }),

/***/ 892:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventWelfarePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(18);
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









var EventWelfarePage = /** @class */ (function () {
    function EventWelfarePage(navCtrl, loadingCtrl, app, global, events, navParams, modalCtrl, toastCtrl, http, storage, gFn, calendar, launchNavigator, Alert, plt, global_Api, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.app = app;
        this.global = global;
        this.events = events;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.http = http;
        this.storage = storage;
        this.gFn = gFn;
        this.calendar = calendar;
        this.launchNavigator = launchNavigator;
        this.Alert = Alert;
        this.plt = plt;
        this.global_Api = global_Api;
        this.global_api = global_api;
        this.arrDetail = [];
        this.BackButton = false;
        this.ShowSeverityPage = false;
        this.showEvent = false;
        this.groundAdress = '';
        this.groundState = '';
        this.latitude = '';
        this.longitude = '';
        this.medicalInfo = false;
        plt.ready().then(function () {
            plt.registerBackButtonAction(function () {
                _this.navCtrl.pop();
            });
        });
        this.QuestionSuccess = navParams.get('success');
        this.QuestionPlayerId = navParams.get('personId');
        this.PhotoApiUrl = this.global.PROFILEIMAGEURL;
        // $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({'mask-image': 'url(../assets/images/menu/home.svg)',
        // 'height':'22px',
        // 'color': '#dedede'})
        // $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': 'url(../assets/images/menu/events-blue.svg)',
        // 'height': '36px',
        // 'color': '#43B7CC'})
    }
    EventWelfarePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // $('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected','false')
        this.storage.get('EventDetails').then(function (val) {
            _this.arrDetail = val;
            _this.groundAdress = _this.arrDetail[0].ground_address;
            _this.groundState = _this.arrDetail[0].ground_state;
            _this.longitude = _this.arrDetail[0].geoloc_longitude;
            _this.latitude = _this.arrDetail[0].geoloc_latitude;
            // console.log(this.groundAdress,this.groundState,this.longitude,this.latitude)
        });
        this.storage.get('FunctionAccess').then(function (val) {
            _this.FunctionAccess = val;
        });
        this.storage.get('BackButton').then(function (val) {
            _this.BackButton = val;
        });
        this.storage.get('UpcomingSingleEvent').then(function (val) {
            _this.UpcomingSingleEvent = JSON.parse(val);
            // this.UpcomingSingleEvent.event_type_id
            // console.log('Event Id',JSON.parse(val))
        });
        this.storage.get('loggedInUserData').then(function (val) {
            _this.PersonData = val;
            // console.log('PersonData',this.PersonData)
            var loader = _this.loadingCtrl.create();
            loader.present();
            // this.getPersonDetail().then((y) => {
            _this.displayFunction().then(function (x) {
                if (x) {
                    setTimeout(function () {
                        loader.dismiss();
                    }, 100);
                }
            });
            // })
        });
        this.gFn.showMenuIcon();
    };
    EventWelfarePage.prototype.backArrow = function () {
        this.navCtrl.pop();
    };
    EventWelfarePage.prototype.goToChooseTeamsPage = function () {
        this.navCtrl.push('ChooseTeamProfilePage');
    };
    EventWelfarePage.prototype.gotoResults = function () {
        this.gFn.gotoResults();
        this.showEvent = true;
    };
    EventWelfarePage.prototype.gotoAttandance = function () {
        this.gFn.gotoAttandance();
        this.showEvent = true;
    };
    EventWelfarePage.prototype.displayFunction = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var selectedTeam = _this.PersonData.SELECTEDTEAM;
            if (_this.UpcomingSingleEvent.event_type_id == 2 && _this.UpcomingSingleEvent.teamid) {
                selectedTeam = _this.UpcomingSingleEvent.teamid;
            }
            else if (_this.UpcomingSingleEvent.event_type_id == 1) {
                if (_this.UpcomingSingleEvent.homeclubid == _this.PersonData.CLUB_ID) {
                    selectedTeam = _this.UpcomingSingleEvent.hometeam;
                }
                else {
                    selectedTeam = _this.UpcomingSingleEvent.awayteam;
                }
            }
            var loginData4 = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]()
                .set('event_id', _this.UpcomingSingleEvent.event_id)
                .set('clientSport', 'team')
                .set('client_id', _this.UpcomingSingleEvent.client_id)
                .set('club_id', _this.PersonData.CLUB_ID)
                .set('adminLevel', _this.PersonData.ADMINLEVEL)
                .set('selectedTeam', selectedTeam);
            _this.http.post(_this.global.APIURL + "events/getPlayersEvent", loginData4, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                _this.WelfarePeopleDetail = data.GETPLAYERSEVENT;
                //console.log('data',data)
                resolve(true);
            }, function (error) {
                //console.log(error);
            });
        });
    };
    EventWelfarePage.prototype.PlayerQuestion = function (Player_detail, event) {
        if (!this.medicalInfo) {
            if (this.ShowSeverityPage == false) {
                if (this.PersonData.PERSON_ID == Player_detail.person_id || this.FunctionAccess.event_Welfare == 'yes') {
                    $(event.target).closest('.event-card').find('.well').addClass('active');
                    this.navCtrl.push('PlayerQuestionPage', { Player_detail: Player_detail }).then(function (x) {
                        $(event.target).closest('.event-card').find('.well').removeClass('active');
                    });
                }
            }
            else {
                this.ShowSeverityPage = false;
            }
        }
    };
    EventWelfarePage.prototype.DisplaySeverityDetails = function (playerAilments) {
        this.ShowSeverityPage = true;
        if (playerAilments) {
            var SeverityModal = this.modalCtrl.create('SeverityDetailsModalPage', { playerAilments: playerAilments });
            SeverityModal.present();
        }
        else {
            this.presentToast('No Details found');
        }
    };
    EventWelfarePage.prototype.MedicineInformation = function (data) {
        var _this = this;
        this.medicalInfo = true;
        var MedicineInfo = this.modalCtrl.create('MedicineInfoPage', { values: data });
        MedicineInfo.present();
        MedicineInfo.onDidDismiss(function () {
            _this.medicalInfo = false;
        });
    };
    EventWelfarePage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    EventWelfarePage.prototype.ionViewDidLeave = function () {
    };
    EventWelfarePage.prototype.addEventToCalendar = function () {
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
            _this.presentAlert('Success', 'Event added to calendar.');
        }, function (err) {
            _this.presentAlert('Error', 'Problem in adding event to calendar. Please check the app permission settings.');
        });
    };
    EventWelfarePage.prototype.presentAlert = function (Title, SubTitle) {
        var alert = this.Alert.create({
            title: Title,
            subTitle: SubTitle,
            buttons: ['Dismiss']
        });
        alert.present(alert);
    };
    EventWelfarePage.prototype.openMap = function (address, state, latitude, longitude) {
        if (latitude != 0 && longitude != 0) {
            this.launchNavigator.navigate(latitude + ', ' + longitude);
        }
        else if (address || state) {
            this.launchNavigator.navigate(address + ', ' + state);
        }
        else {
            this.gFn.presentToast('Location undefined');
        }
    };
    EventWelfarePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event-welfare',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-welfare/event-welfare.html"*/'\n<ion-header>\n\n  <ion-navbar>\n      <div class="top-bar clearfix">\n          <div class="pull-left">\n                <div>\n                    <button class="BackButton"(click)="backArrow()" *ngIf="BackButton"><img src="assets/images/arrow-black.svg"></button>\n                    WELFARE\n                </div>\n          </div>\n          <!--<div class="prev-next pull-right" (click)="goToChooseTeamsPage()">\n              <a href="javascript:void(0);" class="next"></a>\n              <a href="javascript:void(0);" class="prev"></a>\n          </div>\n          <div class="calendar pull-right" (click)="addEventToCalendar()">\n            <img src="assets/images/calendar.svg">\n    \n        </div>\n        <div class="location pull-right" (click)="openMap(groundAdress,groundState,latitude,longitude)">\n          <img src="assets/images/Location.svg">\n        </div>-->\n      </div>\n\n  </ion-navbar>\n  <!-- <ion-grid class="nav navbar-nav top-menu">\n        <ion-row  *ngIf="FunctionAccess " > -->\n            <!--<ion-col >\n                <a  href="javascript:void(0)" *ngIf="FunctionAccess.event_tab_Attendance==\'yes\'" (click)="gotoAttandance()">\n                    <span class=" ActiveSpan InactiveSpan">Attendance</span></a>\n                <a  href="javascript:void(0)" *ngIf="FunctionAccess && FunctionAccess.event_tab_Overview==\'yes\'" (click)="gotoAttandance()">\n                    <span class=" ActiveSpan InactiveSpan">Overview</span>\n                </a>\n            </ion-col>*ngIf="FunctionAccess.event_Welfare==\'yes\' && UpcomingSingleEvent && UpcomingSingleEvent.welfare_question==1"-->\n            <!-- <ion-col >\n                <a href="javascript:void(0)">\n                    <span class="active ActiveSpan ">Welfare</span>\n                </a>\n            </ion-col> -->\n            <!-- <ion-col *ngIf=" UpcomingSingleEvent && UpcomingSingleEvent.event_type_id!=2">\n                <a href="javascript:void(0)" (click)="gotoStats()">\n                    <span class=" ActiveSpan InactiveSpan">Stats</span>\n                </a>\n            </ion-col> -->\n            <!--<ion-col *ngIf="FunctionAccess.event_Result==\'yes\' && UpcomingSingleEvent && UpcomingSingleEvent.event_type_id!=2">\n                <a href="javascript:void(0)" (click)="gotoResults()">\n                    <span class=" ActiveSpan InactiveSpan">Results</span>\n                </a> \n            </ion-col>-->\n        <!-- </ion-row>\n    </ion-grid> -->\n</ion-header>\n\n\n<ion-content class="welfare-content">\n    <section class="main">\n        <form action="" class="user-form player-item">\n            <section class=" heightAuto xs-padding bg-gray show-card">\n                <div class="event-card welfare" *ngIf="WelfarePeopleDetail==\'\'">\n                    <div class="well select-card " >\n                        <div class="row">\n                            <div class="col-xs-12 ">\n                                <h5 class="sub-title">NO TEAM MATES FOUND</h5>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="event-card welfare" *ngFor="let details of WelfarePeopleDetail">\n                    <div class="well select-card" (click)="PlayerQuestion(details,$event)" style="margin-bottom: 0 !important">\n    \n                        <div class="row">\n                            <div class="card-img col-xs-2 p-0">\n                                <span class="" *ngIf="!details.photopath">\n                                    <div class="img-circle"><span class="img-text">{{details.first_name[0] | uppercase}} {{details.last_name[0] | uppercase}} </span></div>\n                                    <!-- <img src="assets/images/test-user.svg" alt="" class="img-circle"> -->\n                                </span>\n                                <span class="" *ngIf="details.photopath">\n                                            <img src="{{PhotoApiUrl}}{{details.photopath}}" alt="" class="img-circle">\n                                </span>\n                            </div>\n    \n                            <div class="card-title col-xs-8 p-0">{{details.first_name | uppercase}} {{details.last_name | uppercase}}\n                               \n                                <div>\n                                    <span *ngIf="details.uniform_id">#{{details.uniform_id}}</span>\n                                </div>\n                                <div class="suit-iconCard fixedRight" (click)="DisplaySeverityDetails(details)" *ngIf="FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1 && ((details.playerAilmentsSeverityIcon) || (details.showMedicine==1))">\n                                    <img src={{global.ImagesPath}}{{details.playerAilmentsSeverityIcon}} class="suit-icon" *ngIf="(details.playerAilmentsSeverityIcon  && (details.showMedicine==1 || details.showMedicine==0))">\n                                    <img src="{{global.ImagesPath}}pills.svg" class="medical-bottle" *ngIf="((details.showMedicine==1) && (!details.playerAilmentsSeverityIcon))">\n                                </div>\n                                \n                            </div>\n                            <div class="event-next col-xs-1 p-0 show-tickmark">\n                                <ion-icon class="tickIcon" ios="ios-checkmark" md="md-checkmark" color=primary *ngIf="details.welfare_answer==1"></ion-icon>\n                            </div>\n                            \n                            <div class="event-next col-xs-1 p-0">\n                                <a href="javascript:void(0)" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n                            </div>\n                        </div>\n                    </div>\n    \n                  </div>\n            </section>\n          </form>\n          </section>\n\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-welfare/event-welfare.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_calendar_ngx__["a" /* Calendar */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_launch_navigator_ngx__["a" /* LaunchNavigator */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_8__providers_global_api_global_api__["a" /* GlobalApiProvider */], __WEBPACK_IMPORTED_MODULE_8__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], EventWelfarePage);
    return EventWelfarePage;
}());

//# sourceMappingURL=event-welfare.js.map

/***/ })

});
//# sourceMappingURL=65.js.map