webpackJsonp([67],{

/***/ 788:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventStatsPageModule", function() { return EventStatsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_stats__ = __webpack_require__(891);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EventStatsPageModule = /** @class */ (function () {
    function EventStatsPageModule() {
    }
    EventStatsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__event_stats__["a" /* EventStatsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__event_stats__["a" /* EventStatsPage */]),
            ],
        })
    ], EventStatsPageModule);
    return EventStatsPageModule;
}());

//# sourceMappingURL=event-stats.module.js.map

/***/ }),

/***/ 891:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventStatsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_global_api_global_api__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the EventStatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EventStatsPage = /** @class */ (function () {
    function EventStatsPage(navCtrl, navParams, storage, http, loadingCtrl, global, modalCtrl, gFn, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.global = global;
        this.modalCtrl = modalCtrl;
        this.gFn = gFn;
        this.global_api = global_api;
        this.players = [];
        this.minutes = "00";
        this.seconds = "00";
        this.playDisp = "block";
        this.pauseDisp = "none";
        this.personId = "";
        this.graphView = "none";
        this.statsView = "block";
        this.signalIcon = "assets/images/network-signal.png";
        this.eventId = 46144;
        this.time = 0;
        this.isOn = false;
        this.storage.get('loggedInUserData').then(function (val) {
            _this.userData = val;
            _this.setPlayersEvents();
            // this.GameStart();
        });
    }
    // GameStart(){
    //   setInterval(()=>{
    //     let currentDate=new Date();
    //     this.Time=currentDate.toLocaleTimeString()
    //   },100)
    // }
    EventStatsPage.prototype.setPlayersEvents = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.getPlayersEvents().then(function (x) {
            if (x) {
                loading.dismiss();
                for (var i = 0; i < _this.players.length; i++) {
                    //console.log("player", i);
                    var percentage = 0;
                    if (i == 14) {
                        break;
                    }
                    else if (_this.players[i].game_minutes != "" && _this.players[i].game_seconds != "") {
                        percentage = _this.players[i].game_minutes + (_this.players[i].game_seconds) / 60;
                    }
                    else if (_this.players[i].game_minutes == "" && _this.players[i].game_seconds != "") {
                        percentage = (_this.players[i].game_seconds) / 60;
                    }
                    __WEBPACK_IMPORTED_MODULE_5_jquery__(".graphClass").append("<li><div data-percentage='" + percentage + "' class='bar'></div></li>");
                }
            }
        });
    };
    EventStatsPage.prototype.getPlayersEvents = function () {
        var _this = this;
        //console.log(this.userData);
        return new Promise(function (resolve) {
            var eventStatsData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('event_id', '46144')
                .set('selectedTeam', _this.userData.SELECTEDTEAM)
                .set('client_id', _this.userData.CLIENT_ID)
                .set('club_id', _this.userData.CLUB_ID)
                .set('adminLevel', _this.userData.ADMINLEVEL)
                .set('clientSport', _this.userData.SPORT_TYPE);
            _this.http.post(_this.global.APIURL + 'events/getPlayersEvent', eventStatsData, { headers: _this.global_api.getHeader() })
                .subscribe(function (response) {
                if (response.SUCCESS) {
                    _this.players = response.GETPLAYERSEVENT;
                    resolve(true);
                }
                else {
                    alert('Sorry no matching result found');
                }
            }, function (error) {
            });
        });
    };
    EventStatsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('FunctionAccess').then(function (val) {
            _this.FunctionAccess = val;
        });
        //console.log('ionViewDidLoad EventStatsPage');
        __WEBPACK_IMPORTED_MODULE_5_jquery__(function () {
            __WEBPACK_IMPORTED_MODULE_5_jquery__("#bars li .bar").each(function (key, bar) {
                var percentage = __WEBPACK_IMPORTED_MODULE_5_jquery__(this).data('percentage');
                __WEBPACK_IMPORTED_MODULE_5_jquery__(this).animate({
                    'height': percentage * 4.3 + '%'
                }, 1000);
            });
        });
    };
    EventStatsPage.prototype.setTimer = function (personId, uniformId, sec, min, event) {
        if (this.isOn) {
            this.pressStop();
        }
        this.playDisp = "block";
        this.pauseDisp = "none";
        this.uniformId = uniformId;
        this.personId = personId;
        sec == "" ? this.seconds = "00" : (sec < 10 ? this.seconds = "0" + sec : this.seconds = sec);
        min == "" ? this.minutes = "00" : (min < 10 ? this.minutes = "0" + min : this.minutes = min);
        //console.log(event.class);
        //this.seconds = sec;
        //this.minutes = min;
    };
    EventStatsPage.prototype.pressPlay = function () {
        if (this.personId != "") {
            this.playDisp = "none";
            this.pauseDisp = "";
            this.start();
        }
    };
    EventStatsPage.prototype.pressPause = function () {
        this.pause();
        this.playDisp = "block";
        this.pauseDisp = "none";
    };
    EventStatsPage.prototype.pressStop = function () {
        this.stop();
        this.playDisp = "block";
        this.pauseDisp = "none";
    };
    EventStatsPage.prototype.update = function () {
        if (this.isOn) {
            var t = this.delta();
            this.time = this.time + t;
            this.formatTime(this.time);
        }
    };
    EventStatsPage.prototype.formatTime = function (t) {
        //var timeInMil = ((parseInt(this.minutes)*60) + parseInt(this.seconds))*1000;
        var time = new Date(t);
        var minutes = (time.getMinutes() - 30).toString();
        var seconds = (time.getSeconds()).toString();
        //console.log(minutes+":"+seconds);
        if (seconds.length < 2) {
            seconds = "0" + seconds;
        }
        if (minutes.length < 2) {
            minutes = "0" + minutes;
        }
        this.minutes = minutes;
        this.seconds = seconds;
    };
    EventStatsPage.prototype.start = function () {
        this.isOn = true;
        var timeInMil = new Date(((parseInt(this.minutes) * 60) + parseInt(this.seconds)) * 1000);
        this.offset = Date.now() - timeInMil;
        var u = this;
        this.interval = setInterval(function () {
            u.update();
        }, 1000);
    };
    EventStatsPage.prototype.pause = function () {
        this.interval = null;
        this.isOn = false;
    };
    EventStatsPage.prototype.stop = function () {
        this.savePlayerTime();
        this.time = null;
        this.interval = null;
        this.isOn = false;
        this.offset = null;
        this.minutes = "00";
        this.seconds = "00";
        this.update();
    };
    EventStatsPage.prototype.delta = function () {
        var now = Date.now();
        var timePassed = now - this.offset;
        this.offset = now;
        return timePassed;
    };
    EventStatsPage.prototype.savePlayerTime = function () {
        var _this = this;
        var playerTimeData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('event_id', '46144')
            .set('person_id', this.personId)
            .set('mins', this.minutes)
            .set('secs', this.seconds)
            .set('team_id', '3442');
        this.http.post(this.global.APIURL + 'events/savePlayersGameTime', playerTimeData, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            //console.log(JSON.stringify(response));
            if (response.SUCCESS) {
                _this.navCtrl.push("EventStatsPage");
            }
            else {
                alert('Sorry no matching result found');
            }
        }, function (error) {
        });
    };
    EventStatsPage.prototype.goToGraph = function () {
        if (this.graphView == "none") {
            this.statsView = "none";
            this.graphView = "block";
            this.signalIcon = "assets/images/signal-rotate.png";
            this.ionViewDidLoad();
        }
        else {
            this.statsView = "block";
            this.graphView = "none";
            this.signalIcon = "assets/images/network-signal.png";
        }
    };
    EventStatsPage.prototype.onClickApplyAction = function (personId, firstName, lastName, uniformId, minutes, seconds) {
        var _this = this;
        var playerInfo = {
            fName: firstName,
            lName: lastName,
            uniform: uniformId,
            min: minutes,
            sec: seconds,
            person: personId
        };
        var playerData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('event_id', '46144')
            .set('person_id', personId);
        this.http.post(this.global.APIURL + 'stats/getPlayerStats', playerData, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            console.log(JSON.stringify(response));
            if (response.SUCCESS) {
                var playerStats = response.GETPLAYERSTATS;
                var statsModal = _this.modalCtrl.create('EventUpdatePlayerModalPage', { stats: playerStats, info: playerInfo, event: _this.eventId });
                statsModal.present();
            }
            else {
                alert('Sorry no matching result found');
            }
        }, function (error) {
        });
    };
    EventStatsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event-stats',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-stats/event-stats.html"*/'<!--\n  Generated template for the EventStatsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-header>\n\n    <ion-navbar>\n        <div class="top-bar clearfix">\n            <div class="pull-left">\n                <div>Stats</div>\n            </div>\n            <div class="prev-next pull-right" (click)="goToChooseTeamsPage()">\n                <a href="javascript:void(0);" class="next"></a>\n                <a href="javascript:void(0);" class="prev"></a>\n            </div>\n        </div>\n    </ion-navbar>\n    <ion-grid class="nav navbar-nav top-menu" >\n        <ion-row >\n            <ion-col >\n                <a  href="javascript:void(0)" *ngIf="FunctionAccess && FunctionAccess.event_tab_Attendance==\'yes\'" (click)="gotoAttandance()">\n                    <span class="ActiveSpan InactiveSpan">Attendance</span></a>\n                <a  href="javascript:void(0)" *ngIf="FunctionAccess && FunctionAccess.event_tab_Overview==\'yes\'" (click)="gotoAttandance()">\n                    <span class="ActiveSpan InactiveSpan">Overview</span>\n                </a>\n            </ion-col>\n            \n            <ion-col>\n                <a href="javascript:void(0)" (click)="gotoWelfare()">\n                    <span class="ActiveSpan InactiveSpan">Welfare</span>\n                </a>\n            </ion-col>\n            <ion-col  >\n                <a href="javascript:void(0)" >\n                    <span class="active ActiveSpan">Stats</span>\n                </a>\n            </ion-col>\n            <ion-col >\n                <a href="javascript:void(0)" (click)="gotoResults()">\n                    <span class="ActiveSpan InactiveSpan">Results</span>\n                </a> \n            </ion-col>\n        </ion-row>\n    </ion-grid>\n    <!-- <ul class="nav navbar-nav top-menu">\n        <li class=""><a href="javascript:void(0);" (click)="gotoAttandance()">Overview</a></li>\n        <li class=""><a href="javascript:void(0);" (click)="gotoWelfare()">Welfare</a></li>\n        <li class="active"><a href="javascript:void(0);" (click)="gotoStats()">Stats</a></li>\n        <li class=""><a href="javascript:void(0);" (click)="gotoResults()">Results</a></li>\n    </ul> -->\n</ion-header>\n\n\n<ion-content>\n    <div class="bg-black event" [ngStyle]="{\'display\': statsView}">\n        <section class="main">\n            <form action="" class="user-form player-item">\n                <section class="profileFirst heightAuto xs-padding">\n                    <div class="play_time text-blue text-center">\n                        \n                        <h3 class="timeOption">{{minutes + ":" + seconds}}</h3>\n                        <div class="network"><img src="{{signalIcon}}" alt="" id="signalIco" (click)="goToGraph()"></div>\n                        <div class="play-icon" [ngStyle]="{\'display\': playDisp}" >\n                            <i class="fa fa-play" aria-hidden="true" (click)="pressPlay()"></i>\n                        </div>\n                        <div class="play-icon clearfix" [ngStyle]="{\'display\': pauseDisp}">\n                            <div class="pull-left">\n                                <img src="assets/images/pause-white.png" alt="" (click)="pressPause()">\n                            </div>\n                            <div class="pull-right">\n                                <img src="assets/images/stop.png" alt="" (click)="pressStop()">\n                            </div>\n                        </div>\n                    </div>\n                    <h4 class="info-item text-center inverseText">GAME vs TRINITY GRAMMAR</h4>\n                    <div class="bookmark-line"></div>\n                    <h6 class="text-info inverseText mt-30">ACTIVE</h6>\n                    <h1 class="xl-info inverseText" id="uniformId">{{uniformId}}</h1>\n                </section>\n\n                <div class="event-card bg-gray">\n                    <ion-list no-lines *ngFor="let player of players" class="well select-card">\n                        <ion-item-sliding>\n                            <ion-item>\n                                <div class="row" (click)="setTimer(player.person_id, player.uniform_id, player.game_seconds, player.game_minutes)"\n                                    data-id="{{player.person_id}}">\n                                    <div class="card-img col-xs-2 p-0">\n                                        <span class="progressCircle"><img src="{{\'https://database.gojaro.com/profiles/\' + player.photopath}}"\n                                                alt="" class="img-circle"></span>\n                                    </div>\n                                    <div class="card-title col-xs-6 p-0">{{player.first_name + " " + player.last_name}}\n                                        <p>#{{player.uniform_id}}</p>\n                                    </div>\n                                    <div class="play-start col-xs-2 p-0" *ngIf="player.person_id != personId">\n                                        <span *ngIf="player.game_minutes == \'\'">00</span>\n                                        <span *ngIf="player.game_minutes != \'\' && player.game_minutes < 10">{{"0" +\n                                            player.game_minutes}}</span>\n                                        <span *ngIf="player.game_minutes != \'\' && player.game_minutes > 9">{{player.game_minutes}}</span>\n                                        <span>:</span>\n                                        <span *ngIf="player.game_seconds == \'\'">00</span>\n                                        <span *ngIf="player.game_seconds != \'\' && player.game_seconds < 10">{{"0"+player.game_seconds}}</span>\n                                        <span *ngIf="player.game_seconds != \'\' && player.game_seconds > 9">{{player.game_seconds}}</span>\n                                    </div>\n                                    <div class="play-start col-xs-2 p-0" *ngIf="player.person_id == personId">\n                                        <span *ngIf="minutes == \'\'">00</span>\n                                        <span *ngIf="minutes != \'\' && minutes < 10">{{minutes}}</span>\n                                        <span *ngIf="minutes != \'\' && minutes > 9">{{minutes}}</span>\n                                        <span>:</span>\n                                        <span *ngIf="seconds == \'\'">00</span>\n                                        <span *ngIf="seconds != \'\' && seconds < 10">{{ seconds}}</span>\n                                        <span *ngIf="seconds != \'\' && seconds > 9">{{seconds}}</span>\n                                    </div>\n\n                                    <div class="col-xs-2 p-0">\n                                        <div class="play" *ngIf="player.person_id == personId">\n                                            <i class="fa fa-play" aria-hidden="true" [ngStyle]="{\'display\': playDisp}"></i>\n                                        </div>\n                                        <div class="play" *ngIf="player.person_id != personId">\n                                            <i class="fa fa-play" aria-hidden="true"></i>\n                                        </div>\n                                        <div class="play pause select" *ngIf="player.person_id == personId">\n                                            <img src="assets/images/pause.png" alt="" [ngStyle]="{\'display\': pauseDisp}">\n                                        </div>\n                                    </div>\n                                </div>\n                            </ion-item>\n                            <ion-item-options side="left">\n                                <button ion-button (click)="onClickApplyAction(player.person_id, player.first_name, player.last_name, player.uniform_id, player.game_minutes, player.game_seconds)">APPLY\n                                    ACTION</button>\n                            </ion-item-options>\n                        </ion-item-sliding>\n                    </ion-list>\n                </div>\n            </form>\n        </section>\n    </div>\n    <section class="main bg-black event" [ngStyle]="{\'display\': graphView}">\n        <form action="" class="user-form player-item">\n            <section class="profileFirst heightAuto xs-padding">\n                <div class="play_time text-blue text-center">\n                    <div class="play-icon" [ngStyle]="{\'display\': playDisp}">\n                        <i class="fa fa-play" aria-hidden="true" (click)="pressPlay()"></i>\n                    </div>\n                    <div class="play-icon clearfix" [ngStyle]="{\'display\': pauseDisp}">\n                        <div class="pull-left">\n                            <img src="assets/images/pause-white.png" alt="" (click)="pressPause()">\n                        </div>\n                        <div class="pull-right">\n                            <img src="assets/images/stop.png" alt="" (click)="pressStop()">\n                        </div>\n                    </div>\n                </div>\n                <h4 class="info-item text-center inverseText">GAME vs TRINITY GRAMMAR</h4>\n                <div class="bookmark-line"></div>\n            </section>\n            <div class="chart-wrap">\n                <img class="clock-icon" src="assets/images/clock.png" alt="">\n                <div id="chart">\n                    <div class="chart-area">\n                        <ul id="numbers">\n                            <li><span>40</span></li>\n                            <li><span>30</span></li>\n                            <li><span>20</span></li>\n                            <li><span>10</span></li>\n                            <li><span></span></li>\n                        </ul>\n                        <ul id="bars" class="graphClass">\n                        </ul>\n                    </div>\n                    <ul id="bar-title">\n                        <li *ngFor="let player of players"><span>{{player.first_name}}</span></li>\n                    </ul>\n                </div>\n            </div>\n        </form>\n    </section>\n</ion-content>\n<ion-footer>\n    <nav class="navbar navbar-default navbar-fixed-bottom">\n        <div class="container-fluid">\n            <ul class="nav navbar-nav">\n                <li class="home" (click)="gotoHome()"><a href="javascript:void(0);">Home</a></li>\n                <li class="events active" (click)="gotoDisplayEvents()"><a href="javascript:void(0);">Events</a></li>\n                <li class="players" (click)="goToPlayersDashboard()"><a href="javascript:void(0);">Players</a></li>\n                <li class="comment" (click)="goToChatDashboard()"><a href="javascript:void(0);">Comments</a></li>\n                <li class="more" (click)="goToMenuPage()"><a href="javascript:void(0);">More</a></li>\n            </ul>\n        </div>\n    </nav>\n</ion-footer>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-stats/event-stats.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], EventStatsPage);
    return EventStatsPage;
}());

/*
export class StopWatch{
  time:any = 0;
  offset:any;
  interval:any;
  isOn:boolean = false;
  minute:any;
  second:any;
  minutes:any;
  update(){
    if(this.isOn){
      var t = this.delta();
      this.time = this.time + t;
      this.formatTime(this.time);
    }
  }
  formatTime(t:any){
    var time = new Date(t);
    var minutes = (time.getMinutes() - 30).toString();
    var seconds = time.getSeconds().toString();
    console.log(minutes+":"+seconds);
    if(seconds.length < 2){
      seconds = "0"+seconds;
    }
    if(minutes.length < 2){
      minutes = "0"+minutes;
    }
    console.log(minutes+":"+seconds);
    //this.minutes = minutes;
    //this.seconds = seconds;
  }
  start() {
    this.isOn = true;
    this.offset = Date.now();
    var u = this;
    this.interval = setInterval(function(){
      u.update();
    }, 1000);
  }
  pause(){
    this.interval = null;
    this.isOn = false;
  }
  stop(){
    this.time = 0;
    this.interval = null;
    this.isOn = false;
    this.minute = "00";
    this.second = "00";
    this.update();
  }
  delta() {
    var now = Date.now();
    var timePassed = now - this.offset;
    this.offset = now;
    return timePassed;
  }

  getMin(){
    return this.minute;
  }
  getSecond(){
    return this.second;
  }
}
*/
//# sourceMappingURL=event-stats.js.map

/***/ })

});
//# sourceMappingURL=67.js.map