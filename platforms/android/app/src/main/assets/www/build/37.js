webpackJsonp([37],{

/***/ 821:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerGroupMessagePageModule", function() { return PlayerGroupMessagePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__player_group_message__ = __webpack_require__(923);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PlayerGroupMessagePageModule = /** @class */ (function () {
    function PlayerGroupMessagePageModule() {
    }
    PlayerGroupMessagePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__player_group_message__["a" /* PlayerGroupMessagePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__player_group_message__["a" /* PlayerGroupMessagePage */]),
            ],
        })
    ], PlayerGroupMessagePageModule);
    return PlayerGroupMessagePageModule;
}());

//# sourceMappingURL=player-group-message.module.js.map

/***/ }),

/***/ 923:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerGroupMessagePage; });
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







/**
 * Generated class for the PlayerGroupMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PlayerGroupMessagePage = /** @class */ (function () {
    function PlayerGroupMessagePage(navCtrl, navParams, storage, events, http, loadingCtrl, global, toastCtrl, gFn, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.events = events;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.global = global;
        this.toastCtrl = toastCtrl;
        this.gFn = gFn;
        this.global_api = global_api;
        this.players = [];
        this.groups = [];
        this.showGroups = false;
        this.message = '';
        this.storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
            _this.loadPlayers();
            _this.loadGroups();
        });
    }
    PlayerGroupMessagePage.prototype.loadPlayers = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('club_division_id', this.loggedInUserData.SELECTEDTEAM)
            .set('client_id', this.loggedInUserData.CLIENT_ID);
        this.http.post(this.global.APIURL + 'players/getTeamPlayers', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS) {
                var players = _this.events.publish('json:query', response.GETTEAMPLAYERS);
                players = players[0];
                for (var key in players) {
                    _this.players.push(players[key]);
                }
            }
        }, function (error) {
            loading.dismiss();
        });
    };
    PlayerGroupMessagePage.prototype.loadGroups = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', this.loggedInUserData.PERSON_ID)
            .set('selectedTeam', this.loggedInUserData.SELECTEDTEAM);
        this.http.post(this.global.APIURL + 'messages/getChatGroupsName', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS) {
                var groups = response.GETCHATGROUPS;
                for (var key in groups) {
                    _this.groups.push(groups[key]);
                }
            }
        }, function (error) {
            loading.dismiss();
        });
    };
    PlayerGroupMessagePage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    PlayerGroupMessagePage.prototype.setSendOption = function () {
        if ($('#sendToAll').is(':checked')) {
            this.showGroups = false;
            $('.groupIDs').prop('checked', false);
            setTimeout(function () {
                if ($('#sendToAll').is(':checked')) {
                    $('.playerIDs').prop('checked', true);
                }
                else {
                    $('.playerIDs').prop('checked', false);
                }
            }, 100);
        }
        else {
            $('.playerIDs, .groupIDs').prop('checked', false);
            if ($('#sendToGroup').is(':checked')) {
                this.showGroups = true;
            }
            else {
                this.showGroups = false;
            }
        }
    };
    PlayerGroupMessagePage.prototype.sendMessage = function () {
        var _this = this;
        var groupIDs = [];
        var groupTypes = [];
        var playerIDs = [];
        var restPath = 'messages/sendChat';
        if (this.showGroups) {
            restPath = 'messages/sendMultipleGroupChat';
            $('.groupIDs:checked').each(function () {
                groupIDs.push($(this).val());
                groupTypes.push($(this).attr('data-type'));
            });
        }
        else {
            $('.playerIDs:checked').each(function () {
                playerIDs.push($(this).val());
            });
        }
        if ((this.showGroups && groupIDs.length > 0) || (!this.showGroups && playerIDs.length > 0)) {
            if (this.message.length > 0) {
                var loading_1 = this.loadingCtrl.create();
                loading_1.present();
                var formData = {
                    'msg_type': '0',
                    'person_id': this.loggedInUserData.PERSON_ID,
                    'team_id': this.loggedInUserData.SELECTEDTEAM,
                    'selectedTeam': this.loggedInUserData.SELECTEDTEAM,
                    'first_name': this.loggedInUserData.FIRST_NAME,
                    'last_name': this.loggedInUserData.LAST_NAME,
                    'message': this.message,
                    'client_id': this.loggedInUserData.CLIENT_ID,
                    'urlified_message': '',
                    'image_value': ''
                };
                if (this.showGroups) {
                    formData = Object.assign(formData, { 'group_ids': JSON.stringify(groupIDs), 'group_types': JSON.stringify(groupTypes) });
                }
                else {
                    formData = Object.assign(formData, { 'group_id': '0', 'group_type': '0', 'player_ids': JSON.stringify(playerIDs) });
                }
                var msgData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]({ fromObject: formData });
                this.http.post(this.global.APIURL + restPath, msgData, { headers: this.global_api.getHeader() })
                    .subscribe(function (response) {
                    loading_1.dismiss();
                    if (response.SUCCESS) {
                        _this.presentToast("Message send successfully");
                    }
                    else {
                        _this.presentToast("Error in message send");
                    }
                }, function (error) {
                    loading_1.dismiss();
                    _this.presentToast("Error in message send");
                });
            }
            else {
                this.presentToast("Can't send blank message");
            }
        }
        else {
            var msg = (this.showGroups) ? 'No group selected' : 'No player selected';
            this.presentToast(msg);
        }
    };
    PlayerGroupMessagePage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    PlayerGroupMessagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-player-group-message',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/player-group-message/player-group-message.html"*/'<!--\n  Generated template for the PlayerGroupMessagePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <nav class="navbar navbar-fixed-top">\n    <div class="top-bar clearfix">\n      <div class="pull-left">\n        <div class="backArrow info-item" (click)="goToPlayersDashboard()">PLAYERS</div>\n      </div>\n      <div class="prev-next pull-right" (click)="goToChooseTeamsPage()">\n        <a href="javascript:void(0);" class="next"></a>\n        <a href="javascript:void(0);" class="prev"></a>\n      </div>\n    </div>\n    <ul class="nav navbar-nav top-menu player-menu">\n      <li class="active"><a href="javascript:void(0);">Group message</a></li>\n      <li class=""><a href="javascript:void(0);" (click)="goToPlayerGrading()">Grading</a></li>\n      <li class=""><a href="javascript:void(0);" (click)="goToPlayerAddForGrading()">Add player</a></li>\n    </ul>\n  </nav>\n</ion-header>\n\n<ion-content class="bg-black event">\n  <section class="main">\n    <form action="" class="user-form player-item togle-slider">\n      <section class="profileFirst heightAuto xs-padding plyr-section">\n        <div class="fade group-msg player-group-message" role="dialog">\n          <div class="modal-dialog plr-group-msg">\n            <div class="modal-content msg-send radius-10">\n              <div class="modal-header">\n                <h4 class="modal-title text-center">Group Message</h4>\n              </div>\n              <div class="modal-body">\n                <textarea class="form-control msg-box plr-msg-box" name="message" [(ngModel)]="message" cols="30" rows="6"></textarea>\n              </div>\n              <div class="modal-footer">\n                <div class="row">\n                  <div class="submit-link col-xs-12 text-right">\n                    <button type="button" class="btn" (click)="sendMessage()">Send</button>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class="list-group profile-list">\n          <div class="send-to-all">\n            <label class="switch">\n              <input type="radio" name="sendOption" id="sendToAll" (click)="setSendOption()">\n              <span class="slider round plr-grup-msg-chk"></span>\n            </label>\n            <span class="check-text">Send to all</span>\n          </div>\n          <div class="send-to-select">\n            <label class="switch">\n              <input type="radio" name="sendOption" id="sendToSelection" checked (click)="setSendOption()">\n              <span class="slider round plr-grup-msg-chk"></span>\n            </label>\n            <span class="check-text">Send to selection</span>\n          </div>\n          <div class="send-to-group">\n            <label class="switch">\n              <input type="radio" name="sendOption" id="sendToGroup" (click)="setSendOption()">\n              <span class="slider round plr-grup-msg-chk"></span>\n            </label>\n            <span class="check-text">Send to group</span>\n          </div>\n        </div>\n      </section>\n\n      <div class="event-card bg-gray plyr-all-list" *ngIf="!showGroups && players.length > 0;">\n        <div class="well select-card" *ngFor="let player of players">\n          <div class="row">\n            <div class="card-img col-xs-2 p-0">\n              <span class="progressCircle" *ngIf="player.PHOTOPATH != null && player.PHOTOPATH.length > 0; else noImage">\n                <img src="{{global.PROFILEIMAGEURL}}{{player.PHOTOPATH}}" alt="" class="img-circle" onerror="this.onerror=null;this.src=\'assets/images/test-user.svg\';">\n              </span>\n              <ng-template #noImage><span class="progressCircle"><img src="assets/images/test-user.svg" alt="" class="img-circle"></span></ng-template>\n            </div>\n            <div class="card-title col-xs-6 p-0">\n              {{player.FIRST_NAME}} {{player.LAST_NAME}}\n              <p *ngIf="player.UNIFORMID != null && player.UNIFORMID.length > 0">#{{player.UNIFORMID}}</p>\n            </div>\n            <div class="col-xs-4 p-0">\n              <label class="switch plyr-list">\n                <input type="checkbox" name="playerIDs" class="playerIDs" [attr.value]="player.PERSON_ID">\n                <span class="slider round plr-grup-msg-chk"></span>\n              </label>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class="event-card bg-gray plyr-all-list" *ngIf="!showGroups && !players.length;">\n        <div class="well select-card">\n          <div class="row">\n            <div class="card-title col-xs-12 p-0">No Players Found</div>\n          </div>\n        </div>\n      </div>\n\n      <div class="event-card bg-gray plyr-all-list" *ngIf="showGroups && groups.length > 0;">\n        <div class="well select-card" *ngFor="let group of groups">\n          <div class="row">\n            <div class="card-title col-xs-8 p-0">\n              {{group.group_name}}\n            </div>\n            <div class="col-xs-4 p-0">\n              <label class="switch plyr-list">\n                <input type="checkbox" name="groupIDs" class="groupIDs" [attr.value]="group.group_id" [attr.data-type]="group.group_type">\n                <span class="slider round plr-grup-msg-chk"></span>\n              </label>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class="event-card bg-gray plyr-all-list" *ngIf="showGroups && !groups.length;">\n        <div class="well select-card">\n          <div class="row">\n            <div class="card-title col-xs-12 p-0">No Groups Found</div>\n          </div>\n        </div>\n      </div>\n    </form>\n  </section>\n</ion-content>\n\n<ion-footer>\n  <nav class="navbar navbar-default navbar-fixed-bottom">\n    <div class="container-fluid">\n      <ul class="nav navbar-nav">\n        <li class="home" (click)="gotoHome()"><a href="javascript:void(0);">Home</a></li>\n        <li class="events" (click)="gotoDisplayEvents()"><a href="javascript:void(0);">Events</a></li>\n        <li class="players active" (click)="goToPlayersDashboard()"><a href="javascript:void(0);">Players</a></li>\n        <li class="comment" (click)="goToChatDashboard()"><a href="javascript:void(0);">Comments</a></li>\n        <li class="more" (click)="goToMenuPage()"><a href="javascript:void(0);">More</a></li>\n      </ul>\n    </div>\n  </nav>\n</ion-footer>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/player-group-message/player-group-message.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], PlayerGroupMessagePage);
    return PlayerGroupMessagePage;
}());

//# sourceMappingURL=player-group-message.js.map

/***/ })

});
//# sourceMappingURL=37.js.map