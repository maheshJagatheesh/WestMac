webpackJsonp([10],{

/***/ 845:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrackMemberPageModule", function() { return TrackMemberPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__track_member__ = __webpack_require__(945);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TrackMemberPageModule = /** @class */ (function () {
    function TrackMemberPageModule() {
    }
    TrackMemberPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__track_member__["a" /* TrackMemberPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__track_member__["a" /* TrackMemberPage */]),
            ],
        })
    ], TrackMemberPageModule);
    return TrackMemberPageModule;
}());

//# sourceMappingURL=track-member.module.js.map

/***/ }),

/***/ 945:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrackMemberPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_launch_navigator_ngx__ = __webpack_require__(189);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TrackMemberPage = /** @class */ (function () {
    function TrackMemberPage(navCtrl, navParams, http, gFn, global, storage, loadingCtrl, launchNavigator) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.gFn = gFn;
        this.global = global;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.launchNavigator = launchNavigator;
        this.currentMapTrack = null;
        this.isTracking = false;
        this.trackedRoute = [];
        this.previousTracks = [];
        this.StaffList = [];
        this.ChildList = [];
    }
    TrackMemberPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.member = this.navParams.get('member');
        this.transportId = this.navParams.get('transportId');
        if (this.member) {
            this.ChildList = this.navParams.get('memberList');
        }
        else {
            this.StaffList = this.navParams.get('memberList');
        }
        this.storage.get('loggedInUserData').then(function (val) {
            _this.PersonData = val;
        });
        console.log('ionViewDidLoad TrackMemberPage');
    };
    TrackMemberPage.prototype.close = function (event) {
        if (event.toElement.className == "scroll-content") {
            this.navCtrl.pop();
        }
    };
    TrackMemberPage.prototype.openMap = function (id) {
        this.navCtrl.push('MapTrackerPage', { staff_id: id, memberDetails: this.member ? this.ChildList : this.StaffList });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], TrackMemberPage.prototype, "mapElement", void 0);
    TrackMemberPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-track-member',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/track-member/track-member.html"*/'<!--\n  Generated template for the TrackMemberPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content class="bg-black" (click)="close($event)">\n  \n  <div class="modal-content modalView">\n    <div class="modal-header shadow">\n        <h5 class="modal-title fontBold text-center">WHO DO YOU WANT TO SEE?</h5>\n    </div>\n    <div class="modal-body">\n      <div class="membar-card d-flex align-center justify-center" *ngIf="!member">\n        <div class="card-img" *ngFor="let key of StaffList">\n          <div (click)="openMap(key.staff_id)">\n              <span class="">\n                <img alt="" class="img-circle" *ngIf="key.photoPath" src={{global.PROFILEIMAGEURL}}{{key.photoPath}}> \n                <div class="img-circle" *ngIf="!key.photoPath"><span class="img-text">{{key.firstName[0] | uppercase}} {{key.lastName[0] | uppercase}} </span></div>                            \n              </span>\n              <div class="infoText">\n                <p class="text-center m-0">{{key.firstName}} {{key.lastName}}</p>\n                <h5 class="text-center m-0">{{key.vehicleName}}</h5>\n              </div>\n          </div>\n         \n        </div>\n      </div>\n\n      <div class="membar-card d-flex align-center justify-center" *ngIf="member">\n        <div class="card-img" *ngFor="let key of ChildList" >\n          <div (click)="openMap(key.TRANSPORTSTAFFID)">\n              <span class="">\n                <img alt="" class="img-circle" *ngIf="key.PHOTOPATH" src={{global.PROFILEIMAGEURL}}{{key.PHOTOPATH}}> \n                <div class="img-circle" *ngIf="!key.PHOTOPATH"><span class="img-text">{{key.FIRSTNAME[0] | uppercase}} {{key.LASTNAME[0] | uppercase}} </span></div>                            \n              </span>\n              <div class="infoText">\n                <p class="text-center m-0">{{key.FIRSTNAME}} {{key.LASTNAME}}</p>\n                <!-- <h5 class="text-center m-0">{{key.vehicleName}}</h5> -->\n              </div>\n          </div>\n         \n        </div>\n      </div>\n    </div>\n  \n  </div>\n  \n  \n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/track-member/track-member.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_launch_navigator_ngx__["a" /* LaunchNavigator */]])
    ], TrackMemberPage);
    return TrackMemberPage;
}());

//# sourceMappingURL=track-member.js.map

/***/ })

});
//# sourceMappingURL=10.js.map