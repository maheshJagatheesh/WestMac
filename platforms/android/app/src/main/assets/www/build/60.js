webpackJsonp([60],{

/***/ 793:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryEventsPageModule", function() { return GalleryEventsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gallery_events__ = __webpack_require__(896);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GalleryEventsPageModule = /** @class */ (function () {
    function GalleryEventsPageModule() {
    }
    GalleryEventsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__gallery_events__["a" /* GalleryEventsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__gallery_events__["a" /* GalleryEventsPage */]),
            ],
        })
    ], GalleryEventsPageModule);
    return GalleryEventsPageModule;
}());

//# sourceMappingURL=gallery-events.module.js.map

/***/ }),

/***/ 896:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GalleryEventsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_functions_global_functions__ = __webpack_require__(34);
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
 * Generated class for the GalleryEventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GalleryEventsPage = /** @class */ (function () {
    function GalleryEventsPage(navCtrl, navParams, gFn) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.gFn = gFn;
    }
    GalleryEventsPage.prototype.goToGalleryTimeline = function () {
        this.navCtrl.push('GalleryTimelinePage');
    };
    GalleryEventsPage.prototype.goToGalleryAlbums = function () {
        //this.navCtrl.push('GalleryAlbumsPage');
    };
    GalleryEventsPage.prototype.gotoAlbum = function () {
        this.navCtrl.push('GalleryAlbumPage');
    };
    GalleryEventsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-gallery-events',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/gallery-events/gallery-events.html"*/'<!--\n  Generated template for the GalleryEventsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <nav class="navbar navbar-fixed-top player-home-nav">\n        <div class="top-bar clearfix">\n            <div class="prev-next pull-right" (click)="goToChooseTeamsPage()">\n                <a href="javascript:void(0);" class="next"></a>\n                <a href="javascript:void(0);" class="prev"></a>\n            </div>\n        </div>\n        <div class="bg-header">\n            <div class="title fontBold">GALLERY</div>\n        </div>\n        <ul class="nav navbar-nav top-menu player-menu">\n            <li class=""><a href="javascript:void(0);" (click)="goToGalleryTimeline()">Timeline</a></li>\n            <li class="active"><a href="javascript:void(0);">Events</a></li>\n            <li class="" (click)="gotoAlbum()"><a href="javascript:void(0);">Albums</a></li>\n        </ul>\n    </nav>\n</ion-header>\n<ion-content>\n  <div bg-gray event>\n    <section class="main">\n        <form action="" class="user-form player-item">\n            <section class="profileFirst heightAuto xs-padding">\n                <div class="event-card welfare bg-gray galry-event">\n                    <div class="homeScreen mb-30">\n                        <div class="row">\n                            <div class="thumbnail col-xs-6 gallery-associate-thumbnail">\n                                <img src="assets/images/img-1.png" alt="">\n                                <p class="galry-title">Team vs Other Team</p>\n                                <p class="galry-no">16</p>\n                            </div>\n                            <div class="thumbnail col-xs-6 gallery-associate-thumbnail">\n                                <img src="assets/images/img-2.png" alt="">\n                                <p class="galry-title-right">Fundraiser</p>\n                                <p class="galry-no-right">28</p>\n                            </div>\n                        </div>\n\n\n\n                        <div class="row">\n                            <div class="thumbnail col-xs-6 gallery-associate-thumbnail">\n                                <img src="assets/images/img-1.png" alt="">\n                                <p class="galry-title">Team vs Other Team</p>\n                                <p class="galry-no">16</p>\n                            </div>\n                            <div class="thumbnail col-xs-6 gallery-associate-thumbnail">\n                                <img src="assets/images/img-2.png" alt="">\n                                <p class="galry-title-right">Fundraiser</p>\n                                <p class="galry-no-right">28</p>\n                            </div>\n                        </div>\n                    </div>\n\n                </div>\n            </section>\n        </form>\n    </section>\n  </div>\n</ion-content>\n<ion-footer>\n    <nav class="navbar navbar-default navbar-fixed-bottom">\n        <div class="container-fluid">\n            <ul class="nav navbar-nav">\n                <li class="home" (click)="gotoHome()"><a href="javascript:void(0);">Home</a></li>\n                <li class="events" (click)="gotoDisplayEvents()"><a href="javascript:void(0);">Events</a></li>\n                <li class="players" (click)="goToPlayersDashboard()"><a href="javascript:void(0);">Players</a></li>\n                <li class="comment" (click)="goToChatDashboard()"><a href="javascript:void(0);">Comments</a></li>\n                <li class="more" (click)="goToMenuPage()"><a href="javascript:void(0);">More</a></li>\n            </ul>\n        </div>\n    </nav>\n</ion-footer>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/gallery-events/gallery-events.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */]])
    ], GalleryEventsPage);
    return GalleryEventsPage;
}());

//# sourceMappingURL=gallery-events.js.map

/***/ })

});
//# sourceMappingURL=60.js.map