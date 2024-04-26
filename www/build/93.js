webpackJsonp([93],{

/***/ 754:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BorrowedPlayerPageModule", function() { return BorrowedPlayerPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__borrowed_player__ = __webpack_require__(861);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BorrowedPlayerPageModule = /** @class */ (function () {
    function BorrowedPlayerPageModule() {
    }
    BorrowedPlayerPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__borrowed_player__["a" /* BorrowedPlayerPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__borrowed_player__["a" /* BorrowedPlayerPage */]),
            ],
        })
    ], BorrowedPlayerPageModule);
    return BorrowedPlayerPageModule;
}());

//# sourceMappingURL=borrowed-player.module.js.map

/***/ }),

/***/ 861:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BorrowedPlayerPage; });
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








var BorrowedPlayerPage = /** @class */ (function () {
    function BorrowedPlayerPage(navCtrl, navParams, loadingCtrl, storage, global, http, statusBar, gFn, modalCtrl, toastCtrl, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.global = global;
        this.http = http;
        this.statusBar = statusBar;
        this.gFn = gFn;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.global_api = global_api;
        this.BorrowedPlayerPresent = 'No Team Mates';
        this.PhotoApiUrl = this.global.PROFILEIMAGEURL;
        this.gFn.hideMenuIcon();
        this.statusBar.hide();
        this.storage.get('FunctionAccess').then(function (val) {
            _this.FunctionAccess = val;
        });
    }
    BorrowedPlayerPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (this.navParams.get('UpcomingSingleEvent')) {
            this.UpcomingSingleEvent = JSON.parse(this.navParams.get('UpcomingSingleEvent'));
        }
        else {
            this.storage.get('UpcomingSingleEvent').then(function (val) {
                _this.UpcomingSingleEvent = JSON.parse(val);
            });
        }
        var loader = this.loadingCtrl.create({});
        loader.present();
        setTimeout(function () {
            _this.storage.get('loggedInUserData').then(function (val) {
                _this.PersonData = val;
                _this.getborrowList().then(function (x) {
                    if (x) {
                        loader.dismiss();
                    }
                });
            });
        }, 500);
    };
    BorrowedPlayerPage.prototype.ionViewDidLeave = function () {
        this.statusBar.show();
        this.gFn.showMenuIcon();
    };
    BorrowedPlayerPage.prototype.teamList = function () {
        this.navCtrl.push('TeamListPage', { UpcomingSingleEvent: JSON.stringify(this.UpcomingSingleEvent) });
    };
    BorrowedPlayerPage.prototype.backArrow = function () {
        this.navCtrl.pop();
        //this.navCtrl.push('EventDashboardPage');
    };
    BorrowedPlayerPage.prototype.getborrowList = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var PlayersData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('event_id', _this.UpcomingSingleEvent.event_id)
                .set('selectedTeam', _this.PersonData.SELECTEDTEAM)
                .set('client_id', _this.PersonData.CLIENT_ID);
            _this.http.post(_this.global.APIURL + "borrows/getBorrowedPlayers", PlayersData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.GETBORROWEDPLAYERS != '') {
                    _this.BorrowedPlayerPresent = data.GETBORROWEDPLAYERS;
                    console.log("borrowed player", _this.BorrowedPlayerPresent);
                }
                else {
                    _this.BorrowedPlayerPresent = 'No Team Mates';
                }
                resolve(true);
            }, function (error) {
            });
        });
    };
    BorrowedPlayerPage.prototype.DeleteborrowPlayer = function (rid) {
        var _this = this;
        return new Promise(function (resolve) {
            var PlayersData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('borrow_id', rid);
            _this.http.post(_this.global.APIURL + "borrows/removeSingleBorrowedPlayer", PlayersData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS) {
                    _this.getborrowList();
                }
                resolve(true);
            }, function (error) {
            });
        });
    };
    BorrowedPlayerPage.prototype.DisplaySeverityDetails = function (playerAilments) {
        if (playerAilments) {
            var SeverityModal = this.modalCtrl.create('SeverityDetailsModalPage', { playerAilments: playerAilments });
            SeverityModal.present();
        }
        else {
            this.presentToast('No Details found');
        }
    };
    BorrowedPlayerPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    BorrowedPlayerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-borrowed-player',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/borrowed-player/borrowed-player.html"*/'<ion-content class="bg-black borrowPlayer">\n    <section class="main mt-20" style="margin-top: 10%;">\n        <div class="top-bar">\n            <div class="col-xs-3" (click)="backArrow()">\n                <div class="backArrow inverse"></div>\n            </div>\n        </div>\n        <form action="" class="user-form" style="padding-top: 10%;">\n            <h5 class="sm-title text-left col-xs-12 mt-20" style="color: white;">BORROWED TEAM MATES</h5>\n            <section class="profileFirst heightAuto">\n                <div class="event-card borrow" style="padding-top: 10%;">\n                    <div class="well select-card " *ngIf="BorrowedPlayerPresent==\'No Team Mates\'">\n                        <div class="row">\n                            <div class="col-xs-12 ">\n                                <h5 class="sub-title">NO BORROWED TEAM MATES</h5>\n                            </div>\n                        </div>\n                    </div>\n                    <div  *ngIf="BorrowedPlayerPresent!=\'No Team Mates\'">\n                        <div class="well select-card " *ngFor="let key of BorrowedPlayerPresent">\n                            <div class="row">\n                                <div class="card-img col-xs-2 p-0">\n                                    <span class="" *ngIf="key.photoPath==\'\'">\n                                        <div class="img-circle">\n                                            <span class="img-text">{{key.first_name[0] | uppercase}} {{key.last_name[0] | uppercase}}\n                                            </span>\n                                        </div>\n                                        <!-- <img src="assets/images/test-user.svg" alt="" class="img-circle"> -->\n                                    </span>\n                                    <span class="" *ngIf="key.photoPath!=\'\'"><img src="{{PhotoApiUrl}}{{key.photoPath}}" alt="" class="img-circle"></span>\n                                </div>\n                                <div class="card-title col-xs-9 p-0">{{key.first_name | uppercase}} {{key.last_name | uppercase}}\n                                    <div>\n                                        <span *ngIf="key.uniform_id">#{{key.uniform_id}}</span>\n                                    </div>\n                                    <div class="suit-iconCard fixedRight" (click)="DisplaySeverityDetails(key)" *ngIf="FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1 && ((key.playerAilmentsSeverityIcon) || (key.showMedicine==1))">\n                                        <img src={{global.ImagesPath}}{{key.playerAilmentsSeverityIcon}} class="suit-icon" *ngIf="(key.playerAilmentsSeverityIcon  && (key.showMedicine==1 || key.showMedicine==0))">\n                                        <img src="{{global.ImagesPath}}pills.svg" class="medical-bottle" *ngIf="((key.showMedicine==1) && (!key.playerAilmentsSeverityIcon))">\n                                    </div>\n                                </div>\n                                <!-- <div class="col-xs-3 p-0">\n                                    <div class="suit-iconCard" (click)="DisplaySeverityDetails(key.playerAilments)" *ngIf="key.playerAilmentsSeverityIcon && FunctionAccess && FunctionAccess.medicalKit==\'yes\'">\n                                        <img src={{global.ImagesPath}}{{key.playerAilmentsSeverityIcon}}  class="suit-icon">\n                                    </div> -->\n                                    \n                                    <!-- <div class="medical-bottleCard" (click)="gFn.MedicineInformation(key)" *ngIf="key.showMedicine==1 && FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1">\n                                        <img src="{{global.ImagesPath}}medicine_bottle.png" class="medical-bottle">\n                                    </div>\n                                </div>  -->\n                                <div class=" col-xs-1 p-0"  (click)="DeleteborrowPlayer(key.rid)">\n                                    <ion-icon class="card-Close" name="close"></ion-icon>\n                                </div>\n                            </div>\n                            \n                        </div>\n                        \n                    </div>\n\n                    <div class="circle-plus addIconCircle"  (click)="teamList()">\n                            <ion-icon ios="ios-add" md="md-add" class="addIcon"></ion-icon>\n                    </div>\n                    \n                </div>\n            </section>\n        </form>\n</section>\n\n</ion-content>\n\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/borrowed-player/borrowed-player.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar_ngx__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_6__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_7__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], BorrowedPlayerPage);
    return BorrowedPlayerPage;
}());

//# sourceMappingURL=borrowed-player.js.map

/***/ })

});
//# sourceMappingURL=93.js.map