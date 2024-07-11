webpackJsonp([87],{

/***/ 762:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChoosePlayersPageModule", function() { return ChoosePlayersPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__choose_players__ = __webpack_require__(868);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChoosePlayersPageModule = /** @class */ (function () {
    function ChoosePlayersPageModule() {
    }
    ChoosePlayersPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__choose_players__["a" /* ChoosePlayersPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__choose_players__["a" /* ChoosePlayersPage */]),
            ],
        })
    ], ChoosePlayersPageModule);
    return ChoosePlayersPageModule;
}());

//# sourceMappingURL=choose-players.module.js.map

/***/ }),

/***/ 868:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChoosePlayersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar_ngx__ = __webpack_require__(65);
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








var ChoosePlayersPage = /** @class */ (function () {
    function ChoosePlayersPage(navCtrl, navParams, events, loadingCtrl, storage, global, http, statusBar, gFn, modalCtrl, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.global = global;
        this.http = http;
        this.statusBar = statusBar;
        this.gFn = gFn;
        this.modalCtrl = modalCtrl;
        this.global_api = global_api;
        this.PlayerList = [];
        this.PlayerIdArray = [];
        this.medicalInfo = false;
        this.ShowSeverityPage = false;
        this.gFn.hideMenuIcon();
        this.TeamData = navParams.get('TeamData');
        this.PhotoApiUrl = this.global.PROFILEIMAGEURL;
        this.storage.get('FunctionAccess').then(function (val) {
            _this.FunctionAccess = val;
        });
    }
    ChoosePlayersPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.statusBar.hide();
        if (this.navParams.get('UpcomingSingleEvent')) {
            this.UpcomingSingleEvent = JSON.parse(this.navParams.get('UpcomingSingleEvent'));
        }
        else {
            this.storage.get('UpcomingSingleEvent').then(function (val) {
                _this.UpcomingSingleEvent = JSON.parse(val);
            });
        }
        // this.storage.get('UpcomingSingleEvent').then((val)=>{
        //   this.UpcomingSingleEvent=JSON.parse(val)
        // })
        this.storage.get('loggedInUserData').then(function (val) {
            _this.PersonData = val;
        });
        var loader = this.loadingCtrl.create({});
        loader.present();
        setTimeout(function () {
            _this.choosePlayersList().then(function (x) {
                if (x) {
                    loader.dismiss();
                }
                else if (!x) {
                    loader.dismiss();
                    _this.navCtrl.pop();
                    alert('No Data Found');
                }
            });
        }, 500);
    };
    ChoosePlayersPage.prototype.ionViewDidLeave = function () {
        this.statusBar.show();
    };
    ChoosePlayersPage.prototype.backArrow = function () {
        this.navCtrl.pop();
    };
    ChoosePlayersPage.prototype.choosePlayersList = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var PlayersList = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('club_division_id', _this.TeamData.lender_id)
                .set('client_id', _this.TeamData.client_id)
                .set('person_club_division_id', _this.PersonData.CLUB_DIVISION_ID)
                .set('person_client_id', _this.PersonData.CLIENT_ID);
            _this.http.post(_this.global.APIURL + "players/getTeamPlayers", PlayersList, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS && data.GETTEAMPLAYERS != '') {
                    var PlayerListData = _this.events.publish('json:query', data.GETTEAMPLAYERS);
                    for (var key in PlayerListData[0]) {
                        _this.PlayerList.push(PlayerListData[0][key]);
                    }
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }, function (error) {
                resolve(false);
            });
        });
    };
    ChoosePlayersPage.prototype.selectPlayers = function (person_id, selectPlayerCard, selectFontColor) {
        if (!this.medicalInfo && !this.ShowSeverityPage) {
            if (!this.PlayerIdArray.includes(person_id)) {
                selectPlayerCard.style.backgroundColor = '#2BBFF0';
                selectFontColor.style.color = '#ffffff';
                this.PlayerIdArray.push(person_id);
            }
            else if (this.PlayerIdArray.includes(person_id)) {
                selectPlayerCard.style.backgroundColor = '#ffffff';
                selectFontColor.style.color = '#15233C';
                this.PlayerIdArray.splice(this.PlayerIdArray.indexOf(person_id), 1);
            }
        }
    };
    ChoosePlayersPage.prototype.borrow = function () {
        var _this = this;
        var PlayersData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('event_id', this.UpcomingSingleEvent.event_id)
            .set('lending_team_id', this.TeamData.lender_id)
            .set('lending_club_id', this.TeamData.club_id)
            .set('lending_division_id', this.TeamData.lender_id)
            .set('lending_client_id', this.TeamData.client_id)
            .set('selectedTeam', this.PersonData.SELECTEDTEAM)
            .set('person_ids', JSON.stringify(this.PlayerIdArray));
        this.http.post(this.global.APIURL + "borrows/saveBorrowingPlayers", PlayersData, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            _this.navCtrl.pop();
            _this.navCtrl.push('BorrowedPlayerPage');
        }, function (error) {
        });
    };
    ChoosePlayersPage.prototype.DisplaySeverityDetails = function (playerAilments) {
        this.ShowSeverityPage = true;
        if (playerAilments) {
            var SeverityModal = this.modalCtrl.create('SeverityDetailsModalPage', { playerAilments: playerAilments });
            SeverityModal.present();
        }
        else {
            this.gFn.presentToast('No Details found');
        }
    };
    ChoosePlayersPage.prototype.MedicineInformation = function (data) {
        var _this = this;
        this.medicalInfo = true;
        var MedicineInfo = this.modalCtrl.create('MedicineInfoPage', { values: data });
        MedicineInfo.present();
        MedicineInfo.onDidDismiss(function () {
            _this.medicalInfo = false;
        });
    };
    ChoosePlayersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-choose-players',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/choose-players/choose-players.html"*/'\n<ion-content class="bg-black borrowPlayer">\n    <section class="main mt-20">\n        <div class="top-bar" (click)="backArrow()">\n            <div class="col-xs-3">\n                <div class="backArrow inverse"></div>\n            </div>\n        </div>\n        <form action="" class="user-form">\n            <h5 class="sm-title text-left col-xs-12 mt-20">CHOOSE TEAM MATE/S</h5>\n            <section class="profileFirst heightAuto">\n                <div class="event-card borrow">\n                        <div class="well select-card " *ngIf="!PlayerList">\n                                <div class="row">\n                                    <div class="col-xs-12 ">\n                                        <h5 class="sub-title">No Team Mates Found</h5>\n                                    </div>\n                                </div>\n                            </div>\n\n                    <div  #selectPlayerCard class="well select-card" *ngFor="let key of PlayerList">\n                        <div class="row" (click)="selectPlayers(key.PERSON_ID,selectPlayerCard,selectFontColor)" >\n                            <div class="card-img col-xs-2 p-0 active">\n                                <span class="" *ngIf="key.PHOTOPATH==null || key.PHOTOPATH==\'\'">\n                                    <div class="img-circle">\n                                        <span class="img-text">{{key.FIRST_NAME[0] | uppercase}} {{key.LAST_NAME[0] | uppercase}}\n                                        </span>\n                                    </div>\n                                    <!-- <img src="assets/images/test-user.svg" alt="" class="img-circle"> -->\n                                </span>\n                            \n                            <span class="" *ngIf="key.PHOTOPATH!=null && key.PHOTOPATH!=\'\'">\n                                <img src="{{PhotoApiUrl}}{{key.PHOTOPATH}}" alt="" class="img-circle">\n                            </span>\n                            </div>\n                            <div #selectFontColor class="card-title col-xs-7 p-0">{{key.FIRST_NAME | uppercase}} {{key.LAST_NAME | uppercase}}\n                                <div>\n                                    <span *ngIf="key.UNIFORMID">#{{key.UNIFORMID}}</span>\n                                </div>\n                                <div class="suit-iconCard fixedRight" (click)="DisplaySeverityDetails(key)" *ngIf="FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1 && ((key.PLAYERAILMENTSSEVERITYICON) || (key.showMedicine==1))">\n                                    <img src={{global.ImagesPath}}{{key.PLAYERAILMENTSSEVERITYICON}} class="suit-icon" *ngIf="(key.PLAYERAILMENTSSEVERITYICON  && (key.showMedicine==1 || key.showMedicine==0))">\n                                    <img src="{{global.ImagesPath}}pills.svg" class="medical-bottle" *ngIf="((key.showMedicine==1) && (!key.PLAYERAILMENTSSEVERITYICON))">\n                                </div>\n        \n                            </div>\n                           \n                        </div>\n                    </div>\n\n                    <div class="btn-section mb-50 mt-30" *ngIf="PlayerList">\n                        <button type="submit" class="btn btn-save btn-sm-black radius-10" (click)="borrow()">BORROW</button>\n                    </div>\n                </div>\n\n            </section>\n        </form>\n        </section>\n</ion-content>\n\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/choose-players/choose-players.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar_ngx__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_6__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */], __WEBPACK_IMPORTED_MODULE_7__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], ChoosePlayersPage);
    return ChoosePlayersPage;
}());

//# sourceMappingURL=choose-players.js.map

/***/ })

});
//# sourceMappingURL=87.js.map