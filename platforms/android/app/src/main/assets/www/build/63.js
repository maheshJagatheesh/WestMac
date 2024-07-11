webpackJsonp([63],{

/***/ 791:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterTempPageModule", function() { return FilterTempPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filter_temp__ = __webpack_require__(894);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FilterTempPageModule = /** @class */ (function () {
    function FilterTempPageModule() {
    }
    FilterTempPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__filter_temp__["a" /* FilterTempPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__filter_temp__["a" /* FilterTempPage */]),
            ],
        })
    ], FilterTempPageModule);
    return FilterTempPageModule;
}());

//# sourceMappingURL=filter-temp.module.js.map

/***/ }),

/***/ 894:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterTempPage; });
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
 * Generated class for the FilterTempPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FilterTempPage = /** @class */ (function () {
    function FilterTempPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    FilterTempPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FilterTempPage');
    };
    FilterTempPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-filter-temp',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/filter-temp/filter-temp.html"*/'<!--\n  Generated template for the FilterTempPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!-- <ion-header>\n\n  <ion-navbar>\n    <ion-title>filter-temp</ion-title>\n  </ion-navbar>\n\n</ion-header> -->\n\n\n<ion-content>\n  <div class="overlay-filter">\n\n      <div class="options_wrap">\n  \n              <div class="options">\n                <p class="sub-title">Filter</p>\n                <img src="assets/images/e-remove.png" class="pull_right_arrow close-icon">\n              </div>\n\n              <div class="options">\n                  <p>My Teams</p>\n                  <img src="assets/images/right arrow.svg" class="pull_right_arrow">\n              </div>\n\n              <div class="options">\n                <p>Sport</p>\n                <img src="assets/images/right arrow.svg" class="pull_right_arrow">\n              </div>\n  \n              <div class="options">\n                <p>Division</p>\n                <img src="assets/images/right arrow.svg" class="pull_right_arrow">\n              </div>\n  \n              <div class="options">\n                <p>Teams</p>\n                <img src="assets/images/right arrow.svg" class="pull_right_arrow">\n              </div>\n      </div>\n\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/filter-temp/filter-temp.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */]])
    ], FilterTempPage);
    return FilterTempPage;
}());

//# sourceMappingURL=filter-temp.js.map

/***/ })

});
//# sourceMappingURL=63.js.map