webpackJsonp([70],{

/***/ 783:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventOfflinePageModule", function() { return EventOfflinePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_offline__ = __webpack_require__(886);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EventOfflinePageModule = /** @class */ (function () {
    function EventOfflinePageModule() {
    }
    EventOfflinePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__event_offline__["a" /* EventOfflinePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__event_offline__["a" /* EventOfflinePage */]),
            ],
        })
    ], EventOfflinePageModule);
    return EventOfflinePageModule;
}());

//# sourceMappingURL=event-offline.module.js.map

/***/ }),

/***/ 886:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventOfflinePage; });
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
 * Generated class for the EventOfflinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EventOfflinePage = /** @class */ (function () {
    function EventOfflinePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    EventOfflinePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EventOfflinePage');
    };
    EventOfflinePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event-offline',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-offline/event-offline.html"*/'<!--\n  Generated template for the EventOfflinePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="header-md header">\n\n  <ion-navbar class="main toolbar toolbar-md"><div class="toolbar-background toolbar-background-md" ng-reflect-klass="toolbar-background" ng-reflect-ng-class="toolbar-background-md"></div><button class="back-button disable-hover bar-button bar-button-md back-button-md bar-button-default bar-button-default-md" ion-button="bar-button" ng-reflect-klass="back-button" ng-reflect-ng-class="back-button-md"><span class="button-inner"><ion-icon class="back-button-icon icon icon-md back-button-icon-md ion-md-arrow-back" role="img" ng-reflect-klass="back-button-icon" ng-reflect-ng-class="back-button-icon-md" aria-label="arrow back" ng-reflect-name="md-arrow-back"></ion-icon><span class="back-button-text back-button-text-md" ng-reflect-klass="back-button-text" ng-reflect-ng-class="back-button-text-md"></span></span><div class="button-effect"></div></button><div class="toolbar-content toolbar-content-md" ng-reflect-klass="toolbar-content" ng-reflect-ng-class="toolbar-content-md">\n\n    \n\n    <div class="top-bar clearfix">\n\n      <div class="pull-left col-xs-6 pr-0">\n\n        <div class="backArrow"> EVENTS </div>\n\n    </div>\n\n      \n\n    </div>\n\n  </div></ion-navbar>\n\n  \n\n</ion-header>\n\n\n<ion-content>\n  <div class="background_blue">\n    <div class="off-wrap">\n      <p><img src="assets/images/events-new-icon/offline-logo.svg" class=""></p>\n      <h3>OFFLINE</h3>\n      <p>Your network is unavalaible, please check your data or connection</p>\n    </div>\n\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-offline/event-offline.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */]])
    ], EventOfflinePage);
    return EventOfflinePage;
}());

//# sourceMappingURL=event-offline.js.map

/***/ })

});
//# sourceMappingURL=70.js.map