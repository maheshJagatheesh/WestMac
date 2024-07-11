webpackJsonp([1],{

/***/ 855:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VoteForPlayerPageModule", function() { return VoteForPlayerPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vote_for_player__ = __webpack_require__(955);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var VoteForPlayerPageModule = /** @class */ (function () {
    function VoteForPlayerPageModule() {
    }
    VoteForPlayerPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__vote_for_player__["a" /* VoteForPlayerPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__vote_for_player__["a" /* VoteForPlayerPage */]),
            ],
        })
    ], VoteForPlayerPageModule);
    return VoteForPlayerPageModule;
}());

//# sourceMappingURL=vote-for-player.module.js.map

/***/ }),

/***/ 955:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VoteForPlayerPage; });
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







var VoteForPlayerPage = /** @class */ (function () {
    function VoteForPlayerPage(navCtrl, navParams, storage, events, http, loadingCtrl, global, modalCtrl, toastCtrl, gFn, plt, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.events = events;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.global = global;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.gFn = gFn;
        this.plt = plt;
        this.global_api = global_api;
        this.active = '';
        this.playerDetails = [];
        this.players = [];
        this.vote1 = '';
        this.vote2 = '';
        this.vote3 = '';
        this.btnText = 'RESET VOTE';
        plt.ready().then(function () {
            plt.registerBackButtonAction(function () {
                _this.goBack();
            });
        });
        this.storage.get('FunctionAccess').then(function (val) {
            _this.FunctionAccess = val;
        });
        this.storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
            _this.playerDetails[0] = navParams.get('playerDetails');
            _this.event_id = navParams.get('event_id');
            _this.storage.get('UpcomingSingleEvent').then(function (val2) {
                _this.UpcomingSingleEvent = JSON.parse(val2);
                _this.loadPlayersVotedState();
            });
        });
    }
    VoteForPlayerPage.prototype.loadPlayersVotedState = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({});
        loader.present();
        var selectedTeam = this.loggedInUserData.SELECTEDTEAM;
        if (this.UpcomingSingleEvent.event_type_id == 2 && this.UpcomingSingleEvent.teamid) {
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
            .set('event_id', this.event_id)
            .set('team_id', selectedTeam)
            .set('client_id', this.UpcomingSingleEvent.client_id)
            .set('selectedTeam', selectedTeam)
            .set('club_id', this.loggedInUserData.CLUB_ID)
            .set('voter_id', this.playerDetails[0].person_id);
        this.http.post(this.global.APIURL + 'votes/getVotingPlayersEvent', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            if (response.SUCCESS) {
                loader.dismiss();
                _this.players = response.GETVOTINGPLAYERSEVENT;
                for (var i = 0; i < _this.players.length; i++) {
                    if (_this.players[i].vote1 == _this.players[i].person_id) {
                        _this.vote1 = _this.players[i].vote1;
                    }
                    else if (_this.players[i].vote2 == _this.players[i].person_id) {
                        _this.vote2 = _this.players[i].vote2;
                    }
                    else if (_this.players[i].vote3 == _this.players[i].person_id) {
                        _this.vote3 = _this.players[i].vote3;
                    }
                }
            }
        }, function (error) {
            loader.dismiss();
        });
    };
    VoteForPlayerPage.prototype.setVote = function (ev, person_id, ratings) {
        var v1 = '';
        var v2 = '';
        var v3 = '';
        if (ratings == 1) {
            v1 = person_id;
            this.vote1 = person_id;
            v2 = '';
            v3 = '';
            if (this.vote2 == this.vote1) {
                this.vote2 = 0;
            }
            else if (this.vote3 == this.vote1) {
                this.vote3 = 0;
            }
        }
        if (ratings == 2) {
            v1 = '';
            v2 = person_id;
            this.vote2 = person_id;
            v3 = '';
            if (this.vote1 == this.vote2) {
                this.vote1 = 0;
            }
            else if (this.vote3 == this.vote2) {
                this.vote3 = 0;
            }
        }
        if (ratings == 3) {
            v1 = '';
            v2 = '';
            v3 = person_id;
            this.vote3 = person_id;
            if (this.vote1 == this.vote3) {
                this.vote1 = 0;
            }
            else if (this.vote2 == this.vote3) {
                this.vote2 = 0;
            }
        }
        if (v1 != '') {
            $('.vote1').removeClass("active");
        }
        else if (v2 != '') {
            $('.vote2').removeClass("active");
        }
        else if (v3 != '') {
            $('.vote3').removeClass("active");
        }
        $(ev.target.parentElement).find("a").removeClass("active");
        $(ev.target).addClass("active");
    };
    VoteForPlayerPage.prototype.saveBlankVote = function () {
        var _this = this;
        this.vote1 = '';
        this.vote2 = '';
        this.vote3 = '';
        this.btnText = 'RESET VOTE';
        var loader = this.loadingCtrl.create({});
        loader.present();
        var selectedTeam = this.loggedInUserData.SELECTEDTEAM;
        if (this.UpcomingSingleEvent.event_type_id == 2 && this.UpcomingSingleEvent.teamid) {
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
            .set('event_id', this.event_id)
            .set('team_id', selectedTeam)
            .set('voter_id', this.playerDetails[0].person_id)
            .set('v3', this.vote3)
            .set('v2', this.vote2)
            .set('v1', this.vote1)
            .set('vote_baf_1', '')
            .set('vote_baf_2', '')
            .set('vote_baf_3', '')
            .set('season_id', this.loggedInUserData.SEASON_ID);
        this.http.post(this.global.APIURL + 'votes/saveVotingPlayer', data)
            .subscribe(function (response) {
            loader.dismiss();
            if (response.SUCCESS) {
                _this.presentToast("Voting records saved.");
                _this.navCtrl.push('EventsResultsPage');
                _this.navCtrl.remove(_this.navCtrl.getActive().index - 1, 2);
                _this.gFn.showMenuIcon();
            }
            else {
                _this.presentToast("Sorry we couldn't save data");
            }
        }, function (error) {
            loader.dismiss();
            _this.presentToast("Sorry we couldn't save data");
        });
    };
    //reseting vote
    VoteForPlayerPage.prototype.resetVote = function () {
        this.vote1 = '';
        this.vote2 = '';
        this.vote3 = '';
        this.saveBlankVote();
    };
    //saving vote
    VoteForPlayerPage.prototype.saveVote = function (ev, person_id, ratings) {
        var _this = this;
        var v1 = '';
        var v2 = '';
        var v3 = '';
        if (ratings == 1) {
            v1 = person_id;
            this.vote1 = person_id;
            v2 = '';
            v3 = '';
            if (this.vote2 == this.vote1) {
                this.vote2 = 0;
            }
            else if (this.vote3 == this.vote1) {
                this.vote3 = 0;
            }
        }
        if (ratings == 2) {
            v1 = '';
            v2 = person_id;
            this.vote2 = person_id;
            v3 = '';
            if (this.vote1 == this.vote2) {
                this.vote1 = 0;
            }
            else if (this.vote3 == this.vote2) {
                this.vote3 = 0;
            }
        }
        if (ratings == 3) {
            v1 = '';
            v2 = '';
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
        if (this.UpcomingSingleEvent.event_type_id == 2 && this.UpcomingSingleEvent.teamid) {
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
            .set('event_id', this.event_id)
            .set('team_id', selectedTeam)
            .set('voter_id', this.playerDetails[0].person_id)
            .set('v3', this.vote3)
            .set('v2', this.vote2)
            .set('v1', this.vote1)
            .set('vote_baf_1', '')
            .set('vote_baf_2', '')
            .set('vote_baf_3', '')
            .set('season_id', this.loggedInUserData.SEASON_ID);
        this.http.post(this.global.APIURL + 'votes/saveVotingPlayer', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loader.dismiss();
            if (response.SUCCESS) {
                _this.presentToast("Voting records saved.");
                // if('voted' in this.playerDetails[0]){
                //   console.log('yes')
                //   console.log(this.playerDetails[0])
                // }
                // else{
                //   console.log('no')
                //   this.loggedInUserData['voted']=1
                // }
                //       this.navCtrl.push('EventDashboardPage', { 
                //         success: true, 
                //         personId: this.playerDetails[0].person_id,
                //         ActiveTab: 'Result' }).then(()=>{
                //         $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': 'url(../assets/images/menu/events-blue.svg)',
                //           'height': '36px',
                //           'color': '#43B7CC'})
                // this.gFn.showMenuIcon()
                //       });
            }
            else {
                _this.presentToast("Sorry we couldn't save data");
            }
        }, function (error) {
            loader.dismiss();
            _this.presentToast("Sorry we couldn't save data");
        });
        if (v1 != '') {
            $('.vote1').removeClass("active");
        }
        else if (v2 != '') {
            $('.vote2').removeClass("active");
        }
        else if (v3 != '') {
            $('.vote3').removeClass("active");
        }
        $(ev.target.parentElement).find("a").removeClass("active");
        $(ev.target).addClass("active");
    };
    VoteForPlayerPage.prototype.goBack = function () {
        var _this = this;
        this.navCtrl.push('EventsResultsPage');
        this.navCtrl.remove(this.navCtrl.getActive().index - 1, 2).then(function () {
            _this.gFn.showMenuIcon();
        });
    };
    VoteForPlayerPage.prototype.DisplaySeverityDetails = function (playerAilments) {
        if (playerAilments) {
            var SeverityModal = this.modalCtrl.create('SeverityDetailsModalPage', { playerAilments: playerAilments });
            SeverityModal.present();
        }
        else {
            this.presentToast('No Details found');
        }
    };
    VoteForPlayerPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    VoteForPlayerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-vote-for-player',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/vote-for-player/vote-for-player.html"*/'\n<ion-content class="bg-black">\n  <section class="main mt-20">\n    <div class="top-bar">\n        <div class="col-xs-6">\n          <div class="backArrow inverse inverseText" (click)="goBack()"></div>\n        </div>\n    </div>\n    <form action="" *ngIf="loggedInUserData && FunctionAccess">\n      <section class="heightAuto p-0" *ngFor="let player of playerDetails">\n        <div class="player-section">\n          <div class="thumbImage image-sm">\n            <img *ngIf="player.photopath != null && player.photopath.length > 0; else noImage" src="{{global.PROFILEIMAGEURL}}{{player.photopath}}" alt="" class="img-circle" onerror="this.onerror=null;this.src=\'assets/images/test-user.svg\';">\n            <ng-template #noImage><div class="img-circle"><span class="img-text">{{player.first_name[0] | uppercase}} {{player.last_name[0] | uppercase}} </span></div></ng-template>\n          </div>\n          <div class="player-info mt-20">\n            <h4 class="info-item">{{player.first_name}} {{player.last_name}}</h4>\n            <p *ngIf="player.uniform_id != null && player.uniform_id.toString().length > 0">#{{player.uniform_id}}</p>\n            \n          </div>\n        </div>\n      </section>\n\n      <h5 class="section-title">3-2-1 VOTING</h5>\n      <div class="event-card">\n        <div class="well select-card" *ngFor="let player of players">\n          <div class="row">\n            <div class="card-img col-xs-2 p-0">\n              <span class="">\n                  <div class="img-circle" *ngIf="player.photoPath == \'\'"><span class="img-text">{{player.first_name[0] | uppercase}} {{player.last_name[0] | uppercase}} </span></div>\n                  <img src="{{global.PROFILEIMAGEURL}}/{{player.photoPath}}" alt="" class="img-circle"\n                       onerror="this.src=\'assets/images/test-user.svg\'" *ngIf="player.photoPath != \'\'">\n                  <!-- <img src="assets/images/test-user.svg" alt="" class="img-circle" *ngIf="player.photoPath == \'\'"> -->\n              </span>\n            </div>\n            <div class="card-title col-xs-5 p-0">{{player.first_name | uppercase}} {{player.last_name | uppercase}}\n              \n              <div>\n                  <!-- <span class="suit-icon" (click)="DisplaySeverityDetails(player.playerAilments)" *ngIf="player.playerAilmentsSeverityIcon && FunctionAccess && FunctionAccess.medicalKit==\'yes\'">\n                      <img src={{global.ImagesPath}}{{player.playerAilmentsSeverityIcon}} >\n                  </span> \n                  <span *ngIf="player.showMedicine==1 && FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1"  (click)="gFn.MedicineInformation(player)">\n                      <img src="{{global.ImagesPath}}medicine_bottle.png" class="medical-bottle">\n                  </span> -->\n                  <span *ngIf="player.uniform_id">#{{player.uniform_id}}</span>\n              </div>\n              \n              \n            </div>\n            <div class="voting col-xs-5 p-0">\n              <a href="javascript:void(0)" class="select-val vote3" [class.active]="player.person_id == player.vote3" (click)="saveVote($event, player.person_id, 3)">3</a>\n              <a href="javascript:void(0)" class="select-val vote2" [class.active]="player.person_id == player.vote2" (click)="saveVote($event, player.person_id, 2)">2</a>\n              <a href="javascript:void(0)" class="select-val vote1" [class.active]="player.person_id == player.vote1" (click)="saveVote($event, player.person_id, 1)">1</a>\n            </div>\n          </div>\n        </div>\n\n        <div class="btn-section mb-50 mt-30" (click)="resetVote()">\n          <button class="btn btn-save btn-sm-black radius-10" type="submit">{{btnText}}</button>\n        </div>\n      </div>\n\n    </form>\n  </section>\n</ion-content>\n\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/vote-for-player/vote-for-player.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], VoteForPlayerPage);
    return VoteForPlayerPage;
}());

//# sourceMappingURL=vote-for-player.js.map

/***/ })

});
//# sourceMappingURL=1.js.map