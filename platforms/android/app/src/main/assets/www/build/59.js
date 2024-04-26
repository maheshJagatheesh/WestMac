webpackJsonp([59],{

/***/ 794:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryTimelineDetailsPageModule", function() { return GalleryTimelineDetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gallery_timeline_details__ = __webpack_require__(897);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GalleryTimelineDetailsPageModule = /** @class */ (function () {
    function GalleryTimelineDetailsPageModule() {
    }
    GalleryTimelineDetailsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__gallery_timeline_details__["a" /* GalleryTimelineDetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__gallery_timeline_details__["a" /* GalleryTimelineDetailsPage */]),
            ],
        })
    ], GalleryTimelineDetailsPageModule);
    return GalleryTimelineDetailsPageModule;
}());

//# sourceMappingURL=gallery-timeline-details.module.js.map

/***/ }),

/***/ 897:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GalleryTimelineDetailsPage; });
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
 * Generated class for the GalleryTimelineDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GalleryTimelineDetailsPage = /** @class */ (function () {
    function GalleryTimelineDetailsPage(navCtrl, navParams, gFn) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.gFn = gFn;
    }
    GalleryTimelineDetailsPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    GalleryTimelineDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-gallery-timeline-details',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/gallery-timeline-details/gallery-timeline-details.html"*/'<!--\n  Generated template for the GalleryTimelineDetailsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <nav class="navbar navbar-fixed-top player-home-nav">\n    <div class="top-bar clearfix gallery-text">\n      <div class="pull-left">\n        <div class="backArrow info-item gallery-pinch" (click)="goBack()"><span>GALLERY</span></div>\n      </div>\n      <div class="prev-next pull-right select-text">\n        <span>Select</span>\n      </div>\n    </div>\n  </nav>\n</ion-header>\n\n<ion-content>\n  <section class="main">\n    <form action="" class="user-form player-item gallery-form">\n      <section class="main">\n        <div class="bg-gray">\n          <div class="homeScreen mb-30 gallery-timeline">\n            <div class="row">\n              <div class="thumbnail col-xs-6 gallery-thumbnail">\n                <img src="assets/images/img-1.png" alt="">\n              </div>\n              <div class="thumbnail col-xs-6 gallery-thumbnail">\n                <img src="assets/images/img-2.png" alt="">\n              </div>\n            </div>\n            <div class="row">\n              <div class="thumbnail col-xs-6 gallery-thumbnail">\n                <img src="assets/images/img-1.png" alt="">\n              </div>\n              <div class="thumbnail col-xs-6 gallery-thumbnail">\n                <img src="assets/images/img-2.png" alt="">\n              </div>\n            </div>\n            <div class="row">\n              <div class="thumbnail col-xs-6 gallery-thumbnail">\n                <img src="assets/images/img-1.png" alt="">\n              </div>\n              <div class="thumbnail col-xs-6 gallery-thumbnail">\n                <img src="assets/images/img-2.png" alt="">\n              </div>\n            </div>\n          </div>\n        </div>\n      </section>\n    </form>\n  </section>\n</ion-content>\n\n<ion-footer>\n  <nav class="navbar navbar-default navbar-fixed-bottom">\n    <div class="container-fluid">\n      <ul class="nav navbar-nav gallery-nav-bottom">\n        <li class="add"><a href="javascript:void(0);">Add</a></li>\n        <li class="love"><a href="javascript:void(0);">Love</a></li>\n        <li class="delete"><a href="javascript:void(0);">Delete</a></li>\n      </ul>\n    </div>\n  </nav>\n</ion-footer>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/gallery-timeline-details/gallery-timeline-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */]])
    ], GalleryTimelineDetailsPage);
    return GalleryTimelineDetailsPage;
}());

//# sourceMappingURL=gallery-timeline-details.js.map

/***/ })

});
//# sourceMappingURL=59.js.map