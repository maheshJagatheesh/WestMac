webpackJsonp([80],{

/***/ 769:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventAttendanceLoadingpagePageModule", function() { return EventAttendanceLoadingpagePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_attendance_loadingpage__ = __webpack_require__(873);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EventAttendanceLoadingpagePageModule = /** @class */ (function () {
    function EventAttendanceLoadingpagePageModule() {
    }
    EventAttendanceLoadingpagePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__event_attendance_loadingpage__["a" /* EventAttendanceLoadingpagePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__event_attendance_loadingpage__["a" /* EventAttendanceLoadingpagePage */]),
            ],
        })
    ], EventAttendanceLoadingpagePageModule);
    return EventAttendanceLoadingpagePageModule;
}());

//# sourceMappingURL=event-attendance-loadingpage.module.js.map

/***/ }),

/***/ 873:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventAttendanceLoadingpagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
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
 * Generated class for the EventAttendanceLoadingpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EventAttendanceLoadingpagePage = /** @class */ (function () {
    function EventAttendanceLoadingpagePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    EventAttendanceLoadingpagePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EventAttendanceLoadingpagePage');
    };
    EventAttendanceLoadingpagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event-attendance-loadingpage',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-attendance-loadingpage/event-attendance-loadingpage.html"*/'<!--\n  Generated template for the EventAttendancePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="header-md header">\n\n  <ion-navbar class="main toolbar toolbar-md"><div class="toolbar-background toolbar-background-md" ng-reflect-klass="toolbar-background" ng-reflect-ng-class="toolbar-background-md"></div><button class="back-button disable-hover bar-button bar-button-md back-button-md bar-button-default bar-button-default-md" ion-button="bar-button" ng-reflect-klass="back-button" ng-reflect-ng-class="back-button-md"><span class="button-inner"><ion-icon class="back-button-icon icon icon-md back-button-icon-md ion-md-arrow-back" role="img" ng-reflect-klass="back-button-icon" ng-reflect-ng-class="back-button-icon-md" aria-label="arrow back" ng-reflect-name="md-arrow-back"></ion-icon><span class="back-button-text back-button-text-md" ng-reflect-klass="back-button-text" ng-reflect-ng-class="back-button-text-md"></span></span><div class="button-effect"></div></button><div class="toolbar-content toolbar-content-md" ng-reflect-klass="toolbar-content" ng-reflect-ng-class="toolbar-content-md">\n\n    \n\n    <div class="top-bar clearfix">\n\n      <div class="pull-left col-xs-6 pr-0">\n\n        <div class="backArrow"> LOADING </div>\n\n    </div>\n\n      \n\n    </div>\n\n  </div></ion-navbar>\n\n  \n\n</ion-header>\n<!-- <ion-header>\n\n<ion-navbar>\n  <ion-title>event-attendance</ion-title>\n</ion-navbar>\n\n</ion-header> -->\n\n\n<ion-content>\n    <div class="loding_overlay">\n      <div class="img_loading"></div>\n      <div class="h3_loading"></div>\n      <div class="h4_loading"></div>\n      <div class="p_loading"></div>\n      <div class="p_loading"></div>\n      <div class="p_loading_3rd"></div>\n      <div class="row_loding"></div>\n      <div class="row_loding_2"></div>\n      <div class="row_loding_2"></div>\n      <div class="row_loding_2"></div>\n      <div class="row_loding_2"></div>\n      <div class="row_loding_2"></div>\n      <div class="row_loding_2"></div>\n      <div class="row_loding_2"></div>\n      <div class="row_loding_2"></div>\n      <div class="row_loding_2"></div>\n    </div>\n<div class="body_aria">\n  \n  <div class="attendence_img">\n  <img src="assets/images/Group 6156.png" class="rounded-circle">\n</div>\n  <h3 class="text-center">ATTENDENCE</h3>\n  <div class="ruller"></div>\n  <h4 class="text-center">GAME vs TRINITY GRAMMAR</h4>\n  <p class="venu">Trinity College, Scotchman Hall</p>\n  <p class="venu">119 Prospect Rd, Summer Hil</p>\n  <p class="venu_time">TODAY AT 10:30 AM</p>\n  <div class="ruller"></div>\n\n  <div class="radio_aria">\n    <div class="row">\n\n      <div class="col-xs-5 attending_aria_right p-0"><p>Yes, attending</p></div>\n      <div class="col-xs-2 p-1"><input type="radio"></div>\n      <div class="col-xs-5 attending_aria_left p-0"><p></p></div>\n    </div>\n    <div class="row">\n\n        <div class="col-xs-5 attending_aria_right p-0"><p>Yes,5mint late</p></div>\n        <div class="col-xs-2 p-1"><input type="radio"></div>\n        <div class="col-xs-5 attending_aria_left p-0"><p></p></div>\n      </div>\n      <div class="row">\n\n          <div class="col-xs-5 attending_aria_right p-0"><p>Yes, ingured</p></div>\n          <div class="col-xs-2 p-1"><input type="radio"></div>\n          <div class="col-xs-5 attending_aria_left p-0"><p></p></div>\n        </div>\n  </div>\n\n  <div class="radio_aria">\n      <div class="row">\n\n        <div class="col-xs-5 attending_aria_right p-0"><p></p></div>\n        <div class="col-xs-2 p-1"><input type="radio"></div>\n        <div class="col-xs-5 attending_aria_left p-0"><p>Not my usual</p></div>\n      </div>\n      <div class="row">\n          <div class="col-xs-5 attending_aria_right p-0"><p></p></div>\n          <div class="col-xs-2 p-1"><input type="radio"></div>\n          <div class="col-xs-5 attending_aria_left p-0"><p>No,sic</p></div>\n        </div>\n    \n\n    </div>\n\n</div>\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-attendance-loadingpage/event-attendance-loadingpage.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */]])
    ], EventAttendanceLoadingpagePage);
    return EventAttendanceLoadingpagePage;
}());

//# sourceMappingURL=event-attendance-loadingpage.js.map

/***/ })

});
//# sourceMappingURL=80.js.map