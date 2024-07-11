webpackJsonp([33],{

/***/ 822:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerScannerAttendancePageModule", function() { return PlayerScannerAttendancePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__player_scanner_attendance__ = __webpack_require__(924);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PlayerScannerAttendancePageModule = /** @class */ (function () {
    function PlayerScannerAttendancePageModule() {
    }
    PlayerScannerAttendancePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__player_scanner_attendance__["a" /* PlayerScannerAttendancePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__player_scanner_attendance__["a" /* PlayerScannerAttendancePage */]),
            ],
        })
    ], PlayerScannerAttendancePageModule);
    return PlayerScannerAttendancePageModule;
}());

//# sourceMappingURL=player-scanner-attendance.module.js.map

/***/ }),

/***/ 924:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerScannerAttendancePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PlayerScannerAttendancePage = /** @class */ (function () {
    function PlayerScannerAttendancePage(navCtrl, navParams, storage, global) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.global = global;
        this.storage.get('loggedInUserData').then(function (val) {
            _this.PersonData = val;
            console.log(_this.PersonData);
        });
    }
    PlayerScannerAttendancePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PlayerScannerAttendancePage');
    };
    PlayerScannerAttendancePage.prototype.close = function (event) {
        if (event.toElement.className == "scroll-content") {
            this.navCtrl.pop();
        }
    };
    PlayerScannerAttendancePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-player-scanner-attendance',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/player-scanner-attendance/player-scanner-attendance.html"*/'\n<ion-content class="bg-black" (click)="close($event)">\n    \n  <div class="modal-content logsModal">\n      \n      <div class="modal-body logsCard" *ngIf="PersonData">\n          <div class="modal-header">\n              <h5 class="modal-title fontBold text-center">{{PersonData.FIRST_NAME}} {{PersonData.LAST_NAME}}</h5>\n              <!-- <div class="card-img mt-20">\n                  <img src="assets/images/user.svg" alt="" class="img-circle">\n              </div> -->\n              <div class="card-img">\n                <span class="">\n                    <img *ngIf="PersonData.PHOTOPATH" alt="" class="img-circle" src={{global.PROFILEIMAGEURL}}{{PersonData.PHOTOPATH}}>\n                    <div *ngIf="!PersonData.PHOTOPATH" class="img-circle"><span class="img-text">{{PersonData.FIRST_NAME[0]}} {{PersonData.LAST_NAME[0]}} </span></div>\n                </span>\n            </div>\n          </div>\n          <div class="barCodePreview text-center" >\n            <img *ngIf="PersonData.BARCODEIMAGE" src={{PersonData.BARCODEIMAGE}} alt="" class="barCodethumb ">\n            <div *ngIf="!PersonData.BARCODEIMAGE" class="barCodePreview noBarcodeCard"><span>No Barcode Present</span></div>\n        </div>\n          \n        </div>\n    </div>\n    \n</ion-content>\n<!-- <ion-footer [hidden]="keyboard.isOpen()">\n<div class="navbar navbar-default navbar-fixed-bottom">\n    <div class="container-fluid">\n        <ul class="nav navbar-nav">\n            <li class="home" (click)="gotoHome()"><a href="javascript:void(0);">Home</a></li>\n            <li class="events active" (click)="gotoDisplayEvents()"><a href="javascript:void(0);">Events</a></li>\n            <li class="players" (click)="goToPlayersDashboard()"><a href="javascript:void(0);">Players</a></li>\n            <li class="comment" (click)="goToChatDashboard()"><a href="javascript:void(0);">Comments</a></li>\n            <li class="more" (click)="goToMenuPage()"><a href="javascript:void(0);">More</a></li>\n        </ul>\n    </div>\n  </div>\n</ion-footer> -->\n\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/player-scanner-attendance/player-scanner-attendance.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */]])
    ], PlayerScannerAttendancePage);
    return PlayerScannerAttendancePage;
}());

//# sourceMappingURL=player-scanner-attendance.js.map

/***/ })

});
//# sourceMappingURL=33.js.map